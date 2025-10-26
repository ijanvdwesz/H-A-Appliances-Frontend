import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import axios from "axios";
import BASE_URL from "../config";
import "../styles/ProductPage.css";
import { formatPrice } from "../utils/formatPrice"; // ✅ import helper

function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/api/products`);
        setProducts(data);

        const selected = data.find((p) => p._id === id);
        setProduct(selected);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const suggested = products.filter((p) => p._id !== product._id).slice(0, 3);

  return (
    <>
      <Header />

      <div className="product-page-container">
        <div className="product-main">
          <img src={product.image} alt={product.name} className="product-image-large" />
          <div className="product-info">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p className="product-price">R {formatPrice(product.price)}</p>

            <div className="product-buttons">
              <button onClick={handleAddToCart} className="add-cart-btn">
                Add to Cart
              </button>
              {added && <span className="added-message">Added to cart!</span>}

              <button onClick={() => navigate("/cart")} className="go-cart-btn">
                Go to Cart
              </button>
              <button onClick={() => navigate("/checkout")} className="checkout-btn">
                Checkout
              </button>
            </div>
          </div>
        </div>

        {suggested.length > 0 && (
          <div className="suggested-products">
            <h3 className="suggested-title">Suggested Products</h3>
            <div className="suggested-grid">
              {suggested.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ProductPage;
