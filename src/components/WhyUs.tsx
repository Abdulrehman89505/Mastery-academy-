import React from 'react';
import { BookOpen, MessageCircle, Cpu, Award, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface WhyUsProps {
  language: Language;
}

export const WhyUs: React.FC<WhyUsProps> = ({ language }) => {
  const t = TRANSLATIONS[language];

  const features = [
    {
      icon: <BookOpen className="w-6 h-6 text-emerald-600" />,
      title: t.why1Title,
      desc: t.why1Desc,
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-emerald-600" />,
      title: t.why2Title,
      desc: t.why2Desc,
    },
    {
      icon: <Cpu className="w-6 h-6 text-emerald-600" />,
      title: t.why3Title,
      desc: t.why3Desc,
    },
    {
      icon: <Award className="w-6 h-6 text-emerald-600" />,
      title: t.why4Title,
      desc: t.why4Desc,
    },
  ];

  return (
    <section id="why-us" className="py-16 lg:py-24 bg-white border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-emerald-700 text-xs font-bold uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full inline-block">
            {language === 'en' ? 'OUR LEARNING ADVANTAGE' : 'KASOOSIYAT'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            {t.whyTitle}
          </h2>
          <p className="text-base text-slate-600 font-normal">
            {t.whySubtitle}
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:bg-white hover:shadow-md transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{language === 'en' ? 'Included in all courses' : 'Shamil hai'}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
