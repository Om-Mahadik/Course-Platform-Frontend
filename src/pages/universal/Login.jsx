import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BrandHeader from "../../components/universal/BrandHeader";
import GoogleLogin from "../../components/universal/GoogleLogin";
import Signup from "../../components/universal/Signup";
import logo from "../../imgs/logo.jpg"; // Your horizontal logo
import "./Login.css";

const Login = ({ setUser }) => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Show splash for 3 seconds, then switch
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="login-page-wrapper">
      <AnimatePresence mode="wait">
        {showSplash ? (
          /* --- SPLASH SCREEN --- */
          <motion.div
            key="splash"
            className="splash-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1 }}
          >
            <motion.img 
              src={logo} 
              alt="Logo" 
              className="splash-logo"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2.5, ease: "easeOut" }}
            />
          </motion.div>
        ) : (
          /* --- ACTUAL LOGIN PAGE --- */
          <motion.div 
            key="login-content"
            className="main-login-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <BrandHeader />

            <motion.div
              className="login-bottom-card"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <div className="scroll-content">
                <GoogleLogin setUser={setUser} />
                <div className="divider">or</div>
                <Signup setUser={setUser}/>
                <p className="legal-notice">
                  Signing for a PersonalWebStudio account means you agree to the <span>Privacy Policy</span> and <span>Terms of Service</span>
                </p>
                <p className="login-footer-text">
                  Have an account? <strong>Log in here</strong>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Login;