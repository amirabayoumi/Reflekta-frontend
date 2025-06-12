"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import LoginForm from "@/components/LoginForm";
import { useAuth } from "@/hooks/useAuth"; // Replace fetchUserData with useAuth

const HubHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShowLogin, setIsShowLogin] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Use auth context instead of local state and API calls
  const { user, logout } = useAuth();

  // Updated logout handler that uses auth context
  const handleLogout = () => {
    logout();
    setShowLogoutConfirm(false);
  };

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
        <nav className="hidden lg:flex items-center space-x-10">
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
                className="bg-gradient-to-r from-[#886f80] to-[#553a5c] text-white px-5 py-2.5 rounded-full font-medium text-sm shadow hover:from-[#553a5c] hover:to-[#886f80] transition-all"
              >
                View Dashboard
              </Link>
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="ml-4 bg-white text-[#553a5c] px-5 py-2.5 rounded-full font-semibold text-sm shadow hover:bg-gray-200 transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsShowLogin(true)}
              className="bg-gradient-to-r from-[#886f80] to-[#553a5c] text-white px-5 py-2.5 rounded-full font-medium text-sm shadow hover:from-[#553a5c] hover:to-[#886f80] transition-all"
            >
              Sign In or Register
            </button>
          )}
        </nav>

        {/* Mobile menu button */}
        <button
          className="lg:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 mt-2 flex justify-center items-center">
          <div className="flex flex-col space-y-4 p-4 text-[#553a5c] rounded items-center w-full max-w-xs">
            <Link href="/" className="hover:text-pink transition-colors">
              Home
            </Link>
            <Link href="/contact" className="hover:text-pink transition-colors">
              Contact
            </Link>
            <Link href="/about" className="hover:text-pink transition-colors">
              About Us
            </Link>
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="w-full px-4 py-2 rounded-full text-white text-center bg-gradient-to-r from-[#886f80] to-[#553a5c] font-medium shadow hover:from-[#553a5c] hover:to-[#886f80] transition-all"
                >
                  View Dashboard
                </Link>
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="mt-2 px-4 py-2 rounded-full bg-white text-[#553a5c] text-center font-semibold shadow-lg hover:bg-gray-100 transition-all inline-block cursor-pointer w-full"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsShowLogin(true)}
                className="w-full px-4 py-2 rounded-full text-white text-center bg-gradient-to-r from-[#886f80] to-[#553a5c] font-medium shadow hover:from-[#553a5c] hover:to-[#886f80] transition-all"
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
