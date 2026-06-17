import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './ShopByOccasion.css';

const occasions = [
  { name: 'Award Night', bgImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop' },
  { name: 'Celebrations', bgImage: 'https://images.unsplash.com/photo-1530103862676-de889dd08ce6?q=80&w=800&auto=format&fit=crop' },
  { name: 'Corporate Events', bgImage: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800&auto=format&fit=crop' },
  { name: 'Weddings', bgImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop' }
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
          className="section-header text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title text-yellow">Shop By Occasion</h2>
          <p className="section-subtitle">Looking for a particular occasion?</p>
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
                style={{ backgroundImage: `url(${occasion.bgImage})` }}
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
