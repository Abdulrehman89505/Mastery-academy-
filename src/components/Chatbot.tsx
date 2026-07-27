import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, MessageCircle, RefreshCw, User, HelpCircle } from 'lucide-react';
import { ChatMessage, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { WHATSAPP_NUMBER, DISPLAY_WHATSAPP_NUMBER } from '../data/courses';

interface ChatbotProps {
  language: Language;
}

export const Chatbot: React.FC<ChatbotProps> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize welcome message on mount or language change
  useEffect(() => {
    setMessages([
      {
        id: 'welcome-1',
        sender: 'bot',
        text: t.chatbotWelcome,
        timestamp: new Date(),
      },
    ]);
  }, [language]);

  // Auto-scroll chat window
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Handle clicking the exact required pre-fixed question
  const handlePreFixedQuestionClick = () => {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: 'What do you teach in your courses?',
      timestamp: new Date(),
    };

    const exactBotReply: ChatMessage = {
      id: (Date.now() + 1).toString(),
      sender: 'bot',
      text: t.chatbotFixedAnswerText,
      timestamp: new Date(),
      isQuickAnswer: true,
    };

    setMessages((prev) => [...prev, userMsg, exactBotReply]);
  };

  // Quick enroll answer
  const handleQuickEnrollClick = () => {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: language === 'en' ? 'How do I enroll via WhatsApp?' : 'WhatsApp par buy karne ka tareeqa kya hai?',
      timestamp: new Date(),
    };

    const botReplyText = language === 'en'
      ? `Enrolling via WhatsApp is fast & easy!\n\n1. Select any course and click "Enroll via WhatsApp".\n2. It will open WhatsApp (+92 3378204856) with your pre-filled message.\n3. Our team will share local payment details (EasyPaisa/JazzCash/Bank) and enroll you instantly!`
      : `WhatsApp par enroll karna bohot aasan hai!\n\n1. Kisi bhi course par "Enroll via WhatsApp" button par click karein.\n2. WhatsApp (+92 3378204856) par pre-filled message send karein.\n3. Team aapko EasyPaisa/JazzCash/Bank details share karke instantly add kar le gi!`;

    const botReply: ChatMessage = {
      id: (Date.now() + 1).toString(),
      sender: 'bot',
      text: botReplyText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg, botReply]);
  };

  // Custom question send to Gemini API backend
  const handleSendCustomMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userQuery = inputText.trim();
    setInputText('');

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: userQuery,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userQuery,
          language,
        }),
      });

      const data = await res.json();
      const botText = data.reply || (language === 'ur' 
        ? 'Barae meherbani direct WhatsApp par rabta karein: +92 3378204856' 
        : 'Please contact admissions on WhatsApp at +92 3378204856');

      const botMsg: ChatMessage = {
        id: Date.now().toString(),
        sender: 'bot',
        text: botText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const fallbackMsg: ChatMessage = {
        id: Date.now().toString(),
        sender: 'bot',
        text: language === 'ur'
          ? 'Shukriya! Aap direct WhatsApp par hum se rabta kar sakte hain: +92 3378204856'
          : 'Thank you! You can chat directly with admissions on WhatsApp at +92 3378204856',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
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
          
          {/* Notification Ping Badge */}
          {hasUnread && (
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-yellow-400 rounded-full border-2 border-white" />
          )}

          {/* Tooltip Label */}
          <span className="absolute right-16 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
            {language === 'en' ? 'Course FAQ Assistant' : 'Sawal Poochein'}
          </span>
        </button>
      )}

      {/* Expandable Chat Window */}
      {isOpen && (
        <div id="chatbot-window" className="bg-white/95 backdrop-blur-md border border-emerald-100 w-[92vw] sm:w-[360px] h-[520px] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          
          {/* Chat Window Header */}
          <div className="bg-slate-50 p-4 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">
                  {t.chatbotHeaderTitle}
                </h4>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{t.chatbotOnlineStatus}</span>
                </div>
              </div>
            </div>

            <button
              id="chatbot-close-btn"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Interactive Pre-fixed Question Chip Banner */}
          <div className="bg-emerald-50/50 p-2.5 border-b border-emerald-100 flex flex-col gap-1.5">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <HelpCircle className="w-3 h-3 text-emerald-600" />
              Interactive Quick FAQ:
            </span>

            {/* PRE-FIXED REQUIRED QUESTION BUTTON */}
            <button
              id="chatbot-prefixed-faq-btn"
              onClick={handlePreFixedQuestionClick}
              className="w-full text-left bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold px-2.5 py-1.5 rounded-lg transition-all flex items-center justify-between group cursor-pointer"
            >
              <span>{t.chatbotFixedQuestionBtn}</span>
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            </button>

            {/* SECONDARY QUICK CHIP */}
            <button
              id="chatbot-quick-enroll-btn"
              onClick={handleQuickEnrollClick}
              className="w-full text-left bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold px-2.5 py-1 rounded-lg transition-all cursor-pointer"
            >
              {t.chatbotQuickEnrollBtn}
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs bg-white">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] p-3 rounded-xl leading-relaxed whitespace-pre-line font-normal ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600 text-white font-medium rounded-tr-none shadow-xs'
                      : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200/80 shadow-2xs'
                  }`}
                >
                  {msg.text}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 shrink-0 mt-1">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-slate-400 text-xs italic pl-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                <span>Mastery AI is typing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Direct WhatsApp Button Shortcut */}
          <div className="p-2 bg-slate-50 border-t border-slate-200 text-center">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Salam Mastery Academy, I need help with course enrollment.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 text-[11px] font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Or click here to chat on WhatsApp ({DISPLAY_WHATSAPP_NUMBER})</span>
            </a>
          </div>

          {/* Chat Input Bar */}
          <form onSubmit={handleSendCustomMessage} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t.chatbotTypePlaceholder}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 transition-colors"
            />
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white p-2 rounded-lg transition-all cursor-pointer font-bold"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
};
