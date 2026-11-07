import React, { useRef } from 'react';
import { Search, X, Sparkles } from 'lucide-react';
import { useErrorStore } from '../../store/useErrorStore';
import { triggerHaptic } from '../../utils/haptics';

export const SearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery, clearSearch } = useErrorStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const quickTags = [
    { label: 'H11 (Giao tiếp)', query: 'H11' },
    { label: 'F95 (Quá nhiệt)', query: 'F95' },
    { label: 'H16 (Biến dòng)', query: 'H16' },
    { label: 'U4 (Daikin)', query: 'U4' },
    { label: 'CH05 (LG)', query: 'CH05' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
  };

  const handleTagClick = (tagQuery: string) => {
    triggerHaptic('light');
    setSearchQuery(tagQuery);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="w-full space-y-3">
      {/* Main Search Input Container */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-600 to-blue-400 rounded-2xl blur opacity-20 group-hover:opacity-40 group-focus-within:opacity-60 transition duration-300"></div>
        
        <div className="relative flex items-center bg-white dark:bg-slate-800/90 rounded-2xl shadow-card-elevated border border-slate-200/80 dark:border-slate-700/80 px-4 py-3.5 transition-all">
          <Search className="w-5 h-5 text-brand-600 dark:text-brand-400 mr-3 flex-shrink-0" />
          
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Nhập mã lỗi (H11, U4...) hoặc triệu chứng..."
            className="w-full bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 font-medium text-[15px] focus:outline-none"
          />

          {searchQuery ? (
            <button
              onClick={() => {
                clearSearch();
                inputRef.current?.focus();
              }}
              aria-label="Xóa từ khóa"
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <div className="hidden sm:flex items-center text-[11px] font-semibold text-slate-400 bg-slate-100 dark:bg-slate-700/60 px-2 py-0.5 rounded-md">
              Fuzzy Search
            </div>
          )}
        </div>
      </div>

      {/* Quick Search Suggestion Tags */}
      <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-1 text-xs">
        <div className="flex items-center text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap mr-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 mr-1" />
          Gợi ý:
        </div>
        {quickTags.map((tag) => (
          <button
            key={tag.query}
            onClick={() => handleTagClick(tag.query)}
            className={`whitespace-nowrap px-2.5 py-1 rounded-lg text-[12px] font-medium transition-all active:scale-95 ${
              searchQuery.toLowerCase() === tag.query.toLowerCase()
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/50 dark:border-slate-700/50'
            }`}
          >
            {tag.label}
          </button>
        ))}
      </div>
    </div>
  );
};
