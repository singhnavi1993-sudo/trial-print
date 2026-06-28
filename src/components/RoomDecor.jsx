import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import './AestheticSections.css';

const RoomDecor = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section className="aesthetic-section" ref={ref}>
      <div className="aesthetic-bg">
        <motion.img 
          src={`${import.meta.env.BASE_URL}images/Room/1.jpg`} 
          alt="Room Decor"
          style={{ y }}
        />
        <div className="aesthetic-overlay"></div>
      </div>
      <div className="container aesthetic-content">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="aesthetic-title">Ready to beautify your Room?</h2>
          <p className="aesthetic-subtitle">Custom wall art, canvas prints, and personalized decor.</p>
          <button className="btn btn-yellow mt-4">Explore Decor</button>
        </motion.div>
      </div>
    </section>
  );
};

export default RoomDecor;
