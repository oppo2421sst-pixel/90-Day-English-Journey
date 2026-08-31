import React, { useState } from 'react';
import { ShoppingBag, Shield, Zap, Sparkles, X, Check, Award, Palette } from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProfile } from '../types';
import { playSound } from '../utils/soundEffects';

interface RewardShopModalProps {
  profile: UserProfile;
  onClose: () => void;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
}

interface ShopItem {
  id: string;
  name: string;
  desc: string;
  price: number;
  icon: string;
  type: 'consumable' | 'theme' | 'mascot';
  themeKey?: 'classic' | 'cyberpunk' | 'emerald' | 'amber';
}

const SHOP_ITEMS: ShopItem[] = [
  {
    id: 'streak_shield',
    name: 'โล่กันสตรีคหลุด (Streak Freeze)',
    desc: 'ปกป้องไฟสตรีคของคุณไม่ให้ดับ หากวันไหนติดธุระจนไม่ได้เข้ามาเรียน 1 วัน (สะสมได้สูงสุด 3 อัน)',
    price: 50,
    icon: '🛡️',
    type: 'consumable',
  },
  {
    id: 'double_xp',
    name: 'ยาวิเศษ XP คูณสอง (Double XP Potion)',
    desc: 'เพิ่มค่าประสบการณ์ 2 เท่าจากการเรียนและทำภารกิจทุกประเภท',
    price: 80,
    icon: '⚡',
    type: 'consumable',
  },
  {
    id: 'theme_cyberpunk',
    name: 'ธีม Cyberpunk Neon Glow',
    desc: 'ปรับโทนสีอินเทอร์เฟซเป็นสไตล์ไฟนีออนไซเบอร์สุดเท่',
    price: 100,
    icon: '🌌',
    type: 'theme',
    themeKey: 'cyberpunk',
  },
  {
    id: 'theme_emerald',
    name: 'ธีม Emerald Forest Zen',
    desc: 'ปรับโทนสีเป็นสีเขียวมรกตธรรมชาติ ผ่อนคลายสบายตา',
    price: 100,
    icon: '🍃',
    type: 'theme',
    themeKey: 'emerald',
  },
  {
    id: 'mascot_upgrade',
    name: 'อัปเกรดคู่หู Lexi (Mascot Level Up)',
    desc: 'เพิ่มเลเวลและปลดล็อกชุดแต่งกายพิเศษให้กับนกฮูก Lexi ผู้ช่วยส่วนตัวของคุณ',
    price: 120,
    icon: '🦉',
    type: 'mascot',
  },
];

export const RewardShopModal: React.FC<RewardShopModalProps> = ({
  profile,
  onClose,
  onUpdateProfile,
}) => {
  const [purchaseSuccess, setPurchaseSuccess] = useState<string | null>(null);

  const handleBuy = (item: ShopItem) => {
    if (profile.gems < item.price) {
      playSound.wrong();
      alert('จำนวน Gems 💎 ไม่เพียงพอ! ทำเควสประจำวันหรือเล่นเกมคำศัพท์เพื่อรับ Gems เพิ่ม');
      return;
    }

    playSound.chestOpen();
    try {
      confetti({ particleCount: 50, spread: 60 });
    } catch {}

    const newGems = profile.gems - item.price;

    if (item.id === 'streak_shield') {
      const newFreeze = Math.min(3, profile.streakFreeze + 1);
      onUpdateProfile({ gems: newGems, streakFreeze: newFreeze });
    } else if (item.id === 'double_xp') {
      onUpdateProfile({ gems: newGems, xp: profile.xp + 100 });
    } else if (item.type === 'theme' && item.themeKey) {
      onUpdateProfile({ gems: newGems, activeTheme: item.themeKey });
    } else if (item.id === 'mascot_upgrade') {
      onUpdateProfile({
        gems: newGems,
        companionLevel: profile.companionLevel + 1,
        companionMood: 'heroic',
      });
    }

    setPurchaseSuccess(item.name);
    setTimeout(() => setPurchaseSuccess(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 text-stone-100 shadow-2xl relative flex flex-col space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-stone-100">
                Gems Store & Rewards 💎
              </h3>
              <p className="text-xs text-stone-400">แลกรับไอเทมตัวช่วยและตกแต่งประสบการณ์เรียนรู้</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono font-bold text-xs flex items-center gap-1.5">
              <span>💎 {profile.gems} Gems</span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-stone-800 text-stone-400 hover:text-white border border-stone-700 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {purchaseSuccess && (
          <div className="p-3 rounded-2xl bg-emerald-950/80 border border-emerald-500/80 text-emerald-200 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>แลกซื้อสำเร็จ! คุณได้รับ "{purchaseSuccess}" เรียบร้อยแล้ว</span>
          </div>
        )}

        {/* Shop Items List */}
        <div className="space-y-3">
          {SHOP_ITEMS.map((item) => {
            const canAfford = profile.gems >= item.price;
            const isMaxShield = item.id === 'streak_shield' && profile.streakFreeze >= 3;
            const isCurrentTheme = item.type === 'theme' && profile.activeTheme === item.themeKey;

            return (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700/80 hover:border-stone-600 transition flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  <span className="text-3xl select-none shrink-0">{item.icon}</span>
                  <div>
                    <h4 className="font-semibold text-sm text-stone-100 flex items-center gap-2">
                      <span>{item.name}</span>
                      {isCurrentTheme && (
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-mono px-2 py-0.5 rounded-full border border-emerald-500/40">
                          กำลังใช้งาน
                        </span>
                      )}
                    </h4>
                    <p className="text-xs text-stone-400 mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <button
                    disabled={!canAfford || isMaxShield || isCurrentTheme}
                    onClick={() => handleBuy(item)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                      isCurrentTheme
                        ? 'bg-stone-700 text-stone-400 cursor-default'
                        : isMaxShield
                        ? 'bg-stone-700 text-stone-400 cursor-not-allowed'
                        : canAfford
                        ? 'bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-md shadow-amber-500/20'
                        : 'bg-stone-800 border border-stone-700 text-stone-500 cursor-not-allowed'
                    }`}
                  >
                    <span>{item.price} 💎</span>
                    <span>{isCurrentTheme ? 'ใช้งานอยู่' : isMaxShield ? 'เต็มแล้ว (3/3)' : 'ซื้อ'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
