import React from 'react';
import HomeHero from './HomeHero';
import VenueSpaces from './VenueSpaces';
import FeaturedMenu from './FeaturedMenu';
import UpcomingEventsSection from './UpcomingEventsSection';
import TrendingOffers from './TrendingOffers';

export default function HomePageView() {
  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      <HomeHero />
      <VenueSpaces />
      <FeaturedMenu />
      <UpcomingEventsSection />
      <TrendingOffers />
    </div>
  );
}

