"use client";

import { FaChevronDown } from "react-icons/fa";
import { useLanguage } from "@/app/contexts/LanguageContext";

export default function ArrowButton() {
  const { t } = useLanguage();

  const scrollToAbout = () => {
    document
      .getElementById("web-sections")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="overflow-hidden w-full h-20 flex items-center justify-center"
      onClick={scrollToAbout}
    >
      <div className="w-150 aspect-square bg-black/60 text-white rounded-full absolute -bottom-1/2 left-1/2 transform -translate-x-1/2 cursor-pointer flex flex-col items-center pt-8 shadow-[0_0_25px_rgba(0,0,0,0.5)]">
        <span className="font-medium text-lg text-center px-8 block max-w-xs text-shadow-lg drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
          {t("joinUs")}
        </span>
        <FaChevronDown className="mt-3 animate-bounce text-xl drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]" />
      </div>
    </div>
  );
}
