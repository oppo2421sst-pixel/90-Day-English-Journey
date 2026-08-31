import React, { useState, useEffect } from 'react';
import { 
  BookOpen, CheckCircle, Lock, ArrowRight, Check, X as XIcon, 
  RotateCw, Volume2, Sparkles, Trophy, Award, HelpCircle, 
  ChevronRight, Compass, Flame, CheckCheck, Undo2, Star, ShieldCheck, Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { GrammarLesson, GrammarProgress, UserProfile, CefrLevel, GrammarDifficulty } from '../types';
import { 
  GRAMMAR_LESSONS, 
  isLessonUnlocked, 
  isLessonPassed, 
  isLessonTierUnlocked, 
  isLessonTierPassed, 
  getLessonStars, 
  getTotalGrammarStars 
} from '../data/grammarLessons';
import { getTodayDateString } from '../utils/srs';
import { playSound } from '../utils/soundEffects';
import { playEnglishAudio } from '../utils/speech';

interface GrammarModalProps {
  onClose: () => void;
  grammarProgress: GrammarProgress;
  onSaveProgress: (updated: GrammarProgress, xpGained: number) => void;
  profile: UserProfile;
  initialLessonId?: string | null;
}

const TIER_META: Record<GrammarDifficulty, { nameTh: string; color: string; bg: string; border: string; stars: number; xp: number; desc: string }> = {
  easy: {
    nameTh: 'ระดับ 1: พื้นฐาน & การจดจำ (Easy)',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    stars: 1,
    xp: 30,
    desc: 'เน้นความเข้าใจโครงสร้างหลักและตัวเลือกพื้นฐาน',
  },
  medium: {
    nameTh: 'ระดับ 2: เรียงประโยค & ไหวพริบ (Medium)',
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/30',
    stars: 2,
    xp: 45,
    desc: 'เน้นการเรียงบล็อกคำศัพท์แต่งประโยคและกริยาเฉพาะ',
  },
  hard: {
    nameTh: 'ระดับ 3: ประยุกต์ขั้นสูง & จับจุดผิด (Hard)',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    stars: 3,
    xp: 60,
    desc: 'เน้น Error Identification, Inversion และการใช้ระดับสูง',
  },
};

export const GrammarModal: React.FC<GrammarModalProps> = ({
  onClose,
  grammarProgress,
  onSaveProgress,
  profile,
  initialLessonId = null,
}) => {
  const [selectedLesson, setSelectedLesson] = useState<GrammarLesson | null>(null);
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<'ALL' | CefrLevel>('ALL');
  const [selectedTier, setSelectedTier] = useState<GrammarDifficulty>('easy');
  
  // Quiz state
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [typedAnswer, setTypedAnswer] = useState('');
  
  // Scramble / Sentence Construction state
  const [constructedWords, setConstructedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<{ id: string; word: string; used: boolean }[]>([]);
  
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [viewState, setViewState] = useState<'list' | 'lesson' | 'quiz' | 'summary'>('list');
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Auto-open initial lesson if provided
  useEffect(() => {
    if (initialLessonId) {
      const found = GRAMMAR_LESSONS.find(l => l.id === initialLessonId);
      if (found) {
        setSelectedLesson(found);
        setSelectedTier('easy');
        setViewState('lesson');
      }
    }
  }, [initialLessonId]);

  // Overall stats
  const totalLessons = GRAMMAR_LESSONS.length;
  const passedCount = GRAMMAR_LESSONS.filter(l => isLessonPassed(l.id, grammarProgress)).length;
  const totalStars = getTotalGrammarStars(grammarProgress);
  const maxPossibleStars = totalLessons * 3;
  const progressPercent = Math.round((totalStars / maxPossibleStars) * 100);

  const startLesson = (lesson: GrammarLesson) => {
    setSelectedLesson(lesson);
    // Default to the first uncompleted tier or easy
    if (isLessonTierPassed(lesson.id, 'medium', grammarProgress)) {
      setSelectedTier('hard');
    } else if (isLessonTierPassed(lesson.id, 'easy', grammarProgress)) {
      setSelectedTier('medium');
    } else {
      setSelectedTier('easy');
    }
    setViewState('lesson');
  };

  const getExercisesForTier = (lesson: GrammarLesson, tier: GrammarDifficulty) => {
    if (lesson.difficultyTiers && lesson.difficultyTiers[tier]) {
      return lesson.difficultyTiers[tier].exercises;
    }
    return lesson.exercises || [];
  };

  const startQuiz = (lesson: GrammarLesson, tier: GrammarDifficulty = selectedTier) => {
    setSelectedLesson(lesson);
    setSelectedTier(tier);
    setQuizIdx(0);
    setQuizScore(0);
    setIsAnswered(false);
    setSelectedChoice(null);
    setTypedAnswer('');
    setIsCorrect(null);
    
    // Init first question
    initQuestionState(lesson, tier, 0);
    setViewState('quiz');
  };

  const initQuestionState = (lesson: GrammarLesson, tier: GrammarDifficulty, index: number) => {
    setIsAnswered(false);
    setSelectedChoice(null);
    setTypedAnswer('');
    setIsCorrect(null);
    
    const exercises = getExercisesForTier(lesson, tier);
    const ex = exercises[index];
    if (ex && ex.type === 'reorder' && ex.scrambledWords) {
      const wordsWithIds = [...ex.scrambledWords]
        .sort(() => Math.random() - 0.5)
        .map((w, i) => ({ id: `${w}-${i}-${Date.now()}`, word: w, used: false }));
      setAvailableWords(wordsWithIds);
      setConstructedWords([]);
    }
  };

  const handleChoiceSelect = (choiceIdx: number) => {
    if (isAnswered || !selectedLesson) return;
    setSelectedChoice(choiceIdx);
    setIsAnswered(true);

    const exercises = getExercisesForTier(selectedLesson, selectedTier);
    const currentEx = exercises[quizIdx];
    const correct = choiceIdx === currentEx.answer;
    setIsCorrect(correct);
    if (correct) {
      setQuizScore((prev) => prev + 1);
      playSound.correct();
    } else {
      playSound.wrong();
    }
  };

  const handleTypeSubmit = () => {
    if (isAnswered || !selectedLesson || !typedAnswer.trim()) return;
    setIsAnswered(true);

    const exercises = getExercisesForTier(selectedLesson, selectedTier);
    const currentEx = exercises[quizIdx];
    const normalizedInput = typedAnswer.trim().toLowerCase().replace(/[.,!?;:]/g, '');
    const normalizedTarget = String(currentEx.answer).trim().toLowerCase().replace(/[.,!?;:]/g, '');
    
    const correct = normalizedInput === normalizedTarget;
    setIsCorrect(correct);
    if (correct) {
      setQuizScore((prev) => prev + 1);
      playSound.correct();
    } else {
      playSound.wrong();
    }
  };

  const handleTileClick = (tileId: string, word: string) => {
    if (isAnswered) return;
    setAvailableWords(prev => prev.map(item => item.id === tileId ? { ...item, used: true } : item));
    setConstructedWords(prev => [...prev, word]);
  };

  const handleRemoveConstructedWord = (index: number) => {
    if (isAnswered) return;
    const wordToRemove = constructedWords[index];
    const newConstructed = [...constructedWords];
    newConstructed.splice(index, 1);
    setConstructedWords(newConstructed);

    setAvailableWords(prev => {
      let freed = false;
      return prev.map(item => {
        if (!freed && item.word === wordToRemove && item.used) {
          freed = true;
          return { ...item, used: false };
        }
        return item;
      });
    });
  };

  const handleResetTiles = () => {
    if (isAnswered || !selectedLesson) return;
    const exercises = getExercisesForTier(selectedLesson, selectedTier);
    const currentEx = exercises[quizIdx];
    if (currentEx && currentEx.scrambledWords) {
      setAvailableWords(prev => prev.map(item => ({ ...item, used: false })));
      setConstructedWords([]);
    }
  };

  const handleCheckReorderSentence = () => {
    if (isAnswered || !selectedLesson || constructedWords.length === 0) return;
    setIsAnswered(true);

    const exercises = getExercisesForTier(selectedLesson, selectedTier);
    const currentEx = exercises[quizIdx];
    const assembledString = constructedWords.join(' ').trim().toLowerCase().replace(/[.,!?;:]/g, '');
    const targetString = String(currentEx.answer).trim().toLowerCase().replace(/[.,!?;:]/g, '');

    const correct = assembledString === targetString;
    setIsCorrect(correct);
    if (correct) {
      setQuizScore(prev => prev + 1);
      playSound.correct();
    } else {
      playSound.wrong();
    }
  };

  const handleNextQuestion = () => {
    if (!selectedLesson) return;
    const exercises = getExercisesForTier(selectedLesson, selectedTier);

    if (quizIdx + 1 < exercises.length) {
      const nextIdx = quizIdx + 1;
      setQuizIdx(nextIdx);
      initQuestionState(selectedLesson, selectedTier, nextIdx);
    } else {
      // Finished all questions in this difficulty tier
      const total = exercises.length;
      const finalScore = quizScore;
      const passingScore = Math.ceil(total * 0.6);
      const passed = finalScore >= passingScore;

      const existingRecord = grammarProgress.completedLessons[selectedLesson.id] || {
        score: finalScore,
        total,
        date: getTodayDateString(),
        passed,
        tiers: {}
      };

      const updatedTiers = {
        ...(existingRecord.tiers || {}),
        [selectedTier]: {
          score: finalScore,
          total,
          date: getTodayDateString(),
          passed
        }
      };

      const updated: GrammarProgress = {
        completedLessons: {
          ...grammarProgress.completedLessons,
          [selectedLesson.id]: {
            ...existingRecord,
            score: Math.max(existingRecord.score || 0, finalScore),
            total,
            date: getTodayDateString(),
            passed: existingRecord.passed || passed,
            tiers: updatedTiers
          },
        },
      };

      const xpGained = passed ? TIER_META[selectedTier].xp : 10;

      if (passed) {
        onSaveProgress(updated, xpGained);
        playSound.levelUp();
        try {
          confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
        } catch {}
      } else {
        onSaveProgress(updated, xpGained);
        playSound.wrong();
      }

      setViewState('summary');
    }
  };

  const handleSpeak = async (text: string) => {
    setIsSpeaking(true);
    await playEnglishAudio(text, profile.accent, profile.speechRate);
    setIsSpeaking(false);
  };

  // Find next lesson to allow progression
  const currentLessonIndex = selectedLesson ? GRAMMAR_LESSONS.findIndex(l => l.id === selectedLesson.id) : -1;
  const nextLesson = (currentLessonIndex >= 0 && currentLessonIndex < GRAMMAR_LESSONS.length - 1)
    ? GRAMMAR_LESSONS[currentLessonIndex + 1]
    : null;

  // Filter lessons based on active level tab
  const filteredLessons = GRAMMAR_LESSONS.filter(lesson => {
    if (selectedLevelFilter === 'ALL') return true;
    return lesson.level === selectedLevelFilter;
  });

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-2xl w-full p-5 sm:p-7 text-stone-100 shadow-2xl relative max-h-[92vh] flex flex-col">
        
        {/* Header bar */}
        <div className="flex items-center justify-between gap-4 pb-3.5 border-b border-stone-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-base sm:text-lg text-stone-100 flex items-center gap-2">
                <span>ไวยากรณ์ & แต่งประโยค 3 ระดับความยาก 📘</span>
              </h2>
              <p className="text-[11px] text-stone-400">
                24 บทเรียน × 3 ระดับ (Easy ⭐, Medium ⭐⭐, Hard ⭐⭐⭐) ปลดล็อกต่อเนื่องตามทักษะ!
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-white bg-stone-800/80 hover:bg-stone-800 border border-stone-700 cursor-pointer transition"
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>

        {/* ============================================================== */}
        {/* 1. LIST VIEW: CURRICULUM & PROGRESSION ROADMAP */}
        {/* ============================================================== */}
        {viewState === 'list' && (
          <div className="flex-1 flex flex-col min-h-0 pt-3 space-y-3.5">
            {/* Overall Mastery Progress Bar */}
            <div className="p-3.5 rounded-2xl bg-stone-950/60 border border-stone-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-300 font-semibold flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  ความก้าวหน้าดาวรวม (Curriculum Mastery)
                </span>
                <span className="font-mono text-amber-400 font-bold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {totalStars}/{maxPossibleStars} ดาว ({progressPercent}%) · ผ่านแล้ว {passedCount}/24 บท
                </span>
              </div>
              <div className="w-full bg-stone-800 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 via-sky-400 to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(progressPercent, 4)}%` }}
                />
              </div>
            </div>

            {/* CEFR Level Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              {(['ALL', 'A1', 'A2', 'B1', 'B2'] as const).map(lvl => {
                const countInLevel = lvl === 'ALL' 
                  ? GRAMMAR_LESSONS.length 
                  : GRAMMAR_LESSONS.filter(l => l.level === lvl).length;
                const passedInLevel = lvl === 'ALL'
                  ? passedCount
                  : GRAMMAR_LESSONS.filter(l => l.level === lvl && isLessonPassed(l.id, grammarProgress)).length;

                const isActive = selectedLevelFilter === lvl;
                return (
                  <button
                    key={lvl}
                    onClick={() => setSelectedLevelFilter(lvl)}
                    className={`px-3 py-1.5 rounded-xl font-mono text-xs font-semibold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                      isActive 
                        ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20' 
                        : 'bg-stone-800/80 text-stone-300 hover:bg-stone-800 border border-stone-700/60'
                    }`}
                  >
                    <span>{lvl === 'ALL' ? 'ทั้งหมด (All)' : `ระดับ ${lvl}`}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                      isActive ? 'bg-stone-950/20 text-stone-950' : 'bg-stone-900 text-stone-400'
                    }`}>
                      {passedInLevel}/{countInLevel}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Scrollable Lesson Grid */}
            <div className="space-y-2.5 overflow-y-auto pr-1 flex-1">
              {filteredLessons.map((lesson) => {
                const globalIndex = GRAMMAR_LESSONS.findIndex(l => l.id === lesson.id);
                const isUnlocked = isLessonUnlocked(globalIndex, GRAMMAR_LESSONS, grammarProgress);
                const stars = getLessonStars(lesson.id, grammarProgress);
                const passed = isLessonPassed(lesson.id, grammarProgress);
                const prevLesson = globalIndex > 0 ? GRAMMAR_LESSONS[globalIndex - 1] : null;

                const easyPassed = isLessonTierPassed(lesson.id, 'easy', grammarProgress);
                const mediumPassed = isLessonTierPassed(lesson.id, 'medium', grammarProgress);
                const hardPassed = isLessonTierPassed(lesson.id, 'hard', grammarProgress);

                return (
                  <div
                    key={lesson.id}
                    onClick={() => {
                      if (isUnlocked) {
                        startLesson(lesson);
                      }
                    }}
                    className={`p-3.5 sm:p-4 rounded-2xl border transition flex items-center justify-between gap-3 ${
                      isUnlocked
                        ? passed
                          ? 'bg-stone-900 hover:bg-stone-850 border-emerald-900/40 hover:border-emerald-700/70 cursor-pointer'
                          : 'bg-stone-850 hover:bg-stone-800 border-stone-700/80 hover:border-amber-500/60 cursor-pointer shadow-md'
                        : 'bg-stone-950/40 border-stone-800/50 opacity-40 cursor-not-allowed'
                    }`}
                  >
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border ${
                          lesson.level === 'A1' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
                          lesson.level === 'A2' ? 'bg-sky-500/20 text-sky-300 border-sky-500/30' :
                          lesson.level === 'B1' ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' :
                          'bg-rose-500/20 text-rose-300 border-rose-500/30'
                        }`}>
                          {lesson.level}
                        </span>
                        <h4 className="text-sm font-semibold text-stone-100 truncate">
                          {lesson.titleTh}
                        </h4>
                      </div>
                      
                      <p className="text-xs text-stone-400 line-clamp-1">{lesson.summary}</p>
                      
                      {/* Difficulty Tiers Badges */}
                      {isUnlocked && (
                        <div className="flex items-center gap-1.5 pt-0.5">
                          <span className={`text-[10px] px-2 py-0.5 rounded-md font-mono flex items-center gap-1 border ${
                            easyPassed 
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold' 
                              : 'bg-stone-800 text-stone-400 border-stone-700'
                          }`}>
                            <Star className={`w-2.5 h-2.5 ${easyPassed ? 'fill-amber-400 text-amber-400' : 'text-stone-500'}`} />
                            Easy
                          </span>

                          <span className={`text-[10px] px-2 py-0.5 rounded-md font-mono flex items-center gap-1 border ${
                            mediumPassed 
                              ? 'bg-sky-500/20 text-sky-300 border-sky-500/40 font-bold' 
                              : 'bg-stone-800 text-stone-400 border-stone-700'
                          }`}>
                            <Star className={`w-2.5 h-2.5 ${mediumPassed ? 'fill-sky-400 text-sky-400' : 'text-stone-500'}`} />
                            Medium
                          </span>

                          <span className={`text-[10px] px-2 py-0.5 rounded-md font-mono flex items-center gap-1 border ${
                            hardPassed 
                              ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 font-bold' 
                              : 'bg-stone-800 text-stone-400 border-stone-700'
                          }`}>
                            <Star className={`w-2.5 h-2.5 ${hardPassed ? 'fill-purple-400 text-purple-400' : 'text-stone-500'}`} />
                            Hard
                          </span>
                        </div>
                      )}

                      {!isUnlocked && prevLesson && (
                        <p className="text-[11px] text-amber-400/80 flex items-center gap-1">
                          <Lock className="w-3 h-3" />
                          <span>ต้องผ่านบทที่ {globalIndex}: {prevLesson.titleTh.replace(/^\d+\.\s*/, '')} ก่อน</span>
                        </p>
                      )}
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      {isUnlocked ? (
                        <div className="flex flex-col items-end gap-1">
                          <div className="flex items-center gap-0.5 text-amber-400">
                            {[1, 2, 3].map((s) => (
                              <Star 
                                key={s} 
                                className={`w-3.5 h-3.5 ${s <= stars ? 'fill-amber-400 text-amber-400' : 'text-stone-700'}`} 
                              />
                            ))}
                          </div>
                          <span className="text-[10px] font-mono text-stone-400">
                            {stars}/3 ดาว
                          </span>
                        </div>
                      ) : (
                        <span className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-600">
                          <Lock className="w-4 h-4" />
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* 2. LESSON CONTENT & DIFFICULTY TIER SELECTOR */}
        {/* ============================================================== */}
        {viewState === 'lesson' && selectedLesson && (
          <div className="space-y-4 animate-in fade-in flex-1 overflow-y-auto pr-1 pt-2">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${
                  selectedLesson.level === 'A1' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
                  selectedLesson.level === 'A2' ? 'bg-sky-500/20 text-sky-300 border-sky-500/30' :
                  selectedLesson.level === 'B1' ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' :
                  'bg-rose-500/20 text-rose-300 border-rose-500/30'
                }`}>
                  LEVEL {selectedLesson.level}
                </span>
                <span className="text-xs text-stone-400 font-english font-medium">
                  {selectedLesson.title}
                </span>
              </div>
              <h3 className="text-xl font-display font-bold text-stone-100">
                {selectedLesson.titleTh}
              </h3>
            </div>

            {/* Sentence Formula Box */}
            {selectedLesson.sentencePattern && (
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    โครงสร้างประโยค (Sentence Formula)
                  </span>
                </div>
                <p className="font-english font-bold text-amber-200 text-sm sm:text-base">
                  {selectedLesson.sentencePattern}
                </p>
              </div>
            )}

            {/* Rule Explanation Box */}
            <div className="p-4 rounded-2xl bg-stone-800/90 border border-stone-700 space-y-2 text-xs">
              <h4 className="font-semibold text-amber-300 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                กฎและหลักการจำสำคัญ
              </h4>
              <p className="text-stone-200 whitespace-pre-line leading-relaxed">
                {selectedLesson.ruleExplanation}
              </p>
            </div>

            {/* Example Sentences with Audio */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-stone-300 flex items-center justify-between">
                <span>ประโยคตัวอย่างที่ใช้จริงในชีวิตประจำวัน</span>
                <span className="text-[10px] text-stone-400">แตะเพื่อฟังสำเนียง</span>
              </h4>
              <div className="space-y-2">
                {selectedLesson.examples.map((ex, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => handleSpeak(ex.en)}
                    className="p-3 bg-stone-800/60 hover:bg-stone-800 rounded-xl border border-stone-700/60 transition cursor-pointer flex items-center justify-between gap-3 group"
                  >
                    <div>
                      <p className="font-english font-bold text-stone-100 text-sm group-hover:text-amber-300 transition">
                        {ex.en}
                      </p>
                      <p className="text-stone-400 text-xs mt-0.5">{ex.th}</p>
                    </div>
                    <button className="p-2 rounded-lg bg-stone-700 text-stone-300 group-hover:bg-amber-500 group-hover:text-stone-950 transition shrink-0">
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* ============================================================== */}
            {/* 3-TIER DIFFICULTY SELECTION BOX */}
            {/* ============================================================== */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-stone-200 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  เลือกระดับความยากเพื่อทดสอบ (3 Difficulty Tiers)
                </h4>
                <span className="text-[11px] text-amber-400 font-mono font-semibold">
                  ได้คะแนน ≥60% ปลดล็อกระดับถัดไป
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {(['easy', 'medium', 'hard'] as const).map((tierKey) => {
                  const globalIdx = GRAMMAR_LESSONS.findIndex(l => l.id === selectedLesson.id);
                  const isTierUnlocked = isLessonTierUnlocked(globalIdx, tierKey, GRAMMAR_LESSONS, grammarProgress);
                  const isTierPassedAlready = isLessonTierPassed(selectedLesson.id, tierKey, grammarProgress);
                  const isCurrent = selectedTier === tierKey;
                  const meta = TIER_META[tierKey];
                  const tierExercises = getExercisesForTier(selectedLesson, tierKey);

                  return (
                    <button
                      key={tierKey}
                      disabled={!isTierUnlocked}
                      onClick={() => setSelectedTier(tierKey)}
                      className={`p-3 rounded-2xl border text-left transition relative flex flex-col justify-between cursor-pointer ${
                        !isTierUnlocked
                          ? 'opacity-35 bg-stone-950 border-stone-800 cursor-not-allowed'
                          : isCurrent
                            ? `${meta.bg} ${meta.border} shadow-lg ring-2 ring-amber-500/40`
                            : 'bg-stone-800/80 hover:bg-stone-800 border-stone-700/80'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className={`text-xs font-bold font-mono ${meta.color}`}>
                            {tierKey.toUpperCase()}
                          </span>
                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: meta.stars }).map((_, i) => (
                              <Star key={i} className={`w-3 h-3 fill-amber-400 text-amber-400`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs font-semibold text-stone-200">
                          {tierKey === 'easy' ? 'ระดับ 1: พื้นฐาน' : tierKey === 'medium' ? 'ระดับ 2: แต่งประโยค' : 'ระดับ 3: ขั้นสูง & Error'}
                        </p>
                        <p className="text-[10px] text-stone-400 mt-0.5 line-clamp-2">
                          {meta.desc}
                        </p>
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-stone-700/40 flex items-center justify-between text-[11px]">
                        <span className="text-stone-400 font-mono">{tierExercises.length} ข้อ · +{meta.xp}XP</span>
                        {isTierPassedAlready ? (
                          <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                            <Check className="w-3 h-3" /> ผ่านแล้ว
                          </span>
                        ) : isTierUnlocked ? (
                          <span className="text-amber-400 font-semibold">พร้อมลุย</span>
                        ) : (
                          <span className="text-stone-500 flex items-center gap-0.5">
                            <Lock className="w-3 h-3" /> ล็อก
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex gap-2.5 pt-3">
              <button
                onClick={() => setViewState('list')}
                className="py-3 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700 text-xs font-semibold cursor-pointer transition"
              >
                ← กลับหน้ารวม
              </button>
              <button
                onClick={() => startQuiz(selectedLesson, selectedTier)}
                className="flex-1 py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold flex items-center justify-center gap-2 transition cursor-pointer text-xs shadow-lg shadow-amber-500/20"
              >
                <span>เริ่มทำแบบทดสอบระดับ {selectedTier.toUpperCase()} ({getExercisesForTier(selectedLesson, selectedTier).length} ข้อ)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* 3. QUIZ & SENTENCE CONSTRUCTION VIEW */}
        {/* ============================================================== */}
        {viewState === 'quiz' && selectedLesson && (
          <div className="space-y-4 animate-in fade-in flex-1 flex flex-col justify-between pt-1">
            {(() => {
              const exercises = getExercisesForTier(selectedLesson, selectedTier);
              const currentEx = exercises[quizIdx] || exercises[0];

              if (!currentEx) {
                return (
                  <div className="text-center py-8">
                    <p className="text-stone-400">ไม่พบข้อสอบในระดับนี้</p>
                    <button onClick={() => setViewState('lesson')} className="mt-3 px-4 py-2 bg-stone-800 rounded-xl text-xs">
                      กลับหน้าบทเรียน
                    </button>
                  </div>
                );
              }

              return (
                <div className="space-y-4">
                  {/* Progress Header */}
                  <div className="flex justify-between items-center text-xs font-mono text-stone-400">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${TIER_META[selectedTier].bg} ${TIER_META[selectedTier].border} ${TIER_META[selectedTier].color}`}>
                        {selectedTier.toUpperCase()} ⭐ × {TIER_META[selectedTier].stars}
                      </span>
                      <span>
                        ข้อที่ {quizIdx + 1}/{exercises.length}
                      </span>
                    </div>
                    <span className="text-amber-400 font-bold">
                      คะแนน: {quizScore}/{quizIdx + (isAnswered ? 1 : 0)}
                    </span>
                  </div>

                  {/* Question Prompt Card */}
                  <div className="p-4 sm:p-5 rounded-3xl bg-stone-800/90 border border-stone-700 text-center space-y-2 relative">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-xs text-amber-400 font-semibold px-2.5 py-0.5 bg-amber-500/10 rounded-full border border-amber-500/20">
                        {currentEx.type === 'reorder' ? '🧩 เรียงคำแต่งประโยคให้ถูกต้อง' :
                         currentEx.type === 'type' ? '⌨️ พิมพ์คำตอบที่ถูกต้อง' : '🎯 เลือกตัวเลือกที่ถูกต้อง'}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-english font-bold text-stone-100 leading-snug">
                      {currentEx.prompt}
                    </h3>
                  </div>

                  {/* 3.1 CHOICE TYPE */}
                  {currentEx.type === 'choice' && currentEx.options && (
                    <div className="grid grid-cols-1 gap-2.5">
                      {currentEx.options.map((opt, idx) => {
                        const isThisChoiceCorrect = idx === currentEx.answer;
                        const isChosen = selectedChoice === idx;
                        let style = 'bg-stone-800/80 hover:bg-stone-800 border-stone-700 text-stone-200';

                        if (isAnswered) {
                          if (isThisChoiceCorrect) {
                            style = 'bg-emerald-950/90 border-emerald-500 text-emerald-200 font-bold shadow-md shadow-emerald-500/20';
                          } else if (isChosen) {
                            style = 'bg-rose-950/90 border-rose-500 text-rose-200';
                          } else {
                            style = 'opacity-35 bg-stone-900 border-stone-800';
                          }
                        }

                        return (
                          <button
                            key={idx}
                            disabled={isAnswered}
                            onClick={() => handleChoiceSelect(idx)}
                            className={`p-3.5 px-4 rounded-xl border text-sm font-english transition cursor-pointer flex items-center justify-between ${style}`}
                          >
                            <span>{opt}</span>
                            {isAnswered && isThisChoiceCorrect && (
                              <span className="p-1 rounded bg-emerald-500 text-stone-950">
                                <Check className="w-3.5 h-3.5" />
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* 3.2 SENTENCE REORDER / WORD TILES TYPE */}
                  {currentEx.type === 'reorder' && (
                    <div className="space-y-3.5">
                      {/* Constructed Line Dropzone */}
                      <div className="p-4 rounded-2xl bg-stone-950 border-2 border-dashed border-stone-700 min-h-[64px] flex flex-wrap items-center gap-2">
                        {constructedWords.length === 0 ? (
                          <span className="text-xs text-stone-500 italic">
                            แตะคำด้านล่างเพื่อเรียงเป็นประโยคที่สมบูรณ์...
                          </span>
                        ) : (
                          constructedWords.map((word, idx) => (
                            <button
                              key={idx}
                              disabled={isAnswered}
                              onClick={() => handleRemoveConstructedWord(idx)}
                              className={`py-1.5 px-3 rounded-xl font-english font-bold text-sm shadow-md transition flex items-center gap-1.5 cursor-pointer ${
                                isAnswered
                                  ? isCorrect
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-rose-600 text-white'
                                  : 'bg-amber-500 hover:bg-amber-400 text-stone-950'
                              }`}
                            >
                              <span>{word}</span>
                              {!isAnswered && <span className="text-xs opacity-60">×</span>}
                            </button>
                          ))
                        )}
                      </div>

                      {/* Word Bank */}
                      {!isAnswered && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs text-stone-400">
                            <span>คลังคำศัพท์ (แตะเพื่อเลือก):</span>
                            {constructedWords.length > 0 && (
                              <button
                                onClick={handleResetTiles}
                                className="text-xs text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                              >
                                <Undo2 className="w-3 h-3" />
                                <span>รีเซ็ตคำทั้งหมด</span>
                              </button>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {availableWords.map((item) => (
                              <button
                                key={item.id}
                                disabled={item.used}
                                onClick={() => handleTileClick(item.id, item.word)}
                                className={`py-2 px-3.5 rounded-xl font-english font-semibold text-sm transition border ${
                                  item.used
                                    ? 'opacity-25 bg-stone-900 border-stone-800 text-stone-600 cursor-not-allowed'
                                    : 'bg-stone-800 hover:bg-stone-750 border-stone-700 text-stone-100 hover:border-amber-500 cursor-pointer'
                                }`}
                              >
                                {item.word}
                              </button>
                            ))}
                          </div>

                          <button
                            disabled={constructedWords.length === 0}
                            onClick={handleCheckReorderSentence}
                            className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs cursor-pointer disabled:opacity-40 transition shadow-md shadow-amber-500/20"
                          >
                            ตรวจการแต่งประโยค
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* 3.3 TYPE SUBMIT TYPE */}
                  {currentEx.type === 'type' && (
                    <div className="space-y-3">
                      <input
                        type="text"
                        autoFocus
                        disabled={isAnswered}
                        value={typedAnswer}
                        onChange={(e) => setTypedAnswer(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleTypeSubmit();
                        }}
                        placeholder="พิมพ์คำตอบภาษาอังกฤษ..."
                        className="w-full p-3.5 rounded-xl bg-stone-800 border border-stone-700 text-center font-english text-base text-stone-100 focus:outline-none focus:border-amber-500"
                      />
                      {!isAnswered && (
                        <button
                          disabled={!typedAnswer.trim()}
                          onClick={handleTypeSubmit}
                          className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs cursor-pointer disabled:opacity-40"
                        >
                          ตรวจคำตอบ
                        </button>
                      )}
                    </div>
                  )}

                  {/* EXPLANATION CARD (SHOWN AFTER ANSWER) */}
                  {isAnswered && (
                    <div className={`p-4 rounded-2xl border text-xs animate-in fade-in space-y-1.5 ${
                      isCorrect 
                        ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-200' 
                        : 'bg-rose-950/40 border-rose-800/60 text-rose-200'
                    }`}>
                      <div className="flex items-center justify-between">
                        <b className="font-bold flex items-center gap-1.5">
                          {isCorrect ? '✅ ถูกต้องยอดเยี่ยม!' : '❌ ยังไม่ถูกต้อง (คำตอบที่ถูกแสดงด้านล่าง)'}
                        </b>
                        <button
                          onClick={() => handleSpeak(String(currentEx.answer))}
                          className="p-1 rounded bg-stone-800 text-stone-300 hover:text-white cursor-pointer"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {currentEx.type === 'reorder' && (
                        <p className="font-english font-bold text-sm text-stone-100">
                          เฉลย: {String(currentEx.answer)}
                        </p>
                      )}

                      {currentEx.explanation && (
                        <p className="text-stone-300 pt-0.5 leading-relaxed">
                          <b>คำอธิบาย:</b> {currentEx.explanation}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Next Button */}
            {isAnswered && (
              <button
                onClick={handleNextQuestion}
                className="w-full py-3.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold flex items-center justify-center gap-2 transition cursor-pointer mt-4 shadow-lg shadow-amber-500/20"
              >
                <span>
                  {quizIdx + 1 < getExercisesForTier(selectedLesson, selectedTier).length 
                    ? 'ข้อต่อไป →' 
                    : 'ดูผลคะแนนและการปลดล็อก 🏆'}
                </span>
              </button>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* 4. SUMMARY VIEW: MASTERY ASSESSMENT & DIRECT PROGRESSION */}
        {/* ============================================================== */}
        {viewState === 'summary' && selectedLesson && (
          <div className="space-y-5 text-center animate-in fade-in py-3">
            {(() => {
              const exercises = getExercisesForTier(selectedLesson, selectedTier);
              const total = exercises.length;
              const passingScore = Math.ceil(total * 0.6);
              const passed = quizScore >= passingScore;
              const meta = TIER_META[selectedTier];

              const nextTier: GrammarDifficulty | null = 
                selectedTier === 'easy' ? 'medium' :
                selectedTier === 'medium' ? 'hard' : null;

              return (
                <>
                  <div className={`w-16 h-16 rounded-3xl flex items-center justify-center mx-auto border shadow-xl ${
                    passed 
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50 shadow-emerald-500/20' 
                      : 'bg-rose-500/20 text-rose-400 border-rose-500/50'
                  }`}>
                    {passed ? <Trophy className="w-9 h-9" /> : <RotateCw className="w-9 h-9" />}
                  </div>

                  <div>
                    <h3 className="text-2xl font-display font-bold text-stone-100">
                      {passed ? `🎉 ผ่านระดับ ${selectedTier.toUpperCase()} สำเร็จ!` : `ยังไม่ผ่านระดับ ${selectedTier.toUpperCase()}`}
                    </h3>
                    <p className="text-xs text-stone-300 mt-1.5 max-w-md mx-auto leading-relaxed">
                      {passed ? (
                        <>
                          คุณทำคะแนนได้ <b className="text-emerald-400 font-mono text-sm">{quizScore}/{total}</b> ข้อ 
                          · ได้รับ <b className="text-amber-400">+{meta.xp} XP</b> และ <b className="text-cyan-400">+{meta.stars * 10} Gems 💎</b>
                          <span className="block text-emerald-300 font-semibold mt-1">
                            {nextTier 
                              ? `🔓 ปลดล็อกระดับ ${nextTier.toUpperCase()} (⭐ × ${TIER_META[nextTier].stars}) ให้คุณท้าทายต่อทันที!`
                              : '🌟 ยอดเยี่ยมมาก! คุณพิชิตครบทุก 3 ระดับความยากของบทเรียนนี้แล้ว!'}
                          </span>
                        </>
                      ) : (
                        <>
                          คุณทำคะแนนได้ <b className="text-rose-400 font-mono text-sm">{quizScore}/{total}</b> ข้อ (เกณฑ์ผ่านคือ {passingScore} ข้อ)
                          <span className="block text-stone-400 mt-1">
                            ลองทบทวนหลักการอีกนิดแล้วทดสอบใหม่อีกครั้ง คุณทำได้แน่นอน!
                          </span>
                        </>
                      )}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2.5 pt-2 max-w-md mx-auto">
                    {passed && nextTier && (
                      <button
                        onClick={() => {
                          startQuiz(selectedLesson, nextTier);
                        }}
                        className="w-full py-3.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-lg shadow-amber-500/20 text-sm"
                      >
                        <Zap className="w-4 h-4" />
                        <span>ท้าทายระดับ {nextTier.toUpperCase()} ต่อทันที!</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}

                    {passed && !nextTier && nextLesson && (
                      <button
                        onClick={() => {
                          startLesson(nextLesson);
                        }}
                        className="w-full py-3.5 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-lg shadow-emerald-500/20 text-sm"
                      >
                        <span>เริ่มเรียนบทถัดไป ({nextLesson.titleTh})</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}

                    {!passed && (
                      <button
                        onClick={() => startQuiz(selectedLesson, selectedTier)}
                        className="w-full py-3.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-lg shadow-amber-500/20 text-sm"
                      >
                        <RotateCw className="w-4 h-4" />
                        <span>ลองทำระดับ {selectedTier.toUpperCase()} อีกครั้ง</span>
                      </button>
                    )}

                    <div className="flex gap-2">
                      <button
                        onClick={() => setViewState('lesson')}
                        className="flex-1 py-3 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold cursor-pointer transition border border-stone-700"
                      >
                        📖 เลือกระดับ / อ่านสรุป
                      </button>
                      <button
                        onClick={() => setViewState('list')}
                        className="flex-1 py-3 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold cursor-pointer transition border border-stone-700"
                      >
                        หน้ารวมบทเรียนทั้งหมด
                      </button>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};
