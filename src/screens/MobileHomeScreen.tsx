import React from 'react';
import { MobileSearchBar } from '../components/mobile/MobileSearchBar';
import { MobileBrandGrid } from '../components/mobile/MobileBrandGrid';
import { MobileErrorCard } from '../components/mobile/MobileErrorCard';
import { useErrorStore } from '../store/useErrorStore';
import {
  Layers,
  Zap,
  RotateCcw,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';

export const MobileHomeScreen: React.FC = () => {
  const { brands, selectedBrandId, setSelectedBrand, searchResults, searchQuery, clearSearch } =
    useErrorStore();

  const selectedBrand = brands.find((b) => b.id.toLowerCase() === selectedBrandId.toLowerCase());

  return (
    <div className="p-4 pb-24 space-y-5">
      {/* Hero Section */}
      <section className="space-y-3">
        <div className="space-y-0.5">
          <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-brand-50 dark:bg-brand-950/70 text-brand-700 dark:text-brand-300 border border-brand-200/60 dark:border-brand-800/60">
            <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span>Tra cứu tức thì • Không cần 4G/Wifi</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight pt-1">
            Tra Cứu Mã Lỗi Điều Hòa
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Chẩn đoán sự cố, nguyên nhân & hướng dẫn xử lý từng bước
          </p>
        </div>

        {/* Search Bar */}
        <MobileSearchBar />
      </section>

      {/* Brand Grid Section (4 Hãng chính) */}
      <section className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            <Layers className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <h3 className="font-bold text-xs text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Chọn Hãng Máy Lạnh ({brands.length})
            </h3>
          </div>

          {selectedBrandId !== 'all' && (
            <button
              onClick={() => {
                triggerHaptic('light');
                setSelectedBrand('all');
              }}
              className="text-xs font-bold text-brand-600 dark:text-brand-400 flex items-center"
            >
              <RotateCcw className="w-3 h-3 mr-1" /> Tất cả hãng
            </button>
          )}
        </div>

        <MobileBrandGrid />
      </section>

      {/* Results Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between pt-1">
          <h3 className="font-bold text-xs text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            {searchQuery
              ? `Kết quả tìm "${searchQuery}" (${searchResults.length})`
              : selectedBrand
              ? `Mã lỗi ${selectedBrand.name} (${searchResults.length})`
              : `Mã lỗi thông dụng (${searchResults.length})`}
          </h3>

          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md">
            Offline 100%
          </span>
        </div>

        {/* Error Cards */}
        {searchResults.length > 0 ? (
          <div className="space-y-3">
            {searchResults.map((error) => (
              <MobileErrorCard key={error.id} error={error} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="p-8 text-center bg-white dark:bg-slate-800/80 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-400 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-sm text-slate-800 dark:text-slate-200">
                Không tìm thấy mã lỗi
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Thử kiểm tra lại từ khóa hoặc xóa bộ lọc hãng
              </p>
            </div>
            <button
              onClick={() => {
                triggerHaptic('light');
                clearSearch();
                setSelectedBrand('all');
              }}
              className="px-4 py-2 rounded-xl bg-brand-900 hover:bg-brand-800 text-white text-xs font-bold transition-all shadow-md active:scale-95"
            >
              Xem tất cả mã lỗi
            </button>
          </div>
        )}
      </section>

      {/* Footer info badge */}
      <div className="text-center pt-2 pb-2">
        <div className="inline-flex items-center space-x-1 text-[11px] font-medium text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Dữ liệu tiêu chuẩn hãng HVAC • Bản 2026</span>
        </div>
      </div>
    </div>
  );
};
