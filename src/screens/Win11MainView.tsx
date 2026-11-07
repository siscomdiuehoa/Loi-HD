import React from 'react';
import { Win11SearchBar } from '../components/win11/Win11SearchBar';
import { Win11BrandGrid } from '../components/win11/Win11BrandGrid';
import { Win11ErrorCard } from '../components/win11/Win11ErrorCard';
import { useErrorStore } from '../store/useErrorStore';
import {
  Layers,
  Zap,
  RotateCcw,
  FolderOpen,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';

export const Win11MainView: React.FC = () => {
  const { brands, selectedBrandId, setSelectedBrand, searchResults, searchQuery, clearSearch } =
    useErrorStore();

  const selectedBrand = brands.find((b) => b.id.toLowerCase() === selectedBrandId.toLowerCase());

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-6xl mx-auto">
      {/* Windows 11 Breadcrumb & Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-medium">
            <span>Ứng dụng HVAC</span>
            <ChevronRight className="w-3 h-3" />
            <span>Tra cứu & Chẩn đoán</span>
            {selectedBrand && (
              <>
                <ChevronRight className="w-3 h-3" />
                <span className="text-fluent-blue dark:text-fluent-accentLight font-semibold">
                  {selectedBrand.name}
                </span>
              </>
            )}
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
            Tra Cứu Mã Lỗi Hệ Thống Điều Hòa
          </h1>
        </div>

        {/* Action Pills */}
        <div className="flex items-center space-x-2">
          {selectedBrandId !== 'all' && (
            <button
              onClick={() => {
                triggerHaptic('light');
                setSelectedBrand('all');
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-fluent-blue" />
              <span>Xem tất cả hãng</span>
            </button>
          )}
        </div>
      </div>

      {/* Windows 11 Search Section */}
      <section className="bg-white/60 dark:bg-slate-800/40 p-4 sm:p-5 rounded-xl border border-black/[0.06] dark:border-white/[0.08] shadow-win11-card space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            Tìm kiếm thông minh (Mã lỗi, board mạch, sensor, triệu chứng...)
          </span>
          <span className="text-[11px] text-slate-400 font-medium">
            Fuzzy Match Engine
          </span>
        </div>
        <Win11SearchBar />
      </section>

      {/* Brand Grid Section (4 Hãng chính) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Layers className="w-4 h-4 text-fluent-blue" />
            <h3 className="font-bold text-xs text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              Danh Mục Thương Hiệu ({brands.length} hãng)
            </h3>
          </div>
          <span className="text-xs text-slate-400">Nhấn để lọc</span>
        </div>

        <Win11BrandGrid />
      </section>

      {/* Results / List Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2">
            <FolderOpen className="w-4 h-4 text-fluent-blue" />
            <h3 className="font-bold text-xs text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              {searchQuery
                ? `Kết quả tìm kiếm cho "${searchQuery}" (${searchResults.length})`
                : selectedBrand
                ? `Mã lỗi ${selectedBrand.name} (${searchResults.length})`
                : `Tất cả mã lỗi hệ thống (${searchResults.length})`}
            </h3>
          </div>

          <span className="text-xs font-semibold text-slate-400 bg-black/[0.03] dark:bg-white/[0.04] px-2.5 py-1 rounded-md">
            100% Offline Database
          </span>
        </div>

        {/* Results Grid: 2 columns on larger screens */}
        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {searchResults.map((error) => (
              <Win11ErrorCard key={error.id} error={error} />
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="py-14 px-4 text-center bg-white/40 dark:bg-slate-800/40 rounded-xl border border-dashed border-black/10 dark:border-white/10 space-y-3">
            <div className="w-12 h-12 rounded-full bg-black/[0.04] dark:bg-white/[0.06] text-slate-400 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-sm text-slate-700 dark:text-slate-200">
                Không tìm thấy mã lỗi phù hợp
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Vui lòng thử tìm kiếm bằng từ khóa khác hoặc xóa bộ lọc
              </p>
            </div>
            <button
              onClick={() => {
                triggerHaptic('light');
                clearSearch();
                setSelectedBrand('all');
              }}
              className="px-4 py-1.5 rounded-md bg-fluent-blue hover:bg-fluent-blueHover text-white text-xs font-semibold transition-all shadow-sm"
            >
              Xem tất cả mã lỗi
            </button>
          </div>
        )}
      </section>

      {/* Footer Info */}
      <div className="pt-6 pb-2 text-center text-xs text-slate-400 flex items-center justify-center space-x-2">
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        <span>HVAC Diagnostic System • Windows 11 Fluent UI Experience</span>
      </div>
    </div>
  );
};
