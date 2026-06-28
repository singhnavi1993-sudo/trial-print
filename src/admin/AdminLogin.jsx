import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../services/db';
import { Lock, User, AlertCircle } from 'lucide-react';
import './AdminLogin.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginAdmin(username, password)) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid User-ID or Password');
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <h2>Admin Access</h2>
          <p>Sign in to manage your store</p>
        </div>
        
        {error && (
          <div className="admin-error-message">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="admin-login-form">
          <div className="input-group">
            <User size={20} className="input-icon" />
            <input 
              type="text" 
              placeholder="User-ID" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="input-group">
            <Lock size={20} className="input-icon" />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="admin-login-btn">
            Login to Dashboard
          </button>
        </form>
        
        <div className="admin-login-footer">
          <a href="/">← Return to Main Website</a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
