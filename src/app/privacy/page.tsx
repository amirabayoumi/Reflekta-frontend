import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <main className="bg-gradient-to-br from-purple to-black font-alef text-white min-h-screen">
        <section className="max-w-4xl mx-auto px-6 py-16">
          <h1 className="text-4xl font-bold mb-8 text-center mt-6">
            Privacy Policy
          </h1>
          <p className="mb-6 text-beige/80">
            At Reflekta, your privacy is important to us. This Privacy Policy
            explains how we collect, use, and protect your personal information
            when you use our website.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">
            1. Information We Collect
          </h2>
          <ul className="list-disc list-inside mb-6 text-beige/70">
            <li>
              <strong>Personal Information:</strong> When you register, contact
              us, or participate in our community, we may collect your name,
              email address, and other information you provide.
            </li>
            <li>
              <strong>Usage Data:</strong> We collect information about how you
              use our website, such as pages visited, time spent, and device
              information.
            </li>
          </ul>
          <h2 className="text-2xl font-semibold mt-8 mb-4">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc list-inside mb-6 text-beige/70">
            <li>To provide and improve our services.</li>
            <li>To communicate with you about updates, events, or support.</li>
            <li>To ensure the security and integrity of our platform.</li>
          </ul>
          <h2 className="text-2xl font-semibold mt-8 mb-4">
            3. Sharing Your Information
          </h2>
          <p className="mb-6 text-beige/70">
            We do not sell or rent your personal information. We may share
            information with trusted service providers who help us operate our
            website, or if required by law.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Cookies</h2>
          <p className="mb-6 text-beige/70">
            We use cookies and similar technologies to enhance your experience.
            You can control cookies through your browser settings.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Your Rights</h2>
          <p className="mb-6 text-beige/70">
            You have the right to access, update, or delete your personal
            information. Contact us at{" "}
            <a
              href="mailto:reflekta.info@gmail.com"
              className="underline text-beige"
            >
              reflekta.info@gmail.com
            </a>{" "}
            for any privacy-related requests.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">
            6. Changes to This Policy
          </h2>
          <p className="mb-6 text-beige/70">
            We may update this Privacy Policy from time to time. Changes will be
            posted on this page with an updated effective date.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Contact Us</h2>
          <p className="mb-6 text-beige/70">
            If you have any questions about this Privacy Policy, please contact
            us at{" "}
            <a
              href="mailto:reflekta.info@gmail.com"
              className="underline text-beige"
            >
              reflekta.info@gmail.com
            </a>
            .
          </p>
          <p className="text-xs text-beige/50 mt-12 text-center">
            Effective Date: June 2024
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
