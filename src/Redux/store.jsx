import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    auth: authReducer,
    // I'll add reducers here later for cart, checkout, etc.
  },
  // Optional middleware configuration if needed
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types to avoid serialization issues with non-serializable data
        ignoredActions: ['your-action/type-if-needed'],
      },
    }),
});

export default store;