import React from 'react';
import { useErrorStore } from '../store/useErrorStore';
import { errorService } from '../services/errorService';
import { MobileErrorCard } from '../components/mobile/MobileErrorCard';
import type { ErrorCode } from '../models/ErrorCode';
import { Bookmark, BookmarkX } from 'lucide-react';

export const MobileBookmarksScreen: React.FC = () => {
  const { bookmarkedIds } = useErrorStore();
  const allErrors: ErrorCode[] = errorService.getAllErrors();
  const bookmarkedErrors: ErrorCode[] = allErrors.filter((e: ErrorCode) => bookmarkedIds.includes(e.id));

  return (
    <div className="p-4 pb-24 space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-sm">
            <Bookmark className="w-4.5 h-4.5 fill-current" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Mã Lỗi Đã Ghim
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {bookmarkedErrors.length} mục đã lưu để tra cứu nhanh
            </p>
          </div>
        </div>
      </div>

      {/* Bookmarked list */}
      {bookmarkedErrors.length > 0 ? (
        <div className="space-y-3">
          {bookmarkedErrors.map((error: ErrorCode) => (
            <MobileErrorCard key={error.id} error={error} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-20 px-4 space-y-3 bg-white dark:bg-slate-800/60 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700">
          <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-700/60 text-slate-400 flex items-center justify-center mx-auto">
            <BookmarkX className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">
              Chưa có mã lỗi nào được lưu
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
              Chạm vào biểu tượng ghim (bookmark) ở góc mỗi mã lỗi để ghim lại và tra cứu ngay cả khi đang trèo thang ngoài trời.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
