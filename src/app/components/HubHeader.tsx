import Link from "next/link";
import Image from "next/image";

const Header = () => {
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
          <span className="text-2xl font-semibold text-[#553a5c]">Reflekta</span>
        </Link>

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
        </nav>

        <div className="flex items-center">
          <button
            type="button"
            className="bg-[#886f80] text-white px-5 py-2.5 rounded-lg hover:bg-[#553a5c] transition-colors font-medium text-sm"
          >
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

