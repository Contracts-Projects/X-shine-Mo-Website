import { useState, useRef, useEffect } from "react";
import { Card, CardContent, Typography, Modal, Box, Button } from "@mui/material";
import { PiShoppingCartLight } from "react-icons/pi";
import { IoInformationCircleOutline } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "../styling/Productssection.css";
import { useCart } from "./CartContent"; // Adjust path as needed

const productData = [
  {
    title: "Waterless Wash",
    description: "Perfect for quick clean-ups without water.",
    price: "R 25.99",
    details:
      "This product is great for those who want a fast and efficient clean without needing water. Ideal for quick washes!",
    image: "https://via.placeholder.com/200x120.png?text=Waterless+Wash",
  },
  {
    title: "Car Shine Spray",
    description: "Gives your car a lasting showroom shine.",
    price: "R 18.99",
    details:
      "This car shine spray brings a glossy, showroom-like finish to your vehicle. It protects the paint and makes your car look brand new.",
    image: "https://via.placeholder.com/200x120.png?text=Car+Shine+Spray",
  },
  {
    title: "Tire Cleaner",
    description: "Restores the deep black finish of your tires.",
    price: "R 15.99",
    details:
      "Tire Cleaner restores the deep, dark finish to your tires, giving them a fresh, clean look. It also protects them from dirt and grime.",
    image: "https://via.placeholder.com/200x120.png?text=Tire+Cleaner",
  },
  {
    title: "Glass Cleaner",
    description: "Streak-free shine for all glass surfaces.",
    price: "R 12.99",
    details: "Professional-grade glass cleaner that leaves no streaks or residue.",
    image: "https://via.placeholder.com/200x120.png?text=Glass+Cleaner",
  },
  {
    title: "Interior Cleaner",
    description: "Safe for all interior surfaces.",
    price: "R 19.99",
    details: "Cleans and protects all interior surfaces including leather, plastic, and vinyl.",
    image: "https://via.placeholder.com/200x120.png?text=Interior+Cleaner",
  },
];

const Products = () => {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const productListRef = useRef(null);
  const { addToCart } = useCart();

  const checkScrollPosition = () => {
    if (productListRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = productListRef.current;
      setShowLeftArrow(scrollLeft > 0);
      // Only hide right arrow when we've scrolled to the very end
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    // Always show right arrow initially
    setShowRightArrow(true);
    window.addEventListener("resize", checkScrollPosition);
    return () => window.removeEventListener("resize", checkScrollPosition);
  }, []);

  const scroll = (direction) => {
    if (productListRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      productListRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });

      setTimeout(checkScrollPosition, 300);
    }
  };

  const handleScroll = () => {
    checkScrollPosition();
  };

  const handleOpen = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    handleClose();
  };

  return (
    <section className="products-section">
      <div className="products-header">
        <h2 className="products-title">Our Premium Products</h2>
      </div>

      <p className="products-description">
        We offer a range of high-quality car care products designed to keep your vehicle looking its best. Each product
        is carefully formulated to provide professional results.
      </p>

      <div className="product-list-container">
        <button
          className={`scroll-arrow left-arrow ${!showLeftArrow ? "hidden" : ""}`}
          onClick={() => scroll("left")}
          aria-label="Scroll left"
        >
          <IoIosArrowBack size={18} />
        </button>

        <div className="product-list" ref={productListRef} onScroll={handleScroll}>
          {productData.map((product, index) => (
            <Card className="mui-card" key={index}>
              <div className="card-image-container">
                <img src={product.image || "/placeholder.svg"} alt={product.title} className="card-image" />
                <div className="card-overlay">
                  <button className="info-button" onClick={() => handleOpen(product)} aria-label="View details">
                    <IoInformationCircleOutline size={18} />
                  </button>
                </div>
              </div>
              <CardContent className="card-content">
                <Typography variant="h6" className="product-title">
                  {product.title}
                </Typography>
                <Typography variant="body2" className="product-description">
                  {product.description}
                </Typography>
                <div className="price-action-container">
                  <Typography variant="h6" className="product-price">
                    {product.price}
                  </Typography>
                  <button className="products-btn" onClick={() => handleAddToCart(product)}>
                    <PiShoppingCartLight size={14} className="btn-icon" />
                    Add
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <button
          className={`scroll-arrow right-arrow ${!showRightArrow ? "hidden" : ""}`}
          onClick={() => scroll("right")}
          aria-label="Scroll right"
        >
          <IoIosArrowForward size={18} />
        </button>
      </div>

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
        <Box className="modal-box">
          {selectedProduct && (
            <>
              <div className="modal-header">
                <Typography variant="h5" id="modal-title">
                  {selectedProduct.title}
                </Typography>
                <button className="modal-close" onClick={handleClose}>
                  ×
                </button>
              </div>
              <div className="modal-content">
                <img
                  src={selectedProduct.image || "/placeholder.svg"}
                  alt={selectedProduct.title}
                  className="modal-image"
                />
                <div className="modal-info">
                  <Typography variant="h6" className="modal-price">
                    {selectedProduct.price}
                  </Typography>
                  <Typography variant="body1" className="modal-details">
                    {selectedProduct.details}
                  </Typography>
                  <div className="modal-actions">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleAddToCart(selectedProduct)}
                      className="modal-btn add-btn"
                      startIcon={<PiShoppingCartLight size={16} />}
                    >
                      Add to Cart
                    </Button>
                    <Button variant="outlined" onClick={handleClose} className="modal-btn cancel-btn">
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </Box>
      </Modal>
    </section>
  );
};

export default Products;