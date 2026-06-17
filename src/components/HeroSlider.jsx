import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './HeroSlider.css';

const slides = [
  { id: 1, image: 'https://images.unsplash.com/photo-1562240020-ce31ccb0fa7d?q=80&w=1920&auto=format&fit=crop', title: 'Premium Commercial Printing', subtitle: 'Vibrant colors, sharp details.', buttonText: 'Shop & Save Now' },
  { id: 2, image: 'https://images.unsplash.com/photo-1594957685954-2b0e77d24ab9?q=80&w=1920&auto=format&fit=crop', title: 'Fast & Reliable Copying', subtitle: 'High volume, quick turnaround.', buttonText: 'Get Started' },
  { id: 3, image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1920&auto=format&fit=crop', title: 'Creative Graphic Design', subtitle: 'We bring your ideas to life.', buttonText: 'View Portfolio' },
  { id: 4, image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=1920&auto=format&fit=crop', title: 'Custom Marketing Materials', subtitle: 'Brochures, flyers, and more.', buttonText: 'Explore Options' }
];

const SLIDE_DURATION = 5000;

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="hero-slider">
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentSlide} 
          className="slide active"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="slide-bg" style={{ backgroundImage: `url(${slides[currentSlide].image})` }} />
          <div className="slide-overlay">
            <div className="container slide-content-wrapper">
              <motion.div 
                className="slide-content"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.2, delayChildren: 0.3 }
                  }
                }}
              >
                <motion.h1 
                  className="slide-title"
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 20, stiffness: 100 } }
                  }}
                >{slides[currentSlide].title}</motion.h1>
                <motion.p 
                  className="slide-subtitle"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 20, stiffness: 100 } }
                  }}
                >{slides[currentSlide].subtitle}</motion.p>
                <motion.button 
                  className="btn btn-red mt-4"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 20, stiffness: 100 } }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >{slides[currentSlide].buttonText}</motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows (Appear on Hover) */}
      <div className="slider-nav">
        <button className="nav-arrow left" onClick={prevSlide} aria-label="Previous Slide">
          <ChevronLeft size={32} />
        </button>
        <button className="nav-arrow right" onClick={nextSlide} aria-label="Next Slide">
          <ChevronRight size={32} />
        </button>
      </div>

      {/* Pagination Line */}
      <div className="slider-pagination">
        <span className="page-num">{currentSlide + 1}</span>
        <div className="page-lines">
          {slides.map((_, i) => (
            <div 
              key={i} 
              className={`page-line ${i === currentSlide ? 'active' : ''}`} 
              onClick={() => setCurrentSlide(i)}
            />
          ))}
        </div>
        <span className="page-num">{slides.length}</span>
      </div>

      {/* Circular Timer */}
      <div className="slider-timer">
        <svg className="progress-ring" width="44" height="44">
          <circle 
            className="progress-ring-circle-bg" 
            stroke="rgba(255,255,255,0.2)" 
            strokeWidth="2" 
            fill="transparent" 
            r="18" 
            cx="22" 
            cy="22" 
          />
          <circle 
            key={currentSlide} 
            className="progress-ring-circle" 
            stroke="var(--color-white)" 
            strokeWidth="2" 
            fill="transparent" 
            r="18" 
            cx="22" 
            cy="22" 
          />
        </svg>
      </div>
    </div>
  );
};

export default HeroSlider;
