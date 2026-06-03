import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './CategoryCarousel.css';

const categories = [
  { id: 1, name: 'Business Cards', image: 'https://picsum.photos/seed/cat1/300/400' },
  { id: 2, name: 'Brochures', image: 'https://picsum.photos/seed/cat2/300/400' },
  { id: 3, name: 'Banners & Signs', image: 'https://picsum.photos/seed/cat3/300/400' },
  { id: 4, name: 'Posters', image: 'https://picsum.photos/seed/cat4/300/400' },
  { id: 5, name: 'Flyers', image: 'https://picsum.photos/seed/cat5/300/400' },
  { id: 6, name: 'Custom Apparel', image: 'https://picsum.photos/seed/cat6/300/400' },
  { id: 7, name: 'Stickers & Labels', image: 'https://picsum.photos/seed/cat7/300/400' },
  { id: 8, name: 'Stationery', image: 'https://picsum.photos/seed/cat8/300/400' },
  { id: 9, name: 'Packaging', image: 'https://picsum.photos/seed/cat9/300/400' }
];

const CategoryCarousel = () => {
  const carouselRef = useRef(null);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="section-padding bg-gray-50">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2>Shop by Category</h2>
          <div className="carousel-controls">
            <button className="control-btn" onClick={() => scroll('left')} aria-label="Previous categories">
              <ChevronLeft size={24} />
            </button>
            <button className="control-btn" onClick={() => scroll('right')} aria-label="Next categories">
              <ChevronRight size={24} />
            </button>
          </div>
        </motion.div>

        <motion.div 
          className="carousel-container" 
          ref={carouselRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={{
                hidden: { opacity: 0, scale: 0.9, rotateY: 15 },
                visible: { opacity: 1, scale: 1, rotateY: 0, transition: { type: 'spring', damping: 20, stiffness: 100 } }
              }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <Link to={`/category?id=${category.id}`} className="carousel-item">
                <div className="carousel-image-wrapper">
                  <img src={category.image} alt={category.name} className="carousel-image" />
                  <div className="carousel-overlay">
                    <span className="btn btn-white btn-sm">Explore</span>
                  </div>
                </div>
                <h3 className="carousel-title">{category.name}</h3>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CategoryCarousel;
