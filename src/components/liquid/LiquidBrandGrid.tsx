import React, { useState } from 'react';
import type { Brand } from '../../models/Brand';
import { useErrorStore } from '../../store/useErrorStore';
import { triggerHaptic } from '../../utils/haptics';
import { ChevronRight } from 'lucide-react';

interface LiquidBrandCardProps { brand: Brand; onSelect?: (brand: Brand) => void }
export const LiquidBrandCard: React.FC<LiquidBrandCardProps> = ({ brand, onSelect }) => {
  const [imageError, setImageError] = useState(false);
  return <button type="button" onClick={() => { triggerHaptic('medium'); onSelect?.(brand); }} className="brand-card liquid-card group" aria-label={`${brand.name}, ${brand.totalCodes} mã lỗi`}>
    <div className="brand-logo-frame">
      {brand.logo && !imageError ? <img src={brand.logo} alt="" onError={() => setImageError(true)} /> : <span style={{color: brand.badgeText || '#004098'}}>{brand.name}</span>}
    </div>
    <div className="brand-info"><h3>{brand.name}</h3><p>{brand.totalCodes} mã lỗi</p></div>
    <div className="brand-card-footer"><span>Xem mã lỗi</span><ChevronRight size={15} /></div>
  </button>;
};
interface LiquidBrandGridProps { onSelectBrand?: (brand: Brand) => void }
export const LiquidBrandGrid: React.FC<LiquidBrandGridProps> = ({ onSelectBrand }) => {
  const { brands } = useErrorStore();
  return <div className="brand-grid">{brands.map(brand => <LiquidBrandCard key={brand.id} brand={brand} onSelect={onSelectBrand} />)}</div>;
};
