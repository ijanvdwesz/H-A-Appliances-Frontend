import React, { useEffect, useRef, useState } from "react";
import "../styles/AdCarousel.css";

function AdCarousel() {
  const carouselRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // Base images
  const images = [];
  for (let i = 1; i <= 5; i++) {
    images.push({
      src: `/assets/ad-carousel/Snowman${i}.png`,
      alt: `Snowman Scene ${i}`,
    });
  }

  // Duplicate for seamless loop
  const ads = [...images, ...images];

  // Auto-scroll (slow + smooth)
  useEffect(() => {
    const scroll = () => {
      if (!carouselRef.current || isPaused) return;

      const { scrollLeft, scrollWidth } = carouselRef.current;

      // Reset seamlessly when halfway (because duplicated)
      if (scrollLeft >= scrollWidth / 2) {
        carouselRef.current.scrollTo({ left: 0 });
      } else {
        carouselRef.current.scrollBy({ left: 320, behavior: "smooth" });
      }
    };

    const interval = setInterval(scroll, 4000); // 4 seconds
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div
      className="ad-carousel"
      onMouseEnter={() => setIsPaused(true)}   // pause on hover
      onMouseLeave={() => setIsPaused(false)}  // resume
    >
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