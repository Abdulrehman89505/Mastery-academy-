import React from 'react';
import { GraduationCap, MessageCircle, ShieldCheck, Heart } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { WHATSAPP_NUMBER, DISPLAY_WHATSAPP_NUMBER } from '../data/courses';

interface FooterProps {
  language: Language;
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onNavigateSection }) => {
  const t = TRANSLATIONS[language];

  return (
    <footer className="bg-white text-slate-600 text-xs sm:text-sm border-t border-slate-200 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold shadow-xs">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">
                Mastery Academy
              </span>
            </div>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-md font-normal">
              {t.footerDesc}
            </p>

            <div className="flex items-center gap-2 text-emerald-700 font-semibold text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{t.footerTrustText}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">
              {t.footerQuickLinks}
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li>
                <button onClick={() => onNavigateSection('hero')} className="hover:text-emerald-600 transition-colors">
                  {t.navHome}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('courses')} className="hover:text-emerald-600 transition-colors">
                  {t.navCourses}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('why-us')} className="hover:text-emerald-600 transition-colors">
                  {t.navFeatures}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('reviews')} className="hover:text-emerald-600 transition-colors">
                  {t.navReviews}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('faq')} className="hover:text-emerald-600 transition-colors">
                  {t.navFaq}
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">
              {language === 'en' ? 'Direct Enrollment' : 'Direct Support'}
            </h4>
            <p className="text-xs text-slate-500">
              {language === 'en'
                ? 'Chat directly with admissions for payment or syllabus questions:'
                : 'WhatsApp par admission guidance hasil karein:'}
            </p>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi Mastery Academy, I need assistance with enrollment.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-emerald-600 text-white font-bold text-xs px-4 py-2.5 rounded-full transition-all shadow-xs uppercase tracking-wide"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp: {DISPLAY_WHATSAPP_NUMBER}</span>
            </a>
          </div>

        </div>

        {/* Bottom Bar & Copyright */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>{t.footerCopyright}</div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Designed for global e-commerce & AI mastery</span>
            <Heart className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
          </div>
        </div>

      </div>
    </footer>
  );
};
