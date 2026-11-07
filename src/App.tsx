import { useEffect, useState } from 'react';
import type { Brand } from './models/Brand';
import { LiquidHomeScreen } from './screens/LiquidHomeScreen';
import { LiquidBrandDetailScreen } from './screens/LiquidBrandDetailScreen';
import { LiquidBottomNav, type LiquidTab } from './components/liquid/LiquidBottomNav';
import { LiquidBookmarksScreen } from './screens/LiquidBookmarksScreen';
import { LiquidSensorScreen } from './screens/LiquidSensorScreen';
import { LiquidBottomSheet } from './components/liquid/LiquidBottomSheet';
import { LiquidThemeModal } from './components/liquid/LiquidThemeModal';
import { useThemeStore } from './store/useThemeStore';

export function App() {
  const [activeTab, setActiveTab] = useState<LiquidTab>('home');
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const { themeMode, bgGradient, isDarkMode, setThemeMode } = useThemeStore();

  // Sync dark/light class on document element on mount
  useEffect(() => {
    setThemeMode(themeMode);
  }, []);

  const handleSelectBrand = (brand: Brand) => {
    setSelectedBrand(brand);
  };

  const handleBackToBrands = () => {
    setSelectedBrand(null);
  };

  const handleTabChange = (tab: LiquidTab) => {
    if (tab !== 'home') {
      setSelectedBrand(null);
    }
    setActiveTab(tab);
    if (tab === 'search') {
      window.setTimeout(() => document.querySelector<HTMLInputElement>('#search-section input')?.focus(), 100);
    }
  };

  const renderActiveScreen = () => {
    if (selectedBrand && (activeTab === 'home' || activeTab === 'search')) {
      return (
        <LiquidBrandDetailScreen
          brand={selectedBrand}
          onBack={handleBackToBrands}
        />
      );
    }

    switch (activeTab) {
      case 'sensor':
        return <LiquidSensorScreen />;
      case 'bookmarks':
        return <LiquidBookmarksScreen />;
      case 'search':
      case 'home':
      default:
        return <LiquidHomeScreen onSelectBrand={handleSelectBrand} />;
    }
  };

  // Get background gradient styling
  const getCanvasBackground = () => {
    switch (bgGradient) {
      case 'gemini-sky':
        return 'linear-gradient(180deg, #FFFFFF 0%, #F4F9FF 35%, #E2EEFE 70%, #BFE0FF 100%)';
      case 'pure-white':
        return 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 50%, #EDF2F7 100%)';
      case 'aurora':
        return 'radial-gradient(circle at 50% 0%, #064e3b 0%, #0f172a 50%, #020617 100%)';
      case 'midnight-deep':
      default:
        return 'radial-gradient(circle at 50% 0%, #0d1b33 0%, #080e1d 50%, #030712 100%)';
    }
  };

  return (
    <div
      className={`min-h-screen flex justify-center items-start sm:py-4 transition-colors duration-500 relative overflow-hidden ${
        isDarkMode ? 'text-slate-100 bg-[#050811]' : 'text-slate-900 bg-[#f0f7ff]'
      }`}
      style={{ background: getCanvasBackground() }}
    >
      {/* Dynamic Ambient Liquid Glow Orbs (Behind Glass) */}
      {isDarkMode ? (
        <>
          <div className="fixed top-10 left-1/4 w-80 h-80 bg-cyan-600/25 rounded-full blur-[100px] pointer-events-none animate-liquid-orb-1" />
          <div className="fixed bottom-20 right-1/4 w-96 h-96 bg-blue-700/20 rounded-full blur-[120px] pointer-events-none animate-liquid-orb-2" />
          <div className="fixed top-1/2 left-1/3 w-64 h-64 bg-indigo-500/15 rounded-full blur-[90px] pointer-events-none" />
        </>
      ) : (
        <>
          {/* Gemini Ambient Soft Sky & Warm Glow Orbs */}
          <div className="fixed top-8 left-1/4 w-96 h-96 bg-sky-300/40 rounded-full blur-[90px] pointer-events-none animate-liquid-orb-1" />
          <div className="fixed bottom-12 right-1/4 w-[420px] h-[420px] bg-blue-400/30 rounded-full blur-[110px] pointer-events-none animate-liquid-orb-2" />
          <div className="fixed top-1/3 right-1/3 w-72 h-72 bg-cyan-200/50 rounded-full blur-[80px] pointer-events-none" />
        </>
      )}

      {/* Mobile Smartphone Liquid Frame */}
      <div
        className={`w-full max-w-md h-[100dvh] sm:h-[94vh] sm:rounded-[42px] relative flex flex-col overflow-hidden transition-all duration-300 z-10 ${
          isDarkMode
            ? 'bg-[#080e1c]/80 backdrop-blur-3xl sm:border-[8px] sm:border-slate-800/80 shadow-[0_25px_60px_rgba(0,0,0,0.8)]'
            : 'bg-white/75 backdrop-blur-3xl sm:border-[8px] sm:border-white/80 shadow-[0_25px_60px_rgba(2,132,199,0.14)] ring-1 ring-white/70'
        }`}
      >
        {/* Active Screen Content */}
        <main className="flex-1 overflow-y-auto no-scrollbar">
          {renderActiveScreen()}
        </main>

        {/* Floating Apple Liquid Glass Dock */}
        <LiquidBottomNav
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        {/* Liquid Glass Bottom Sheet Modal */}
        <LiquidBottomSheet />

        {/* Theme Settings Modal */}
        <LiquidThemeModal />
      </div>
    </div>
  );
}

export default App;

