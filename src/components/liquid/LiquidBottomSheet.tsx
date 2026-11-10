import React, { useState } from 'react';
import { useErrorStore } from '../../store/useErrorStore';
import { useThemeStore } from '../../store/useThemeStore';
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
  ShoppingBag,
  ExternalLink,
} from 'lucide-react';
import { triggerHaptic } from '../../utils/haptics';

export const LiquidBottomSheet: React.FC = () => {
  const { selectedError, selectError, bookmarkedIds, toggleBookmark } = useErrorStore();
  const { isDarkMode } = useThemeStore();
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
    const shareText = `[MÃ LỖI HVAC] ${selectedError.brandName} - Mã ${selectedError.code}: ${selectedError.title}\n\nNguyên nhân:\n${selectedError.causes.map((c) => `- ${c}`).join('\n')}\n\nQuy trình xử lý:\n${selectedError.solutions.map((s) => `${s.step}. ${s.action}: ${s.detail || ''}`).join('\n')}\n\nTìm mua linh kiện chính hãng tại: https://siscom.vn/linh-kien-dieu-hoa-daikin/`;

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

  const handleBuyParts = () => {
    triggerHaptic('medium');
    window.open('https://siscom.vn/linh-kien-dieu-hoa-daikin/', '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="fixed inset-0 z-50 box-border w-full max-w-full overflow-x-hidden bg-black/65 backdrop-blur-md flex justify-center items-end animate-in fade-in duration-200"
      onClick={() => selectError(null)}
    >
      {/* Liquid Glass Bottom Sheet Container */}
      <div
        className={`box-border w-full min-w-0 max-w-lg rounded-t-[36px] shadow-2xl flex flex-col max-h-[90dvh] overflow-hidden animate-in slide-in-from-bottom duration-300 border-t border-x ${
          isDarkMode
            ? 'bg-[#0c1527]/95 border-white/20 text-white'
            : 'bg-white/95 border-white/90 text-slate-900 shadow-[0_-20px_60px_rgba(2,132,199,0.18)] backdrop-blur-3xl'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag Handle & Top Bar */}
        <div className="pt-3.5 pb-2 px-5 flex flex-col items-center border-b border-black/5 dark:border-white/10 select-none">
          <div className="w-12 h-1.5 bg-slate-300 dark:bg-white/25 rounded-full mb-3" />

          <div className="w-full min-w-0 flex items-center justify-between gap-2">
            <div className="min-w-0 flex flex-1 items-center space-x-3">
              <div className="px-4 py-1.5 rounded-2xl bg-gradient-to-tr from-sky-600 to-blue-500 text-white font-black text-xl tracking-wider shadow-md border border-white/60">
                {selectedError.code}
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-xs font-black text-sky-700 dark:text-cyan-300 uppercase tracking-wider">
                  {selectedError.brandName}
                </span>
                <p className="max-w-full break-words text-xs text-slate-600 dark:text-slate-300/80 font-bold leading-snug">
                  {selectedError.modelTypes?.join(' • ') || 'Dòng máy tiêu chuẩn'}
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center space-x-1.5">
              <button
                type="button"
                onClick={() => toggleBookmark(selectedError.id)}
                aria-label="Ghim mã lỗi"
                className={`p-2.5 rounded-2xl transition-all ${
                  isBookmarked
                    ? 'bg-amber-500/25 border border-amber-400/50 text-amber-500 shadow-sm'
                    : 'liquid-pill text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Bookmark className={`w-4.5 h-4.5 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>

              <button
                type="button"
                onClick={() => {
                  triggerHaptic('light');
                  selectError(null);
                }}
                aria-label="Đóng"
                className="p-2.5 rounded-2xl liquid-pill text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="box-border w-full min-w-0 flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-5 space-y-5 no-scrollbar">
          {/* Title & Description */}
          <div>
            <h2 className="break-words text-lg font-black leading-snug text-slate-900 dark:text-white">
              {selectedError.title}
            </h2>
            <p className="mt-2 break-words text-sm text-slate-700 dark:text-slate-200/90 liquid-card p-3.5 rounded-2xl leading-relaxed font-medium">
              {selectedError.description}
            </p>
          </div>

          {selectedError.sources && selectedError.sources.length > 0 && (
            <div className="text-xs text-slate-600 dark:text-slate-300">
              <span className="font-bold">Nguồn tham khảo: </span>
              {selectedError.sources.map((source) => (
                <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer" className="text-sky-700 dark:text-cyan-300 underline">{source.title}</a>
              ))}
            </div>
          )}

          {/* Causes Section */}
          <div>
            <div className="flex items-center space-x-2 mb-2.5">
              <div className="w-6 h-6 rounded-xl bg-amber-500/20 border border-amber-400/30 text-amber-600 dark:text-amber-300 flex items-center justify-center shadow-sm">
                <AlertTriangle className="w-3.5 h-3.5" />
              </div>
              <h3 className="font-black text-xs text-amber-700 dark:text-amber-300 uppercase tracking-wider">
                Nguyên nhân khả dĩ ({selectedError.causes.length})
              </h3>
            </div>

            <div className="space-y-2">
              {selectedError.causes.map((cause, idx) => (
                <div
                  key={idx}
                  className="flex min-w-0 items-start text-sm text-slate-800 dark:text-slate-200 leading-relaxed liquid-card p-3 rounded-2xl font-medium"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 mr-2.5 flex-shrink-0 shadow-sm" />
                  <span className="min-w-0 break-words">{cause}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Troubleshooting Checklist */}
          <div>
              <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2">
                <div className="flex min-w-0 items-center space-x-2">
                <div className="w-6 h-6 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-600 dark:text-emerald-300 flex items-center justify-center shadow-sm">
                  <Wrench className="w-3.5 h-3.5" />
                </div>
                <h3 className="min-w-0 break-words font-black text-sm text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
                  Quy trình xử lý từng bước
                </h3>
              </div>
              <span className="shrink-0 text-sm font-black text-emerald-600 dark:text-emerald-400">
                {completedSteps.length}/{selectedError.solutions.length} bước hoàn tất
              </span>
            </div>

            <div className="space-y-2.5">
              {selectedError.solutions.map((item) => {
                const isChecked = completedSteps.includes(item.step);
                return (
                  <div
                    key={item.step}
                    onClick={() => toggleStep(item.step)}
                    className={`p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer select-none active:scale-[0.98] ${
                      isChecked
                        ? 'bg-emerald-500/15 border-emerald-500/40 shadow-sm'
                        : 'liquid-card'
                    }`}
                  >
                    <div className="flex min-w-0 items-start space-x-3">
                      <button className="mt-0.5 text-emerald-500 flex-shrink-0">
                        {isChecked ? (
                          <CheckCircle2 className="w-5 h-5 fill-emerald-500/30 text-emerald-600 dark:text-emerald-400" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-400" />
                        )}
                      </button>

                      <div className="min-w-0 flex-1">
                        <span
                          className={`block break-words text-base leading-snug font-black ${
                            isChecked
                              ? 'text-emerald-700 dark:text-emerald-200 line-through opacity-80'
                              : 'text-slate-900 dark:text-white'
                          }`}
                        >
                          Bước {item.step}: {item.action}
                        </span>
                        {item.detail && (
                          <p
                            className={`mt-1 break-words text-sm leading-relaxed font-medium ${
                              isChecked
                                ? 'text-emerald-600 dark:text-emerald-300/70'
                                : 'text-slate-600 dark:text-slate-300/90'
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

          {/* Test Points, ICs & Buy Components Direct Banner */}
          {selectedError.relatedSensors && selectedError.relatedSensors.length > 0 && (
            <div className="pt-2 border-t border-black/5 dark:border-white/10 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs font-bold text-sky-700 dark:text-cyan-300">
                  <Cpu className="w-4 h-4" />
                  <span>Linh kiện & Điểm đo kiểm:</span>
                </div>

                <button
                  type="button"
                  onClick={handleBuyParts}
                  className="text-[11px] font-black text-amber-700 dark:text-amber-300 hover:underline flex items-center space-x-1"
                >
                  <span>Mua linh kiện</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {selectedError.relatedSensors.map((sensor, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-2xl text-[11px] liquid-pill text-sky-800 dark:text-cyan-200 font-bold"
                  >
                    {sensor}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Action Bar */}
        <div className="sticky bottom-0 box-border w-full min-w-0 bg-white/95 dark:bg-[#0c1527]/95 backdrop-blur-2xl border-t border-black/5 dark:border-white/15 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] flex items-center gap-2">
          {/* Nút Tìm mua linh kiện */}
          <button
            type="button"
            onClick={handleBuyParts}
            className="min-w-0 flex-1 flex items-center justify-center gap-1 py-3 px-2 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:scale-95 text-white font-black text-[11px] shadow-lg shadow-amber-500/25 border border-white/40 transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Mua linh kiện</span>
            <ExternalLink className="w-3 h-3 opacity-80" />
          </button>

          {/* Nút Chia sẻ Zalo */}
          <button
            type="button"
            onClick={handleShare}
            className="min-w-0 flex-1 flex items-center justify-center gap-1 py-3 px-2 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:opacity-95 active:scale-95 text-white font-black text-[11px] shadow-lg shadow-sky-500/25 border border-white/40 transition-all"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Đã sao chép</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>Chia sẻ Zalo</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

