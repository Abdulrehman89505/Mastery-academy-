import React, { useState } from 'react';
import { GraduationCap, Globe, DollarSign, Menu, X, ArrowRight, MessageCircle } from 'lucide-react';
import { Language, Currency } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { CURRENCY_RATES, DISPLAY_WHATSAPP_NUMBER, WHATSAPP_NUMBER } from '../data/courses';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  currency: Currency;
  onCurrencyChange: (curr: Currency) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  currency,
  onCurrencyChange,
  onNavigateSection,
}) => {
  const t = TRANSLATIONS[language];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (id: string) => {
    onNavigateSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          id="navbar-brand-logo"
          onClick={() => handleLinkClick('hero')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-teal-500 to-emerald-400 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent">
              Mastery Academy
            </span>
            <span className="block text-[10px] uppercase font-bold tracking-widest text-cyan-400">
              {language === 'en' ? 'E-Commerce & AI School' : 'Digital Learning Hub'}
            </span>
          </div>
        </div>

        {/* Desktop Quick Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            id="nav-link-home"
            onClick={() => handleLinkClick('hero')}
            className="hover:text-cyan-400 transition-colors"
          >
            {t.navHome}
          </button>
          <button
            id="nav-link-courses"
            onClick={() => handleLinkClick('courses')}
            className="hover:text-cyan-400 transition-colors"
          >
            {t.navCourses}
          </button>
          <button
            id="nav-link-features"
            onClick={() => handleLinkClick('why-us')}
            className="hover:text-cyan-400 transition-colors"
          >
            {t.navFeatures}
          </button>
          <button
            id="nav-link-faq"
            onClick={() => handleLinkClick('faq')}
            className="hover:text-cyan-400 transition-colors"
          >
            {t.navFaq}
          </button>
          <button
            id="nav-link-contact"
            onClick={() => handleLinkClick('contact')}
            className="hover:text-cyan-400 transition-colors"
          >
            {t.navContact}
          </button>
        </nav>

        {/* Header Right Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Language Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-800/80 p-1 rounded-lg border border-slate-700">
            <Globe className="w-4 h-4 text-cyan-400 ml-1.5" />
            <button
              id="lang-btn-en"
              onClick={() => onLanguageChange('en')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                language === 'en'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              EN
            </button>
            <button
              id="lang-btn-ur"
              onClick={() => onLanguageChange('ur')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                language === 'ur'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Roman Urdu
            </button>
          </div>

          {/* Currency Selector */}
          <div className="flex items-center gap-1 bg-slate-800/80 px-2 py-1 rounded-lg border border-slate-700">
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            <select
              id="currency-selector"
              value={currency}
              onChange={(e) => onCurrencyChange(e.target.value as Currency)}
              className="bg-transparent text-xs font-bold text-slate-200 focus:outline-none cursor-pointer"
            >
              {Object.keys(CURRENCY_RATES).map((currKey) => (
                <option key={currKey} value={currKey} className="bg-slate-900 text-white">
                  {currKey} ({CURRENCY_RATES[currKey as Currency].symbol.trim()})
                </option>
              ))}
            </select>
          </div>

          {/* Enroll Button */}
          <button
            id="nav-enroll-cta"
            onClick={() => handleLinkClick('courses')}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-slate-950 font-bold px-4 py-2 rounded-xl transition-all shadow-lg shadow-cyan-500/15 active:scale-95 text-sm"
          >
            {t.enrollBtn}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Quick Language Toggle */}
          <button
            id="mobile-lang-toggle"
            onClick={() => onLanguageChange(language === 'en' ? 'ur' : 'en')}
            className="flex items-center gap-1 bg-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-700 text-xs font-bold text-cyan-400"
          >
            <Globe className="w-3.5 h-3.5" />
            {language === 'en' ? 'Roman Urdu' : 'English'}
          </button>

          {/* Hamburger Menu Toggle */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-menu-drawer" className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800">
            {/* Language Selection */}
            <div>
              <span className="block text-[11px] font-semibold text-slate-400 mb-1">{t.langToggleLabel}:</span>
              <div className="flex rounded-lg overflow-hidden border border-slate-700">
                <button
                  onClick={() => onLanguageChange('en')}
                  className={`flex-1 py-1.5 text-xs font-bold ${
                    language === 'en' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-900 text-slate-300'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => onLanguageChange('ur')}
                  className={`flex-1 py-1.5 text-xs font-bold ${
                    language === 'ur' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-900 text-slate-300'
                  }`}
                >
                  Roman Urdu
                </button>
              </div>
            </div>

            {/* Currency Selection */}
            <div>
              <span className="block text-[11px] font-semibold text-slate-400 mb-1">{t.currencyLabel}:</span>
              <select
                value={currency}
                onChange={(e) => onCurrencyChange(e.target.value as Currency)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg py-1.5 px-2 text-xs font-bold text-slate-200"
              >
                {Object.keys(CURRENCY_RATES).map((currKey) => (
                  <option key={currKey} value={currKey}>
                    {currKey} ({CURRENCY_RATES[currKey as Currency].symbol.trim()})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-3 font-medium text-slate-300 text-base pt-1">
            <button
              onClick={() => handleLinkClick('hero')}
              className="text-left py-1 hover:text-cyan-400"
            >
              {t.navHome}
            </button>
            <button
              onClick={() => handleLinkClick('courses')}
              className="text-left py-1 hover:text-cyan-400"
            >
              {t.navCourses}
            </button>
            <button
              onClick={() => handleLinkClick('why-us')}
              className="text-left py-1 hover:text-cyan-400"
            >
              {t.navFeatures}
            </button>
            <button
              onClick={() => handleLinkClick('faq')}
              className="text-left py-1 hover:text-cyan-400"
            >
              {t.navFaq}
            </button>
            <button
              onClick={() => handleLinkClick('contact')}
              className="text-left py-1 hover:text-cyan-400"
            >
              {t.navContact}
            </button>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => handleLinkClick('courses')}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-emerald-400 text-slate-950 font-bold py-2.5 rounded-xl text-center shadow"
            >
              {t.enrollBtn} (50% OFF)
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi Mastery Academy, I need details about course enrollment.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-center shadow"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Direct Chat ({DISPLAY_WHATSAPP_NUMBER})
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
