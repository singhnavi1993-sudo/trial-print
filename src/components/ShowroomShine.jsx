import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import './AestheticSections.css';

const ShowroomShine = () => {
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
          src={`${import.meta.env.BASE_URL}images/Showroom/roll-up-standee-cover-page-template-business-promotion_1017-59811.jpg`} 
          alt="Showroom Shine"
          style={{ y }}
        />
        <div className="aesthetic-overlay-dark"></div>
      </div>
      <div className="container aesthetic-content">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="aesthetic-title">Let your showroom shine</h2>
          <p className="aesthetic-subtitle">Premium LED Boards, Acrylic Letters, and Commercial Signages.</p>
          <button className="btn btn-red mt-4">View Signages</button>
        </motion.div>
      </div>
    </section>
  );
};

export default ShowroomShine;
