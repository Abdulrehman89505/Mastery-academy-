import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Sparkles, MessageCircle, User, HelpCircle, CheckCircle2, ChevronRight, RotateCcw } from 'lucide-react';
import { ChatMessage, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { WHATSAPP_NUMBER, DISPLAY_WHATSAPP_NUMBER } from '../data/courses';

interface ChatbotProps {
  language: Language;
}

interface PresetQuestion {
  id: string;
  label: string;
  answer: string;
  courseWaMsg: string;
}

const PRESET_QUESTIONS: PresetQuestion[] = [
  {
    id: 'amazon-fba',
    label: 'Hum Amazon FBA mein kya sekha rahe hain?',
    courseWaMsg: 'Salam Mastery Academy, mujhe Amazon FBA Wholesale course mein enroll hona hai.',
    answer: `📦 Amazon FBA Wholesale Course Details:

Is course mein hum aapko step-by-step seekhate hain:
• Amazon Wholesale Model kya hai aur yeh kaise kaam karta hai
• US/UK mein LLC, Business Company aur Resell Permit registration
• Authorized Brands aur Wholesale Distributors se approvals lena
• Profitable products research (Keepa & Helium 10 ke zariye)
• Buy Box winning strategies aur Inventory Management
• Amazon FBA Warehouse tak stock bhejne aur profit automate karne ka tareeqa

💰 Discounted Fee: PKR 2,000 (One-time fee, Lifetime Access + Direct WhatsApp Mentorship)`,
  },
  {
    id: 'shopify',
    label: 'Hum Shopify course mein kya sekha rahe hain?',
    courseWaMsg: 'Salam Mastery Academy, mujhe Shopify Online Store course mein enroll hona hai.',
    answer: `🛍️ Shopify Online Store Mastery Course Details:

Is course mein hum aapko step-by-step seekhate hain:
• Complete Shopify E-Commerce Store zero se bina coding ke build karna
• High-demand Winning Products research karna (Pakistan & International)
• Local COD Courier Integration (TCS, Trax, CallCourier, Leopard)
• High-converting Facebook, Instagram & TikTok Ad Campaigns run karna
• Order fulfillment, Customer support, aur daily sales scale karna

💰 Discounted Fee: PKR 1,700 (One-time fee, Lifetime Access + Direct WhatsApp Mentorship)`,
  },
  {
    id: 'webdev-ai',
    label: 'Hum Web Development, AI Agents, aur Chatbot wale course mein kya sekha rahe hain?',
    courseWaMsg: 'Salam Mastery Academy, mujhe Web Development & AI Agents course mein enroll hona hai.',
    answer: `🤖 Web Development, AI Agents & Chatbots Course Details:

Is course mein hum aapko step-by-step seekhate hain:
• Modern Web Development (React, TypeScript, Tailwind CSS, Next.js / Vite)
• Custom AI Chatbots aur Intelligent Voice/Text Agents build karna
• Gemini API & OpenAI API integrations web apps mein integrate karna
• Modern AI Prompt Engineering aur Automated Workflows
• Freelancing (Fiverr, Upwork) par AI Agent Development Services sell karke clients hasil karna

💰 Discounted Fee: PKR 1,500 (One-time fee, Lifetime Access + Direct WhatsApp Mentorship)`,
  },
  {
    id: 'earning-methods',
    label: 'In courses se hum paise kaise kamate hain aur kya karte hain?',
    courseWaMsg: 'Salam Mastery Academy, mujhe courses aur earning guidance chahiye.',
    answer: `💡 In Courses Se Earning Aur Working Strategy:

1️⃣ Amazon FBA Wholesale: Authorized Brands se discounted price par bulk products khareed kar Amazon FBA par list karte hain. Amazon orders ship karta hai aur aap har sale par net profit margin kamate hain.

2️⃣ Shopify E-Commerce: Apne online store par trending products display karke Facebook/TikTok Ads se order laate hain. Cash on Delivery (COD) par Rs. 800 - Rs. 2000+ per order profit bachta hai.

3️⃣ Web Dev & AI Agents: International & local clients ke liye AI Chatbots, automated systems, aur websites bana kar $300 - $1500+ per project charge karte hain ya Fiverr/Upwork par freelancing karte hain.

📞 Direct WhatsApp Help & Enrollment Helpline: +92 3378204856`,
  },
];

export const Chatbot: React.FC<ChatbotProps> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [hasUnread, setHasUnread] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize welcome message
  useEffect(() => {
    resetChat();
  }, [language]);

  const resetChat = () => {
    setMessages([
      {
        id: 'welcome-1',
        sender: 'bot',
        text: language === 'ur'
          ? 'Salam! Mastery Academy Course Assistant mein khushamdeed.\n\nAap niche diye gaye kisi bhi sawal par click karke instant jankari hasil kar sakte hain:'
          : 'Welcome to Mastery Academy Course Assistant!\n\nPlease click any question below to get instant course details & guidance:',
        timestamp: new Date(),
      },
    ]);
  };

  // Auto-scroll chat window
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Handle preset question selection
  const handleSelectQuestion = (q: PresetQuestion) => {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: q.label,
      timestamp: new Date(),
    };

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      sender: 'bot',
      text: q.answer,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
  };

  return (
    <div id="chatbot-support-widget" className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      
      {/* Floating Widget Trigger Button */}
      {!isOpen && (
        <button
          id="chatbot-open-btn"
          onClick={() => {
            setIsOpen(true);
            setHasUnread(false);
          }}
          className="relative w-14 h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform group"
          aria-label="Open AI Support Chat"
        >
          <Bot className="w-7 h-7" />
          
          {/* Notification Badge */}
          {hasUnread && (
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-yellow-400 rounded-full border-2 border-white animate-bounce" />
          )}

          {/* Tooltip Label */}
          <span className="absolute right-16 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
            {language === 'en' ? 'Course Guidance Assistant' : 'Sawal Poochein'}
          </span>
        </button>
      )}

      {/* Expandable Chat Window */}
      {isOpen && (
        <div id="chatbot-window" className="bg-white/95 backdrop-blur-md border border-emerald-200 w-[92vw] sm:w-[380px] h-[540px] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          
          {/* Chat Window Header */}
          <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold shadow-xs">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>{t.chatbotHeaderTitle}</span>
                  <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                </h4>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Interactive Course Guide</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={resetChat}
                title="Restart Chat"
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                id="chatbot-close-btn"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs bg-slate-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold shadow-2xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600 text-white font-medium rounded-tr-none shadow-xs'
                      : 'bg-white text-slate-800 rounded-tl-none border border-slate-200/90 shadow-2xs font-normal'
                  }`}
                >
                  {msg.text}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 shrink-0 mt-0.5 shadow-2xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          {/* Pre-Defined Clickable Question Buttons Container */}
          <div className="p-3 bg-white border-t border-slate-200 space-y-2">
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5 px-1">
              <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Sawal Par Click Karein (Select Question):</span>
            </span>

            <div className="grid grid-cols-1 gap-1.5 max-h-[160px] overflow-y-auto pr-1">
              {PRESET_QUESTIONS.map((q) => (
                <button
                  key={q.id}
                  onClick={() => handleSelectQuestion(q)}
                  className="w-full text-left bg-slate-50 hover:bg-emerald-50 active:bg-emerald-100 text-slate-800 hover:text-emerald-900 border border-slate-200 hover:border-emerald-300 text-xs font-semibold p-2.5 rounded-xl transition-all flex items-start justify-between gap-2 group cursor-pointer"
                >
                  <span className="leading-snug">{q.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 shrink-0 mt-0.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Direct WhatsApp Button */}
          <div className="p-2.5 bg-slate-900 text-white text-center border-t border-slate-800">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Salam Mastery Academy, I need help with course enrollment.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-emerald-600 text-white text-xs font-bold py-2 px-4 rounded-xl shadow-xs transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Admission Line ({DISPLAY_WHATSAPP_NUMBER})</span>
            </a>
          </div>

        </div>
      )}

    </div>
  );
};
