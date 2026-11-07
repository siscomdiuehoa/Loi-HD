import React, { useState } from 'react';
import { useErrorStore } from '../../store/useErrorStore';
import {
  X,
  Bookmark,
  Share2,
  CheckCircle2,
  Circle,
  AlertTriangle,
  Wrench,
  Check,
  Cpu,
} from 'lucide-react';
import { triggerHaptic } from '../../utils/haptics';

export const ErrorDetailModal: React.FC = () => {
  const { selectedError, selectError, bookmarkedIds, toggleBookmark } = useErrorStore();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [copied, setCopied] = useState(false);

  if (!selectedError) return null;

  const isBookmarked = bookmarkedIds.includes(selectedError.id);

  const toggleStep = (stepNumber: number) => {
    triggerHaptic('light');
    setCompletedSteps((prev) =>
      prev.includes(stepNumber) ? prev.filter((s) => s !== stepNumber) : [...prev, stepNumber]
    );
  };

  const handleShare = async () => {
    triggerHaptic('medium');
    const shareText = `[MÃ LỖI HVAC] ${selectedError.brandName} - Mã ${selectedError.code}: ${selectedError.title}\n\nNguyên nhân:\n${selectedError.causes.map((c) => `- ${c}`).join('\n')}\n\nCách khắc phục:\n${selectedError.solutions.map((s) => `${s.step}. ${s.action}: ${s.detail || ''}`).join('\n')}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Mã lỗi ${selectedError.code} - ${selectedError.brandName}`,
          text: shareText,
        });
      } catch {
        // User cancelled or failed
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {}
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex justify-center items-end sm:items-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[92vh] flex flex-col overflow-hidden border border-slate-200/80 dark:border-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="px-3.5 py-1.5 rounded-xl bg-brand-900 dark:bg-brand-950 text-white font-black text-xl tracking-wider shadow-md">
              {selectedError.code}
            </div>
            <div>
              <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
                {selectedError.brandName}
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                {selectedError.modelTypes?.join(' • ') || 'Tất cả dòng máy'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1.5">
            {/* Bookmark Button */}
            <button
              onClick={() => toggleBookmark(selectedError.id)}
              aria-label="Lưu mã lỗi"
              className={`p-2.5 rounded-xl transition-all active:scale-90 ${
                isBookmarked
                  ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/60'
                  : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            {/* Share Button */}
            <button
              onClick={handleShare}
              aria-label="Chia sẻ qua Zalo/Tin nhắn"
              className="p-2.5 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-90"
            >
              {copied ? <Check className="w-5 h-5 text-emerald-500" /> : <Share2 className="w-5 h-5" />}
            </button>

            {/* Close Button */}
            <button
              onClick={() => {
                triggerHaptic('light');
                selectError(null);
              }}
              aria-label="Đóng cửa sổ"
              className="p-2.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body Content (Scrollable) */}
        <div className="overflow-y-auto p-5 space-y-6 flex-1">
          {/* Title & Description */}
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
              {selectedError.title}
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60 leading-relaxed font-normal">
              {selectedError.description}
            </p>
          </div>

          {/* Section 1: Nguyên nhân (Causes) */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-6 h-6 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <AlertTriangle className="w-3.5 h-3.5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 uppercase tracking-wide">
                Nguyên nhân khả dĩ ({selectedError.causes.length})
              </h3>
            </div>

            <ul className="space-y-2">
              {selectedError.causes.map((cause, idx) => (
                <li
                  key={idx}
                  className="flex items-start text-sm text-slate-700 dark:text-slate-300 leading-relaxed"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 mr-2.5 flex-shrink-0" />
                  <span>{cause}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 2: Cách khắc phục từng bước (Step-by-step Troubleshooting Checklist) */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Wrench className="w-3.5 h-3.5" />
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 uppercase tracking-wide">
                  Quy trình khắc phục từng bước
                </h3>
              </div>
              <span className="text-xs font-semibold text-slate-400">
                {completedSteps.length}/{selectedError.solutions.length} hoàn tất
              </span>
            </div>

            <div className="space-y-2.5">
              {selectedError.solutions.map((item) => {
                const isChecked = completedSteps.includes(item.step);
                return (
                  <div
                    key={item.step}
                    onClick={() => toggleStep(item.step)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer select-none ${
                      isChecked
                        ? 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                        : 'bg-white dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700/80 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <button className="mt-0.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                        {isChecked ? (
                          <CheckCircle2 className="w-5 h-5 fill-emerald-100 dark:fill-emerald-950" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600" />
                        )}
                      </button>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-sm font-bold ${
                              isChecked
                                ? 'text-emerald-900 dark:text-emerald-300 line-through opacity-80'
                                : 'text-slate-900 dark:text-white'
                            }`}
                          >
                            Bước {item.step}: {item.action}
                          </span>
                        </div>
                        {item.detail && (
                          <p
                            className={`text-xs mt-1 leading-relaxed ${
                              isChecked
                                ? 'text-emerald-800/70 dark:text-emerald-400/60'
                                : 'text-slate-500 dark:text-slate-400'
                            }`}
                          >
                            {item.detail}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 3: Linh kiện liên quan */}
          {selectedError.relatedSensors && selectedError.relatedSensors.length > 0 && (
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-2 mb-2 text-xs font-semibold text-slate-400">
                <Cpu className="w-3.5 h-3.5" />
                <span>Linh kiện liên quan / Điểm đo:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedError.relatedSensors.map((sensor, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
                  >
                    {sensor}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Sticky Bar */}
        <div className="sticky bottom-0 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 p-4 flex items-center space-x-3">
          <button
            onClick={handleShare}
            className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-brand-900 hover:bg-brand-800 text-white font-bold text-sm shadow-md active:scale-98 transition-all"
          >
            <Share2 className="w-4 h-4" />
            <span>{copied ? 'Đã sao chép hướng dẫn!' : 'Chia sẻ Zalo / Kỹ thuật'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
