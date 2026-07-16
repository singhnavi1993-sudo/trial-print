import React from 'react';
import { Phone } from 'lucide-react';
import './BusinessPrintingCTA.css';

const BusinessPrintingCTA = () => {
  return (
    <section className="business-printing-cta">
      <div 
        className="cta-bg-image-layer"
        style={{ backgroundImage: `url("${import.meta.env.BASE_URL}images/cta-bg-1-2.webp")` }}
      ></div>
      <div className="container cta-container">
        <div className="cta-content-row">
          <div className="cta-text-column animate-fade-up">
            <div className="cta-title-block">
              <span className="cta-subtitle">Business printing</span>
              <h2 className="cta-title">Even More Good Stuff</h2>
            </div>
            <div className="cta-body-block">
              <p className="cta-description">
                Print business stationery and customised marketing collaterals and add sparkle to your business.
              </p>
              <div className="cta-contact-text">
                <a href="tel:+919797470270" className="cta-inline-link">
                  <Phone size={22} className="cta-text-icon phone-icon" />
                  <span>Call us</span>
                </a>
                <span> or </span>
                <a 
                  href="https://wa.me/919797470270" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="cta-inline-link"
                >
                  <svg 
                    viewBox="0 0 24 24" 
                    width="22" 
                    height="22" 
                    className="cta-text-icon whatsapp-icon" 
                    fill="currentColor"
                  >
                    <path d="M12.004 2c-5.51 0-9.996 4.486-9.996 9.998 0 1.76.458 3.475 1.33 4.986L2 22l5.16-1.354c1.472.802 3.125 1.224 4.84 1.224 5.511 0 9.997-4.487 9.997-10.001C22.001 6.486 17.515 2 12.004 2zm0 18.294c-1.536 0-3.04-.411-4.356-1.19l-.312-.185-3.242.851.866-3.161-.203-.323c-.854-1.358-1.305-2.922-1.305-4.528 0-4.57 3.719-8.289 8.29-8.289 4.571 0 8.29 3.719 8.29 8.29s-3.719 8.29-8.29 8.29zM16.6 13.884c-.25-.125-1.48-.73-1.71-.814-.23-.084-.4-.125-.57.125-.17.25-.66.834-.81.999-.15.165-.3.18-.55.055-.25-.125-1.05-.386-2-1.233-.74-.66-1.24-1.475-1.38-1.725-.15-.25-.01-.385.11-.51.11-.11.25-.29.37-.435.13-.145.17-.25.25-.415.08-.165.04-.31-.02-.435-.06-.125-.57-1.37-.78-1.88-.2-.5-.43-.43-.59-.43H8.32c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.075s.89 2.405.99 2.54c.1.135 1.76 2.685 4.26 3.765.6.26 1.06.415 1.42.53.6.19 1.15.16 1.58.1.48-.07 1.48-.605 1.69-1.19.21-.58.21-1.08.15-1.19-.07-.11-.25-.175-.5-.3z"/>
                  </svg>
                  <span>whatsapp now </span>
                </a>
                <span> </span>
                <a href="tel:+919797470270" className="cta-phone-number-link">+91 9797470270</a>
              </div>
            </div>
          </div>
          <div className="cta-spacer-column"></div>
        </div>
      </div>
    </section>
  );
};

export default BusinessPrintingCTA;
