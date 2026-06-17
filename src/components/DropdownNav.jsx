import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import './DropdownNav.css';

const DropdownNav = () => {
  const menuItems = [
    { 
      name: 'Shop by Industry', 
      link: '/industry',
      subItems: ['Branding & Advertising', 'Business & Corporate', 'Education', 'Events', 'Healthcare', 'Hotels & Restaurants', 'Home Decor & Design']
    },
    { 
      name: 'Shop by Occasion', 
      link: '/occasion',
      subItems: ['Award Night', 'Celebrations', 'Corporate Events', 'Weddings']
    },
    { 
      name: 'LED Boards', 
      link: '/led-boards',
      subItems: ['Acrylic Letterboards', 'Steel Letterboards', 'Router-Cut Boards', 'Glow Sign Boards', 'Backlit Logos', 'NEON Boards', 'Lollipop Signages']
    },
    { 
      name: 'Awards & Mementoes', 
      link: '/awards',
      subItems: ['Certificates', 'Trophies', 'Medals', 'Economy Mementoes', 'Wooden Mementoes', 'Acrylic Mementoes', 'Glass Mementoes', 'Corporate Mementoes', 'Premium Mementoes', 'Retirement Mementoes', 'Customized Mementoes', 'Executive Mementoes']
    },
    { 
      name: 'Gifting', 
      link: '/gifting',
      subItems: ['Mugs', 'Tshirts', 'Wooden Engraving', 'Stone', 'Fridge Magnets', 'Photoframe', 'LED Photofraame']
    },
    { 
      name: 'Our B2B Services', 
      link: '/b2b-services',
      subItems: ['Digital Printing', 'Offset Printing', 'UV Printing', 'Sublimation Printing', 'Laser Cutting', 'Laser Engraving', 'Flex Printing', 'Vinyl Printing', 'Photoframing', 'Lamination & Binding', 'Installation & Recci', 'Graphics Designing', 'Photocopy & Scanning']
    },
    {
      name: 'About Us',
      link: '/about',
      subItems: ['About the Brand', 'Founded', 'Tagline', 'Our Team', 'MD Message', 'Social Media', 'Contact Us', 'Address']
    },
    {
      name: 'Blogs',
      link: '/blogs',
      subItems: []
    }
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
            
            {item.subItems && item.subItems.length > 0 && (
              <div className="dropdown-menu">
                {item.subItems.map((sub, i) => (
                  <Link 
                    key={i} 
                    to={`/category/${sub.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} 
                    className="dropdown-menu-item"
                  >
                    {sub}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropdownNav;
