import { Course, CurrencyRate, Currency, Language } from '../types';

export const WHATSAPP_NUMBER = '923378204856';
export const DISPLAY_WHATSAPP_NUMBER = '+92 3378204856';

export const CURRENCY_RATES: Record<Currency, CurrencyRate> = {
  PKR: {
    code: 'PKR',
    symbol: 'PKR ',
    rateFromPKR: 1,
    formatted: (amt) => `PKR ${amt.toLocaleString()}`,
  },
  USD: {
    code: 'USD',
    symbol: '$',
    rateFromPKR: 0.0036, // approx 1 USD = 278 PKR
    formatted: (amt) => `$${(amt * 0.0036).toFixed(2)}`,
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    rateFromPKR: 0.0033, // approx 1 EUR = 300 PKR
    formatted: (amt) => `€${(amt * 0.0033).toFixed(2)}`,
  },
  AED: {
    code: 'AED',
    symbol: 'AED ',
    rateFromPKR: 0.0132, // approx 1 AED = 75.8 PKR
    formatted: (amt) => `AED ${(amt * 0.0132).toFixed(1)}`,
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    rateFromPKR: 0.0028, // approx 1 GBP = 355 PKR
    formatted: (amt) => `£${(amt * 0.0028).toFixed(2)}`,
  },
};

export const COURSES: Course[] = [
  {
    id: 'amazon-fba-wholesale',
    title: {
      en: 'Amazon FBA Wholesale Model',
      ur: 'Amazon FBA Wholesale Course',
    },
    shortDesc: {
      en: 'Master product sourcing, supplier validation, and inventory management for Amazon FBA wholesale.',
      ur: 'Amazon FBA Wholesale ke liye product sourcing, supplier validation, aur inventory management mein maharat hasil karein.',
    },
    fullDesc: {
      en: 'Comprehensive step-by-step masterclass designed to take you from a complete beginner to a profitable Amazon FBA Wholesale seller. Learn how to open wholesale brand accounts, negotiate distributor contracts, automate inventory replenishment, and generate steady passive income.',
      ur: 'Yeh course aapko bilkul zero se Amazon FBA Wholesale seller banane ke liye design kiya gaya hai. Is mein aap wholesale brand accounts open karna, supplier contracts negotiate karna, aur profit earning e-commerce store chalana seekhein ge.',
    },
    promoPricePKR: 2000,
    originalPricePKR: 4000,
    image: '/src/assets/images/amazon_fba_course_1785072739833.jpg',
    badge: {
      en: '50% OFF - BESTSELLER',
      ur: '50% OFF - ZABARDAST',
    },
    duration: {
      en: 'Self-Paced Masterclass & Mentorship',
      ur: 'Step-by-Step Practical Training',
    },
    level: {
      en: 'Beginner to Advanced',
      ur: 'Aasan & Mukammal Step-by-Step',
    },
    studentsEnrolled: 3420,
    rating: 4.9,
    reviewsCount: 488,
    curriculum: [
      {
        title: {
          en: 'Module 1: Amazon FBA Wholesale Fundamentals',
          ur: 'Module 1: Amazon FBA Wholesale Ki Buniyad',
        },
        items: [
          { en: 'Understanding Wholesale vs Private Label', ur: 'Wholesale aur Private Label mein farq' },
          { en: 'Setting up LLC & Business Accounts', ur: 'LLC aur Company registration step-by-step' },
          { en: 'Tax Exemption & Reseller Permit Setup', ur: 'Tax exemption aur resale permit ka tareeqa' },
        ],
      },
      {
        title: {
          en: 'Module 2: High-Profit Product Hunting & Sourcing',
          ur: 'Module 2: Product Hunting & Supplier Approval',
        },
        items: [
          { en: 'Keepa Graph Analysis & Profitability Math', ur: 'Keepa graphs aur profit calculation' },
          { en: 'Finding & Contacting Verified US/UK Distributors', ur: 'US/UK Brand Distributors se rabta karna' },
          { en: 'Cold Calling & Email Templates for Brand Approvals', ur: 'Brand approval lene ke professional templates' },
        ],
      },
      {
        title: {
          en: 'Module 3: Order Shipping, Prep Centers & Scaling',
          ur: 'Module 3: Shipping, Prep Center & Profit Scaling',
        },
        items: [
          { en: 'Prep Center Sourcing & FNSKU Labeling', ur: 'Prep Center use karna aur Amazon FBA FNSKU labels' },
          { en: 'Buy Box Winning Strategies & Dynamic Pricing', ur: 'Buy Box hasil karne ke secret tareeqay' },
          { en: 'Managing Cash Flow & Automated Reorders', ur: 'Cash flow management aur inventory scaling' },
        ],
      },
    ],
    features: [
      { en: 'Step-by-step video lessons in Urdu/Hindi & English', ur: 'Aasan Urdu aur English mein step-by-step lectures' },
      { en: 'Free Brand Contact Email & Call Scripts', ur: 'Brand approvals ke tayyar email & call scripts' },
      { en: 'Verified US Supplier & Prep Center List', ur: 'Verified Suppliers aur Prep Centers ki list' },
      { en: 'Direct WhatsApp Mentorship Access', ur: 'WhatsApp par direct mentorship aur madad' },
      { en: '100% Practical Learning Content (No Certificate)', ur: '100% Practical Course Content (Koi Certificate Nahi)' },
    ],
    instructor: {
      name: 'Usman Ali',
      role: {
        en: '7-Figure Amazon Wholesale Specialist',
        ur: 'Amazon FBA Wholesale Expert'
      },
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    },
  },
  {
    id: 'shopify-online-store',
    title: {
      en: 'Shopify Online Store Mastery',
      ur: 'Shopify Online Store Mastery',
    },
    shortDesc: {
      en: 'Learn how to build, launch, and scale a profitable e-commerce store on Shopify from scratch.',
      ur: 'Shopify par apna profitable e-commerce store zero se banana aur scale karna seekhein.',
    },
    fullDesc: {
      en: 'Build a high-converting Shopify store without coding. Master winning product research, high-converting store layout design, Facebook/TikTok ad campaign creation, local cash-on-delivery (COD) setup, and automated order fulfillment.',
      ur: 'Bina kisi coding ke professional Shopify online store banayein. Winning products dhoondna, Facebook & TikTok Ads chalana, Cash on Delivery (COD) setup karna aur daily order sales hasil karna seekhein.',
    },
    promoPricePKR: 1700,
    originalPricePKR: 3400,
    image: '/src/assets/images/shopify_course_1785072756242.jpg',
    badge: {
      en: '50% OFF - POPULAR',
      ur: '50% OFF - HOT COURSE',
    },
    duration: {
      en: 'Complete Store Building & Ads Course',
      ur: 'Live Practical Store Training',
    },
    level: {
      en: 'Beginner Friendly',
      ur: 'Bilkul Aasan Zero Level Se',
    },
    studentsEnrolled: 4180,
    rating: 4.85,
    reviewsCount: 520,
    curriculum: [
      {
        title: {
          en: 'Module 1: Store Setup & Design Blueprint',
          ur: 'Module 1: Shopify Store Blueprint & Design',
        },
        items: [
          { en: 'Creating Shopify Account & Premium Theme Setup', ur: 'Shopify account aur high-converting theme setup' },
          { en: 'Designing Professional Logos & Product Banners', ur: 'High quality banners aur logos banana' },
          { en: 'Setting up Domain, Legal Pages & Payment Gateways', ur: 'Custom domain aur payment gateways connect karna' },
        ],
      },
      {
        title: {
          en: 'Module 2: Winning Product Research & Sourcing',
          ur: 'Module 2: Winning Products & Sourcing',
        },
        items: [
          { en: 'Finding Viral High-Margin Products', ur: 'Viral aur high-profit products hunting' },
          { en: 'Local Suppliers & Dropshipping Integrations (CJ, AliExpress, Local Wholesalers)', ur: 'Local suppliers aur dropshipping portals connect karna' },
          { en: 'High-Converting Product Page Copywriting', ur: 'Attract karne wali product descriptions likhna' },
        ],
      },
      {
        title: {
          en: 'Module 3: Facebook, Instagram & TikTok Ads Masterclass',
          ur: 'Module 3: Ads & High Sales Traffic',
        },
        items: [
          { en: 'Creating High ROI Video Creatives', ur: 'Attract karne wale video ads create karna' },
          { en: 'Targeting, Budgeting & Scaling Ad Campaigns', ur: 'Facebook aur TikTok ads ka mukammal setup' },
          { en: 'Order Confirmation & Courier Integration (Leopard, TCS, Trax)', ur: 'Courier companies ke sath COD integration' },
        ],
      },
    ],
    features: [
      { en: 'Step-by-step video training in Urdu & English', ur: 'Clear Urdu & English video tutorials' },
      { en: 'Free Premium Shopify Theme included', ur: 'Free Premium Theme template' },
      { en: 'Local Courier COD Setup guide', ur: 'Cash on Delivery courier guide' },
      { en: 'Winning Products List & Ad Copy Templates', ur: 'Winning products ki updated list' },
      { en: 'Dedicated WhatsApp Mentor Support', ur: 'Dedicated WhatsApp Mentor support' },
    ],
    instructor: {
      name: 'Hamza Sheikh',
      role: {
        en: 'E-Commerce Growth Strategist',
        ur: 'Shopify & E-Commerce Expert',
      },
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    },
  },
  {
    id: 'web-dev-ai-agents',
    title: {
      en: 'Web Development, AI Agents & Chatbots',
      ur: 'Web Development, AI Agents & Chatbots',
    },
    shortDesc: {
      en: 'Build modern websites and learn to create & integrate custom AI chatbots and voice agents.',
      ur: 'Modern websites banana seekhein aur custom AI chatbots wa voice agents create karke connect karna seekhein.',
    },
    fullDesc: {
      en: 'The ultimate future-proof skill set! Learn modern web development (HTML, CSS, React, Tailwind) combined with cutting-edge AI Agent engineering. Build autonomous AI chatbots, customer support assistants, and voice agents for businesses, websites, WhatsApp, and Telegram.',
      ur: 'Future ki sab se zyada demand wali skill! Modern websites banana seekhein aur unmein autonomous AI chatbots, automated customer service agents, aur AI voice agents integrate karein. Local aur international clients ko yeh service bech kar earn karein.',
    },
    promoPricePKR: 1500,
    originalPricePKR: 3000,
    image: '/src/assets/images/webdev_ai_course_1785072777171.jpg',
    badge: {
      en: '50% OFF - HIGH DEMAND',
      ur: '50% OFF - TOP FUTURE SKILL',
    },
    duration: {
      en: 'Hands-on Projects & AI Training',
      ur: 'Practical Live Projects',
    },
    level: {
      en: 'Beginner to Professional',
      ur: 'Aasan & Practical Projects',
    },
    studentsEnrolled: 2890,
    rating: 4.95,
    reviewsCount: 395,
    curriculum: [
      {
        title: {
          en: 'Module 1: Modern Responsive Web Development',
          ur: 'Module 1: Professional Web Development',
        },
        items: [
          { en: 'HTML5, CSS3, Tailwind CSS & JavaScript Basics', ur: 'Modern web development ke core concept' },
          { en: 'Building Modern Responsive Landing Pages', ur: 'Mobile-friendly high converting web pages' },
          { en: 'Deploying Websites live on Vercel / Netlify for free', ur: 'Website ko free internet par live karna' },
        ],
      },
      {
        title: {
          en: 'Module 2: Custom AI Chatbot Development (Gemini & LLMs)',
          ur: 'Module 2: AI Chatbots & LLM Agents Creation',
        },
        items: [
          { en: 'Connecting Gemini API & Prompt Engineering', ur: 'Gemini API aur Prompt Engineering ka tarika' },
          { en: 'Building Knowledge-Base Grounded Support Bots', ur: 'Business FAQs ke mutabiq AI Chatbot sikhana' },
          { en: 'Embedding Floating AI Widgets on Websites', ur: 'Website par floating AI chat widget lagana' },
        ],
      },
      {
        title: {
          en: 'Module 3: WhatsApp & Voice AI Agents for Businesses',
          ur: 'Module 3: WhatsApp & Voice AI Integration',
        },
        items: [
          { en: 'Building Automated WhatsApp AI Reply Bots', ur: 'WhatsApp par auto reply dene wale AI agents' },
          { en: 'Creating AI Voice Agents for Automated Sales Calls', ur: 'AI Voice Agents banana jo sales calls handle karein' },
          { en: 'Freelancing & Selling AI Solutions to Global Clients', ur: 'Fiverr, Upwork aur direct clients ko yeh service bechna' },
        ],
      },
    ],
    features: [
      { en: 'Complete Source Code provided for all projects', ur: 'Tamam projects ka complete source code' },
      { en: 'Step-by-step AI Prompt Templates', ur: 'Ready-made AI prompts and templates' },
      { en: 'Freelancing Client Acquisition Blueprint', ur: 'Clients hasil karne ki verified strategy' },
      { en: 'Live Project Reviews & Bug Assistance', ur: 'Coding & AI bugs ki direct help' },
      { en: '100% Practical Skill Training (Learning Content Only)', ur: '100% Practical Skill Training (Sirf Learning Content)' },
    ],
    instructor: {
      name: 'Ayan Ahmed',
      role: {
        en: 'Senior Full-Stack & AI Agent Developer',
        ur: 'Full-Stack & AI Engineer',
      },
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
    },
  },
];

/**
 * Generates the official WhatsApp link with exact pre-filled message requirements
 */
export function getWhatsAppCourseLink(course: Course, lang: Language): string {
  let message = '';

  if (course.id === 'amazon-fba-wholesale') {
    if (lang === 'en') {
      message = 'Hi Mastery Academy, I want to enroll in the Amazon FBA Wholesale course for 2000. Please guide me with the payment process.';
    } else {
      message = 'Salam Mastery Academy, mujhe Amazon FBA Wholesale course 2000 mein buy karna hai. Kindly payment ka tareeqa bata dein.';
    }
  } else if (course.id === 'shopify-online-store') {
    if (lang === 'en') {
      message = 'Hi Mastery Academy, I want to enroll in the Shopify Online Store Mastery course for 1700. Please guide me with the payment process.';
    } else {
      message = 'Salam Mastery Academy, mujhe Shopify Online Store Mastery course 1700 mein buy karna hai. Kindly payment ka tareeqa bata dein.';
    }
  } else if (course.id === 'web-dev-ai-agents') {
    if (lang === 'en') {
      message = 'Hi Mastery Academy, I want to enroll in the Web Development, AI Agents & Chatbots course for 1500. Please guide me with the payment process.';
    } else {
      message = 'Salam Mastery Academy, mujhe Web Development, AI Agents & Chatbots course 1500 mein buy karna hai. Kindly payment ka tareeqa bata dein.';
    }
  } else {
    // Default fallback
    if (lang === 'en') {
      message = `Hi Mastery Academy, I want to enroll in the ${course.title.en} course for ${course.promoPricePKR}. Please guide me with the payment process.`;
    } else {
      message = `Salam Mastery Academy, mujhe ${course.title.ur} course ${course.promoPricePKR} mein buy karna hai. Kindly payment ka tareeqa bata dein.`;
    }
  }

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}
