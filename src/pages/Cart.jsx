import { useCart } from "../components/CartContent"; // Adjust the import path as needed

const Cart = () => {
  const { cart, removeFromCart, clearCart, getCartTotal } = useCart();
  
  if (cart.length === 0) {
    return (
      <div className="container mx-auto p-4 max-w-full">
        <h2 className="text-3xl font-bold mb-6 text-center">Shopping Cart</h2>
        <div className="bg-gray-100 p-8 rounded-lg text-center shadow-md">
          <p className="text-xl mb-4">Your cart is empty</p>
          <a href="/" className="text-blue-600 hover:text-blue-800 font-medium hover:underline mt-2 inline-block">
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container w-full p-4 w-full">
      <h2 className="text-3xl font-bold mb-6 text-center">Shopping Cart</h2>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Cart Items */}
        <div className="divide-y divide-gray-200">
          {cart.map((item, index) => (
            <div key={index} className="p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between">
              <div className="flex items-center flex-1">
                {item.image && (
                  <div className="flex-shrink-0 h-16 w-16 md:h-24 md:w-24 mr-4">
                    <img 
                      className="h-full w-full object-cover rounded" 
                      src={item.image} 
                      alt={item.name} 
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-1">
                    {item.name}
                  </h3>
                  {item.category && (
                    <p className="text-sm text-gray-500 mb-2">
                      {item.category}
                    </p>
                  )}
                  {item.description && (
                    <p className="text-sm text-gray-600 hidden md:block">
                      {item.description.length > 100 
                        ? `${item.description.substring(0, 100)}...` 
                        : item.description}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4 md:mt-0">
                <div className="text-lg font-medium text-gray-900 md:mr-8">
                  {item.price}
                </div>
                <button
                  onClick={() => removeFromCart(index)}
                  className="text-white bg-red-500 hover:bg-red-600 py-2 px-4 rounded transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Cart Summary */}
        <div className="bg-gray-50 px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-xl font-bold mb-4 md:mb-0">
              Total: R {getCartTotal()}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button
                onClick={clearCart}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded font-medium transition-colors"
              >
                Clear Cart
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded font-medium transition-colors"
                onClick={() => alert("Proceeding to checkout...")}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;