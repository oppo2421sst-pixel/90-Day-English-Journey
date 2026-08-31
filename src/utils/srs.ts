import { CardProgress, WordItem, CefrLevel, PlacementResult } from '../types';
import { ALL_WORDS, WORD_MAP, getWordsByLevel } from '../data/oxfordDataset';

// Leitner intervals in days: Box 0=1d, Box 1=2d, Box 2=4d, Box 3=8d, Box 4=16d, Box 5=32d (Mastered)
export const BOX_INTERVALS = [1, 2, 4, 8, 16, 32];
export const MASTERED_BOX_LEVEL = 4;

export function getTodayDateString(): string {
  const d = new Date();
  return d.toISOString().split('T')[0];
}

export function addDaysToDate(dateStr: string, days: number): string {
  const d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

export function daysBetween(date1Str: string, date2Str: string): number {
  const d1 = new Date(date1Str + 'T00:00:00').getTime();
  const d2 = new Date(date2Str + 'T00:00:00').getTime();
  return Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
}

export function updateCardOnAnswer(
  prevCard: CardProgress | undefined,
  wordId: number,
  isCorrect: boolean
): CardProgress {
  const today = getTodayDateString();
  const current = prevCard || {
    wordId,
    box: 0,
    dueDate: today,
    reps: 0,
    lapses: 0,
    introducedDate: today,
    easeFactor: 2.5
  };

  const newReps = current.reps + 1;
  let newBox = current.box;
  let newLapses = current.lapses;
  let easeFactor = current.easeFactor || 2.5;

  if (isCorrect) {
    newBox = Math.min(BOX_INTERVALS.length - 1, current.box + 1);
    easeFactor = Math.min(3.0, easeFactor + 0.1);
  } else {
    newLapses += 1;
    newBox = Math.max(0, current.box - 2); // Step back 2 boxes to reinforce
    easeFactor = Math.max(1.3, easeFactor - 0.2);
  }

  const intervalDays = BOX_INTERVALS[newBox];
  const nextDueDate = addDaysToDate(today, intervalDays);

  return {
    ...current,
    box: newBox,
    dueDate: nextDueDate,
    reps: newReps,
    lapses: newLapses,
    lastStudied: today,
    easeFactor
  };
}

export interface StudyQueue {
  dueReviews: WordItem[];
  newWords: WordItem[];
  allQueue: WordItem[];
}

export function generateDailyQueue(
  cards: Record<number, CardProgress>,
  targetNewWordsPerDay: number,
  preferredLevel?: CefrLevel
): StudyQueue {
  const today = getTodayDateString();
  const dueReviews: WordItem[] = [];
  const introducedIds = new Set<number>();

  // 1. Gather all due reviews
  Object.values(cards).forEach((card) => {
    introducedIds.add(card.wordId);
    if (card.dueDate <= today) {
      const wordObj = WORD_MAP[card.wordId];
      if (wordObj) {
        dueReviews.push(wordObj);
      }
    }
  });

  // Sort due reviews: Lower boxes (weaker memory) first
  dueReviews.sort((a, b) => {
    const boxA = cards[a.id]?.box ?? 0;
    const boxB = cards[b.id]?.box ?? 0;
    return boxA - boxB;
  });

  // 2. Select new words based on level progression (A1 -> A2 -> B1 -> B2)
  const newWords: WordItem[] = [];
  const levelOrder: CefrLevel[] = preferredLevel 
    ? [preferredLevel, 'A1', 'A2', 'B1', 'B2'].filter((v, i, a) => a.indexOf(v) === i) as CefrLevel[]
    : ['A1', 'A2', 'B1', 'B2'];

  for (const lvl of levelOrder) {
    const lvlWords = getWordsByLevel(lvl);
    for (const w of lvlWords) {
      if (newWords.length >= targetNewWordsPerDay) break;
      if (!introducedIds.has(w.id)) {
        newWords.push(w);
      }
    }
    if (newWords.length >= targetNewWordsPerDay) break;
  }

  // Combine by interleaving so reviews and new words alternate nicely
  const allQueue: WordItem[] = [];
  const maxLen = Math.max(dueReviews.length, newWords.length);
  for (let i = 0; i < maxLen; i++) {
    if (i < dueReviews.length) allQueue.push(dueReviews[i]);
    if (i < newWords.length) allQueue.push(newWords[i]);
  }

  return {
    dueReviews,
    newWords,
    allQueue: allQueue.length > 0 ? allQueue : newWords
  };
}

export function calculateLevelMastery(cards: Record<number, CardProgress>) {
  const levels: CefrLevel[] = ['A1', 'A2', 'B1', 'B2'];
  const result: Record<CefrLevel, { total: number; introduced: number; mastered: number; percentage: number }> = {
    A1: { total: 0, introduced: 0, mastered: 0, percentage: 0 },
    A2: { total: 0, introduced: 0, mastered: 0, percentage: 0 },
    B1: { total: 0, introduced: 0, mastered: 0, percentage: 0 },
    B2: { total: 0, introduced: 0, mastered: 0, percentage: 0 },
  };

  ALL_WORDS.forEach((w) => {
    result[w.level].total += 1;
    const card = cards[w.id];
    if (card) {
      result[w.level].introduced += 1;
      if (card.box >= MASTERED_BOX_LEVEL) {
        result[w.level].mastered += 1;
      }
    }
  });

  levels.forEach((lvl) => {
    const item = result[lvl];
    item.percentage = item.total > 0 ? Math.round((item.mastered / item.total) * 100) : 0;
  });

  return result;
}

export function generatePlacementQuestions(totalQuestions = 24): WordItem[] {
  const levels: CefrLevel[] = ['A1', 'A2', 'B1', 'B2'];
  const perLevel = Math.floor(totalQuestions / levels.length);
  const questions: WordItem[] = [];

  levels.forEach((lvl) => {
    const list = getWordsByLevel(lvl);
    const shuffled = [...list].sort(() => 0.5 - Math.random());
    questions.push(...shuffled.slice(0, perLevel));
  });

  return questions.sort(() => 0.5 - Math.random());
}

export function evaluatePlacementTest(
  answers: { wordId: number; isCorrect: boolean }[]
): PlacementResult {
  const breakdown: Record<CefrLevel, { correct: number; total: number }> = {
    A1: { correct: 0, total: 0 },
    A2: { correct: 0, total: 0 },
    B1: { correct: 0, total: 0 },
    B2: { correct: 0, total: 0 },
  };

  let totalCorrect = 0;
  answers.forEach((ans) => {
    const word = WORD_MAP[ans.wordId];
    if (word) {
      breakdown[word.level].total += 1;
      if (ans.isCorrect) {
        breakdown[word.level].correct += 1;
        totalCorrect += 1;
      }
    }
  });

  // Calculate percentages
  const pctA1 = breakdown.A1.total ? breakdown.A1.correct / breakdown.A1.total : 0;
  const pctA2 = breakdown.A2.total ? breakdown.A2.correct / breakdown.A2.total : 0;
  const pctB1 = breakdown.B1.total ? breakdown.B1.correct / breakdown.B1.total : 0;
  const pctB2 = breakdown.B2.total ? breakdown.B2.correct / breakdown.B2.total : 0;

  let estimatedLevel: CefrLevel | 'Pre-A1' = 'Pre-A1';
  let note = '';

  if (pctB2 >= 0.7 && pctB1 >= 0.75) {
    estimatedLevel = 'B2';
    note = 'ยอดเยี่ยมมาก! คุณมีความรู้คำศัพท์ในระดับ B2 (Upper-Intermediate) สามารถสื่อสารเรื่องยากๆ ได้คล่องแคล่ว';
  } else if (pctB1 >= 0.7 && pctA2 >= 0.75) {
    estimatedLevel = 'B1';
    note = 'เก่งมาก! คุณอยู่ในระดับ B1 (Intermediate) เข้าใจบทสนทนาและหัวข้อทั่วไปในชีวิตประจำวันได้ดี';
  } else if (pctA2 >= 0.7 && pctA1 >= 0.75) {
    estimatedLevel = 'A2';
    note = 'ดีมาก! คุณอยู่ในระดับ A2 (Elementary) รู้คำศัพท์พื้นฐานสำคัญและพร้อมก้าวสู่ระดับ B1';
  } else if (pctA1 >= 0.6) {
    estimatedLevel = 'A1';
    note = 'จุดเริ่มต้นที่ดี! คุณอยู่ในระดับ A1 (Beginner) การฝึกฝนใน 90 วันนี้จะช่วยยกระดับความจำได้อย่างก้าวกระโดด';
  } else {
    estimatedLevel = 'Pre-A1';
    note = 'อย่ากังวลเลย! เหมาะสมที่สุดสำหรับการเริ่มต้นใหม่จากศูนย์ทีละคำในแอปนี้';
  }

  return {
    date: getTodayDateString(),
    score: totalCorrect,
    total: answers.length,
    breakdown,
    estimatedLevel,
    note
  };
}
