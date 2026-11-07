import React from 'react';
import { useErrorStore } from '../../store/useErrorStore';
import { errorService } from '../../services/errorService';
import { ErrorCard } from '../error/ErrorCard';
import { X, Bookmark, BookmarkX } from 'lucide-react';
import { triggerHaptic } from '../../utils/haptics';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({ isOpen, onClose }) => {
  const { bookmarkedIds } = useErrorStore();

  if (!isOpen) return null;

  const allErrors = errorService.getAllErrors();
  const bookmarkedErrors = allErrors.filter((e) => bookmarkedIds.includes(e.id));

  return (
    <div className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-slate-50 dark:bg-slate-900 h-full flex flex-col shadow-2xl border-l border-slate-200 dark:border-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-500">
              <Bookmark className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h2 className="font-bold text-base text-slate-900 dark:text-white">
                Mã Lỗi Đã Lưu
              </h2>
              <p className="text-xs text-slate-400 font-medium">
                {bookmarkedErrors.length} mã đã ghim
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              triggerHaptic('light');
              onClose();
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {bookmarkedErrors.length > 0 ? (
            bookmarkedErrors.map((error) => <ErrorCard key={error.id} error={error} />)
          ) : (
            <div className="text-center py-16 px-4 space-y-3">
              <div className="w-14 h-14 rounded-full bg-slate-200/60 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                <BookmarkX className="w-7 h-7" />
              </div>
              <div>
                <p className="font-bold text-sm text-slate-700 dark:text-slate-300">
                  Chưa có mã lỗi nào được lưu
                </p>
                <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                  Nhấn vào biểu tượng bookmark ở góc mỗi mã lỗi để lưu lại tra cứu nhanh khi đang thi công.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
