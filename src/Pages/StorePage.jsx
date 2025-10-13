import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import "../styles/StorePage.css";
import { useLocation } from "react-router-dom";

function StorePage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const location = useLocation();

  const categories = [
    "Airconditioner", "Appliance spares", "Compressors", "Electrical",
    "Fans", "Filter Driers", "Fridge/Cold room accessories", "Gas/ Oil",
    "Sales Items", "Shoes", "Tape/PVC/Trunking/Screws", "Tools and Multi Meters",
    "Tubing / Fitting / Armaflex", "Valves", "Aircon accessories", "Aircon spares",
    "Sensors", "Brackets", "Universal PC Board", "Universal Remote", "Condensation pump"
  ];

  // Read query parameters from URL and set state
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchTerm(params.get("q") || "");
    setSelectedCategory(params.get("category") || "");
    setMinPrice(params.get("minPrice") || "");
    setMaxPrice(params.get("maxPrice") || "");
  }, [location.search]);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("/api/products");
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  // Apply filters whenever products or filter state changes
  useEffect(() => {
    let filtered = products;

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(
        p => (p.category || "").toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        p => (p.title || p.name || "").toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Price filter
    if (minPrice) filtered = filtered.filter(p => p.price >= parseFloat(minPrice));
    if (maxPrice) filtered = filtered.filter(p => p.price <= parseFloat(maxPrice));

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, selectedCategory, searchTerm, minPrice, maxPrice]);

  // Pagination
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <>
      <Header
        categories={categories}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
      />

      <main className="store-page">
        <div className="product-grid">
          {currentProducts.map((p, i) => (
            <ProductCard key={i} product={p} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </main>
    </>
  );
}

export default StorePage;
