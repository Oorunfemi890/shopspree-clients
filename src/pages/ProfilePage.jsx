import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Redux/userSlice"; // Import the logout action
import { useNavigate, Link } from "react-router-dom";
import ProductUpload from "./ProductUpload"
import "../styles/profile.css";

const ProfilePage = () => {
  const { userInfo, isLoggedIn } = useSelector((state) => state.user); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("account"); 

  const handleLogout = () => {
    dispatch(logout()); 
    navigate("/login"); 
  };

  if (!isLoggedIn || !userInfo) {
    return <p>Loading user details...</p>;
  }

  return (
    <div className="container">
      <div className="div1">
        <span onClick={() => setActiveSection("account")}><a href="#">&#128100; My ShopSpree Account</a></span>
        <span onClick={() => setActiveSection("orders")}><a href="#">&#128230; Orders</a></span>
        <span onClick={() => setActiveSection("inbox")}><a href="#">&#9993; Inbox</a></span>
        <span onClick={() => setActiveSection("savedItems")}><a href="#">&#10084; Saved Items</a></span>
        <span onClick={() => setActiveSection("viewed")}><a href="#">&#128064; Viewed Recently</a></span>
        <span onClick={() => setActiveSection("pendingOrders")}><a href="#">&#128221; Pending Orders</a></span>
        <span onClick={() => setActiveSection("addressBook")}><a href="#">Address Book</a></span>
        <span onClick={() => setActiveSection("closeAccount")}><a href="#">Close Account</a></span>
        <div className="button-cont">
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </div>

      {/* Content Section */}
      <div className="div2">
        {activeSection === "account" && (
          <>
            <span className="heading-span">Account Overview</span>
            <div className="div2-1">
              <div id="account-details-div">
                <span className="span-head">Account Details</span>
                <p className="message">{`${userInfo.firstName} ${userInfo.lastName}`}</p>
                <p className="message2">{userInfo.email}</p>
              </div>
              <div id="address-book-div">
                <span className="span-head">Address Book</span>
                <p className="message">Your default shipping address</p>
                <p className="message2"></p>
              </div>
            </div>
            <div className="div2-2">
              <p className="message-account">ShopSpree Store credit</p>
              <p className="line-through"></p>
            </div>
            <div className="product-upload-section">
              <button 
                className="upload-button"
                onClick={() => navigate("/productUpload")}
              >
                Upload Products
              </button>
            </div>
          </>
        )}

        {activeSection === "orders" && (
          <div>
            <span className="heading-span">Orders</span>
            <p className="message">Here you can view all your orders.</p>
          </div>
        )}

        {/* Other sections */}
        {activeSection === "inbox" && (
          <div>
            <span className="heading-span">Inbox</span>
            <p className="message">Check your messages here.</p>
          </div>
        )}

        {activeSection === "savedItems" && (
          <div>
            <span className="heading-span">Saved Items</span>
            <p className="message">View your saved items here.</p>
          </div>
        )}

        {activeSection === "viewed" && (
          <div>
            <span className="heading-span">Recently Viewed</span>
            <p className="message">View your recently viewed items.</p>
          </div>
        )}

        {activeSection === "pendingOrders" && (
          <div>
            <span className="heading-span">Pending Orders</span>
            <p className="message">Track your pending orders here.</p>
          </div>
        )}

        {activeSection === "addressBook" && (
          <div>
            <span className="heading-span">Address Book</span>
            <p className="message">Manage your addresses here.</p>
          </div>
        )}

        {activeSection === "closeAccount" && (
          <div>
            <span className="heading-span">Close Account</span>
            <p className="message">Proceed to close your account here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
