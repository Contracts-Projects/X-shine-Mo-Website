// src/pages/Home.jsx
import React from "react";
import "../styling/Home.css";
import waterless from "../assets/waterless.png";
import Partnerships from "../components/Partnerships";
import Products from "../components/Products";
import About from "../components/About";
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";
import navbar from "../components/Navbar";
const Home = () => {
  return (
    <div className="home-page">
 
        {/* <navbar />   */}
    
      <div className="product-banner">
        <div className="banner-content">
          <h3 className="brand-text">A BRAND</h3>
          <h2 className="arrivals-text">NEW ARRIVALS.</h2>
          <p className="product-description">Quality auto care products.</p>

          <div className="banner-buttons">
            <button className="products-btn" onClick={() => document.getElementById('products-section').scrollIntoView({ behavior: 'smooth' })}>
              View Products
            </button>
            <button className="email-btn" onClick={() => document.getElementById('contact-section').scrollIntoView({ behavior: 'smooth' })}>
              Send Email
            </button>
          </div>
        </div>

        <div className="product-image">
          <img
            src={waterless}
            alt="Auto care products"
            className="products-img"
          />
        </div>
      </div>

      <div className="partnerships-section">
        <Partnerships />
      </div>
      
      {/* Products Section */}
      <div id="products-section">
        <Products />
      </div>

      
      {/* Contact Section */}
      <div id="contact-section">
        <ContactUs />
      </div>

      <div id="Footer-section">
        <Footer />
      </div>

    </div>
  );
};

export default Home;