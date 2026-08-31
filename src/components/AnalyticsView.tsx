import React from 'react';
import { TrendingUp, Flame, Calendar, Award, Brain, Target, Shield, CheckCircle2, Clock } from 'lucide-react';
import { UserProfile, CardProgress, SessionHistoryLog, PlacementResult, CefrLevel } from '../types';
import { calculateLevelMastery, daysBetween, getTodayDateString } from '../utils/srs';

interface AnalyticsViewProps {
  profile: UserProfile;
  cards: Record<number, CardProgress>;
  sessionLogs: SessionHistoryLog[];
  placementHistory: PlacementResult[];
  onOpenPlacement: () => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  profile,
  cards,
  sessionLogs,
  placementHistory,
  onOpenPlacement,
}) => {
  const mastery = calculateLevelMastery(cards);
  const today = getTodayDateString();
  const currentDay = Math.max(1, Math.min(90, daysBetween(profile.startDate, today) + 1));
  const daysRemaining = Math.max(0, 90 - currentDay + 1);

  const totalIntroduced = Object.keys(cards).length;
  const totalMastered = (Object.values(cards) as CardProgress[]).filter((c) => c.box >= 4).length;

  // 30-Day Activity Heatmap array
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    const dateStr = d.toISOString().split('T')[0];
    const log = sessionLogs.find((s) => s.date === dateStr);
    return {
      date: dateStr,
      studied: !!log,
      xp: log?.xpEarned || 0,
      words: (log?.newWordsLearned || 0) + (log?.wordsReviewed || 0),
    };
  });

  return (
    <div className="space-y-6">
      {/* 90-Day Trajectory Milestone Banner */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-900 to-amber-950/40 border border-stone-800 p-6 rounded-3xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase text-amber-400 tracking-wider">
              90-Day Challenge Milestone
            </span>
            <h3 className="text-2xl font-display font-bold text-stone-100 mt-1">
              วันที่ {currentDay} จาก 90 วัน (เหลืออีก {daysRemaining} วัน)
            </h3>
            <p className="text-xs text-stone-400 mt-1">
              เรียนไปแล้วสะสม {totalIntroduced} คำ · จำขึ้นใจระดับ Mastered {totalMastered} คำ
            </p>
          </div>

          <button
            onClick={onOpenPlacement}
            className="px-4 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-lg shadow-emerald-500/20 shrink-0"
          >
            <Award className="w-4 h-4" />
            <span>ทำแบบทดสอบวัดระดับ CEFR</span>
          </button>
        </div>

        {/* 90 Days Timeline Indicator */}
        <div className="space-y-2 pt-2">
          <div className="flex justify-between text-[11px] font-mono text-stone-400">
            <span>Day 1 (เริ่มต้น)</span>
            <span>Day 30 (A1-A2 แม่นยำ)</span>
            <span>Day 60 (ก้าวสู่ B1)</span>
            <span>Day 90 (วัดผลความสำเร็จ)</span>
          </div>
          <div className="w-full bg-stone-800 h-3 rounded-full overflow-hidden p-0.5 border border-stone-700/50">
            <div
              className="bg-gradient-to-r from-amber-500 via-orange-400 to-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.round((currentDay / 90) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* CEFR Level Mastery Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {(['A1', 'A2', 'B1', 'B2'] as CefrLevel[]).map((lvl) => {
          const data = mastery[lvl];
          return (
            <div
              key={lvl}
              className="bg-stone-900 border border-stone-800 p-5 rounded-3xl space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-lg ${
                  lvl === 'A1' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                  lvl === 'A2' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' :
                  lvl === 'B1' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                  'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                }`}>
                  CEFR {lvl}
                </span>
                <span className="text-sm font-mono font-bold text-stone-200">
                  {data.percentage}%
                </span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-stone-200">
                  {lvl === 'A1' ? 'ระดับเริ่มต้น' : lvl === 'A2' ? 'ระดับพื้นฐาน' : lvl === 'B1' ? 'ระดับปานกลาง' : 'ระดับก้าวหน้า'}
                </h4>
                <p className="text-[11px] text-stone-400 mt-0.5">
                  จำแม่นแล้ว {data.mastered} จาก {data.total} คำ
                </p>
              </div>

              <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    lvl === 'A1' ? 'bg-emerald-400' :
                    lvl === 'A2' ? 'bg-sky-400' :
                    lvl === 'B1' ? 'bg-amber-400' : 'bg-purple-400'
                  }`}
                  style={{ width: `${data.percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* 30-Day Heatmap & Consistency */}
      <div className="bg-stone-900 border border-stone-800 p-6 rounded-3xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-400" />
            <h4 className="text-base font-display font-bold text-stone-100">
              ปฏิทินความสม่ำเสมอ (30 วันล่าสุด)
            </h4>
          </div>
          <span className="text-xs text-stone-400">
            🔥 สตรีคปัจจุบัน {profile.streak} วัน
          </span>
        </div>

        <div className="grid grid-cols-6 sm:grid-cols-10 gap-2">
          {last30Days.map((dayItem, idx) => (
            <div
              key={idx}
              className={`p-2.5 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-1 ${
                dayItem.studied
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                  : 'bg-stone-800/40 border-stone-800 text-stone-600'
              }`}
              title={`${dayItem.date}: ${dayItem.studied ? `เรียนไป ${dayItem.words} คำ (+${dayItem.xp} XP)` : 'ไม่ได้เข้าเรียน'}`}
            >
              <span className="text-[9px] font-mono text-stone-400">
                {dayItem.date.slice(8)}
              </span>
              {dayItem.studied ? (
                <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ) : (
                <div className="w-3.5 h-3.5 rounded-full bg-stone-800" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Achievement Badges Showcase */}
      <div className="bg-stone-900 border border-stone-800 p-6 rounded-3xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h4 className="text-base font-display font-bold text-stone-100">
              ตู้โชว์เหรียญรางวัลสะสม (Achievement Badges)
            </h4>
          </div>
          <span className="text-xs font-mono text-amber-400">
            ปลดล็อกแล้ว {(profile.unlockedBadges || []).length} เหรียญ
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { id: 'welcome_90', name: 'ก้าวแรก 90 วัน', desc: 'เริ่มต้นการเดินทาง 90 วัน', icon: '🌟' },
            { id: 'streak_3', name: 'ไฟเริ่มติด (3 Days)', desc: 'เรียนติดต่อกัน 3 วัน', icon: '🔥' },
            { id: 'streak_7', name: 'วินัยเหล็ก (7 Days)', desc: 'เรียนติดต่อกัน 7 วัน', icon: '🛡️' },
            { id: 'streak_30', name: 'ตำนาน 30 วัน', desc: 'เรียนติดต่อกัน 30 วัน', icon: '👑' },
            { id: 'speed_master', name: 'สายฟ้าแลบ', desc: 'ทำคะแนน Speed Match สูง', icon: '⚡' },
            { id: 'boss_slayer', name: 'ผู้พิชิตบอส', desc: 'ปราบ Amnesia Beast สำเร็จ', icon: '⚔️' },
          ].map((badge) => {
            const isUnlocked = (profile.unlockedBadges || []).includes(badge.id) || (badge.id === 'welcome_90');

            return (
              <div
                key={badge.id}
                className={`p-3.5 rounded-2xl border transition flex items-center gap-3 ${
                  isUnlocked
                    ? 'bg-amber-950/20 border-amber-500/40 text-stone-200'
                    : 'bg-stone-800/30 border-stone-800 opacity-40 grayscale'
                }`}
              >
                <span className="text-2xl select-none">{badge.icon}</span>
                <div className="min-w-0">
                  <h5 className="text-xs font-bold text-stone-100 truncate">{badge.name}</h5>
                  <p className="text-[10px] text-stone-400 truncate">{badge.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Spaced Repetition & Memory Explanation */}
      <div className="bg-stone-900 border border-stone-800 p-6 rounded-3xl space-y-3 text-xs text-stone-300">
        <div className="flex items-center gap-2 text-stone-100 font-bold text-sm">
          <Brain className="w-5 h-5 text-amber-400" />
          <span>ทำไม Spaced Repetition จึงแก้ปัญหา "ลืมง่าย / ความจำระยะสั้น" ได้?</span>
        </div>
        <p className="leading-relaxed text-stone-300">
          มนุษย์จะลืมสิ่งที่เรียนรู้ไปกว่า 70% ภายใน 24 ชั่วโมงแรก (Ebbinghaus Forgetting Curve) หากไม่มีการทบทวน 
          แต่เมื่อทบทวนในจังหวะ <b>1 วัน → 2 วัน → 4 วัน → 8 วัน → 16 วัน → 32 วัน</b> สมองจะสร้างโครงข่ายประสาทถาวรและย้ายคำศัพท์เหล่านั้นสู่ความจำระยะยาวโดยอัตโนมัติ ทำให้คุณจำได้ตลอดไปโดยไม่ต้องท่องจำซ้ำซาก
        </p>
      </div>
    </div>
  );
};
