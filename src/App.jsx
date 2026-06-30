import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
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
import AdminSettings from './admin/AdminSettings';
import { getThemeSettings } from './services/db';

import './App.css';

const MainLayout = ({ showIntro, setShowIntro }) => {
  return (
    <>
      <AnimatePresence>
        {showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>
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
  const [showIntro, setShowIntro] = useState(false);

  // Global Theme Initialization
  React.useEffect(() => {
    const initTheme = async () => {
      try {
        const theme = await getThemeSettings();
        if (theme) {
          if (theme.accentColor1) document.documentElement.style.setProperty('--color-red', theme.accentColor1);
          if (theme.accentColor2) document.documentElement.style.setProperty('--color-yellow', theme.accentColor2);
          if (theme.headerBg) document.documentElement.style.setProperty('--header-bg', theme.headerBg);
          if (theme.pageBg) document.documentElement.style.setProperty('--page-bg', theme.pageBg);
          if (theme.navLinkColor) document.documentElement.style.setProperty('--nav-link-color', theme.navLinkColor);
          if (theme.textColor) document.documentElement.style.setProperty('--text-primary', theme.textColor);
          
          Object.keys(theme).forEach(key => {
            if (key.startsWith('bg') && key !== 'bgPrimary' && key !== 'bgSecondary') {
              const cssVar = '--' + key.replace(/([A-Z])/g, '-$1').toLowerCase();
              document.documentElement.style.setProperty(cssVar, theme[key]);
            }
          });
        }
      } catch (err) {
        console.error("Failed to load theme settings", err);
      }
    };
    initTheme();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="blogs" element={<AdminBlogs />} />
          <Route path="settings" element={<AdminSettings />} />
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
