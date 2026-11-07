import React from 'react';
import {
  Menu,
  Home,
  Bookmark,
  Layers,
  HardDrive,
} from 'lucide-react';
import { useErrorStore } from '../../store/useErrorStore';
import { triggerHaptic } from '../../utils/haptics';

interface Win11SidebarProps {
  isExpanded: boolean;
  onToggleExpand: () => void;
  onOpenBookmarks: () => void;
  activeTab: 'home' | 'brands' | 'bookmarks' | 'settings';
  setActiveTab: (tab: 'home' | 'brands' | 'bookmarks' | 'settings') => void;
}

export const Win11Sidebar: React.FC<Win11SidebarProps> = ({
  isExpanded,
  onToggleExpand,
  onOpenBookmarks,
  activeTab,
  setActiveTab,
}) => {
  const { brands, selectedBrandId, setSelectedBrand, bookmarkedIds } = useErrorStore();

  const handleBrandClick = (brandId: string) => {
    triggerHaptic('light');
    setSelectedBrand(selectedBrandId === brandId ? 'all' : brandId);
    setActiveTab('home');
  };

  return (
    <aside
      className={`h-full flex flex-col justify-between select-none border-r border-black/[0.06] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02] transition-all duration-200 ${
        isExpanded ? 'w-60' : 'w-14'
      }`}
    >
      {/* Top Header & Navigation Links */}
      <div className="p-2 space-y-1">
        {/* Toggle Hamburger */}
        <button
          onClick={onToggleExpand}
          title={isExpanded ? 'Thu gọn menu' : 'Mở rộng menu'}
          className="w-full flex items-center h-10 px-3 rounded-lg hover:bg-black/[0.05] dark:hover:bg-white/[0.06] text-slate-700 dark:text-slate-200 transition-colors"
        >
          <Menu className="w-4 h-4 flex-shrink-0" />
          {isExpanded && (
            <span className="ml-3 text-xs font-semibold tracking-wide">Điều hướng</span>
          )}
        </button>

        {/* Home Item */}
        <button
          onClick={() => {
            triggerHaptic('light');
            setSelectedBrand('all');
            setActiveTab('home');
          }}
          className={`w-full flex items-center h-9 px-3 rounded-lg transition-all text-xs font-medium relative ${
            activeTab === 'home' && selectedBrandId === 'all'
              ? 'bg-white dark:bg-white/[0.08] text-fluent-blue dark:text-fluent-accentLight shadow-sm font-semibold'
              : 'text-slate-700 dark:text-slate-300 hover:bg-black/[0.04] dark:hover:bg-white/[0.05]'
          }`}
        >
          {activeTab === 'home' && selectedBrandId === 'all' && (
            <div className="absolute left-0 w-1 h-4 bg-fluent-blue rounded-r-full" />
          )}
          <Home className="w-4 h-4 flex-shrink-0" />
          {isExpanded && <span className="ml-3">Tất cả mã lỗi</span>}
        </button>

        {/* Brands Category Divider */}
        {isExpanded && (
          <div className="pt-3 pb-1 px-3 flex items-center justify-between text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            <span>Hãng điều hòa</span>
            <Layers className="w-3 h-3" />
          </div>
        )}

        {/* Brands List */}
        <div className="space-y-0.5">
          {brands.map((brand) => {
            const isBrandSelected = selectedBrandId.toLowerCase() === brand.id.toLowerCase();
            return (
              <button
                key={brand.id}
                onClick={() => handleBrandClick(brand.id)}
                title={brand.name}
                className={`w-full flex items-center justify-between h-9 px-3 rounded-lg transition-all text-xs font-medium relative ${
                  isBrandSelected
                    ? 'bg-white dark:bg-white/[0.08] text-fluent-blue dark:text-fluent-accentLight shadow-sm font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-black/[0.04] dark:hover:bg-white/[0.05]'
                }`}
              >
                {isBrandSelected && (
                  <div className="absolute left-0 w-1 h-4 bg-fluent-blue rounded-r-full" />
                )}
                <div className="flex items-center">
                  <div
                    className="w-4 h-4 rounded flex items-center justify-center text-[9px] font-bold flex-shrink-0"
                    style={{ backgroundColor: brand.badgeBg, color: brand.badgeText }}
                  >
                    {brand.name.substring(0, 1)}
                  </div>
                  {isExpanded && <span className="ml-3 truncate">{brand.name}</span>}
                </div>
                {isExpanded && (
                  <span className="text-[10px] text-slate-400 dark:text-slate-500">
                    {brand.totalCodes}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bookmarks */}
        <button
          onClick={() => {
            triggerHaptic('light');
            onOpenBookmarks();
          }}
          className="w-full flex items-center justify-between h-9 px-3 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-black/[0.04] dark:hover:bg-white/[0.05] transition-all text-xs font-medium mt-2"
        >
          <div className="flex items-center">
            <Bookmark className="w-4 h-4 text-amber-500 flex-shrink-0" />
            {isExpanded && <span className="ml-3">Mã lỗi đã lưu</span>}
          </div>
          {isExpanded && bookmarkedIds.length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-fluent-blue text-white text-[10px] font-bold">
              {bookmarkedIds.length}
            </span>
          )}
        </button>
      </div>

      {/* Bottom System & Hardware Specs */}
      <div className="p-2 border-t border-black/[0.06] dark:border-white/[0.08] space-y-1">
        {isExpanded && (
          <div className="p-2.5 rounded-lg bg-black/[0.03] dark:bg-white/[0.04] text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
            <div className="flex items-center justify-between font-semibold text-slate-700 dark:text-slate-200">
              <span className="flex items-center gap-1.5">
                <HardDrive className="w-3.5 h-3.5 text-fluent-blue" />
                Cơ sở dữ liệu
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">Offline</span>
            </div>
            <p className="text-[10px] text-slate-400">190+ mã lỗi tiêu chuẩn HVAC</p>
          </div>
        )}
      </div>
    </aside>
  );
};
