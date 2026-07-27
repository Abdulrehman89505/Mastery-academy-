import React from 'react';
import { X, CheckCircle, Clock, Star, Users, ExternalLink, MessageCircle, BookOpen, ShieldCheck, User } from 'lucide-react';
import { Course, Language, Currency } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { CURRENCY_RATES, getWhatsAppCourseLink } from '../data/courses';

interface CourseModalProps {
  course: Course | null;
  language: Language;
  currency: Currency;
  onClose: () => void;
}

export const CourseModal: React.FC<CourseModalProps> = ({
  course,
  language,
  currency,
  onClose,
}) => {
  if (!course) return null;

  const t = TRANSLATIONS[language];
  const currFormatter = CURRENCY_RATES[currency].formatted;
  const promoPriceDisplay = currFormatter(course.promoPricePKR);
  const originalPriceDisplay = currFormatter(course.originalPricePKR);
  const waUrl = getWhatsAppCourseLink(course, language);

  return (
    <div id="course-details-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative bg-white border border-slate-200 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl text-slate-900 p-6 sm:p-8 animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          id="course-modal-close-btn"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-4 pr-8">
          <div className="inline-flex items-center gap-1.5 bg-yellow-50 border border-yellow-200 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
            {course.badge[language]}
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            {course.title[language]}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            {course.fullDesc[language]}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-500 pt-1">
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>{course.rating} ({course.reviewsCount} reviews)</span>
            </div>
            <div className="flex items-center gap-1 text-slate-600">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>{course.duration[language]}</span>
            </div>
            <div className="flex items-center gap-1 text-emerald-700 font-semibold">
              <Users className="w-4 h-4 text-emerald-600" />
              <span>{course.studentsEnrolled.toLocaleString()} enrolled</span>
            </div>
          </div>
        </div>

        {/* Price & Primary CTAs */}
        <div className="my-6 p-4 sm:p-5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              {t.promoPriceLabel}
            </span>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-emerald-700">
                {promoPriceDisplay}
              </span>
              <span className="text-sm font-bold text-slate-400 line-through">
                {originalPriceDisplay}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-emerald-600 text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-md uppercase tracking-wide transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{t.buyWhatsAppBtn}</span>
            </a>
          </div>
        </div>

        {/* Detailed Curriculum Syllabus Breakdown */}
        <div className="space-y-6 pt-2">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-2">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            <span>{t.curriculumTitle}</span>
          </h3>

          <div className="space-y-4">
            {course.curriculum.map((mod, idx) => (
              <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="font-bold text-sm text-slate-900 mb-2">
                  {mod.title[language]}
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {mod.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item[language]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Instructor Info */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center gap-4">
            <img
              src={course.instructor.avatar}
              alt={course.instructor.name}
              referrerPolicy="no-referrer"
              className="w-12 h-12 rounded-full object-cover border border-emerald-200 shrink-0"
            />
            <div>
              <span className="text-xs text-slate-500 font-semibold block uppercase">
                {t.instructorTitle}
              </span>
              <span className="text-sm font-bold text-slate-900">{course.instructor.name}</span>
              <span className="text-xs text-emerald-700 font-medium block">{course.instructor.role[language]}</span>
            </div>
          </div>

          {/* Guarantee Footer */}
          <div className="flex items-center gap-2 text-xs text-slate-500 justify-center pt-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Practical Step-by-Step Training • WhatsApp Mentorship Access Included</span>
          </div>
        </div>

      </div>
    </div>
  );
};
