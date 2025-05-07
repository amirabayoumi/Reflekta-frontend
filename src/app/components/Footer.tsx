import React from "react";
import Link from "next/link";
import { Facebook } from "lucide-react";
import { Twitter } from "lucide-react";
import { Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white  w-full font-alef">
      <div className="container mx-auto p-4 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 text-center md:text-left">
          <div className="mx-auto md:mx-0 max-w-sm">
            <h3 className="text-4xl font-bold mb-3">Reflekta</h3>
            <p className="mb-4 text-2xl md:text-3xl">
              One world, Many reflections.
            </p>
          </div>
          <div className="mx-auto md:mx-0">
            <h3 className="text-xl font-bold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="hover:text-pink transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-pink transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="mx-auto md:mx-0">
            <h3 className="text-xl font-bold mb-3">Connect</h3>
            <div className="flex space-x-4 justify-center md:justify-start">
              <a
                href="#"
                aria-label="Facebook"
                className="hover:text-pink transition-colors"
              >
                <Facebook />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="hover:text-pink transition-colors"
              >
                <Twitter />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-pink transition-colors"
              >
                <Instagram />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-6 md:mt-8 border-t border-gray-700 pt-4 text-center">
          <p>
            &copy; {new Date().getFullYear()} Reflekta. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
