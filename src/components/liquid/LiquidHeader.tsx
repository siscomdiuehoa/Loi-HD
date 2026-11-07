import React from 'react';
import { AirVent, Sun, Moon, Palette } from 'lucide-react';
import { useThemeStore } from '../../store/useThemeStore';
import { triggerHaptic } from '../../utils/haptics';

export const LiquidHeader: React.FC = () => {
  const { isDarkMode, toggleTheme, openThemeModal } = useThemeStore();

  return (
    <header className="sticky top-0 z-30 w-full px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-2 select-none">
      {/* Floating Liquid Glass Capsule */}
      <div className="liquid-glass rounded-3xl px-4 py-2.5 flex items-center justify-between shadow-2xl transition-all duration-300">
        {/* Left: Wrench Icon Badge & Title */}
        <div className="flex items-center space-x-2.5 min-w-0">
          <div className="relative group flex-shrink-0">
            <div className="absolute -inset-1 bg-gradient-to-tr from-sky-400 via-blue-500 to-indigo-600 rounded-2xl blur-sm opacity-60 group-hover:opacity-100 transition duration-300 animate-pulse" />
            <div className="relative w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#0284c7] via-[#0ea5e9] to-[#38bdf8] flex items-center justify-center text-white shadow-lg border border-white/60">
              <AirVent className="w-5 h-5 stroke-[2.2]" />
            </div>
          </div>

          <div className="min-w-0">
            <div className="flex items-center space-x-1">
              <h1 className="text-sm font-black tracking-tight whitespace-nowrap flex items-center gap-1 text-slate-900 dark:text-white drop-shadow-sm">
                <span>Tra mã lỗi điều hòa</span>

              </h1>
            </div>
            <p className="text-[10.5px] font-bold tracking-wide mt-0.5 text-sky-700/90 dark:text-cyan-300 whitespace-nowrap">
              Nhanh chóng - chính xác
            </p>
          </div>
        </div>

        {/* Right: Theme Customizer & Light/Dark Toggle Buttons */}
        <div className="flex items-center space-x-1.5 flex-shrink-0">

          {/* Palette / Theme Settings Button */}
          <button
            type="button"
            onClick={() => {
              triggerHaptic('medium');
              openThemeModal();
            }}
            title="Tùy chỉnh giao diện"
            aria-label="Cài đặt giao diện"
            className="p-2 rounded-2xl liquid-pill text-sky-600 dark:text-cyan-200 hover:text-sky-700 dark:hover:text-white transition-all active:scale-90 shadow-sm"
          >
            <Palette className="w-4 h-4" />
          </button>

          {/* Quick Light/Dark Toggle */}
          <button
            type="button"
            onClick={() => {
              triggerHaptic('light');
              toggleTheme();
            }}
            aria-label="Chuyển đổi sáng/tối"
            className="p-2 rounded-2xl liquid-pill text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-all active:scale-90 shadow-sm"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-300 animate-in spin-in-180 duration-300" />
            ) : (
              <Moon className="w-4 h-4 text-sky-700" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

