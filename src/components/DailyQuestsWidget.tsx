import React, { useState } from 'react';
import { Target, Gift, CheckCircle2, Sparkles, Trophy, ChevronRight, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DailyQuest, UserProfile } from '../types';
import { playSound } from '../utils/soundEffects';

interface DailyQuestsWidgetProps {
  quests: DailyQuest[];
  profile: UserProfile;
  onClaimQuest: (questId: string) => void;
  onClaimDailyChest: () => void;
  onOpenShop: () => void;
}

export const DailyQuestsWidget: React.FC<DailyQuestsWidgetProps> = ({
  quests,
  profile,
  onClaimQuest,
  onClaimDailyChest,
  onOpenShop,
}) => {
  const [chestOpening, setChestOpening] = useState(false);
  const allCompleted = quests.every((q) => q.completed);
  const completedCount = quests.filter((q) => q.completed).length;
  const isChestClaimed = profile.lastDailyChestDate === new Date().toISOString().split('T')[0];

  const handleOpenChest = () => {
    if (!allCompleted || isChestClaimed || chestOpening) return;
    setChestOpening(true);
    playSound.chestOpen();
    try {
      confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
    } catch {}

    setTimeout(() => {
      onClaimDailyChest();
      setChestOpening(false);
    }, 600);
  };

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-3xl p-5 sm:p-6 space-y-4 relative overflow-hidden shadow-lg">
      {/* Background Accent glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-display font-bold text-base text-stone-100 flex items-center gap-2">
              <span>เควสประจำวัน (Daily Quests)</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-stone-800 border border-stone-700 text-amber-400">
                {completedCount}/{quests.length}
              </span>
            </h3>
            <p className="text-[11px] text-stone-400">ทำครบ 3 เควสเพื่อปลดล็อกกล่องสมบัติทองคำประจำวัน 🎁</p>
          </div>
        </div>

        <button
          onClick={onOpenShop}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700/80 text-xs text-amber-300 font-mono transition cursor-pointer"
          title="ร้านค้าไอเทม & ของสะสม"
        >
          <span>💎 {profile.gems}</span>
          <span className="text-[10px] text-stone-400">ร้านค้า</span>
        </button>
      </div>

      {/* Quests List */}
      <div className="space-y-2.5">
        {quests.map((q) => {
          const isDone = q.completed;
          const isClaimed = q.claimed;
          const pct = Math.min(100, Math.round((q.current / q.target) * 100));

          return (
            <div
              key={q.id}
              className={`p-3.5 rounded-2xl border transition flex items-center justify-between gap-3 ${
                isClaimed
                  ? 'bg-stone-900/40 border-stone-800/60 opacity-60'
                  : isDone
                  ? 'bg-amber-950/20 border-amber-500/40'
                  : 'bg-stone-800/60 border-stone-700/70'
              }`}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <span className="text-xl shrink-0 select-none">{q.icon}</span>
                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs font-semibold text-stone-200 truncate">
                      {q.title}
                    </h4>
                    <span className="text-[10px] font-mono text-stone-400 shrink-0">
                      {q.current}/{q.target}
                    </span>
                  </div>

                  {/* Micro progress bar */}
                  <div className="w-full bg-stone-900 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isDone ? 'bg-amber-400' : 'bg-stone-600'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action / Rewards */}
              <div className="shrink-0 flex items-center gap-2">
                <div className="text-right hidden sm:block">
                  <span className="text-[10px] font-mono text-emerald-400 block">+{q.xpReward} XP</span>
                  <span className="text-[10px] font-mono text-amber-400 block">+{q.gemsReward} 💎</span>
                </div>

                {isClaimed ? (
                  <span className="flex items-center gap-1 text-[11px] font-mono text-stone-500 px-2 py-1 bg-stone-900 rounded-lg">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    รับแล้ว
                  </span>
                ) : isDone ? (
                  <button
                    onClick={() => {
                      playSound.correct();
                      try {
                        confetti({ particleCount: 30, spread: 40 });
                      } catch {}
                      onClaimQuest(q.id);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1 transition cursor-pointer shadow-md shadow-amber-500/20"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>รับ</span>
                  </button>
                ) : (
                  <span className="text-[10px] font-mono text-stone-500 px-2 py-1">
                    {pct}%
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mystery Chest Banner */}
      <div
        onClick={handleOpenChest}
        className={`p-4 rounded-2xl border transition flex items-center justify-between gap-4 cursor-pointer ${
          isChestClaimed
            ? 'bg-stone-900/50 border-stone-800 opacity-60 cursor-default'
            : allCompleted
            ? 'bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 border-amber-400 animate-pulse shadow-lg shadow-amber-500/10'
            : 'bg-stone-800/30 border-stone-800/80 opacity-70'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="text-3xl animate-bounce">
            {isChestClaimed ? '📦' : allCompleted ? '🎁' : '🔒'}
          </div>
          <div>
            <h4 className="text-xs font-bold text-stone-100 flex items-center gap-1.5">
              <span>หีบสมบัติทองคำประจำวัน (Daily Mystery Chest)</span>
              {allCompleted && !isChestClaimed && (
                <span className="px-1.5 py-0.5 rounded bg-amber-400 text-stone-950 font-bold text-[9px]">
                  พร้อมเปิด!
                </span>
              )}
            </h4>
            <p className="text-[11px] text-stone-400 mt-0.5">
              {isChestClaimed
                ? 'เปิดรับรางวัลของวันนี้เรียบร้อยแล้ว กลับมาใหม่พรุ่งนี้นะ!'
                : allCompleted
                ? 'แตะเพื่อเปิดหีบสมบัติ สุ่มรับ 50-100 Gems, โล่กันสตรีคหลุด และโบนัส XP!'
                : `ทำเควสให้ครบ ${quests.length} ข้อ เพื่อปลดล็อกหีบสมบัติ`}
            </p>
          </div>
        </div>

        {allCompleted && !isChestClaimed && (
          <button className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shrink-0 shadow-md">
            เปิดหีบ ✨
          </button>
        )}
      </div>
    </div>
  );
};
