import React from 'react';
import { motion } from 'framer-motion';
import './BestSellers.css';

const products = [
  {
    id: 1,
    name: 'Premium Visiting Cards',
    price: '$15.00',
    primaryImage: 'https://images.unsplash.com/photo-1589041127168-9b1915731def?q=80&w=400&auto=format&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1557002664-c5a452bf9a1e?q=80&w=400&auto=format&fit=crop',
    category: 'Business Cards'
  },
  {
    id: 2,
    name: 'Glossy Flyers',
    price: '$25.00',
    primaryImage: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=400&auto=format&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=400&auto=format&fit=crop',
    category: 'Flyers'
  },
  {
    id: 3,
    name: 'Custom T-Shirts',
    price: '$18.00',
    primaryImage: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400&auto=format&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=400&auto=format&fit=crop',
    category: 'Apparel'
  },
  {
    id: 4,
    name: 'Vinyl Banners',
    price: '$45.00',
    primaryImage: 'https://images.unsplash.com/photo-1561089489-0268a83d4bb7?q=80&w=400&auto=format&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1555529733-0e670560f8e1?q=80&w=400&auto=format&fit=crop',
    category: 'Signs'
  }
];

const BestSellers = () => {
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
          {products.map((product) => (
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
                <img src={product.primaryImage} alt={product.name} className="product-image primary" />
                <img src={product.hoverImage} alt={`${product.name} alternate view`} className="product-image hover" />
              </div>
              <div className="product-info text-center">
                <span className="product-category">{product.category}</span>
                <h3 className="product-name text-white">{product.name}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center mt-4">
          <button className="btn btn-primary">View All Products</button>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
