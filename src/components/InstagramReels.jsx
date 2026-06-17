import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import './InstagramReels.css';

const InstagramIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;

const reelsData = [
  { id: 1, image: 'https://images.unsplash.com/photo-1512418490979-9ce792d03952?q=80&w=300&h=533&auto=format&fit=crop', views: '12.5k' },
  { id: 2, image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=300&h=533&auto=format&fit=crop', views: '8.2k' },
  { id: 3, image: 'https://images.unsplash.com/photo-1557002664-c5a452bf9a1e?q=80&w=300&h=533&auto=format&fit=crop', views: '45.1k' },
  { id: 4, image: 'https://images.unsplash.com/photo-1611078500742-057d383980bc?q=80&w=300&h=533&auto=format&fit=crop', views: '3.4k' },
  { id: 5, image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=300&h=533&auto=format&fit=crop', views: '21.8k' },
  { id: 6, image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=300&h=533&auto=format&fit=crop', views: '19.2k' }
];

const InstagramReels = () => {
  return (
    <section className="section-padding instagram-section" style={{ backgroundColor: 'transparent' }}>
      <motion.div 
        className="container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="section-header text-center center-header text-white">
          <div className="insta-icon-wrap">
            <InstagramIcon />
          </div>
          
          <h2 className="text-center mb-2">Join Our Community</h2>
          <p className="text-center text-gray-200 mb-5">Follow us on Instagram for daily inspiration and behind-the-scenes.</p>
        </div>

        <motion.div 
          className="reels-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 }
            }
          }}
        >
          {reelsData.map((reel) => (
            <motion.div 
              key={reel.id} 
              className="reel-card"
              variants={{
                hidden: { opacity: 0, scale: 0.8, rotateX: 20 },
                visible: { opacity: 1, scale: 1, rotateX: 0, transition: { type: 'spring', damping: 20, stiffness: 100 } }
              }}
              whileHover={{ scale: 1.05, y: -10, rotateX: 5, rotateY: -5 }}
            >
              <img src={reel.image} alt="Instagram Reel" className="reel-image" />
              <div className="reel-overlay">
                <Play size={48} className="play-icon" />
                <span className="reel-views">{reel.views}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default InstagramReels;
