import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "../styles/CartPage.css";

function CartPage() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleRemove = (id, name) => {
    if (window.confirm(`Remove "${name || "this item"}" from cart?`)) {
      removeFromCart(id);
    }
  };

  return (
    <div className="cart-page">
      <h2>Your Shopping Cart</h2>

      {cart.length === 0 ? (
        <p>
          Your cart is empty. <Link to="/store">Go shopping</Link>
        </p>
      ) : (
        <>
          <div className="cart-list">
            {cart.map((item) => (
              <div key={item._id} className="cart-item">
                <img src={item.image} alt={item.name || "Product"} />

                <div className="cart-item-info">
                  <h4>{item.name || item.title || "Unnamed Item"}</h4>
                  <p className="cart-description">
                    {item.description
                      ? item.description.slice(0, 70) + "..."
                      : "No description available."}
                  </p>
                  <p className="cart-price">R {item.price.toFixed(2)}</p>

                  <div className="quantity-controls">
                    <button onClick={() => decreaseQuantity(item._id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item._id)}>+</button>
                  </div>

                  <button
                    onClick={() =>
                      handleRemove(item._id, item.name || item.title)
                    }
                    className="remove-btn"
                  >
                    🗑 Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Total: R {total.toFixed(2)}</h3>
            <button
              onClick={() => navigate("/checkout")}
              className="checkout-btn"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
