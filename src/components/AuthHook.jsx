import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  login,
  register,
  logout,
  getUserProfile,
  selectIsAuthenticated,
  selectIsAdmin,
  selectUser,
  selectAuthStatus,
  selectAuthError
} from '../Redux/authSlice';

// Custom hook for authentication
export const useAuth = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isAdmin = useSelector(selectIsAdmin);
  const user = useSelector(selectUser);
  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);

  // Function to handle user login
  const handleLogin = (email, password) => {
    return dispatch(login({ email, password }));
  };

  // Function to handle user registration
  const handleRegister = (userData) => {
    return dispatch(register(userData));
  };

  // Function to handle user logout
  const handleLogout = () => {
    dispatch(logout());
  };

  // Get user profile if authenticated but no user data
  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(getUserProfile());
    }
  }, [isAuthenticated, user, dispatch]);

  return {
    isAuthenticated,
    isAdmin,
    user,
    status,
    error,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout
  };
};

// Custom hook for admin authorization
export const useAdmin = () => {
  const { isAuthenticated, isAdmin, status } = useAuth();
  
  return {
    isAuthenticated,
    isAdmin,
    status,
    isAuthorized: isAuthenticated && isAdmin
  };
};