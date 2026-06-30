import React from 'react';
import HeroSlider from '../components/HeroSlider';
import ScrollDivider from '../components/ScrollDivider';
import ShopByIndustry from '../components/ShopByIndustry';
import BestSellers from '../components/BestSellers';
import ShopByOccasion from '../components/ShopByOccasion';
import InstagramReels from '../components/InstagramReels';
import CustomIdeas from '../components/CustomIdeas';
import PerfectGift from '../components/PerfectGift';
import RoomDecor from '../components/RoomDecor';
import ShowroomShine from '../components/ShowroomShine';
import ConfidenceBuilder from '../components/ConfidenceBuilder';
import B2BServices from '../components/B2BServices';
import BulkOrderForm from '../components/BulkOrderForm';

const Home = () => {
  return (
    <div className="home-page">
      <div style={{ backgroundColor: 'var(--bg-hero, transparent)' }}><HeroSlider /></div>
      <ScrollDivider />
      
      <div style={{ backgroundColor: 'var(--bg-industry, transparent)' }}><ShopByIndustry /></div>
      <ScrollDivider />
      
      <div style={{ backgroundColor: 'var(--bg-bestsellers, transparent)' }}><BestSellers /></div>
      <ScrollDivider />
      
      <div style={{ backgroundColor: 'var(--bg-occasion, transparent)' }}><ShopByOccasion /></div>
      <ScrollDivider />
      
      <div style={{ backgroundColor: 'var(--bg-instagram, transparent)' }}><InstagramReels /></div>
      <ScrollDivider />
      
      <div style={{ backgroundColor: 'var(--bg-customideas, #f5f0eb)' }}><CustomIdeas /></div>
      <ScrollDivider />
      
      <div style={{ backgroundColor: 'var(--bg-perfectgift, transparent)' }}><PerfectGift /></div>
      <ScrollDivider />
      
      <div style={{ backgroundColor: 'var(--bg-roomdecor, #f6f5f3)' }}><RoomDecor /></div>
      <ScrollDivider />
      
      <div style={{ backgroundColor: 'var(--bg-showroom, #f6f5f3)' }}><ShowroomShine /></div>
      <ScrollDivider />
      
      <div style={{ backgroundColor: 'var(--bg-confidence, #ffffff)' }}><ConfidenceBuilder /></div>
      <ScrollDivider />
      
      <div style={{ backgroundColor: 'var(--bg-b2b, transparent)' }}><B2BServices /></div>
      <ScrollDivider />
      
      <div style={{ backgroundColor: 'var(--bg-bulkorder, transparent)' }}><BulkOrderForm /></div>
    </div>
  );
};

export default Home;
