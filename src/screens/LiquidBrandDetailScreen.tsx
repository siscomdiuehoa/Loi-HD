import React, { useState, useMemo } from 'react';
import type { Brand } from '../models/Brand';
import type { ErrorCode } from '../models/ErrorCode';
import { errorService } from '../services/errorService';
import { LiquidErrorCard } from '../components/liquid/LiquidErrorCard';
import { ArrowLeft, Search, X, Layers, AlertCircle, SlidersHorizontal, Building2, ExternalLink } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';

interface LiquidBrandDetailScreenProps {
  brand: Brand;
  onBack: () => void;
}

export const LiquidBrandDetailScreen: React.FC<LiquidBrandDetailScreenProps> = ({
  brand,
  onBack,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [imageError, setImageError] = useState(false);

  const isGree = brand.id.toLowerCase() === 'gree';

  // Get all errors for this specific brand
  const brandErrors: ErrorCode[] = useMemo(() => {
    return errorService.getErrorsByBrand(brand.id);
  }, [brand.id]);

  // Extract unique model types / categories for filter chips
  const categories = useMemo(() => {
    const set = new Set<string>();
    brandErrors.forEach((err) => {
      if (err.modelTypes) {
        err.modelTypes.forEach((m) => {
          const shortName = m.replace(/^Điều hòa\s*/i, '').trim();
          if (shortName) set.add(shortName);
        });
      }
    });
    return ['Tất cả', ...Array.from(set).slice(0, 6)];
  }, [brandErrors]);

  // Filter errors by search query and category
  const filteredErrors = useMemo(() => {
    let list = brandErrors;

    if (selectedCategory !== 'all' && selectedCategory !== 'Tất cả') {
      list = list.filter((err) =>
        err.modelTypes?.some((m) =>
          m.toLowerCase().includes(selectedCategory.toLowerCase())
        )
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (err) =>
          err.code.toLowerCase().includes(q) ||
          err.title.toLowerCase().includes(q) ||
          err.description.toLowerCase().includes(q) ||
          err.tags.some((t) => t.toLowerCase().includes(q)) ||
          err.causes.some((c) => c.toLowerCase().includes(q))
      );
    }

    return list;
  }, [brandErrors, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col p-4 pb-28 max-w-md mx-auto w-full space-y-4">
      {/* 1. Brand Detail Header with Back Button */}
      <div className="sticky top-0 z-30 pt-1 pb-2">
        <div className="liquid-glass rounded-3xl p-3 flex items-center justify-between shadow-2xl">
          {/* Back Button */}
          <button
            type="button"
            onClick={() => {
              triggerHaptic('light');
              onBack();
            }}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-2xl liquid-pill text-sky-700 dark:text-cyan-200 hover:text-sky-900 dark:hover:text-white transition-all active:scale-90"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-xs font-black">Các hãng</span>
          </button>

          {/* Brand Info & Logo Plinth */}
          <div className="flex items-center space-x-2.5">
            <div className="text-right">
              <h1 className="text-sm font-black text-slate-900 dark:text-white leading-tight drop-shadow-sm">
                {brand.name}
              </h1>
              <span className="text-[10px] font-black text-sky-700 dark:text-cyan-300">
                {brandErrors.length} mã lỗi
              </span>
            </div>

            <div className="h-10 px-2.5 min-w-[48px] rounded-xl bg-white flex items-center justify-center p-1 shadow-sm border border-white/80 overflow-hidden">
              {brand.logo && !imageError ? (
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className={`max-h-7 max-w-[80px] object-contain transition-transform duration-200 ${
                    isGree ? 'scale-125' : 'scale-100'
                  }`}
                  onError={() => setImageError(true)}
                />
              ) : (
                <span
                  className="font-black text-xs"
                  style={{ color: brand.badgeText || '#004098' }}
                >
                  {brand.name.substring(0, 3).toUpperCase()}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Dedicated Brand Search Bar */}
      <section className="relative group">
        <div className="relative flex items-center liquid-glass rounded-full sm:rounded-3xl px-4 py-3 shadow-xl focus-within:border-sky-500/70 transition-all">
          <Search className="w-4.5 h-4.5 text-sky-600 dark:text-cyan-400 mr-2.5 flex-shrink-0" />

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Tìm mã lỗi trong ${brand.name} (vd: ${brand.popularCodes.join(', ')})...`}
            className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 font-semibold text-base focus:outline-none tracking-wide"
            autoFocus
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                triggerHaptic('light');
                setSearchQuery('');
              }}
              className="p-1 rounded-full bg-slate-200/80 dark:bg-white/10 text-slate-700 dark:text-slate-300 transition-colors ml-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </section>

      {/* 3. Category / Model Type Filter Chips */}
      {categories.length > 1 && (
        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-0.5 select-none text-xs">
          <div className="flex items-center text-slate-500 dark:text-slate-400 font-black text-[10px] mr-0.5 whitespace-nowrap">
            <SlidersHorizontal className="w-3 h-3 text-sky-600 dark:text-cyan-400 mr-1" />
            Dòng:
          </div>

          {categories.map((cat) => {
            const isCatActive =
              (cat === 'Tất cả' && selectedCategory === 'all') ||
              selectedCategory.toLowerCase() === cat.toLowerCase();

            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  triggerHaptic('light');
                  setSelectedCategory(cat === 'Tất cả' ? 'all' : cat);
                }}
                className={`whitespace-nowrap px-3 py-1 rounded-2xl text-[11px] font-bold transition-all active:scale-90 ${
                  isCatActive
                    ? 'liquid-pill-active'
                    : 'liquid-pill text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      )}

      {/* 4. Instant Error Code List */}
      <section className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            <Layers className="w-3.5 h-3.5 text-sky-600 dark:text-cyan-400" />
            <h2 className="font-black text-xs uppercase tracking-wider text-slate-900 dark:text-white">
              {searchQuery
                ? `Kết quả tìm "${searchQuery}" (${filteredErrors.length})`
                : selectedCategory !== 'all'
                ? `${selectedCategory} (${filteredErrors.length})`
                : `Danh sách mã lỗi (${filteredErrors.length})`}
            </h2>
          </div>

          <span className="text-[10px] font-black text-sky-700 dark:text-cyan-300 bg-sky-500/15 dark:bg-cyan-500/15 border border-sky-400/30 dark:border-cyan-400/30 px-2.5 py-0.5 rounded-full">
            {filteredErrors.length} / {brandErrors.length} mã
          </span>
        </div>

        {/* SISCOM Components Buying Banner */}
        <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-sky-500/15 border border-amber-500/30 flex items-center justify-between gap-2 shadow-sm">
          <div className="flex items-center space-x-2">
            <span className="text-base">🛒</span>
            <div>
              <p className="text-xs font-black text-slate-900 dark:text-white">Linh kiện thay thế {brand.name}</p>
              <p className="text-[10px] text-slate-600 dark:text-slate-400 font-semibold">Tra cứu & đặt hàng nhanh chính hãng</p>
            </div>
          </div>
          <a
            href="https://siscom.vn/linh-kien-dieu-hoa-daikin/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white text-[11px] font-black shadow-sm transition-all whitespace-nowrap flex items-center space-x-1"
          >
            <span>Tìm mua linh kiện</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Error Cards */}
        {filteredErrors.length > 0 ? (
          <div className="space-y-3">
            {filteredErrors.map((error) => (
              <LiquidErrorCard key={error.id} error={error} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="p-8 text-center liquid-card rounded-[36px] space-y-3 shadow-xl">
            <div className="w-14 h-14 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mx-auto shadow-inner">
              <AlertCircle className="w-7 h-7" />
            </div>
            <div>
              <p className="font-black text-sm text-slate-900 dark:text-white">
                Không tìm thấy mã lỗi trong {brand.name}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-xs mx-auto font-medium">
                Thử xóa từ khóa tìm kiếm hoặc chọn dòng máy khác
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                triggerHaptic('light');
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-white text-xs font-black transition-all shadow-md active:scale-95 border border-white/40"
            >
              Xem tất cả mã {brand.name}
            </button>
          </div>
        )}

        {/* Brand screen bottom credit */}
        <div className="text-center pt-2">
          <a
            href="https://siscom.vn"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1 text-[11px] text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-cyan-300 font-bold transition-colors"
          >
            <Building2 className="w-3.5 h-3.5 text-sky-600 dark:text-cyan-400" />
            <span>Phát triển bởi CTCP Thương Mại Kỹ Thuật SISCOM • https://siscom.vn</span>
          </a>
        </div>
      </section>
    </div>
  );
};
