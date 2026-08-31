import { UserProfile, CardProgress, SessionHistoryLog, PlacementResult, GrammarProgress, DailyQuest } from '../types';
import { getTodayDateString, daysBetween } from './srs';

const STORAGE_KEYS = {
  PROFILE: 'oxford3000_user_profile_v3',
  CARDS: 'oxford3000_cards_progress_v3',
  LOGS: 'oxford3000_session_logs_v3',
  PLACEMENTS: 'oxford3000_placements_v3',
  GRAMMAR: 'oxford3000_grammar_progress_v3',
  QUESTS: 'oxford3000_daily_quests_v3',
};

export const DEFAULT_PROFILE: UserProfile = {
  onboarded: false,
  name: 'นักเรียนคนขยัน',
  startDate: getTodayDateString(),
  targetDays: 90,
  dailyWordTarget: 15,
  dailyTimeBudgetMinutes: 15,
  streak: 0,
  streakFreeze: 2, // 2 free safety shields for missed days
  lastStudyDate: null,
  xp: 0,
  level: 1,
  gems: 100, // starting gems for shop
  companionName: 'Lexi',
  companionLevel: 1,
  companionMood: 'happy',
  favorites: [],
  accent: 'en-US',
  speechRate: 0.9,
  autoPlayAudio: true,
  unlockedBadges: ['welcome_90'],
  lastDailyChestDate: undefined,
  activeTheme: 'classic',
};

export const DEFAULT_BADGES = [
  { id: 'welcome_90', name: 'ก้าวแรก 90 วัน', description: 'เริ่มต้นการเดินทาง 90 วันสู่อิสรภาพทางภาษา', icon: '🌟', category: 'streak' },
  { id: 'streak_3', name: 'ไฟเริ่มติด (3 Days)', description: 'เรียนติดต่อกัน 3 วัน', icon: '🔥', category: 'streak' },
  { id: 'streak_7', name: 'วินัยเหล็ก (7 Days)', description: 'เรียนติดต่อกันครบ 1 สัปดาห์', icon: '🛡️', category: 'streak' },
  { id: 'streak_30', name: 'ตำนาน 30 วัน', description: 'เรียนติดต่อกัน 30 วันสม่ำเสมอ', icon: '👑', category: 'streak' },
  { id: 'speed_master', name: 'สายฟ้าแลบ', description: 'ทำคะแนน Speed Match เกิน 100 คะแนน', icon: '⚡', category: 'speed' },
  { id: 'boss_slayer', name: 'ผู้พิชิตบอส', description: 'ปราบสัตว์ประหลาด Amnesia Beast สำเร็จ', icon: '⚔️', category: 'battle' },
  { id: 'word_50', name: 'คลังสะสม 50 คำ', description: 'เรียนรู้คำศัพท์สะสมครบ 50 คำ', icon: '📚', category: 'mastery' },
  { id: 'word_200', name: 'คลังสะสม 200 คำ', description: 'เรียนรู้คำศัพท์สะสมครบ 200 คำ', icon: '🏛️', category: 'mastery' },
  { id: 'grammar_guru', name: 'เซียนไวยากรณ์', description: 'ทำแบบฝึกหัดไวยากรณ์ครบ 5 บท', icon: '📘', category: 'mastery' },
];

export function getDailyQuests(dateStr: string = getTodayDateString()): DailyQuest[] {
  try {
    const raw = localStorage.getItem(`${STORAGE_KEYS.QUESTS}_${dateStr}`);
    if (raw) return JSON.parse(raw);
  } catch {}

  const initialQuests: DailyQuest[] = [
    {
      id: 'daily_sprint',
      title: 'ทำ Daily Sprint ให้สำเร็จ',
      desc: 'เรียนรู้คำศัพท์ใหม่และทบทวนคำค้างในวันนี้',
      target: 1,
      current: 0,
      xpReward: 50,
      gemsReward: 30,
      completed: false,
      claimed: false,
      icon: '🎯',
    },
    {
      id: 'speed_match',
      title: 'เล่น Speed Match หรือ Boss Battle',
      desc: 'ทำคะแนนเกมอย่างน้อย 60 คะแนนเพื่อปลุกสมอง',
      target: 1,
      current: 0,
      xpReward: 30,
      gemsReward: 20,
      completed: false,
      claimed: false,
      icon: '⚡',
    },
    {
      id: 'audio_challenge',
      title: 'ฝึกฟังเสียงสำเนียง Native (Audio Drill)',
      desc: 'ฟังและทายคำศัพท์ให้ถูกต้อง 3 คำ',
      target: 3,
      current: 0,
      xpReward: 40,
      gemsReward: 25,
      completed: false,
      claimed: false,
      icon: '🎧',
    },
  ];

  saveDailyQuests(initialQuests, dateStr);
  return initialQuests;
}

export function saveDailyQuests(quests: DailyQuest[], dateStr: string = getTodayDateString()): void {
  try {
    localStorage.setItem(`${STORAGE_KEYS.QUESTS}_${dateStr}`, JSON.stringify(quests));
  } catch (e) {
    console.error('Failed to save daily quests', e);
  }
}

export function loadProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (!raw) return DEFAULT_PROFILE;
    return { ...DEFAULT_PROFILE, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function saveProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save profile', e);
  }
}

export function loadCards(): Record<number, CardProgress> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CARDS);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveCards(cards: Record<number, CardProgress>): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CARDS, JSON.stringify(cards));
  } catch (e) {
    console.error('Failed to save cards', e);
  }
}

export function loadSessionLogs(): SessionHistoryLog[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LOGS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveSessionLogs(logs: SessionHistoryLog[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(logs));
  } catch (e) {
    console.error('Failed to save session logs', e);
  }
}

export function loadPlacements(): PlacementResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PLACEMENTS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function savePlacements(placements: PlacementResult[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PLACEMENTS, JSON.stringify(placements));
  } catch (e) {
    console.error('Failed to save placements', e);
  }
}

export function loadGrammarProgress(): GrammarProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.GRAMMAR);
    return raw ? JSON.parse(raw) : { completedLessons: {} };
  } catch {
    return { completedLessons: {} };
  }
}

export function saveGrammarProgress(gp: GrammarProgress): void {
  try {
    localStorage.setItem(STORAGE_KEYS.GRAMMAR, JSON.stringify(gp));
  } catch (e) {
    console.error('Failed to save grammar progress', e);
  }
}

export function updateStreakOnSessionComplete(profile: UserProfile): UserProfile {
  const today = getTodayDateString();
  const last = profile.lastStudyDate;

  let newStreak = profile.streak;
  let newFreeze = profile.streakFreeze;

  if (last === today) {
    // Already studied today, keep streak
    return profile;
  }

  if (!last) {
    newStreak = 1;
  } else {
    const gapDays = daysBetween(last, today);
    if (gapDays === 1) {
      newStreak += 1;
    } else if (gapDays === 2 && newFreeze > 0) {
      // Used 1 freeze shield to protect streak!
      newFreeze -= 1;
      newStreak += 1;
    } else {
      // Missed more than allowed
      newStreak = 1;
    }
  }

  // Bonus streak shield reward every 7 days streak
  if (newStreak > 0 && newStreak % 7 === 0 && newFreeze < 3) {
    newFreeze = Math.min(3, newFreeze + 1);
  }

  return {
    ...profile,
    streak: newStreak,
    streakFreeze: newFreeze,
    lastStudyDate: today,
  };
}

export function exportBackupJson(): string {
  return JSON.stringify({
    profile: loadProfile(),
    cards: loadCards(),
    logs: loadSessionLogs(),
    placements: loadPlacements(),
    grammar: loadGrammarProgress(),
    exportedAt: new Date().toISOString(),
  }, null, 2);
}

export function importBackupJson(jsonString: string): boolean {
  try {
    const data = JSON.parse(jsonString);
    if (data.profile) saveProfile(data.profile);
    if (data.cards) saveCards(data.cards);
    if (data.logs) saveSessionLogs(data.logs);
    if (data.placements) savePlacements(data.placements);
    if (data.grammar) saveGrammarProgress(data.grammar);
    return true;
  } catch {
    return false;
  }
}

export function resetAllData(): void {
  localStorage.removeItem(STORAGE_KEYS.PROFILE);
  localStorage.removeItem(STORAGE_KEYS.CARDS);
  localStorage.removeItem(STORAGE_KEYS.LOGS);
  localStorage.removeItem(STORAGE_KEYS.PLACEMENTS);
  localStorage.removeItem(STORAGE_KEYS.GRAMMAR);
}
