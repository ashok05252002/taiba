import React from 'react';
import BannerCarousel from '../components/home/BannerCarousel';
import TrustBar from '../components/home/TrustBar';
import HomeTopCategories from '../components/home/HomeTopCategories';
import NewArrivals from '../components/home/NewArrivals';
import ExclusiveDeals from '../components/home/ExclusiveDeals';
import PopularBrands from '../components/home/PopularBrands';
import BestSellers from '../components/home/BestSellers';
import RecommendedForYou from '../components/home/RecommendedForYou';
import ShopByConcern from '../components/home/ShopByConcern';
import SkincareOfferBanner from '../components/home/banners/SkincareOfferBanner';
import BabyCareOfferBanner from '../components/home/banners/BabyCareOfferBanner';
import WellnessOfferBanner from '../components/home/banners/WellnessOfferBanner';
import MedicalBackground from '../components/background/MedicalBackground';
import HomeLoyaltyCard from '../components/home/HomeLoyaltyCard';
import { motion } from 'framer-motion';
import GiftCardSection from '../components/home/GiftCardSection';
import GiftsForEveryone from '../components/home/GiftsForEveryone';

const HomePage: React.FC = () => {
  return (
    <div>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <BannerCarousel />
      </div>
      <TrustBar />
      <HomeLoyaltyCard />
      <HomeTopCategories />
      
      <section className="relative bg-white py-16 overflow-hidden">
        <MedicalBackground theme="dynamic" />
        <motion.div 
            className="relative z-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            <BestSellers />
        </motion.div>
      </section>

      <PopularBrands />
      
      <SkincareOfferBanner />
      
      <GiftsForEveryone />

      <section className="relative bg-gray-50 py-16 overflow-hidden">
        <MedicalBackground theme="shop" />
        <motion.div 
            className="relative z-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            <ExclusiveDeals />
        </motion.div>
      </section>

      <NewArrivals />
      <BabyCareOfferBanner />
      
      <section className="relative bg-white py-16 overflow-hidden">
        <MedicalBackground theme="dynamic" />
        <motion.div 
            className="relative z-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            <ShopByConcern />
        </motion.div>
      </section>

      <GiftCardSection />

      <WellnessOfferBanner />
      
      <section className="relative bg-taiba-mustard/10 py-16 overflow-hidden">
        <MedicalBackground theme="default" />
        <div className="relative z-10">
            <RecommendedForYou />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
