import React, { useState } from "react";
import "../styling/ContactUs.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
    alert("Message sent!");
  };

  return (
    <div className="contact-us-container">
      <div className="form-section">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Your message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">Send</button>
        </form>
      </div>

      <div className="about-section">
        <h2>About Us</h2>
        <p>
          We are committed to providing high-quality auto care products that are
          eco-friendly and effective. With years of experience in the industry,
          our goal is to ensure your vehicle looks and feels brand new.
        </p>
        <p>
          Whether you're a professional detailer or a car enthusiast, our
          products are designed to deliver outstanding results every time.
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
