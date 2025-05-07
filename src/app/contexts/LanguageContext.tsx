"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type Language = "en" | "fr" | "nl" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);


const translations: Record<Language, Record<string, string>> = {
  en: {
    home: "Home",
    aboutUs: "About Us",
    contact: "Contact",
    startHere: "Start Here",
    
  },
  fr: {
    home: "Accueil",
    aboutUs: "À Propos",
    contact: "Contact",
    startHere: "Commencer Ici",
   
  },
  nl: {
    home: "Home",
    aboutUs: "Over Ons",
    contact: "Contact",
    startHere: "Begin Hier",
   
  },
  ar: {
    home: "الرئيسية",
    aboutUs: "من نحن",
    contact: "اتصل بنا",
    startHere: "ابدأ هنا",
   
  },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {

  const [language, setLanguage] = useState<Language>("en");


  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && ["en", "fr", "nl", "ar"].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split("-")[0];
      if (browserLang === "fr") setLanguage("fr");
      else if (browserLang === "nl") setLanguage("nl");
      else if (browserLang === "ar") setLanguage("ar");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);


  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};


export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
