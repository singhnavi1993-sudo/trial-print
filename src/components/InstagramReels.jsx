import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './InstagramReels.css';

const InstagramIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;

const DEFAULT_FEED = [
  { id: 1, image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=400&auto=format&fit=crop', link: 'https://www.instagram.com/printandcopy_centre?igsh=b2VzczVkeWVsMzM5' },
  { id: 2, image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop', link: 'https://www.instagram.com/printandcopy_centre?igsh=b2VzczVkeWVsMzM5' },
  { id: 3, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=400&auto=format&fit=crop', link: 'https://www.instagram.com/printandcopy_centre?igsh=b2VzczVkeWVsMzM5' },
  { id: 4, image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=400&auto=format&fit=crop', link: 'https://www.instagram.com/printandcopy_centre?igsh=b2VzczVkeWVsMzM5' },
  { id: 5, image: 'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?q=80&w=400&auto=format&fit=crop', link: 'https://www.instagram.com/printandcopy_centre?igsh=b2VzczVkeWVsMzM5' },
  { id: 6, image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=400&auto=format&fit=crop', link: 'https://www.instagram.com/printandcopy_centre?igsh=b2VzczVkeWVsMzM5' }
];

const InstagramReels = () => {
  const [reelsData, setReelsData] = useState([]);

  useEffect(() => {
    const loadInstagramFeed = async () => {
      try {
        const storedTheme = JSON.parse(localStorage.getItem('printcopy_theme') || '{}');
        const apiEndpoint = storedTheme.instagramFeedUrl;

        if (apiEndpoint) {
          const res = await fetch(apiEndpoint);
          if (res.ok) {
            const data = await res.json();
            // Check if Behold.co response or standard array
            if (Array.isArray(data) && data.length > 0) {
              const formatted = data.slice(0, 6).map((post, idx) => ({
                id: post.id || idx,
                image: post.mediaUrl || post.media_url || post.thumbnail_url,
                link: post.permalink || 'https://www.instagram.com/printandcopy_centre?igsh=b2VzczVkeWVsMzM5'
              }));
              setReelsData(formatted);
              return;
            }
          }
        }
      } catch (err) {
        console.warn("Dynamic Instagram feed fetch failed, using fallback:", err);
      }
      
      // Fallback
      setReelsData(DEFAULT_FEED);
    };

    loadInstagramFeed();
  }, []);

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
          <a 
            href="https://www.instagram.com/printandcopy_centre?igsh=b2VzczVkeWVsMzM5"
            target="_blank"
            rel="noopener noreferrer"
            className="insta-header-link"
          >
            <div className="insta-icon-wrap">
              <InstagramIcon />
            </div>
            <h2 className="text-center mb-2">Join Our Community</h2>
          </a>
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
            <motion.a 
              key={reel.id} 
              href={reel.link}
              target="_blank"
              rel="noopener noreferrer"
              className="reel-card"
              variants={{
                hidden: { opacity: 0, scale: 0.8, rotateX: 20 },
                visible: { opacity: 1, scale: 1, rotateX: 0, transition: { type: 'spring', damping: 20, stiffness: 100 } }
              }}
              whileHover={{ scale: 1.05, y: -10, rotateX: 5, rotateY: -5 }}
            >
              <img src={reel.image} alt="Instagram Post" className="reel-image" />
              <div className="reel-overlay">
                <InstagramIcon />
                <span className="reel-views">View Post</span>
              </div>
            </motion.a>
          ))}
        </motion.div>

        <div className="text-center mt-5">
          <a 
            href="https://www.instagram.com/printandcopy_centre?igsh=b2VzczVkeWVsMzM5" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="insta-follow-btn"
          >
            <InstagramIcon />
            <span>Follow @printandcopy_centre</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default InstagramReels;
