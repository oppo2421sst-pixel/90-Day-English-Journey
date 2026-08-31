import { WordItem, CefrLevel } from '../types';
import { RAW_OXFORD_LIST, THAI_DICTIONARY_MAP } from './rawWordsData';

const LEVELS: CefrLevel[] = ['A1', 'A2', 'B1', 'B2'];

export const OXFORD_3000: WordItem[] = RAW_OXFORD_LIST.map((item, index) => {
  const word = item[0] as string;
  const pos = item[1] as string;
  const levelIdx = item[2] as number;
  const level = LEVELS[levelIdx] || 'A1';
  
  // Clean clean base word for lookup
  const cleanWord = word.toLowerCase().replace(/\d+$/, '').replace(/\s*\([^)]*\)/g, '').trim();
  const dictEntry = THAI_DICTIONARY_MAP[cleanWord] || THAI_DICTIONARY_MAP[word.toLowerCase()];
  
  const thMeaning = dictEntry?.th || item[3] || fallbackThai(cleanWord, pos);
  const exampleEn = dictEntry?.exampleEn || generateExampleSentence(word, pos);
  const exampleTh = dictEntry?.exampleTh || (dictEntry ? '' : 'ตัวอย่างการใช้งานในชีวิตประจำวัน');

  return {
    id: index,
    word,
    pos,
    level,
    th: thMeaning,
    exampleEn,
    exampleTh
  };
});

function fallbackThai(w: string, pos: string): string {
  if (w.endsWith('ing')) return `การ${w.replace('ing', '')} / กำลังทำ`;
  if (w.endsWith('ly')) return `อย่าง${w.replace('ly', '')}`;
  if (w.endsWith('tion') || w.endsWith('ment')) return `การ${w}`;
  if (pos.includes('v.')) return `ทำ / ปฏิบัติ (${w})`;
  if (pos.includes('adj.')) return `เกี่ยวกับ ${w}`;
  return `${w} (คำศัพท์ระดับมาตรฐาน)`;
}

function generateExampleSentence(w: string, pos: string): string {
  const clean = w.replace(/\d+$/, '').replace(/\s*\([^)]*\)/g, '').trim();
  if (pos.includes('v.')) return `We need to ${clean} this properly.`;
  if (pos.includes('adj.')) return `It is a very ${clean} situation.`;
  if (pos.includes('adv.')) return `She spoke ${clean} during the meeting.`;
  return `The ${clean} is very important for our daily life.`;
}

// Quick map for O(1) lookup
export const OXFORD_BY_ID: Record<number, WordItem> = {};
OXFORD_3000.forEach((item) => {
  OXFORD_BY_ID[item.id] = item;
});

export const WORDS_BY_LEVEL: Record<CefrLevel, WordItem[]> = {
  A1: OXFORD_3000.filter(w => w.level === 'A1'),
  A2: OXFORD_3000.filter(w => w.level === 'A2'),
  B1: OXFORD_3000.filter(w => w.level === 'B1'),
  B2: OXFORD_3000.filter(w => w.level === 'B2'),
};
