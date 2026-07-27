import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QrCode, Copy, Check, Smartphone, ShieldCheck, ExternalLink, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface QRCodeSectionProps {
  language: Language;
}

export const QRCodeSection: React.FC<QRCodeSectionProps> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const [copied, setCopied] = useState(false);
  const [siteUrl, setSiteUrl] = useState<string>('https://masteryacademy.com');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSiteUrl(window.location.href || window.location.origin);
    }
  }, []);

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(siteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="qr-code-section" className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden border border-slate-800">
          
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
                <QrCode className="w-4 h-4 text-emerald-400" />
                <span>Instant Mobile Access</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {t.qrTitle}
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed font-normal max-w-xl mx-auto lg:mx-0">
                {t.qrSubtitle}
              </p>

              {/* Scanning steps */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-left">
                <div className="bg-slate-800/80 border border-slate-700/60 p-3 rounded-xl flex items-start gap-2.5">
                  <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg shrink-0">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-white">1. Open Camera</span>
                    <span className="text-[11px] text-slate-400">Point phone at code</span>
                  </div>
                </div>

                <div className="bg-slate-800/80 border border-slate-700/60 p-3 rounded-xl flex items-start gap-2.5">
                  <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-white">2. Tap Notification</span>
                    <span className="text-[11px] text-slate-400">Open website link</span>
                  </div>
                </div>

                <div className="bg-slate-800/80 border border-slate-700/60 p-3 rounded-xl flex items-start gap-2.5">
                  <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-white">3. Enroll Safely</span>
                    <span className="text-[11px] text-slate-400">100% verified SSL</span>
                  </div>
                </div>
              </div>

              {/* Security Seal */}
              <div className="flex items-center justify-center lg:justify-start gap-2 text-xs text-emerald-400 font-semibold pt-1">
                <ShieldCheck className="w-4 h-4" />
                <span>{t.qrVerifiedBadge}</span>
              </div>
            </div>

            {/* Right Column: QR Code Display Card */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-2xl border-4 border-emerald-500/30 text-slate-900 flex flex-col items-center space-y-4 max-w-xs w-full text-center">
                
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl relative group">
                  <QRCodeSVG
                    value={siteUrl}
                    size={175}
                    level="H"
                    includeMargin={false}
                    aria-label="Website QR Code"
                  />
                  <div className="absolute inset-0 bg-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center pointer-events-none">
                    <span className="bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow">
                      Scan Me
                    </span>
                  </div>
                </div>

                <div className="space-y-1 w-full">
                  <span className="block text-xs font-bold text-slate-800 uppercase tracking-wide">
                    {t.qrScanInstructions}
                  </span>
                  <p className="text-[11px] text-slate-500 truncate max-w-full font-mono bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
                    {siteUrl}
                  </p>
                </div>

                <button
                  onClick={handleCopyLink}
                  className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-xs cursor-pointer active:scale-95"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>{t.qrCopied}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>{t.qrCopyLink}</span>
                    </>
                  )}
                </button>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
