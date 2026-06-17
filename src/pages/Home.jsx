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
      <HeroSlider />
      <ScrollDivider />
      
      <ShopByIndustry />
      <ScrollDivider />
      
      <BestSellers />
      <ScrollDivider />
      
      <ShopByOccasion />
      <ScrollDivider />
      
      <InstagramReels />
      <ScrollDivider />
      
      <CustomIdeas />
      <ScrollDivider />
      
      <PerfectGift />
      <ScrollDivider />
      
      <RoomDecor />
      <ScrollDivider />
      
      <ShowroomShine />
      <ScrollDivider />
      
      <ConfidenceBuilder />
      <ScrollDivider />
      
      <B2BServices />
      <ScrollDivider />
      
      <BulkOrderForm />
    </div>
  );
};

export default Home;
