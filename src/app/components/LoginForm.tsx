"use client";

import styles from "../styles/Login.module.css";
import { useState } from "react";
import { motion } from "framer-motion";

interface LoginFormProps {
  isShowLogin: boolean;
  onClose: () => void;
}

const LoginForm = ({ isShowLogin, onClose }: LoginFormProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClose = () => {
    setIsFlipped(false);
    onClose();
  };

  return (
    <div className={styles[`${isShowLogin ? "show-login" : "hide-login"}`]}>
      <div
        className={isShowLogin ? styles["show-login"] : styles["hide-login"]}
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          initial={{ rotateY: 0 }}
          className={styles.card}
          transition={{ duration: 0.6 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className={`${styles.front} ${styles.side}`}>
            <h3>Sign In</h3>
            <form>
              <input type="email" placeholder="Email" required />
              <input type="password" placeholder="Password" required />
              <button type="submit">Sign In</button>
            </form>
            <p>
              Don&apos;t have an account?{" "}
              <button
                className={styles.linkButton}
                onClick={() => setIsFlipped(true)}
              >
                Sign Up
              </button>
            </p>
            <button className={styles.closeButton} onClick={handleClose}>
              X
            </button>
          </div>

          <div className={`${styles.back} ${styles.side}`}>
            <h3>Sign Up</h3>
            <form>
              <input type="text" placeholder="Username" required />
              <input type="email" placeholder="Email" required />
              <input type="password" placeholder="Password" required />
              <input type="password" placeholder="Confirm Password" required />
              <button type="submit">Sign Up</button>
            </form>
            <p>
              Already have an account?{" "}
              <button
                className={styles.linkButton}
                onClick={() => setIsFlipped(false)}
              >
                Sign In
              </button>
            </p>
            <button className={styles.closeButton} onClick={handleClose}>
              X
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginForm;
