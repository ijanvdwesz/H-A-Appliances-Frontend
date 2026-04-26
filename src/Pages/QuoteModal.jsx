import React from "react";
import QuoteForm from "../components/QuoteForm";
import "../styles/QuoteModal.css";

function QuoteModal({ isOpen, onClose, selectedService }) {
  if (!isOpen) return null;

  const handleSuccess = () => {
    // ✅ Close modal after successful submission
    onClose();
  };

  return (
    <div className="quote-modal-overlay" onClick={onClose}>
      <div
        className="quote-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="quote-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        {/* Form */}
        <QuoteForm
          prefillService={selectedService || ""}
          onSuccess={handleSuccess}
        />
      </div>
    </div>
  );
}

export default QuoteModal;