import React, { useState, useEffect } from 'react';
import { Timer, Zap, Trophy, RefreshCw, X, Sparkles, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { WordItem } from '../types';
import { ALL_WORDS } from '../data/oxfordDataset';
import { playEnglishAudio } from '../utils/speech';

interface SpeedMatchGameProps {
  onClose: () => void;
  onGameComplete: (xpGained: number, matchedCount: number) => void;
}

interface Tile {
  id: string;
  wordId: number;
  text: string;
  type: 'en' | 'th';
  matched: boolean;
}

export const SpeedMatchGame: React.FC<SpeedMatchGameProps> = ({
  onClose,
  onGameComplete,
}) => {
  const [timeLeft, setTimeLeft] = useState(45);
  const [score, setScore] = useState(0);
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [selectedTile, setSelectedTile] = useState<Tile | null>(null);
  const [wrongMatch, setWrongMatch] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [matchesMade, setMatchesMade] = useState(0);

  // Generate a round of 5 word pairs
  const generateNewRound = () => {
    const randomWords: WordItem[] = [...ALL_WORDS]
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);

    const newTiles: Tile[] = [];
    randomWords.forEach((w) => {
      newTiles.push({
        id: `en-${w.id}`,
        wordId: w.id,
        text: w.word,
        type: 'en',
        matched: false,
      });
      newTiles.push({
        id: `th-${w.id}`,
        wordId: w.id,
        text: w.th,
        type: 'th',
        matched: false,
      });
    });

    setTiles(newTiles.sort(() => 0.5 - Math.random()));
    setSelectedTile(null);
  };

  useEffect(() => {
    generateNewRound();
  }, []);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      setGameOver(true);
      try {
        confetti({ particleCount: 50, spread: 60 });
      } catch {}
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Handle tile click
  const handleTileClick = (tile: Tile) => {
    if (tile.matched || gameOver || wrongMatch.includes(tile.id)) return;

    if (tile.type === 'en') {
      playEnglishAudio(tile.text, 'en-US', 1.0);
    }

    if (!selectedTile) {
      setSelectedTile(tile);
      return;
    }

    if (selectedTile.id === tile.id) {
      setSelectedTile(null);
      return;
    }

    // Check if matching pair (one EN, one TH, and same wordId)
    if (selectedTile.type !== tile.type && selectedTile.wordId === tile.wordId) {
      // MATCH!
      const updatedTiles = tiles.map((t) =>
        t.wordId === tile.wordId ? { ...t, matched: true } : t
      );
      setTiles(updatedTiles);
      setSelectedTile(null);
      setScore((prev) => prev + 20);
      setMatchesMade((prev) => prev + 1);

      // If all cleared in current round, spawn next set!
      if (updatedTiles.every((t) => t.matched)) {
        setTimeout(() => {
          generateNewRound();
        }, 300);
      }
    } else {
      // WRONG MATCH
      setWrongMatch([selectedTile.id, tile.id]);
      setTimeout(() => {
        setWrongMatch([]);
        setSelectedTile(null);
      }, 450);
    }
  };

  const handleFinish = () => {
    onGameComplete(score, matchesMade);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-lg w-full p-5 sm:p-7 text-stone-100 shadow-2xl flex flex-col relative">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-display font-bold text-base text-stone-100">
                Speed Match ⚡
              </h2>
              <p className="text-[11px] text-stone-400">จับคู่คำศัพท์ภาษาอังกฤษกับความหมาย</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-stone-800 px-3 py-1.5 rounded-xl border border-stone-700 font-mono text-sm">
              <Timer className={`w-4 h-4 ${timeLeft <= 10 ? 'text-rose-400 animate-ping' : 'text-amber-400'}`} />
              <span className={timeLeft <= 10 ? 'text-rose-400 font-bold' : 'text-stone-200'}>
                {timeLeft}s
              </span>
            </div>

            <div className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1.5 rounded-xl font-mono text-sm font-bold">
              {score} pts
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white bg-stone-800 border border-stone-700 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Board */}
        {!gameOver ? (
          <div className="grid grid-cols-2 gap-2.5 my-2">
            {tiles.map((tile) => {
              if (tile.matched) {
                return (
                  <div
                    key={tile.id}
                    className="h-16 rounded-2xl border border-dashed border-stone-800/40 bg-stone-900/30 flex items-center justify-center opacity-20"
                  />
                );
              }

              const isSelected = selectedTile?.id === tile.id;
              const isWrong = wrongMatch.includes(tile.id);

              let style = 'bg-stone-800/90 border-stone-700 hover:border-amber-500/60 text-stone-200';
              if (isSelected) {
                style = 'bg-amber-500/20 border-amber-400 text-amber-300 ring-2 ring-amber-400/30 scale-[1.02]';
              }
              if (isWrong) {
                style = 'bg-rose-950/80 border-rose-500 text-rose-300 animate-shake';
              }

              return (
                <button
                  key={tile.id}
                  onClick={() => handleTileClick(tile)}
                  className={`h-16 px-3 rounded-2xl border text-sm font-medium transition cursor-pointer flex items-center justify-center text-center shadow-sm select-none ${style}`}
                >
                  <span className={tile.type === 'en' ? 'font-english font-bold text-base' : 'text-xs'}>
                    {tile.text}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          /* Game Over Summary */
          <div className="py-8 text-center space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center mx-auto">
              <Trophy className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-2xl font-display font-bold text-stone-100">
                หมดเวลาแล้ว!
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                คุณทำคะแนนได้ <b className="text-amber-300 font-mono text-base">{score} คะแนน</b> ({matchesMade} คู่คำศัพท์)
              </p>
            </div>

            <div className="p-3 bg-stone-800 rounded-xl border border-stone-700 text-xs text-stone-300">
              ⚡ รับ <b className="text-amber-400">+{score} XP</b> เพิ่มเข้าบัญชีประจำวันของคุณ!
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  setTimeLeft(45);
                  setScore(0);
                  setMatchesMade(0);
                  setGameOver(false);
                  generateNewRound();
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>เล่นใหม่อีกรอบ</span>
              </button>
              <button
                onClick={handleFinish}
                className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-lg shadow-amber-500/20"
              >
                <span>บันทึกคะแนน</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
