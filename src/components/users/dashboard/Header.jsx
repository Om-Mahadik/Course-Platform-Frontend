import React, { useEffect, useState } from "react";
import "./Header.css";
import catGif from "../../../gifs/cat.gif";

export const Header = ({ name }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12 && hour >= 3) return "Good Morning";
    if (hour < 16 && hour >= 12) return "Good Afternoon";
    return "Good Evening";
  };

  const [greeting, setGreeting] = useState(getGreeting());

  useEffect(() => {
    // update greeting every minute
    const interval = setInterval(() => {
      setGreeting(getGreeting());
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="header-wrapper">
      <header className="dashboard-card">
        <div className="text-content">
          <p className="greeting-text">{greeting}</p>
          <h1 className="welcome-name">{name || "Learner"}</h1>
        </div>

        <div className="cat-container">
          <img src={catGif} alt="cat mascot" className="peeking-cat" />
        </div>
      </header>
    </div>
  );
};
