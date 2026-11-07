import React, { useRef, useState } from 'react';
import { Search, X, Mic, MicOff } from 'lucide-react';
import { useErrorStore } from '../../store/useErrorStore';
import { triggerHaptic } from '../../utils/haptics';

interface SuggestedTag {
  label: string;
  query: string;
}

export const LiquidSearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery, clearSearch } = useErrorStore();
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestedTags: SuggestedTag[] = [
    { label: 'E1 (Gree / Midea)', query: 'E1' },
    { label: 'H6 (Gree Quạt)', query: 'H6' },
    { label: 'H11 (Pana)', query: 'H11' },
    { label: 'E01 (Mitsu)', query: 'E01' },
    { label: 'U4 (Daikin)', query: 'U4' },
    { label: 'CH05 (LG)', query: 'CH05' },
    { label: 'C0 (Gree VRF)', query: 'C0' },
    { label: 'EC (Midea Gas)', query: 'EC' },
    { label: 'F95 (Quá nhiệt)', query: 'F95' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleTagClick = (tagQuery: string) => {
    triggerHaptic('light');
    if (searchQuery.toLowerCase() === tagQuery.toLowerCase()) {
      clearSearch();
    } else {
      setSearchQuery(tagQuery);
      inputRef.current?.focus();
    }
  };

  const handleVoiceSearchToggle = () => {
    triggerHaptic('medium');
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      try {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'vi-VN';
        recognition.interimResults = false;

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onerror = () => setIsListening(false);
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          if (transcript) {
            setSearchQuery(transcript);
          }
          setIsListening(false);
        };
        recognition.start();
      } catch {
        setIsListening(false);
      }
    } else {
      setIsListening((prev) => !prev);
      setTimeout(() => setIsListening(false), 2000);
    }
  };

  return (
    <div className="w-full space-y-3">
      {/* 1. Floating Liquid Glass Capsule Search Input (Gemini pill style) */}
      <div className="relative group">
        {/* Optical Ambient Refraction Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-sky-400/30 via-blue-500/20 to-cyan-400/30 rounded-3xl blur-md opacity-30 group-focus-within:opacity-80 transition duration-500 pointer-events-none" />

        <div className="relative flex items-center liquid-glass rounded-full sm:rounded-3xl px-4 py-3.5 shadow-xl transition-all duration-300 focus-within:border-sky-500/60 focus-within:shadow-[0_0_30px_rgba(2,132,199,0.2)]">
          <Search className="w-5 h-5 text-sky-600 dark:text-cyan-400 mr-3 flex-shrink-0" />

          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Tìm kiếm mã lỗi, triệu chứng, linh kiện..."
            className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 font-semibold text-sm focus:outline-none tracking-wide"
          />

          {/* Action Icons */}
          <div className="flex items-center space-x-1.5 flex-shrink-0 ml-1">
            {searchQuery ? (
              <button
                type="button"
                onClick={() => {
                  triggerHaptic('light');
                  clearSearch();
                  inputRef.current?.focus();
                }}
                aria-label="Xóa tìm kiếm"
                className="p-1.5 rounded-full bg-slate-200/80 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-700 dark:text-slate-300 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleVoiceSearchToggle}
                title="Tìm kiếm bằng giọng nói"
                aria-label="Tìm bằng giọng nói"
                className={`p-2 rounded-2xl transition-all ${
                  isListening
                    ? 'bg-rose-500 text-white animate-pulse shadow-[0_0_15px_rgba(244,63,94,0.6)]'
                    : 'liquid-pill text-sky-600 dark:text-cyan-300 hover:text-sky-700 dark:hover:text-white'
                }`}
              >
                {isListening ? (
                  <MicOff className="w-4 h-4" />
                ) : (
                  <Mic className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Liquid Glass Pill Tags (Horizontal Scroll) */}
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1 select-none">
        <div className="flex items-center text-sky-700 dark:text-cyan-300 font-black whitespace-nowrap text-xs mr-0.5">
          Gợi ý:
        </div>
        {suggestedTags.map((tag) => {
          const isActive = searchQuery.toLowerCase() === tag.query.toLowerCase();
          return (
            <button
              key={tag.query}
              type="button"
              onClick={() => handleTagClick(tag.query)}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-2xl text-xs font-bold transition-all active:scale-90 ${
                isActive
                  ? 'liquid-pill-active'
                  : 'liquid-pill text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tag.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
