import { WordItem, CefrLevel } from '../types';
import { RAW_OXFORD_LIST, THAI_DICTIONARY_MAP } from './rawWordsData';
import { OXFORD_EXTENDED_A1, OXFORD_EXTENDED_A2, OXFORD_EXTENDED_B1, OXFORD_EXTENDED_B2 } from './oxfordLevels';

export const ALL_WORDS: WordItem[] = [
  ...OXFORD_EXTENDED_A1,
  ...OXFORD_EXTENDED_A2,
  ...OXFORD_EXTENDED_B1,
  ...OXFORD_EXTENDED_B2,
].map((item, idx) => ({
  ...item,
  id: idx + 1
}));

export const WORD_MAP: Record<number, WordItem> = {};
ALL_WORDS.forEach(w => {
  WORD_MAP[w.id] = w;
});

export function getWordsByLevel(level: CefrLevel): WordItem[] {
  return ALL_WORDS.filter(w => w.level === level);
}

export function searchWords(query: string, level?: CefrLevel): WordItem[] {
  const q = query.toLowerCase().trim();
  return ALL_WORDS.filter(w => {
    if (level && w.level !== level) return false;
    if (!q) return true;
    return w.word.toLowerCase().includes(q) || w.th.includes(q);
  });
}
