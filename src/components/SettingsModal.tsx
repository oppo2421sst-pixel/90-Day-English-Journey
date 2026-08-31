import React, { useState } from 'react';
import { Settings as SettingsIcon, Volume2, Clock, Target, Download, Upload, Trash2, X, Check, Shield } from 'lucide-react';
import { UserProfile } from '../types';
import { exportBackupJson, importBackupJson, resetAllData } from '../utils/storage';

interface SettingsModalProps {
  profile: UserProfile;
  onClose: () => void;
  onSaveProfile: (updated: UserProfile) => void;
  onResetApp: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  profile,
  onClose,
  onSaveProfile,
  onResetApp,
}) => {
  const [dailyWords, setDailyWords] = useState(profile.dailyWordTarget);
  const [timeBudget, setTimeBudget] = useState(profile.dailyTimeBudgetMinutes);
  const [accent, setAccent] = useState<'en-US' | 'en-GB'>(profile.accent);
  const [speechRate, setSpeechRate] = useState(profile.speechRate);
  const [autoPlayAudio, setAutoPlayAudio] = useState(profile.autoPlayAudio);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleSave = () => {
    onSaveProfile({
      ...profile,
      dailyWordTarget: dailyWords,
      dailyTimeBudgetMinutes: timeBudget,
      accent,
      speechRate,
      autoPlayAudio,
    });
    onClose();
  };

  const handleExport = () => {
    const json = exportBackupJson();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `oxford3000-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const success = importBackupJson(text);
      if (success) {
        setImportStatus('นำเข้าข้อมูลสำเร็จ! กรุณารีเฟรชเพื่อโหลดข้อมูล');
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      } else {
        setImportStatus('ไฟล์ข้อมูลไม่ถูกต้อง');
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการล้างข้อมูลและเริ่มต้นใหม่จากวันที่ 1? ข้อมูลสถิติทั้งหมดจะถูกลบ')) {
      resetAllData();
      onResetApp();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-stone-100 shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <SettingsIcon className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-display font-bold text-stone-100">
              ตั้งค่าการเรียน & ข้อมูล
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-stone-800 text-stone-400 hover:text-white border border-stone-700 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Daily Goal & Pace */}
        <div className="space-y-4">
          <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
            เป้าหมายประจำวัน (Daily Pace)
          </h4>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-stone-300">
              <span>คำใหม่ต่อวัน</span>
              <span className="text-amber-400 font-mono font-bold">{dailyWords} คำ/วัน</span>
            </div>
            <input
              type="range"
              min="5"
              max="30"
              step="5"
              value={dailyWords}
              onChange={(e) => setDailyWords(Number(e.target.value))}
              className="w-full accent-amber-500 bg-stone-800 rounded-lg cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-stone-300">
              <span>เวลาที่ต้องการฝึกต่อวัน</span>
              <span className="text-amber-400 font-mono font-bold">{timeBudget} นาที</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[10, 15, 20].map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => setTimeBudget(mins)}
                  className={`py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                    timeBudget === mins
                      ? 'bg-amber-500 text-stone-950 border-amber-400'
                      : 'bg-stone-800 text-stone-400 border-stone-700'
                  }`}
                >
                  {mins} นาที
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Audio Preferences */}
        <div className="space-y-4 pt-2 border-t border-stone-800">
          <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
            ระบบเสียงออกเสียง (Audio & Speech)
          </h4>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setAccent('en-US')}
              className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-1.5 ${
                accent === 'en-US'
                  ? 'bg-amber-500 text-stone-950 border-amber-400'
                  : 'bg-stone-800 text-stone-400 border-stone-700'
              }`}
            >
              🇺🇸 สำเนียงอเมริกัน (US)
            </button>
            <button
              type="button"
              onClick={() => setAccent('en-GB')}
              className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-1.5 ${
                accent === 'en-GB'
                  ? 'bg-amber-500 text-stone-950 border-amber-400'
                  : 'bg-stone-800 text-stone-400 border-stone-700'
              }`}
            >
              🇬🇧 สำเนียงอังกฤษ (UK)
            </button>
          </div>

          <div className="flex items-center justify-between text-xs text-stone-300">
            <span>เล่นเสียงอัตโนมัติเมื่อเปิดการ์ด</span>
            <input
              type="checkbox"
              checked={autoPlayAudio}
              onChange={(e) => setAutoPlayAudio(e.target.checked)}
              className="w-4 h-4 accent-amber-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Backup and Restore */}
        <div className="space-y-3 pt-2 border-t border-stone-800">
          <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
            สำรอง & กู้คืนข้อมูล (Backup & Sync)
          </h4>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleExport}
              className="py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-xs font-semibold text-stone-300 hover:text-white flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>ดาวน์โหลดไฟล์สำรอง</span>
            </button>

            <label className="py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-xs font-semibold text-stone-300 hover:text-white flex items-center justify-center gap-1.5 transition cursor-pointer text-center">
              <Upload className="w-4 h-4" />
              <span>นำเข้าไฟล์สำรอง</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>
          </div>

          {importStatus && (
            <p className="text-xs text-emerald-400 font-mono bg-emerald-950/60 p-2 rounded-xl border border-emerald-800">
              {importStatus}
            </p>
          )}
        </div>

        {/* Reset */}
        <div className="pt-2 border-t border-stone-800 flex items-center justify-between">
          <button
            onClick={handleReset}
            className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>รีเซ็ตข้อมูลทั้งหมด</span>
          </button>

          <button
            onClick={handleSave}
            className="py-2.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition cursor-pointer shadow-lg shadow-amber-500/20"
          >
            บันทึกการตั้งค่า
          </button>
        </div>
      </div>
    </div>
  );
};
