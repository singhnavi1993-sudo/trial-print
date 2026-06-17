import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './B2BServices.css';

const B2BServices = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section className="b2b-section" ref={ref}>
      <div className="container">
        <motion.div 
          className="b2b-card"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="b2b-content">
            <h2 className="b2b-title">Are you a Printer or Advertising Agency?</h2>
            <p className="b2b-subtitle">Looking for B2B Services?</p>
            <p className="b2b-desc">
              We offer exclusive wholesale pricing, priority production queues, and white-label 
              shipping for agencies and print brokers. Partner with us to scale your offerings.
            </p>
            <button className="btn btn-primary mt-4">Become a Partner</button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default B2BServices;
