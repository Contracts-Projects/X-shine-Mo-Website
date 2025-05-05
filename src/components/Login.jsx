import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthHook';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [formError, setFormError] = useState('');
  
  const location = useLocation();
  const navigate = useNavigate();
  const { login, isAuthenticated, status, error } = useAuth();
  
  // Get redirect path from location state or default to home
  const from = location.state?.from || './admin';
  
  // If already authenticated, redirect to intended destination
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
      console.log("Already Authenticated")
    }
  }, [isAuthenticated, navigate, from]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    
    // Basic validation
    if (!formData.email || !formData.password) {
      setFormError('Please enter both email and password');
      return;
    }
    
    // Attempt login
    try {
      await login(formData.email, formData.password);

      console.log("Success Login")
      navigate("./admin")

    } catch (err) {
      // Error handling happens through the status and error from useAuth
    }
  };
  
  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <h2>Login</h2>
        
        {error && <div className="error-message">{error}</div>}
        {formError && <div className="error-message">{formError}</div>}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button
            type="submit"
            className="login-button"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="register-link">
          <p>Don't have an account? <a href="/register">Register</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;