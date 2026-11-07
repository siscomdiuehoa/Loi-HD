import React from 'react';
import { useErrorStore } from '../../store/useErrorStore';
import { errorService } from '../../services/errorService';
import { Win11ErrorCard } from './Win11ErrorCard';
import { X, Bookmark, BookmarkX } from 'lucide-react';
import { triggerHaptic } from '../../utils/haptics';

interface Win11BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Win11BookmarksDrawer: React.FC<Win11BookmarksDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const { bookmarkedIds } = useErrorStore();

  if (!isOpen) return null;

  const allErrors = errorService.getAllErrors();
  const bookmarkedErrors = allErrors.filter((e) => bookmarkedIds.includes(e.id));

  return (
    <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm flex justify-end animate-in fade-in duration-150">
      <div
        className="w-full max-w-md bg-white/95 dark:bg-[#202020]/95 backdrop-blur-2xl h-full flex flex-col shadow-win11-flyout border-l border-black/10 dark:border-white/10 animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="h-12 px-4 border-b border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between select-none">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 rounded-md bg-amber-50 dark:bg-amber-950/50 text-amber-500">
              <Bookmark className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="font-bold text-xs text-slate-800 dark:text-slate-200">
                Mã Lỗi Đã Ghim (Bookmarks)
              </h3>
              <p className="text-[10px] text-slate-400">
                {bookmarkedErrors.length} mục đã lưu trữ
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              triggerHaptic('light');
              onClose();
            }}
            className="p-1.5 rounded-md text-slate-400 hover:bg-black/5 dark:hover:bg-white/10 text-xs transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {bookmarkedErrors.length > 0 ? (
            bookmarkedErrors.map((error) => <Win11ErrorCard key={error.id} error={error} />)
          ) : (
            <div className="text-center py-20 px-4 space-y-3">
              <div className="w-12 h-12 rounded-full bg-black/[0.04] dark:bg-white/[0.06] text-slate-400 flex items-center justify-center mx-auto">
                <BookmarkX className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-xs text-slate-700 dark:text-slate-300">
                  Chưa có mã lỗi nào được ghim
                </p>
                <p className="text-[11px] text-slate-400 mt-1 max-w-xs mx-auto">
                  Nhấn vào biểu tượng ghim ở góc mã lỗi để lưu lại tra cứu nhanh khi bảo trì thực tế.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
