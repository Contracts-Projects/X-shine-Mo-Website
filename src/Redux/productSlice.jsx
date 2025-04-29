import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching all products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (queryParams = {}, { rejectWithValue }) => {
    try {
      // Build query string from parameters
      const queryString = Object.entries(queryParams)
        .filter(([_, value]) => value !== null && value !== undefined)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&');
      
      const url = `https://xshinemo.onrender.com/api/products${queryString ? `?${queryString}` : ''}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        return rejectWithValue('Failed to fetch products');
      }
      
      const data = await response.json();
      return data; // API returns { success, count, data }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching a single product
export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/products/${productId}`);
      
      if (!response.ok) {
        return rejectWithValue('Failed to fetch product');
      }
      
      const data = await response.json();
      return data; // Your API returns { success, data }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for creating a product
export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData, { rejectWithValue, getState }) => {
    try {
      // Get the authentication token from the state (An auth slice)
      const token = getState().auth?.token;
      
      if (!token) {
        return rejectWithValue('Authentication required');
      }
      
      const response = await fetch('https://xshinemo.onrender.com/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productData),
      });
      
      if (response.status === 401) {
        return rejectWithValue('Authentication failed');
      }
      
      if (response.status === 403) {
        return rejectWithValue('Admin access required');
      }
      
      if (!response.ok) {
        return rejectWithValue('Failed to create product');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for updating a product
export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, updatedData }, { rejectWithValue, getState }) => {
    try {
      // Get the authentication token from the state
      const token = getState().auth?.token;
      
      if (!token) {
        return rejectWithValue('Authentication required');
      }
      
      const response = await fetch(`https://xshinemo.onrender.com/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedData),
      });
      
      if (response.status === 401) {
        return rejectWithValue('Authentication failed');
      }
      
      if (response.status === 403) {
        return rejectWithValue('Admin access required');
      }
      
      if (!response.ok) {
        return rejectWithValue('Failed to update product');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for deleting a product
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId, { rejectWithValue, getState }) => {
    try {
      // Get the authentication token from the state
      const token = getState().auth?.token;
      
      if (!token) {
        return rejectWithValue('Authentication required');
      }
      
      const response = await fetch(`https://xshinemo.onrender.com/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.status === 401) {
        return rejectWithValue('Authentication failed');
      }
      
      if (response.status === 403) {
        return rejectWithValue('Admin access required');
      }
      
      if (!response.ok) {
        return rejectWithValue('Failed to delete product');
      }
      
      const data = await response.json();
      return { id: productId, ...data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [], // List of products
  selectedProduct: null, // Selected product details
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  totalCount: 0, // For pagination if needed
  filters: {
    category: null,
    minPrice: null,
    maxPrice: null,
  },
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
    clearFilters(state) {
      state.filters = {
        category: null,
        minPrice: null,
        maxPrice: null,
      };
    },
    resetStatus(state) {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchProducts
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.data;
        state.totalCount = action.payload.count;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Something went wrong';
      })
      
      // Handle fetchProductById
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedProduct = action.payload.data;
        state.error = null;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Something went wrong';
      })
      
      // Handle createProduct
      .addCase(createProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload.data);
        state.totalCount += 1;
        state.error = null;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Something went wrong';
      })
      
      // Handle updateProduct
      .addCase(updateProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedProduct = action.payload.data;
        
        // Update the product in the items array
        const index = state.items.findIndex(product => product._id === updatedProduct._id);
        if (index !== -1) {
          state.items[index] = updatedProduct;
        }
        
        // If it's the selected product, update that too
        if (state.selectedProduct && state.selectedProduct._id === updatedProduct._id) {
          state.selectedProduct = updatedProduct;
        }
        
        state.error = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Something went wrong';
      })
      
      // Handle deleteProduct
      .addCase(deleteProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Remove the product from the items array
        state.items = state.items.filter(product => product._id !== action.payload.id);
        state.totalCount -= 1;
        
        // If it's the selected product, clear the selection
        if (state.selectedProduct && state.selectedProduct._id === action.payload.id) {
          state.selectedProduct = null;
        }
        
        state.error = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Something went wrong';
      });
  },
});

// Export actions
export const { setFilters, clearFilters, resetStatus } = productsSlice.actions;

// Export selectors
export const selectAllProducts = (state) => state.products.items;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;
export const selectSelectedProduct = (state) => state.products.selectedProduct;
export const selectProductsCount = (state) => state.products.totalCount;
export const selectProductFilters = (state) => state.products.filters;

export default productsSlice.reducer;