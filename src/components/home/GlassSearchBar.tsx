import React, { useRef, useState } from 'react';
import { Search, X, Mic, MicOff, Sparkles } from 'lucide-react';
import { useErrorStore } from '../../store/useErrorStore';
import { triggerHaptic } from '../../utils/haptics';

interface SuggestedTag {
  label: string;
  query: string;
}

export const GlassSearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery, clearSearch } = useErrorStore();
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestedTags: SuggestedTag[] = [
    { label: 'H11 (Pana)', query: 'H11' },
    { label: 'E1 (Midea)', query: 'E1' },
    { label: 'E01 (Mitsu)', query: 'E01' },
    { label: 'U4 (Daikin)', query: 'U4' },
    { label: 'CH05 (LG)', query: 'CH05' },
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
    <div className="w-full space-y-2.5">
      {/* 1. Glassmorphism Floating Search Bar */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 via-sky-500/10 to-amber-500/20 rounded-2xl blur-sm opacity-50 group-focus-within:opacity-100 transition duration-300 pointer-events-none" />

        <div className="relative flex items-center bg-slate-800/80 backdrop-blur-md border border-white/10 rounded-2xl px-3.5 py-3 shadow-[0_8px_20px_rgba(0,0,0,0.3)] transition-all focus-within:border-cyan-400 focus-within:ring-1 focus-within:ring-cyan-400/40">
          <Search className="w-5 h-5 text-cyan-400 mr-2.5 flex-shrink-0" />

          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Nhập mã lỗi hoặc thương hiệu..."
            className="w-full bg-transparent text-white placeholder-slate-400 font-medium text-sm focus:outline-none tracking-wide"
          />

          {/* Right Action Icons */}
          <div className="flex items-center space-x-1 flex-shrink-0 ml-1">
            {searchQuery ? (
              <button
                type="button"
                onClick={() => {
                  triggerHaptic('light');
                  clearSearch();
                  inputRef.current?.focus();
                }}
                aria-label="Xóa tìm kiếm"
                className="p-1.5 rounded-full text-slate-400 hover:text-white bg-slate-700/60 hover:bg-slate-700 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleVoiceSearchToggle}
                title="Tìm kiếm bằng giọng nói"
                aria-label="Tìm bằng giọng nói"
                className={`p-1.5 rounded-xl transition-all ${
                  isListening
                    ? 'bg-rose-500 text-white animate-pulse'
                    : 'text-slate-400 hover:text-cyan-400 bg-slate-700/40 hover:bg-slate-700/80'
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

      {/* 2. Suggested Tags (Horizontal Scroll) */}
      <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-0.5 text-xs select-none">
        <div className="flex items-center text-slate-400 font-bold whitespace-nowrap text-[11px] mr-1">
          <Sparkles className="w-3 h-3 text-cyan-400 mr-1 flex-shrink-0" />
          Gợi ý:
        </div>
        {suggestedTags.map((tag) => {
          const isActive = searchQuery.toLowerCase() === tag.query.toLowerCase();
          return (
            <button
              key={tag.query}
              type="button"
              onClick={() => handleTagClick(tag.query)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95 border ${
                isActive
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                  : 'bg-slate-800/90 hover:bg-slate-800 text-slate-300 border-slate-700/80 hover:border-slate-600 shadow-sm'
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
