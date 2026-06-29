import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './HeroSlider.css';

const slides = [
  { id: 1, image: `${import.meta.env.BASE_URL}images/Banner/banner ad 1.jpg`, bgPosition: 'center', title: 'Premium Commercial Printing', subtitle: 'Vibrant colors, sharp details.', buttonText: 'Shop & Save Now' },
  { id: 2, image: `${import.meta.env.BASE_URL}images/Banner/banner ad 2.jpg`, bgPosition: 'right center', title: 'Fast & Reliable Copying', subtitle: 'High volume, quick turnaround.', buttonText: 'Get Started' },
  { id: 3, image: `${import.meta.env.BASE_URL}images/Banner/banner 3.jpg`, bgPosition: 'center', title: 'Creative Graphic Design', subtitle: 'We bring your ideas to life.', buttonText: 'View Portfolio' }
];

const SLIDE_DURATION = 5000;

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const getRelativeIndex = (i, current, length) => {
    let d = i - current;
    if (d > length / 2) d -= length;
    if (d < -length / 2) d += length;
    return d;
  };

  return (
    <div className="hero-slider">
      <div className="slides-container">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentSlide}
            className="slide active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{ width: '100%', left: '0%' }}
          >
            <div 
              className="slide-bg" 
              style={{ 
                backgroundImage: `url("${slides[currentSlide].image}")`,
              }} 
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Dots Pagination */}
      <div className="slider-dots">
        {slides.map((_, i) => (
          <div 
            key={i} 
            className={`dot ${i === currentSlide ? 'active' : ''}`} 
            onClick={() => setCurrentSlide(i)}
          >
            {i === currentSlide && (
              <div 
                className="dot-fill" 
                style={{ animationDuration: `${SLIDE_DURATION}ms` }} 
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
