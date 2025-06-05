import React from "react";
import ContactForm from "../../components/ContactForm";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosPin } from "react-icons/io";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Reflekta - Contact",
  description: "Contact Reflekta",
  openGraph: {
    title: "Reflekta - Contact",
    description: "Get in touch with Reflekta",
    siteName: "Reflekta",
    images: [
      {
        url: "https://res.cloudinary.com/djuqnuesr/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1746640579/R_4_jz8tja.png",
        width: 1000,
        height: 1000,
        alt: "Contact Reflekta",
      },
    ],
  },
};
export default function Contact() {
  return (
    <>
      <Header />
      <main className="bg-gradient-to-br from-purple to-black font-alef text-white">
        <section className="min-h-screen px-6 py-12 md:px-12">
          <div className="mt-25 grid grid-cols-1 gap-12 md:grid-cols-2 max-w-7xl mx-auto place-self-center">
            <div className="flex flex-col justify-center items-center text-center md:items-start md:text-left">
              <h1 className="text-5xl font-bold mb-4 text-white">
                Get in Touch with Us
              </h1>
              <p className="text-lg text-beige/60 mb-10 max-w-md">
                We’d love to hear from you, whether it’s to collaborate, ask
                questions, or just say hi.
              </p>

              <div className="text-beige bg-gray-200/10 p-6 rounded-xl shadow-xl space-y-6 w-full max-w-md">
                <div className="flex items-center">
                  <MdEmail className="h-6 w-6  mr-3" />

                  <p>reflekta.info@gmail.com</p>
                </div>

                <div className="flex items-center">
                  <FaPhoneAlt className="h-6 w-6  mr-3" />

                  <p>+32 123 456 789</p>
                </div>

                <div className="flex items-center">
                  <IoIosPin className="h-6 w-6  mr-3" />

                  <p>123 Main Street, Antwerp, Belgium</p>
                </div>
              </div>
            </div>

            <div className="md:max-w-[500px] ">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
