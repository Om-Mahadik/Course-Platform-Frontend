import React from "react";
import logo from "../../imgs/logo.jpg";
import "./BrandHeader.css";

const BrandHeader = () => {
  return (
    <div className="brand-header-container">
      <div className="premium-logo-wrapper">
        <img src={logo} alt="Personal Web Studio" className="brand-logo-img" />
      </div>
    </div>
  );
};

export default BrandHeader;