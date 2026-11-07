import React from 'react';
import type { ErrorCode } from '../../models/ErrorCode';
import { useErrorStore } from '../../store/useErrorStore';
import { Bookmark, ChevronRight, AlertCircle, AlertTriangle, Info, CheckCircle2, ShoppingBag, ExternalLink } from 'lucide-react';
import { triggerHaptic } from '../../utils/haptics';

interface LiquidErrorCardProps {
  error: ErrorCode;
}

export const LiquidErrorCard: React.FC<LiquidErrorCardProps> = ({ error }) => {
  const { selectError, bookmarkedIds, toggleBookmark } = useErrorStore();
  const isBookmarked = bookmarkedIds.includes(error.id);

  const getSeverityBadge = () => {
    switch (error.severity) {
      case 'critical':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-400/40 shadow-sm">
            <AlertCircle className="w-3 h-3 mr-1 text-rose-500 dark:text-rose-400" />
            Nghiêm trọng
          </span>
        );
      case 'warning':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-400/40 shadow-sm">
            <AlertTriangle className="w-3 h-3 mr-1 text-amber-500 dark:text-amber-400" />
            Cảnh báo
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black bg-sky-500/15 text-sky-700 dark:text-cyan-300 border border-sky-400/40 shadow-sm">
            <Info className="w-3 h-3 mr-1 text-sky-600 dark:text-cyan-400" />
            Thông tin
          </span>
        );
    }
  };

  const handleBuyPartsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerHaptic('medium');
    window.open('https://siscom.vn/linh-kien-dieu-hoa-daikin/', '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      onClick={() => {
        triggerHaptic('medium');
        selectError(error);
      }}
      className="group relative liquid-card rounded-3xl p-4 transition-all duration-300 active:scale-[0.98] cursor-pointer overflow-hidden"
    >
      {/* Specular Glint on Top Edge */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/40 to-transparent" />

      {/* Top Header: Luminous Error Code + Brand Name + Bookmark */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="px-3.5 py-1.5 rounded-2xl bg-gradient-to-tr from-sky-600 to-blue-500 text-white font-black text-lg tracking-wider shadow-md border border-white/60">
            {error.code}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-black text-sky-700 dark:text-cyan-300 uppercase tracking-wider">
                {error.brandName}
              </span>
              {getSeverityBadge()}
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300/80 font-bold mt-0.5">
              {error.modelTypes?.join(' • ') || 'Dòng máy tiêu chuẩn'}
            </p>
          </div>
        </div>

        {/* Bookmark Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleBookmark(error.id);
          }}
          aria-label="Ghim mã lỗi"
          className={`p-2.5 rounded-2xl transition-all active:scale-90 ${
            isBookmarked
              ? 'bg-amber-500/25 border border-amber-400/50 text-amber-500 shadow-sm'
              : 'liquid-pill text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Title - Bold Black in Light Mode */}
      <h4 className="mt-3 font-black text-slate-900 dark:text-white text-[15px] leading-snug group-hover:text-sky-600 dark:group-hover:text-cyan-200 transition-colors">
        {error.title}
      </h4>

      {/* Description */}
      <p className="mt-1.5 text-xs text-slate-700 dark:text-slate-300/90 line-clamp-2 leading-relaxed font-semibold">
        {error.description}
      </p>

      {/* Footer Info & Action Buttons */}
      <div className="mt-3 pt-2.5 border-t border-black/5 dark:border-white/10 flex items-center justify-between gap-2 text-xs flex-wrap">
        <div className="flex items-center space-x-1.5 text-emerald-700 dark:text-emerald-300 font-bold text-[11px]">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
          <span>{error.solutions.length} bước xử lý</span>
        </div>

        <div className="flex items-center space-x-2">
          {/* Nút Tìm mua linh kiện */}
          <button
            type="button"
            onClick={handleBuyPartsClick}
            className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-[11px] font-black transition-all active:scale-95 shadow-sm"
            title="Tìm mua linh kiện điều hòa chính hãng SISCOM"
          >
            <ShoppingBag className="w-3 h-3 text-amber-600 dark:text-amber-400" />
            <span>Tìm mua linh kiện</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-70" />
          </button>

          <div className="flex items-center text-sky-600 dark:text-cyan-300 font-black text-xs group-hover:translate-x-0.5 transition-transform">
            <span>Chi tiết</span>
            <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
};
