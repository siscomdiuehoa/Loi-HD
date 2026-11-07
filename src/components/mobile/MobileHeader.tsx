import React from 'react';
import { WifiOff, Sun, Moon, ShieldCheck } from 'lucide-react';
import { useThemeStore } from '../../store/useThemeStore';
import { triggerHaptic } from '../../utils/haptics';

export const MobileHeader: React.FC = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 border-b border-slate-200/80 dark:border-slate-800/80 px-4 py-3 select-none transition-colors">
      <div className="flex items-center justify-between">
        {/* Left: App Logo & Brand Title */}
        <div className="flex items-center space-x-2.5">
          <div className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center p-1 shadow-md border border-slate-200 dark:border-slate-700 overflow-hidden">
            <img
              src="/logos/logo-app.png"
              alt="Logo App"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h1 className="text-sm font-black text-slate-900 dark:text-white tracking-tight leading-none">
                Tra mã lỗi điều hòa
              </h1>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-400">
                <WifiOff className="w-2.5 h-2.5 mr-0.5" />
                Offline
              </span>
            </div>
            <p className="text-[10.5px] text-sky-700 dark:text-cyan-400 font-bold mt-0.5">
              Nhanh chóng - chính Xác
            </p>
          </div>
        </div>

        {/* Right: Quick Action Controls */}
        <div className="flex items-center space-x-1.5">
          <div className="hidden xs:flex items-center text-[10px] text-slate-400 font-medium mr-1">
            <ShieldCheck className="w-3 h-3 text-emerald-500 mr-0.5" />
            <span>Tiêu chuẩn hãng</span>
          </div>

          <button
            onClick={() => {
              triggerHaptic('light');
              toggleTheme();
            }}
            aria-label="Chuyển chế độ sáng/tối"
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-90"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
