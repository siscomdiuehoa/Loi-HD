import React from 'react';
import { Moon, Sun, Bookmark, WifiOff, Wrench } from 'lucide-react';
import { useThemeStore } from '../../store/useThemeStore';
import { useErrorStore } from '../../store/useErrorStore';
import { triggerHaptic } from '../../utils/haptics';

interface HeaderProps {
  onOpenBookmarks?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBookmarks }) => {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { bookmarkedIds } = useErrorStore();

  const handleThemeToggle = () => {
    triggerHaptic('light');
    toggleTheme();
  };

  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-200 px-4 py-3">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Logo & App Name */}
        <div className="flex items-center space-x-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-700 to-brand-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h1 className="text-base font-bold text-slate-900 dark:text-white tracking-tight leading-none">
                HVAC Master
              </h1>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400">
                <WifiOff className="w-2.5 h-2.5 mr-0.5" />
                Offline
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
              Tra Cứu Mã Lỗi Điều Hòa
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {/* Bookmark Button */}
          <button
            onClick={() => {
              triggerHaptic('light');
              onOpenBookmarks?.();
            }}
            aria-label="Mã lỗi đã lưu"
            className="relative p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all active:scale-95"
          >
            <Bookmark className="w-4 h-4" />
            {bookmarkedIds.length > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-brand-600 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white dark:border-slate-900">
                {bookmarkedIds.length}
              </span>
            )}
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={handleThemeToggle}
            aria-label="Chuyển chế độ sáng tối"
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all active:scale-95"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-400 animate-in spin-in-180 duration-300" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
