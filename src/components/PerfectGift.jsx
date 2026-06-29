import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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

  const sliderRef = useRef(null);
  
  // Drag to scroll state
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDown(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const slide = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 280; // card width + gap
      if (direction === 'left') {
        sliderRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <section className="section-padding perfect-gift-section" ref={ref}>
      <div className="container">
        
        <div className="gift-header-container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2>Looking for a perfect Gift?</h2>
            <p className="subtitle">Personalized gifts for everyone</p>
          </motion.div>
          
          <div className="gift-slider-controls">
            <button className="gift-control-btn" onClick={() => slide('left')} aria-label="Previous">
              <ChevronLeft size={24} />
            </button>
            <button className="gift-control-btn" onClick={() => slide('right')} aria-label="Next">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <motion.div 
          className={`gift-slider ${isDown ? 'is-dragging' : ''}`}
          ref={sliderRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          style={{ cursor: isDown ? 'grabbing' : 'grab' }}
        >
          {gifts.map((gift, index) => (
            <motion.div 
              key={index} 
              className="gift-card"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="gift-img-wrapper">
                <img src={gift.img} alt={gift.name} />
                <div className="gift-overlay">
                  <span>Customize</span>
                </div>
              </div>
              <h4 className="gift-name">{gift.name}</h4>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PerfectGift;
