import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Tag } from 'lucide-react';
import { Course, Language, Currency } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { CourseCard } from './CourseCard';

interface CourseGridProps {
  courses: Course[];
  language: Language;
  currency: Currency;
  onOpenDetails: (course: Course) => void;
}

export const CourseGrid: React.FC<CourseGridProps> = ({
  courses,
  language,
  currency,
  onOpenDetails,
}) => {
  const t = TRANSLATIONS[language];
  const [activeFilter, setActiveFilter] = useState<'all' | 'ecommerce' | 'tech'>('all');

  const filteredCourses = courses.filter((c) => {
    if (activeFilter === 'ecommerce') return c.id.includes('amazon') || c.id.includes('shopify');
    if (activeFilter === 'tech') return c.id.includes('web-dev');
    return true;
  });

  return (
    <section id="courses" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
            <Tag className="w-3.5 h-3.5" />
            <span>Limited Time Offer: 50% OFF All Courses</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            {t.coursesTitle}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-normal">
            {t.coursesSubtitle}
          </p>

          {/* Quick Filter Tabs */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeFilter === 'all'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900'
              }`}
            >
              {language === 'en' ? 'All Courses (3)' : 'Tamam Courses (3)'}
            </button>
            <button
              onClick={() => setActiveFilter('ecommerce')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeFilter === 'ecommerce'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900'
              }`}
            >
              E-Commerce & Amazon
            </button>
            <button
              onClick={() => setActiveFilter('tech')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeFilter === 'tech'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900'
              }`}
            >
              Web Dev & AI Agents
            </button>
          </div>

          {/* Irresistible Persuasive Incentive Banner */}
          <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center max-w-2xl mx-auto shadow-2xs">
            <p className="text-xs sm:text-sm font-bold text-emerald-800 leading-relaxed">
              {t.irresistibleHookLine}
            </p>
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              language={language}
              currency={currency}
              onOpenDetails={onOpenDetails}
            />
          ))}
        </div>

        {/* Global Enrollment Guarantee Note */}
        <div className="mt-12 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 text-center max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 shadow-xs">
          <ShieldCheck className="w-8 h-8 text-emerald-600 shrink-0" />
          <div className="text-xs sm:text-sm text-slate-600 text-center sm:text-left">
            <span className="font-bold text-slate-900 block">
              {language === 'en' ? 'Need payment assistance or local bank transfer?' : 'Payment ka masla hai ya EasyPaisa / JazzCash se pay karna chahte hain?'}
            </span>
            <span>
              {language === 'en'
                ? 'Select "Enroll via WhatsApp" on any course to chat directly with admissions at +92 3378204856.'
                : 'Har course ke "Enroll via WhatsApp" button par click karke direct +92 3378204856 par hum se rabta karein.'}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
