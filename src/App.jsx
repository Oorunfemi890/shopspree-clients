import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/loginPage";
import SignUpPage from "./pages/signUpPage";
import ProfilePage from "./pages/ProfilePage";
import ProductUpload from "./pages/ProductUpload";
import ChangePassword from "./pages/ChangePasswordPage";
import ForgottenPassword from "./pages/ForgottenPassword"

function App() {
  const { isLoggedIn, userInfo } = useSelector((state) => state.user);
  const isAuthenticated = isLoggedIn && userInfo && userInfo.email;

  return (
    <Router>
      <Navbar/>

      <Routes>
        
        <Route path="/product" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/productUpload" element={<ProductUpload />} />
        <Route path="/ChangePassword" element={<ChangePassword/>} />
        <Route path="/ForgottenPassword" element={<ForgottenPassword/>} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/profile" /> : <LoginPage />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/profile" /> : <SignUpPage />} />
        <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
