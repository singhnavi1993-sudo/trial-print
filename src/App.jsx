import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import TaglineBar from './components/TaglineBar';

import Footer from './components/Footer';
import Home from './pages/Home';
import Category from './pages/Category';
import ScrollObserver from './components/ScrollObserver';
import CinematicBackground from './components/CinematicBackground';
import IntroAnimation from './components/IntroAnimation';
import WhatsAppButton from './components/WhatsAppButton';

// Admin Components
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import AdminProducts from './admin/AdminProducts';
import AdminCategories from './admin/AdminCategories';
import AdminBlogs from './admin/AdminBlogs';

import './App.css';

const MainLayout = ({ showIntro, setShowIntro }) => {
  return (
    <>
      <AnimatePresence>
        {showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>
      <CinematicBackground />
      <ScrollObserver />
      <div className="app-container" style={{ position: 'relative', zIndex: 1, backgroundColor: 'transparent' }}>
        <Navbar />
        <TaglineBar />
        <main className="main-content">
          <Outlet />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="blogs" element={<AdminBlogs />} />
        </Route>

        {/* Public Routes */}
        <Route path="/" element={<MainLayout showIntro={showIntro} setShowIntro={setShowIntro} />}>
          <Route index element={<Home />} />
          <Route path="category" element={<Category />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
