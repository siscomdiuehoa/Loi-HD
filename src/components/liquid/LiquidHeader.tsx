import React from 'react';
import { Settings } from 'lucide-react';

export const LiquidHeader: React.FC<{ onSettings?: () => void }> = ({ onSettings }) => (
  <header className="sticky top-0 z-30 w-full px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-2 select-none">
    <div className="liquid-glass rounded-3xl px-4 py-2.5 flex items-center justify-between">
      <div className="flex items-center gap-2.5 min-w-0"><img src="/app-icon-concept.png" alt="" className="header-app-icon"/><div className="min-w-0"><h1 className="text-sm font-black tracking-tight text-slate-900 dark:text-white">Tra mã lỗi điều hòa</h1><p className="text-[10.5px] font-bold text-sky-700 dark:text-cyan-300">Nhanh chóng - chính xác</p></div></div>
      <button type="button" onClick={onSettings} aria-label="Cài đặt" className="p-2.5 rounded-2xl liquid-pill text-slate-700 dark:text-slate-200"><Settings className="w-5 h-5"/></button>
    </div>
  </header>
);
