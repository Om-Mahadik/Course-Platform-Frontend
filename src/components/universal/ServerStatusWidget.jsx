import React, { useState, useEffect, useRef } from "react";
import { pingServer } from "../../services/healthService";
import GreenTick from "../../icons/green-tick.svg"; // Adjust path if necessary
import "./ServerStatusWidget.css";

const PING_INTERVAL = 5 * 60 * 1000; // regular keep-alive ping
const WAKE_TIMER = 60;
const COUNTDOWN_PING = 15 * 1000;
const LOG_PING_INTERVAL = 13 * 60 * 1000; // 13 min

const ServerStatusWidget = () => {
  const [status, setStatus] = useState("checking");
  const [visible, setVisible] = useState(false);
  const [timer, setTimer] = useState(WAKE_TIMER);

  const timerRef = useRef(null);
  const countdownPingRef = useRef(null);
  const logPingRef = useRef(null);

  const stopTimers = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (countdownPingRef.current) clearInterval(countdownPingRef.current);
    if (logPingRef.current) clearInterval(logPingRef.current);
  };

  const startCountdown = () => {
    stopTimers();
    setTimer(WAKE_TIMER);

    // Countdown timer
    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Check server every 15 sec during countdown
    countdownPingRef.current = setInterval(async () => {
      try {
        await pingServer();
        handleSuccess();
      } catch (e) {
        // still offline
      }
    }, COUNTDOWN_PING);
  };

  const handleSuccess = () => {
    stopTimers();
    setStatus("online");
    setVisible(true);
    setTimeout(() => setVisible(false), 5000);
  };

  const checkServer = async () => {
    try {
      await pingServer();
      if (status !== "online") handleSuccess();
    } catch (err) {
      if (status !== "offline") {
        setStatus("offline");
        setVisible(true);
        startCountdown();
      }
    }
  };

  // Initial check + repeated ping intervals
  useEffect(() => {
    checkServer();

    // Regular ping to keep server alive
    const interval = setInterval(checkServer, PING_INTERVAL);

    // Separate 13-min logging ping
    logPingRef.current = setInterval(async () => {
      try {
        const data = await pingServer();
        console.log(`[Server Ping] ${new Date().toLocaleTimeString()}: Server online`, data);
      } catch (err) {
        console.log(`[Server Ping] ${new Date().toLocaleTimeString()}: Server offline`);
      }
    }, LOG_PING_INTERVAL);

    return () => {
      clearInterval(interval);
      stopTimers();
    };
  }, [status]);

  if (!visible) return null;

  return (
    <div className="minimal-top-widget">
      <div className="widget-content">
        {status === "online" ? (
          <div className="status-row">
            <img src={GreenTick} alt="Success" className="tick-icon" />
            <span>Systems Online</span>
          </div>
        ) : (
          <div className="status-row">
            <div className="orange-loader"></div>
            <span>
              Backend waking in <span className="timer-num">{timer}s</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServerStatusWidget;
