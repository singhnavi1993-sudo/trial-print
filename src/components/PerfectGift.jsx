import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './PerfectGift.css';

const gifts = [
  { name: 'Mugs', img: `${import.meta.env.BASE_URL}images/Gifting/Mugs.jpg` },
  { name: 'Tshirts', img: `${import.meta.env.BASE_URL}images/Gifting/t-shirts.jpg` },
  { name: 'Wooden Engraving', img: `${import.meta.env.BASE_URL}images/Gifting/wooden.jpg` },
  { name: 'Stone Art', img: `${import.meta.env.BASE_URL}images/Gifting/Stone.jpg` },
  { name: 'Fridge Magnets', img: `${import.meta.env.BASE_URL}images/Gifting/Fridge magnet.jpg` },
  { name: 'Photoframe Single Page', img: `${import.meta.env.BASE_URL}images/Gifting/Photoframes.png` },
  { name: 'LED Photoframe', img: `${import.meta.env.BASE_URL}images/Gifting/22.jpg` }
];

const PerfectGift = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  
  // Drag states
  const [dragStartX, setDragStartX] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Wheel scroll throttling states
  const isScrollingRef = useRef(false);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % gifts.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + gifts.length) % gifts.length);
  };

  // Setup wheel event listener on window to block vertical page scroll when hovering the slider container
  useEffect(() => {
    const handleWindowWheel = (e) => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const isHovering = (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      );

      if (isHovering) {
        e.preventDefault(); // Stop main page scrolling

        const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
        
        if (Math.abs(delta) > 15) {
          if (isScrollingRef.current) return;
          isScrollingRef.current = true;

          if (delta > 0) {
            nextSlide();
          } else {
            prevSlide();
          }

          // Throttle slide transition to allow clean snap response
          setTimeout(() => {
            isScrollingRef.current = false;
          }, 400);
        }
      }
    };

    window.addEventListener('wheel', handleWindowWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWindowWheel);
    };
  }, []);

  // Drag handlers
  const handleMouseDown = (e) => {
    setDragStartX(e.pageX);
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || dragStartX === null) return;
    const diff = e.pageX - dragStartX;
    
    // Swipe threshold to trigger transition
    if (diff > 80) {
      prevSlide();
      setDragStartX(null);
      setIsDragging(false);
    } else if (diff < -80) {
      nextSlide();
      setDragStartX(null);
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragStartX(null);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setDragStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || dragStartX === null) return;
    const diff = e.touches[0].clientX - dragStartX;
    
    if (diff > 50) {
      prevSlide();
      setDragStartX(null);
      setIsDragging(false);
    } else if (diff < -50) {
      nextSlide();
      setDragStartX(null);
      setIsDragging(false);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setDragStartX(null);
  };

  // Helper to compute wrapped relative indexes (-half to +half of array size)
  const getRelativeIndex = (index) => {
    let diff = index - activeIndex;
    const half = Math.floor(gifts.length / 2);
    
    if (diff > half) {
      diff -= gifts.length;
    } else if (diff < -half) {
      diff += gifts.length;
    }
    return diff;
  };

  return (
    <section className="section-padding perfect-gift-section" ref={ref}>
      <div className="container">
        <div className="gift-header-container">
          <motion.div 
            className="section-header center-header"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2>Looking for a perfect Gift?</h2>
            <p className="subtitle text-center">Personalized gifts for everyone</p>
          </motion.div>
        </div>
      </div>

      {/* 3D Coverflow Container */}
      <div 
        className="gift-carousel-container"
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="gift-carousel-track">
          {gifts.map((gift, index) => {
            const diff = getRelativeIndex(index);
            const isActive = diff === 0;
            const absDiff = Math.abs(diff);
            const isVisible = absDiff <= 3; // Show 3 images to the left, 1 center, and 3 to the right
            
            // Calculate progressive 3D translation, rotation & scale
            let translateX = 0;
            let scale = 1;
            let rotateY = 0;
            let opacity = 1;
            let zIndex = 10 - absDiff;

            if (isActive) {
              translateX = 0;
              scale = 1;
              rotateY = 0;
              opacity = 1;
            } else {
              const sign = diff < 0 ? -1 : 1;
              if (absDiff === 1) {
                translateX = sign * 220;
                scale = 0.85;
                rotateY = diff < 0 ? 30 : -30;
                opacity = 0.9;
              } else if (absDiff === 2) {
                translateX = sign * 410;
                scale = 0.7;
                rotateY = diff < 0 ? 35 : -35;
                opacity = 0.7;
              } else if (absDiff === 3) {
                translateX = sign * 560;
                scale = 0.55;
                rotateY = diff < 0 ? 40 : -40;
                opacity = 0.45;
              }
            }

            if (!isVisible) {
              opacity = 0;
              scale = 0.4;
            }

            return (
              <div 
                key={index} 
                className={`gift-carousel-card ${isActive ? 'is-active' : ''}`}
                style={{
                  transform: `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
                  opacity: opacity,
                  zIndex: zIndex,
                  pointerEvents: isVisible ? 'auto' : 'none'
                }}
                onClick={() => setActiveIndex(index)}
              >
                <div className="gift-img-wrapper">
                  <img src={gift.img} alt={gift.name} />
                </div>
                <h4 className="gift-name">{gift.name}</h4>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PerfectGift;
