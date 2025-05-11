"use client";
import { useState } from "react";
import { User, Mail, MessageSquare, Send } from "react-feather";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (name.trim().length < 2) {
      setStatus("Please enter a valid name (at least 2 characters).");
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setStatus("Please enter a valid email address.");
      return false;
    }

    if (message.trim().length < 10) {
      setStatus("Please enter a message (at least 10 characters).");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatus("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setStatus("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("Message sent successfully! I'll get back to you soon.");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus(`Failed to send message: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus(
        "Error sending message. Please try again or contact me directly."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full  bg-gray-200/10 backdrop-blur-sm rounded-2xl p-8 md:p-10 lg:p-12 shadow-2xl shadow-black/30">
      <h2 className="text-white text-xl md:text-2xl font-semibold mb-6 text-center">
        Contact Us
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 max-w-md mx-auto"
      >
        <div className="relative w-full mb-6">
          <div className="relative flex items-center">
            <User size={18} className="absolute left-4 text-purple z-10" />
            <input
              type="text"
              id="name"
              className="w-full bg-white bg-opacity-5 border border-white border-opacity-10 rounded-xl
                      text-gray-700 font-alef text-base py-3.5 pl-11 pr-4 transition-all duration-300 ease-in-out
                      placeholder-lavender  font-light
                      focus:outline-none focus:bg-white focus:bg-opacity-10 focus:border-beige/30 focus:ring-2 focus:ring-beige/10"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="relative w-full mb-6">
          <div className="relative flex items-center">
            <Mail size={18} className="absolute left-4 text-purple z-10" />
            <input
              type="email"
              id="email"
              className="w-full bg-white bg-opacity-5 border border-white border-opacity-10 rounded-xl
                       text-gray-700 font-alef text-base py-3.5 pl-11 pr-4 transition-all duration-300 ease-in-out
                       placeholder-lavender placeholder-opacity-40 font-light
                       focus:outline-none focus:bg-white focus:bg-opacity-10 focus:border-beige/30 focus:ring-2 focus:ring-beige/10"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="relative w-full mb-6">
          <div className="relative flex items-center">
            <MessageSquare
              size={18}
              className="absolute left-4 top-4 text-purple z-10"
            />
            <textarea
              id="message"
              className="w-full bg-white bg-opacity-5 border border-white border-opacity-10 rounded-xl
                       text-gray-700 font-alef text-base py-3.5 pl-11 pr-4 min-h-[150px] resize-vertical
                       transition-all duration-300 ease-in-out placeholder-lavender  font-light
                       focus:outline-none focus:bg-white focus:bg-opacity-10 focus:border-beige/30 focus:ring-2 focus:ring-beige/10"
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              disabled={isLoading}
              rows={5}
            />
          </div>
        </div>

        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple to-black
                   border-none rounded-xl text-white cursor-pointer font-alef text-base font-medium
                   mt-3 py-3.5 px-6 relative transition-all duration-300 ease-in-out w-full
                   hover:from-purple-light hover:to-purple hover:transform hover:-translate-y-0.5
                   hover:shadow-lg hover:shadow-purple/30
                   disabled:bg-purple/50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
          disabled={isLoading}
        >
          {isLoading ? (
            "Sending..."
          ) : (
            <>
              <span>Send Message</span>
              <Send
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </>
          )}
        </button>
      </form>

      {status && (
        <div
          className={`mt-5 py-3 px-4 rounded-lg text-sm text-center ${
            status.includes("success")
              ? "bg-beige/60 text-amber-50 "
              : "bg-red-500/30 text-white"
          }`}
        >
          {status}
        </div>
      )}
    </div>
  );
};

export default ContactForm;
