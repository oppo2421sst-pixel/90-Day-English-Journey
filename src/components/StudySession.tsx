import React, { useState, useEffect } from 'react';
import { Volume2, Check, X, RotateCw, ArrowRight, Sparkles, BookOpen, Star, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { WordItem, CardProgress, UserProfile } from '../types';
import { playEnglishAudio } from '../utils/speech';
import { updateCardOnAnswer } from '../utils/srs';
import { ALL_WORDS } from '../data/oxfordDataset';

interface StudySessionProps {
  queue: WordItem[];
  cards: Record<number, CardProgress>;
  profile: UserProfile;
  onFinishSession: (updatedCards: Record<number, CardProgress>, xpGained: number, correctCount: number) => void;
  onClose: () => void;
  onToggleFavorite: (wordId: number) => void;
}

type StepMode = 'flashcard' | 'mcq' | 'reverse_mcq' | 'typing';

export const StudySession: React.FC<StudySessionProps> = ({
  queue,
  cards,
  profile,
  onFinishSession,
  onClose,
  onToggleFavorite
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mode, setMode] = useState<StepMode>('flashcard');
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [typedInput, setTypedInput] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [mcqOptions, setMcqOptions] = useState<string[]>([]);
  const [sessionCards, setSessionCards] = useState<Record<number, CardProgress>>({ ...cards });
  const [stats, setStats] = useState({ correct: 0, total: 0, xp: 0 });
  const [showHint, setShowHint] = useState(false);

  const currentWord = queue[currentIndex];
  const isFavorite = currentWord ? profile.favorites.includes(currentWord.id) : false;
  const currentCard = currentWord ? sessionCards[currentWord.id] : undefined;

  // Prepare next card step
  useEffect(() => {
    if (!currentWord) return;

    setIsFlipped(false);
    setSelectedOption(null);
    setTypedInput('');
    setIsSubmitted(false);
    setIsCorrect(null);
    setShowHint(false);

    // Dynamic mode selection based on familiarity
    const box = currentCard?.box || 0;
    let nextMode: StepMode = 'flashcard';

    if (box === 0 && (currentCard?.reps || 0) === 0) {
      // Brand new word -> Flashcard first to introduce
      nextMode = 'flashcard';
    } else if (box <= 1) {
      // Early recall -> Multiple Choice
      nextMode = Math.random() > 0.4 ? 'mcq' : 'reverse_mcq';
    } else {
      // Familiar word -> Active Typing to solidify memory
      nextMode = Math.random() > 0.4 ? 'typing' : 'mcq';
    }

    setMode(nextMode);

    // Auto audio
    if (profile.autoPlayAudio) {
      playEnglishAudio(currentWord.word, profile.accent, profile.speechRate);
    }

    // Generate MCQ distractors
    if (nextMode === 'mcq') {
      const distractors = ALL_WORDS.filter(
        w => w.id !== currentWord.id && w.level === currentWord.level && w.th !== currentWord.th
      )
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(w => w.th);

      const options = [...distractors, currentWord.th].sort(() => 0.5 - Math.random());
      setMcqOptions(options);
    } else if (nextMode === 'reverse_mcq') {
      const distractors = ALL_WORDS.filter(
        w => w.id !== currentWord.id && w.level === currentWord.level && w.word !== currentWord.word
      )
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(w => w.word);

      const options = [...distractors, currentWord.word].sort(() => 0.5 - Math.random());
      setMcqOptions(options);
    }
  }, [currentIndex, currentWord]);

  if (!currentWord || queue.length === 0) {
    return null;
  }

  const handleAudio = () => {
    playEnglishAudio(currentWord.word, profile.accent, profile.speechRate);
  };

  const handleAnswer = (correct: boolean) => {
    setIsCorrect(correct);
    setIsSubmitted(true);

    const updatedCard = updateCardOnAnswer(sessionCards[currentWord.id], currentWord.id, correct);
    const newSessionCards = { ...sessionCards, [currentWord.id]: updatedCard };
    setSessionCards(newSessionCards);

    const xpEarned = correct ? 10 : 3;
    setStats(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1,
      xp: prev.xp + xpEarned
    }));
  };

  const handleNext = () => {
    if (currentIndex + 1 < queue.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Completed session
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}

      onFinishSession(sessionCards, stats.xp + (isCorrect ? 10 : 3), stats.correct + (isCorrect ? 1 : 0));
    }
  };

  const progressPercent = Math.round(((currentIndex + 1) / queue.length) * 100);

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-xl w-full p-5 sm:p-7 text-stone-100 shadow-2xl flex flex-col max-h-[90vh]">
        {/* Top bar with progress and exit */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-stone-400 hover:text-stone-200 px-3 py-1.5 rounded-xl bg-stone-800 border border-stone-700/60 transition cursor-pointer"
          >
            พักไว้ก่อน
          </button>

          <div className="flex-1 max-w-xs">
            <div className="flex justify-between text-[11px] font-mono text-stone-400 mb-1">
              <span>คำที่ {currentIndex + 1}/{queue.length}</span>
              <span className="text-amber-400">+{stats.xp} XP</span>
            </div>
            <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <button
            onClick={() => onToggleFavorite(currentWord.id)}
            className={`p-2 rounded-xl border transition cursor-pointer ${
              isFavorite
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-400'
                : 'bg-stone-800 border-stone-700 text-stone-400 hover:text-stone-200'
            }`}
            title="บันทึกคำนี้ไว้ในคำโปรด"
          >
            <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400' : ''}`} />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 flex flex-col justify-center py-2">
          {/* Level & Box Tag */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md uppercase font-mono ${
              currentWord.level === 'A1' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
              currentWord.level === 'A2' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40' :
              currentWord.level === 'B1' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
              'bg-purple-500/20 text-purple-300 border border-purple-500/40'
            }`}>
              CEFR {currentWord.level}
            </span>
            <span className="text-[11px] text-stone-400 font-mono bg-stone-800 px-2 py-0.5 rounded-md border border-stone-700/60">
              {currentWord.pos}
            </span>
            {currentCard && (
              <span className="text-[10px] text-amber-400/90 font-mono">
                กล่องความจำ: {currentCard.box}/5
              </span>
            )}
          </div>

          {/* Flashcard Mode */}
          {mode === 'flashcard' && (
            <div className="space-y-4">
              <div 
                onClick={() => setIsFlipped(!isFlipped)}
                className="w-full min-h-[220px] p-6 rounded-3xl bg-stone-800/80 border border-stone-700/80 hover:border-amber-500/50 transition cursor-pointer flex flex-col items-center justify-center text-center relative group"
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAudio();
                  }}
                  className="p-3 rounded-2xl bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-stone-950 transition cursor-pointer mb-3 shadow"
                  title="ฟังเสียงออกเสียง"
                >
                  <Volume2 className="w-6 h-6" />
                </button>

                <h3 className="text-3xl sm:text-4xl font-display font-bold text-stone-100 tracking-tight">
                  {currentWord.word}
                </h3>

                {!isFlipped ? (
                  <p className="text-xs text-stone-400 mt-4 flex items-center gap-1.5">
                    <RotateCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
                    แตะเพื่อดูความหมายและตัวอย่างประโยค
                  </p>
                ) : (
                  <div className="mt-4 space-y-2 animate-in fade-in zoom-in-95 duration-200">
                    <p className="text-xl font-semibold text-amber-300">
                      {currentWord.th}
                    </p>
                    {currentWord.exampleEn && (
                      <div className="pt-2 border-t border-stone-700/60 text-xs text-stone-300 max-w-md">
                        <p className="font-english italic">"{currentWord.exampleEn}"</p>
                        {currentWord.exampleTh && (
                          <p className="text-stone-400 mt-0.5">{currentWord.exampleTh}</p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {!isSubmitted ? (
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => handleAnswer(false)}
                    className="py-3 px-4 rounded-2xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/60 text-rose-300 font-semibold text-sm flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                    <span>ยังจำไม่ได้</span>
                  </button>
                  <button
                    onClick={() => handleAnswer(true)}
                    className="py-3 px-4 rounded-2xl bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-800/60 text-emerald-300 font-semibold text-sm flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>จำได้แล้ว</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleNext}
                  className="w-full py-3.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  <span>คำถัดไป</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {/* Multiple Choice Mode (Eng -> Thai) */}
          {mode === 'mcq' && (
            <div className="space-y-4">
              <div className="p-5 rounded-3xl bg-stone-800/70 border border-stone-700 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <button
                    onClick={handleAudio}
                    className="p-2 rounded-xl bg-amber-500/20 text-amber-300 hover:bg-amber-500 hover:text-stone-950 transition cursor-pointer"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                  <span className="text-xs text-stone-400">คำนี้แปลว่าอะไร?</span>
                </div>
                <h3 className="text-3xl font-display font-bold text-stone-100">
                  {currentWord.word}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {mcqOptions.map((opt, idx) => {
                  const isChoiceCorrect = opt === currentWord.th;
                  const isChosen = selectedOption === opt;
                  let btnStyle = 'bg-stone-800/80 border-stone-700/80 text-stone-200 hover:border-stone-500';

                  if (isSubmitted) {
                    if (isChoiceCorrect) {
                      btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                    } else if (isChosen) {
                      btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                    } else {
                      btnStyle = 'opacity-40 bg-stone-800 border-stone-700';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isSubmitted}
                      onClick={() => {
                        setSelectedOption(opt);
                        handleAnswer(opt === currentWord.th);
                      }}
                      className={`p-3.5 px-5 rounded-2xl border text-sm text-left transition cursor-pointer flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {isSubmitted && isChoiceCorrect && <Check className="w-4 h-4 text-emerald-400" />}
                      {isSubmitted && isChosen && !isChoiceCorrect && <X className="w-4 h-4 text-rose-400" />}
                    </button>
                  );
                })}
              </div>

              {isSubmitted && (
                <button
                  onClick={handleNext}
                  className="w-full py-3.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  <span>คำถัดไป</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {/* Reverse MCQ Mode (Thai -> Eng) */}
          {mode === 'reverse_mcq' && (
            <div className="space-y-4">
              <div className="p-5 rounded-3xl bg-stone-800/70 border border-stone-700 text-center">
                <span className="text-xs text-amber-400 font-semibold mb-1 block">
                  คำภาษาอังกฤษคำไหนตรงกับความหมายนี้?
                </span>
                <h3 className="text-2xl font-semibold text-stone-100">
                  "{currentWord.th}"
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {mcqOptions.map((opt, idx) => {
                  const isChoiceCorrect = opt === currentWord.word;
                  const isChosen = selectedOption === opt;
                  let btnStyle = 'bg-stone-800/80 border-stone-700/80 text-stone-200 hover:border-stone-500';

                  if (isSubmitted) {
                    if (isChoiceCorrect) {
                      btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                    } else if (isChosen) {
                      btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                    } else {
                      btnStyle = 'opacity-40 bg-stone-800 border-stone-700';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isSubmitted}
                      onClick={() => {
                        setSelectedOption(opt);
                        handleAnswer(opt === currentWord.word);
                      }}
                      className={`p-4 rounded-2xl border text-base font-english font-semibold text-center transition cursor-pointer flex flex-col items-center justify-center gap-1 ${btnStyle}`}
                    >
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {isSubmitted && (
                <button
                  onClick={handleNext}
                  className="w-full py-3.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  <span>คำถัดไป</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {/* Active Typing Mode */}
          {mode === 'typing' && (
            <div className="space-y-4">
              <div className="p-5 rounded-3xl bg-stone-800/70 border border-stone-700 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <button
                    onClick={handleAudio}
                    className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500 hover:text-stone-950 transition cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <span className="text-xs text-stone-400">พิมพ์คำศัพท์ภาษาอังกฤษ</span>
                </div>
                <h3 className="text-2xl font-bold text-amber-300">
                  {currentWord.th}
                </h3>
                {showHint && (
                  <p className="text-xs font-mono text-stone-400 mt-2">
                    ขึ้นต้นด้วย: <b className="text-amber-400">{currentWord.word.slice(0, 2)}...</b> ({currentWord.word.length} ตัวอักษร)
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <input
                  type="text"
                  autoFocus
                  disabled={isSubmitted}
                  value={typedInput}
                  onChange={(e) => setTypedInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && typedInput.trim() && !isSubmitted) {
                      const cleanInput = typedInput.trim().toLowerCase();
                      const cleanWord = currentWord.word.toLowerCase().replace(/\([^)]*\)/g, '').trim();
                      handleAnswer(cleanInput === cleanWord);
                    }
                  }}
                  placeholder="พิมพ์คำตอบภาษาอังกฤษ..."
                  className="w-full p-4 rounded-2xl bg-stone-800 border border-stone-700 text-center text-xl font-english font-bold text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-amber-500 transition"
                />

                <div className="flex justify-between items-center px-1">
                  {!showHint && !isSubmitted && (
                    <button
                      type="button"
                      onClick={() => setShowHint(true)}
                      className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>ขอคำใบ้</span>
                    </button>
                  )}
                </div>
              </div>

              {!isSubmitted ? (
                <button
                  disabled={!typedInput.trim()}
                  onClick={() => {
                    const cleanInput = typedInput.trim().toLowerCase();
                    const cleanWord = currentWord.word.toLowerCase().replace(/\([^)]*\)/g, '').trim();
                    handleAnswer(cleanInput === cleanWord);
                  }}
                  className="w-full py-3.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-stone-950 font-bold transition cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  ตรวจคำตอบ
                </button>
              ) : (
                <div className="space-y-3 animate-in fade-in">
                  <div className={`p-4 rounded-2xl text-xs flex items-center justify-between border ${
                    isCorrect
                      ? 'bg-emerald-950/60 border-emerald-700 text-emerald-300'
                      : 'bg-rose-950/60 border-rose-700 text-rose-300'
                  }`}>
                    <span>
                      {isCorrect ? '✓ ถูกต้อง ยอดเยี่ยม!' : `✕ คำตอบที่ถูกต้องคือ: `}
                      {!isCorrect && <b className="text-stone-100 font-mono text-sm ml-1">{currentWord.word}</b>}
                    </span>
                    <button onClick={handleAudio} className="p-1 text-stone-300 hover:text-white">
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={handleNext}
                    className="w-full py-3.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-lg shadow-amber-500/20"
                  >
                    <span>คำถัดไป</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
