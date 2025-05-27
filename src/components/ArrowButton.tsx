"use client";

import { FaChevronDown } from "react-icons/fa";

import { useState, useEffect } from "react";

export default function ArrowButton() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hide arrow when scrolled down more than 100px
      if (window.scrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    };
    handleScroll(); // Initial check on mount
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <div
        className={`fixed bottom-10 left-1/2 transform -translate-x-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full 
                 bg-pink hover:bg-opacity-80 flex items-center justify-center shadow-lg
                 transition-all duration-300 z-50 animate-bounce
                 ${visible ? "opacity-90" : "opacity-0 pointer-events-none"}`}
        aria-label="Scroll down"
      >
        <FaChevronDown className="mt-3 animate-bounce text-xl drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]" />
      </div>
    </div>
  );
}
