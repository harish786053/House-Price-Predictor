import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User as UserIcon, ArrowRight, Github, Chrome, Facebook, Apple } from 'lucide-react';
import axios from 'axios';
import './Login.css';

const Login = ({ setAuth }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setAuth(true);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="harish-login-container">
      <div className="harish-login-card">
        <div className="harish-login-header">
          <div className="harish-login-icon">
            <UserIcon size={32} color="#fff" />
          </div>
          <h1 className="harish-login-title">Welcome Back</h1>
          <p className="harish-login-subtitle">Login to your account to continue</p>
        </div>

        {error && <div className="harish-error-msg">{error}</div>}

        <form className="harish-login-form" onSubmit={onSubmit}>
          <div className="harish-input-group">
            <Mail className="harish-input-icon" size={18} />
            <input
              type="email"
              placeholder="Email or Username"
              name="email"
              className="harish-login-input"
              value={email}
              onChange={onChange}
              required
            />
          </div>

          <div className="harish-input-group">
            <Lock className="harish-input-icon" size={18} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              className="harish-login-input"
              value={password}
              onChange={onChange}
              required
            />
            <button
              type="button"
              className="harish-password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="harish-form-options">
            <label className="harish-checkbox">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#" className="harish-forgot-link">Forgot Password?</a>
          </div>

          <button type="submit" className="harish-login-btn" disabled={loading}>
            {loading ? 'Logging in...' : (
              <>
                Login <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="harish-divider">or continue with</div>

        <div className="harish-social-login">
          <button className="harish-social-btn">
            <Chrome size={20} color="#EA4335" />
          </button>
          <button className="harish-social-btn">
            <Facebook size={20} color="#1877F2" />
          </button>
          <button className="harish-social-btn">
            <Apple size={20} color="#fff" />
          </button>
        </div>

        <div className="harish-footer">
          Don't have an account? 
          <a href="#" className="harish-signup-link">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
