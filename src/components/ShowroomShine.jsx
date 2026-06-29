import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import './RoomDecor.css'; // Reusing the same CSS

const showroomCategories = [
  {
    id: 1,
    title: 'Premium Magazines',
    items: '12 items',
    image: `${import.meta.env.BASE_URL}images/showroom/652234-magazines-1174419.jpg`,
  },
  {
    id: 2,
    title: 'Professional ID Cards',
    items: '8 items',
    image: `${import.meta.env.BASE_URL}images/showroom/id cards (7).jpeg`,
  },
  {
    id: 3,
    title: 'Display Standees',
    items: '15 items',
    image: `${import.meta.env.BASE_URL}images/showroom/roll-up-standee-cover-page-template-business-promotion_1017-59811.jpg`,
  },
  {
    id: 4,
    title: 'Business Essentials',
    items: '20 items',
    image: `${import.meta.env.BASE_URL}images/showroom/images (6).jpeg`,
  },
  {
    id: 5,
    title: 'Marketing Materials',
    items: '10 items',
    image: `${import.meta.env.BASE_URL}images/showroom/images (8).jpeg`,
  }
];

// Duplicate for continuous seamless scrolling
const marqueeItems = [...showroomCategories, ...showroomCategories];

const ShowroomShine = () => {
  return (
    <section className="room-decor-section">
      
      <div className="container">
        <div className="room-decor-header">
          <h2>Let your showroom shine</h2>
          <p>Elevate your business with professional displays and marketing materials.</p>
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
                  <span>{category.items}</span>
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

export default ShowroomShine;
