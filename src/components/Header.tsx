import React from 'react';
import { Flame, Shield, Sparkles, Settings as SettingsIcon, Award, BookOpen } from 'lucide-react';
import { UserProfile } from '../types';
import { daysBetween, getTodayDateString } from '../utils/srs';

interface HeaderProps {
  profile: UserProfile;
  onOpenSettings: () => void;
  onOpenPlacement: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  onOpenSettings,
  onOpenPlacement
}) => {
  const today = getTodayDateString();
  const currentDay = Math.max(1, Math.min(90, daysBetween(profile.startDate, today) + 1));
  const daysRemaining = Math.max(0, 90 - currentDay + 1);
  const progressPercent = Math.round((currentDay / 90) * 100);

  // Level calculation: level = floor(sqrt(xp / 50)) + 1
  const calculatedLevel = Math.floor(Math.sqrt(profile.xp / 50)) + 1;

  return (
    <header className="sticky top-0 z-30 bg-stone-900/95 backdrop-blur border-b border-stone-800 text-stone-100 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Brand & 90-Day Tracker */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-stone-950 font-bold font-display text-xl shadow-lg shadow-amber-500/20">
            90
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-lg font-bold text-stone-100 tracking-tight leading-none">
                Oxford 3000
              </h1>
              <span className="text-xs bg-amber-500/20 text-amber-300 font-mono px-2 py-0.5 rounded-full border border-amber-500/30">
                วันที่ {currentDay}/90
              </span>
            </div>
            <p className="text-xs text-stone-400 font-sans hidden sm:block mt-0.5">
              เหลืออีก {daysRemaining} วันเพื่อยกระดับภาษาอังกฤษสู่เป้าหมาย
            </p>
          </div>
        </div>

        {/* Stats & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Streak Badge */}
          <div 
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-800 border border-stone-700/80 text-xs font-semibold"
            title={`เรียนติดต่อกัน ${profile.streak} วัน (ฝึกทุกวันเพื่อไม่ให้ลืม)`}
          >
            <Flame className="w-4 h-4 text-orange-400 fill-orange-400 animate-pulse" />
            <span className="text-stone-200">{profile.streak} วัน</span>
            {profile.streakFreeze > 0 && (
              <span className="flex items-center text-cyan-400 ml-1 text-[11px]" title={`โล่กันสตรีคหลุด ${profile.streakFreeze} อัน`}>
                <Shield className="w-3 h-3 fill-cyan-400 mr-0.5" />
                {profile.streakFreeze}
              </span>
            )}
          </div>

          {/* XP & Level */}
          <div 
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-800 border border-stone-700/80 text-xs font-semibold text-amber-300"
            title={`${profile.xp} XP สะสม`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Lv.{calculatedLevel}</span>
          </div>

          {/* Placement Benchmark Button */}
          <button
            onClick={onOpenPlacement}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-300 text-xs font-medium transition cursor-pointer"
            title="ทำแบบทดสอบวัดระดับ CEFR"
          >
            <Award className="w-3.5 h-3.5" />
            <span>วัดระดับ</span>
          </button>

          {/* Settings */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700 transition cursor-pointer"
            title="ตั้งค่าและข้อมูลสำรอง"
          >
            <SettingsIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 90-Day Journey Progress Bar */}
      <div className="w-full bg-stone-800 h-1 relative overflow-hidden">
        <div 
          className="bg-gradient-to-r from-amber-500 via-orange-400 to-emerald-400 h-full transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </header>
  );
};
