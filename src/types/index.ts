export type CefrLevel = 'A1' | 'A2' | 'B1' | 'B2';

export interface WordItem {
  id: number;
  word: string;
  pos: string; // part of speech e.g. "n.", "v.", "adj."
  level: CefrLevel;
  th: string;
  exampleEn?: string;
  exampleTh?: string;
  phonetic?: string;
}

export interface CardProgress {
  wordId: number;
  box: number; // 0 (New/Lapsed) to 5 (Mastered long-term)
  dueDate: string; // YYYY-MM-DD
  reps: number;
  lapses: number;
  lastStudied?: string;
  introducedDate?: string;
  easeFactor?: number;
}

export interface SessionHistoryLog {
  date: string; // YYYY-MM-DD
  newWordsLearned: number;
  wordsReviewed: number;
  correctCount: number;
  totalAttempts: number;
  durationSeconds: number;
  xpEarned: number;
}

export interface PlacementResult {
  date: string;
  score: number;
  total: number;
  breakdown: Record<CefrLevel, { correct: number; total: number }>;
  estimatedLevel: CefrLevel | 'Pre-A1';
  note: string;
}

export interface DailyQuest {
  id: string;
  title: string;
  desc: string;
  target: number;
  current: number;
  xpReward: number;
  gemsReward: number;
  completed: boolean;
  claimed: boolean;
  icon: string;
}

export interface AchievementBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  category: 'streak' | 'mastery' | 'battle' | 'speed';
}

export interface UserProfile {
  onboarded: boolean;
  name: string;
  startDate: string; // YYYY-MM-DD
  targetDays: number; // default 90
  dailyWordTarget: number; // e.g. 15 words/day
  dailyTimeBudgetMinutes: number; // e.g. 15 mins (under 40 min constraint)
  streak: number;
  streakFreeze: number; // shield against missed days
  lastStudyDate: string | null;
  xp: number;
  level: number;
  gems: number; // Currency to buy powerups
  companionName: string;
  companionLevel: number;
  companionMood: 'happy' | 'focused' | 'sleepy' | 'excited' | 'heroic';
  favorites: number[]; // word ids
  accent: 'en-US' | 'en-GB';
  speechRate: number; // 0.8 to 1.0
  autoPlayAudio: boolean;
  unlockedBadges: string[];
  lastDailyChestDate?: string;
  activeTheme?: 'classic' | 'cyberpunk' | 'emerald' | 'amber';
}

export type GrammarDifficulty = 'easy' | 'medium' | 'hard';

export interface GrammarExercise {
  type: 'choice' | 'type' | 'reorder';
  prompt: string;
  options?: string[];
  scrambledWords?: string[]; // For interactive sentence construction / reordering
  answer: string | number;
  explanation?: string;
  hint?: string;
}

export interface GrammarDifficultyTier {
  difficulty: GrammarDifficulty;
  tierNameTh: string;
  badgeLabel: string;
  exercises: GrammarExercise[];
}

export interface GrammarLesson {
  id: string;
  level: CefrLevel;
  title: string;
  titleTh: string;
  summary: string;
  ruleExplanation: string;
  sentencePattern?: string;
  examples: { en: string; th: string }[];
  difficultyTiers: {
    easy: GrammarDifficultyTier;
    medium: GrammarDifficultyTier;
    hard: GrammarDifficultyTier;
  };
  exercises?: GrammarExercise[]; // Backwards-compatibility fallback
  unlockDay?: number;
}

export interface LessonTierResult {
  score: number;
  total: number;
  date: string;
  passed: boolean;
}

export interface GrammarProgress {
  completedLessons: Record<
    string,
    {
      score: number;
      total: number;
      date: string;
      passed?: boolean;
      tiers?: {
        easy?: LessonTierResult;
        medium?: LessonTierResult;
        hard?: LessonTierResult;
      };
    }
  >;
}
