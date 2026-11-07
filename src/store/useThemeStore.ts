import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeMode = 'gemini-light' | 'midnight-dark' | 'pure-frost' | 'aurora-cyan';
export type BgGradientType = 'gemini-sky' | 'pure-white' | 'midnight-deep' | 'aurora';

interface ThemeState {
  themeMode: ThemeMode;
  bgGradient: BgGradientType;
  glassContrast: 'high' | 'normal';
  isThemeModalOpen: boolean;
  
  // Actions
  setThemeMode: (mode: ThemeMode) => void;
  setBgGradient: (gradient: BgGradientType) => void;
  setGlassContrast: (contrast: 'high' | 'normal') => void;
  openThemeModal: () => void;
  closeThemeModal: () => void;
  toggleTheme: () => void;
  
  // Computed helpers
  isDarkMode: boolean;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      // Default to the new Gemini Light theme matching user's photo
      themeMode: 'gemini-light',
      bgGradient: 'gemini-sky',
      glassContrast: 'high',
      isThemeModalOpen: false,

      isDarkMode: false,

      setThemeMode: (mode: ThemeMode) => {
        const isDark = mode === 'midnight-dark' || mode === 'aurora-cyan';
        
        if (typeof document !== 'undefined') {
          if (isDark) {
            document.documentElement.classList.add('dark');
            document.documentElement.setAttribute('data-theme', mode);
          } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.setAttribute('data-theme', mode);
          }
        }
        
        let correspondingBg: BgGradientType = 'gemini-sky';
        if (mode === 'gemini-light') correspondingBg = 'gemini-sky';
        else if (mode === 'pure-frost') correspondingBg = 'pure-white';
        else if (mode === 'midnight-dark') correspondingBg = 'midnight-deep';
        else if (mode === 'aurora-cyan') correspondingBg = 'aurora';

        set({ themeMode: mode, isDarkMode: isDark, bgGradient: correspondingBg });
      },

      setBgGradient: (gradient: BgGradientType) => {
        set({ bgGradient: gradient });
      },

      setGlassContrast: (contrast: 'high' | 'normal') => {
        set({ glassContrast: contrast });
      },

      openThemeModal: () => set({ isThemeModalOpen: true }),
      closeThemeModal: () => set({ isThemeModalOpen: false }),

      toggleTheme: () => {
        const current = get().themeMode;
        const next: ThemeMode = (current === 'gemini-light' || current === 'pure-frost') 
          ? 'midnight-dark' 
          : 'gemini-light';
        get().setThemeMode(next);
      },
    }),
    {
      name: 'hvac-theme-settings',
      partialize: (state) => ({
        themeMode: state.themeMode,
        bgGradient: state.bgGradient,
        glassContrast: state.glassContrast,
      }),
    }
  )
);
