"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import LoginForm from "./LoginForm";

const HubHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShowLogin, setIsShowLogin] = useState(false);

  return (
    <header className="bg-white shadow-md py-3">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="/R (4).png"
            alt="Reflekta Logo"
            width={42}
            height={42}
            className="rounded-full"
          />
          <span className="text-2xl font-semibold text-[#553a5c]">
            Reflekta
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          <Link
            href="/"
            className="text-gray-700 hover:text-[#553a5c] font-medium text-lg"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-gray-700 hover:text-[#553a5c] font-medium text-lg"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="text-gray-700 hover:text-[#553a5c] font-medium text-lg"
          >
            Contact
          </Link>

          {/* Sign In button */}
          <button
            onClick={() => setIsShowLogin(true)}
            className="bg-[#886f80] text-white px-5 py-2.5 rounded-lg hover:bg-[#553a5c] transition-colors font-medium text-sm"
          >
            Sign In
          </button>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto py-4 px-4 space-y-4">
            <Link href="/" className="block text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link
              href="/contact"
              className="block text-gray-700 hover:text-gray-900"
            >
              Contact
            </Link>
            <Link
              href="/about"
              className="block text-gray-700 hover:text-gray-900"
            >
              About Us
            </Link>

            {/* Mobile Sign In button */}
            <button
              onClick={() => setIsShowLogin(true)}
              className="w-full px-4 py-2 rounded-full text-white text-left"
              style={{ backgroundColor: "#886f80" }}
            >
              Sign in
            </button>
          </div>
        </div>
      )}

      {/* Login Form */}
      <LoginForm
        isShowLogin={isShowLogin}
        onClose={() => setIsShowLogin(false)}
      />
    </header>
  );
};

export default HubHeader;
