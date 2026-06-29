import React from 'react';
import './TaglineBar.css';

const TaglineBar = () => {
  return (
    <div className="tagline-container">
      <div className="tagline-marquee">
        <span>PREMIUM PRINTING & COPY SERVICES | FREE SHIPPING ON ORDERS OVER ₹5000 | 10K+ HAPPY CLIENTS ANNUALLY | CUSTOM BRANDING SOLUTIONS | </span>
        {/* Duplicate for seamless scrolling */}
        <span>PREMIUM PRINTING & COPY SERVICES | FREE SHIPPING ON ORDERS OVER ₹5000 | 10K+ HAPPY CLIENTS ANNUALLY | CUSTOM BRANDING SOLUTIONS | </span>
      </div>
    </div>
  );
};

export default TaglineBar;
