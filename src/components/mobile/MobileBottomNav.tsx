import React from 'react';
import { Home, Search, Cpu, Bookmark } from 'lucide-react';
import { useErrorStore } from '../../store/useErrorStore';
import { triggerHaptic } from '../../utils/haptics';

export type MobileTab = 'home' | 'search' | 'sensor' | 'bookmarks';

interface MobileBottomNavProps {
  activeTab: MobileTab;
  onTabChange: (tab: MobileTab) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onTabChange,
}) => {
  const { bookmarkedIds } = useErrorStore();

  const handleTabClick = (tab: MobileTab) => {
    triggerHaptic('light');
    onTabChange(tab);
  };

  const navItems = [
    { id: 'home' as MobileTab, label: 'Trang chủ', icon: Home },
    { id: 'search' as MobileTab, label: 'Tra cứu', icon: Search },
    { id: 'sensor' as MobileTab, label: 'Bảng Sensor', icon: Cpu },
    {
      id: 'bookmarks' as MobileTab,
      label: 'Đã lưu',
      icon: Bookmark,
      badge: bookmarkedIds.length,
    },
  ];

  return (
    <nav className="sticky bottom-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-200/80 dark:border-slate-800/80 px-2 py-2 transition-colors select-none">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all relative active:scale-90 cursor-pointer ${
                isActive
                  ? 'text-brand-600 dark:text-brand-400 font-bold'
                  : 'text-slate-500 dark:text-slate-400 font-medium hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <div className="relative pointer-events-none">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110 stroke-[2.5]' : 'stroke-[1.8]'
                  }`}
                />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 min-w-[16px] h-4 px-1 rounded-full bg-brand-600 text-white text-[9px] font-extrabold flex items-center justify-center border-2 border-white dark:border-slate-900">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight pointer-events-none">{item.label}</span>
              {isActive && (
                <div className="w-4 h-0.5 bg-brand-600 dark:text-brand-400 rounded-full mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
