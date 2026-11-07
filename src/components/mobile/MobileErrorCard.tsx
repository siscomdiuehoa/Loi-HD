import React from 'react';
import type { ErrorCode } from '../../models/ErrorCode';
import { useErrorStore } from '../../store/useErrorStore';
import { Bookmark, ChevronRight, AlertCircle, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import { triggerHaptic } from '../../utils/haptics';

interface MobileErrorCardProps {
  error: ErrorCode;
}

export const MobileErrorCard: React.FC<MobileErrorCardProps> = ({ error }) => {
  const { selectError, bookmarkedIds, toggleBookmark } = useErrorStore();
  const isBookmarked = bookmarkedIds.includes(error.id);

  const getSeverityBadge = () => {
    switch (error.severity) {
      case 'critical':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-400">
            <AlertCircle className="w-2.5 h-2.5 mr-1" />
            Nghiêm trọng
          </span>
        );
      case 'warning':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400">
            <AlertTriangle className="w-2.5 h-2.5 mr-1" />
            Cảnh báo
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-400">
            <Info className="w-2.5 h-2.5 mr-1" />
            Thông tin
          </span>
        );
    }
  };

  return (
    <div
      onClick={() => {
        triggerHaptic('medium');
        selectError(error);
      }}
      className="bg-white dark:bg-slate-800/90 rounded-2xl p-4 shadow-sm border border-slate-200/80 dark:border-slate-700/80 hover:border-brand-500/50 active:scale-[0.98] transition-all cursor-pointer"
    >
      {/* Top Header: Error Code + Brand Name + Bookmark */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="px-3 py-1.5 rounded-xl bg-brand-900 dark:bg-brand-950 text-white font-black text-lg tracking-wider shadow-sm">
            {error.code}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
                {error.brandName}
              </span>
              {getSeverityBadge()}
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium mt-0.5">
              {error.modelTypes?.join(' • ') || 'Tiêu chuẩn'}
            </p>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleBookmark(error.id);
          }}
          aria-label="Ghim mã lỗi"
          className={`p-2 rounded-xl transition-colors ${
            isBookmarked
              ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/50'
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-50 dark:bg-slate-700/50'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Error Title */}
      <h4 className="mt-3 font-bold text-slate-900 dark:text-white text-sm leading-snug">
        {error.title}
      </h4>

      {/* Description */}
      <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed font-normal">
        {error.description}
      </p>

      {/* Footer Info */}
      <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-1 text-slate-500 dark:text-slate-400 font-semibold text-[11px]">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          <span>{error.solutions.length} bước khắc phục</span>
        </div>

        <div className="flex items-center text-brand-600 dark:text-brand-400 font-bold text-xs">
          <span>Xem chi tiết</span>
          <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
        </div>
      </div>
    </div>
  );
};
