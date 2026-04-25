import React, { useState } from "react";
import Header from "../components/Header";
import "../styles/Services.css";
import QuoteModal from "./QuoteModal";

const services = [
  {
    title: "Air Conditioning",
    image: "Snowman2.png",
    desc: "Installation, repair & maintenance of AC systems.",
    quoteOptions: [
      { label: "Install New AC", value: "ac_install" },
      { label: "Service / Repair AC", value: "ac_service" },
    ],
  },
  {
    title: "Cold Rooms",
    image: "ColdRoom-Snowman1.png",
    desc: "Custom cold & freezer rooms from small to industrial scale.",
    quoteOptions: [
      { label: "Build / Install Custom Cold Room", value: "coldroom_custom" },
      { label: "Maintenance Service", value: "coldroom_maintenance" },
    ],
  },
  {
    title: "Mobile Units",
    image: "MobileUnits-Snowman1.png",
    desc: "Refrigerated trucks & mobile cold rooms for transport and events.",
    quoteOptions: [
      { label: "Install Mobile Unit", value: "mobile_install" },
      { label: "Service / Repair Unit", value: "mobile_service" },
    ],
  },
  {
    title: "Freezers / Fridges",
    image: "RefrigeratorSnowman1.png",
    desc: "High efficiency freezers, fridges & regassing.",
    quoteOptions: [
      { label: "Freezer / Fridge Service", value: "freezer_service" },
    ],
  },
  {
    title: "Water Heaters",
    image: "WaterHeater-Snowman1.png",
    desc: "Installation, repair & maintenance of water heating systems.",
    quoteOptions: [
      { label: "Water Heater Service", value: "waterheater_service" },
    ],
  },
];

function ServicesPage({ fullPage = true }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleQuote = (serviceValue) => {
    setSelectedService(serviceValue);
    setIsModalOpen(true);
  };

  return (
    <>
      <Header />

      <section id="services" className="services-section">
        <h2 className="services-title">Our Services</h2>

        <div className={`services-grid ${fullPage ? "full" : "preview"}`}>
          {services.map((s, i) => (
            <div key={i} className="service-card">
              <img
                src={`/assets/services/${s.image}`}
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