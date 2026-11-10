import React from 'react';
import type { Brand } from '../../models/Brand';
import { useErrorStore } from '../../store/useErrorStore';
import { ChevronRight, Cpu } from 'lucide-react';
import { triggerHaptic } from '../../utils/haptics';
import { showManufacturerLogos } from '../../utils/brandLogos';

export const Win11BrandGrid: React.FC = () => {
  const { brands, selectedBrandId, setSelectedBrand } = useErrorStore();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {brands.map((brand: Brand) => {
        const isSelected = selectedBrandId.toLowerCase() === brand.id.toLowerCase();
        return (
          <button
            key={brand.id}
            onClick={() => {
              triggerHaptic('light');
              setSelectedBrand(isSelected ? 'all' : brand.id);
            }}
            className={`group text-left p-3.5 rounded-xl border transition-all duration-200 active:scale-[0.98] ${
              isSelected
                ? 'bg-gradient-to-br from-fluent-blue to-[#005FB8] text-white border-transparent shadow-lg shadow-fluent-blue/20 ring-2 ring-fluent-blue/30'
                : 'bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800 border-black/[0.06] dark:border-white/[0.08] shadow-win11-card hover:shadow-win11-card-hover'
            }`}
          >
            {/* Header: Brand Icon & Code Count */}
            <div className="flex items-center justify-between mb-2">
              {showManufacturerLogos && <div
                className="h-8 px-2 min-w-[36px] rounded-lg bg-white flex items-center justify-center shadow-sm border border-black/[0.06] overflow-hidden"
              >
                {brand.logo ? (
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-h-6 max-w-[65px] object-contain"
                  />
                ) : (
                  <span
                    className="font-bold text-xs"
                    style={{ color: brand.badgeText || '#004098' }}
                  >
                    {brand.name.substring(0, 2).toUpperCase()}
                  </span>
                )}
              </div>}

              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-black/[0.04] dark:bg-white/[0.06] text-slate-600 dark:text-slate-300'
                }`}
              >
                {brand.totalCodes} mã lỗi
              </span>
            </div>

            {/* Title & Tagline */}
            <div>
              <h4
                className={`font-bold text-sm leading-tight ${
                  isSelected ? 'text-white' : 'text-slate-900 dark:text-slate-100'
                }`}
              >
                {brand.name}
              </h4>
              <p
                className={`text-[11px] line-clamp-1 mt-0.5 ${
                  isSelected ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {brand.tagline}
              </p>
            </div>

            {/* Bottom Preview */}
            <div className="mt-2.5 pt-2 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <Cpu
                  className={`w-3 h-3 ${isSelected ? 'text-blue-200' : 'text-slate-400'}`}
                />
                <span
                  className={`text-[10px] font-medium ${
                    isSelected ? 'text-blue-100' : 'text-slate-400'
                  }`}
                >
                  {brand.popularCodes.slice(0, 3).join(' • ')}
                </span>
              </div>
              <ChevronRight
                className={`w-3.5 h-3.5 ${
                  isSelected ? 'text-white' : 'text-slate-400'
                } group-hover:translate-x-0.5 transition-transform`}
              />
            </div>
          </button>
        );
      })}
    </div>
  );
};
