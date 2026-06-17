import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './ShopByIndustry.css';

const industries = [
  { name: 'Branding & Advertising', icon: '🎯' },
  { name: 'Business & Corporate', icon: '🏢' },
  { name: 'Education', icon: '📚' },
  { name: 'Events', icon: '🎟️' },
  { name: 'Healthcare', icon: '🏥' },
  { name: 'Hotels & Restaurants', icon: '🏨' },
  { name: 'Home Decor & Design', icon: '🛋️' }
];

const ShopByIndustry = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  return (
    <section className="section-padding industry-section" ref={ref}>
      <div className="container">
        <motion.div 
          className="section-header text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Shop By Industry</h2>
          <p className="section-subtitle">Which Industry do you belong to?</p>
        </motion.div>

        <motion.div 
          className="industry-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {industries.map((industry, index) => (
            <motion.div 
              key={index} 
              className="industry-card"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 10, 
                rotateX: -10,
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                borderColor: 'var(--color-red)'
              }}
            >
              <div className="industry-icon">{industry.icon}</div>
              <h3 className="industry-name">{industry.name}</h3>
              <div className="industry-overlay"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ShopByIndustry;
