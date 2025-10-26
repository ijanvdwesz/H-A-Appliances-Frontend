import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import AdCarousel from "../components/AddCarousel";
import Services from "../components/Services";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css";
import BASE_URL from "../config";

function HomePage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/api/products`);
        const cleaned = data.map(p => ({ ...p, price: Number(p.price) }));
        setProducts(cleaned.slice(0, 12));
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  const handleViewStore = () => navigate("/store");
  const handleViewServices = () => navigate("/services");

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
