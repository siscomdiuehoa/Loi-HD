import React from 'react';
import { Minus, Square, X, WifiOff, Sun, Moon, Wrench, Bookmark } from 'lucide-react';
import { useThemeStore } from '../../store/useThemeStore';
import { useErrorStore } from '../../store/useErrorStore';
import { triggerHaptic } from '../../utils/haptics';

interface Win11TitleBarProps {
  onOpenBookmarks?: () => void;
  isMaximized: boolean;
  onToggleMaximize: () => void;
}

export const Win11TitleBar: React.FC<Win11TitleBarProps> = ({
  onOpenBookmarks,
  isMaximized,
  onToggleMaximize,
}) => {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { bookmarkedIds } = useErrorStore();

  return (
    <div className="h-10 w-full flex items-center justify-between px-3 select-none border-b border-black/[0.06] dark:border-white/[0.08] bg-white/40 dark:bg-black/20 backdrop-blur-md rounded-t-xl transition-colors">
      {/* Left: App Icon & Title */}
      <div className="flex items-center space-x-2.5">
        <div className="w-5 h-5 rounded-md bg-fluent-blue flex items-center justify-center text-white shadow-sm">
          <Wrench className="w-3 h-3" />
        </div>
        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 tracking-normal flex items-center gap-2">
          HVAC Diagnostic Center
          <span className="hidden sm:inline-block text-[10px] font-normal text-slate-400 dark:text-slate-500">
            • Tra cứu mã lỗi điều hòa v2.4 (Win 11 Edition)
          </span>
        </span>
      </div>

      {/* Middle: Offline Status Badge */}
      <div className="hidden md:flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.04] dark:border-white/[0.06]">
        <WifiOff className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
        <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
          Chế độ Offline cục bộ (100% Sẵn sàng)
        </span>
      </div>

      {/* Right: Actions & Window Controls */}
      <div className="flex items-center space-x-1">
        {/* Bookmarks */}
        <button
          onClick={() => {
            triggerHaptic('light');
            onOpenBookmarks?.();
          }}
          title="Mã lỗi đã ghim"
          className="relative p-1.5 rounded hover:bg-black/[0.06] dark:hover:bg-white/[0.08] text-slate-600 dark:text-slate-300 transition-colors"
        >
          <Bookmark className="w-3.5 h-3.5" />
          {bookmarkedIds.length > 0 && (
            <span className="absolute 0.5 top-0.5 -right-0.5 w-3.5 h-3.5 bg-fluent-blue text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {bookmarkedIds.length}
            </span>
          )}
        </button>

        {/* Theme Toggle */}
        <button
          onClick={() => {
            triggerHaptic('light');
            toggleTheme();
          }}
          title={isDarkMode ? 'Chuyển sang giao diện Sáng' : 'Chuyển sang giao diện Tối'}
          className="p-1.5 rounded hover:bg-black/[0.06] dark:hover:bg-white/[0.08] text-slate-600 dark:text-slate-300 transition-colors"
        >
          {isDarkMode ? (
            <Sun className="w-3.5 h-3.5 text-amber-400" />
          ) : (
            <Moon className="w-3.5 h-3.5 text-slate-700" />
          )}
        </button>

        <div className="w-[1px] h-3.5 bg-slate-300 dark:bg-slate-700 mx-1" />

        {/* Window Controls: Minimize, Maximize, Close */}
        <button
          title="Thu nhỏ"
          className="p-1.5 px-2 rounded hover:bg-black/[0.06] dark:hover:bg-white/[0.08] text-slate-600 dark:text-slate-300 transition-colors text-xs"
        >
          <Minus className="w-3 h-3" />
        </button>

        <button
          onClick={onToggleMaximize}
          title={isMaximized ? 'Thu về kích thước chuẩn' : 'Phóng to toàn màn hình'}
          className="p-1.5 px-2 rounded hover:bg-black/[0.06] dark:hover:bg-white/[0.08] text-slate-600 dark:text-slate-300 transition-colors text-xs"
        >
          <Square className="w-2.5 h-2.5" />
        </button>

        <button
          title="Đóng ứng dụng"
          className="p-1.5 px-2.5 rounded hover:bg-rose-600 hover:text-white text-slate-600 dark:text-slate-300 transition-colors text-xs"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
