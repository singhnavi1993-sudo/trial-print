import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollDivider = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  // The line will grow from 0% to 100% width as the user scrolls to it
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);

  return (
    <div 
      ref={ref} 
      style={{
        width: '100%', 
        display: 'flex', 
        justifyContent: 'center',
        padding: '2rem 0',
        position: 'relative',
        zIndex: 10
      }}
    >
      <motion.div
        style={{
          height: '2px',
          backgroundColor: 'var(--color-red, #dc2626)',
          width: '80%', // Max width of the line relative to container
          scaleX,
          opacity,
          transformOrigin: 'center', // Grows from the center outward
          boxShadow: '0 0 10px rgba(220, 38, 38, 0.5)' // Subtle cinematic glow
        }}
      />
    </div>
  );
};

export default ScrollDivider;
