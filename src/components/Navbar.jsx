import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, X, ChevronDown, ChevronRight } from 'lucide-react';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
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
          <button className="menu-btn" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>
          <Link to="/" className="logo" onClick={() => setIsSearchOpen(false)}>
            <img src={`${import.meta.env.BASE_URL}images/new_logo.png`} alt="Print & Copy" style={{ height: '50px' }} />
          </Link>
        </div>
        
        <nav className="navbar-nav desktop-only">
          
          <div className="nav-dropdown">
            <Link to="/products" className="nav-link">
              Shop <ChevronDown size={14} className="dropdown-icon" />
            </Link>
            <div className="nav-dropdown-menu">
              
              <div className="nested-dropdown">
                <div className="nav-dropdown-item with-arrow">
                  Shop By Industry <ChevronRight size={14} />
                </div>
                <div className="nested-dropdown-menu">
                  {['Branding & Advertising', 'Business & Corporate', 'Education', 'Events', 'Healthcare', 'Hotels & Restaurants', 'Home Decor & Design'].map((sub, i) => (
                    <Link key={i} to={`/category/${sub.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="nav-dropdown-item">
                      {sub}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="nested-dropdown">
                <div className="nav-dropdown-item with-arrow">
                  Shop By Occasion <ChevronRight size={14} />
                </div>
                <div className="nested-dropdown-menu">
                  {['Award Night', 'Celebrations', 'Corporate Events', 'Weddings'].map((sub, i) => (
                    <Link key={i} to={`/category/${sub.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="nav-dropdown-item">
                      {sub}
                    </Link>
                  ))}
                </div>
              </div>

              <Link to="/category/business-essentials" className="nav-dropdown-item">Business Essentials</Link>
              <Link to="/category/led-boards" className="nav-dropdown-item">LED Boards & Signages</Link>
              <Link to="/category/awards" className="nav-dropdown-item">Awards & Mementoes</Link>
              <Link to="/category/gifting" className="nav-dropdown-item">Gifting</Link>
              <Link to="/category/b2b-services" className="nav-dropdown-item">B2B Services</Link>
              <Link to="/blogs" className="nav-dropdown-item">Blogs</Link>

            </div>
          </div>

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

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <div className="mobile-menu-header">
            <Link to="/" className="logo" onClick={() => setIsMobileMenuOpen(false)}>
              <img src={`${import.meta.env.BASE_URL}images/new_logo.png`} alt="Print & Copy" style={{ height: '40px' }} />
            </Link>
            <button className="close-menu-btn" onClick={() => setIsMobileMenuOpen(false)}>
              <X size={28} />
            </button>
          </div>
          
          <div className="mobile-nav">
            <div className="mobile-nav-group">
              <h4 className="mobile-nav-title">Shop</h4>
              
              <div className="mobile-subnav">
                <div className="mobile-nested-group">
                  <h5 className="mobile-nested-title">Shop By Industry</h5>
                  <div className="mobile-nested-links">
                    {['Branding & Advertising', 'Business & Corporate', 'Education', 'Events', 'Healthcare', 'Hotels & Restaurants', 'Home Decor & Design'].map((sub, i) => (
                      <Link key={i} to={`/category/${sub.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                        - {sub}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="mobile-nested-group">
                  <h5 className="mobile-nested-title">Shop By Occasion</h5>
                  <div className="mobile-nested-links">
                    {['Award Night', 'Celebrations', 'Corporate Events', 'Weddings'].map((sub, i) => (
                      <Link key={i} to={`/category/${sub.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                        - {sub}
                      </Link>
                    ))}
                  </div>
                </div>

                <Link to="/category/business-essentials" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Business Essentials</Link>
                <Link to="/category/led-boards" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>LED Boards & Signages</Link>
                <Link to="/category/awards" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Awards & Mementoes</Link>
                <Link to="/category/gifting" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Gifting</Link>
                <Link to="/category/b2b-services" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>B2B Services</Link>
                <Link to="/blogs" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Blogs</Link>
              </div>
            </div>

            <div className="mobile-nav-group single-links">
              <Link to="/about" className="mobile-nav-title" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
              <Link to="/contact" className="mobile-nav-title" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
