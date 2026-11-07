import React from 'react';
import type { ErrorCode } from '../../models/ErrorCode';
import { useErrorStore } from '../../store/useErrorStore';
import { Bookmark, ChevronRight, AlertTriangle, AlertCircle, Info } from 'lucide-react';

interface ErrorCardProps {
  error: ErrorCode;
}

export const ErrorCard: React.FC<ErrorCardProps> = ({ error }) => {
  const { selectError, bookmarkedIds, toggleBookmark } = useErrorStore();
  const isBookmarked = bookmarkedIds.includes(error.id);

  const getSeverityBadge = () => {
    switch (error.severity) {
      case 'critical':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-400">
            <AlertCircle className="w-3 h-3 mr-1" /> Nghiêm trọng
          </span>
        );
      case 'warning':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400">
            <AlertTriangle className="w-3 h-3 mr-1" /> Cảnh báo
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-400">
            <Info className="w-3 h-3 mr-1" /> Thông tin
          </span>
        );
    }
  };

  return (
    <div
      onClick={() => selectError(error)}
      className="group relative bg-white dark:bg-slate-800/90 rounded-2xl p-4 shadow-card-elevated border border-slate-200/80 dark:border-slate-700/80 hover:border-brand-500/50 hover:shadow-glass-hover transition-all duration-200 cursor-pointer active:scale-[0.99]"
    >
      {/* Top Header: Error Code + Brand Name + Bookmark */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="px-3 py-1.5 rounded-xl bg-brand-900 dark:bg-brand-950 text-white font-extrabold text-lg tracking-wider shadow-sm">
            {error.code}
          </div>
          <div>
            <span className="text-[12px] font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
              {error.brandName}
            </span>
            <div className="mt-0.5">{getSeverityBadge()}</div>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleBookmark(error.id);
          }}
          aria-label="Lưu mã lỗi"
          className={`p-2 rounded-xl transition-colors ${
            isBookmarked
              ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40'
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Error Title */}
      <h4 className="mt-3 font-bold text-slate-900 dark:text-white text-[15px] leading-snug group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
        {error.title}
      </h4>

      {/* Quick Summary / Main Cause */}
      <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed font-normal">
        {error.description}
      </p>

      {/* Bottom info: Step count & Action hint */}
      <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
        <span className="text-slate-500 dark:text-slate-400 font-medium">
          {error.solutions.length} bước khắc phục
        </span>
        <div className="flex items-center text-brand-600 dark:text-brand-400 font-semibold group-hover:translate-x-0.5 transition-transform">
          <span>Xem chi tiết</span>
          <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
        </div>
      </div>
    </div>
  );
};
