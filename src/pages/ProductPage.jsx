// ProductPage.jsx (Updated with Toggle)
import React, { useState } from "react";
import "../styles/ProductPage.css";
import ProductCard from "../components/ProductCard";

const ProductPage = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="product-layout">
      <button className="toggle-sidebar-btn" onClick={() => setShowSidebar(!showSidebar)}>
        {showSidebar ? "Hide Menu" : "Show Menu"}
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${showSidebar ? "show" : ""}`}>
        <h3>Categories</h3>
        <ul>
          <li>Appliances</li>
          <li>Phone & Tablets</li>
          <li>Electronics</li>
          <li>Games</li>
          <li>Electricals</li>
          <li>Baby Products</li>
          <li>Clothes</li>
          <li>Computers</li>
        </ul>
      </div>

      {/* Main Carousel */}
      <div className="carousel">
        <img src="" alt="Slide 1" />
        <img src="" alt="Slide 2" />
        <img src="" alt="Slide 3" />
        <img src="" alt="Slide 4" />
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {[...Array(75)].map((_, index) => (
          <ProductCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
