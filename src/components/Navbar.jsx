import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, Sun, Moon, X } from 'lucide-react';
import './Navbar.css';

const dummySearchData = [
  { id: 1, title: 'Premium Business Cards', type: 'Product', link: '/products' },
  { id: 2, title: 'Custom Marketing Flyers', type: 'Product', link: '/products' },
  { id: 3, title: 'Large Format Banners', type: 'Product', link: '/products' },
  { id: 4, title: 'Commercial Printing', type: 'Category', link: '/category' },
  { id: 5, title: 'High-Volume Copying', type: 'Category', link: '/category' },
  { id: 6, title: 'Custom Apparel', type: 'Category', link: '/category' },
  { id: 7, title: 'Signs & Posters', type: 'Category', link: '/category' },
  { id: 8, title: 'Graphic Design Services', type: 'Category', link: '/services' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Don't hide navbar if search is open
      if (!isSearchOpen && currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true); // scrolling down & past 100px -> hide
      } else {
        setHidden(false); // scrolling up -> show
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isSearchOpen]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }
    const results = dummySearchData.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  }, [searchQuery]);

  // Close search when escape key is pressed
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''} ${hidden ? 'hidden' : ''}`}>
      <div className="container navbar-container">
        <div className="navbar-left">
          <button className="menu-btn"><Menu size={24} /></button>
          <Link to="/" className="logo" onClick={() => setIsSearchOpen(false)}>
            <span className="text-primary">Print</span>
            <span className="text-red">&</span>
            <span className="text-yellow">Copy</span>
          </Link>
        </div>
        
        <nav className="navbar-nav desktop-only">
          <Link to="/products" className="nav-link">Products</Link>
          <Link to="/services" className="nav-link">Services</Link>
          <Link to="/shop-by-industry" className="nav-link">Shop By Industry</Link>
          <Link to="/about" className="nav-link">About Us</Link>
          <Link to="/contact" className="nav-link">Contact Us</Link>
        </nav>

        <div className="navbar-right">
          <button 
            className={`icon-btn ${isSearchOpen ? 'active' : ''}`} 
            onClick={() => {
              setIsSearchOpen(!isSearchOpen);
              if (isSearchOpen) setSearchQuery('');
            }}
            aria-label="Toggle search"
          >
            {isSearchOpen ? <X size={20} /> : <Search size={20} />}
          </button>
          <button 
            className="icon-btn" 
            onClick={() => setIsDarkMode(!isDarkMode)}
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>

      {/* Search Overlay Dropdown */}
      {isSearchOpen && (
        <div className="search-overlay">
          <div className="container search-container">
            <div className="search-input-wrapper">
              <Search size={20} className="search-input-icon" />
              <input 
                type="text" 
                className="search-input" 
                placeholder="Search for products, categories, or services..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              {searchQuery && (
                <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
                  <X size={20} />
                </button>
              )}
            </div>
            
            {searchQuery && (
              <div className="search-results">
                {searchResults.length > 0 ? (
                  searchResults.map(result => (
                    <Link 
                      key={result.id} 
                      to={result.link} 
                      className="search-result-item"
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }}
                    >
                      <span className="result-title">{result.title}</span>
                      <span className={`result-badge ${result.type.toLowerCase()}`}>{result.type}</span>
                    </Link>
                  ))
                ) : (
                  <div className="no-results">
                    No results found for "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
