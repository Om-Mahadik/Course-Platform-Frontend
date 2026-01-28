import React, { useEffect, useRef } from "react";
import "./DateSelector.css";

export const DateSelector = () => {
  const containerRef = useRef(null);
  const todayRef = useRef(null);

  const today = new Date();

  // Generate 15 days (7 before, today, 7 after)
  const dates = Array.from({ length: 15 }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() - 7 + i);

    return {
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      date: date.getDate(),
      isToday: date.toDateString() === today.toDateString(),
    };
  });

  // Center today on mount
  useEffect(() => {
    centerToday();
  }, []);

  // Snap back after scroll ends
  useEffect(() => {
    const container = containerRef.current;
    let timeout;

    const handleScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        centerToday();
      }, 250); // wait till user stops scrolling
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const centerToday = () => {
    if (!containerRef.current || !todayRef.current) return;

    const container = containerRef.current;
    const todayEl = todayRef.current;

    const containerCenter = container.offsetWidth / 2;
    const todayCenter = todayEl.offsetLeft + todayEl.offsetWidth / 2;

    container.scrollTo({
      left: todayCenter - containerCenter,
      behavior: "smooth",
    });
  };

  return (
    <div className="date-scroll-wrapper" ref={containerRef}>
      {dates.map((item, index) => (
        <div
          key={index}
          ref={item.isToday ? todayRef : null}
          className={`date-item ${item.isToday ? "active" : ""}`}
        >
          <div className="date-number">{item.date}</div>
          <div className="date-day">{item.day}</div>
        </div>
      ))}
    </div>
  );
};
