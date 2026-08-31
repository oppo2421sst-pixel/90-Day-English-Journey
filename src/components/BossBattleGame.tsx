import React, { useState, useEffect } from 'react';
import { Swords, Shield, Heart, Zap, Trophy, X, RotateCcw, Sparkles, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { WordItem } from '../types';
import { ALL_WORDS } from '../data/oxfordDataset';
import { playEnglishAudio } from '../utils/speech';
import { playSound } from '../utils/soundEffects';

interface BossBattleGameProps {
  onClose: () => void;
  onVictory: (xpGained: number, gemsGained: number) => void;
}

interface Boss {
  name: string;
  title: string;
  avatar: string;
  maxHp: number;
  color: string;
  dialogue: string;
}

const BOSSES: Boss[] = [
  {
    name: 'Amnesia Beast',
    title: 'สัตว์ประหลาดแห่งการลืมเลือน',
    avatar: '👹',
    maxHp: 160,
    color: 'from-purple-950 to-rose-950',
    dialogue: 'ฮ่าๆๆ! เจ้าจะลืมศัพท์ที่เรียนไปทั้งหมดภายใน 24 ชั่วโมง!',
  },
  {
    name: 'Procrastination Demon',
    title: 'ปีศาจแห่งการผลัดวันประกันพรุ่ง',
    avatar: '🐉',
    maxHp: 180,
    color: 'from-amber-950 to-red-950',
    dialogue: 'เอาไว้พรุ่งนี้ค่อยเรียนก็ได้... วันนี้พักก่อนเถอะน่า!',
  },
  {
    name: 'Shadow of Doubt',
    title: 'เงาแห่งความไม่มั่นใจ',
    avatar: '🦹',
    maxHp: 150,
    color: 'from-slate-950 to-indigo-950',
    dialogue: 'ภาษาอังกฤษมันยากเกินไปสำหรับเจ้า ยอมแพ้ซะเถอะ!',
  },
];

export const BossBattleGame: React.FC<BossBattleGameProps> = ({
  onClose,
  onVictory,
}) => {
  const [boss] = useState<Boss>(() => BOSSES[Math.floor(Math.random() * BOSSES.length)]);
  const [bossHp, setBossHp] = useState(boss.maxHp);
  const [playerHp, setPlayerHp] = useState(100);
  const [currentWord, setCurrentWord] = useState<WordItem | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [battleLog, setBattleLog] = useState<string>('เตรียมพร้อมต่อสู้! ตอบคำศัพท์ให้ถูกต้องเพื่อโจมตีบอส');
  const [hitEffect, setHitEffect] = useState<'boss' | 'player' | null>(null);
  const [isCritical, setIsCritical] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [gameState, setGameState] = useState<'playing' | 'victory' | 'defeat'>('playing');

  // Spawn new question
  const spawnQuestion = () => {
    const randomWord = ALL_WORDS[Math.floor(Math.random() * ALL_WORDS.length)];
    const distractors = ALL_WORDS.filter(
      (w) => w.id !== randomWord.id && w.level === randomWord.level && w.th !== randomWord.th
    )
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map((w) => w.th);

    const allOpts = [...distractors, randomWord.th].sort(() => 0.5 - Math.random());

    setCurrentWord(randomWord);
    setOptions(allOpts);
    setSelectedOption(null);
    setIsAnswered(false);
    setHitEffect(null);
    setIsCritical(false);
    setQuestionStartTime(Date.now());
  };

  useEffect(() => {
    spawnQuestion();
  }, []);

  const handleSelectOption = (opt: string) => {
    if (isAnswered || !currentWord || gameState !== 'playing') return;

    setSelectedOption(opt);
    setIsAnswered(true);
    const elapsedSeconds = (Date.now() - questionStartTime) / 1000;
    const isCorrect = opt === currentWord.th;

    if (isCorrect) {
      // Player attacks Boss!
      playSound.hit();
      const crit = elapsedSeconds <= 2.8;
      setIsCritical(crit);
      const damage = crit ? 50 : 35;

      setHitEffect('boss');
      setBattleLog(
        crit
          ? `💥 CRITICAL HIT! ตอบไวสะใจ โจมตี ${boss.name} เข้าอย่างจัง -${damage} HP!`
          : `⚔️ ถูกต้อง! คุณโจมตี ${boss.name} -${damage} HP!`
      );

      const newBossHp = Math.max(0, bossHp - damage);
      setBossHp(newBossHp);

      if (newBossHp <= 0) {
        // Victory!
        setTimeout(() => {
          setGameState('victory');
          playSound.levelUp();
          try {
            confetti({ particleCount: 100, spread: 80 });
          } catch {}
          onVictory(100, 40);
        }, 600);
        return;
      }
    } else {
      // Boss attacks Player!
      playSound.wrong();
      setHitEffect('player');
      const damage = 25;
      setBattleLog(`🩸 ตอบผิด! ${boss.name} โจมตีสวนกลับ -${damage} HP (คำตอบที่ถูกคือ: ${currentWord.th})`);

      const newPlayerHp = Math.max(0, playerHp - damage);
      setPlayerHp(newPlayerHp);

      if (newPlayerHp <= 0) {
        // Defeat
        setTimeout(() => {
          setGameState('defeat');
        }, 600);
        return;
      }
    }

    // Next round after short delay
    setTimeout(() => {
      spawnQuestion();
    }, 1100);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-lg w-full p-5 sm:p-7 text-stone-100 shadow-2xl relative flex flex-col space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <Swords className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-stone-100">
                Boss Battle RPG ⚔️
              </h3>
              <p className="text-[11px] text-stone-400">ปราบสัตว์ประหลาดแห่งการลืมด้วยพลังคำศัพท์</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-stone-800 text-stone-400 hover:text-white border border-stone-700 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {gameState === 'playing' && (
          <>
            {/* Battle Arena View */}
            <div className={`p-4 rounded-3xl bg-gradient-to-b ${boss.color} border border-stone-800 relative overflow-hidden text-center space-y-3`}>
              {/* Boss Section */}
              <div className="flex flex-col items-center justify-center space-y-1">
                <div
                  className={`text-6xl select-none transition-transform duration-200 ${
                    hitEffect === 'boss' ? 'scale-125 animate-ping' : 'animate-pulse'
                  }`}
                >
                  {boss.avatar}
                </div>
                <h4 className="font-display font-bold text-base text-stone-100">
                  {boss.name} <span className="text-xs text-rose-300 font-sans">({boss.title})</span>
                </h4>

                {/* Boss HP Bar */}
                <div className="w-48 bg-stone-950/80 h-3 rounded-full overflow-hidden p-0.5 border border-rose-500/40">
                  <div
                    className="bg-gradient-to-r from-rose-500 to-amber-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${(bossHp / boss.maxHp) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-rose-300">
                  HP: {bossHp}/{boss.maxHp}
                </span>
              </div>

              {/* Player HP Status */}
              <div className="flex items-center justify-between px-3 py-1.5 bg-stone-950/60 rounded-xl border border-stone-800 text-xs">
                <div className="flex items-center gap-1.5 text-emerald-400 font-mono font-bold">
                  <Heart className="w-4 h-4 fill-emerald-400" />
                  <span>HP คุณ: {playerHp}/100</span>
                </div>
                <div className="w-24 bg-stone-900 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${playerHp}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Battle Log */}
            <div className="p-2.5 rounded-xl bg-stone-800/80 border border-stone-700/80 text-center text-xs text-stone-300">
              {battleLog}
            </div>

            {/* Word Attack Question */}
            {currentWord && (
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-stone-800 border border-stone-700 text-center flex items-center justify-center gap-2">
                  <button
                    onClick={() => playEnglishAudio(currentWord.word)}
                    className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500 hover:text-stone-950 transition cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <h3 className="text-2xl font-english font-bold text-stone-100">
                    {currentWord.word}
                  </h3>
                  <span className="text-xs font-mono text-stone-400 px-2 py-0.5 rounded bg-stone-900">
                    {currentWord.pos}
                  </span>
                </div>

                {/* Choices */}
                <div className="grid grid-cols-2 gap-2">
                  {options.map((opt, idx) => {
                    const isCorrect = opt === currentWord.th;
                    const isSelected = selectedOption === opt;
                    let style = 'bg-stone-800 hover:border-amber-500 border-stone-700 text-stone-200';

                    if (isAnswered) {
                      if (isCorrect) {
                        style = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                      } else if (isSelected) {
                        style = 'bg-rose-950 border-rose-500 text-rose-200';
                      } else {
                        style = 'opacity-30 bg-stone-800 border-stone-700';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={isAnswered}
                        onClick={() => handleSelectOption(opt)}
                        className={`p-3 rounded-xl border text-xs font-medium transition cursor-pointer flex items-center justify-center text-center ${style}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}

        {/* Victory Screen */}
        {gameState === 'victory' && (
          <div className="py-8 text-center space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center mx-auto">
              <Trophy className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-2xl font-display font-bold text-stone-100">
                🎉 ชนะการต่อสู้! ปราบ {boss.name} สำเร็จ!
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                คุณเอาชนะศัตรูแห่งการลืมเลือน และปกป้องความจำระยะยาวได้สำเร็จ
              </p>
            </div>

            <div className="p-4 bg-stone-800 rounded-2xl border border-stone-700 space-y-1 text-xs">
              <span className="text-amber-400 font-mono font-bold block text-sm">
                +100 XP · +40 💎 Gems สะสม
              </span>
              <p className="text-stone-300">ได้รับเหรียญตรา ⚔️ <b>"ผู้พิชิตบอส (Boss Slayer)"</b></p>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition cursor-pointer shadow-lg shadow-amber-500/20"
            >
              รับรางวัลและกลับสู่หน้าหลัก
            </button>
          </div>
        )}

        {/* Defeat Screen */}
        {gameState === 'defeat' && (
          <div className="py-8 text-center space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/40 flex items-center justify-center mx-auto">
              <Shield className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-2xl font-display font-bold text-stone-100">
                คุณหมดพลัง! แต่ความพยายามไม่สูญเปล่า
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                ลองทบทวนคำศัพท์อีกครั้ง แล้วกลับมาท้าดวลใหม่ได้ตลอดเวลา
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  setBossHp(boss.maxHp);
                  setPlayerHp(100);
                  setGameState('playing');
                  spawnQuestion();
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>ท้าสู้ใหม่อีกครั้ง</span>
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold cursor-pointer"
              >
                พักก่อน
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
