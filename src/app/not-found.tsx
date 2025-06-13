import Link from "next/link";
import Header from "../components/homeComponents/Header";
import Footer from "../components/homeComponents/Footer";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen font-alef bg-plum">
      <Header />

      <main className="flex-grow flex items-center justify-center px-4 mt-20">
        <div className="bg-card rounded-lg shadow-lg p-8 text-center max-w-md w-full border border-border">
          {/* 404 Number */}
          <h2 className="text-6xl font-bold text-plum mb-4">404</h2>

          <h3 className="text-2xl font-semibold mb-4 text-foreground">
            Page Not Found
          </h3>

          <p className="text-muted-foreground mb-6">
            The page you&apos;re looking for doesn&apos;t exist.
          </p>

          <Link
            href="/"
            className="inline-block px-6 py-2 bg-plum text-white rounded hover:bg-purple transition-colors font-medium"
          >
            Return Home
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
