"use client";

// import styles from "../styles/Login.module.css";
import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface LoginFormProps {
  isShowLogin: boolean;
  onClose: () => void;
}

const LoginForm = ({ isShowLogin, onClose }: LoginFormProps) => {
  // Form state
  const [isFlipped, setIsFlipped] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Reset all form fields and state when closing
  const handleClose = () => {
    // Reset flip state
    setIsFlipped(false);

    // Reset all form fields
    setEmail("");
    setPassword("");
    setUsername("");
    setConfirmPassword("");

    // Call the provided onClose function
    onClose();
  };

  console.log("isShowLogin:", isShowLogin);

  // Don't render anything if isShowLogin is false
  if (!isShowLogin) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center transition-opacity duration-300">
      {/* Container with perspective */}
      <div
        className="w-full max-w-md perspective-1000"
        style={{ perspective: "1000px" }}
      >
        {/* Card that flips */}
        <motion.div
          animate={{
            rotateY: isFlipped ? 180 : 0,
            scale: 1,
          }}
          initial={{ rotateY: 0, scale: 0.8 }}
          className="bg-white rounded-xl shadow-2xl w-full relative preserve-3d"
          transition={{ duration: 0.6 }}
          style={{
            transformStyle: "preserve-3d",
            height: isFlipped ? "520px" : "380px", // Adjust based on your content
            transition: "transform 0.6s, scale 0.6s, height 0.6s",
          }}
        >
          {/* Sign In Side - Front */}
          <div
            className={`absolute inset-0 p-8 backface-hidden ${
              isFlipped ? "pointer-events-none" : "pointer-events-auto"
            }`}
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(0deg)",
              opacity: isFlipped ? 0 : 1,
              transition: "opacity 0.1s 0.3s",
            }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-[#553a5c]">Sign In</h3>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-[#937195] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form className="space-y-5">
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#937195]"
                />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#937195]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#553a5c] hover:bg-[#937195] text-white font-medium rounded-lg transition-colors"
              >
                Sign In
              </button>
            </form>

            <p className="mt-6 text-center text-gray-600">
              Don&apos;t have an account?{" "}
              <button
                onClick={() => setIsFlipped(true)}
                className="text-[#553a5c] font-medium hover:text-[#937195] focus:outline-none"
              >
                Sign Up
              </button>
            </p>
          </div>

          {/* Sign Up Side - Back */}
          <div
            className={`absolute inset-0 p-8 backface-hidden ${
              isFlipped ? "pointer-events-auto" : "pointer-events-none"
            }`}
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              opacity: isFlipped ? 1 : 0,
              transition: "opacity 0.1s 0.3s",
            }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-[#553a5c]">Sign Up</h3>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-[#937195] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#937195]"
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#937195]"
                />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#937195]"
                />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#937195]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#553a5c] hover:bg-[#937195] text-white font-medium rounded-lg transition-colors"
              >
                Sign Up
              </button>
            </form>

            <p className="mt-6 text-center text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => setIsFlipped(false)}
                className="text-[#553a5c] font-medium hover:text-[#937195] focus:outline-none"
              >
                Sign In
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginForm;
