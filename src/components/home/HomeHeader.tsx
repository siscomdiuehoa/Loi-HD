import React from 'react';
import { WifiOff } from 'lucide-react';

export const HomeHeader: React.FC = () => {
  return (
    <header className="sticky top-0 z-30 w-full bg-slate-900/80 backdrop-blur-md border-b border-white/10 px-4 py-3 select-none">
      <div className="flex items-center justify-between max-w-md mx-auto">
        {/* Left: App Title with App Logo */}
        <div className="flex items-center space-x-2.5">
          <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center p-1 shadow-md shadow-cyan-500/20 overflow-hidden">
            <img
              src="/logos/logo-app.png"
              alt="Logo App"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h1 className="text-sm font-black text-white tracking-wide leading-none">
              Tra mã lỗi điều hòa
            </h1>
            <p className="text-[10.5px] text-cyan-300 font-bold tracking-wide mt-0.5">
              Nhanh chóng - chính Xác
            </p>
          </div>
        </div>

        {/* Right: Status Badge (Green text on dark green background) */}
        <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-[#064E3B]/90 border border-emerald-700/60 shadow-sm">
          <WifiOff className="w-3 h-3 text-emerald-400 stroke-[2.5]" />
          <span className="text-[11px] font-extrabold text-emerald-400 tracking-wide uppercase">
            Offline
          </span>
        </div>
      </div>
    </header>
  );
};
