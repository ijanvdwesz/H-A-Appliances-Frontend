import React, { useState } from "react";
import { FaPhone, FaEnvelope } from "react-icons/fa";
import QuoteForm from "../components/QuoteForm";
import Navbar from "../components/Navbar";
import "../styles/AboutContactPage.css";

function AboutContactPage() {
  const [showForm, setShowForm] = useState(false);
  const [burgerOpen, setBurgerOpen] = useState(false);

  return (
    <div className="about-contact-page">
      {/* Header */}
      <header className="about-header">
        <div className="header-images">
          {/* Left: Wolf Logo */}
          <img
            src="/assets/logo/Wolf2.png"
            alt="Logo"
            className="wolf-logo"
            onClick={() => window.location.href = "/"}
          />

          {/* Center: Neon Title */}
          <div
            className="neon-title-container"
            onClick={() => window.location.href = "/"}
          >
            <h1 className="neon-title-line neon-title-h1">AC Systems 4U</h1>
            

          {/* Right: Contact info + burger */}
          <div className="header-right">
            <div className="header-contact-info">
              <div className="contact-item">
                <FaPhone className="contact-icon" />
                <a href="tel:+19407641751" className="contact-text">
                  +1 (940) 764-1751
                </a>
              </div>
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <a href="mailto:Herculesmulder94@gmail.com" className="contact-text">
                  Herculesmulder94@gmail.com
                </a>
              </div>
              
            </div>
            <button
              className="burger-btn"
              onClick={() => setBurgerOpen(!burgerOpen)}
            >
              ☰
            </button>
          </div>
        </div>

        {/* Navbar overlay */}
        {burgerOpen && (
          <div className="burger-menu-overlay">
            <Navbar onLinkClick={() => setBurgerOpen(false)} />
          </div>
        )}
      </header>

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
          <a href="mailto:Herculesmulder94@gmail.com">Herculesmulder94@gmail.com</a>
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

      {/* Modal Form */}
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
          <a href="mailto:info@H&Aappliances@gmail.com">info@H&Aappliances@gmail.com</a>{" "}
          /{" "}
          <a href="mailto:Herculesmulder94@gmail.com">Herculesmulder94@gmail.com</a>{" "}
          | <strong>Phone:</strong>{" "}
          <a href="tel:+27123456789">+27 12 345 6789</a>
        </p>
      </footer>
    </div>
  );
}

export default AboutContactPage;
