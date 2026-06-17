import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './CustomIdeas.css';

const CustomIdeas = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section className="section-padding custom-ideas-section" ref={ref}>
      <div className="container">
        <div className="custom-ideas-wrapper">
          <motion.div 
            className="custom-ideas-text"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="section-title">Go-to place for Out-of-the-box & customized ideas!</h2>
            <p className="ideas-desc">
              Transform your imagination into reality. Whether it's printing on a mug, 
              customizing shirts, or creating unique corporate gifts, we bring your 
              wildest ideas to life with premium quality printing.
            </p>
            <button className="btn btn-red mt-4">Start Customizing</button>
          </motion.div>

          <motion.div 
            className="custom-ideas-image"
            initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
            animate={inView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="ideas-img-container">
              {/* Replace with actual image later */}
              <img 
                src="https://images.unsplash.com/photo-1529336953128-a85760f58cb5?q=80&w=1000&auto=format&fit=crop" 
                alt="Custom Printing Ideas" 
              />
              <div className="ideas-glow"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CustomIdeas;
