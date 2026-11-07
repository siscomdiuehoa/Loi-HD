import React from 'react';
import { Wrench, Sun, Moon, Sparkles, Palette } from 'lucide-react';
import { useThemeStore } from '../../store/useThemeStore';
import { triggerHaptic } from '../../utils/haptics';

export const LiquidHeader: React.FC = () => {
  const { isDarkMode, toggleTheme, openThemeModal, themeMode } = useThemeStore();

  return (
    <header className="sticky top-0 z-30 w-full px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-2 select-none">
      {/* Floating Liquid Glass Capsule */}
      <div className="liquid-glass rounded-3xl px-4 py-2.5 flex items-center justify-between shadow-2xl transition-all duration-300">
        {/* Left: Wrench Icon Badge & Title */}
        <div className="flex items-center space-x-2.5 min-w-0">
          <div className="relative group flex-shrink-0">
            <div className="absolute -inset-1 bg-gradient-to-tr from-sky-400 via-blue-500 to-indigo-600 rounded-2xl blur-sm opacity-60 group-hover:opacity-100 transition duration-300 animate-pulse" />
            <div className="relative w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#0284c7] via-[#0ea5e9] to-[#38bdf8] flex items-center justify-center text-white shadow-lg border border-white/60">
              <Wrench className="w-4.5 h-4.5 stroke-[2.5]" />
            </div>
          </div>

          <div className="min-w-0">
            <div className="flex items-center space-x-1">
              <h1 className="text-sm font-black tracking-tight whitespace-nowrap flex items-center gap-1 text-slate-900 dark:text-white drop-shadow-sm">
                <span>Tra mã lỗi điều hòa</span>
                {themeMode === 'gemini-light' ? (
                  /* 4-Color Gemini Sparkle Badge */
                  <span className="inline-flex items-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="url(#geminiGradient)" />
                      <defs>
                        <linearGradient id="geminiGradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#4285F4" />
                          <stop offset="0.33" stopColor="#9B72CB" />
                          <stop offset="0.66" stopColor="#D96570" />
                          <stop offset="1" stopColor="#F4B400" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>
                ) : (
                  <Sparkles className="w-3 h-3 text-cyan-300 animate-spin flex-shrink-0" style={{ animationDuration: '6s' }} />
                )}
              </h1>
            </div>
            <p className="text-[10.5px] font-bold tracking-wide mt-0.5 text-sky-700/90 dark:text-cyan-300 whitespace-nowrap">
              Nhanh chóng - chính Xác
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

