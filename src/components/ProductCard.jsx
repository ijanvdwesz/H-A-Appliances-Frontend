import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ProductCard.css";
import { CartContext } from "../context/CartContext";
import { formatPrice } from "../utils/formatPrice";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const [expanded, setExpanded] = useState(false);
  const [showAddedMsg, setShowAddedMsg] = useState(false);
  const navigate = useNavigate();

  // Defensive defaults
  const title = product.title || product.name || "No title";
  const price = Number(product.price) || 0;
  const description = product.description || "";

  const shortDesc = description.length > 100 ? description.slice(0, 100) + "..." : description;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({ ...product, price }); // ensure numeric price
    setShowAddedMsg(true);
    setTimeout(() => setShowAddedMsg(false), 1500);
  };

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/product/${product._id}`)}
      style={{ cursor: "pointer" }}
    >
      <img src={product.image || ""} alt={title} className="product-image" />
      <div className="product-info">
        <h3 className="product-title">{title}</h3>
        <p className="product-desc">{expanded ? description : shortDesc}</p>
        {description.length > 100 && (
          <button
            className="toggle-btn"
            onClick={(e) => {
              e.stopPropagation();
              setExpanded((prev) => !prev);
            }}
          >
            {expanded ? "View Less" : "View More"}
          </button>
        )}
        <p className="product-price">R {formatPrice(price)}</p>

        <div className="product-actions">
          <button onClick={handleAddToCart} className="add-cart-btn">
            Add to Cart
          </button>
        </div>

        {showAddedMsg && <p className="added-msg">✅ Added to cart!</p>}
      </div>
    </div>
  );
}

export default ProductCard;
