import React, { useState, useEffect } from 'react';
import { Language, Currency, Course } from './types';
import { COURSES } from './data/courses';
import { PromoBanner } from './components/PromoBanner';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CourseGrid } from './components/CourseGrid';
import { CourseModal } from './components/CourseModal';
import { WhyUs } from './components/WhyUs';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { QRCodeSection } from './components/QRCodeSection';
import { Chatbot } from './components/Chatbot';
import { Footer } from './components/Footer';
import { SpinWheelModal } from './components/SpinWheelModal';
import { Sparkles } from 'lucide-react';

export default function App() {
  // Default Language is English as specified
  const [language, setLanguage] = useState<Language>('en');
  // Default Currency is PKR
  const [currency, setCurrency] = useState<Currency>('PKR');

  // Modals state
  const [selectedCourseDetails, setSelectedCourseDetails] = useState<Course | null>(null);
  const [isSpinModalOpen, setIsSpinModalOpen] = useState<boolean>(false);
  const [wonDiscount, setWonDiscount] = useState<number | null>(null);

  // Auto-pop Spin Wheel Modal ONCE for new visitors after 1.5s
  useEffect(() => {
    const savedDiscount = localStorage.getItem('mastery_spin_discount');
    if (savedDiscount) {
      setWonDiscount(parseInt(savedDiscount, 10));
    }

    const hasSeenModal = localStorage.getItem('mastery_spin_modal_shown');
    if (!savedDiscount && !hasSeenModal) {
      const timer = setTimeout(() => {
        setIsSpinModalOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCloseSpinModal = () => {
    setIsSpinModalOpen(false);
    localStorage.setItem('mastery_spin_modal_shown', 'true');
  };

  const handleSpinWin = (discountPercent: number) => {
    setWonDiscount(discountPercent);
    localStorage.setItem('mastery_spin_discount', discountPercent.toString());
    localStorage.setItem('mastery_spin_modal_shown', 'true');
  };

  // Smooth scroll helper
  const handleNavigateSection = (sectionId: string) => {
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Top 50% OFF Promotional Banner */}
      <PromoBanner
        language={language}
        onLanguageChange={setLanguage}
        onClaimClick={() => handleNavigateSection('courses')}
      />

      {/* Sticky Header Navbar */}
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        currency={currency}
        onCurrencyChange={setCurrency}
        onNavigateSection={handleNavigateSection}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Banner Section */}
        <Hero
          language={language}
          onExploreCourses={() => handleNavigateSection('courses')}
        />

        {/* Course Catalog & 50% OFF Pricing Cards */}
        <CourseGrid
          courses={COURSES}
          language={language}
          currency={currency}
          onOpenDetails={(course) => setSelectedCourseDetails(course)}
        />

        {/* Why Choose Mastery Academy Features */}
        <WhyUs language={language} />

        {/* FAQ Accordion Section */}
        <FaqSection language={language} />

        {/* Contact & Admission Inquiries */}
        <ContactSection language={language} />

        {/* Mobile QR Code Scanner Section */}
        <QRCodeSection language={language} />
      </main>

      {/* Floating Lucky Spin Wheel Trigger Launcher Button */}
      <button
        id="spin-wheel-floating-btn"
        onClick={() => setIsSpinModalOpen(true)}
        className="fixed bottom-6 left-6 z-40 bg-gradient-to-r from-amber-500 via-emerald-600 to-cyan-500 hover:from-amber-400 hover:to-cyan-400 text-slate-950 font-black text-xs px-4 py-3 rounded-full shadow-2xl flex items-center gap-2 transition-all hover:scale-105 active:scale-95 border-2 border-amber-300/80 group cursor-pointer"
        aria-label="Open Lucky Spin Wheel"
      >
        <Sparkles className="w-4 h-4 text-slate-950 group-hover:rotate-12 transition-transform" />
        <span>🎰 Spin & Win Extra Discount</span>
        {wonDiscount ? (
          <span className="bg-slate-950 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-400/50">
            +{wonDiscount}% WON
          </span>
        ) : (
          <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-1.5 py-0.5 rounded-full animate-pulse">
            NEW
          </span>
        )}
      </button>

      {/* Floating Interactive FAQ Chatbot Widget */}
      <Chatbot language={language} />

      {/* Footer */}
      <Footer
        language={language}
        onNavigateSection={handleNavigateSection}
      />

      {/* Course Details Modal */}
      {selectedCourseDetails && (
        <CourseModal
          course={selectedCourseDetails}
          language={language}
          currency={currency}
          onClose={() => setSelectedCourseDetails(null)}
        />
      )}

      {/* Lucky Spin Wheel Modal */}
      <SpinWheelModal
        language={language}
        isOpen={isSpinModalOpen}
        onClose={handleCloseSpinModal}
        onSpinWin={handleSpinWin}
      />

    </div>
  );
}

