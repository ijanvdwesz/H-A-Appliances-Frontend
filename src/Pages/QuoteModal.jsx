import React from "react";
import QuoteForm from "../components/QuoteForm";
import "../styles/QuoteModal.css";

function QuoteModal({ isOpen, onClose, selectedService }) {
  if (!isOpen) return null;

  const handleSuccess = () => {
    // ✅ Close modal on successful submission
    onClose();
  };

  return (
    <div className="quote-modal-overlay" onClick={onClose}>
      <div
        className="quote-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="quote-modal-close" onClick={onClose}>
          ×
        </button>
        <QuoteForm prefillService={selectedService} onSuccess={handleSuccess} />
      </div>
    </div>
  );
}

export default QuoteModal;
