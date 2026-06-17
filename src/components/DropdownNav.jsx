import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import './DropdownNav.css';

const DropdownNav = () => {
  const menuItems = [
    { name: 'Shop by Industry', link: '/industry' },
    { name: 'Shop by Occasion', link: '/occasion' },
    { name: 'Business Essentials', link: '/business-essentials' },
    { name: 'LED Boards & Signages', link: '/led-boards' },
    { name: 'Awards & Mementoes', link: '/awards' },
    { name: 'Gifting', link: '/gifting' },
    { name: 'B2B Services', link: '/b2b-services' },
    { name: 'About Us', link: '/about' },
    { name: 'Blogs', link: '/blogs' },
  ];

  return (
    <div className="dropdown-nav-container">
      <div className="container dropdown-nav-inner">
        {menuItems.map((item, index) => (
          <div key={index} className="dropdown-nav-item">
            <Link to={item.link} className="dropdown-nav-link">
              {item.name}
              <ChevronDown size={14} className="dropdown-icon" />
            </Link>
            {/* Dropdown content can be added here if needed in the future */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropdownNav;
