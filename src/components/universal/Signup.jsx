import React, { useState } from "react";
import eyeIcon from "../../icons/eye.svg";
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../../firebase/firebase";
import "./Signup.css";

const Signup = ({ setUser }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let userCredential;

      if (isLogin) {
        // LOGIN
        userCredential = await signInWithEmailAndPassword(
          auth,
          form.email,
          form.password
        );

        // Optional: fetch user from backend if needed
        const token = await userCredential.user.getIdToken();
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/manual-login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ email: form.email }),
          }
        );
        const data = await response.json();
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        // SIGNUP
        userCredential = await createUserWithEmailAndPassword(
          auth,
          form.email,
          form.password
        );

        // Get Firebase ID token
        const token = await userCredential.user.getIdToken();

        // Send data to backend to create MongoDB user
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/manual-signup`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              uid: userCredential.user.uid,
              email: form.email,
              firstName: form.firstName,
              lastName: form.lastName,
            }),
          }
        );

        const data = await response.json();
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      }
    } catch (err) {
      console.error(err);
      alert(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-fields-container">
      {!isLogin && (
        <div className="input-row">
          <input
            name="firstName"
            placeholder="First Name"
            className="signup-input"
            onChange={handleChange}
          />
          <input
            name="lastName"
            placeholder="Last Name"
            className="signup-input"
            onChange={handleChange}
          />
        </div>
      )}

      <input
        name="email"
        type="email"
        placeholder="Email"
        className="signup-input full-width"
        onChange={handleChange}
      />

      <div className="password-wrapper">
        <input
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="signup-input full-width"
          onChange={handleChange}
        />
        <button
          type="button"
          className="password-eye-btn"
          onClick={() => setShowPassword(!showPassword)}
        >
          <img src={eyeIcon} alt="toggle visibility" />
        </button>
      </div>

      <button
        className="signup-submit-btn"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Please wait..." : isLogin ? "Log in" : "Create account"}
      </button>

      <p
        className="switch-auth-text"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin
          ? "New here? Create an account"
          : "Have an account? Log in"}
      </p>
    </div>
  );
};

export default Signup;
