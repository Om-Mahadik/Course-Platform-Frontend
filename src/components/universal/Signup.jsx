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
    try {
      let userCredential;

      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(
          auth,
          form.email,
          form.password
        );
      } else {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          form.email,
          form.password
        );
      }

      const user = userCredential.user;
      setUser(user);

    } catch (err) {
      alert(err.message);
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

      <button className="signup-submit-btn" onClick={handleSubmit}>
        {isLogin ? "Log in" : "Create account"}
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
