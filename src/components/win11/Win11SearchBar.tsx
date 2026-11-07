import React, { useRef } from 'react';
import { Search, X, Sparkles } from 'lucide-react';
import { useErrorStore } from '../../store/useErrorStore';
import { triggerHaptic } from '../../utils/haptics';

export const Win11SearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery, clearSearch } = useErrorStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const quickTags = [
    { label: 'H11 (Panasonic - Giao tiếp)', query: 'H11' },
    { label: 'F95 (Panasonic - Quá nhiệt)', query: 'F95' },
    { label: 'H16 (Panasonic - Biến dòng)', query: 'H16' },
    { label: 'U4 (Daikin - VRV/SkyAir)', query: 'U4' },
    { label: 'CH05 (LG - Tín hiệu)', query: 'CH05' },
    { label: 'E01 (Saiver - Chiller/AHU)', query: 'E01' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleTagClick = (tagQuery: string) => {
    triggerHaptic('light');
    setSearchQuery(tagQuery);
    inputRef.current?.focus();
  };

  return (
    <div className="w-full space-y-3">
      {/* Windows 11 Fluent Search Box */}
      <div className="relative flex items-center">
        <div className="w-full relative group">
          <div className="relative flex items-center bg-white dark:bg-slate-800/90 rounded-lg border border-black/10 dark:border-white/10 focus-within:border-fluent-blue focus-within:border-b-2 focus-within:shadow-sm transition-all px-3.5 py-2.5 shadow-win11-card">
            <Search className="w-4 h-4 text-slate-400 group-focus-within:text-fluent-blue mr-2.5 flex-shrink-0 transition-colors" />

            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder="Tìm kiếm mã lỗi (H11, U4, CH05...) hoặc triệu chứng hư hỏng..."
              className="w-full bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
            />

            {searchQuery ? (
              <button
                onClick={() => {
                  clearSearch();
                  inputRef.current?.focus();
                }}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <div className="hidden sm:flex items-center text-[10px] font-medium text-slate-400 dark:text-slate-500 bg-black/[0.04] dark:bg-white/[0.06] px-2 py-0.5 rounded">
                Ctrl + K / Fuzzy Search
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Pills (Win11 Command Buttons) */}
      <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-0.5 text-xs">
        <div className="flex items-center text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap text-[11px] mr-1">
          <Sparkles className="w-3 h-3 text-fluent-blue mr-1" />
          Phổ biến:
        </div>
        {quickTags.map((tag) => (
          <button
            key={tag.query}
            onClick={() => handleTagClick(tag.query)}
            className={`whitespace-nowrap px-2.5 py-1 rounded-md text-xs transition-all active:scale-95 ${
              searchQuery.toLowerCase() === tag.query.toLowerCase()
                ? 'bg-fluent-blue text-white shadow-sm font-semibold'
                : 'bg-white/80 dark:bg-white/[0.06] text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-white/[0.1] border border-black/[0.06] dark:border-white/[0.08] shadow-win11-card'
            }`}
          >
            {tag.label}
          </button>
        ))}
      </div>
    </div>
  );
};
