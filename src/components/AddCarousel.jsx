import React, { useEffect, useRef } from "react";
import "../styles/AdCarousel.css";

const services = ["Aircon", "Freezer", "Coldroom", "Water-Heater"];

function AdCarousel() {
  const carouselRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    const scroll = () => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        if (scrollLeft + clientWidth >= scrollWidth) {
          carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          carouselRef.current.scrollBy({ left: 320, behavior: "smooth" });
        }
      }
    };
    const interval = setInterval(scroll, 3000);
    return () => clearInterval(interval);
  }, []);

  // Generate ads: cycle through 1–7
  const ads = [];
  for (let i = 1; i <= 7; i++) {
    services.forEach((service) => {
      ads.push({
        src: `/assets/services/${service}${i}.jpeg`,
        alt: `${service} ${i}`,
      });
    });
  }

  return (
    <div className="ad-carousel">
      <div ref={carouselRef} className="ad-track">
        {ads.map((ad, i) => (
          <div key={i} className="ad-item">
            <img src={ad.src} alt={ad.alt} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdCarousel;
