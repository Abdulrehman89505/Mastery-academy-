import React, { useState, useEffect } from 'react';
import { Sparkles, Gift, X, CheckCircle2, MessageCircle, Trophy, Zap, Percent, RotateCw } from 'lucide-react';
import { WHATSAPP_NUMBER, DISPLAY_WHATSAPP_NUMBER } from '../data/courses';
import { Language } from '../types';

interface SpinWheelModalProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  onSpinWin?: (discountPercent: number) => void;
}

export interface WheelSlice {
  id: number;
  label: string;
  discount: number;
  bg: string;
  text: string;
}

// 6 Slices in the wheel
export const WHEEL_SLICES: WheelSlice[] = [
  { id: 0, label: '5% EXTRA OFF', discount: 5, bg: '#10B981', text: '#FFFFFF' },   // Emerald
  { id: 1, label: '7% EXTRA OFF', discount: 7, bg: '#06B6D4', text: '#FFFFFF' },   // Cyan
  { id: 2, label: '10% EXTRA OFF', discount: 10, bg: '#F59E0B', text: '#FFFFFF' }, // Amber
  { id: 3, label: 'No Discount', discount: 0, bg: '#475569', text: '#FFFFFF' },    // Slate (NEVER LANDED)
  { id: 4, label: '5% EXTRA OFF', discount: 5, bg: '#8B5CF6', text: '#FFFFFF' },   // Purple
  { id: 5, label: '10% EXTRA OFF', discount: 10, bg: '#EC4899', text: '#FFFFFF' }, // Pink
];

// Array of slice indices that are GUARANTEED wins (NEVER index 3)
const WINNING_INDICES = [0, 1, 2, 4, 5];

export const SpinWheelModal: React.FC<SpinWheelModalProps> = ({
  isOpen,
  onClose,
  onSpinWin,
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const [wonDiscount, setWonDiscount] = useState<number | null>(null);
  const [rotationAngle, setRotationAngle] = useState(0);

  // Check existing saved spin state on mount
  useEffect(() => {
    const saved = localStorage.getItem('mastery_spin_discount');
    if (saved) {
      const discountVal = parseInt(saved, 10);
      setHasSpun(true);
      setWonDiscount(isNaN(discountVal) ? 10 : discountVal);
    }
  }, []);

  if (!isOpen) return null;

  // Spin Logic
  const handleSpin = () => {
    if (isSpinning || hasSpun) return;

    setIsSpinning(true);

    // Pick a random winning slice index (NEVER lands on No Discount index 3)
    const randomWinIdx = WINNING_INDICES[Math.floor(Math.random() * WINNING_INDICES.length)];
    const winningSlice = WHEEL_SLICES[randomWinIdx];

    // Each slice occupies 60 degrees (360 / 6)
    // Center of slice `randomWinIdx` is `randomWinIdx * 60 + 30` degrees
    const sliceCenterAngle = randomWinIdx * 60 + 30;

    // To bring sliceCenterAngle to the TOP needle pointer (0 degrees),
    // we rotate 5 full spins (1800 deg) + (360 - sliceCenterAngle)
    const targetSpinAngle = 1800 + (360 - sliceCenterAngle);

    setRotationAngle(targetSpinAngle);

    // Complete spin after 4 seconds matching the CSS transition
    setTimeout(() => {
      setIsSpinning(false);
      setHasSpun(true);
      setWonDiscount(winningSlice.discount);
      localStorage.setItem('mastery_spin_discount', winningSlice.discount.toString());

      if (onSpinWin) {
        onSpinWin(winningSlice.discount);
      }
    }, 4000);
  };

  // Pre-calculated course prices with extra discount for WhatsApp
  const discountRate = (wonDiscount || 10) / 100;
  const amazonFbaFinal = Math.round(2000 * (1 - discountRate));
  const shopifyFinal = Math.round(1700 * (1 - discountRate));
  const webdevAiFinal = Math.round(1500 * (1 - discountRate));

  const whatsappMessage = encodeURIComponent(
    `Salam Mastery Academy! Maine Lucky Spin Wheel se ${wonDiscount || 10}% EXTRA DISCOUNT jeeta hai! 🎉\n\n` +
    `Enrollment Final Prices:\n` +
    `• Amazon FBA Wholesale: PKR ${amazonFbaFinal} (Original PKR 2,000)\n` +
    `• Shopify Online Store: PKR ${shopifyFinal} (Original PKR 1,700)\n` +
    `• Web Dev & AI Agents: PKR ${webdevAiFinal} (Original PKR 1,500)\n\n` +
    `Mujhe is extra discount ke sath course mein enroll karadein.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden my-auto text-white">
        
        {/* Decorative Top Glow Bar */}
        <div className="h-2 bg-gradient-to-r from-emerald-500 via-amber-400 to-cyan-500 w-full" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close Spin Wheel"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-5 sm:p-7 text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Mastery Academy Lucky Spin</span>
          </div>

          {/* Required Top Banner Message */}
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-3.5 mb-5 shadow-inner">
            <p className="text-xs sm:text-sm text-slate-200 font-semibold leading-relaxed">
              &quot;Humari website par aapko har course par 50% off mil raha hai, lekin aap spin karke mazeed discount le sakte hain!&quot;
            </p>
          </div>

          {!hasSpun ? (
            /* Spin Wheel Container */
            <div className="relative flex flex-col items-center justify-center my-2">
              
              {/* Wheel Pointer Ticker Needle at Top Center */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
                <div className="w-6 h-7 bg-gradient-to-b from-amber-400 to-amber-600 clip-triangle shadow-lg drop-shadow-[0_4px_8px_rgba(245,158,11,0.6)] animate-pulse" 
                     style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }} />
              </div>

              {/* SVG Wheel Visual */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 p-2 rounded-full bg-slate-950 border-4 border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.25)] flex items-center justify-center overflow-hidden">
                <div
                  className="w-full h-full rounded-full transition-transform duration-[4000ms] ease-[cubic-bezier(0.15,0.85,0.2,1)]"
                  style={{ transform: `rotate(${rotationAngle}deg)` }}
                >
                  <svg viewBox="0 0 300 300" className="w-full h-full">
                    {WHEEL_SLICES.map((slice, i) => {
                      const startAngle = (i * 60 - 90) * (Math.PI / 180);
                      const endAngle = ((i + 1) * 60 - 90) * (Math.PI / 180);

                      const x1 = 150 + 140 * Math.cos(startAngle);
                      const y1 = 150 + 140 * Math.sin(startAngle);
                      const x2 = 150 + 140 * Math.cos(endAngle);
                      const y2 = 150 + 140 * Math.sin(endAngle);

                      // Text Placement Angle & Coordinates
                      const midAngleDeg = i * 60 + 30;
                      const midAngleRad = (midAngleDeg - 90) * (Math.PI / 180);
                      const textX = 150 + 85 * Math.cos(midAngleRad);
                      const textY = 150 + 85 * Math.sin(midAngleRad);

                      return (
                        <g key={slice.id}>
                          {/* Sector Path */}
                          <path
                            d={`M 150 150 L ${x1} ${y1} A 140 140 0 0 1 ${x2} ${y2} Z`}
                            fill={slice.bg}
                            stroke="#0F172A"
                            strokeWidth="2"
                          />
                          {/* Sector Text */}
                          <text
                            x={textX}
                            y={textY}
                            fill={slice.text}
                            fontSize="11"
                            fontWeight="bold"
                            textAnchor="middle"
                            dominantBaseline="central"
                            transform={`rotate(${midAngleDeg}, ${textX}, ${textY})`}
                            style={{ textShadow: '0px 1px 3px rgba(0,0,0,0.8)' }}
                          >
                            {slice.label}
                          </text>
                        </g>
                      );
                    })}

                    {/* Wheel Center Cap */}
                    <circle cx="150" cy="150" r="24" fill="#0F172A" stroke="#F59E0B" strokeWidth="3" />
                    <circle cx="150" cy="150" r="8" fill="#F59E0B" />
                  </svg>
                </div>
              </div>

              {/* Spin Button */}
              <button
                onClick={handleSpin}
                disabled={isSpinning}
                className={`mt-6 w-full max-w-xs py-3.5 px-6 rounded-2xl font-black text-sm uppercase tracking-wider shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isSpinning
                    ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-amber-500 via-emerald-500 to-cyan-500 text-slate-950 hover:scale-105 active:scale-95 shadow-amber-500/20'
                }`}
              >
                {isSpinning ? (
                  <>
                    <RotateCw className="w-5 h-5 animate-spin text-amber-300" />
                    <span>Spinning Wheel...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 fill-slate-950" />
                    <span>SPIN NOW FOR EXTRA DISCOUNT</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            /* Success State After Winning */
            <div className="space-y-4 py-2 animate-in zoom-in-95 duration-300">
              
              {/* Required Urgency Banner */}
              <div className="bg-gradient-to-r from-amber-500/20 via-emerald-500/20 to-amber-500/20 border-2 border-amber-400/70 p-4 rounded-2xl text-center shadow-lg">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-400 text-slate-950 rounded-full mb-2 shadow-md">
                  <Trophy className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-black text-amber-300 leading-snug">
                  &quot;Mubarak ho! Aapko mazeed discount mil gaya hai, lekin yaad rakhein yeh mauka dobara nahi milega!&quot;
                </h3>
              </div>

              {/* Prize Details Card */}
              <div className="bg-slate-800 border border-emerald-500/40 rounded-2xl p-4 text-center space-y-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Aapka Extra Won Discount:</span>
                <div className="text-3xl sm:text-4xl font-black text-emerald-400 flex items-center justify-center gap-2">
                  <Percent className="w-8 h-8 text-amber-400" />
                  <span>{wonDiscount}% EXTRA DISCOUNT</span>
                </div>
                <p className="text-xs text-slate-300">
                  Total Discount: <strong className="text-yellow-400">50% + {wonDiscount}% EXTRA OFF</strong> on all courses!
                </p>
              </div>

              {/* Calculated Prices Preview */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-left space-y-1.5 text-xs">
                <p className="font-bold text-slate-300 border-b border-slate-800 pb-1">
                  💰 Exclusive Discounted Prices for You:
                </p>
                <div className="flex justify-between items-center text-slate-200">
                  <span>📦 Amazon FBA Wholesale:</span>
                  <span className="font-bold text-emerald-400">PKR {amazonFbaFinal} <line className="line-through text-slate-500 text-[10px]">PKR 2,000</line></span>
                </div>
                <div className="flex justify-between items-center text-slate-200">
                  <span>🛍️ Shopify Online Store:</span>
                  <span className="font-bold text-emerald-400">PKR {shopifyFinal} <line className="line-through text-slate-500 text-[10px]">PKR 1,700</line></span>
                </div>
                <div className="flex justify-between items-center text-slate-200">
                  <span>🤖 Web Dev & AI Agents:</span>
                  <span className="font-bold text-emerald-400">PKR {webdevAiFinal} <line className="line-through text-slate-500 text-[10px]">PKR 1,500</line></span>
                </div>
              </div>

              {/* Direct WhatsApp Checkout Button */}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="w-full py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-emerald-600 text-white font-black text-sm uppercase tracking-wider shadow-xl hover:shadow-emerald-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>WhatsApp Par Extra Discount Ke Saath Enroll Karein</span>
              </a>

              <p className="text-[11px] text-slate-400 text-center">
                Direct WhatsApp Mentorship ({DISPLAY_WHATSAPP_NUMBER}) • Instant Access
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
