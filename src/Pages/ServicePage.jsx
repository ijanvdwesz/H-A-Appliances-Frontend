import React, { useState, useEffect } from "react";
import Header from "../components/Header"; // ✅ Add header
import "../styles/Services.css";
import QuoteModal from "./QuoteModal";

const services = [
  {
    title: "Air Conditioning",
    basePath: "/assets/services/Aircon",
    desc: "Installation, repair & maintenance of AC systems.",
    quoteOptions: [
      { label: "Install New AC", value: "ac_install" },
      { label: "Service / Repair AC", value: "ac_service" },
    ],
  },
  {
    title: "Cold Rooms",
    basePath: "/assets/services/Coldroom",
    desc: "Custom cold & freezer rooms from small to industrial scale.",
    quoteOptions: [
      { label: "Build / Install Custom Cold Room", value: "coldroom_custom" },
      { label: "Maintenance Service", value: "coldroom_maintenance" },
    ],
  },
  {
    title: "Freezers / Fridges",
    basePath: "/assets/services/Freezer",
    desc: "High efficiency freezers, fridges & regassing.",
    quoteOptions: [
      { label: "Freezer / Fridge Service", value: "freezer_service" },
    ],
  },
  {
    title: "Water Heaters",
    basePath: "/assets/services/Water-Heater",
    desc: "Installation, repair & maintenance of water heating systems.",
    quoteOptions: [
      { label: "Water Heater Service", value: "waterheater_service" },
    ],
  },
];

// Utility: cycle image index 1 → 7
function useImageCycle(total = 7, interval = 3000) {
  const [index, setIndex] = useState(1);
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev >= total ? 1 : prev + 1));
    }, interval);
    return () => clearInterval(timer);
  }, [total, interval]);
  return index;
}

function ServicesPage({ fullPage = true }) {
  const currentImageIndex = useImageCycle(7, 2500);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleQuote = (serviceValue) => {
    setSelectedService(serviceValue);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* ✅ Header on top */}
      <Header />

      <section id="services" className="services-section">
        <h2 className="services-title">Our Services</h2>

        <div className={`services-grid ${fullPage ? "full" : "preview"}`}>
          {services.map((s, i) => (
            <div key={i} className="service-card">
              <img
                src={`${s.basePath}${currentImageIndex}.jpeg`}
                alt={s.title}
                className="service-img"
              />
              <h3 className="service-heading">{s.title}</h3>
              <p className="service-desc">{s.desc}</p>

              {s.quoteOptions.map((opt, j) => (
                <button
                  key={j}
                  onClick={() => handleQuote(opt.value)}
                  className="quote-btn"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Modal */}
        <QuoteModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedService={selectedService}
        />
      </section>
    </>
  );
}

export default ServicesPage;
