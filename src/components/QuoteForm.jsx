import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/QuoteForm.css";

function QuoteForm({ prefillService, onSuccess }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    services: [],
    length: "",
    width: "",
    height: "",
    temperature: "",
    acRoomSize: "",
    acType: "",
    maintenanceType: "",
    maintenanceFreq: "",
    specialInstructions: "",
    name: "",
    email: "",
    phone: "",
    location: "",
  });

  // ✅ Pre-fill selected service
  useEffect(() => {
    if (prefillService) {
      setForm((prev) => ({
        ...prev,
        services: [prefillService],
      }));
    }
  }, [prefillService]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        services: checked
          ? [...prev.services, value]
          : prev.services.filter((s) => s !== value),
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ✅ Submit & close modal on success
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formEl = e.target;
    if (!formEl.checkValidity()) {
      formEl.reportValidity();
      return;
    }

    try {
      await axios.post("/api/quote", form); // sends to DB + triggers mail
      alert("Quote request submitted! ColdCompany will email you back.");
      if (onSuccess) onSuccess(); // ✅ close modal
    } catch (err) {
      console.error("Error submitting quote:", err);
      alert("Error submitting form. Please try again.");
    }
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="quote-form-container">
      <h2>Request a Quote</h2>
      <form onSubmit={handleSubmit} noValidate>
        {/* Step 1 - Services */}
        <div className={`quote-form-step ${step === 1 ? "active" : "hidden"}`}>
          <h3>What services do you need?</h3>
          {["Cold Room", "Mobile Unit", "Aircon Installation", "Maintenance"].map(
            (srv) => (
              <label key={srv}>
                <input
                  type="checkbox"
                  value={srv}
                  checked={form.services.includes(srv)}
                  onChange={handleChange}
                  required={form.services.length === 0}
                />
                {srv}
              </label>
            )
          )}
          <div className="quote-form-navigation">
            <button type="button" onClick={nextStep}>
              Next
            </button>
          </div>
        </div>

        {/* Step 2 - Details */}
        <div className={`quote-form-step ${step === 2 ? "active" : "hidden"}`}>
          {(form.services.includes("Cold Room") ||
            form.services.includes("Mobile Unit")) && (
            <>
              <h3>Cold Room / Mobile Details</h3>
              <input
                type="number"
                name="length"
                placeholder="Length (m)"
                value={form.length}
                onChange={handleChange}
              />
              <input
                type="number"
                name="width"
                placeholder="Width (m)"
                value={form.width}
                onChange={handleChange}
              />
              <input
                type="number"
                name="height"
                placeholder="Height (m)"
                value={form.height}
                onChange={handleChange}
              />
              <input
                type="text"
                name="temperature"
                placeholder="Desired Temperature (°C)"
                value={form.temperature}
                onChange={handleChange}
              />
            </>
          )}

          {form.services.includes("Aircon Installation") && (
            <>
              <h3>Aircon Details</h3>
              <input
                type="number"
                name="acRoomSize"
                placeholder="Room Size (m²)"
                value={form.acRoomSize}
                onChange={handleChange}
              />
              <input
                type="text"
                name="acType"
                placeholder="AC Type (Split / Ducted / Portable)"
                value={form.acType}
                onChange={handleChange}
              />
            </>
          )}

          {form.services.includes("Maintenance") && (
            <>
              <h3>Maintenance Details</h3>
              <input
                type="text"
                name="maintenanceType"
                placeholder="System Type (Cold room / AC / Freezer)"
                value={form.maintenanceType}
                onChange={handleChange}
              />
              <input
                type="text"
                name="maintenanceFreq"
                placeholder="Frequency (Monthly / Quarterly)"
                value={form.maintenanceFreq}
                onChange={handleChange}
              />
            </>
          )}

          {/* ✅ Special Instructions */}
          <h3>Special Instructions (optional)</h3>
          <textarea
            name="specialInstructions"
            placeholder="Any notes, delivery details, or specific requirements?"
            value={form.specialInstructions}
            onChange={handleChange}
            rows={4}
            className="quote-textarea"
          ></textarea>

          <div className="quote-form-navigation">
            <button type="button" onClick={prevStep}>
              Back
            </button>
            <button type="button" onClick={nextStep}>
              Next
            </button>
          </div>
        </div>

        {/* Step 3 - Contact Info */}
        <div className={`quote-form-step ${step === 3 ? "active" : "hidden"}`}>
          <h3>Your Contact Info</h3>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
          />

          <div className="quote-form-navigation">
            <button type="button" onClick={prevStep}>
              Back
            </button>
            <button type="submit">Submit Request</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default QuoteForm;