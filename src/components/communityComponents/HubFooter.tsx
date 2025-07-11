import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

const HubFooter = () => (
  <footer className="bg-gradient-to-br from-[#553a5c]/90 to-[#937195]/90 text-white pt-12 font-alef relative overflow-hidden">
    <div className="container mx-auto px-4 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12">
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-semibold mb-4">Reflekta</h3>
          <p className="text-white/80 text-xl md:text-3xl">
            One World, Many Reflection
          </p>
        </div>

        <div className="text-center md:text-left">
          <h4 className="font-medium mb-4">Quick Links</h4>
          <ul className="space-y-3 text-sm text-white/80">
            <li>
              <Link
                href="/"
                className="hover:text-[#553a5c] transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-[#553a5c] transition-colors duration-200"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-[#553a5c] transition-colors duration-200"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="hover:text-[#553a5c] transition-colors duration-200"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        <div className="text-center md:text-left">
          <Link
            href="/community-hub"
            className="hover:text-[#553a5c] transition-colors duration-200"
          >
            <h4 className="font-medium mb-4">Community Hub</h4>
          </Link>

          <ul className="space-y-3 text-sm text-white/80">
            <li>
              <Link
                href="/community-hub/events"
                className="hover:text-[#553a5c] transition-colors duration-200"
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                href="/community-hub/help"
                className="hover:text-[#553a5c] transition-colors duration-200"
              >
                Give and Get Help
              </Link>
            </li>
            <li>
              <Link
                href="/community-hub/stories"
                className="hover:text-[#553a5c] transition-colors duration-200"
              >
                Stories
              </Link>
            </li>
            <li>
              <Link
                href="/community-hub/legal"
                className="hover:text-[#553a5c] transition-colors duration-200"
              >
                Legal FAQs
              </Link>
            </li>
          </ul>
        </div>

        <div className="text-center md:text-left">
          <h4 className="font-medium mb-4">Connect</h4>
          <div className="flex justify-center md:justify-start space-x-6 mb-4">
            <a
              href="#"
              className="text-white/80 hover:text-[#553a5c] transition-colors duration-200"
            >
              <Facebook size={24} />
            </a>
            <a
              href="#"
              className="text-white/80 hover:text-[#553a5c] transition-colors duration-200"
            >
              <Instagram size={24} />
            </a>
            <a
              href="#"
              className="text-white/80 hover:text-[#553a5c] transition-colors duration-200"
            >
              <Twitter size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>

    <div className="border-t border-white/20 py-6 text-center">
      <p className="text-sm md:text-base text-white/60">
        &copy; {new Date().getFullYear()} Reflekta. All rights reserved.
      </p>
    </div>
  </footer>
);

export default HubFooter;
