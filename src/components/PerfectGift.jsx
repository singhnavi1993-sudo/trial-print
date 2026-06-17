import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './PerfectGift.css';

const gifts = [
  { name: 'Mugs', img: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=600&auto=format&fit=crop' },
  { name: 'Tshirts', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop' },
  { name: 'Wooden Engraving', img: 'https://images.unsplash.com/photo-1611078500742-057d383980bc?q=80&w=600&auto=format&fit=crop' },
  { name: 'Stone Art', img: 'https://images.unsplash.com/photo-1600171258673-982d61d567ea?q=80&w=600&auto=format&fit=crop' },
  { name: 'Fridge Magnets', img: 'https://images.unsplash.com/photo-1596468202575-cb62f01d4a04?q=80&w=600&auto=format&fit=crop' },
  { name: 'Photoframe Single Page', img: 'https://images.unsplash.com/photo-1582561424760-0321d6cbc2ab?q=80&w=600&auto=format&fit=crop' },
  { name: 'LED Photoframe', img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop' }
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
          className="section-header text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Looking for a perfect Gift?</h2>
          <p className="section-subtitle">Personalized gifts for everyone</p>
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
