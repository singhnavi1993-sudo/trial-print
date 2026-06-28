import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './ShopByIndustry.css';

const industries = [
  { name: 'Branding & Advertising', image: `${import.meta.env.BASE_URL}images/Shop by industry/Advertising Industry.jpg` },
  { name: 'Business & Corporate', image: `${import.meta.env.BASE_URL}images/Shop by industry/Corporate Industry.jpg` },
  { name: 'Education', image: `${import.meta.env.BASE_URL}images/Shop by industry/Education Industry.jpg` },
  { name: 'Events', image: `${import.meta.env.BASE_URL}images/Shop by industry/Event Industry.jpg` },
  { name: 'Healthcare', image: `${import.meta.env.BASE_URL}images/Shop by industry/Health Care Industry.jpg` },
  { name: 'Hotels & Restaurants', image: `${import.meta.env.BASE_URL}images/Shop by industry/Hotel Industry.jpg` },
  { name: 'Home Decor & Design', image: `${import.meta.env.BASE_URL}images/Shop by industry/Home decor .jpg` }
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
          className="section-header center-header"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2>Shop By Industry</h2>
          <p className="subtitle">Which Industry do you belong to?</p>
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
                rotateY: 5, 
                rotateX: -5,
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                borderColor: 'var(--color-red)'
              }}
            >
              <div className="industry-image" style={{ backgroundImage: `url("${industry.image}")` }}></div>
              <div className="industry-overlay"></div>
              <h3 className="industry-name">{industry.name}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ShopByIndustry;
