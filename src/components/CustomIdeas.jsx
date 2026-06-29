import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import './CustomIdeas.css';

const customProducts = [
  {
    id: 1,
    title: 'Custom Mugs',
    items: '18 items',
    image: `${import.meta.env.BASE_URL}images/customisation/23.jpg`,
  },
  {
    id: 2,
    title: 'Printed T-Shirts',
    items: '16 items',
    image: `${import.meta.env.BASE_URL}images/customisation/24.jpg`,
  },
  {
    id: 3,
    title: 'Corporate Gifts',
    items: '23 items',
    image: `${import.meta.env.BASE_URL}images/customisation/26.jpg`,
  },
  {
    id: 4,
    title: 'Business Cards',
    items: '12 items',
    image: `${import.meta.env.BASE_URL}images/customisation/28.jpg`,
  },
];

const CustomIdeas = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
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
      const scrollAmount = 340; // width + gap
      if (direction === 'left') {
        sliderRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="custom-ideas-section" ref={ref}>
      <div className="container custom-ideas-container">
        
        {/* Left Side Content */}
        <div className="custom-ideas-left">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="subtitle">Premium Printing Services</span>
            <h2 className="title">Go-to place for Out-of-the-box & customized ideas!</h2>
            <p className="desc">
              Transform your imagination into reality. Whether it's printing on a mug, 
              customizing shirts, or creating unique corporate gifts, we bring your 
              wildest ideas to life with premium quality printing.
            </p>
            
            <div className="slider-controls">
              <button className="control-btn" onClick={() => slide('left')} aria-label="Previous">
                <ChevronLeft size={20} />
              </button>
              <button className="control-btn" onClick={() => slide('right')} aria-label="Next">
                <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right Side Slider */}
        <div className="custom-ideas-right">
          <motion.div 
            className={`cards-slider ${isDown ? 'is-dragging' : ''}`}
            ref={sliderRef}
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            style={{ cursor: isDown ? 'grabbing' : 'grab' }}
          >
            {customProducts.map((product) => (
              <div className="product-card" key={product.id}>
                <div className="card-image">
                  <img src={product.image} alt={product.title} />
                </div>
                <div className="card-footer">
                  <div className="card-info">
                    <h3>{product.title}</h3>
                    <span>{product.items}</span>
                  </div>
                  <button className="card-action-btn" aria-label="View Product">
                    <ArrowUpRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
        
      </div>
    </section>
  );
};

export default CustomIdeas;
