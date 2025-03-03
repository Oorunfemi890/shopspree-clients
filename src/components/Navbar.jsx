import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../Redux/userSlice';
import "../styles/Navbarcomp.css";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo, isLoggedIn } = useSelector((state) => state.user);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>ShopSpree</h1>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search.. For Products and Categories"
          className="search-input"
        />
        <button className="search-button">Search</button>
      </div>

      <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <div className="dropdown">
          <Link to="#profile" className="dropdown-arrow">
            <span className="icon">&#128100;</span>
            {isLoggedIn ? `Hi, ${userInfo?.firstName || 'User'}` : 'Profile'}
          </Link>
          <div className="dropdown-content">
            {isLoggedIn ? (
              <>
                <button onClick={handleLogout} className="signbutton">
                  Logout
                </button>
                <Link to="/profile">My Account</Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="signbutton">Sign In</button>
                </Link>
                <Link to="/signup">My Account</Link>
              </>
            )}
            <Link to="#orders">Orders</Link>
            <Link to="#saved-items">Saved Items</Link>
          </div>
        </div>

        <div className="dropdown">
          <Link to="#help" className="dropdown-arrow">
            <span className="icon">&#128712;</span> Help
          </Link>
          <div className="dropdown-content">
            <Link to="#help-center">Help Center</Link>
            <Link to="#place-order">Place an Order</Link>
            <Link to="#payment-options">Payment Options</Link>
            <Link to="#track-order">Track an Order</Link>
            <Link to="#cancel-order">Cancel Order</Link>
            <Link to="#returns-refunds">Returns & Refunds</Link>
          </div>
        </div>

        <Link to="#cart">
          <span className="icon">&#128722;</span> Cart
        </Link>
      </div>

      <div className="hamburger-menu" onClick={toggleMenu}>
        &#9776;
      </div>
    </nav>
  );
};

export default Navbar;
