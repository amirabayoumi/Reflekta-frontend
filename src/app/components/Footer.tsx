import React from "react";
import Link from "next/link";
import { Facebook } from "lucide-react";
import { Twitter } from "lucide-react";
import { Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-12 font-alef relative overflow-hidden">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Update grid for better small screen layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12">
          {/* Center align on mobile */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-semibold mb-4">Reflekta</h3>
            <p className="text-white/80 text-xl md:text-3xl">
              One World, Many Reflection
            </p>
          </div>

          {/* Make all sections centered on mobile */}
          <div className="text-center md:text-left">
            <h4 className="font-medium mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li>
                <Link
                  href="/"
                  className="hover:text-[#bca6c9] transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#bca6c9] transition-colors duration-200"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#bca6c9] transition-colors duration-200"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-[#bca6c9] transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="font-medium mb-4">Community</h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li>
                <Link
                  href="/community-hub/events"
                  className="hover:text-[#bca6c9] transition-colors duration-200"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/community-hub/jobs"
                  className="hover:text-[#bca6c9] transition-colors duration-200"
                >
                  Jobs Board
                </Link>
              </li>
              <li>
                <Link
                  href="/community-hub/stories"
                  className="hover:text-[#bca6c9] transition-colors duration-200"
                >
                  Stories
                </Link>
              </li>
              <li>
                <Link
                  href="/community-hub/legal-faq"
                  className="hover:text-[#bca6c9] transition-colors duration-200"
                >
                  Legal FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="font-medium mb-4">Connect</h4>
            {/* Center social icons on mobile */}
            <div className="flex justify-center md:justify-start space-x-6 mb-4">
              <a
                href="#"
                className="text-white/80 hover:text-[#bca6c9] transition-colors duration-200"
              >
                <Facebook size={24} />
              </a>
              <a
                href="#"
                className="text-white/80 hover:text-[#bca6c9] transition-colors duration-200"
              >
                <Instagram size={24} />
              </a>
              <a
                href="#"
                className="text-white/80 hover:text-[#bca6c9] transition-colors duration-200"
              >
                <Twitter size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section - Made more prominent */}
      <div className="border-t border-gray-800 py-6 text-center">
        <p className="text-sm md:text-base text-white/60">
          © 2023 Reflekta. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
