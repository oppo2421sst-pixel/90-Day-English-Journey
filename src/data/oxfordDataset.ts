import { WordItem, CefrLevel } from '../types';
import rawWordsData from './oxford3308Data.json';

export const ALL_WORDS: WordItem[] = rawWordsData as WordItem[];

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
