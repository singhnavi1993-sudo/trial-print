import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import TaglineBar from './components/TaglineBar';
import DropdownNav from './components/DropdownNav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Category from './pages/Category';
import ScrollObserver from './components/ScrollObserver';
import CinematicBackground from './components/CinematicBackground';
import IntroAnimation from './components/IntroAnimation';
import WhatsAppButton from './components/WhatsAppButton';
import './App.css';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <AnimatePresence>
        {showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>
      <CinematicBackground />
      <ScrollObserver />
      <div className="app-container" style={{ position: 'relative', zIndex: 1, backgroundColor: 'transparent' }}>
        <TaglineBar />
        <Navbar />
        <DropdownNav />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category" element={<Category />} />
            {/* Add more routes as needed */}
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;
