import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './ShopByOccasion.css';

const occasions = [
  { name: 'Award Night', bgImage: `${import.meta.env.BASE_URL}images/Shop by occassion/Award nights.jpg` },
  { name: 'Celebrations', bgImage: `${import.meta.env.BASE_URL}images/Shop by occassion/celebration.jpg` },
  { name: 'Corporate Events', bgImage: `${import.meta.env.BASE_URL}images/Shop by occassion/Corporate events.jpg` },
  { name: 'Weddings', bgImage: `${import.meta.env.BASE_URL}images/Shop by occassion/wedding.jpg` }
];

const ShopByOccasion = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="section-padding occasion-section" ref={ref}>
      <div className="container">
        <motion.div 
          className="section-header center-header"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2>Shop By Occasion</h2>
          <p className="subtitle">Looking for a particular occasion?</p>
        </motion.div>

        <motion.div 
          className="occasion-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {occasions.map((occasion, index) => (
            <motion.div 
              key={index} 
              className="occasion-card"
              variants={itemVariants}
            >
              <div 
                className="occasion-bg" 
                style={{ backgroundImage: `url("${occasion.bgImage}")` }}
              ></div>
              <div className="occasion-overlay"></div>
              <div className="occasion-content">
                <h3 className="occasion-name">{occasion.name}</h3>
                <span className="occasion-btn">Explore</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ShopByOccasion;
