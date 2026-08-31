import React, { useState } from 'react';
import { Search, Volume2, Star, Filter, BookMarked, CheckCircle2 } from 'lucide-react';
import { WordItem, CardProgress, CefrLevel, UserProfile } from '../types';
import { ALL_WORDS, searchWords } from '../data/oxfordDataset';
import { playEnglishAudio } from '../utils/speech';

interface WordVaultProps {
  cards: Record<number, CardProgress>;
  profile: UserProfile;
  onToggleFavorite: (wordId: number) => void;
}

export const WordVault: React.FC<WordVaultProps> = ({
  cards,
  profile,
  onToggleFavorite,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<CefrLevel | 'ALL'>('ALL');
  const [filterMode, setFilterMode] = useState<'all' | 'mastered' | 'learning' | 'favorites'>('all');

  const filteredWords = ALL_WORDS.filter((w) => {
    // Level filter
    if (selectedLevel !== 'ALL' && w.level !== selectedLevel) return false;

    // Status filter
    const card = cards[w.id];
    if (filterMode === 'mastered' && (!card || card.box < 4)) return false;
    if (filterMode === 'learning' && (!card || card.box >= 4)) return false;
    if (filterMode === 'favorites' && !profile.favorites.includes(w.id)) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return w.word.toLowerCase().includes(q) || w.th.includes(q);
    }

    return true;
  });

  return (
    <div className="space-y-4">
      {/* Search & Filters */}
      <div className="bg-stone-900 border border-stone-800 p-4 rounded-3xl space-y-3">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาคำศัพท์ภาษาอังกฤษ หรือความหมายภาษาไทย..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-stone-800 border border-stone-700 text-stone-100 placeholder:text-stone-500 text-xs focus:outline-none focus:border-amber-500 transition"
          />
        </div>

        {/* Level Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {(['ALL', 'A1', 'A2', 'B1', 'B2'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-3 py-1 rounded-xl text-xs font-mono font-semibold transition cursor-pointer shrink-0 ${
                selectedLevel === lvl
                  ? 'bg-amber-500 text-stone-950 shadow'
                  : 'bg-stone-800 text-stone-400 hover:text-stone-200 border border-stone-700'
              }`}
            >
              {lvl === 'ALL' ? 'ทุกระดับ (3000 คำ)' : `CEFR ${lvl}`}
            </button>
          ))}
        </div>

        {/* Status Filter Sub-tabs */}
        <div className="flex items-center gap-2 text-xs border-t border-stone-800/80 pt-2.5">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
              filterMode === 'all' ? 'bg-stone-700 text-white font-semibold' : 'text-stone-400 hover:text-stone-300'
            }`}
          >
            ทั้งหมด ({filteredWords.length})
          </button>
          <button
            onClick={() => setFilterMode('learning')}
            className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
              filterMode === 'learning' ? 'bg-stone-700 text-white font-semibold' : 'text-stone-400 hover:text-stone-300'
            }`}
          >
            กำลังเรียน
          </button>
          <button
            onClick={() => setFilterMode('mastered')}
            className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
              filterMode === 'mastered' ? 'bg-stone-700 text-white font-semibold' : 'text-stone-400 hover:text-stone-300'
            }`}
          >
            จำแม่นแล้ว (Mastered)
          </button>
          <button
            onClick={() => setFilterMode('favorites')}
            className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
              filterMode === 'favorites' ? 'bg-stone-700 text-white font-semibold' : 'text-stone-400 hover:text-stone-300'
            }`}
          >
            ⭐ คำโปรด ({profile.favorites.length})
          </button>
        </div>
      </div>

      {/* Words Grid / List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredWords.slice(0, 100).map((w) => {
          const card = cards[w.id];
          const isFav = profile.favorites.includes(w.id);
          const isMastered = card && card.box >= 4;

          return (
            <div
              key={w.id}
              className="bg-stone-900/80 border border-stone-800/90 hover:border-stone-700 p-4 rounded-2xl transition flex items-start justify-between gap-3 group"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    w.level === 'A1' ? 'bg-emerald-500/20 text-emerald-300' :
                    w.level === 'A2' ? 'bg-sky-500/20 text-sky-300' :
                    w.level === 'B1' ? 'bg-amber-500/20 text-amber-300' :
                    'bg-purple-500/20 text-purple-300'
                  }`}>
                    {w.level}
                  </span>
                  <span className="text-[10px] text-stone-500 font-mono">{w.pos}</span>
                  <h4 className="text-base font-english font-bold text-stone-100">
                    {w.word}
                  </h4>
                  <button
                    onClick={() => playEnglishAudio(w.word, profile.accent, profile.speechRate)}
                    className="p-1 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-amber-400 transition cursor-pointer opacity-80 group-hover:opacity-100"
                    title="ฟังเสียง"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-xs text-stone-300">{w.th}</p>

                {w.exampleEn && (
                  <p className="text-[11px] text-stone-400 font-english italic border-l-2 border-stone-700 pl-2 mt-1">
                    "{w.exampleEn}"
                  </p>
                )}
              </div>

              {/* Status and Action */}
              <div className="flex flex-col items-end gap-2 shrink-0">
                <button
                  onClick={() => onToggleFavorite(w.id)}
                  className={`p-1.5 rounded-lg border transition cursor-pointer ${
                    isFav
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                      : 'bg-stone-800 border-stone-700/60 text-stone-500 hover:text-stone-300'
                  }`}
                  title={isFav ? 'ลบออกจากคำโปรด' : 'เพิ่มในคำโปรด'}
                >
                  <Star className={`w-3.5 h-3.5 ${isFav ? 'fill-amber-400' : ''}`} />
                </button>

                {card ? (
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                    isMastered
                      ? 'bg-emerald-950/60 border-emerald-700/60 text-emerald-300'
                      : 'bg-stone-800 border-stone-700 text-amber-400/80'
                  }`}>
                    กล่อง {card.box}/5
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-stone-600">ยังไม่เริ่ม</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredWords.length === 0 && (
        <div className="p-8 text-center bg-stone-900 border border-stone-800 rounded-3xl text-xs text-stone-400">
          ไม่พบคำศัพท์ที่ค้นหา ลองเปลี่ยนคำค้นหาหรือระดับ CEFR ดูนะ
        </div>
      )}
    </div>
  );
};
