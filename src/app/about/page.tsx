import React from "react";
import Image from "next/image";
import { FaHandHoldingHeart, FaLightbulb, FaUsers } from "react-icons/fa";

export default function About() {
  return (
    <main className="bg-gradient-to-br from-purple to-black font-alef text-white">
      <section className="min-h-[50vh] flex items-center px-6 py-12 md:px-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 text-center">
            About Reflekta
          </h1>
          <p className="text-xl text-beige/70 text-center max-w-3xl mx-auto">
            Reflekta is a cultural bridge — a space where locals and newcomers
            in Belgium connect, share, and grow through creativity and
            community.
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
                We envision a world where shared stories and opportunities help
                people from all walks of life feel seen, heard, and connected.
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
                everything we do — online and in real life.
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
                Reflekta began as a grassroots initiative during a time of
                disconnection. Our goal: to connect people across backgrounds in
                Belgium through culture and collaboration.
              </p>
              <p className="text-beige/70 mb-4">
                From small meetups to a growing digital platform, we’ve created
                a space where stories, ideas, and opportunities are exchanged
                freely.
              </p>
              <p className="text-beige/70">
                Today, Reflekta continues to grow — grounded in inclusion,
                shaped by our community, and powered by shared purpose.
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((member) => (
              <div key={member} className="bg-gray-200/10 p-6 rounded-xl">
                <div className="relative h-64 w-full mb-4 rounded-lg overflow-hidden">
                  <Image
                    src="https://res.cloudinary.com/djuqnuesr/image/upload/v1746640579/R_4_jz8tja.png"
                    alt={`Team member ${member}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold">Team Member {member}</h3>
                <p className="text-sm text-beige/70 mb-3">Position / Role</p>
                <p className="text-beige/80">
                  Dedicated to empowering people from all cultures through
                  creative collaboration and inclusive digital spaces.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Join the Reflekta Journey</h2>
          <p className="text-beige/70 mb-8">
            Whether you&apos;re new to Belgium or rooted in the local community,
            Reflekta is your space to connect, contribute, and co-create.
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
  );
}
