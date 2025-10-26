import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "../styles/CheckoutPage.css";
import BASE_URL from "../config";
import { formatPrice } from "../utils/formatPrice"; // ✅ import helper

function CheckoutPage() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [stage, setStage] = useState(1);
  const [delivery, setDelivery] = useState({ name: "", email: "", address: "", phone: "" });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePayFast = async () => {
    try {
      alert("Redirecting to PayFast Sandbox...");
      await sendConfirmationEmail();
      clearCart();
      setStage(3);
      setTimeout(() => navigate("/"), 4000);
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    }
  };

  const sendConfirmationEmail = async () => {
    try {
      await fetch(`${BASE_URL}/api/send-confirmation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: delivery.name, email: delivery.email, total, address: delivery.address, cart }),
      });
    } catch (error) {
      console.error("Email send failed:", error);
    }
  };

  return (
    <div className="checkout-page">
      {stage === 1 && (
        <div className="delivery-form">
          <h2>Delivery Information 🚚</h2>

          <input type="text" placeholder="Full Name" value={delivery.name} onChange={(e) => setDelivery({ ...delivery, name: e.target.value })} />
          <input type="email" placeholder="Email Address" value={delivery.email} onChange={(e) => setDelivery({ ...delivery, email: e.target.value })} />
          <input type="text" placeholder="Phone Number" value={delivery.phone} onChange={(e) => setDelivery({ ...delivery, phone: e.target.value })} />
          <textarea placeholder="Delivery Address" value={delivery.address} onChange={(e) => setDelivery({ ...delivery, address: e.target.value })}></textarea>

          <div className="cart-summary-checkout">
            <h3>Order Summary:</h3>
            {cart.map((item) => (
              <p key={item._id}>
                {item.name} x{item.quantity} - R{formatPrice(item.price * item.quantity)}
              </p>
            ))}
            <p><strong>Total: R{formatPrice(total)}</strong></p>
          </div>

          <button disabled={!delivery.name || !delivery.email || !delivery.phone || !delivery.address} onClick={() => setStage(2)}>
            Proceed to Payment
          </button>
        </div>
      )}

      {stage === 2 && (
        <div className="payment-section">
          <h2>Payment 💳</h2>
          <p>Total: <strong>R {formatPrice(total)}</strong></p>
          <button onClick={handlePayFast}>Pay with PayFast Sandbox</button>
        </div>
      )}

      {stage === 3 && (
        <div className="confirmation">
          <h2>Order Confirmed 🎉</h2>
          <p>Thank you for your order, {delivery.name}!</p>
          <p>A confirmation email has been sent to {delivery.email}.</p>
          <p>Redirecting you to the homepage...</p>
        </div>
      )}
    </div>
  );
}

export default CheckoutPage;
