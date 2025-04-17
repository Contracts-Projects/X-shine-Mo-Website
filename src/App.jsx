// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Products from "./components/Products";
import About from "./components/About";
import Home from "./pages/Home";
import Contact from "./components/ContactUs";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import { CartProvider } from "./components/CartContent";
import "./App.css";

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        {/* <Footer /> */}
      </Router>
    </CartProvider>
  );
}

export default App;