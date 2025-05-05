import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  fetchProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct,
  selectAllProducts,
  selectProductsStatus,
  selectProductsError
} from '../Redux/productSlice';
import { useAdmin } from '../components/AuthHook';

const AdminProductManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, isAuthorized } = useAdmin();
  
  const products = useSelector(selectAllProducts);
  const status = useSelector(selectProductsStatus);
  const error = useSelector(selectProductsError);
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    countInStock: '',
    imageUrl: ''
  });

  // Check for admin authorization
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/admin/products' } });
      return;
    }
    
    if (!isAdmin) {
      navigate('/unauthorized');
      return;
    }
    
    // Fetch products if authorized
    dispatch(fetchProducts());
  }, [isAuthenticated, isAdmin, dispatch, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'countInStock' ? Number(value) : value
    }));
  };

  const handleAddNew = () => {
    setIsEditing(false);
    setCurrentProduct(null);
    setFormData({
      name: '',
      price: '',
      category: '',
      description: '',
      countInStock: '',
      imageUrl: ''
    });
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setCurrentProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      countInStock: product.countInStock,
      imageUrl: product.imageUrl || ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isEditing && currentProduct) {
      await dispatch(updateProduct({ 
        id: currentProduct._id, 
        updatedData: formData 
      }));
    } else {
      await dispatch(createProduct(formData));
    }
    
    // Reset form if successful
    if (selectProductsStatus !== 'failed') {
      handleAddNew();
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await dispatch(deleteProduct(productId));
    }
  };

  // If not authorized, this will redirect through the useEffect
  if (!isAuthorized) {
    return <div>Checking authorization...</div>;
  }

  return (
    <div className="admin-product-management">
      <h1>Product Management</h1>
      
      {error && <div className="error-alert">{error}</div>}
      
      <div className="admin-actions">
        <button onClick={handleAddNew}>Add New Product</button>
      </div>
      
      <div className="admin-container">
        <div className="product-form-container">
          <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Product Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange}
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input 
                type="number" 
                id="price" 
                name="price" 
                min="0" 
                step="0.01" 
                value={formData.price} 
                onChange={handleInputChange}
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input 
                type="text" 
                id="category" 
                name="category" 
                value={formData.category} 
                onChange={handleInputChange}
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea 
                id="description" 
                name="description" 
                value={formData.description} 
                onChange={handleInputChange}
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="countInStock">Count In Stock</label>
              <input 
                type="number" 
                id="countInStock" 
                name="countInStock" 
                min="0" 
                value={formData.countInStock} 
                onChange={handleInputChange}
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="imageUrl">Image URL</label>
              <input 
                type="text" 
                id="imageUrl" 
                name="imageUrl" 
                value={formData.imageUrl} 
                onChange={handleInputChange}
              />
            </div>
            
            <button 
              type="submit" 
              className="submit-btn"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Saving...' : isEditing ? 'Update Product' : 'Add Product'}
            </button>
            
            {isEditing && (
              <button 
                type="button" 
                className="cancel-btn" 
                onClick={handleAddNew}
              >
                Cancel
              </button>
            )}
          </form>
        </div>
        
        <div className="products-list-container">
          <h2>Products List</h2>
          
          {status === 'loading' && <div>Loading products...</div>}
          
          <table className="products-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{product.category}</td>
                  <td>{product.countInStock}</td>
                  <td>
                    <button 
                      className="edit-btn" 
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>
                    <button 
                      className="delete-btn" 
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {products.length === 0 && status !== 'loading' && (
            <div className="no-products">No products found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProductManagement;