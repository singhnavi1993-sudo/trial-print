import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './HeroSlider.css';

const slides = [
  { id: 1, image: `${import.meta.env.BASE_URL}images/Banner/banner ad 1.jpg`, title: 'Premium Commercial Printing', subtitle: 'Vibrant colors, sharp details.', buttonText: 'Shop & Save Now' },
  { id: 2, image: `${import.meta.env.BASE_URL}images/Banner/banner ad 2.jpg`, title: 'Fast & Reliable Copying', subtitle: 'High volume, quick turnaround.', buttonText: 'Get Started' },
  { id: 3, image: `${import.meta.env.BASE_URL}images/Banner/banner 3.jpg`, title: 'Creative Graphic Design', subtitle: 'We bring your ideas to life.', buttonText: 'View Portfolio' }
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

  const getRelativeIndex = (i, current, length) => {
    let d = i - current;
    if (d > length / 2) d -= length;
    if (d < -length / 2) d += length;
    return d;
  };

  return (
    <div className="hero-slider">
      <div className="slides-container">
        {slides.map((slide, i) => {
          const d = getRelativeIndex(i, currentSlide, slides.length);
          // width = 80%, gap = 2%, step = 82%, center start = 10%
          const leftPos = 10 + (d * 82);
          
          return (
            <div 
              key={slide.id} 
              className={`slide ${d === 0 ? 'active' : ''}`}
              style={{ 
                left: `${leftPos}%`,
                zIndex: d === 0 ? 10 : 5 - Math.abs(d)
              }}
              onClick={() => { if (d !== 0) setCurrentSlide(i); }}
            >
              <div className="slide-bg" style={{ backgroundImage: `url("${slide.image}")` }} />
              {/* Optional overlay/content if needed */}
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
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
    </div>
  );
};

export default HeroSlider;
