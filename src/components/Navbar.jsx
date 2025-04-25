import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PiShoppingCartLight } from "react-icons/pi";
import { CiMenuBurger } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { CiSearch } from "react-icons/ci"; // Search icon
import '../styling/Navbar.css';
import logo from "../assets/XshineMo logo.png";
import { useCart } from "./CartContent"; // Adjust path as needed

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const { cart, animateCart } = useCart();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobileView(mobile);
      if (!mobile) setIsMobileMenuOpen(false);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = isMobileMenuOpen ? 'auto' : 'hidden';
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      {/* Mobile menu toggle */}
      <button className="menu-toggle" onClick={toggleMobileMenu} aria-label="Toggle menu">
        {isMobileMenuOpen ? <IoClose size={24} /> : <CiMenuBurger size={24} />}
      </button>

      {/* Logo */}
      <div className="logo">
        <Link to="/" onClick={closeMobileMenu}>
          <img src={logo} alt="XshineMo Logo" className="logo-img" />
        </Link>
      </div>

      {/* Search box moved to left */}
      <div className="search-box left-search">
        <CiSearch size={20} className="search-icon" />
        <input
          type="text"
          placeholder="Search for products"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Navigation links */}
      <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
        <li><Link to="/" onClick={closeMobileMenu}>Home</Link></li>
        <li><Link to="/products" onClick={closeMobileMenu}>Products</Link></li>
        <li><Link to="/contact" onClick={closeMobileMenu}>Contact Us</Link></li>
        {/* <li><Link to="/Add" onClick={closeMobileMenu}>Add Product</Link></li> */}
      </ul>

      {/* Cart moved to right */}
      <div className="search-and-icons">
        <div className="icons">
          <Link 
            to="/cart" 
            className={`icon-link cart-icon-container ${animateCart ? "cart-bounce" : ""}`}
            onClick={closeMobileMenu}
          >
            <PiShoppingCartLight size={25} />
            {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
          
          </Link>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && <div className="mobile-menu-overlay" onClick={closeMobileMenu} />}
    </nav>
  );
};

export default Navbar;