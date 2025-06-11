import Image from "next/image";
import ArrowButton from "@/components/homeComponents/ArrowButton";
import Link from "next/link";
import Header from "@/components/homeComponents/Header";
import Footer from "../components/homeComponents/Footer";
import Carousel3D from "../components/homeComponents/Carousel3D";

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
            <h1 className="text-white text-8xl drop-shadow-[0_8px_8px_rgba(0,0,0,0.8)] font-bold">
              Reflekta
            </h1>
            <p className="text-white text-2xl mt-4 drop-shadow-[0_4px_4px_rgba(0,0,0,0.7)] mb-5">
              A platform for sharing, connecting, and reflecting together.
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
