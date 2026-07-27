import React from 'react';
import { Star, Quote, MapPin, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { TESTIMONIALS } from '../data/testimonials';

interface TestimonialsProps {
  language: Language;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ language }) => {
  return (
    <section id="reviews" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-emerald-700 text-xs font-bold uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full inline-block">
            {language === 'en' ? 'STUDENT SUCCESS STORIES' : 'STUDENTS KI KAMYABI'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            {language === 'en' ? 'Real Results from Real Students' : 'Hamare Students Ki Kamyabi'}
          </h2>
          <p className="text-base text-slate-600 font-normal">
            {language === 'en'
              ? 'See how our step-by-step practical courses helped students launch profitable Amazon FBA accounts, Shopify stores, and AI freelancing services.'
              : 'Dekhein hamare students ne kis tarah Amazon Wholesale, Shopify aur AI Agents se earning start ki.'}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md relative flex flex-col justify-between hover:border-emerald-500 transition-all"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-slate-200" />

              <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-sm text-slate-600 leading-relaxed font-normal italic">
                  "{t.content[language]}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  referrerPolicy="no-referrer"
                  className="w-11 h-11 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold text-slate-900">{t.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <span className="text-xs text-emerald-700 font-semibold block">
                    {t.courseTitle[language]}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{t.location}</span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
