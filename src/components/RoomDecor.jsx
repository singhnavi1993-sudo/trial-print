import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import './RoomDecor.css';

const roomCategories = [
  {
    id: 1,
    title: 'Summer Layering',
    items: '8 items',
    image: `${import.meta.env.BASE_URL}images/Room/1.jpg`,
  },
  {
    id: 2,
    title: 'New season essential',
    items: '8 items',
    image: `${import.meta.env.BASE_URL}images/Room/2.jpg`,
  },
  {
    id: 3,
    title: 'Jackets & Coats',
    items: '5 items',
    image: `${import.meta.env.BASE_URL}images/Room/22 (1).jpg`,
  },
  {
    id: 4,
    title: 'Up to 20% off',
    items: '9 items',
    image: `${import.meta.env.BASE_URL}images/Room/Acrylic 2.jpeg`,
  },
  {
    id: 5,
    title: 'Cozy Blankets',
    items: '12 items',
    image: `${import.meta.env.BASE_URL}images/Room/Gulmohar Backlit Acrylic Wood Vinyl.jpeg`,
  },
  {
    id: 6,
    title: 'Acrylic Glow',
    items: '15 items',
    image: `${import.meta.env.BASE_URL}images/Room/Sharma Backlit Acrylic.png`,
  },
  {
    id: 7,
    title: 'Vibrant Art',
    items: '6 items',
    image: `${import.meta.env.BASE_URL}images/Room/WhatsApp Image 2024-01-02 at 9.33.12 AM.jpeg`,
  }
];

// Duplicate for continuous seamless scrolling
const marqueeItems = [...roomCategories, ...roomCategories];

const RoomDecor = () => {
  return (
    <section className="room-decor-section">
      
      <div className="container">
        <div className="center-header">
          <h2>Ready to beautify your Room?</h2>
          <p className="subtitle">Custom wall art, canvas prints, and personalized decor.</p>
        </div>
      </div>

      <div className="marquee-wrapper">
        <div className="marquee-content">
          {marqueeItems.map((category, index) => (
            <div className="room-decor-card" key={`${category.id}-${index}`}>
              <div className="room-decor-img-wrapper">
                <img src={category.image} alt={category.title} />
              </div>
              <div className="room-decor-info">
                <div className="room-decor-text">
                  <h3>{category.title}</h3>
                </div>
                <button className="room-decor-btn" aria-label="Explore Category">
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default RoomDecor;
