import React, { useState } from "react";
import QuoteForm from "../components/QuoteForm";
import Header from "../components/Header";
import "../styles/AboutContactPage.css";

function AboutContactPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="about-contact-page">

      {/* NEW SHARED HEADER */}
      <Header variant="contact" />

      {/* About Section */}
      <section className="about-section">
        <h2>About US</h2>
        <p>
          ACSystems4U is your trusted partner for refrigeration, cold rooms,
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
          <a href="mailto:hercules@acsystems4u.com">
            Hercules@acsystems4u.com
          </a>
        </p>

        <p>
          <strong>Phone:</strong>{" "}
          <a href="tel:+27638743980">+27 638 743 980</a>
        </p>

        <p>
          <strong>Address:</strong>Villa Solatine, Thabazimbi, South Africa
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
        <p>© {new Date().getFullYear()}ACSystems4U. All rights reserved.</p>
        <p>
          <strong>Email:</strong>{" "}
          <a href="mailto:acsystemsforyou@gmail.com">
            acsystemsforyou@gmail.com
          </a>{" "}
          /{" "}
          <a href="mailto:hercules@acsystems4u.com">
            hercules@acsystems4u.com
          </a>{" "}
          | <strong>Phone:</strong>{" "}
          <a href="tel:+27123456789">+27 12 345 6789</a>
        </p>
      </footer>
    </div>
  );
}

export default AboutContactPage;