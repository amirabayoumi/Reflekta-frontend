"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useActionState } from "react";
import { loginUserAction, registerUserAction } from "@/actions";

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

  // Get the auth context
  const { setToken } = useAuth();

  // Setup useActionState for login and register
  const initialLoginState = { type: "", message: "", token: "" };
  const [loginState, loginAction, isLoginPending] = useActionState(
    loginUserAction,
    initialLoginState
  );

  const initialRegisterState = { type: "", message: "" };
  const [registerState, registerAction, isRegisterPending] = useActionState(
    registerUserAction,
    initialRegisterState
  );

  // Handle login success
  useEffect(() => {
    if (loginState.type === "success" && loginState.token) {
      setToken(loginState.token);
      setTimeout(() => {
        handleClose();
      }, 1000);
    }
  }, [loginState, setToken]);

  // Handle registration success
  useEffect(() => {
    if (registerState.type === "success") {
      // Save the current password before flipping
      const currentPassword = password;

      setIsFlipped(false);

      // After flipping to sign in, preserve the email and password
      setTimeout(() => {
        // Keep the email and password for easier sign in
        setPassword(currentPassword);
      }, 700); // Delay slightly to match the flip animation

      // Clear registration success message after a delay
      setTimeout(() => {
        registerAction(new FormData()); // Reset the form state
      }, 3000);
    }
  }, [registerState, password, registerAction]);

  const handleClose = () => {
    setIsFlipped(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setConfirmPassword("");

    // Create a FormData object with a reset flag
    const resetFormData = new FormData();
    resetFormData.append("reset", "true");

    // Reset both login and register states
    loginAction(resetFormData);
    registerAction(resetFormData);
    onClose();
  };

  // Handle when flipping the card - also reset any error messages
  const handleFlip = (flip: boolean) => {
    // Reset error messages when switching between forms
    const resetFormData = new FormData();
    resetFormData.append("reset", "true");

    if (flip) {
      loginAction(resetFormData);
    } else {
      registerAction(resetFormData);
    }

    setIsFlipped(flip);
  };

  // Email validation function

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
            height: isFlipped ? "550px" : "400px",
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

            <form className="space-y-5" action={loginAction}>
              <div>
                <input
                  type="email"
                  name="email"
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
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#937195]"
                />
              </div>

              {loginState.type === "error" && (
                <div className="text-red-500 text-sm text-center">
                  {loginState.message}
                </div>
              )}
              {loginState.type === "success" && (
                <div className="text-green-900 text-sm text-center">
                  Successfully logged in!
                </div>
              )}
              {registerState.type === "success" && (
                <div className="text-green-900 text-sm text-center">
                  Registration successful! You can now sign in with your
                  credentials.
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-[#553a5c] hover:bg-[#937195] text-white font-medium rounded-lg transition-colors"
                disabled={isLoginPending}
              >
                {isLoginPending ? "Signing In..." : "Sign In"}
              </button>
            </form>

            <p className="mt-6 text-center text-gray-600">
              Don&apos;t have an account?{" "}
              <button
                onClick={() => handleFlip(true)}
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

            <form className="space-y-4" action={registerAction}>
              <div>
                <input
                  type="text"
                  name="username"
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
                  name="email"
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
                  name="password"
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
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#937195]"
                />
              </div>

              {registerState.type === "error" && (
                <div className="text-red-500 text-sm text-center">
                  {registerState.message}
                </div>
              )}
              {registerState.type === "success" && (
                <div className="text-green-900 text-sm text-center">
                  Registration successful! You can now sign in.
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-[#553a5c] hover:bg-[#937195] text-white font-medium rounded-lg transition-colors"
                disabled={isRegisterPending}
              >
                {isRegisterPending ? "Signing Up..." : "Sign Up"}
              </button>
            </form>

            <p className="mt-6 text-center text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => handleFlip(false)}
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
