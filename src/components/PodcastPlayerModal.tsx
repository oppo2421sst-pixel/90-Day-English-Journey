import React, { useState, useEffect, useRef } from 'react';
import { Radio, Play, Pause, SkipForward, SkipBack, Volume2, RotateCcw, X, Sliders, Sparkles } from 'lucide-react';
import { WordItem, UserProfile } from '../types';
import { ALL_WORDS } from '../data/oxfordDataset';
import { playEnglishAudio } from '../utils/speech';

interface PodcastPlayerModalProps {
  onClose: () => void;
  profile: UserProfile;
}

export const PodcastPlayerModal: React.FC<PodcastPlayerModalProps> = ({
  onClose,
  profile,
}) => {
  const [playlist, setPlaylist] = useState<WordItem[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speechRate, setSpeechRate] = useState(0.9);
  const [selectedLevel, setSelectedLevel] = useState<'A1' | 'A2' | 'B1' | 'B2' | 'ALL'>('ALL');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Filter playlist based on selected level
  useEffect(() => {
    const list = selectedLevel === 'ALL'
      ? ALL_WORDS
      : ALL_WORDS.filter((w) => w.level === selectedLevel);
    setPlaylist(list);
    setCurrentIdx(0);
  }, [selectedLevel]);

  const currentWord = playlist[currentIdx] || playlist[0];

  // Play routine for current word
  const speakCurrentWordSequence = () => {
    if (!currentWord) return;

    // 1. Speak word in English
    playEnglishAudio(currentWord.word, profile.accent, speechRate);

    // 2. Speak Thai meaning (using browser speech or simulated audio delay)
    const utteranceTh = new SpeechSynthesisUtterance(currentWord.th);
    utteranceTh.lang = 'th-TH';
    utteranceTh.rate = 1.0;
    utteranceTh.volume = 0.9;

    setTimeout(() => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.speak(utteranceTh);
      }
    }, 1200);

    // 3. Speak example sentence if available
    if (currentWord.exampleEn) {
      setTimeout(() => {
        playEnglishAudio(currentWord.exampleEn!, profile.accent, speechRate);
      }, 2500);
    }
  };

  // Continuous auto-advance loop
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    speakCurrentWordSequence();

    timerRef.current = setInterval(() => {
      setCurrentIdx((prev) => {
        const next = prev + 1 >= playlist.length ? 0 : prev + 1;
        return next;
      });
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentIdx, playlist, speechRate]);

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1 >= playlist.length ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 < 0 ? playlist.length - 1 : prev - 1));
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-stone-100 shadow-2xl relative flex flex-col space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Radio className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-stone-100">
                Hands-Free Podcast & Audio 📻
              </h3>
              <p className="text-[11px] text-stone-400">โหมดเปิดฟังวนขณะเดินทางหรือก่อนนอน (ไม่ต้องมองจอ)</p>
            </div>
          </div>

          <button
            onClick={() => {
              setIsPlaying(false);
              onClose();
            }}
            className="p-1.5 rounded-lg bg-stone-800 text-stone-400 hover:text-white border border-stone-700 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Level Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {(['ALL', 'A1', 'A2', 'B1', 'B2'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-3 py-1 rounded-xl text-xs font-mono transition cursor-pointer shrink-0 ${
                selectedLevel === lvl
                  ? 'bg-cyan-500 text-stone-950 font-bold'
                  : 'bg-stone-800 text-stone-400 border border-stone-700'
              }`}
            >
              {lvl === 'ALL' ? 'คำศัพท์ทั้งหมด' : `CEFR ${lvl}`}
            </button>
          ))}
        </div>

        {/* Player Vinyl / Visual Display */}
        {currentWord && (
          <div className="p-6 rounded-3xl bg-gradient-to-b from-cyan-950/30 to-stone-900 border border-cyan-500/30 text-center space-y-4">
            {/* Animated Audio Waveform Bars */}
            <div className="flex items-center justify-center gap-1 h-12">
              {[40, 70, 30, 90, 60, 100, 45, 80, 50, 95, 35, 75].map((h, i) => (
                <div
                  key={i}
                  className={`w-1.5 rounded-full transition-all duration-300 ${
                    isPlaying ? 'bg-cyan-400 animate-pulse' : 'bg-stone-700'
                  }`}
                  style={{
                    height: isPlaying ? `${h}%` : '20%',
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>

            <div>
              <span className="text-[10px] font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800">
                คำที่ {currentIdx + 1} / {playlist.length} · {currentWord.level} ({currentWord.pos})
              </span>
              <h2 className="text-3xl sm:text-4xl font-english font-bold text-stone-100 mt-2">
                {currentWord.word}
              </h2>
              <p className="text-sm text-stone-300 mt-1">{currentWord.th}</p>
            </div>

            {currentWord.exampleEn && (
              <p className="text-xs text-stone-400 font-english italic border-t border-stone-800/80 pt-3">
                "{currentWord.exampleEn}"
              </p>
            )}
          </div>
        )}

        {/* Audio Player Controls */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handlePrev}
              className="p-3 rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700 transition cursor-pointer"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            <button
              onClick={handleTogglePlay}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition cursor-pointer shadow-xl ${
                isPlaying
                  ? 'bg-amber-500 text-stone-950 shadow-amber-500/30'
                  : 'bg-cyan-500 text-stone-950 shadow-cyan-500/30'
              }`}
            >
              {isPlaying ? <Pause className="w-7 h-7 fill-stone-950" /> : <Play className="w-7 h-7 fill-stone-950 ml-1" />}
            </button>

            <button
              onClick={handleNext}
              className="p-3 rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700 transition cursor-pointer"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          {/* Speed settings */}
          <div className="flex items-center justify-between text-xs text-stone-400 px-4">
            <span>ความเร็วเสียง: {speechRate}x</span>
            <div className="flex items-center gap-2">
              {[0.8, 0.9, 1.0].map((rate) => (
                <button
                  key={rate}
                  onClick={() => setSpeechRate(rate)}
                  className={`px-2.5 py-1 rounded-lg font-mono text-[11px] border transition cursor-pointer ${
                    speechRate === rate
                      ? 'bg-stone-700 text-cyan-300 border-cyan-500/50'
                      : 'bg-stone-800 text-stone-400 border-stone-700'
                  }`}
                >
                  {rate}x
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
