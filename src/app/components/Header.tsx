"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AlignJustify, Globe } from "lucide-react";
import { useLanguage } from "@/app/contexts/LanguageContext";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) setIsLangMenuOpen(false); // Close language menu when opening main menu
  };

  const toggleLangMenu = () => {
    setIsLangMenuOpen(!isLangMenuOpen);
  };

  const changeLanguage = (lang: "en" | "fr" | "nl" | "ar") => {
    setLanguage(lang);
    setIsLangMenuOpen(false);
  };

  return (
    <header className="my-2 backdrop-blur-xs bg-black/50 text-white fixed z-50 w-full shadow-md font-alef ">
      <div className="container mx-auto flex items-center justify-between px-4 ">
        <div className="flex items-center my-3">
          {" "}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/R (4).png"
              alt="Reflekta Logo"
              width={42}
              height={42}
              className="rounded-full"
            />
            <span className="text-2xl font-semibold text-white">Reflekta</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          {/* Language Selector for Mobile */}
          <div className="relative mr-4">
            <button
              className="p-2 flex items-center"
              onClick={toggleLangMenu}
              aria-label="Select language"
            >
              <Globe className="w-5 h-5" />
              <span className="ml-1 uppercase">{language}</span>
            </button>

            {isLangMenuOpen && (
              <div className="absolute right-0 mt-2 py-2 w-28 bg-black/80 rounded shadow-lg z-50">
                <button
                  className={`block px-4 py-2 text-sm w-full text-left ${
                    language === "en" ? "bg-white/20" : ""
                  }`}
                  onClick={() => changeLanguage("en")}
                >
                  English
                </button>
                <button
                  className={`block px-4 py-2 text-sm w-full text-left ${
                    language === "fr" ? "bg-white/20" : ""
                  }`}
                  onClick={() => changeLanguage("fr")}
                >
                  Français
                </button>
                <button
                  className={`block px-4 py-2 text-sm w-full text-left ${
                    language === "nl" ? "bg-white/20" : ""
                  }`}
                  onClick={() => changeLanguage("nl")}
                >
                  Nederlands
                </button>
                <button
                  className={`block px-4 py-2 text-sm w-full text-left ${
                    language === "ar" ? "bg-white/20" : ""
                  }`}
                  onClick={() => changeLanguage("ar")}
                >
                  العربية
                </button>
              </div>
            )}
          </div>

          <button className="p-2" onClick={toggleMenu} aria-label="Toggle menu">
            <AlignJustify />
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex md:items-center">
          <Link
            href="/"
            className="mr-4 text-lg hover:text-pink transition-colors text-shadow-sm"
          >
            {t("home")}
          </Link>
          <Link
            href="/about"
            className="mr-4 text-lg hover:text-pink transition-colors text-shadow-sm"
          >
            {t("aboutUs")}
          </Link>
          <Link
            href="/contact"
            className="text-lg hover:text-pink  transition-colors text-shadow-sm"
          >
            {t("contact")}
          </Link>
        </div>

        <div className="md:flex md:items-center hidden">
          <Link
            href="/community-hub"
            className="mr-6 text-lg hover:text-pink  transition-colors text-shadow-sm"
          >
            {t("startHere")}
          </Link>

          {/* Language Selector for Desktop */}
          <div className="relative">
            <button
              className="p-2 flex items-center hover:text-pink  transition-colors"
              onClick={toggleLangMenu}
              aria-label="Select language"
            >
              <Globe className="w-5 h-5" />
              <span className="ml-1 uppercase">{language}</span>
            </button>

            {isLangMenuOpen && (
              <div className="absolute py-2 w-36 bg-black/80 rounded shadow-lg z-50">
                <button
                  className={`block px-4 py-2 text-sm w-full text-left hover:bg-white/10 ${
                    language === "en" ? "bg-white/20" : ""
                  }`}
                  onClick={() => changeLanguage("en")}
                >
                  English
                </button>
                <button
                  className={`block px-4 py-2 text-sm w-full text-left hover:bg-white/10 ${
                    language === "fr" ? "bg-white/20" : ""
                  }`}
                  onClick={() => changeLanguage("fr")}
                >
                  Français
                </button>
                <button
                  className={`block px-4 py-2 text-sm w-full text-left hover:bg-white/10 ${
                    language === "nl" ? "bg-white/20" : ""
                  }`}
                  onClick={() => changeLanguage("nl")}
                >
                  Nederlands
                </button>
                <button
                  className={`block px-4 py-2 text-sm w-full text-left hover:bg-white/10 ${
                    language === "ar" ? "bg-white/20" : ""
                  }`}
                  onClick={() => changeLanguage("ar")}
                >
                  العربية
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="flex flex-col space-y-4 p-4 text-white rounded">
            <Link href="/" className="hover:text-pink  transition-colors">
              {t("home")}
            </Link>
            <Link href="/about" className="hover:text-pink  transition-colors">
              {t("aboutUs")}
            </Link>
            <Link
              href="/contact"
              className="hover:text-pink  transition-colors"
            >
              {t("contact")}
            </Link>
            <Link
              href="/community-hub"
              className="hover:text-pink  transition-colors"
            >
              {t("startHere")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
