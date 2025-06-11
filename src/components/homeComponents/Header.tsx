"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AlignJustify, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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

        {/* Mobile Menu Button - Updated to toggle between hamburger and X */}
        <div className="md:hidden flex items-center">
          <button
            className="p-2"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <AlignJustify size={24} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex md:items-center">
          <Link
            href="/"
            className="mr-4 text-lg hover:text-pink transition-colors text-shadow-sm"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="mr-4 text-lg hover:text-pink transition-colors text-shadow-sm"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="text-lg hover:text-pink  transition-colors text-shadow-sm"
          >
            Contact
          </Link>
        </div>

        <div className="md:flex md:items-center hidden">
          <Link
            href="/community-hub"
            className="mr-6 text-lg hover:text-pink  transition-colors text-shadow-sm"
          >
            Start Here
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="flex flex-col space-y-4 p-4 text-white rounded">
            <Link href="/" className="hover:text-pink  transition-colors">
              Home
            </Link>
            <Link href="/about" className="hover:text-pink  transition-colors">
              About Us
            </Link>
            <Link
              href="/contact"
              className="hover:text-pink  transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/community-hub"
              className="hover:text-pink  transition-colors"
            >
              Start Here
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
