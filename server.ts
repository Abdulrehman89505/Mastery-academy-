import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();
const PORT = 3000;

// Security Middleware: Hide powered-by header & set security HTTP headers
app.disable("x-powered-by");

app.use(
  helmet({
    contentSecurityPolicy: false, // Disabled CSP header to allow Vite dev scripts & iframe embeds
    crossOriginEmbedderPolicy: false,
    frameguard: { action: "sameorigin" },
  })
);

// Strict body parsing limit to prevent JSON payload bomb attacks
app.use(express.json({ limit: "10kb" }));

// Rate Limiter for AI Chat endpoint to prevent brute-force or API quota abuse
const chatRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // Limit each IP to 30 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many chat requests from this IP. Please try again after 15 minutes.",
  },
});

// Helper function to sanitize input strings against basic script injection / XSS
function sanitizeString(input: string): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/script/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/onerror=/gi, "")
    .replace(/onload=/gi, "")
    .trim();
}

// Lazy-initialized Gemini AI client
let genAI: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!genAI && process.env.GEMINI_API_KEY) {
    genAI = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return genAI;
}

// AI Chatbot endpoint for Mastery Academy support
app.post("/api/chat", chatRateLimiter, async (req, res) => {
  try {
    const rawMessage = req.body?.message;
    const rawLanguage = req.body?.language;

    if (!rawMessage || typeof rawMessage !== "string") {
      return res.status(400).json({ error: "Message is required and must be a string." });
    }

    // Input Sanitization & Length Cap Defense
    const message = sanitizeString(rawMessage).slice(0, 1000);
    const language = rawLanguage === "ur" ? "ur" : "en";

    if (!message) {
      return res.status(400).json({ error: "Invalid message payload." });
    }

    const ai = getGenAI();

    // System prompt instructing the AI on Mastery Academy facts, pricing, and languages
    const systemInstruction = `You are "Mastery AI", the official virtual admissions and course advisor for Mastery Academy.
Mastery Academy is a premier digital learning platform offering practical step-by-step training in e-commerce and AI technology.

Official Course Catalog & Pricing (Limited Time 50% OFF):
1. Amazon FBA Wholesale Model
   - Promo Price: PKR 2,000 (Original Price: PKR 4,000 - 50% OFF)
   - Description: Master product sourcing, supplier validation, product hunting, brand approval, and inventory management for Amazon FBA Wholesale.
2. Shopify Online Store Mastery
   - Promo Price: PKR 1,700 (Original Price: PKR 3,400 - 50% OFF)
   - Description: Build, launch, product research, theme customization, payment gateway, and scale a profitable e-commerce store on Shopify from scratch.
3. Web Development, AI Agents & Chatbots
   - Promo Price: PKR 1,500 (Original Price: PKR 3,000 - 50% OFF)
   - Description: Build modern responsive websites, custom AI chatbots, neural voice agents, and integrate them into websites or platforms like WhatsApp/Telegram.

Enrollment & Payment:
- Primary method: Direct WhatsApp Enrollment for instant access and local payment support (EasyPaisa/JazzCash/Bank Transfer).
- WhatsApp Support / Enrollment Helpline: +92 3378204856
- All courses are taught step-by-step with practical hands-on projects, lifetime access, and dedicated 1-on-1 WhatsApp mentorship.

User Language Setting: ${language === "ur" ? "Roman Urdu (e.g., Salam, main aap ki madad kar sakta hoon)" : "English"}.
Respond in the specified language (${language === "ur" ? "Roman Urdu" : "English"}). Keep your answers helpful, friendly, concise, and encourage enrolling or reaching out on WhatsApp at +92 3378204856.`;

    if (!ai) {
      // Fallback response if GEMINI_API_KEY is not configured
      const fallbackUr = `Salam! Main Mastery Academy AI Advisor hoon. Main aap ko batana chahta hoon ke hamare tamaam courses (Amazon FBA Wholesale PKR 2000, Shopify Mastery PKR 1700, Web Dev & AI Agents PKR 1500) par 50% OFF chal raha hai. Aap humein Direct WhatsApp +92 3378204856 par message karke instantly enroll ho sakte hain!`;
      const fallbackEn = `Hello! I am the Mastery Academy AI Advisor. Currently all our practical courses (Amazon FBA Wholesale @ PKR 2,000, Shopify Mastery @ PKR 1,700, Web Dev & AI Agents @ PKR 1,500) are at 50% OFF. You can instantly enroll or ask questions on WhatsApp at +92 3378204856!`;

      return res.json({
        reply: language === "ur" ? fallbackUr : fallbackEn,
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: [
        {
          role: "user",
          parts: [
            { text: `${systemInstruction}\n\nUser Question: ${message}` }
          ],
        },
      ],
      config: {
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    });

    const replyText = response.text || (language === "ur" 
      ? "Ji, hum aap ko complete step-by-step sikhate hain. WhatsApp +92 3378204856 par rabta karein!"
      : "Yes, we guide you step-by-step. Contact us on WhatsApp at +92 3378204856!");

    return res.json({ reply: replyText });
  } catch (err: any) {
    console.error("Error in /api/chat:", err);
    return res.json({
      reply: req.body?.language === "ur"
        ? "Shukriya aap ke nawazish ka! E-Commerce aur AI Agent courses ki details lene ke liye direct WhatsApp karein: +92 3378204856"
        : "Thank you for reaching out! For instant enrollment or details, chat with us directly on WhatsApp: +92 3378204856"
    });
  }
});

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", app: "Mastery Academy" });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Mastery Academy server running on http://localhost:${PORT}`);
  });
}

startServer();
