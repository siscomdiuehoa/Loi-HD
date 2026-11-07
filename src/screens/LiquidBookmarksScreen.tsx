import React from 'react';
import { useErrorStore } from '../store/useErrorStore';
import { errorService } from '../services/errorService';
import { LiquidErrorCard } from '../components/liquid/LiquidErrorCard';
import type { ErrorCode } from '../models/ErrorCode';
import { Bookmark, BookmarkX } from 'lucide-react';

export const LiquidBookmarksScreen: React.FC = () => {
  const { bookmarkedIds } = useErrorStore();
  const allErrors: ErrorCode[] = errorService.getAllErrors();
  const bookmarkedErrors: ErrorCode[] = allErrors.filter((e: ErrorCode) =>
    bookmarkedIds.includes(e.id)
  );

  return (
    <div className="p-4 pb-28 space-y-4 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 flex items-center justify-center shadow-md border border-white/40">
          <Bookmark className="w-5 h-5 fill-current" />
        </div>
        <div>
          <h2 className="text-base font-black text-slate-900 dark:text-white drop-shadow-sm">
            MÃ LỖI ĐÃ GHIM (SAVED)
          </h2>
          <p className="text-[11px] text-amber-700 dark:text-amber-200/70 font-bold">
            {bookmarkedErrors.length} mục đã lưu để tra cứu nhanh ngoài công trường
          </p>
        </div>
      </div>

      {/* Bookmarked Error Cards */}
      {bookmarkedErrors.length > 0 ? (
        <div className="space-y-3">
          {bookmarkedErrors.map((error: ErrorCode) => (
            <LiquidErrorCard key={error.id} error={error} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-20 px-6 space-y-3 liquid-card rounded-[36px]">
          <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mx-auto shadow-inner">
            <BookmarkX className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-black text-sm text-slate-900 dark:text-white">
              Chưa có mã lỗi nào được ghim
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-xs mx-auto leading-relaxed font-medium">
              Chạm vào biểu tượng bookmark ở góc mỗi mã lỗi để ghim lại và tra cứu ngay cả khi đang thao tác ngoài công trường.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
