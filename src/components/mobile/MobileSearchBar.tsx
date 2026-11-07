import React, { useRef } from 'react';
import { Search, X, Sparkles } from 'lucide-react';
import { useErrorStore } from '../../store/useErrorStore';
import { triggerHaptic } from '../../utils/haptics';

export const MobileSearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery, clearSearch } = useErrorStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const quickTags = [
    { label: 'H11 (Pana)', query: 'H11' },
    { label: 'F95 (Quá nhiệt)', query: 'F95' },
    { label: 'H16 (Biến dòng)', query: 'H16' },
    { label: 'U4 (Daikin)', query: 'U4' },
    { label: 'CH05 (LG)', query: 'CH05' },
    { label: 'E01 (Saiver)', query: 'E01' },
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
    <div className="w-full space-y-2.5">
      {/* Mobile Search Bar Container */}
      <div className="relative group">
        <div className="flex items-center bg-white dark:bg-slate-800/95 rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-700/80 px-3.5 py-3 transition-all focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20">
          <Search className="w-4.5 h-4.5 text-brand-600 dark:text-brand-400 mr-2.5 flex-shrink-0" />

          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Nhập mã lỗi (H11, U4...) hoặc triệu chứng..."
            className="w-full bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 font-medium text-sm focus:outline-none"
          />

          {searchQuery && (
            <button
              onClick={() => {
                clearSearch();
                inputRef.current?.focus();
              }}
              aria-label="Xóa từ khóa"
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-700 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Quick Suggestion Chips (Swipeable) */}
      <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-0.5 text-xs">
        <div className="flex items-center text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap text-[11px] mr-0.5">
          <Sparkles className="w-3 h-3 text-amber-500 mr-1 flex-shrink-0" />
          Gợi ý:
        </div>
        {quickTags.map((tag) => (
          <button
            key={tag.query}
            onClick={() => handleTagClick(tag.query)}
            className={`whitespace-nowrap px-2.5 py-1 rounded-xl text-xs font-semibold transition-all active:scale-95 ${
              searchQuery.toLowerCase() === tag.query.toLowerCase()
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80'
            }`}
          >
            {tag.label}
          </button>
        ))}
      </div>
    </div>
  );
};
