import React, { useState } from 'react';
import { Sparkles, Heart, MessageSquare } from 'lucide-react';
import { UserProfile } from '../types';
import { playSound } from '../utils/soundEffects';

interface CompanionWidgetProps {
  profile: UserProfile;
  onPetCompanion: () => void;
}

const TIPS = [
  '💡 Pro-Tip: ออกเสียงคำศัพท์ตามทุกครั้งที่ได้ยิน จะช่วยให้สมองจดจำได้ไวกว่าการมองเงียบๆ 3 เท่า!',
  '🔥 ท่องแค่วันละ 15 นาทีตอนเช้าหรือก่อนนอน ดีกว่าอัดวันเดียว 3 ชั่วโมงแล้วหยุดไปหลายวัน',
  '🎯 ถ้าเหนื่อยจากการจำศัพท์ ลองสลับไปสู้บอสใน Boss Battle ดูสิ!',
  '🎧 เวลาขับรถหรือทำงานบ้าน ลองเปิดโหมด Podcast ฟังวนแบบไม่ต้องมองจอ',
  '🛡️ อย่าลืมสะสม Gems 💎 ไว้ซื้อโล่กันสตรีคหลุดในร้านค้านะ!',
];

export const CompanionWidget: React.FC<CompanionWidgetProps> = ({
  profile,
  onPetCompanion,
}) => {
  const [tipIndex, setTipIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);

  const getMascotAvatar = () => {
    if (profile.companionLevel >= 3) return '🦉👑';
    if (profile.companionLevel >= 2) return '🦉⚔️';
    return '🦉';
  };

  const handleInteract = () => {
    setIsInteracting(true);
    playSound.pop();
    setTipIndex((prev) => (prev + 1) % TIPS.length);
    onPetCompanion();
    setTimeout(() => setIsInteracting(false), 500);
  };

  return (
    <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 border border-stone-800 rounded-3xl p-4 sm:p-5 flex items-center justify-between gap-4 shadow-md relative overflow-hidden">
      <div className="flex items-center gap-3.5 flex-1 min-w-0">
        {/* Interactive Avatar */}
        <button
          onClick={handleInteract}
          className={`text-4xl p-2 rounded-2xl bg-stone-800/80 hover:bg-stone-700/80 border border-stone-700/80 cursor-pointer select-none transition-transform duration-300 relative ${
            isInteracting ? 'scale-125 rotate-12' : 'hover:scale-105'
          }`}
          title="คลิกเพื่อทักทาย Lexi คู่หูการเรียนของคุณ"
        >
          <span>{getMascotAvatar()}</span>
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
          </span>
        </button>

        {/* Speech / Status */}
        <div className="space-y-0.5 flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-xs font-bold text-stone-200">
              {profile.companionName} · <span className="text-amber-400 font-mono">Lv.{profile.companionLevel} คู่หูรู้ใจ</span>
            </h4>
            <span className="text-[10px] text-stone-500 bg-stone-800 px-1.5 py-0.5 rounded">
              แตะตัวเพื่อคุย 💬
            </span>
          </div>
          <p className="text-xs text-stone-300 leading-snug truncate sm:whitespace-normal">
            {TIPS[tipIndex]}
          </p>
        </div>
      </div>
    </div>
  );
};
