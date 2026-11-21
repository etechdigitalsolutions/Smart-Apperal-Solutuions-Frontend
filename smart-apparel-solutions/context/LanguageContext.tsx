"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type Language = "en" | "si" | "ta";

const translations = {
  en: {
    home: "Home", categories: "Categories", search: "Search", cart: "Cart", account: "Account",
    wishlist: "Wishlist", explore: "Explore equipment",
  },
  si: {
    home: "මුල් පිටුව", categories: "කාණ්ඩ", search: "සොයන්න", cart: "බඳුන", account: "ගිණුම",
    wishlist: "පෙලගැස්ම", explore: "උපකරණ බලන්න",
  },
  ta: {
    home: "முகப்பு", categories: "வகைகள்", search: "தேடு", cart: "வண்டி", account: "கணக்கு",
    wishlist: "விருப்பப்பட்டியல்", explore: "உபகரணங்கள்",
  },
} as const;

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: keyof typeof translations.en) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === "undefined") return "en";
    const stored = localStorage.getItem("smart-apparel-language");
    return stored === "en" || stored === "si" || stored === "ta" ? stored : "en";
  });

  const setLanguage = (next: Language) => {
    setLanguageState(next);
    localStorage.setItem("smart-apparel-language", next);
  };

  const t = (key: keyof typeof translations.en) =>
    translations[language][key as keyof typeof translations.en] ?? translations.en[key];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
