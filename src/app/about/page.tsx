import React from "react";
import Image from "next/image";
import { FaHandHoldingHeart, FaLightbulb, FaUsers } from "react-icons/fa";
import Header from "@/components/homeComponents/Header";
import Footer from "@/components/homeComponents/Footer";
export default function About() {
  return (
    <>
      <Header />
      <main className="bg-gradient-to-br from-purple to-black font-alef text-white">
        <section className="min-h-[50vh] flex items-center px-6 py-12 md:px-12">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 text-center mt-8">
              About Reflekta
            </h1>
            <p className="text-xl text-beige/70 text-center max-w-3xl mx-auto">
              Reflekta is more than a platform, it&apos;s a bridge between
              cultures. We help newcomers and locals in Belgium understand each
              other by celebrating differences, sharing stories, and creating
              real human connection. Because true integration starts with
              empathy.
            </p>
          </div>
        </section>

        <section className="px-6 py-16 md:px-12 bg-white/5 min-h-[50vh] flex items-center">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-items-center">
              {/* Mission Box */}
              <div className="bg-gray-200/10 p-8 rounded-xl text-center h-full w-full max-w-sm flex flex-col items-center justify-between">
                <div className="flex flex-col items-center">
                  <div className="flex justify-center mb-4">
                    <FaHandHoldingHeart className="text-4xl text-beige" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Our Mission</h3>
                </div>
                <p className="text-beige/80">
                  To build a platform that supports cultural exchange, empowers
                  creative expression, and strengthens connections across
                  communities.
                </p>
              </div>

              {/* Vision Box */}
              <div className="bg-gray-200/10 p-8 rounded-xl text-center h-full w-full max-w-sm flex flex-col items-center justify-between">
                <div className="flex flex-col items-center">
                  <div className="flex justify-center mb-4">
                    <FaLightbulb className="text-4xl text-beige" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Our Vision</h3>
                </div>
                <p className="text-beige/80">
                  We envision a world where cultural differences are not
                  barriers but bridges, where stories help us listen better,
                  connect deeper, and grow together.
                </p>
              </div>

              {/* Values Box */}
              <div className="bg-gray-200/10 p-8 rounded-xl text-center h-full w-full max-w-sm flex flex-col items-center justify-between">
                <div className="flex flex-col items-center">
                  <div className="flex justify-center mb-4">
                    <FaUsers className="text-4xl text-beige" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Our Values</h3>
                </div>
                <p className="text-beige/80">
                  Diversity, empathy, creativity, and collaboration guide
                  everything we do online and in real life.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-16 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-beige/70 mb-4">
                  Reflekta was born from a deep need to bridge cultural
                  misunderstandings especially the gap between individualistic
                  and collectivistic values that often define Belgian society
                  and migrant communities. What started as grassroots dialogue
                  has grown into a digital movement.
                </p>
                <p className="text-beige/70 mb-4">
                  We believe that stories are the most powerful way to
                  understand one another. Through shared experiences, we open
                  minds, challenge assumptions, and bring people closer. Every
                  story on Reflekta is a window into a world an invitation to
                  connect.
                </p>
                <p className="text-beige/70">
                  Reflekta continues to grow as a community-powered platform
                  where respect, inclusion, and curiosity guide the journey
                  toward mutual understanding.
                </p>
              </div>
              <div className="relative h-80 w-full rounded-xl overflow-hidden">
                <Image
                  src="https://res.cloudinary.com/djuqnuesr/image/upload/v1746628369/maegan-martin-6nsGg3Iw37c-unsplash_rmkejz.jpg"
                  alt="Reflekta community"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-16 md:px-12 bg-white/5">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center">
              Meet Our Team
            </h2>
            <div className="flex justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl">
                <div className="bg-gray-200/10 p-6 rounded-xl">
                  <div className="relative w-full mb-4 rounded-lg overflow-hidden aspect-[1/1.2]">
                    <Image
                      src="/picofme.png"
                      alt="Team member 1"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold">Amira Bayoumi</h3>
                  <p className="text-sm text-beige/70 mb-3">Lead Developer</p>
                  <p className="text-beige/80">
                    Amira is the driving force behind Reflekta&apos;s digital
                    experience designing and developing the entire platform from
                    the ground up. From UX design to front-end and back-end
                    development, she brings the concept to life through clean
                    code, inclusive design, and a deep commitment to building
                    real cultural connections online.
                  </p>
                </div>

                <div className="bg-gray-200/10 p-6 rounded-xl">
                  <div className="relative w-full mb-4 rounded-lg overflow-hidden aspect-[1/1.2]">
                    <Image
                      src="/picofmeyy.png"
                      alt="Team member 2"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold">Yasmin Bayoumi</h3>
                  <p className="text-sm text-beige/70 mb-3">
                    Project Visionary
                  </p>
                  <p className="text-beige/80">
                    Yasmin sparked the original idea for Reflekta envisioning a
                    space where cultural diversity is celebrated through
                    storytelling and dialogue. Her concept laid the foundation
                    for the platform&apos;s core themes of inclusion, empathy,
                    and human connection across cultures.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-16 md:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Join the Reflekta Journey
            </h2>
            <p className="text-beige/70 mb-8">
              Whether you&apos;re new to Belgium or rooted in the local
              community, Reflekta is your space to connect, contribute, and
              co-create.
            </p>
            <a
              href="/contact"
              className="inline-block bg-gradient-to-r from-purple  to-black px-8 py-3 rounded-full text-white font-medium hover:shadow-lg hover:shadow-purple/30 transition-all"
            >
              Get Involved
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
