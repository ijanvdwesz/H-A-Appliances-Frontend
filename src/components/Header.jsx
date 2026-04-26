import React, { useState, useContext } from "react";
import "../styles/Header.css";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { FaShoppingCart, FaPhone, FaEnvelope } from "react-icons/fa";

function Header({ categories = [], variant = "store" }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const navigate = useNavigate();
  const { cart } = useContext(CartContext);

  const handleSearch = () => {
    const query = new URLSearchParams();
    if (searchTerm) query.set("q", searchTerm);
    if (selectedCategory) query.set("category", selectedCategory);
    if (minPrice) query.set("minPrice", minPrice);
    if (maxPrice) query.set("maxPrice", maxPrice);
    navigate(`/store?${query.toString()}`);
  };

  const handleApplyFilters = () => {
    const query = new URLSearchParams();
    if (searchTerm) query.set("q", searchTerm);
    if (selectedCategory) query.set("category", selectedCategory);
    if (minPrice) query.set("minPrice", minPrice);
    if (maxPrice) query.set("maxPrice", maxPrice);
    navigate(`/store?${query.toString()}`);
  };

  const goToCart = () => navigate("/cart");

  return (
    <header className="header">
      <div className="header-top">
        {/* Logo */}
        <div className="logo-container" onClick={() => navigate("/")}>
          <div className="logo-glow-wrapper">
            <img
              src="/assets/logo/ACSystems4U-Logo.jpeg"
              alt="Logo"
              className="logo"
            />
          </div>
          <div className="title-text-glow">
            <h1 className="title-text">AC Systems 4U</h1>
          </div>
        </div>

        {/* SEARCH AREA (UPDATED STRUCTURE) */}
        <div className="search-container">
          {/* SEARCH BAR */}
          <input
            type="text"
            placeholder="Search products..."
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* BUTTON + CART GROUP */}
          <div className="search-container-bottom">
            <button onClick={handleSearch} className="search-button">
              Search
            </button>

            {variant === "store" && (
              <div className="cart-icon-container" onClick={goToCart}>
                <FaShoppingCart className="cart-icon" />
                {cart.length > 0 && (
                  <span className="cart-count">{cart.length}</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE (ONLY FOR NON-STORE PAGES) */}
        {variant !== "store" && (
          <div className="header-contact-info">
            <div className="contact-item">
              <FaPhone className="contact-icon" />
              <a href="tel:+27638743980" className="contact-text">
                +27638743980
              </a>
            </div>
            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <a
                href="mailto:hercules@acsystems4u.com"
                className="contact-text"
              >
                Hercules@acsystems4u.com
              </a>
            </div>
          </div>
        )}
      </div>

      {/* FILTERS */}
      <div className="filters-container">
        <select
          className="category-dropdown"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Min Price"
          className="price-input"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max Price"
          className="price-input"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <button onClick={handleApplyFilters} className="search-button">
          Apply Filters
        </button>
      </div>

      <Navbar />
    </header>
  );
}

export default Header;