import React, { useState } from 'react';
import type { Brand } from '../../models/Brand';
import { useErrorStore } from '../../store/useErrorStore';
import { triggerHaptic } from '../../utils/haptics';

interface BrandCardProps {
  brand: Brand;
}

export const BrandCard: React.FC<BrandCardProps> = ({ brand }) => {
  const { selectedBrandId, setSelectedBrand } = useErrorStore();
  const isSelected = selectedBrandId.toLowerCase() === brand.id.toLowerCase();
  const [imageError, setImageError] = useState(false);

  const handleCardClick = () => {
    triggerHaptic('light');
    setSelectedBrand(isSelected ? 'all' : brand.id);
  };

  return (
    <button
      type="button"
      onClick={handleCardClick}
      className={`group relative text-left p-4 rounded-2xl transition-all duration-200 active:scale-[0.97] flex flex-col justify-between min-h-[148px] border ${
        isSelected
          ? 'bg-slate-800 border-cyan-400 shadow-[0_8px_24px_rgba(6,182,212,0.25)] ring-2 ring-cyan-400/30'
          : 'bg-[#1E293B] hover:bg-slate-800/90 border-slate-700/60 shadow-[0_6px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.4)]'
      }`}
    >
      {/* 1. Top Row: Official Brand Logo in a small white bounding box */}
      <div className="flex items-center justify-between w-full mb-2">
        <div className="h-10 px-2 min-w-[42px] rounded-xl bg-white flex items-center justify-center p-1 shadow-sm flex-shrink-0">
          {brand.logo && !imageError ? (
            <img
              src={brand.logo}
              alt={brand.name}
              className="max-h-7 max-w-[80px] object-contain"
              onError={() => setImageError(true)}
            />
          ) : (
            <span
              className="font-black text-xs tracking-tight select-none"
              style={{ color: brand.badgeText || '#004098' }}
            >
              {brand.name.substring(0, 3).toUpperCase()}
            </span>
          )}
        </div>

        {/* Selected Indicator Pill */}
        {isSelected && (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-400 text-slate-950 shadow-sm animate-in fade-in">
            Đang lọc
          </span>
        )}
      </div>

      {/* 2. Middle: Brand Name (Bold White) & Short System Description */}
      <div className="my-1">
        <h3 className="font-extrabold text-sm text-white tracking-tight leading-snug group-hover:text-cyan-300 transition-colors">
          {brand.name}
        </h3>
        <p className="text-[11px] text-slate-400 font-medium line-clamp-1 mt-0.5">
          {brand.tagline}
        </p>
      </div>

      {/* 3. Bottom Row: Number of available codes in Accent Color */}
      <div className="mt-2 pt-2 border-t border-slate-700/60 flex items-center justify-between w-full">
        <span className="text-[10px] font-semibold text-slate-400">
          {brand.popularCodes.slice(0, 2).join(' • ')}
        </span>
        <span className="text-xs font-black text-cyan-400 tracking-wide">
          {brand.totalCodes} mã
        </span>
      </div>
    </button>
  );
};
