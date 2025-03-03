import React, { useState } from "react";
import "../styles/ChangePassword.css";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaEnvelope } from "react-icons/fa";

const API_URL = 'https://shopspree-backend.onrender.com';


const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const navigate = useNavigate();

  
  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      alert("New password and confirm password do not match!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, currentPassword, newPassword }),
      });

      const data = await response.json();
       
    
      if (response.ok) {
        setSuccessMessage("Password changed successfully!");
        setModalVisible(true);
      } else {
        alert(data.error || "An error occurred.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    navigate("/login");
  };

  return (
    <div className="change-password-container">
      <h1>Change Password</h1>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <div className="email-input">
          <FaEnvelope className="icon-left" />
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="currentPassword">Current Password</label>
        <div className="password-input">
          <input
            type={showCurrentPassword ? "text" : "password"}
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
          <span onClick={() => setShowCurrentPassword((prev) => !prev)}>
            {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="newPassword">New Password</label>
        <div className="password-input">
          <input
            type={showNewPassword ? "text" : "password"}
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <span onClick={() => setShowNewPassword((prev) => !prev)}>
            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="confirmNewPassword">Confirm New Password</label>
        <div className="password-input">
          <input
            type={showConfirmNewPassword ? "text" : "password"}
            id="confirmNewPassword"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />
          <span onClick={() => setShowConfirmNewPassword((prev) => !prev)}>
            {showConfirmNewPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
      </div>

      <p className="signup-link">
        Don&apos;t have an account? <a href="/signup">Sign up here</a>
      </p>
      <p className="forgot-password">
        <a href="/ForgottenPassword">Forgot Password?</a>
      </p>
      <button
        className="change-password-button"
        onClick={handleChangePassword}
        disabled={loading}
      >
        {loading ? "Processing..." : "Change Password"}
      </button>
      <p className="footer-text">
        Purchase your goods online from our website and enjoy safe and free delivery to your doorstep!
      </p>

      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <h2>{successMessage}</h2>
            <p>Your new credentials are:</p>
            <p>Email: {email}</p>
            <p>Password: {newPassword}</p>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangePassword;
