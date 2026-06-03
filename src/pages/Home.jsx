import React from 'react';
import HeroSlider from '../components/HeroSlider';
import CategoryCarousel from '../components/CategoryCarousel';
import BestSellers from '../components/BestSellers';
import InstagramReels from '../components/InstagramReels';

const Home = () => {
  return (
    <div className="home-page">
      <HeroSlider />
      <CategoryCarousel />
      <BestSellers />
      <InstagramReels />
    </div>
  );
};

export default Home;
