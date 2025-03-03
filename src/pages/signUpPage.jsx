import React, { useState, useEffect } from 'react';
import "../styles/signup.css"; 
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState(['', '', '', '', '', '']);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1);
  const [countdownTime, setCountdownTime] = useState(120);
  const [canResend, setCanResend] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  

  useEffect(() => {
    if (countdownTime > 0) {
      const timer = setTimeout(() => setCountdownTime(countdownTime - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdownTime]);

  const showPinStep = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5002/api/send-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setMessage("Pin sent successfully! Check your email.");
        setStep(2);
        setCountdownTime(60); 
        setCanResend(false);
      } else {
        setMessage(result.message || "Failed to send the pin.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  const resendPin = async () => {
    if (!canResend) return;

    try {
      const response = await fetch('http://localhost:5002/api/send-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const result = await response.json();
      if (result.success) {
        setCountdownTime(120); 
        setCanResend(false); 
        setMessage("Pin resent successfully.");
      } else {
        setMessage(result.message || "Failed to resend the pin.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const showPersonalDetailsStep = async () => {
    const fullPin = pin.join('');
    if (fullPin.length === 6) {
      try {
        const response = await fetch('http://localhost:5002/api/verify-pin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pin: fullPin, email })
        });

        const result = await response.json();
        if (result.success) {
          setMessage('Your email has been verified successfully!');
          setStep(3);
        } else {
          setMessage(result.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const showPasswordStep = () => {
    if (phoneNumber) {
      setStep(4);
    }
  };

  const submitForm = async () => {
    if (password === confirmPassword) {
      try {
        const response = await fetch('http://localhost:5002/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, phoneNumber, firstName, lastName })
        });

        const result = await response.json();
        if (result.success) {
          alert("Registration successful!");
          navigate("/login"); 
        } else {
          alert("Registration failed: " + result.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      setMessage('Passwords do not match.');
    }
  };

  const handlePinChange = (e, index) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return;
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value && index < 5) {
      document.getElementById(`pin-input-${index + 1}`).focus();
    }
  };

  const goBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="signup-container">
      <h2>ShopSpree Sign Up</h2>

      {message && <p className="alert">{message}</p>}

      {step > 1 && (
        <span className="back-icon" onClick={goBack}>←</span>
      )}

      {step === 1 && (
        <div className="email-step">
          <label htmlFor="email">Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <button onClick={showPinStep}>Continue</button>
        </div>
      )}

      {step === 2 && (
        <div className="pin-step">
          <div className="email-display">
            <p>Sending PIN to: {email}</p>
            <button className="edit-email" onClick={() => setStep(1)}>Edit</button>
          </div>
          <p>Enter the 6-digit pin sent to your email. ({Math.floor(countdownTime / 60)}:{countdownTime % 60 < 10 ? '0' : ''}{countdownTime % 60} remaining)</p>
          <div className="pin-inputs">
            {pin.map((digit, index) => (
              <input
                key={index}
                id={`pin-input-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handlePinChange(e, index)}
                maxLength="1"
                required
              />
            ))}
          </div>
          <button onClick={showPersonalDetailsStep} disabled={pin.includes('')}>Continue</button>
          <button
            className="resend-btn"
            onClick={resendPin}
            disabled={!canResend}
          >
            Resend Pin
          </button>        </div>
      )}

      {step === 3 && (
        <div className="personal-details-step">
          <label htmlFor="first-name">First Name:</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />

          <label htmlFor="last-name">Last Name:</label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />

          <label htmlFor="phone-number">Phone Number:</label>
          <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />

          <button onClick={showPasswordStep}>Continue</button>
        </div>
      )}

      {step === 4 && (
        <div className="password-step">
          <label htmlFor="password">Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <label htmlFor="confirm-password">Confirm Password:</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

          <small className="password-info">
            Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.
          </small>

          <button onClick={submitForm}>Sign Up</button>
        </div>
      )}

      <p className="links">
        <p>If you have an account, <a href="/login">click here to login</a></p>
        <a href="/Changepassword">Change Password?</a>
      </p>

      <p className="footer-text">Purchase your goods online from our website and enjoy safe and free delivery to your doorstep!</p>
    </div>
  );
};

export default SignUp;
