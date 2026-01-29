import React from "react";
import "./DropshippingCourseCard.css";

import GreenTick from "../../../icons/green-tick.svg";
import SeatsIcon from "../../../icons/seats.svg";
import LockIcon from "../../../icons/lock.svg";
import StarIcon from "../../../icons/star.svg";

const DropshippingCourseCard = () => {
  return (
    <div className="exact-card-container">
      <div className="exact-card">
        {/* Media */}
        <div className="card-media">
          <img 
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d" 
            alt="Course Header" 
          />
          <div className="media-badge">
            <img src={LockIcon} alt="lock" className="icon-sm" /> Locked
          </div>
        </div>

        <div className="card-content">
          {/* Stars */}
          <div className="rating-container">
            {[...Array(5)].map((_, i) => (
              <img key={i} src={StarIcon} alt="star" className="star-svg" />
            ))}
            <span className="rating-text">4.9 Star Rated</span>
          </div>

          <h2 className="course-title">Dropshipping Course 2026</h2>
          <p className="course-summary">
            A practical dropshipping course built for Indian sellers — covering 
            product research, ads, payments, and proven strategies to reduce RTO in 2026.
          </p>

          {/* Features */}
          <div className="feature-list">
            <div className="feature-item">
              <img src={GreenTick} alt="tick" className="tick-icon" /> 
              Live + Recorded Lectures
            </div>
            <div className="feature-item">
              <img src={GreenTick} alt="tick" className="tick-icon" /> 
              India-Friendly Dropshipping
            </div>
            <div className="feature-item">
              <img src={GreenTick} alt="tick" className="tick-icon" /> 
              Lifetime Private Community Access
            </div>
            <div className="feature-item">
              <img src={GreenTick} alt="tick" className="tick-icon" /> 
              Certificate of Completion
            </div>
          </div>

          {/* Pricing */}
          <div className="pricing-row">
            <div className="price-tag">
              Rs.999 <span className="old-price">Rs.2999</span>
            </div>
            <div className="date-badge">Starting from 31st Jan 2026</div>
          </div>

          {/* Single High-Conversion Button */}
{/* Single High-Conversion Button */}
<button
  className="shimmer-btn"
  onClick={() => {
    const whatsappLink = "https://wa.me/917559436129?text=Hi%2C%20I%20want%20to%20enroll%20in%20Dropshipping%20Course%202026.";
    window.open(whatsappLink, "_blank");
  }}
>
  Get Access Now
  <span className="shimmer-effect"></span>
</button>



          {/* Footer Scarcity */}
          <div className="card-footer">
  <div className="spots-info">
    <span className="spots-left">
      {/* Ensure the icon has the same line-height as text */}
      <img src={SeatsIcon} alt="seats" className="footer-icon" /> 
      Only 13 Spots Left
    </span>
    <span className="filling-fast">Filling Fast</span>
  </div>

  <div className="progress-track">
    <div 
      className="progress-fill bar-animate" 
      style={{ width: "75%" }} 
    ></div>
  </div>
</div>
        </div>
      </div>
    </div>
  );
};

export default DropshippingCourseCard;