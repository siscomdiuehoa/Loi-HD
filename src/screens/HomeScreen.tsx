import React from 'react';
import { HomeHeader } from '../components/home/HomeHeader';
import { GlassSearchBar } from '../components/home/GlassSearchBar';
import { BrandCard } from '../components/home/BrandCard';
import { HomeErrorCard } from '../components/home/HomeErrorCard';
import { useErrorStore } from '../store/useErrorStore';
import { Layers, Zap, RotateCcw, ShieldCheck, AlertCircle } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';

export const HomeScreen: React.FC = () => {
  const { brands, selectedBrandId, setSelectedBrand, searchResults, searchQuery, clearSearch } =
    useErrorStore();

  const selectedBrand = brands.find((b) => b.id.toLowerCase() === selectedBrandId.toLowerCase());

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F172A] via-[#151E33] to-[#1E1E2F] text-white flex flex-col">
      {/* 1. Header Section */}
      <HomeHeader />

      {/* Main Body */}
      <div className="flex-1 p-4 pb-24 space-y-6 max-w-md mx-auto w-full">
        {/* 2. Glassmorphism Search Bar Section */}
        <section className="space-y-2">
          <div className="flex items-center space-x-1.5 text-xs text-cyan-400 font-bold tracking-wide">
            <Zap className="w-3.5 h-3.5 fill-cyan-400" />
            <span>Tra cứu mã lỗi & triệu chứng sự cố</span>
          </div>
          <GlassSearchBar />
        </section>

        {/* 3. Brand Grid (2 Columns) */}
        <section className="space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              <Layers className="w-4 h-4 text-cyan-400" />
              <h2 className="font-extrabold text-xs text-white uppercase tracking-wider">
                Thương Hiệu Điều Hòa ({brands.length})
              </h2>
            </div>

            {selectedBrandId !== 'all' && (
              <button
                type="button"
                onClick={() => {
                  triggerHaptic('light');
                  setSelectedBrand('all');
                }}
                className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1" /> Tất cả hãng
              </button>
            )}
          </div>

          {/* 2-Column Grid for Panasonic, Daikin, Saiver, LG */}
          <div className="grid grid-cols-2 gap-3">
            {brands.map((brand) => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
          </div>
        </section>

        {/* 4. Live Results List */}
        <section className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <h2 className="font-extrabold text-xs text-white uppercase tracking-wider">
              {searchQuery
                ? `Kết quả tìm kiếm (${searchResults.length})`
                : selectedBrand
                ? `Mã lỗi ${selectedBrand.name} (${searchResults.length})`
                : `Mã lỗi thông dụng (${searchResults.length})`}
            </h2>

            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2 py-0.5 rounded-md">
              100% Sẵn sàng
            </span>
          </div>

          {searchResults.length > 0 ? (
            <div className="space-y-3">
              {searchResults.map((error) => (
                <HomeErrorCard key={error.id} error={error} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="p-8 text-center bg-[#1E293B] rounded-3xl border border-dashed border-slate-700 space-y-3 shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 text-slate-400 flex items-center justify-center mx-auto border border-slate-700">
                <AlertCircle className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <p className="font-bold text-sm text-white">
                  Không tìm thấy mã lỗi phù hợp
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Vui lòng kiểm tra lại từ khóa tìm kiếm hoặc chọn xem tất cả hãng
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  triggerHaptic('light');
                  clearSearch();
                  setSelectedBrand('all');
                }}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black transition-all shadow-md active:scale-95"
              >
                Xem tất cả mã lỗi
              </button>
            </div>
          )}
        </section>

        {/* Footer info badge */}
        <div className="text-center pt-2 pb-1">
          <div className="inline-flex items-center space-x-1.5 text-xs text-slate-400 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Tiêu chuẩn chẩn đoán HVAC • Sổ tay 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
};
