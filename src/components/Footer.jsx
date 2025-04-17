import React from "react";
import "../styling/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        

        {/* Store Info */}
        <div className="footer-section">
          <h4>Visit Our Store</h4>
          <p>123 Auto Care Lane</p>
          <p>Detailing District, CA 90210</p>
          <p>Mon-Fri: 9am-7pm</p>
          <p>Sat-Sun: 10am-5pm</p>
        </div>
{/* Company Info */}
<div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: info@abrand.co.za</p>
          <p>Phone: +27 11 123 4567</p>
        </div>
        {/* Copyright */}
        <div className="footer-section">
          <h4>&copy; {new Date().getFullYear()} X-Shine</h4>
          <p>All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;