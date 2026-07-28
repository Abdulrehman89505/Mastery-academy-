import React from 'react';
import { Star, Clock, Users, CheckCircle, ArrowRight, MessageCircle, ExternalLink, BookOpen, Tag } from 'lucide-react';
import { Course, Language, Currency } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { CURRENCY_RATES, getWhatsAppCourseLink } from '../data/courses';

interface CourseCardProps {
  course: Course;
  language: Language;
  currency: Currency;
  onOpenDetails: (course: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  language,
  currency,
  onOpenDetails,
}) => {
  const t = TRANSLATIONS[language];
  const currFormatter = CURRENCY_RATES[currency].formatted;

  const promoPriceDisplay = currFormatter(course.promoPricePKR);
  const originalPriceDisplay = currFormatter(course.originalPricePKR);

  const waUrl = getWhatsAppCourseLink(course, language);

  return (
    <div
      id={`course-card-${course.id}`}
      className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-500 transition-all duration-300 shadow-xs hover:shadow-lg overflow-hidden flex flex-col group hover:-translate-y-1"
    >
      {/* Course Thumbnail Image & Badges */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        <img
          src={course.image}
          alt={course.title[language]}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            const target = e.currentTarget;
            if (!target.dataset.fallback) {
              target.dataset.fallback = '1';
              target.src = `/images/${course.id}.jpg`;
            }
          }}
        />

        {/* 50% OFF Promotional Badge Overlay */}
        <div className="absolute top-3 left-3 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs flex items-center gap-1 uppercase tracking-wider">
          <Tag className="w-3.5 h-3.5" />
          {course.badge[language]}
        </div>

        {/* Level Badge */}
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md text-slate-800 text-xs font-semibold px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs">
          {course.level[language]}
        </div>

        {/* Student Count */}
        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs flex items-center gap-1">
          <Users className="w-3.5 h-3.5 text-emerald-600" />
          {course.studentsEnrolled.toLocaleString()}
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        {/* Title, Rating, and Short Description */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{course.rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1 text-slate-500">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span>{course.duration[language]}</span>
            </div>
          </div>

          <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors leading-snug">
            {course.title[language]}
          </h3>

          <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 font-normal">
            {course.shortDesc[language]}
          </p>
        </div>

        {/* Key Features Bullet List */}
        <ul className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
          {course.features.slice(0, 3).map((feat, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{feat[language]}</span>
            </li>
          ))}
        </ul>

        {/* Pricing Box */}
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
          <div>
            <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              {t.promoPriceLabel}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-emerald-600">
                {promoPriceDisplay}
              </span>
              <span className="text-xs font-normal text-slate-400 line-through">
                {originalPriceDisplay}
              </span>
            </div>
          </div>

          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
            50% OFF
          </span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          {/* Primary: WhatsApp Enrollment */}
          <a
            id={`course-buy-whatsapp-${course.id}`}
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-emerald-600 text-white font-bold text-xs py-3 rounded-full transition-all shadow-xs uppercase tracking-wide"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>{t.buyWhatsAppBtn}</span>
          </a>

          {/* Details Modal Trigger */}
          <button
            id={`course-view-details-${course.id}`}
            onClick={() => onOpenDetails(course)}
            className="w-full flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-600 py-1.5 transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.viewDetailsBtn}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
