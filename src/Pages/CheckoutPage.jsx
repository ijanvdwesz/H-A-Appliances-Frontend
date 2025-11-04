import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "../styles/CheckoutPage.css";
import BASE_URL from "../config";
import { formatPrice } from "../utils/formatPrice";

function CheckoutPage() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [stage, setStage] = useState(1);
  const [delivery, setDelivery] = useState({ name: "", email: "", address: "", phone: "" });
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePayFast = async () => {
    if (!delivery.name || !delivery.email || !delivery.address || !delivery.phone) {
      alert("Please fill in all required delivery fields.");
      return;
    }

    try {
      setLoading(true);
      // 1️⃣ Send confirmation email
      const emailResponse = await sendConfirmationEmail();
      if (!emailResponse.ok) {
        const errData = await emailResponse.json();
        console.error("Email API error:", errData);
        alert("Failed to send confirmation email. Please try again.");
        setLoading(false);
        return;
      }

      // 2️⃣ Proceed with payment simulation
      alert("Redirecting to PayFast Sandbox...");

      // 3️⃣ Clear cart and show confirmation
      clearCart();
      setStage(3);
      setTimeout(() => navigate("/"), 4000);
    } catch (error) {
      console.error("Payment/email error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const sendConfirmationEmail = async () => {
    return fetch(`${BASE_URL}/api/send-confirmation`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: delivery.name,
        email: delivery.email,
        total,
        address: delivery.address,
        cart,
      }),
    });
  };

  return (
    <div className="checkout-page">
      {stage === 1 && (
        <div className="delivery-form">
          <h2>Delivery Information 🚚</h2>

          <input
            type="text"
            placeholder="Full Name"
            value={delivery.name}
            onChange={(e) => setDelivery({ ...delivery, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={delivery.email}
            onChange={(e) => setDelivery({ ...delivery, email: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={delivery.phone}
            onChange={(e) => setDelivery({ ...delivery, phone: e.target.value })}
            required
          />
          <textarea
            placeholder="Delivery Address"
            value={delivery.address}
            onChange={(e) => setDelivery({ ...delivery, address: e.target.value })}
            required
          />

          <div className="cart-summary-checkout">
            <h3>Order Summary:</h3>
            {cart.map((item) => (
              <p key={item._id}>
                {item.name} x{item.quantity} - R{formatPrice(item.price * item.quantity)}
              </p>
            ))}
            <p>
              <strong>Total: R{formatPrice(total)}</strong>
            </p>
          </div>

          <button
            disabled={!delivery.name || !delivery.email || !delivery.phone || !delivery.address}
            onClick={() => setStage(2)}
          >
            Proceed to Payment
          </button>
        </div>
      )}

      {stage === 2 && (
        <div className="payment-section">
          <h2>Payment 💳</h2>
          <p>Total: <strong>R {formatPrice(total)}</strong></p>
          <button onClick={handlePayFast} disabled={loading}>
            {loading ? "Processing..." : "Pay with PayFast Sandbox"}
          </button>
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
