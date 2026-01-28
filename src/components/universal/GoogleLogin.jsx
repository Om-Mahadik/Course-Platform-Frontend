import React from "react";
import { auth, provider, signInWithPopup } from "../../firebase/firebase";
import axios from "axios";
import googleIcon from "../../icons/google.svg";
import "./GoogleLogin.css"; 

const GoogleLogin = ({ setUser }) => {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken(true);
      const apiUrl = import.meta.env.VITE_API_URL;

      const response = await axios.post(
        `${apiUrl}/api/auth/google`,
        { idToken }
      );

      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      if (response.data.user.role === "admin") {
        window.location.href = "/admin/dashboard";
      } else {
        window.location.href = "/users/dashboard";
      }
    } catch (error) {
      console.error(error);
      alert("Login failed.");
    }
  };

  return (
    <button onClick={handleLogin} className="google-login-button">
      <img src={googleIcon} alt="Google" className="google-icon-svg" />
      <span className="google-button-text">Sign in with Google</span>
    </button>
  );
};

export default GoogleLogin;