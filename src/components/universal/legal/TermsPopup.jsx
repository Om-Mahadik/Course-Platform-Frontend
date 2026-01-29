import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./TermsPopup.css";

const TermsPopup = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="popup-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Bottom Popup */}
          <motion.div
            className="popup-content"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="popup-header">
              <h2>Terms of Service</h2>
              <button className="close-btn" onClick={onClose}>
                &times;
              </button>
            </div>

            <div className="popup-body">
              <div className="terms-content">
                <p>
                  Welcome to <strong>Personal Web Studio</strong>. By accessing or
                  using this platform, you agree to comply with these Terms of
                  Service. If you do not agree, please do not use the platform.
                </p>

                <h3>1. Platform Overview</h3>
                <p>
                  Personal Web Studio is an online learning platform that
                  provides recorded video-based courses. Users can log in and
                  access only the courses assigned to their account.
                </p>

                <h3>2. Course Access Duration</h3>
                <p>
                  Course access is provided for a limited period, typically
                  <strong> one (1) year</strong> from the date of purchase unless
                  otherwise specified. Access is personal and non-transferable.
                </p>

                <h3>3. Content Usage Restrictions</h3>
                <ul>
                  <li>Downloading course videos is strictly prohibited</li>
                  <li>Screen recording or screen capturing is not allowed</li>
                  <li>Sharing account credentials is forbidden</li>
                  <li>Redistributing or reselling content is illegal</li>
                </ul>

                <h3>4. Intellectual Property</h3>
                <p>
                  All content including videos, text, graphics, and materials are
                  the exclusive intellectual property of Personal Web Studio and
                  are protected by applicable copyright laws.
                </p>

                <h3>5. Account Responsibility</h3>
                <p>
                  Users are responsible for maintaining the confidentiality of
                  their login credentials. Any activity performed using your
                  account will be considered your responsibility.
                </p>

                <h3>6. Suspension & Termination</h3>
                <p>
                  Any violation of these terms may result in immediate suspension
                  or permanent termination of your account without refund.
                </p>

                <h3>7. Payments & Refunds</h3>
                <p>
                  All payments made on the platform are final unless a refund
                  policy is explicitly stated at the time of purchase.
                </p>

                <h3>8. Platform Availability</h3>
                <p>
                  While we strive to provide uninterrupted access, we do not
                  guarantee continuous availability due to maintenance or
                  technical issues.
                </p>

                <h3>9. Changes to Terms</h3>
                <p>
                  These Terms of Service may be updated at any time. Continued
                  use of the platform implies acceptance of the revised terms.
                </p>

                <p className="terms-footer">
                  By using this platform, you confirm that you have read,
                  understood, and agreed to these Terms of Service.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TermsPopup;
