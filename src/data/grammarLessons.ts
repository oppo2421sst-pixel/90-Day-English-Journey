import { GrammarLesson, GrammarProgress, GrammarDifficulty } from '../types';
import { A1_LESSONS } from './grammarLessons/a1Lessons';
import { A2_LESSONS } from './grammarLessons/a2Lessons';
import { B1_LESSONS } from './grammarLessons/b1Lessons';
import { B2_LESSONS } from './grammarLessons/b2Lessons';

// Combine all 24 curated lessons across CEFR levels
export const GRAMMAR_LESSONS: GrammarLesson[] = [
  ...A1_LESSONS,
  ...A2_LESSONS,
  ...B1_LESSONS,
  ...B2_LESSONS,
];

/**
 * Checks if a specific difficulty tier of a lesson has been completed and passed (>=60%).
 */
export function isLessonTierPassed(
  lessonId: string,
  tier: GrammarDifficulty,
  grammarProgress: GrammarProgress
): boolean {
  const record = grammarProgress.completedLessons[lessonId];
  if (!record) return false;
  if (record.tiers && record.tiers[tier]) {
    return record.tiers[tier]!.passed;
  }
  // Fallback for legacy progress
  if (tier === 'easy' && record.passed) return true;
  return false;
}

/**
 * Calculates how many stars (0 to 3) the user has earned for a lesson.
 */
export function getLessonStars(
  lessonId: string,
  grammarProgress: GrammarProgress
): number {
  let stars = 0;
  if (isLessonTierPassed(lessonId, 'easy', grammarProgress)) stars += 1;
  if (isLessonTierPassed(lessonId, 'medium', grammarProgress)) stars += 1;
  if (isLessonTierPassed(lessonId, 'hard', grammarProgress)) stars += 1;
  return stars;
}

/**
 * Total stars earned across the entire grammar curriculum.
 */
export function getTotalGrammarStars(grammarProgress: GrammarProgress): number {
  let total = 0;
  for (const lesson of GRAMMAR_LESSONS) {
    total += getLessonStars(lesson.id, grammarProgress);
  }
  return total;
}

/**
 * Checks if a grammar lesson is unlocked based on Progressive Mastery.
 * Lesson 0 is unlocked by default.
 * Lesson N is unlocked if Lesson N-1 has at least passed Tier 1 (Easy / Foundation).
 */
export function isLessonUnlocked(
  lessonIndex: number,
  allLessons: GrammarLesson[],
  grammarProgress: GrammarProgress
): boolean {
  if (lessonIndex <= 0) return true;
  const prevLesson = allLessons[lessonIndex - 1];
  if (!prevLesson) return true;
  return isLessonPassed(prevLesson.id, grammarProgress);
}

/**
 * Checks if a specific difficulty tier within a lesson is unlocked:
 * - Easy: Unlocked if the lesson itself is unlocked.
 * - Medium: Unlocked if Easy is passed in this lesson.
 * - Hard: Unlocked if Medium is passed in this lesson.
 */
export function isLessonTierUnlocked(
  lessonIndex: number,
  tier: GrammarDifficulty,
  allLessons: GrammarLesson[],
  grammarProgress: GrammarProgress
): boolean {
  const lesson = allLessons[lessonIndex];
  if (!lesson) return false;
  
  const lessonUnlocked = isLessonUnlocked(lessonIndex, allLessons, grammarProgress);
  if (!lessonUnlocked) return false;

  if (tier === 'easy') return true;
  if (tier === 'medium') return isLessonTierPassed(lesson.id, 'easy', grammarProgress);
  if (tier === 'hard') return isLessonTierPassed(lesson.id, 'medium', grammarProgress);
  
  return false;
}

/**
 * Checks if a specific lesson was completed with a passing score (at least Tier 1 Easy passed or legacy passed).
 */
export function isLessonPassed(
  lessonId: string,
  grammarProgress: GrammarProgress
): boolean {
  const record = grammarProgress.completedLessons[lessonId];
  if (!record) return false;
  if (record.tiers?.easy?.passed || record.tiers?.medium?.passed || record.tiers?.hard?.passed) {
    return true;
  }
  const passingScore = Math.ceil((record.total || 3) * 0.6);
  return record.score >= passingScore;
}
