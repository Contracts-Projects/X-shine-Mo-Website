import { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [animateCart, setAnimateCart] = useState(false);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    
    // Trigger cart animation
    setAnimateCart(true);
    setTimeout(() => setAnimateCart(false), 1000);
  };

  const removeFromCart = (indexToRemove) => {
    setCart((prevCart) => prevCart.filter((_, index) => index !== indexToRemove));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce(
      (total, item) => total + Number.parseFloat(item.price.replace("R ", "")), 
      0
    ).toFixed(2);
  };

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        clearCart, 
        getCartTotal,
        animateCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);