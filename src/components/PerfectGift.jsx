import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './PerfectGift.css';

const gifts = [
  { name: 'Mugs', img: `${import.meta.env.BASE_URL}images/Gifting/Mugs.jpg` },
  { name: 'Tshirts', img: `${import.meta.env.BASE_URL}images/Gifting/t-shirts.jpg` },
  { name: 'Wooden Engraving', img: `${import.meta.env.BASE_URL}images/Gifting/wooden.jpg` },
  { name: 'Stone Art', img: `${import.meta.env.BASE_URL}images/Gifting/Stone.jpg` },
  { name: 'Fridge Magnets', img: `${import.meta.env.BASE_URL}images/Gifting/Fridge magnet.jpg` },
  { name: 'Photoframe Single Page', img: `${import.meta.env.BASE_URL}images/Gifting/Photoframes.png` },
  { name: 'LED Photoframe', img: `${import.meta.env.BASE_URL}images/Gifting/22.jpg` }
];

const PerfectGift = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <section className="section-padding perfect-gift-section" ref={ref}>
      <div className="container">
        <motion.div 
          className="section-header center-header"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2>Looking for a perfect Gift?</h2>
          <p className="subtitle">Personalized gifts for everyone</p>
        </motion.div>

        <motion.div 
          className="gift-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {gifts.map((gift, index) => (
            <motion.div 
              key={index} 
              className="gift-card"
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              <div className="gift-img-wrapper">
                <img src={gift.img} alt={gift.name} />
                <div className="gift-overlay">
                  <span>Customize</span>
                </div>
              </div>
              <h4 className="gift-name">{gift.name}</h4>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PerfectGift;
