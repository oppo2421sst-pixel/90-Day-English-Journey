import React, { useState } from 'react';
import { Sparkles, Clock, Brain, Flame, Target, ArrowRight, ShieldCheck } from 'lucide-react';
import { UserProfile } from '../types';

interface OnboardingModalProps {
  onComplete: (updated: Partial<UserProfile>) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [dailyWords, setDailyWords] = useState(15);
  const [timeBudget, setTimeBudget] = useState(15);

  const estimatedTotal90Days = dailyWords * 90;

  const handleFinish = () => {
    onComplete({
      onboarded: true,
      dailyWordTarget: dailyWords,
      dailyTimeBudgetMinutes: timeBudget,
      startDate: new Date().toISOString().split('T')[0],
      streak: 1,
      streakFreeze: 2,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-stone-100 shadow-2xl relative">
        {/* Step Indicator */}
        <div className="flex items-center gap-2 mb-6">
          <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? 'bg-amber-500' : 'bg-stone-800'}`} />
          <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? 'bg-amber-500' : 'bg-stone-800'}`} />
          <div className={`h-1.5 flex-1 rounded-full ${step >= 3 ? 'bg-amber-500' : 'bg-stone-800'}`} />
        </div>

        {step === 1 && (
          <div className="space-y-5 animate-in fade-in duration-300">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Sparkles className="w-6 h-6" />
            </div>
            
            <div>
              <h2 className="text-2xl font-display font-bold text-stone-100">
                ยินดีต้อนรับสู่ภารกิจ 90 วัน
              </h2>
              <p className="text-sm text-stone-300 mt-2 leading-relaxed">
                ออกแบบมาเพื่อคนที่ <b className="text-amber-300">เวลาน้อย</b>, <b className="text-amber-300">ไม่ชอบอ่านหนังสือยาวๆ</b>, และ <b className="text-amber-300">ลืมง่าย</b> โดยเฉพาะ
              </p>
            </div>

            <div className="space-y-3 bg-stone-800/60 p-4 rounded-2xl border border-stone-700/60 text-xs text-stone-300">
              <div className="flex items-start gap-3">
                <Brain className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <b className="text-stone-100 block text-sm">ระบบจำไม่รู้ลืม (Spaced Repetition)</b>
                  คำที่เพิ่งเรียนจะถูกดึงกลับมาทบทวนในจังหวะก่อนที่คุณจะลืมพอดี เปลี่ยนความจำระยะสั้นเป็นระยะยาว
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-stone-700/40">
                <Clock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <b className="text-stone-100 block text-sm">เซสชันสั้น 10-15 นาที/วัน</b>
                  ไม่ต้องนั่งอ่านหนังสือเป็นชั่วโมง ฝึกผ่านมินิเกม แฟลชการ์ดพร้อมเสียง และคำถามสั้นๆ
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-stone-700/40">
                <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <b className="text-stone-100 block text-sm">ระบบกันหลุด (Streak Shield)</b>
                  มีโล่สำรองกันสตรีคขาด วันไหนยุ่งจริงๆ ก็ไม่เสียกำลังใจและพร้อมกลับมาฝึกต่อได้เสมอ
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-3.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-lg shadow-amber-500/20"
            >
              <span>ตั้งเป้าหมายประจำวัน</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <span className="text-xs font-mono uppercase text-amber-400 tracking-wider">ขั้นตอนที่ 2</span>
              <h2 className="text-2xl font-display font-bold text-stone-100 mt-1">
                กำหนดเวลาที่คุณสะดวก
              </h2>
              <p className="text-xs text-stone-300 mt-1">
                มีเวลาว่างไม่ถึง 40 นาที แนะนำเลือก 10-20 นาทีต่อวันเพื่อให้ทำต่อเนื่องได้จริง
              </p>
            </div>

            {/* Time Budget */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-stone-300 flex justify-between">
                <span>เวลาฝึกต่อวัน</span>
                <span className="text-amber-400 font-mono font-bold">{timeBudget} นาที/วัน</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[10, 15, 20].map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => setTimeBudget(mins)}
                    className={`py-3 rounded-xl border text-sm font-semibold transition cursor-pointer ${
                      timeBudget === mins
                        ? 'bg-amber-500 text-stone-950 border-amber-400'
                        : 'bg-stone-800 text-stone-300 border-stone-700 hover:border-stone-600'
                    }`}
                  >
                    {mins} นาที
                  </button>
                ))}
              </div>
            </div>

            {/* Words per day */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-stone-300 flex justify-between">
                <span>คำศัพท์ใหม่ต่อวัน</span>
                <span className="text-amber-400 font-mono font-bold">{dailyWords} คำ/วัน</span>
              </label>
              <input
                type="range"
                min="5"
                max="30"
                step="5"
                value={dailyWords}
                onChange={(e) => setDailyWords(Number(e.target.value))}
                className="w-full accent-amber-500 bg-stone-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-stone-400 font-mono">
                <span>5 คำ (เบาสบาย)</span>
                <span>15 คำ (แนะนำ)</span>
                <span>30 คำ (เข้มข้น)</span>
              </div>
            </div>

            {/* Trajectory Box */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-stone-200">
              <p className="font-semibold text-amber-300 flex items-center gap-1.5">
                <Target className="w-4 h-4" />
                การคาดการณ์ใน 90 วัน
              </p>
              <p className="mt-1 text-stone-300 leading-relaxed">
                ที่ความเร็ว {dailyWords} คำ/วัน คุณจะเรียนรู้และทบทวนจนจำขึ้นใจได้ถึง{' '}
                <b className="text-stone-100 font-mono text-sm">{Math.min(3000, estimatedTotal90Days).toLocaleString()} คำ</b>{' '}
                (ครอบคลุมคำศัพท์ที่ใช้พูดและอ่านทั่วไปกว่า 85-90%)
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="py-3 px-4 rounded-xl bg-stone-800 text-stone-300 hover:text-white border border-stone-700 text-xs font-semibold cursor-pointer"
              >
                ย้อนกลับ
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold flex items-center justify-center gap-2 transition cursor-pointer text-sm shadow-lg shadow-amber-500/20"
              >
                <span>เริ่มการเดินทาง</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 text-center animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto">
              <Flame className="w-8 h-8 fill-emerald-400" />
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-stone-100">
                พร้อมแล้ว! เริ่มวันที่ 1 ทันที
              </h2>
              <p className="text-xs text-stone-300 mt-2 max-w-sm mx-auto leading-relaxed">
                เราเตรียมชุดคำศัพท์ 15 คำแรกของวันนี้ พร้อมเสียงออกเสียงมาตรฐานและมินิเกมจับคู่ไว้ให้คุณแล้ว
              </p>
            </div>

            <div className="bg-stone-800/80 p-4 rounded-2xl border border-stone-700 text-left text-xs space-y-2 text-stone-300">
              <div className="flex items-center justify-between">
                <span>เป้าหมายระยะเวลา:</span>
                <span className="text-stone-100 font-semibold font-mono">90 วัน</span>
              </div>
              <div className="flex items-center justify-between">
                <span>เวลาฝึกต่อวัน:</span>
                <span className="text-stone-100 font-semibold font-mono">{timeBudget} นาที</span>
              </div>
              <div className="flex items-center justify-between">
                <span>คำศัพท์ใหม่ต่อวัน:</span>
                <span className="text-stone-100 font-semibold font-mono">{dailyWords} คำ</span>
              </div>
              <div className="flex items-center justify-between">
                <span>โล่กันสตรีคหลุด:</span>
                <span className="text-cyan-400 font-semibold font-mono">2 อัน (แถมฟรีเริ่มต้น)</span>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-stone-950 font-bold text-base shadow-xl shadow-amber-500/20 transition cursor-pointer"
            >
              เข้าสู่หน้าหลักและเริ่มฝึกเลย 🚀
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
