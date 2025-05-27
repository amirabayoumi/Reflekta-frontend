"use client";

import Image from "next/image";
import ArrowButton from "@/components/ArrowButton";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "../components/Footer";
import Carousel3D from "../components/Carousel3D";

export default function Home() {
  const { t } = useLanguage();

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
            <h1 className="text-white text-8xl drop-shadow-[0_8px_8px_rgba(0,0,0,0.8)] font-bold">
              {t("reflektaTitle")}
            </h1>
            <p className="text-white text-2xl mt-4 drop-shadow-[0_4px_4px_rgba(0,0,0,0.7)] mb-5">
              {t("reflektaDescription")}
            </p>

            <Link
              className="bg-pink text-black px-4 py-2 rounded-full mt-4"
              href="/community-hub"
            >
              Join the Community
            </Link>
          </div>

          <ArrowButton />

          {/* Add LoginForm modal */}
        </main>
      </div>
      <section id="web-sections" className="min-h-screen bg-black p-8">
        <h2 className="text-4xl text-pink mt-15 text-center font-alef">
          One world, Many reflections.
        </h2>
        <p className="text-white text-2xl mt-4 text-center font-alef">
          Connect Through Our Sections
        </p>

        <div className=" flex flex-col items-center">
          <div className="w-full max-w-4xl h-200">
            {" "}
            <Carousel3D />
          </div>

          <div className="flex justify-center space-x-8 mt-6"></div>
        </div>
      </section>{" "}
      <Footer />
    </>
  );
}
