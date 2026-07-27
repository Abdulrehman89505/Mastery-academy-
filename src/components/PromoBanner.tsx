import React from 'react';
import { Sparkles } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface PromoBannerProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onClaimClick: () => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({
  language,
  onLanguageChange,
  onClaimClick,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <div id="promo-banner" className="bg-emerald-600 text-white text-xs sm:text-sm py-2 px-3 sm:px-6 shadow-xs relative z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Left / Center Promotional Text */}
        <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start text-center sm:text-left">
          <span className="inline-flex items-center gap-1 bg-white/20 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            50% OFF
          </span>
          <span className="font-semibold">{t.promoBannerText}</span>
        </div>

        {/* Right CTA & Language Toggle */}
        <div className="flex items-center gap-3">
          <button
            id="promo-claim-btn"
            onClick={onClaimClick}
            className="hidden md:inline-flex items-center gap-1 bg-white text-emerald-800 hover:bg-slate-100 font-bold px-3 py-1 rounded-full transition-transform active:scale-95 text-xs shadow-xs"
          >
            {t.promoClaimBtn}
          </button>

          {/* Quick Header Language Switcher */}
          <div className="flex items-center bg-emerald-700/50 p-0.5 rounded-full border border-white/20">
            <button
              id="promo-lang-en"
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-0.5 rounded-full text-xs font-semibold transition-all ${
                language === 'en'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              English
            </button>
            <button
              id="promo-lang-ur"
              onClick={() => onLanguageChange('ur')}
              className={`px-2 py-0.5 rounded-full text-xs font-semibold transition-all ${
                language === 'ur'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Roman Urdu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
