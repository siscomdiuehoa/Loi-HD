import React from 'react';
import type { ErrorCode } from '../../models/ErrorCode';
import { useErrorStore } from '../../store/useErrorStore';
import { Bookmark, ChevronRight, AlertCircle, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';

interface Win11ErrorCardProps {
  error: ErrorCode;
}

export const Win11ErrorCard: React.FC<Win11ErrorCardProps> = ({ error }) => {
  const { selectError, bookmarkedIds, toggleBookmark } = useErrorStore();
  const isBookmarked = bookmarkedIds.includes(error.id);

  const getSeverityBadge = () => {
    switch (error.severity) {
      case 'critical':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200/50 dark:border-rose-900/50">
            <AlertCircle className="w-3 h-3 mr-1 text-rose-600" />
            Lỗi nghiêm trọng
          </span>
        );
      case 'warning':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200/50 dark:border-amber-900/50">
            <AlertTriangle className="w-3 h-3 mr-1 text-amber-600" />
            Cảnh báo kỹ thuật
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-200/50 dark:border-blue-900/50">
            <Info className="w-3 h-3 mr-1 text-fluent-blue" />
            Thông tin hệ thống
          </span>
        );
    }
  };

  return (
    <div
      onClick={() => selectError(error)}
      className="group bg-white dark:bg-slate-800/80 rounded-xl p-4 border border-black/[0.06] dark:border-white/[0.08] shadow-win11-card hover:shadow-win11-card-hover hover:border-fluent-blue/50 transition-all duration-200 cursor-pointer relative"
    >
      {/* Top Header: Error Code Badge, Brand and Bookmark */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="px-3 py-1 rounded-lg bg-fluent-blue text-white font-extrabold text-base tracking-wider shadow-sm">
            {error.code}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                {error.brandName}
              </span>
              {getSeverityBadge()}
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
              {error.modelTypes?.join(' • ') || 'Dòng máy tiêu chuẩn'}
            </p>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleBookmark(error.id);
          }}
          title={isBookmarked ? 'Bỏ lưu' : 'Lưu mã lỗi'}
          className={`p-2 rounded-lg transition-colors ${
            isBookmarked
              ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40'
              : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Title */}
      <h4 className="mt-3 font-semibold text-slate-900 dark:text-white text-sm group-hover:text-fluent-blue dark:group-hover:text-fluent-accentLight transition-colors">
        {error.title}
      </h4>

      {/* Description / Summary */}
      <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed font-normal">
        {error.description}
      </p>

      {/* Bottom info bar */}
      <div className="mt-3 pt-2.5 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between text-xs">
        <div className="flex items-center space-x-1.5 text-slate-500 dark:text-slate-400 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>{error.solutions.length} bước khắc phục tiêu chuẩn</span>
        </div>

        <div className="flex items-center text-fluent-blue dark:text-fluent-accentLight font-semibold group-hover:translate-x-0.5 transition-transform text-xs">
          <span>Xem chi tiết</span>
          <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
        </div>
      </div>
    </div>
  );
};
