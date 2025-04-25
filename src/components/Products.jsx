import { useState, useRef, useEffect } from "react";
import { Card, CardContent, Typography, Modal, Box, Button } from "@mui/material";
import { PiShoppingCartLight } from "react-icons/pi";
import { IoInformationCircleOutline } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import axios from "axios";
import "../styling/Productssection.css";
import { useCart } from "./CartContent"; 

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const productListRef = useRef(null);
  const { addToCart } = useCart();

  useEffect(() => {
    // Function to fetch products from the API
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        const response = await axios.get('http://localhost:5000/api/products');
        
      
        const formattedProducts = response.data.data.map(product => ({
          title: product.name,
          description: product.description,
          price: `R ${parseFloat(product.price).toFixed(2)}`,
          details: product.description,
          image: product.imageUrl || "https://via.placeholder.com/200x120.png?text=Product+Image",
          category: product.category,
          inStock: product.inStock,
          stockQuantity: product.stockQuantity
        }));
        
        setProducts(formattedProducts);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const checkScrollPosition = () => {
    if (productListRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = productListRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
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

      {loading ? (
        <div className="loading-container">
          <p>Loading products...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <p>{error}</p>
        </div>
      ) : products.length === 0 ? (
        <div className="no-products-container">
          <p>No products found.</p>
        </div>
      ) : (
        <div className="product-list-container">
          <button
            className={`scroll-arrow left-arrow ${!showLeftArrow ? "hidden" : ""}`}
            onClick={() => scroll("left")}
            aria-label="Scroll left"
          >
            <IoIosArrowBack size={18} />
          </button>

          <div className="product-list" ref={productListRef} onScroll={handleScroll}>
            {products.map((product, index) => (
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
      )}

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
                  {selectedProduct.inStock !== undefined && (
                    <Typography variant="body2" className="modal-stock">
                      {selectedProduct.inStock ? 
                        `In Stock (${selectedProduct.stockQuantity || 0})` : 
                        'Out of Stock'}
                    </Typography>
                  )}
                  {selectedProduct.category && (
                    <Typography variant="body2" className="modal-category">
                      Category: {selectedProduct.category}
                    </Typography>
                  )}
                  <div className="modal-actions">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleAddToCart(selectedProduct)}
                      className="modal-btn add-btn"
                      startIcon={<PiShoppingCartLight size={16} />}
                      disabled={selectedProduct.inStock === false}
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
