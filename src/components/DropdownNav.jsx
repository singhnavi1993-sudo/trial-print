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
