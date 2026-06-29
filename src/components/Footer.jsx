import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import './Footer.css';

const InstagramIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
const FacebookIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>;
const TwitterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>;

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top-accent"></div>
      


      <div className="container footer-container">
        <div className="footer-col brand-col">
          <Link to="/" className="logo footer-logo">
            <img src={`${import.meta.env.BASE_URL}images/new_logo.png`} alt="Print & Copy" style={{ height: '40px' }} />
          </Link>
          <p className="footer-desc">
            Your premium destination for high-quality commercial printing and copying services. We bring your ideas to life with precision and vibrant colors.
          </p>
          <div className="social-links">
            <a href="#" className="social-link" aria-label="Instagram"><InstagramIcon /></a>
            <a href="#" className="social-link" aria-label="Facebook"><FacebookIcon /></a>
            <a href="#" className="social-link" aria-label="Twitter"><TwitterIcon /></a>
          </div>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Services</h4>
          <ul className="footer-links">
            <li><Link to="/products"><ArrowRight size={14}/> Commercial Printing</Link></li>
            <li><Link to="/products"><ArrowRight size={14}/> High-Volume Copying</Link></li>
            <li><Link to="/products"><ArrowRight size={14}/> Custom Apparel</Link></li>
            <li><Link to="/products"><ArrowRight size={14}/> Large Format Signs</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Company</h4>
          <ul className="footer-links">
            <li><Link to="/about"><ArrowRight size={14}/> About Us</Link></li>
            <li><Link to="/shop-by-industry"><ArrowRight size={14}/> Shop By Industry</Link></li>
            <li><Link to="/contact"><ArrowRight size={14}/> Contact Support</Link></li>
            <li><Link to="/faq"><ArrowRight size={14}/> FAQs</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Contact Us</h4>
          <ul className="footer-contact">
            <li>
              <div className="contact-icon-wrap"><MapPin size={18} /></div>
              <span>Shop No. 43 A2,<br />South Block, Bahu Plaza Park<br />Jammu - 180012</span>
            </li>
            <li>
              <div className="contact-icon-wrap"><Phone size={18} /></div>
              <span>+91-9797470270<br />+91-9419189999</span>
            </li>
            <li>
              <div className="contact-icon-wrap"><Mail size={18} /></div>
              <span>info@printandcopy.com</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <p className="copyright-text">&copy; {new Date().getFullYear()} Print & Copy. All rights reserved.</p>
          <div className="footer-legal-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
