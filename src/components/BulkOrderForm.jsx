import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './BulkOrderForm.css';

const BulkOrderForm = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section className="section-padding bulk-form-section" ref={ref}>
      <div className="container">
        <motion.div 
          className="bulk-form-wrapper"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="bulk-form-text">
            <h2 className="section-title">Planning for a Bulk Order?</h2>
            <p className="bulk-desc">
              Get huge discounts on large quantities. Fill out the form and our sales team will 
              get back to you with a custom quote within 24 hours.
            </p>
          </div>
          
          <form className="bulk-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-row">
              <input type="text" placeholder="Your Name" required />
              <input type="text" placeholder="Company Name" />
            </div>
            <div className="form-row">
              <input type="email" placeholder="Email Address" required />
              <input type="tel" placeholder="Phone Number" required />
            </div>
            <div className="form-row">
              <select required>
                <option value="" disabled selected>Select Product Category</option>
                <option value="apparel">Custom Apparel</option>
                <option value="signage">Signage & Boards</option>
                <option value="awards">Awards & Mementos</option>
                <option value="gifts">Corporate Gifting</option>
                <option value="other">Other</option>
              </select>
              <input type="number" placeholder="Estimated Quantity" required min="10" />
            </div>
            <textarea placeholder="Describe your requirements in detail..." rows="4" required></textarea>
            <button type="submit" className="btn btn-red mt-4 w-100">Request Quote</button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default BulkOrderForm;
