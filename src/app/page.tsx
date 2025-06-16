import Image from "next/image";
import ArrowButton from "@/components/homeComponents/ArrowButton";
import Link from "next/link";
import Header from "@/components/homeComponents/Header";
import Footer from "../components/homeComponents/Footer";
import Carousel3D from "../components/homeComponents/Carousel3D";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Reflekta",
  description: "Reflekta - A Cultural Bridge in Belgium",
  openGraph: {
    title: "Reflekta",
    description: "Reflekta - A Cultural Bridge in Belgium",
    siteName: "Reflekta",
    images: [
      {
        url: "https://res.cloudinary.com/djuqnuesr/image/upload/v1746640579/R_4_jz8tja.png",
        width: 1200,
        height: 630,
        alt: "Reflekta Background",
      },
    ],
  },
};

export default function Home() {
  return (
    <>
      <Header />
      <div className="min-h-screen h-screen w-full relative overflow-hidden font-alef">
        <main className="">
          <div className="w-full h-full absolute -z-10">
            <Image
              src="https://res.cloudinary.com/djuqnuesr/image/upload/q_auto,f_auto,w_1200/mario-purisic-jG1z5o7NCq4-unsplash_cqpwkj.jpg"
              priority
              sizes="100vw"
              alt="Background"
              className="object-cover w-full h-full"
              width={2000}
              height={1200}
            />
          </div>

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <h1 className="text-white text-7xl sm:text-9xl drop-shadow-[0_8px_8px_rgba(0,0,0,0.8)] font-bold">
              Reflekta
            </h1>
            <p className="text-white text-xl sm:text-4xl mt-4 drop-shadow-[0_4px_4px_rgba(0,0,0,0.7)] mb-5">
              Our space is a cultural bridge, a place where local communities
              and newcomers in Belgium connect, share, and grow together.
            </p>

            <Link
              href="/community-hub"
              className="inline-flex items-center gap-2 bg-white opacity-80  text-black font-semibold px-8 py-3 rounded-full mt-4 shadow-xl shadow-[#553a5c]/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#bca6c9]/30 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#bca6c9] focus:ring-offset-2"
            >
              <p>Join the Community</p>
            </Link>
          </div>

          <ArrowButton />
        </main>
      </div>

      <section
        id="web-sections"
        className="hidden sm:block min-h-screen bg-black p-8"
      >
        <h2 className="text-4xl sm:text-5xl text-pink mt-10 text-center font-alef leading-tight">
          <span className="block sm:inline">One world,</span>
          <span className="block sm:inline"> Many reflections.</span>
        </h2>
        <p className="text-white text-xl sm:text-2xl mt-4 text-center font-alef max-w-xl mx-auto">
          Connect Through Our Sections
        </p>

        <div className="flex flex-col items-center">
          <div className="w-full max-w-4xl h-60 sm:h-80 md:h-96">
            <Carousel3D />
          </div>
          <div className="flex justify-center space-x-8 mt-6"></div>
        </div>
      </section>
      <Footer />
    </>
  );
}
