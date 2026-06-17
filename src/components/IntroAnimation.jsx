import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import './IntroAnimation.css';

const IntroAnimation = ({ onComplete }) => {
  const containerControls = useAnimation();
  const cardControls = useAnimation();
  const textControls = useAnimation();

  useEffect(() => {
    let isMounted = true;
    
    const sequence = async () => {
      // Phase 1: Card Entrance (Blank card floating in)
      await cardControls.start({
        scale: 1,
        rotateY: 0,
        rotateX: 0,
        opacity: 1,
        transition: { type: 'spring', damping: 20, stiffness: 80, duration: 1.5 }
      });

      if (!isMounted) return;

      // Small pause before writing starts
      await new Promise(resolve => setTimeout(resolve, 300));

      // Phase 2: Typing Text (Magic UI)
      await textControls.start('visible');

      if (!isMounted) return;

      // Pause for reading
      await new Promise(resolve => setTimeout(resolve, 1200));

      if (!isMounted) return;

      // Phase 3: Zoom In to Home Page
      cardControls.start({
        scale: 50,
        opacity: 0,
        transition: { duration: 1.4, ease: "easeInOut" }
      });
      
      await containerControls.start({
        opacity: 0,
        transition: { duration: 1.0, delay: 0.4, ease: "easeInOut" }
      });

      if (isMounted) {
        onComplete();
      }
    };
    
    sequence();
    
    return () => {
      isMounted = false;
    };
  }, [cardControls, textControls, containerControls, onComplete]);

  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 15, filter: 'blur(5px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
  };
  
  const lineVariants = {
    hidden: { opacity: 0, scaleX: 0, originX: 0 },
    visible: { opacity: 1, scaleX: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const detailVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div 
      className="intro-overlay"
      initial={{ opacity: 1 }}
      animate={containerControls}
    >
      <motion.div 
        className="visiting-card"
        initial={{ scale: 0.4, rotateY: 60, rotateX: 30, opacity: 0 }}
        animate={cardControls}
      >
        <motion.div 
          className="card-content"
          variants={textVariants}
          initial="hidden"
          animate={textControls}
        >
          <div className="card-logo">
            {"Print & Copy".split('').map((char, index) => (
              <motion.span key={index} variants={letterVariants}>
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </div>
          <motion.div className="card-divider" variants={lineVariants} />
          <div className="card-details">
            <motion.p variants={detailVariants}>Premium Printing Services</motion.p>
            <motion.p variants={detailVariants}>www.printcopy.com</motion.p>
            <motion.p variants={detailVariants}>+1 (555) 123-4567</motion.p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default IntroAnimation;
