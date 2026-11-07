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

export const MobileErrorBottomSheet: React.FC = () => {
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
    const shareText = `[MÃ LỖI HVAC] ${selectedError.brandName} - Mã ${selectedError.code}: ${selectedError.title}\n\nNguyên nhân:\n${selectedError.causes.map((c) => `- ${c}`).join('\n')}\n\nQuy trình xử lý:\n${selectedError.solutions.map((s) => `${s.step}. ${s.action}: ${s.detail || ''}`).join('\n')}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Mã lỗi ${selectedError.code} - ${selectedError.brandName}`,
          text: shareText,
        });
      } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {}
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-end animate-in fade-in duration-200"
      onClick={() => selectError(null)}
    >
      {/* Bottom Sheet Container */}
      <div
        className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in slide-in-from-bottom duration-300 border-t border-slate-200/80 dark:border-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag Handle & Top Bar */}
        <div className="pt-3 pb-2 px-4 flex flex-col items-center bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 select-none">
          <div className="w-10 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mb-3" />

          <div className="w-full flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="px-3.5 py-1 rounded-xl bg-brand-900 dark:bg-brand-950 text-white font-black text-lg tracking-wider shadow-sm">
                {selectedError.code}
              </div>
              <div>
                <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
                  {selectedError.brandName}
                </span>
                <p className="text-[10px] text-slate-400 font-medium">
                  {selectedError.modelTypes?.join(' • ') || 'Dòng máy tiêu chuẩn'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={() => toggleBookmark(selectedError.id)}
                aria-label="Ghim mã lỗi"
                className={`p-2 rounded-xl transition-all ${
                  isBookmarked
                    ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/60'
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800'
                }`}
              >
                <Bookmark className={`w-4.5 h-4.5 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={() => {
                  triggerHaptic('light');
                  selectError(null);
                }}
                aria-label="Đóng"
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 transition-all"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="overflow-y-auto p-4 space-y-5 flex-1">
          {/* Title & Description */}
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
              {selectedError.title}
            </h2>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/70 p-3 rounded-xl border border-slate-200/60 dark:border-slate-700/60 leading-relaxed font-normal">
              {selectedError.description}
            </p>
          </div>

          {/* Causes (Nguyên nhân) */}
          <div>
            <div className="flex items-center space-x-1.5 mb-2.5">
              <div className="w-5 h-5 rounded-lg bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <AlertTriangle className="w-3 h-3" />
              </div>
              <h3 className="font-bold text-xs text-slate-900 dark:text-slate-100 uppercase tracking-wide">
                Nguyên nhân khả dĩ ({selectedError.causes.length})
              </h3>
            </div>

            <div className="space-y-1.5">
              {selectedError.causes.map((cause, idx) => (
                <div
                  key={idx}
                  className="flex items-start text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50/70 dark:bg-slate-800/40 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 mr-2 flex-shrink-0" />
                  <span>{cause}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Solutions (Quy trình từng bước) */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center space-x-1.5">
                <div className="w-5 h-5 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Wrench className="w-3 h-3" />
                </div>
                <h3 className="font-bold text-xs text-slate-900 dark:text-slate-100 uppercase tracking-wide">
                  Quy trình xử lý sự cố
                </h3>
              </div>
              <span className="text-[11px] font-semibold text-slate-400">
                {completedSteps.length}/{selectedError.solutions.length} bước xong
              </span>
            </div>

            <div className="space-y-2">
              {selectedError.solutions.map((item) => {
                const isChecked = completedSteps.includes(item.step);
                return (
                  <div
                    key={item.step}
                    onClick={() => toggleStep(item.step)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer select-none active:scale-[0.99] ${
                      isChecked
                        ? 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                        : 'bg-white dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700/80'
                    }`}
                  >
                    <div className="flex items-start space-x-2.5">
                      <button className="mt-0.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                        {isChecked ? (
                          <CheckCircle2 className="w-4.5 h-4.5 fill-emerald-100 dark:fill-emerald-950" />
                        ) : (
                          <Circle className="w-4.5 h-4.5 text-slate-300 dark:text-slate-600" />
                        )}
                      </button>

                      <div className="flex-1">
                        <span
                          className={`text-xs font-bold ${
                            isChecked
                              ? 'text-emerald-900 dark:text-emerald-300 line-through opacity-80'
                              : 'text-slate-900 dark:text-white'
                          }`}
                        >
                          Bước {item.step}: {item.action}
                        </span>
                        {item.detail && (
                          <p
                            className={`text-[11px] mt-1 leading-relaxed ${
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

          {/* Sensors & Test Points */}
          {selectedError.relatedSensors && (
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-1.5 mb-2 text-xs font-semibold text-slate-400">
                <Cpu className="w-3.5 h-3.5" />
                <span>Linh kiện & Điểm đo xung:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedError.relatedSensors.map((sensor, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-xl text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold"
                  >
                    {sensor}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Sticky Action Bar */}
        <div className="sticky bottom-0 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 p-3.5 flex items-center space-x-2">
          <button
            onClick={handleShare}
            className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-2xl bg-brand-900 hover:bg-brand-800 active:scale-95 text-white font-bold text-xs shadow-md transition-all"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Đã sao chép nội dung!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>Chia sẻ Zalo cho thợ / kỹ thuật</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
