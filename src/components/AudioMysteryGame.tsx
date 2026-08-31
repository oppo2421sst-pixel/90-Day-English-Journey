import React, { useState, useEffect } from 'react';
import { Headphones, Volume2, Sparkles, Check, X, RefreshCw, Trophy, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { WordItem } from '../types';
import { ALL_WORDS } from '../data/oxfordDataset';
import { playEnglishAudio } from '../utils/speech';
import { playSound } from '../utils/soundEffects';

interface AudioMysteryGameProps {
  onClose: () => void;
  onGameComplete: (xpGained: number, correctCount: number) => void;
}

export const AudioMysteryGame: React.FC<AudioMysteryGameProps> = ({
  onClose,
  onGameComplete,
}) => {
  const [questions, setQuestions] = useState<WordItem[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [options, setOptions] = useState<WordItem[]>([]);
  const [selectedWordId, setSelectedWordId] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [slowAudio, setSlowAudio] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Initialize 5 questions round
  useEffect(() => {
    const qs = [...ALL_WORDS].sort(() => 0.5 - Math.random()).slice(0, 5);
    setQuestions(qs);
    setupQuestion(qs[0]);
  }, []);

  const setupQuestion = (targetWord: WordItem) => {
    setSelectedWordId(null);
    setIsAnswered(false);
    setShowHint(false);

    // Distractors
    const distractors = ALL_WORDS.filter((w) => w.id !== targetWord.id && w.level === targetWord.level)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    const fullOpts = [...distractors, targetWord].sort(() => 0.5 - Math.random());
    setOptions(fullOpts);

    // Auto play audio
    setTimeout(() => {
      playEnglishAudio(targetWord.word, 'en-US', slowAudio ? 0.75 : 1.0);
    }, 200);
  };

  const currentWord = questions[currentIdx];

  const handlePlayAudio = () => {
    if (!currentWord) return;
    playEnglishAudio(currentWord.word, 'en-US', slowAudio ? 0.75 : 1.0);
  };

  const handleSelectOption = (word: WordItem) => {
    if (isAnswered || !currentWord) return;

    setSelectedWordId(word.id);
    setIsAnswered(true);

    const isCorrect = word.id === currentWord.id;
    if (isCorrect) {
      playSound.correct();
      setScore((prev) => prev + 25);
      setStreak((prev) => prev + 1);
    } else {
      playSound.wrong();
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      const nextWord = questions[currentIdx + 1];
      setCurrentIdx((prev) => prev + 1);
      setupQuestion(nextWord);
    } else {
      setIsFinished(true);
      playSound.levelUp();
      try {
        confetti({ particleCount: 70, spread: 70 });
      } catch {}
    }
  };

  const handleFinishAndSave = () => {
    onGameComplete(score, Math.round(score / 25));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-lg w-full p-5 sm:p-7 text-stone-100 shadow-2xl relative flex flex-col space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <Headphones className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-stone-100">
                Ear Master: ทายคำจากการฟัง 🎧
              </h3>
              <p className="text-[11px] text-stone-400">ฝึกหูให้คุ้นเคยกับสำเนียง Native Speaker</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-stone-800 text-stone-400 hover:text-white border border-stone-700 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {!isFinished && currentWord && (
          <div className="space-y-4">
            {/* Progress & Score */}
            <div className="flex items-center justify-between text-xs font-mono text-stone-400">
              <span>ข้อที่ {currentIdx + 1}/5</span>
              <div className="flex items-center gap-2">
                {streak >= 2 && (
                  <span className="text-amber-400 font-bold animate-pulse">🔥 Combo x{streak}</span>
                )}
                <span className="text-amber-400 font-bold">{score} XP</span>
              </div>
            </div>

            {/* Audio Wave Visualizer & Listen Button */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-purple-950/40 to-stone-900 border border-purple-500/30 text-center space-y-4">
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={handlePlayAudio}
                  className="w-16 h-16 rounded-full bg-purple-500 hover:bg-purple-400 text-stone-950 flex items-center justify-center transition cursor-pointer shadow-lg shadow-purple-500/30 active:scale-95"
                  title="คลิกเพื่อฟังเสียง"
                >
                  <Volume2 className="w-8 h-8" />
                </button>
              </div>

              <div>
                <p className="text-xs text-purple-300 font-medium">
                  คลิกที่ปุ่มลำโพงเพื่อฟังเสียงคำศัพท์
                </p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <button
                    onClick={() => {
                      const nextSlow = !slowAudio;
                      setSlowAudio(nextSlow);
                      playEnglishAudio(currentWord.word, 'en-US', nextSlow ? 0.75 : 1.0);
                    }}
                    className={`px-3 py-1 rounded-xl text-[11px] font-mono border transition cursor-pointer ${
                      slowAudio
                        ? 'bg-purple-500/30 border-purple-400 text-purple-200'
                        : 'bg-stone-800 border-stone-700 text-stone-400'
                    }`}
                  >
                    {slowAudio ? '🐢 สปีดช้า (0.75x)' : '🐰 สปีดปกติ (1.0x)'}
                  </button>

                  <button
                    onClick={() => setShowHint(true)}
                    className="px-3 py-1 rounded-xl text-[11px] bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-400 transition cursor-pointer flex items-center gap-1"
                  >
                    <HelpCircle className="w-3 h-3" />
                    <span>คำใบ้</span>
                  </button>
                </div>
              </div>

              {showHint && (
                <div className="p-2.5 bg-stone-900/80 rounded-xl border border-stone-800 text-xs text-amber-300 animate-in fade-in">
                  💡 คำใบ้: ประเภท <b>{currentWord.pos}</b> · ความหมาย: "<b>{currentWord.th}</b>"
                </div>
              )}
            </div>

            {/* Word Options */}
            <div className="grid grid-cols-2 gap-2.5">
              {options.map((opt) => {
                const isCorrect = opt.id === currentWord.id;
                const isChosen = selectedWordId === opt.id;
                let style = 'bg-stone-800/90 border-stone-700 hover:border-purple-400 text-stone-200';

                if (isAnswered) {
                  if (isCorrect) {
                    style = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                  } else if (isChosen) {
                    style = 'bg-rose-950 border-rose-500 text-rose-200';
                  } else {
                    style = 'opacity-30 bg-stone-800 border-stone-700';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(opt)}
                    className={`p-3.5 rounded-2xl border text-sm font-english transition cursor-pointer flex flex-col items-center justify-center text-center ${style}`}
                  >
                    <span className="font-bold text-base">{opt.word}</span>
                    {isAnswered && (
                      <span className="text-[11px] font-sans text-stone-400 mt-0.5">{opt.th}</span>
                    )}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <button
                onClick={handleNext}
                className="w-full py-3.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition cursor-pointer mt-2"
              >
                {currentIdx + 1 < questions.length ? 'ข้อต่อไป →' : 'ดูผลลัพธ์'}
              </button>
            )}
          </div>
        )}

        {isFinished && (
          <div className="py-8 text-center space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/40 flex items-center justify-center mx-auto">
              <Trophy className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-2xl font-display font-bold text-stone-100">
                ยอดเยี่ยมมาก! หูของคุณเริ่มคุ้นชินแล้ว
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                ทำคะแนนได้ <b className="text-purple-300 font-mono text-base">{score} XP</b> (+{Math.round(score / 5)} Gems)
              </p>
            </div>

            <button
              onClick={handleFinishAndSave}
              className="w-full py-3.5 px-6 rounded-2xl bg-purple-500 hover:bg-purple-400 text-stone-950 font-bold text-xs transition cursor-pointer shadow-lg shadow-purple-500/20"
            >
              บันทึกคะแนนและเสร็จสิ้น
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
