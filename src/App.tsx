import React, { useState } from 'react';
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

export default function App() {
  // Default Language is English as specified
  const [language, setLanguage] = useState<Language>('en');
  // Default Currency is PKR
  const [currency, setCurrency] = useState<Currency>('PKR');

  // Modals state
  const [selectedCourseDetails, setSelectedCourseDetails] = useState<Course | null>(null);

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

    </div>
  );
}
