import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, MessageCircle, Users, Award, Star, Zap } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { WHATSAPP_NUMBER, DISPLAY_WHATSAPP_NUMBER } from '../data/courses';

interface HeroProps {
  language: Language;
  onExploreCourses: () => void;
}

export const Hero: React.FC<HeroProps> = ({ language, onExploreCourses }) => {
  const t = TRANSLATIONS[language];

  const defaultWaMsg = language === 'en'
    ? 'Hi Mastery Academy, I want to learn more about enrolling in your courses with 50% OFF. Please guide me.'
    : 'Salam Mastery Academy, mujhe 50% OFF promo ke sath course enrollment ki information chahiye. Kindly guide karein.';

  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(defaultWaMsg)}`;

  return (
    <section id="hero" className="relative bg-slate-950 text-white overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-800">
      {/* Background Hero Banner Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0 opacity-20 bg-cover bg-center pointer-events-none" style={{ backgroundImage: "url('/src/assets/images/hero_banner_1785072721337.jpg')" }} />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/90 to-slate-950 z-0 pointer-events-none" />

      {/* Decorative Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[250px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          
          {/* Top Promotional Badge */}
          <div className="inline-flex items-center gap-2 bg-slate-900/90 border border-cyan-500/30 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-cyan-300 shadow-xl shadow-cyan-950/50 backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Sparkles className="w-4 h-4 text-yellow-400 animate-spin" style={{ animationDuration: '4s' }} />
            <span>{t.heroBadge}</span>
            <span className="bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded-full text-[11px] border border-emerald-500/30">
              50% OFF
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            {t.heroTitlePrefix}{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent underline decoration-cyan-500/30">
              {t.heroTitleHighlight}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
            {t.heroSubtitle}
          </p>

          {/* High-converting Persuasive Callout Line */}
          <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-emerald-950/80 border border-emerald-500/40 rounded-2xl p-4 sm:p-5 max-w-2xl mx-auto shadow-xl text-center">
            <p className="text-xs sm:text-sm font-bold text-emerald-300 leading-relaxed">
              {t.irresistibleHookLine}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              id="hero-cta-explore"
              onClick={onExploreCourses}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-slate-950 font-extrabold text-base px-8 py-4 rounded-2xl transition-all duration-200 shadow-xl shadow-cyan-500/20 active:scale-95 group cursor-pointer"
            >
              <span>{t.heroCtaPrimary}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              id="hero-cta-whatsapp"
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-emerald-400 hover:text-emerald-300 font-bold text-base px-7 py-4 rounded-2xl border border-emerald-500/40 transition-all shadow-lg active:scale-95"
            >
              <MessageCircle className="w-5 h-5 fill-emerald-500/20 text-emerald-400" />
              <span>{t.heroCtaWhatsApp}</span>
            </a>
          </div>

          {/* Guarantee / Trust bar */}
          <div className="pt-1 flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-400 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{t.heroGuaranteed}</span>
          </div>

        </div>

        {/* Social Proof Stats Bar */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="bg-slate-900/80 border border-slate-800 p-4 sm:p-5 rounded-2xl text-center backdrop-blur-md hover:border-cyan-500/30 transition-colors">
            <div className="inline-flex p-2 rounded-xl bg-cyan-500/10 text-cyan-400 mb-2">
              <Users className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">{t.statStudents}</div>
            <div className="text-xs sm:text-sm font-medium text-slate-400 mt-0.5">{t.statStudentsLabel}</div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-4 sm:p-5 rounded-2xl text-center backdrop-blur-md hover:border-emerald-500/30 transition-colors">
            <div className="inline-flex p-2 rounded-xl bg-emerald-500/10 text-emerald-400 mb-2">
              <Award className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">{t.statSuccess}</div>
            <div className="text-xs sm:text-sm font-medium text-slate-400 mt-0.5">{t.statSuccessLabel}</div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-4 sm:p-5 rounded-2xl text-center backdrop-blur-md hover:border-teal-500/30 transition-colors">
            <div className="inline-flex p-2 rounded-xl bg-teal-500/10 text-teal-400 mb-2">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">{t.statMentorship}</div>
            <div className="text-xs sm:text-sm font-medium text-slate-400 mt-0.5">{t.statMentorshipLabel}</div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-4 sm:p-5 rounded-2xl text-center backdrop-blur-md hover:border-yellow-500/30 transition-colors">
            <div className="inline-flex p-2 rounded-xl bg-yellow-500/10 text-yellow-400 mb-2">
              <Zap className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-yellow-400">{t.statDiscount}</div>
            <div className="text-xs sm:text-sm font-medium text-slate-400 mt-0.5">{t.statDiscountLabel}</div>
          </div>
        </div>

      </div>
    </section>
  );
};
