import { create } from 'zustand';
import type { Brand } from '../models/Brand';
import type { ErrorCode } from '../models/ErrorCode';
import { errorService } from '../services/errorService';
import { searchService } from '../services/searchService';
import { triggerHaptic } from '../utils/haptics';

interface ErrorStoreState {
  brands: Brand[];
  selectedBrandId: string | 'all';
  searchQuery: string;
  searchResults: ErrorCode[];
  selectedError: ErrorCode | null;
  bookmarkedIds: string[];
  recentSearches: string[];

  // Actions
  setSearchQuery: (query: string) => void;
  setSelectedBrand: (brandId: string | 'all') => void;
  selectError: (error: ErrorCode | null) => void;
  toggleBookmark: (errorId: string) => void;
  clearSearch: () => void;
  performSearch: () => void;
}

export const useErrorStore = create<ErrorStoreState>((set, get) => {
  const initialBrands = errorService.getBrands();
  const initialErrors = errorService.getAllErrors();

  // Load saved bookmarks from localStorage if available
  let savedBookmarks: string[] = [];
  try {
    const raw = localStorage.getItem('hvac_bookmarks');
    if (raw) savedBookmarks = JSON.parse(raw);
  } catch {}

  return {
    brands: initialBrands,
    selectedBrandId: 'all',
    searchQuery: '',
    searchResults: initialErrors,
    selectedError: null,
    bookmarkedIds: savedBookmarks,
    recentSearches: ['H11', 'F95', 'U4', 'mất giao tiếp', 'áp suất cao'],

    setSearchQuery: (query: string) => {
      const { selectedBrandId } = get();
      const results = searchService.search(query, selectedBrandId);
      set({ searchQuery: query, searchResults: results });
    },

    setSelectedBrand: (brandId: string | 'all') => {
      triggerHaptic('light');
      const { searchQuery } = get();
      const results = searchService.search(searchQuery, brandId);
      set({ selectedBrandId: brandId, searchResults: results });
    },

    selectError: (error: ErrorCode | null) => {
      triggerHaptic('medium');
      set({ selectedError: error });
    },

    toggleBookmark: (errorId: string) => {
      triggerHaptic('light');
      set((state) => {
        const isBookmarked = state.bookmarkedIds.includes(errorId);
        const updated = isBookmarked
          ? state.bookmarkedIds.filter((id) => id !== errorId)
          : [...state.bookmarkedIds, errorId];

        try {
          localStorage.setItem('hvac_bookmarks', JSON.stringify(updated));
        } catch {}

        return { bookmarkedIds: updated };
      });
    },

    clearSearch: () => {
      triggerHaptic('light');
      const { selectedBrandId } = get();
      const results = searchService.search('', selectedBrandId);
      set({ searchQuery: '', searchResults: results });
    },

    performSearch: () => {
      const { searchQuery, selectedBrandId } = get();
      const results = searchService.search(searchQuery, selectedBrandId);
      set({ searchResults: results });
    },
  };
});
