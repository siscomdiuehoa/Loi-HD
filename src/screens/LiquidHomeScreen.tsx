import React from 'react';
import type { Brand } from '../models/Brand';
import { LiquidHeader } from '../components/liquid/LiquidHeader';
import { LiquidSearchBar } from '../components/liquid/LiquidSearchBar';
import { LiquidBrandGrid } from '../components/liquid/LiquidBrandGrid';
import { LiquidErrorCard } from '../components/liquid/LiquidErrorCard';
import { useErrorStore } from '../store/useErrorStore';
import { Search } from 'lucide-react';

interface Props { onSelectBrand?: (brand: Brand) => void }
export const LiquidHomeScreen: React.FC<Props> = ({ onSelectBrand }) => {
  const { brands, searchResults, searchQuery, clearSearch } = useErrorStore();
  return <div className="min-h-full">
    <LiquidHeader />
    <div className="px-5 pb-10 space-y-7 max-w-md mx-auto w-full">
      <section className="space-y-3" id="search-section">
        <div><p className="section-kicker">TÌM KIẾM NHANH</p><h2 className="section-title">Bạn đang gặp lỗi gì?</h2></div>
        <LiquidSearchBar />
      </section>
      {searchQuery ? <section className="space-y-3" aria-live="polite">
        <div className="section-heading"><div><p className="section-kicker">TRA CỨU</p><h2 className="section-title">Kết quả tìm kiếm</h2></div><span className="count-pill">{searchResults.length} kết quả</span></div>
        {searchResults.length ? searchResults.map(error => <LiquidErrorCard key={error.id} error={error} />) : <div className="liquid-card rounded-3xl p-8 text-center"><Search className="mx-auto mb-3 text-sky-500" /><p className="font-bold">Chưa tìm thấy mã lỗi</p><p className="text-sm text-slate-500 mt-1">Thử một mã hoặc từ khóa khác.</p><button className="mt-4 text-sm font-bold text-sky-600" onClick={clearSearch}>Xóa tìm kiếm</button></div>}
      </section> : <>
        <section className="space-y-3"><div className="section-heading"><div><p className="section-kicker">DANH MỤC</p><h2 className="section-title">Chọn hãng điều hòa</h2></div><span className="count-pill">{brands.length} hãng</span></div><LiquidBrandGrid onSelectBrand={onSelectBrand} /></section>
        <section className="space-y-3"><div><p className="section-kicker">THAM KHẢO NHANH</p><h2 className="section-title">Mã lỗi thường gặp</h2></div>{searchResults.slice(0, 5).map(error => <LiquidErrorCard key={error.id} error={error} />)}</section>
        <p className="text-center text-xs text-slate-500 pb-3">Được phát triển bởi SISCOM</p>
      </>}
    </div>
  </div>;
};
