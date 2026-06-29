import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getProducts } from '../services/db';
import './BestSellers.css';

const BestSellers = () => {
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    // Fetch products, filter by best seller, and sort by priority order
    const allProducts = getProducts();
    const filtered = allProducts
      .filter(p => p.isBestSeller)
      .sort((a, b) => a.order - b.order);
    
    setBestSellers(filtered);
  }, []);

  return (
    <section className="section-padding">
      <div className="container">
        <motion.div 
          className="section-header center-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2>Our Best Sellers</h2>
          <p className="subtitle">Discover our most popular print products loved by thousands.</p>
        </motion.div>

        {bestSellers.length > 0 ? (
          <motion.div 
            className="products-grid perspective-1000"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 }
              }
            }}
          >
            {bestSellers.map((product) => (
              <motion.div 
                key={product.id} 
                className="product-card"
                variants={{
                  hidden: { opacity: 0, y: 50, rotateX: 10 },
                  visible: { opacity: 1, y: 0, rotateX: 0, transition: { type: 'spring', damping: 20, stiffness: 100 } }
                }}
                whileHover={{ y: -15, scale: 1.02, rotateX: 4, rotateY: -4 }}
              >
                <div className="product-image-container">
                  <img src={product.image} alt={product.title} className="product-image primary" />
                  <img src={product.image} alt={`${product.title} alternate view`} className="product-image hover" />
                </div>
                <div className="product-info text-center">
                  <span className="product-category">{product.category}</span>
                  <h3 className="product-name">{product.title}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center" style={{ padding: '3rem', color: '#6b7280' }}>
            <p>No best sellers currently available.</p>
          </div>
        )}
        
        <div className="text-center mt-4">
          <button className="btn btn-red">View All Products</button>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
