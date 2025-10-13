import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import AdCarousel from "../components/AddCarousel";
import Services from "../components/Services";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css";

function HomePage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("/api/products");
        setProducts(data.slice(0, 12)); // show 12 products as preview
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  const handleViewStore = () => navigate("/store");
  const handleViewServices = () => navigate("/services"); // 👈 new handler

  return (
    <>
      <Header
        categories={[
          "Airconditioner", "Appliance spares", "Compressors", "Electrical",
          "Fans", "Filter Driers", "Fridge/Cold room accessories", "Gas/ Oil",
          "Sales Items", "Shoes", "Tape/PVC/Trunking/Screws", "Tools and Multi Meters",
          "Tubing / Fitting / Armaflex", "Valves", "Aircon accessories", "Aircon spares",
          "Sensors", "Brackets", "Universal PC Board", "Universal Remote", "Condensation pump"
        ]}
      />

      {/* 👇 Make carousel clickable */}
      <div onClick={handleViewServices} style={{ cursor: "pointer" }}>
        <AdCarousel />
      </div>

      <Services />

      <section className="homepage-store-preview">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {products.map((p, i) => (
            <ProductCard key={i} product={p} />
          ))}
        </div>
        <button onClick={handleViewStore} className="view-store-button">
          View All Products
        </button>
      </section>
    </>
  );
}

export default HomePage;
