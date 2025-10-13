import React, { useState, useContext } from "react";
import "../styles/Header.css";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";

function Header({ categories = [] }) {
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
        {/* 🔥 Wolf + Title Combo */}
        <div
          className="logo-container"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <img
            src="/assets/logo/Wolf2.png"
            alt="Cold Company Wolf Logo"
            className="logo"
          />
          <img
            src="/assets/logo/title.png"
            alt="Cold Company Title"
            className="title-image"
          />
        </div>

        {/* 🔍 Search */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>

        {/* 🛒 Cart */}
        <div className="cart-icon-container" onClick={goToCart}>
          <FaShoppingCart className="cart-icon" />
          {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
        </div>
      </div>

      {/* 🧊 Filters */}
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
