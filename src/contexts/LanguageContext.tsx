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

// Translation dictionaries
const translations: Record<Language, Record<string, string>> = {
  en: {
    home: "Home",
    aboutUs: "About Us",
    contact: "Contact",
    startHere: "Start Here",
    joinUs: "Join us to connect and celebrate diversity.",
    reflektaTitle: "Reflekta",
    reflektaDescription:
      "Our space is a cultural bridge, a place where local communities and newcomers in Belgium connect, share, and grow together.",
    signUpNow: "Sign Up Now",
    aboutReflekta: "About Reflekta",
    aboutText1:
      "Reflekta is a community initiative designed to bring together local Belgian communities and newcomers in a space of mutual respect and understanding.",
    aboutText2:
      "Through cultural exchange, shared experiences, and meaningful connections, we aim to break down barriers and foster a sense of belonging for everyone.",
    aboutText3:
      "Our programs include cultural workshops, language exchanges, community dinners, and collaborative projects that celebrate the diversity that makes our community unique.",
  },
  fr: {
    home: "Accueil",
    aboutUs: "À Propos",
    contact: "Contact",
    startHere: "Commencer Ici",
    joinUs: "Rejoignez-nous pour vous connecter et célébrer la diversité.",
    reflektaTitle: "Reflekta",
    reflektaDescription:
      "Notre espace est un pont culturel, un lieu où les communautés locales et les nouveaux arrivants en Belgique se connectent, partagent et grandissent ensemble.",
    signUpNow: "Inscrivez-vous",
    aboutReflekta: "À Propos de Reflekta",
    aboutText1:
      "Reflekta est une initiative communautaire conçue pour rassembler les communautés belges locales et les nouveaux arrivants dans un espace de respect mutuel et de compréhension.",
    aboutText2:
      "Grâce aux échanges culturels, aux expériences partagées et aux connexions significatives, nous visons à briser les barrières et à favoriser un sentiment d'appartenance pour tous.",
    aboutText3:
      "Nos programmes comprennent des ateliers culturels, des échanges linguistiques, des dîners communautaires et des projets collaboratifs qui célèbrent la diversité qui rend notre communauté unique.",
  },
  nl: {
    home: "Home",
    aboutUs: "Over Ons",
    contact: "Contact",
    startHere: "Begin Hier",
    joinUs: "Doe met ons mee om verbinding te maken en diversiteit te vieren.",
    reflektaTitle: "Reflekta",
    reflektaDescription:
      "Onze ruimte is een culturele brug, een plek waar lokale gemeenschappen en nieuwkomers in België samenkomen, delen en samen groeien.",
    signUpNow: "Schrijf je nu in",
    aboutReflekta: "Over Reflekta",
    aboutText1:
      "Reflekta is een gemeenschapsinitiatief ontworpen om lokale Belgische gemeenschappen en nieuwkomers samen te brengen in een ruimte van wederzijds respect en begrip.",
    aboutText2:
      "Door culturele uitwisseling, gedeelde ervaringen en betekenisvolle verbindingen streven we ernaar om barrières te doorbreken en een gevoel van saamhorigheid voor iedereen te bevorderen.",
    aboutText3:
      "Onze programma's omvatten culturele workshops, taaluitwisselingen, gemeenschapsdiners en samenwerkingsprojecten die de diversiteit vieren die onze gemeenschap uniek maakt.",
  },
  ar: {
    home: "الرئيسية",
    aboutUs: "من نحن",
    contact: "اتصل بنا",
    startHere: "ابدأ هنا",
    joinUs: "انضم إلينا للتواصل والاحتفال بالتنوع.",
    reflektaTitle: "ريفلكتا",
    reflektaDescription:
      "مساحتنا هي جسر ثقافي، مكان حيث تتواصل المجتمعات المحلية والقادمون الجدد في بلجيكا، ويتشاركون وينمون معًا.",
    signUpNow: "سجّل الآن",
    aboutReflekta: "نبذة عن ريفلكتا",
    aboutText1:
      "ريفلكتا هي مبادرة مجتمعية تهدف إلى الجمع بين المجتمعات البلجيكية المحلية والوافدين الجدد في مساحة من الاحترام المتبادل والتفاهم.",
    aboutText2:
      "من خلال التبادل الثقافي والتجارب المشتركة والعلاقات الهادفة، نسعى إلى كسر الحواجز وتعزيز الشعور بالانتماء للجميع.",
    aboutText3:
      "تشمل برامجنا ورش عمل ثقافية وتبادل لغوي وعشاءات جماعية ومشاريع تعاونية تحتفي بالتنوع الذي يجعل مجتمعنا فريدًا.",
  },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Use browser preferred language or default to English
  const [language, setLanguage] = useState<Language>("en");

  // Persist language choice in localStorage
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
      // Default is already "en"
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
