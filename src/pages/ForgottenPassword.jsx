import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "../styles/ForgottenPassword.css";

const API_URL = 'https://shopspree-backend.onrender.com';


const ForgottenPassword = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [token, setToken] = useState(["", "", "", "", "", ""]);
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [updatedEmail, setUpdatedEmail] = useState("");
    const [updatedPassword, setUpdatedPassword] = useState("");
    const navigate = useNavigate();

    const handleEmailSubmit = async () => {
        try {
            const response = await fetch(`${API_URL}/api/forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (response.ok) setStep(2);
            else setMessage(data.error);
        } catch (error) {
            setMessage("An error occurred.");
        }
    };

    const handleTokenSubmit = async () => {
        const tokenValue = token.join("");
        try {
            const response = await fetch(`${API_URL}/api/verify-token`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, token: tokenValue }),
            });

            const data = await response.json();
            if (response.ok) setStep(3);
            else setMessage(data.error);
        } catch (error) {
            setMessage("An error occurred.");
        }
    };

    const handlePasswordReset = async () => {
        if (newPassword !== confirmNewPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, newPassword }),
            });

            const data = await response.json();
            if (response.ok) {
                setUpdatedEmail(email);
                setUpdatedPassword(newPassword);
                setModalVisible(true);
                setStep(1);
            } else {
                setMessage(data.error);
            }
        } catch (error) {
            setMessage("An error occurred.");
        }
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        navigate("/login");
    };

    const handleTokenChange = (index, value) => {
        const newToken = [...token];
        newToken[index] = value;
        setToken(newToken);

        if (value && index < 5) {
            document.getElementById(`token-${index + 1}`).focus();
        } else if (!value && index > 0) {
            document.getElementById(`token-${index - 1}`).focus();
        }
    };

    const isVerifyDisabled = token.some((box) => !box);

    return (
        <div className="forgot-password-container">
            <div className="forgot-password-box">
                <h1>Forgot Password</h1>

                {message && <p className="error-message">{message}</p>}

                {step === 1 && (
                    <div className="step">
                        <input
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <p className="signup-link">Don't have an account? <a href="/signup">Sign up here</a></p>
                        <p className="forgot-password"><a href="/Changepassword">Change Password?</a></p>
                        <p className="footer-text">
                            Purchase your goods online from our website and enjoy safe and free delivery to your doorstep!
                        </p>
                        <button onClick={handleEmailSubmit}>Send Code</button>
                    </div>
                )}

                {step === 2 && (
                    <div className="step">
                        <label htmlFor="">Enter Token :</label>
                        <div className="token-box">
                            {token.map((value, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    id={`token-${index}`}
                                    maxLength="1"
                                    value={value}
                                    onChange={(e) => handleTokenChange(index, e.target.value)}
                                    autoFocus={index === 0}
                                />
                            ))}
                        </div>
                        <button
                            onClick={handleTokenSubmit}
                            disabled={isVerifyDisabled}
                        >
                            Verify Code
                        </button>
                    </div>
                )}

                {step === 3 && (
                    <div className="step">
                        <input
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                        />
                        <button onClick={handlePasswordReset}>Reset Password</button>
                    </div>
                )}
            </div>

            {modalVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Password Updated</h2>
                        <p>Email: {updatedEmail}</p>
                        <p>Password: {updatedPassword}</p>
                        <button onClick={handleCloseModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ForgottenPassword;
