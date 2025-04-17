import React from "react";
import "../styling/About.css";

const About = () => {
  return (
    <div className="about-section">
      <div className="about-container">
        <h2>About X-Shine</h2>
        <p>
          At X-Shine, we're passionate about providing premium auto care products 
          that make your car shine like new. Our carefully curated selection is 
          designed for both car enthusiasts and everyday drivers who want 
          professional-grade results at home.
        </p>
        <p>
          We source only the highest quality formulations, combining cutting-edge 
          technology with proven ingredients. Every product in our collection has 
          been rigorously tested to ensure it delivers exceptional performance 
          without compromising your vehicle's finish.
        </p>
        <p className="cta-text">
          Explore our collection today and discover the X-Shine difference - 
          because your car deserves the best.
        </p>
      </div>
    </div>
  );
};

export default About;