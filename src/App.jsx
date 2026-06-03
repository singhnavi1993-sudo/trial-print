import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Category from './pages/Category';
import CustomCursor from './components/CustomCursor';
import ScrollObserver from './components/ScrollObserver';
import CinematicBackground from './components/CinematicBackground';
import './App.css';

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <CinematicBackground />
      <CustomCursor />
      <ScrollObserver />
      <div className="app-container" style={{ position: 'relative', zIndex: 1, backgroundColor: 'transparent' }}>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category" element={<Category />} />
            {/* Add more routes as needed */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
