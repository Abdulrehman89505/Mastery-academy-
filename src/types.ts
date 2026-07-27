export type Language = 'en' | 'ur';

export type Currency = 'PKR' | 'USD' | 'EUR' | 'AED' | 'GBP';

export interface CurrencyRate {
  code: Currency;
  symbol: string;
  rateFromPKR: number; // multiplier to convert PKR -> target currency
  formatted: (amountPKR: number) => string;
}

export interface CurriculumModule {
  title: {
    en: string;
    ur: string;
  };
  items: Array<{
    en: string;
    ur: string;
  }>;
}

export interface Course {
  id: string;
  title: {
    en: string;
    ur: string;
  };
  shortDesc: {
    en: string;
    ur: string;
  };
  fullDesc: {
    en: string;
    ur: string;
  };
  promoPricePKR: number;
  originalPricePKR: number;
  image: string;
  badge: {
    en: string;
    ur: string;
  };
  duration: {
    en: string;
    ur: string;
  };
  level: {
    en: string;
    ur: string;
  };
  studentsEnrolled: number;
  rating: number;
  reviewsCount: number;
  curriculum: CurriculumModule[];
  features: Array<{
    en: string;
    ur: string;
  }>;
  instructor: {
    name: string;
    role: {
      en: string;
      ur: string;
    };
    avatar: string;
  };
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
  isQuickAnswer?: boolean;
}

export interface FAQItem {
  id: string;
  question: {
    en: string;
    ur: string;
  };
  answer: {
    en: string;
    ur: string;
  };
  category: 'general' | 'payment' | 'access' | 'support';
}

export interface Testimonial {
  id: string;
  name: string;
  role: {
    en: string;
    ur: string;
  };
  location: string;
  courseTitle: {
    en: string;
    ur: string;
  };
  content: {
    en: string;
    ur: string;
  };
  rating: number;
  avatar: string;
  earningsProof?: string;
}
