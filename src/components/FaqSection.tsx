import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { FAQS } from '../data/faqs';
import { WHATSAPP_NUMBER, DISPLAY_WHATSAPP_NUMBER } from '../data/courses';

interface FaqSectionProps {
  language: Language;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const [openId, setOpenId] = useState<string | null>('faq-1'); // Default open first FAQ

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <span className="text-emerald-700 text-xs font-bold uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full inline-block">
            FAQS
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            {t.faqTitle}
          </h2>
          <p className="text-base text-slate-600 font-normal">
            {t.faqSubtitle}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden transition-all"
              >
                <button
                  id={`faq-toggle-${faq.id}`}
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-base text-slate-900 hover:text-emerald-600 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                    {faq.question[language]}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed font-normal border-t border-slate-200/80 pt-3 space-y-2 whitespace-pre-line">
                    <p>{faq.answer[language]}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp Help CTA */}
        <div className="mt-10 text-center bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <p className="text-sm text-slate-600 mb-3 font-normal">
            {language === 'en'
              ? 'Have another question not answered here? Speak with admissions directly on WhatsApp!'
              : 'Koi aur sawal poochna chahte hain? Direct WhatsApp par hum se baat karein!'}
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Salam Mastery Academy, I have a question about course enrollment.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-emerald-600 text-white font-bold text-sm px-6 py-2.5 rounded-full shadow-xs uppercase tracking-wide"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp ({DISPLAY_WHATSAPP_NUMBER})</span>
          </a>
        </div>

      </div>
    </section>
  );
};
