"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { registerUser, loginUser } from "../queries";
import { useAuth } from "@/hooks/useAuth";

interface RegisterResponse {
  success: boolean;
  message?: string;
}

interface LoginFormProps {
  isShowLogin: boolean;
  onClose: () => void;
}

const LoginForm = ({ isShowLogin, onClose }: LoginFormProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get the auth context
  const {  setToken } = useAuth();

  const handleClose = () => {
    setIsFlipped(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setConfirmPassword("");
    setErrorMessage("");
    setLoginSuccess(false);
    onClose();
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const response = await loginUser({ email, password });

      if (response.success && response.data?.token) {
        // Store the token in auth context
        setToken(response.data.token);

        setLoginSuccess(true);
        setTimeout(() => {
          handleClose();
        }, 1000);
      } else {
        setErrorMessage(response.message || "Login failed");
      }
    } catch (error: unknown) {
      if (
        error &&
        typeof error === "object" &&
        error !== null &&
        "message" in error &&
        typeof (error as { message?: unknown }).message === "string"
      ) {
        setErrorMessage((error as { message: string }).message);
      } else {
        setErrorMessage("Login failed");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    const userData = {
      name: username,
      email,
      password,
      confirm_password: confirmPassword,
    };
    try {
      const result = (await registerUser(userData)) as RegisterResponse;
      if (result.success) {
        setIsFlipped(false);
        setErrorMessage("Registration successful. Please sign in.");
        setEmail(email);
        setPassword(password);
      } else {
        setErrorMessage(result.message || "Registration failed");
      }
    } catch (error: unknown) {
      if (
        error &&
        typeof error === "object" &&
        "message" in error &&
        typeof (error as { message?: unknown }).message === "string"
      ) {
        setErrorMessage((error as { message: string }).message);
      } else {
        setErrorMessage("Registration failed");
      }
    }
  };

  if (!isShowLogin) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center transition-opacity duration-300">
      <div
        className="w-full max-w-md perspective-1000"
        style={{ perspective: "1000px" }}
      >
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
            height: isFlipped ? "520px" : "380px",
            transition: "transform 0.6s, scale 0.6s, height 0.6s",
          }}
        >
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

            <form className="space-y-5" onSubmit={handleSignIn}>
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

              {errorMessage && (
                <div className="text-red-500 text-sm text-center">
                  {errorMessage}
                </div>
              )}
              {loginSuccess && (
                <div className="text-green-500 text-sm text-center">
                  Successfully logged in!
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-[#553a5c] hover:bg-[#937195] text-white font-medium rounded-lg transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
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

            <form className="space-y-4" onSubmit={handleSignUp}>
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
