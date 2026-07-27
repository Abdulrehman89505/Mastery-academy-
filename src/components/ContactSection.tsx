import React from 'react';
import { MessageCircle, Phone, Clock } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { WHATSAPP_NUMBER, DISPLAY_WHATSAPP_NUMBER } from '../data/courses';

interface ContactSectionProps {
  language: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ language }) => {
  const t = TRANSLATIONS[language];

  const defaultWaMsg = language === 'en'
    ? 'Hi Mastery Academy, I am interested in enrolling in a course. Please guide me with details.'
    : 'Salam Mastery Academy, mujhe course enrollment ki information chahiye. Kindly guide karein.';

  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(defaultWaMsg)}`;

  return (
    <section id="contact" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-emerald-700 text-xs font-bold uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full inline-block">
            ADMISSIONS & SUPPORT
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            {t.contactTitle}
          </h2>
          <p className="text-base text-slate-600 font-normal">
            {t.contactSubtitle}
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          {/* Direct WhatsApp & Info Card */}
          <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-xs space-y-6 text-center">
            <div className="space-y-2">
              <span className="text-emerald-700 font-bold text-xs uppercase tracking-wider block">
                FASTEST RESPONSE
              </span>
              <h3 className="text-2xl font-bold text-slate-900 flex items-center justify-center gap-2">
                <MessageCircle className="w-6 h-6 text-emerald-600" />
                {t.contactWhatsAppTitle}
              </h3>
              <p className="text-sm text-slate-600 font-normal leading-relaxed max-w-lg mx-auto">
                {t.contactWhatsAppDesc}
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs text-slate-600 max-w-md mx-auto text-left">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Line: {DISPLAY_WHATSAPP_NUMBER}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <Clock className="w-4 h-4 text-amber-500" />
                <span>Available 24/7 for Student Inquiries & Payment Verification</span>
              </div>
            </div>

            <a
              id="contact-whatsapp-direct-btn"
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-emerald-600 text-white font-bold text-base px-8 py-3.5 rounded-full shadow-xs transition-all active:scale-95 uppercase tracking-wide"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>{t.contactWhatsAppBtn}</span>
            </a>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs text-xs text-slate-500 text-center space-y-1">
            <span className="font-bold text-slate-800 block">Mastery Academy Global Support</span>
            <span className="block">Official Enrollment Helpline: +92 3378204856</span>
          </div>
        </div>

      </div>
    </section>
  );
};
