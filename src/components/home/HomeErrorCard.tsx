import React from 'react';
import type { ErrorCode } from '../../models/ErrorCode';
import { useErrorStore } from '../../store/useErrorStore';
import { Bookmark, ChevronRight, AlertCircle, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import { triggerHaptic } from '../../utils/haptics';

interface HomeErrorCardProps {
  error: ErrorCode;
}

export const HomeErrorCard: React.FC<HomeErrorCardProps> = ({ error }) => {
  const { selectError, bookmarkedIds, toggleBookmark } = useErrorStore();
  const isBookmarked = bookmarkedIds.includes(error.id);

  const getSeverityBadge = () => {
    switch (error.severity) {
      case 'critical':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-rose-950/80 text-rose-400 border border-rose-800/80">
            <AlertCircle className="w-3 h-3 mr-1 text-rose-400" />
            Nghiêm trọng
          </span>
        );
      case 'warning':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-950/80 text-amber-400 border border-amber-800/80">
            <AlertTriangle className="w-3 h-3 mr-1 text-amber-400" />
            Cảnh báo
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-cyan-950/80 text-cyan-400 border border-cyan-800/80">
            <Info className="w-3 h-3 mr-1 text-cyan-400" />
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
      className="group bg-[#1E293B] rounded-2xl p-4 border border-slate-700/60 shadow-[0_6px_16px_rgba(0,0,0,0.3)] hover:border-cyan-500/60 active:scale-[0.98] transition-all cursor-pointer"
    >
      {/* Top Header: Error Code + Brand Name + Bookmark */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-black text-lg tracking-wider shadow-inner">
            {error.code}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-black text-cyan-400 uppercase tracking-wider">
                {error.brandName}
              </span>
              {getSeverityBadge()}
            </div>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              {error.modelTypes?.join(' • ') || 'Dòng tiêu chuẩn'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleBookmark(error.id);
          }}
          aria-label="Ghim mã lỗi"
          className={`p-2 rounded-xl transition-colors ${
            isBookmarked
              ? 'text-amber-400 bg-amber-950/60 border border-amber-800/60'
              : 'text-slate-400 hover:text-white bg-slate-800 border border-slate-700/60'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Error Title - Pure White High Contrast */}
      <h4 className="mt-3 font-bold text-white text-[15px] leading-snug group-hover:text-cyan-300 transition-colors">
        {error.title}
      </h4>

      {/* Description - Slate 400 min 14px size */}
      <p className="mt-1.5 text-sm text-[#94A3B8] line-clamp-2 leading-relaxed font-normal">
        {error.description}
      </p>

      {/* Footer Info */}
      <div className="mt-3 pt-2.5 border-t border-slate-700/60 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-1.5 text-slate-400 font-semibold text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{error.solutions.length} bước khắc phục tiêu chuẩn</span>
        </div>

        <div className="flex items-center text-cyan-400 font-bold text-xs group-hover:translate-x-0.5 transition-transform">
          <span>Xem chi tiết</span>
          <ChevronRight className="w-4 h-4 ml-0.5" />
        </div>
      </div>
    </div>
  );
};
