import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import StorePage from "./Pages/StorePage";
import ProductPage from "./Pages/ProductPage";
import CartPage from "./Pages/CartPage";
import CheckoutPage from "./Pages/CheckoutPage";
import ServicePage from "./Pages/ServicePage";
import AboutContactPage from "./Pages/AboutContactPage"; 
import { CartProvider } from "./context/CartContext";
import { SpeedInsights } from "@vercel/speed-insights/react"

function App() {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/store" element={<StorePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/services" element={<ServicePage />} />
          <Route path="/contact" element={<AboutContactPage />} />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
