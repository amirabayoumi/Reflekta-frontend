"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import LoginForm from "./LoginForm";
import { fetchUserData } from "@/queries";
import type { UserData } from "@/types";

const HubHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShowLogin, setIsShowLogin] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Logout handler: remove token and update user state
  const handleLogout = () => {
    // Remove the token cookie by setting it to expired
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUser(null);
    setShowLogoutConfirm(false);
  };

  useEffect(() => {
    let lastToken = "";
    let intervalId: NodeJS.Timeout;

    const checkTokenChange = () => {
      const currentToken =
        document.cookie.match(/(?:^|;\s*)token=([^;]*)/)?.[1] || "";
      if (currentToken !== lastToken) {
        lastToken = currentToken;
        fetchUserData().then(setUser);
      }
    };

    fetchUserData().then(setUser);

    // eslint-disable-next-line prefer-const
    intervalId = setInterval(checkTokenChange, 1000);

    return () => clearInterval(intervalId);
  }, []);

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

          {/* Sign In, Dashboard, or Logout */}
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="bg-[#886f80] text-white px-5 py-2.5 rounded-lg hover:bg-[#553a5c] transition-colors font-medium text-sm"
              >
                View Dashboard
              </Link>
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="ml-4 bg-gray-200 text-[#553a5c] px-5 py-2.5 rounded-lg hover:bg-gray-300 transition-colors font-medium text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsShowLogin(true)}
              className="bg-[#886f80] text-white px-5 py-2.5 rounded-lg hover:bg-[#553a5c] transition-colors font-medium text-sm"
            >
              Sign In or Register
            </button>
          )}
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

            {/* Mobile Sign In, Dashboard, or Logout */}
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="w-full px-4 py-2 rounded-full text-white text-left"
                  style={{ backgroundColor: "#886f80" }}
                >
                  View Dashboard
                </Link>
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="w-full mt-2 px-4 py-2 rounded-full text-[#553a5c] bg-gray-200 text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsShowLogin(true)}
                className="w-full px-4 py-2 rounded-full text-white text-left"
                style={{ backgroundColor: "#886f80" }}
              >
                Sign In or Register
              </button>
            )}
          </div>
        </div>
      )}

      {/* Logout confirmation popup */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-xs w-full text-center border border-[#886f80]/30">
            <h2 className="text-lg font-bold text-[#553a5c] mb-4">
              Log out of your account?
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to log out? You will need to sign in again
              to access your dashboard.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-[#886f80] to-[#553a5c] text-white px-5 py-2 rounded-full font-semibold shadow hover:from-[#553a5c] hover:to-[#886f80] transition-all"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="bg-gray-100 text-[#553a5c] px-5 py-2 rounded-full font-semibold border border-[#886f80]/30 hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
            </div>
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
