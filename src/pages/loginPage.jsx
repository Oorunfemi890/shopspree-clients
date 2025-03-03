import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser, loginFailure } from '../Redux/userSlice'; // Corrected import
import "../styles/loginstyles.css";

const API_URL = 'https://shopspree-backend.onrender.com';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert ("Login-Succesful")
        dispatch(setUser(data.user));
        navigate('/profile'); 
      } else {
        setError(data.message || 'Invalid login credentials, please try again.');
        dispatch(loginFailure(data.message));
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred while logging in. Please try again.');
      dispatch(loginFailure('Network error.'));
    }
  };

  return (
    <div className="login-container">
      <h2>ShopSpree Sign In</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
         <small className="password-info">
          Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.
        </small>

        <button type="submit" className="login-btn">Login</button>
      </form>
      <p className="signup-link">Don't have an account? <a href="/signup">Sign up here</a></p>
      <p className="forgot-password"><a href="/ForgottenPassword">Forgot Password?</a></p>
      <p className="footer-text">
        Purchase your goods online from our website and enjoy safe and free delivery to your doorstep!
      </p>
    </div>
  );
};

export default LoginPage;
