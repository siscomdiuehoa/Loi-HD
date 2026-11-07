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

export const Win11ErrorDialog: React.FC = () => {
  const { selectedError, selectError, bookmarkedIds, toggleBookmark } = useErrorStore();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'causes' | 'solutions' | 'sensors'>('solutions');

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
    const shareText = `[HVAC DIAGNOSTIC - WIN 11] ${selectedError.brandName} - Mã ${selectedError.code}: ${selectedError.title}\n\nNguyên nhân:\n${selectedError.causes.map((c) => `- ${c}`).join('\n')}\n\nQuy trình xử lý:\n${selectedError.solutions.map((s) => `${s.step}. ${s.action}: ${s.detail || ''}`).join('\n')}`;

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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex justify-center items-center p-3 sm:p-6 animate-in fade-in duration-150">
      {/* Windows 11 Fluent ContentDialog */}
      <div
        className="relative w-full max-w-2xl bg-white/95 dark:bg-[#202020]/95 backdrop-blur-2xl rounded-xl shadow-win11-flyout border border-black/10 dark:border-white/10 flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dialog Title Bar */}
        <div className="h-12 px-5 bg-black/[0.02] dark:bg-white/[0.03] border-b border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between select-none">
          <div className="flex items-center space-x-3">
            <div className="px-2.5 py-0.5 rounded-md bg-fluent-blue text-white font-extrabold text-sm tracking-wide">
              {selectedError.code}
            </div>
            <div>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                {selectedError.brandName}
              </span>
              <span className="text-[11px] text-slate-400 dark:text-slate-500 ml-2">
                {selectedError.modelTypes?.join(' • ') || 'Dòng máy tiêu chuẩn'}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={() => toggleBookmark(selectedError.id)}
              title={isBookmarked ? 'Bỏ ghim' : 'Ghim mã lỗi'}
              className={`p-1.5 rounded-md transition-colors ${
                isBookmarked
                  ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40'
                  : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={() => {
                triggerHaptic('light');
                selectError(null);
              }}
              title="Đóng"
              className="p-1.5 px-2 rounded-md text-slate-400 hover:bg-rose-600 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dialog Header Content */}
        <div className="px-6 pt-5 pb-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
            {selectedError.title}
          </h2>
          <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal bg-black/[0.02] dark:bg-white/[0.03] p-3 rounded-lg border border-black/[0.04] dark:border-white/[0.06]">
            {selectedError.description}
          </p>

          {/* Win 11 Tab Navigation */}
          <div className="flex items-center space-x-1 mt-4 border-b border-black/[0.06] dark:border-white/[0.08]">
            <button
              onClick={() => setActiveTab('solutions')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 text-xs font-semibold border-b-2 transition-all ${
                activeTab === 'solutions'
                  ? 'border-fluent-blue text-fluent-blue dark:text-fluent-accentLight font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Quy trình xử lý ({selectedError.solutions.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('causes')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 text-xs font-semibold border-b-2 transition-all ${
                activeTab === 'causes'
                  ? 'border-fluent-blue text-fluent-blue dark:text-fluent-accentLight font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Nguyên nhân ({selectedError.causes.length})</span>
            </button>

            {selectedError.relatedSensors && (
              <button
                onClick={() => setActiveTab('sensors')}
                className={`flex items-center space-x-1.5 px-3.5 py-2 text-xs font-semibold border-b-2 transition-all ${
                  activeTab === 'sensors'
                    ? 'border-fluent-blue text-fluent-blue dark:text-fluent-accentLight font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>Linh kiện & Điểm đo</span>
              </button>
            )}
          </div>
        </div>

        {/* Dialog Tab Body (Scrollable) */}
        <div className="overflow-y-auto px-6 py-4 space-y-4 flex-1">
          {/* Tab 1: Solutions Checklist */}
          {activeTab === 'solutions' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Tích chọn từng bước sau khi đã kiểm tra thực tế:</span>
                <span className="font-semibold text-fluent-blue dark:text-fluent-accentLight">
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
                      className={`p-3 rounded-lg border transition-all cursor-pointer select-none ${
                        isChecked
                          ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/80'
                          : 'bg-white dark:bg-white/[0.04] border-black/[0.06] dark:border-white/[0.08] hover:border-fluent-blue/50'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <button className="mt-0.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                          {isChecked ? (
                            <CheckCircle2 className="w-4 h-4 fill-emerald-100 dark:fill-emerald-950" />
                          ) : (
                            <Circle className="w-4 h-4 text-slate-300 dark:text-slate-600" />
                          )}
                        </button>

                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span
                              className={`text-xs font-bold ${
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
          )}

          {/* Tab 2: Causes */}
          {activeTab === 'causes' && (
            <div className="space-y-2.5">
              {selectedError.causes.map((cause, idx) => (
                <div
                  key={idx}
                  className="flex items-start text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-black/[0.02] dark:bg-white/[0.03] p-3 rounded-lg border border-black/[0.04] dark:border-white/[0.06]"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 mr-2.5 flex-shrink-0" />
                  <span>{cause}</span>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: Sensors */}
          {activeTab === 'sensors' && selectedError.relatedSensors && (
            <div className="space-y-3">
              <p className="text-xs text-slate-500">
                Các linh kiện, điểm đo và IC cần kiểm tra trên bo mạch:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedError.relatedSensors.map((sensor, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] flex items-center space-x-2.5 text-xs font-semibold text-slate-800 dark:text-slate-200"
                  >
                    <Cpu className="w-4 h-4 text-fluent-blue" />
                    <span>{sensor}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Dialog CommandBar / Action Buttons */}
        <div className="h-14 px-6 bg-black/[0.02] dark:bg-white/[0.03] border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between select-none">
          <div className="text-[11px] text-slate-400">
            Mã định danh: <span className="font-mono text-slate-600 dark:text-slate-300">{selectedError.id}</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => selectError(null)}
              className="px-4 py-1.5 rounded-md border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors"
            >
              Đóng
            </button>

            <button
              onClick={handleShare}
              className="flex items-center space-x-1.5 px-4 py-1.5 rounded-md bg-fluent-blue hover:bg-fluent-blueHover active:bg-fluent-blueActive text-white text-xs font-semibold shadow-sm transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Đã sao chép!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Chia sẻ Zalo</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
