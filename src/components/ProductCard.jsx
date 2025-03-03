// ProductCard.jsx
import React from "react";
import "../styles/ProductCard.css"; // Optional CSS for styling

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} className="product-image" />
      <h2 className="product-name">{product.name}</h2>
      <p className="product-price">${product.price}</p>
      <button className="add-to-cart-button">Add to Cart</button>
    </div>
  );
};

export default ProductCard;
