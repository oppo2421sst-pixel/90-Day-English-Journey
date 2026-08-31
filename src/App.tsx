import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  Sparkles, 
  Zap, 
  BookOpen, 
  Award, 
  Search, 
  BarChart3, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Play, 
  RotateCw,
  Star,
  Target,
  ArrowRight,
  TrendingUp,
  BrainCircuit,
  Volume2,
  Swords,
  Headphones,
  Radio,
  ShoppingBag,
  CheckCheck,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Header } from './components/Header';
import { OnboardingModal } from './components/OnboardingModal';
import { StudySession } from './components/StudySession';
import { SpeedMatchGame } from './components/SpeedMatchGame';
import { PlacementTestModal } from './components/PlacementTestModal';
import { GrammarModal } from './components/GrammarModal';
import { WordVault } from './components/WordVault';
import { AnalyticsView } from './components/AnalyticsView';
import { SettingsModal } from './components/SettingsModal';
import { DailyQuestsWidget } from './components/DailyQuestsWidget';
import { CompanionWidget } from './components/CompanionWidget';
import { BossBattleGame } from './components/BossBattleGame';
import { AudioMysteryGame } from './components/AudioMysteryGame';
import { PodcastPlayerModal } from './components/PodcastPlayerModal';
import { RewardShopModal } from './components/RewardShopModal';

import { 
  UserProfile, 
  CardProgress, 
  SessionHistoryLog, 
  PlacementResult, 
  GrammarProgress,
  WordItem,
  CefrLevel,
  DailyQuest
} from './types';
import { 
  loadProfile, 
  saveProfile, 
  loadCards, 
  saveCards, 
  loadSessionLogs, 
  saveSessionLogs, 
  loadPlacements, 
  savePlacements, 
  loadGrammarProgress, 
  saveGrammarProgress,
  updateStreakOnSessionComplete,
  getDailyQuests,
  saveDailyQuests,
  DEFAULT_PROFILE
} from './utils/storage';
import { generateDailyQueue, daysBetween, getTodayDateString, calculateLevelMastery } from './utils/srs';
import { ALL_WORDS } from './data/oxfordDataset';
import { 
  GRAMMAR_LESSONS, 
  isLessonUnlocked, 
  isLessonPassed, 
  isLessonTierPassed, 
  getLessonStars, 
  getTotalGrammarStars 
} from './data/grammarLessons';
import { playEnglishAudio } from './utils/speech';
import { playSound } from './utils/soundEffects';

export default function App() {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [cards, setCards] = useState<Record<number, CardProgress>>({});
  const [sessionLogs, setSessionLogs] = useState<SessionHistoryLog[]>([]);
  const [placements, setPlacements] = useState<PlacementResult[]>([]);
  const [grammarProgress, setGrammarProgress] = useState<GrammarProgress>({ completedLessons: {} });
  const [dailyQuests, setDailyQuests] = useState<DailyQuest[]>([]);
  
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<'today' | 'vault' | 'grammar' | 'analytics'>('today');

  // Modals
  const [showSettings, setShowSettings] = useState(false);
  const [showStudySession, setShowStudySession] = useState(false);
  const [showSpeedMatch, setShowSpeedMatch] = useState(false);
  const [showPlacement, setShowPlacement] = useState(false);
  const [showGrammarModal, setShowGrammarModal] = useState(false);
  const [selectedGrammarLessonId, setSelectedGrammarLessonId] = useState<string | null>(null);
  const [grammarLevelFilter, setGrammarLevelFilter] = useState<'ALL' | CefrLevel>('ALL');
  const [showBossBattle, setShowBossBattle] = useState(false);
  const [showAudioMystery, setShowAudioMystery] = useState(false);
  const [showPodcastModal, setShowPodcastModal] = useState(false);
  const [showShopModal, setShowShopModal] = useState(false);

  // Active study queue
  const [studyQueue, setStudyQueue] = useState<WordItem[]>([]);

  // Load state on mount
  useEffect(() => {
    const prof = loadProfile();
    const c = loadCards();
    const logs = loadSessionLogs();
    const p = loadPlacements();
    const gp = loadGrammarProgress();
    const quests = getDailyQuests();

    setProfile(prof);
    setCards(c);
    setSessionLogs(logs);
    setPlacements(p);
    setGrammarProgress(gp);
    setDailyQuests(quests);
  }, []);

  const today = getTodayDateString();
  const currentDay = Math.max(1, Math.min(90, daysBetween(profile.startDate, today) + 1));
  const queue = generateDailyQueue(cards, profile.dailyWordTarget);
  const studiedToday = sessionLogs.some(s => s.date === today);

  // Progress quest helper
  const progressQuest = (questId: string, amount: number = 1) => {
    setDailyQuests((prev) => {
      const updated = prev.map((q) => {
        if (q.id === questId) {
          const nextVal = Math.min(q.target, q.current + amount);
          return {
            ...q,
            current: nextVal,
            completed: nextVal >= q.target,
          };
        }
        return q;
      });
      saveDailyQuests(updated, today);
      return updated;
    });
  };

  const handleClaimQuest = (questId: string) => {
    const targetQuest = dailyQuests.find((q) => q.id === questId);
    if (!targetQuest || targetQuest.claimed) return;

    const updatedQuests = dailyQuests.map((q) =>
      q.id === questId ? { ...q, claimed: true } : q
    );
    setDailyQuests(updatedQuests);
    saveDailyQuests(updatedQuests, today);

    const updatedProf = {
      ...profile,
      xp: profile.xp + targetQuest.xpReward,
      gems: profile.gems + targetQuest.gemsReward,
    };
    setProfile(updatedProf);
    saveProfile(updatedProf);
  };

  const handleClaimDailyChest = () => {
    const gemsReward = Math.floor(Math.random() * 40) + 50; // 50-90 gems
    const updatedProf: UserProfile = {
      ...profile,
      gems: profile.gems + gemsReward,
      xp: profile.xp + 80,
      streakFreeze: Math.min(3, profile.streakFreeze + 1),
      lastDailyChestDate: today,
    };
    setProfile(updatedProf);
    saveProfile(updatedProf);
  };

  const startDailySprint = () => {
    const dailyQueue = generateDailyQueue(cards, profile.dailyWordTarget);
    if (dailyQueue.allQueue.length === 0) {
      alert('คุณทบทวนคำศัพท์ของวันนี้เสร็จสิ้นหมดแล้ว! สามารถลองเล่นเกม Boss Battle หรือ Ear Master ได้');
      return;
    }
    setStudyQueue(dailyQueue.allQueue);
    setShowStudySession(true);
  };

  const handleFinishStudySession = (
    updatedCards: Record<number, CardProgress>,
    xpGained: number,
    correctCount: number
  ) => {
    setCards(updatedCards);
    saveCards(updatedCards);

    // Update streak & XP & Gems
    const gemsGained = Math.round(correctCount * 2);
    const updatedProfile = updateStreakOnSessionComplete({
      ...profile,
      xp: profile.xp + xpGained,
      gems: profile.gems + gemsGained,
      companionMood: 'happy',
    });
    setProfile(updatedProfile);
    saveProfile(updatedProfile);

    // Log session
    const newLog: SessionHistoryLog = {
      date: today,
      newWordsLearned: queue.newWords.length,
      wordsReviewed: queue.dueReviews.length,
      correctCount,
      totalAttempts: studyQueue.length,
      durationSeconds: Math.round(studyQueue.length * 25),
      xpEarned: xpGained,
    };

    const updatedLogs = [...sessionLogs.filter(l => l.date !== today), newLog];
    setSessionLogs(updatedLogs);
    saveSessionLogs(updatedLogs);

    // Progress daily quest
    progressQuest('daily_sprint', 1);

    setShowStudySession(false);
  };

  const handleGameComplete = (xpGained: number) => {
    const gemsGained = Math.max(10, Math.round(xpGained / 4));
    const updatedProfile = updateStreakOnSessionComplete({
      ...profile,
      xp: profile.xp + xpGained,
      gems: profile.gems + gemsGained,
    });
    setProfile(updatedProfile);
    saveProfile(updatedProfile);

    progressQuest('speed_match', 1);
  };

  const handleBossVictory = (xpGained: number, gemsGained: number) => {
    const badges = [...(profile.unlockedBadges || [])];
    if (!badges.includes('boss_slayer')) {
      badges.push('boss_slayer');
    }

    const updatedProfile = updateStreakOnSessionComplete({
      ...profile,
      xp: profile.xp + xpGained,
      gems: profile.gems + gemsGained,
      unlockedBadges: badges,
      companionLevel: profile.companionLevel + 1,
      companionMood: 'heroic',
    });
    setProfile(updatedProfile);
    saveProfile(updatedProfile);

    progressQuest('speed_match', 1);
  };

  const handleAudioMysteryComplete = (xpGained: number, correctCount: number) => {
    const gemsGained = Math.round(xpGained / 5);
    const updatedProfile = updateStreakOnSessionComplete({
      ...profile,
      xp: profile.xp + xpGained,
      gems: profile.gems + gemsGained,
    });
    setProfile(updatedProfile);
    saveProfile(updatedProfile);

    progressQuest('audio_challenge', correctCount);
  };

  const handleToggleFavorite = (wordId: number) => {
    const favs = profile.favorites.includes(wordId)
      ? profile.favorites.filter(id => id !== wordId)
      : [...profile.favorites, wordId];

    const updated = { ...profile, favorites: favs };
    setProfile(updated);
    saveProfile(updated);
  };

  const handleSavePlacementResult = (result: PlacementResult) => {
    const updatedPlacements = [...placements, result];
    setPlacements(updatedPlacements);
    savePlacements(updatedPlacements);

    // Add XP reward
    const updated = { ...profile, xp: profile.xp + 50, gems: profile.gems + 30 };
    setProfile(updated);
    saveProfile(updated);
  };

  const handleSaveGrammarProgress = (gp: GrammarProgress, xpGained: number) => {
    setGrammarProgress(gp);
    saveGrammarProgress(gp);

    const updated = { ...profile, xp: profile.xp + xpGained, gems: profile.gems + 20 };
    setProfile(updated);
    saveProfile(updated);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950">
      {/* Header */}
      <Header
        profile={profile}
        onOpenSettings={() => setShowSettings(true)}
        onOpenPlacement={() => setShowPlacement(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-900 border border-stone-800 rounded-2xl max-w-md mx-auto sm:mx-0 shadow-inner">
          <button
            onClick={() => setActiveTab('today')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer ${
              activeTab === 'today'
                ? 'bg-amber-500 text-stone-950 shadow-md font-bold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>วันนี้ (Day {currentDay})</span>
          </button>

          <button
            onClick={() => setActiveTab('vault')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer ${
              activeTab === 'vault'
                ? 'bg-amber-500 text-stone-950 shadow-md font-bold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>คลังคำศัพท์ (3,000)</span>
          </button>

          <button
            onClick={() => setActiveTab('grammar')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer ${
              activeTab === 'grammar'
                ? 'bg-amber-500 text-stone-950 shadow-md font-bold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>ไวยากรณ์</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer ${
              activeTab === 'analytics'
                ? 'bg-amber-500 text-stone-950 shadow-md font-bold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>สถิติ 90 วัน</span>
          </button>
        </div>

        {/* TAB 1: TODAY'S DASHBOARD */}
        {activeTab === 'today' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Mascot Companion Interactive Banner */}
            <CompanionWidget
              profile={profile}
              onPetCompanion={() => {
                const updated = { ...profile, gems: profile.gems + 1 };
                setProfile(updated);
                saveProfile(updated);
              }}
            />

            {/* Hero Card: Daily Sprint */}
            <div className="relative overflow-hidden bg-gradient-to-br from-stone-900 via-stone-900 to-amber-950/30 border border-stone-800 p-6 sm:p-8 rounded-3xl shadow-xl">
              <div className="relative z-10 max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  <span>ใช้เวลาเพียง ~{Math.max(5, Math.round((queue.allQueue.length * 25) / 60))} นาที</span>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-stone-100 leading-tight">
                    {studiedToday ? '🎉 ทำภารกิจประจำวันเสร็จแล้ว!' : 'พร้อมฝึกฝนคำศัพท์ของวันนี้หรือยัง?'}
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed">
                    {queue.dueReviews.length > 0
                      ? `มีคำศัพท์ที่ใกล้ลืมรอทบทวน ${queue.dueReviews.length} คำ และคำใหม่อีก ${queue.newWords.length} คำ`
                      : `ไม่มีคำค้างทบทวน พร้อมเรียนรู้คำใหม่ ${queue.newWords.length} คำเพื่อขยายคลังคำศัพท์`}
                  </p>
                </div>

                {/* Quick stats in card */}
                <div className="flex items-center gap-4 text-xs font-mono text-stone-400 pt-1">
                  <div>
                    <span className="text-amber-400 font-bold text-base block">{queue.allQueue.length}</span>
                    <span>คำทั้งหมดวันนี้</span>
                  </div>
                  <div className="w-px h-8 bg-stone-800" />
                  <div>
                    <span className="text-emerald-400 font-bold text-base block">+{queue.allQueue.length * 10}</span>
                    <span>XP ที่จะได้รับ</span>
                  </div>
                  <div className="w-px h-8 bg-stone-800" />
                  <div>
                    <span className="text-cyan-400 font-bold text-base block">
                      {Object.keys(cards).length}/3,000
                    </span>
                    <span>คำที่เริ่มเรียนแล้ว</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={startDailySprint}
                    className="py-3.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm flex items-center gap-2 transition cursor-pointer shadow-lg shadow-amber-500/20"
                  >
                    <Play className="w-4 h-4 fill-stone-950" />
                    <span>{studiedToday ? 'ฝึกทบทวนเพิ่มอีกรอบ' : 'เริ่มฝึกประจำวัน (Daily Sprint)'}</span>
                  </button>

                  <button
                    onClick={() => setShowPodcastModal(true)}
                    className="py-3.5 px-5 rounded-2xl bg-stone-800 hover:bg-stone-700 text-cyan-300 border border-cyan-800/60 text-xs font-semibold flex items-center gap-2 transition cursor-pointer"
                  >
                    <Radio className="w-4 h-4" />
                    <span>โหมดฟัง Podcast</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Daily Quests System & Mystery Box */}
            <DailyQuestsWidget
              quests={dailyQuests}
              profile={profile}
              onClaimQuest={handleClaimQuest}
              onClaimDailyChest={handleClaimDailyChest}
              onOpenShop={() => setShowShopModal(true)}
            />

            {/* Interactive Game Arenas Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-base text-stone-100 flex items-center gap-2">
                  <span>มินิเกมและโหมดการฝึกพิเศษ 🎮</span>
                </h3>
                <span className="text-xs text-stone-400">เล่นเพื่อปลุกพลังและเก็บ Gems 💎</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {/* 1. Boss Battle RPG */}
                <div 
                  onClick={() => setShowBossBattle(true)}
                  className="bg-stone-900 border border-stone-800 p-4.5 rounded-3xl hover:border-rose-500/60 transition cursor-pointer space-y-2.5 group relative overflow-hidden"
                >
                  <div className="w-9 h-9 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Swords className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-stone-100 text-sm flex items-center gap-1.5">
                      <span>Boss Battle RPG</span>
                      <span className="text-[9px] bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded font-mono">HOT</span>
                    </h4>
                    <p className="text-xs text-stone-400 mt-1 leading-snug">
                      ปราบ Amnesia Beast สัตว์ประหลาดแห่งการลืมเลือนด้วยพลังคำศัพท์
                    </p>
                  </div>
                  <div className="flex items-center text-xs text-rose-400 font-semibold gap-1">
                    <span>ท้าดวลบอส</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* 2. Ear Master Audio */}
                <div 
                  onClick={() => setShowAudioMystery(true)}
                  className="bg-stone-900 border border-stone-800 p-4.5 rounded-3xl hover:border-purple-500/60 transition cursor-pointer space-y-2.5 group relative overflow-hidden"
                >
                  <div className="w-9 h-9 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Headphones className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-stone-100 text-sm flex items-center gap-1.5">
                      <span>Ear Master ทายเสียง</span>
                    </h4>
                    <p className="text-xs text-stone-400 mt-1 leading-snug">
                      ฝึกฟังสำเนียงจริง Native Speaker ปรับสปีดช้าได้
                    </p>
                  </div>
                  <div className="flex items-center text-xs text-purple-400 font-semibold gap-1">
                    <span>เริ่มฝึกฟัง</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* 3. Speed Match */}
                <div 
                  onClick={() => setShowSpeedMatch(true)}
                  className="bg-stone-900 border border-stone-800 p-4.5 rounded-3xl hover:border-orange-500/60 transition cursor-pointer space-y-2.5 group"
                >
                  <div className="w-9 h-9 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Zap className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-stone-100 text-sm">
                      Speed Match 45 วิ
                    </h4>
                    <p className="text-xs text-stone-400 mt-1 leading-snug">
                      เกมจับคู่ศัพท์ความเร็วสูง ปลุกสมาธิในเวลาสั้นๆ
                    </p>
                  </div>
                  <div className="flex items-center text-xs text-orange-400 font-semibold gap-1">
                    <span>เล่นเกมจับคู่</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* 4. Placement Test */}
                <div 
                  onClick={() => setShowPlacement(true)}
                  className="bg-stone-900 border border-stone-800 p-4.5 rounded-3xl hover:border-emerald-500/60 transition cursor-pointer space-y-2.5 group"
                >
                  <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Award className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-stone-100 text-sm">
                      วัดระดับ CEFR
                    </h4>
                    <p className="text-xs text-stone-400 mt-1 leading-snug">
                      ประเมินความรู้ A1–B2 เทียบความก้าวหน้าตลอด 90 วัน
                    </p>
                  </div>
                  <div className="flex items-center text-xs text-emerald-400 font-semibold gap-1">
                    <span>เริ่มทำข้อสอบ</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>

            {/* Daily Routine Strategy Tips */}
            <div className="bg-stone-900/60 border border-stone-800/80 p-5 rounded-3xl space-y-3 text-xs text-stone-300">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <BrainCircuit className="w-4 h-4" />
                <span>เคล็ดลับ 90 วันสำหรับคนเวลาน้อย & ลืมง่าย</span>
              </div>
              <ul className="space-y-1.5 text-stone-300 list-disc list-inside leading-relaxed">
                <li><b>ฝึกวันละ 10-15 นาที</b> ดีกว่าการอัดอ่านหนังสือ 3 ชั่วโมงในวันอาทิตย์</li>
                <li><b>เปิดฟังเสียงอ่าน</b> เสมอ และลองพูดออกเสียงตามเพื่อสร้างความจำผ่านกล้ามเนื้อและหู</li>
                <li><b>อย่ากลัวตอบผิด</b> ระบบ Leitner Spaced Repetition จะดึงคำที่ตอบผิดกลับมาให้ทบทวนซ้ำจนกว่าจะจำได้เอง</li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB 2: WORD VAULT */}
        {activeTab === 'vault' && (
          <div className="animate-in fade-in duration-300">
            <WordVault
              cards={cards}
              profile={profile}
              onToggleFavorite={handleToggleFavorite}
            />
          </div>
        )}

        {/* TAB 3: GRAMMAR HUB */}
        {activeTab === 'grammar' && (() => {
          const totalLessons = GRAMMAR_LESSONS.length;
          const passedCount = GRAMMAR_LESSONS.filter(l => isLessonPassed(l.id, grammarProgress)).length;
          const totalStars = getTotalGrammarStars(grammarProgress);
          const maxStars = totalLessons * 3;
          const progressPercent = Math.round((totalStars / maxStars) * 100);
          
          // Find the first unlocked but unpassed lesson, or the first lesson
          const firstUnpassedUnlocked = GRAMMAR_LESSONS.find((l, idx) => 
            isLessonUnlocked(idx, GRAMMAR_LESSONS, grammarProgress) && !isLessonPassed(l.id, grammarProgress)
          ) || GRAMMAR_LESSONS[0];

          const filteredLessons = GRAMMAR_LESSONS.filter(lesson => {
            if (grammarLevelFilter === 'ALL') return true;
            return lesson.level === grammarLevelFilter;
          });

          return (
            <div className="space-y-4 animate-in fade-in duration-300">
              {/* Header Hero */}
              <div className="bg-stone-900 border border-stone-800 p-5 sm:p-6 rounded-3xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-stone-100 flex items-center gap-2">
                      <span>บทเรียนไวยากรณ์ & แต่งประโยค 3 ระดับ 📘</span>
                      <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30 font-mono">
                        3 Difficulty Tiers
                      </span>
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-300 mt-1 leading-relaxed">
                      หลักสูตร 24 บทเรียนครอบคลุม A1–B2 แต่ละบทเรียนมี <b>3 ระดับความยาก (Easy ⭐, Medium ⭐⭐, Hard ⭐⭐⭐)</b> รวม 72 ดาวท้าทาย ปลดล็อกต่อเนื่องตามฝีมือ!
                    </p>
                  </div>

                  {firstUnpassedUnlocked && (
                    <button
                      onClick={() => {
                        setSelectedGrammarLessonId(firstUnpassedUnlocked.id);
                        setShowGrammarModal(true);
                      }}
                      className="py-3 px-5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer shadow-lg shadow-amber-500/20 whitespace-nowrap shrink-0"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>เรียนบทต่อไป ({firstUnpassedUnlocked.titleTh.replace(/^\d+\.\s*/, '')})</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Progress bar */}
                <div className="p-3.5 rounded-2xl bg-stone-950/60 border border-stone-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-300 font-semibold flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ความก้าวหน้าดาวรวม (Total Mastery Stars)
                    </span>
                    <span className="font-mono text-amber-400 font-bold">
                      {totalStars}/{maxStars} ดาว ({progressPercent}%) · ผ่านแล้ว {passedCount}/{totalLessons} บท
                    </span>
                  </div>
                  <div className="w-full bg-stone-800 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 via-sky-400 to-emerald-400 rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(progressPercent, 4)}%` }}
                    />
                  </div>
                </div>

                {/* CEFR Level filter pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {(['ALL', 'A1', 'A2', 'B1', 'B2'] as const).map(lvl => {
                    const countInLevel = lvl === 'ALL' 
                      ? GRAMMAR_LESSONS.length 
                      : GRAMMAR_LESSONS.filter(l => l.level === lvl).length;
                    const passedInLevel = lvl === 'ALL'
                      ? passedCount
                      : GRAMMAR_LESSONS.filter(l => l.level === lvl && isLessonPassed(l.id, grammarProgress)).length;

                    const isActive = grammarLevelFilter === lvl;
                    return (
                      <button
                        key={lvl}
                        onClick={() => setGrammarLevelFilter(lvl)}
                        className={`px-3 py-1.5 rounded-xl font-mono text-xs font-semibold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                          isActive 
                            ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20' 
                            : 'bg-stone-800/90 text-stone-300 hover:bg-stone-800 border border-stone-700/60'
                        }`}
                      >
                        <span>{lvl === 'ALL' ? 'ทุกระดับ (All Levels)' : `ระดับ ${lvl}`}</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                          isActive ? 'bg-stone-950/20 text-stone-950' : 'bg-stone-900 text-stone-400'
                        }`}>
                          {passedInLevel}/{countInLevel}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Lesson Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredLessons.map((lesson) => {
                  const globalIdx = GRAMMAR_LESSONS.findIndex(l => l.id === lesson.id);
                  const isUnlocked = isLessonUnlocked(globalIdx, GRAMMAR_LESSONS, grammarProgress);
                  const stars = getLessonStars(lesson.id, grammarProgress);
                  const passed = isLessonPassed(lesson.id, grammarProgress);
                  const prevLesson = globalIdx > 0 ? GRAMMAR_LESSONS[globalIdx - 1] : null;

                  const easyPassed = isLessonTierPassed(lesson.id, 'easy', grammarProgress);
                  const mediumPassed = isLessonTierPassed(lesson.id, 'medium', grammarProgress);
                  const hardPassed = isLessonTierPassed(lesson.id, 'hard', grammarProgress);

                  return (
                    <div
                      key={lesson.id}
                      onClick={() => {
                        if (isUnlocked) {
                          setSelectedGrammarLessonId(lesson.id);
                          setShowGrammarModal(true);
                        }
                      }}
                      className={`bg-stone-900 border p-4 sm:p-5 rounded-3xl transition flex flex-col justify-between gap-3 ${
                        isUnlocked
                          ? passed
                            ? 'border-emerald-900/40 hover:border-emerald-700/60 hover:bg-stone-850 cursor-pointer shadow-md'
                            : 'border-stone-800 hover:border-amber-500/60 hover:bg-stone-850 cursor-pointer shadow-md'
                          : 'border-stone-800/40 opacity-45 cursor-not-allowed'
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border ${
                              lesson.level === 'A1' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
                              lesson.level === 'A2' ? 'bg-sky-500/20 text-sky-300 border-sky-500/30' :
                              lesson.level === 'B1' ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' :
                              'bg-rose-500/20 text-rose-300 border-rose-500/30'
                            }`}>
                              {lesson.level}
                            </span>
                            <span className="text-[11px] font-english text-stone-400 truncate max-w-[150px]">
                              {lesson.title}
                            </span>
                          </div>

                          {isUnlocked ? (
                            <div className="flex items-center gap-1">
                              <div className="flex items-center gap-0.5 text-amber-400">
                                {[1, 2, 3].map((s) => (
                                  <Star 
                                    key={s} 
                                    className={`w-3.5 h-3.5 ${s <= stars ? 'fill-amber-400 text-amber-400' : 'text-stone-700'}`} 
                                  />
                                ))}
                              </div>
                              <span className="text-xs font-mono font-bold text-stone-300 ml-1">
                                {stars}/3
                              </span>
                            </div>
                          ) : (
                            <span className="p-1.5 rounded-lg bg-stone-800 text-stone-500">
                              <Lock className="w-3.5 h-3.5" />
                            </span>
                          )}
                        </div>

                        <h4 className="text-base font-display font-bold text-stone-100">
                          {lesson.titleTh}
                        </h4>
                        
                        {lesson.sentencePattern && (
                          <div className="text-[11px] font-mono text-amber-300/90 bg-stone-950/60 px-2.5 py-1 rounded-lg border border-stone-800 truncate">
                            {lesson.sentencePattern}
                          </div>
                        )}

                        <p className="text-xs text-stone-400 leading-relaxed line-clamp-2">
                          {lesson.summary}
                        </p>

                        {/* Tier mini-badges */}
                        {isUnlocked && (
                          <div className="flex items-center gap-1.5 pt-1">
                            <span className={`text-[10px] px-2 py-0.5 rounded-md font-mono flex items-center gap-1 border ${
                              easyPassed 
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-semibold' 
                                : 'bg-stone-800 text-stone-400 border-stone-700'
                            }`}>
                              <Star className={`w-2.5 h-2.5 ${easyPassed ? 'fill-amber-400 text-amber-400' : 'text-stone-500'}`} />
                              Easy
                            </span>

                            <span className={`text-[10px] px-2 py-0.5 rounded-md font-mono flex items-center gap-1 border ${
                              mediumPassed 
                                ? 'bg-sky-500/20 text-sky-300 border-sky-500/40 font-semibold' 
                                : 'bg-stone-800 text-stone-400 border-stone-700'
                            }`}>
                              <Star className={`w-2.5 h-2.5 ${mediumPassed ? 'fill-sky-400 text-sky-400' : 'text-stone-500'}`} />
                              Medium
                            </span>

                            <span className={`text-[10px] px-2 py-0.5 rounded-md font-mono flex items-center gap-1 border ${
                              hardPassed 
                                ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 font-semibold' 
                                : 'bg-stone-800 text-stone-400 border-stone-700'
                            }`}>
                              <Star className={`w-2.5 h-2.5 ${hardPassed ? 'fill-purple-400 text-purple-400' : 'text-stone-500'}`} />
                              Hard
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="pt-2 border-t border-stone-800/60 flex items-center justify-between text-xs">
                        <span className="text-stone-400 text-[11px]">
                          3 ระดับความยาก (9 ข้อต่อบท)
                        </span>

                        {!isUnlocked && prevLesson ? (
                          <span className="text-[11px] text-amber-400/80 flex items-center gap-1">
                            <Lock className="w-3 h-3" />
                            <span>ต้องผ่านบทที่ {globalIdx} ก่อน</span>
                          </span>
                        ) : (
                          <span className="text-stone-300 font-semibold flex items-center gap-1 group-hover:text-amber-400">
                            {passed ? 'ท้าทายระดับถัดไป' : 'เข้าสู่บทเรียน'} →
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}

        {/* TAB 4: ANALYTICS & 90-DAY PROGRESS */}
        {activeTab === 'analytics' && (
          <div className="animate-in fade-in duration-300">
            <AnalyticsView
              profile={profile}
              cards={cards}
              sessionLogs={sessionLogs}
              placementHistory={placements}
              onOpenPlacement={() => setShowPlacement(true)}
            />
          </div>
        )}
      </main>

      {/* MODALS */}
      {!profile.onboarded && (
        <OnboardingModal
          onComplete={(updated) => {
            const newProfile = { ...profile, ...updated };
            setProfile(newProfile);
            saveProfile(newProfile);
          }}
        />
      )}

      {showStudySession && (
        <StudySession
          queue={studyQueue}
          cards={cards}
          profile={profile}
          onFinishSession={handleFinishStudySession}
          onClose={() => setShowStudySession(false)}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      {showSpeedMatch && (
        <SpeedMatchGame
          onClose={() => setShowSpeedMatch(false)}
          onGameComplete={handleGameComplete}
        />
      )}

      {showBossBattle && (
        <BossBattleGame
          onClose={() => setShowBossBattle(false)}
          onVictory={handleBossVictory}
        />
      )}

      {showAudioMystery && (
        <AudioMysteryGame
          onClose={() => setShowAudioMystery(false)}
          onGameComplete={handleAudioMysteryComplete}
        />
      )}

      {showPodcastModal && (
        <PodcastPlayerModal
          onClose={() => setShowPodcastModal(false)}
          profile={profile}
        />
      )}

      {showShopModal && (
        <RewardShopModal
          profile={profile}
          onClose={() => setShowShopModal(false)}
          onUpdateProfile={(updated) => {
            const newProf = { ...profile, ...updated };
            setProfile(newProf);
            saveProfile(newProf);
          }}
        />
      )}

      {showPlacement && (
        <PlacementTestModal
          onClose={() => setShowPlacement(false)}
          onSaveResult={handleSavePlacementResult}
          pastResults={placements}
        />
      )}

      {showGrammarModal && (
        <GrammarModal
          onClose={() => {
            setShowGrammarModal(false);
            setSelectedGrammarLessonId(null);
          }}
          grammarProgress={grammarProgress}
          onSaveProgress={handleSaveGrammarProgress}
          profile={profile}
          initialLessonId={selectedGrammarLessonId}
        />
      )}

      {showSettings && (
        <SettingsModal
          profile={profile}
          onClose={() => setShowSettings(false)}
          onSaveProfile={(updated) => {
            setProfile(updated);
            saveProfile(updated);
          }}
          onResetApp={() => {
            setProfile(DEFAULT_PROFILE);
            setCards({});
            setSessionLogs([]);
            setPlacements([]);
            setGrammarProgress({ completedLessons: {} });
            setDailyQuests(getDailyQuests());
          }}
        />
      )}
    </div>
  );
}

