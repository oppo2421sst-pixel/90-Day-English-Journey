import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, ArrowRight, RotateCw, X, TrendingUp, Sparkles, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { WordItem, PlacementResult, CefrLevel } from '../types';
import { generatePlacementQuestions, evaluatePlacementTest } from '../utils/srs';
import { ALL_WORDS } from '../data/oxfordDataset';
import { playEnglishAudio } from '../utils/speech';

interface PlacementTestModalProps {
  onClose: () => void;
  onSaveResult: (result: PlacementResult) => void;
  pastResults: PlacementResult[];
}

export const PlacementTestModal: React.FC<PlacementTestModalProps> = ({
  onClose,
  onSaveResult,
  pastResults,
}) => {
  const [stage, setStage] = useState<'intro' | 'quiz' | 'result'>('intro');
  const [questions, setQuestions] = useState<WordItem[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<{ wordId: number; isCorrect: boolean }[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [finalResult, setFinalResult] = useState<PlacementResult | null>(null);

  const startTest = () => {
    const qs = generatePlacementQuestions(20);
    setQuestions(qs);
    setCurrentIdx(0);
    setAnswers([]);
    setStage('quiz');
    setupQuestion(qs[0]);
  };

  const setupQuestion = (word: WordItem) => {
    setSelectedOption(null);
    setIsAnswered(false);

    const distractors = ALL_WORDS.filter(
      (w) => w.id !== word.id && w.level === word.level && w.th !== word.th
    )
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map((w) => w.th);

    const fullOptions = [...distractors, word.th].sort(() => 0.5 - Math.random());
    setOptions(fullOptions);
  };

  const currentWord = questions[currentIdx];

  const handleSelect = (option: string) => {
    if (isAnswered) return;

    setSelectedOption(option);
    setIsAnswered(true);

    const correct = option === currentWord.th;
    setAnswers((prev) => [...prev, { wordId: currentWord.id, isCorrect: correct }]);
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      const nextWord = questions[currentIdx + 1];
      setCurrentIdx((prev) => prev + 1);
      setupQuestion(nextWord);
    } else {
      // Calculate results
      const res = evaluatePlacementTest(answers);
      setFinalResult(res);
      setStage('result');
      onSaveResult(res);

      try {
        confetti({ particleCount: 70, spread: 70 });
      } catch {}
    }
  };

  const latestPast = pastResults[pastResults.length - 1];

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 text-stone-100 shadow-2xl relative max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-stone-800 text-stone-400 hover:text-white border border-stone-700 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {stage === 'intro' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
              <Award className="w-7 h-7" />
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-stone-100">
                แบบทดสอบวัดระดับ CEFR (Benchmark)
              </h2>
              <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                ทำแบบทดสอบสั้นๆ 20 ข้อ (ผสมคำศัพท์จากทุกระดับ A1, A2, B1, B2) ใช้เวลาเพียง 3 นาที เพื่อประเมินระดับความสามารถและวัดผลความก้าวหน้าตลอด 90 วัน
              </p>
            </div>

            {latestPast && (
              <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-2 text-xs">
                <div className="flex items-center justify-between text-stone-400">
                  <span>ผลการทดสอบล่าสุด ({latestPast.date})</span>
                  <span className="text-emerald-400 font-mono font-bold">
                    ระดับ {latestPast.estimatedLevel} ({latestPast.score}/{latestPast.total} ข้อ)
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-1.5 pt-1">
                  {(['A1', 'A2', 'B1', 'B2'] as CefrLevel[]).map((lvl) => {
                    const data = latestPast.breakdown[lvl];
                    const pct = data?.total ? Math.round((data.correct / data.total) * 100) : 0;
                    return (
                      <div key={lvl} className="p-2 bg-stone-900 rounded-xl text-center">
                        <span className="text-[10px] font-mono text-stone-400 block">{lvl}</span>
                        <b className="text-stone-200 font-mono">{pct}%</b>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <button
              onClick={startTest}
              className="w-full py-3.5 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-lg shadow-emerald-500/20"
            >
              <span>เริ่มทำแบบทดสอบ 20 ข้อ</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {stage === 'quiz' && currentWord && (
          <div className="space-y-4 animate-in fade-in flex-1 flex flex-col justify-between">
            <div>
              {/* Progress */}
              <div className="flex justify-between items-center text-xs font-mono text-stone-400 mb-2">
                <span>ข้อที่ {currentIdx + 1}/20</span>
                <span className="px-2 py-0.5 rounded bg-stone-800 border border-stone-700 text-amber-400">
                  CEFR {currentWord.level}
                </span>
              </div>
              <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden mb-5">
                <div
                  className="bg-emerald-500 h-full transition-all"
                  style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
                />
              </div>

              {/* Question Card */}
              <div className="p-6 rounded-3xl bg-stone-800/80 border border-stone-700 text-center mb-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <button
                    onClick={() => playEnglishAudio(currentWord.word)}
                    className="p-2 rounded-xl bg-amber-500/20 text-amber-300 hover:bg-amber-500 hover:text-stone-950 transition cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <span className="text-xs text-stone-400">คำศัพท์นี้หมายถึงอะไร?</span>
                </div>
                <h3 className="text-3xl font-display font-bold text-stone-100">
                  {currentWord.word}
                </h3>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 gap-2.5">
                {options.map((opt, idx) => {
                  const isChoiceCorrect = opt === currentWord.th;
                  const isChosen = selectedOption === opt;
                  let style = 'bg-stone-800/80 border-stone-700 hover:border-stone-500 text-stone-200';

                  if (isAnswered) {
                    if (isChoiceCorrect) {
                      style = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                    } else if (isChosen) {
                      style = 'bg-rose-950/80 border-rose-500 text-rose-200';
                    } else {
                      style = 'opacity-30 bg-stone-800 border-stone-700';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleSelect(opt)}
                      className={`p-3.5 px-5 rounded-2xl border text-sm text-left transition cursor-pointer flex items-center justify-between ${style}`}
                    >
                      <span>{opt}</span>
                      {isAnswered && isChoiceCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                      {isAnswered && isChosen && !isChoiceCorrect && <XCircle className="w-4 h-4 text-rose-400" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {isAnswered && (
              <button
                onClick={handleNext}
                className="w-full py-3.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold flex items-center justify-center gap-2 transition cursor-pointer mt-4"
              >
                <span>{currentIdx + 1 < questions.length ? 'ข้อต่อไป' : 'ดูผลการประเมิน'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {stage === 'result' && finalResult && (
          <div className="space-y-5 animate-in fade-in">
            <div className="text-center">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                ผลการประเมินระดับ CEFR
              </span>
              <div className="text-4xl font-display font-bold text-stone-100 mt-1 flex items-center justify-center gap-2">
                <span>ระดับ {finalResult.estimatedLevel}</span>
                <Sparkles className="w-6 h-6 text-amber-400" />
              </div>
              <p className="text-xs text-stone-300 mt-2 max-w-md mx-auto leading-relaxed">
                {finalResult.note}
              </p>
            </div>

            {/* Breakdown per level */}
            <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-3">
              <h4 className="text-xs font-semibold text-stone-300">
                คะแนนแยกตามระดับความยาก (CEFR Breakdown)
              </h4>
              <div className="space-y-2">
                {(['A1', 'A2', 'B1', 'B2'] as CefrLevel[]).map((lvl) => {
                  const data = finalResult.breakdown[lvl];
                  const pct = data?.total ? Math.round((data.correct / data.total) * 100) : 0;
                  return (
                    <div key={lvl} className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-stone-300 font-semibold">{lvl} Level</span>
                        <span className="text-stone-400">
                          {data?.correct}/{data?.total} ข้อ ({pct}%)
                        </span>
                      </div>
                      <div className="w-full bg-stone-900 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            lvl === 'A1' ? 'bg-emerald-400' :
                            lvl === 'A2' ? 'bg-sky-400' :
                            lvl === 'B1' ? 'bg-amber-400' : 'bg-purple-400'
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3.5 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold transition cursor-pointer shadow-lg shadow-emerald-500/20"
            >
              เสร็จสิ้นและกลับสู่หน้าหลัก
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
