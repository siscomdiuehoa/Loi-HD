import React from 'react';
import type { Brand } from '../../models/Brand';
import { useErrorStore } from '../../store/useErrorStore';
import { ChevronRight, Cpu } from 'lucide-react';

interface BrandCardProps {
  brand: Brand;
}

export const BrandCard: React.FC<BrandCardProps> = ({ brand }) => {
  const { selectedBrandId, setSelectedBrand } = useErrorStore();
  const isSelected = selectedBrandId.toLowerCase() === brand.id.toLowerCase();

  return (
    <button
      onClick={() => setSelectedBrand(isSelected ? 'all' : brand.id)}
      className={`relative w-full text-left p-4 rounded-2xl transition-all duration-300 active:scale-[0.98] ${
        isSelected
          ? 'bg-gradient-to-br from-brand-900 to-brand-800 text-white shadow-lg shadow-brand-900/30 border-2 border-brand-400 ring-2 ring-brand-500/20'
          : 'bg-white/80 dark:bg-slate-800/80 backdrop-blur-md hover:bg-white dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-card-elevated hover:shadow-glass-hover'
      }`}
    >
      {/* Top row: Brand Badge & Total Codes */}
      <div className="flex items-center justify-between mb-2.5">
        <div
          className="h-9 px-2 min-w-[40px] rounded-xl bg-white flex items-center justify-center shadow-sm border border-slate-200/80 overflow-hidden"
        >
          {brand.logo ? (
            <img
              src={brand.logo}
              alt={brand.name}
              className="max-h-7 max-w-[70px] object-contain"
            />
          ) : (
            <span
              className="font-bold text-xs"
              style={{ color: brand.badgeText || '#004098' }}
            >
              {brand.name.substring(0, 2).toUpperCase()}
            </span>
          )}
        </div>

        <span
          className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
            isSelected
              ? 'bg-white/20 text-white'
              : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300'
          }`}
        >
          {brand.totalCodes} mã
        </span>
      </div>

      {/* Brand Name & Tagline */}
      <div>
        <h3
          className={`font-bold text-base tracking-tight leading-tight ${
            isSelected ? 'text-white' : 'text-slate-900 dark:text-slate-100'
          }`}
        >
          {brand.name}
        </h3>
        <p
          className={`text-[11px] font-medium line-clamp-1 mt-0.5 ${
            isSelected ? 'text-blue-100/90' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          {brand.tagline}
        </p>
      </div>

      {/* Popular Codes Preview */}
      <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <Cpu className={`w-3 h-3 ${isSelected ? 'text-blue-200' : 'text-slate-400'}`} />
          <span
            className={`text-[10px] font-medium ${
              isSelected ? 'text-blue-200' : 'text-slate-400 dark:text-slate-500'
            }`}
          >
            {brand.popularCodes.slice(0, 3).join(' • ')}
          </span>
        </div>
        <ChevronRight
          className={`w-3.5 h-3.5 ${
            isSelected ? 'text-white' : 'text-slate-400 dark:text-slate-500'
          }`}
        />
      </div>
    </button>
  );
};
