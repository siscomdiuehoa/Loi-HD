import React from 'react';
import { Home, Search, Cpu, Bookmark } from 'lucide-react';
import { useErrorStore } from '../../store/useErrorStore';
import { triggerHaptic } from '../../utils/haptics';

export type LiquidTab = 'home' | 'search' | 'sensor' | 'bookmarks';

interface LiquidBottomNavProps {
  activeTab: LiquidTab;
  onTabChange: (tab: LiquidTab) => void;
}

export const LiquidBottomNav: React.FC<LiquidBottomNavProps> = ({
  activeTab,
  onTabChange,
}) => {
  const { bookmarkedIds } = useErrorStore();

  const handleTabClick = (tab: LiquidTab) => {
    triggerHaptic('light');
    onTabChange(tab);
  };

  const navItems = [
    { id: 'home' as LiquidTab, label: 'Trang chủ', icon: Home },
    { id: 'search' as LiquidTab, label: 'Tra cứu', icon: Search },
    { id: 'sensor' as LiquidTab, label: 'Bảng Sensor', icon: Cpu },
    {
      id: 'bookmarks' as LiquidTab,
      label: 'Đã lưu',
      icon: Bookmark,
      badge: bookmarkedIds.length,
    },
  ];

  return (
    <nav className="sticky bottom-0 z-40 w-full px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-1 select-none pointer-events-auto">
      {/* Floating Apple-Style Dynamic Liquid Glass Dock */}
      <div className="liquid-glass rounded-full sm:rounded-3xl p-1.5 flex items-center justify-around shadow-2xl">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleTabClick(item.id)}
              className={`flex-1 flex flex-col items-center justify-center py-2 px-2 rounded-2xl transition-all duration-300 relative active:scale-90 cursor-pointer ${
                isActive
                  ? 'bg-sky-500/15 dark:bg-cyan-500/25 text-sky-700 dark:text-cyan-300 border border-sky-400/40 dark:border-cyan-400/50 shadow-sm backdrop-blur-xl'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <div className="relative pointer-events-none">
                <Icon
                  className={`w-5 h-5 transition-transform duration-300 ${
                    isActive
                      ? 'scale-110 stroke-[2.5] text-sky-600 dark:text-cyan-300 drop-shadow-sm'
                      : 'stroke-[1.8]'
                  }`}
                />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-2 -right-3 min-w-[17px] h-4 px-1 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-white text-[9px] font-black flex items-center justify-center shadow-sm border border-white/60">
                    {item.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] mt-1 tracking-tight font-black pointer-events-none transition-colors ${
                  isActive ? 'text-sky-700 dark:text-cyan-200 font-black' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

