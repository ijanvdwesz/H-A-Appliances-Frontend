import React, { useState } from "react";
import QuoteForm from "../components/QuoteForm";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import "../styles/AboutContactPage.css";

function AboutContactPage() {
  const [showForm, setShowForm] = useState(false);
  const [burgerOpen, setBurgerOpen] = useState(false);

  return (
    <div className="about-contact-page">

      {/* ✅ REPLACED HEADER */}
      <Header variant="contact" />

      {/* About Section */}
      <section className="about-section">
        <h2>About US</h2>
        <p>
          H&A is your trusted partner for refrigeration, cold rooms,
          aircon and water heater installations. Our Industry Proffesionals provide high-quality
          products, expert advice, and outstanding service to keep your
          equipment running smoothly.
        </p>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <h2>Contact Us</h2>
        <p>
          <strong>Email:</strong>{" "}
          <a href="mailto:Herculesmulder94@gmail.com">
            Herculesmulder94@gmail.com
          </a>
        </p>
        <p>
          <strong>Phone:</strong>{" "}
          <a href="tel:+19407641751">+1 (940) 764-1751</a>
        </p>
        <p>
          <strong>Address:</strong> 123 Cold Street, Pretoria, South Africa
        </p>

        <button
          className="contact-form-btn"
          onClick={() => setShowForm(true)}
        >
          Send a Message / Request Quote
        </button>
      </section>

      {/* Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="close-modal-btn"
              onClick={() => setShowForm(false)}
            >
              &times;
            </button>
            <QuoteForm onSuccess={() => setShowForm(false)} />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} H&A Appliances. All rights reserved.</p>
        <p>
          <strong>Email:</strong>{" "}
          <a href="mailto:info@H&Aappliances@gmail.com">
            info@H&Aappliances@gmail.com
          </a>{" "}
          /{" "}
          <a href="mailto:hercules@acsystems4u.com">
            Hercules@acsystems4u.com
          </a>{" "}
          | <strong>Phone:</strong>{" "}
          <a href="tel:+27123456789">+27 12 345 6789</a>
        </p>
      </footer>
    </div>
  );
}

export default AboutContactPage;