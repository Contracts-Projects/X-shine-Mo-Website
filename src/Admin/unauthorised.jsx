import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="unauthorized-container">
      <div className="unauthorized-content">
        <h1>Access Denied</h1>
        <div className="error-icon">
          <i className="fas fa-lock"></i>
        </div>
        <p>
          You don't have permission to access this page. This area is 
          restricted to admin users only.
        </p>
        <div className="action-buttons">
          <Link to="/" className="btn btn-primary">
            Go to Homepage
          </Link>
          <Link to="/login" className="btn btn-secondary">
            Login as Admin
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;