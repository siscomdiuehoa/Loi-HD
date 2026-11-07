import React from 'react';
import { useThemeStore, type ThemeMode, type BgGradientType } from '../../store/useThemeStore';
import { X, Sparkles, Sun, Moon, Check, Palette, Eye, ShieldCheck, Layers } from 'lucide-react';
import { triggerHaptic } from '../../utils/haptics';

export const LiquidThemeModal: React.FC = () => {
  const {
    isThemeModalOpen,
    closeThemeModal,
    themeMode,
    setThemeMode,
    bgGradient,
    setBgGradient,
    glassContrast,
    setGlassContrast,
    isDarkMode,
  } = useThemeStore();

  if (!isThemeModalOpen) return null;

  const themes: {
    id: ThemeMode;
    title: string;
    description: string;
    previewBg: string;
    icon: any;
    recommended?: boolean;
  }[] = [
    {
      id: 'gemini-light',
      title: 'Gemini Sky Glass (Sáng)',
      description: 'Nền gradient mây trời thanh lịch, kính trắng viền trong suốt, chữ đen sắc nét.',
      previewBg: 'linear-gradient(180deg, #FFFFFF 0%, #E2EEFE 50%, #BFE0FF 100%)',
      icon: Sun,
      recommended: true,
    },
    {
      id: 'midnight-dark',
      title: 'Midnight Liquid (Tối)',
      description: 'Không gian đêm sâu siêu thực, kính tối lân quang, bảo vệ mắt.',
      previewBg: 'linear-gradient(180deg, #0d1b33 0%, #080e1d 50%, #030712 100%)',
      icon: Moon,
    },
    {
      id: 'pure-frost',
      title: 'Pure Frost Crystal',
      description: 'Kính pha lê trắng ngọc trai, độ tương phản cao, tối giản tinh khiết.',
      previewBg: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 50%, #E2E8F0 100%)',
      icon: Layers,
    },
    {
      id: 'aurora-cyan',
      title: 'Aurora Neon Space',
      description: 'Sắc xanh cực quang huyền ảo kết hợp hiệu ứng kính neon cyber.',
      previewBg: 'linear-gradient(180deg, #042f2e 0%, #0f172a 50%, #020617 100%)',
      icon: Sparkles,
    },
  ];

  const backgrounds: {
    id: BgGradientType;
    label: string;
    gradient: string;
  }[] = [
    {
      id: 'gemini-sky',
      label: 'Mây trời Gemini',
      gradient: 'linear-gradient(180deg, #ffffff 0%, #e0f2fe 50%, #bae6fd 100%)',
    },
    {
      id: 'pure-white',
      label: 'Băng tuyết trắng',
      gradient: 'linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%)',
    },
    {
      id: 'midnight-deep',
      label: 'Đêm sâu huyền ảo',
      gradient: 'linear-gradient(180deg, #0b1528 0%, #040812 100%)',
    },
    {
      id: 'aurora',
      label: 'Cực quang xanh',
      gradient: 'linear-gradient(180deg, #083344 0%, #020617 100%)',
    },
  ];

  return (
    <div
      className="absolute inset-0 z-50 bg-black/60 backdrop-blur-md flex justify-center items-end sm:items-center p-0 sm:p-4 animate-in fade-in duration-200"
      onClick={closeThemeModal}
    >
      <div
        className={`w-full max-w-md rounded-t-[36px] sm:rounded-[36px] p-5 shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto no-scrollbar animate-in slide-in-from-bottom duration-300 border ${
          isDarkMode
            ? 'bg-[#0b1322]/95 border-white/20 text-white'
            : 'bg-white/90 border-white/90 text-slate-900 shadow-[0_20px_60px_rgba(2,132,199,0.15)] backdrop-blur-3xl'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/10">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-400 to-blue-600 flex items-center justify-center text-white shadow-md">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-black tracking-tight">Cài đặt Giao diện</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Tùy biến phong cách Glass & Màu nền</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              triggerHaptic('light');
              closeThemeModal();
            }}
            className={`p-2 rounded-2xl transition-all active:scale-90 ${
              isDarkMode
                ? 'bg-white/10 hover:bg-white/20 text-white'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Section 1: Presets */}
        <div className="my-4 space-y-3">
          <label className="text-xs font-black uppercase tracking-wider text-sky-600 dark:text-cyan-400 flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" />
            Phong cách chủ đạo
          </label>

          <div className="grid grid-cols-1 gap-2.5">
            {themes.map((t) => {
              const isSelected = themeMode === t.id;
              const Icon = t.icon;

              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    triggerHaptic('medium');
                    setThemeMode(t.id);
                  }}
                  className={`relative p-3.5 rounded-2xl text-left transition-all duration-200 flex items-center justify-between border ${
                    isSelected
                      ? isDarkMode
                        ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-[0_0_20px_rgba(6,182,212,0.25)] ring-2 ring-cyan-400/40'
                        : 'bg-sky-50 border-sky-500 text-slate-900 shadow-[0_8px_20px_rgba(2,132,199,0.15)] ring-2 ring-sky-500/30'
                      : isDarkMode
                      ? 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300'
                      : 'bg-white/70 border-slate-200/80 hover:bg-white text-slate-800 shadow-sm'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {/* Small Color Swatch */}
                    <div
                      className="w-10 h-10 rounded-xl shadow-inner border border-white/60 flex items-center justify-center flex-shrink-0"
                      style={{ background: t.previewBg }}
                    >
                      <Icon className={`w-5 h-5 ${t.id === 'gemini-light' || t.id === 'pure-frost' ? 'text-sky-600' : 'text-cyan-300'}`} />
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-sm">{t.title}</span>
                        {t.recommended && (
                          <span className="px-2 py-0.5 text-[9px] font-black rounded-full bg-sky-500 text-white uppercase tracking-wider">
                            Như ảnh mẫu
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] opacity-75 mt-0.5 line-clamp-1">{t.description}</p>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-sky-500 text-white flex items-center justify-center shadow-md flex-shrink-0 ml-2">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 2: Background Customizer */}
        <div className="mb-4 space-y-2.5">
          <label className="text-xs font-black uppercase tracking-wider text-sky-600 dark:text-cyan-400 flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5" />
            Màu nền Gradient
          </label>

          <div className="grid grid-cols-2 gap-2">
            {backgrounds.map((bg) => {
              const isSelected = bgGradient === bg.id;
              return (
                <button
                  key={bg.id}
                  type="button"
                  onClick={() => {
                    triggerHaptic('light');
                    setBgGradient(bg.id);
                  }}
                  className={`p-2.5 rounded-2xl flex items-center space-x-2 border transition-all text-xs font-bold ${
                    isSelected
                      ? 'border-sky-500 ring-2 ring-sky-500/30 shadow-md font-black'
                      : isDarkMode
                      ? 'border-white/10 bg-white/5 hover:bg-white/10 text-slate-300'
                      : 'border-slate-200 bg-white/70 hover:bg-white text-slate-700'
                  }`}
                >
                  <div
                    className="w-5 h-5 rounded-full border border-white/60 shadow-sm flex-shrink-0"
                    style={{ background: bg.gradient }}
                  />
                  <span className="truncate">{bg.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 3: Glass Border & Highlights */}
        <div className="mb-2 space-y-2.5">
          <label className="text-xs font-black uppercase tracking-wider text-sky-600 dark:text-cyan-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            Hiệu ứng viền kính (Glass Border)
          </label>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                triggerHaptic('light');
                setGlassContrast('high');
              }}
              className={`p-2.5 rounded-2xl text-xs font-bold border transition-all ${
                glassContrast === 'high'
                  ? 'border-sky-500 bg-sky-500/10 text-sky-700 dark:text-sky-300 ring-2 ring-sky-500/30 font-black'
                  : isDarkMode
                  ? 'border-white/10 bg-white/5 text-slate-400'
                  : 'border-slate-200 bg-white/60 text-slate-600'
              }`}
            >
              ✨ Viền kính bóng bẩy (High)
            </button>

            <button
              type="button"
              onClick={() => {
                triggerHaptic('light');
                setGlassContrast('normal');
              }}
              className={`p-2.5 rounded-2xl text-xs font-bold border transition-all ${
                glassContrast === 'normal'
                  ? 'border-sky-500 bg-sky-500/10 text-sky-700 dark:text-sky-300 ring-2 ring-sky-500/30 font-black'
                  : isDarkMode
                  ? 'border-white/10 bg-white/5 text-slate-400'
                  : 'border-slate-200 bg-white/60 text-slate-600'
              }`}
            >
              🍃 Viền kính dịu nhẹ (Soft)
            </button>
          </div>
        </div>

        {/* Section 4: Developer Credit */}
        <div className="mt-2 p-3 rounded-2xl bg-sky-500/10 border border-sky-500/20 space-y-1.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-black text-sky-700 dark:text-cyan-300 text-[11px] uppercase tracking-wider">
              Đơn vị phát triển ứng dụng
            </span>
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">v2.5 Pro</span>
          </div>
          <p className="font-black text-slate-900 dark:text-white text-xs">
            Công ty Cổ phần Thương mại Kỹ thuật SISCOM
          </p>
          <div className="flex items-center justify-between pt-1 border-t border-sky-500/15">
            <span className="text-slate-600 dark:text-slate-400 font-semibold text-[11px]">Trang chủ:</span>
            <a
              href="https://siscom.vn"
              target="_blank"
              rel="noopener noreferrer"
              className="font-black text-sky-600 dark:text-cyan-300 hover:underline inline-flex items-center space-x-0.5"
            >
              <span>https://siscom.vn</span>
              <span className="text-[10px]">↗</span>
            </a>
          </div>
        </div>

        {/* Save / Close Button */}
        <div className="mt-3 pt-2 border-t border-black/5 dark:border-white/10">
          <button
            type="button"
            onClick={() => {
              triggerHaptic('medium');
              closeThemeModal();
            }}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white font-black text-sm shadow-lg shadow-sky-500/25 active:scale-98 transition-all"
          >
            Áp dụng giao diện
          </button>
        </div>
      </div>
    </div>
  );
};
