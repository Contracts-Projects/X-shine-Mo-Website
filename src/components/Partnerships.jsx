import React from "react";
import "../styling/Home.css";
import partner1 from "../assets/makro.png";
import partner2 from "../assets/Caltex.png";
import partner3 from "../assets/kotwals.png";
import partner4 from "../assets/autozone.png";

const Partnerships = () => {
  return (
    <div className="partnerships-section">
      <h2 className="partnerships-title">Our Partnerships</h2>
      <div className="partners-logos">
        <img src={partner1} alt="Makro" className="partner-logo" />
        <img src={partner2} alt="Caltex" className="partner-logo" />
        <img src={partner4} alt="Autozone" className="partner-logo" />
        <img src={partner3} alt="Kotwals" className="partner-logo" />
      </div>
    </div>
  );
};

export default Partnerships;
