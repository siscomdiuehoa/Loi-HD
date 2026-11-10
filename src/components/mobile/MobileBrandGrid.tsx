import React from 'react';
import type { Brand } from '../../models/Brand';
import { useErrorStore } from '../../store/useErrorStore';
import { ChevronRight } from 'lucide-react';
import { triggerHaptic } from '../../utils/haptics';

export const MobileBrandGrid: React.FC = () => {
  const { brands, selectedBrandId, setSelectedBrand } = useErrorStore();

  return (
    <div className="grid grid-cols-2 gap-2.5">
      {brands.map((brand: Brand) => {
        const isSelected = selectedBrandId.toLowerCase() === brand.id.toLowerCase();
        return (
          <button
            key={brand.id}
            onClick={() => {
              triggerHaptic('light');
              setSelectedBrand(isSelected ? 'all' : brand.id);
            }}
            className={`text-left p-3.5 rounded-2xl transition-all duration-200 active:scale-95 ${
              isSelected
                ? 'bg-gradient-to-br from-brand-900 to-brand-800 text-white shadow-md shadow-brand-900/25 border-2 border-brand-400'
                : 'bg-white dark:bg-slate-800/90 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-sm'
            }`}
          >
            {/* Brand count; brand identity is shown as text below. */}
            <div className="flex items-center justify-between mb-2">
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                {brand.totalCodes} mã
              </span>
            </div>

            {/* Brand Title & Tagline */}
            <div>
              <h4
                className={`font-bold text-sm leading-tight ${
                  isSelected ? 'text-white' : 'text-slate-900 dark:text-white'
                }`}
              >
                {brand.name}
              </h4>
              <p
                className={`text-[10px] line-clamp-1 font-medium mt-0.5 ${
                  isSelected ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {brand.tagline}
              </p>
            </div>

            {/* Popular Codes */}
            <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
              <span
                className={`text-[9px] font-medium ${
                  isSelected ? 'text-blue-200' : 'text-slate-400 dark:text-slate-500'
                }`}
              >
                {brand.popularCodes.slice(0, 3).join(' • ')}
              </span>
              <ChevronRight
                className={`w-3 h-3 ${isSelected ? 'text-white' : 'text-slate-400'}`}
              />
            </div>
          </button>
        );
      })}
    </div>
  );
};
