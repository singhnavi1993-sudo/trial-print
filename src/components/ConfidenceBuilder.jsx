import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './ConfidenceBuilder.css';

const ConfidenceBuilder = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section className="section-padding confidence-section" ref={ref}>
      <div className="container text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Trusted By The Best</h2>
          <p className="confidence-stat">Delivering Excellence with over <strong>10,000+ Orders Annually</strong></p>
        </motion.div>

        {/* Client Logos Marquee */}
        <div className="clients-marquee-container mt-4">
          <div className="clients-marquee">
            <span>CLIENT LOGO 1</span>
            <span>CLIENT LOGO 2</span>
            <span>CLIENT LOGO 3</span>
            <span>CLIENT LOGO 4</span>
            <span>CLIENT LOGO 5</span>
            {/* Duplicate for seamless scrolling */}
            <span>CLIENT LOGO 1</span>
            <span>CLIENT LOGO 2</span>
            <span>CLIENT LOGO 3</span>
            <span>CLIENT LOGO 4</span>
            <span>CLIENT LOGO 5</span>
          </div>
        </div>

        {/* Simple Testimonial */}
        <motion.div 
          className="testimonial-box mt-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <p className="testimonial-text">
            "Print & Copy Centre completely transformed our corporate branding. 
            The quality of their LED signages and custom awards are unmatched in the industry."
          </p>
          <div className="testimonial-author">- Sarah Jenkins, Marketing Director</div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConfidenceBuilder;
