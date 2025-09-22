import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Hero from '../components/Hero';
import SearchCategories from '../components/SearchCategories';
import ProductGrid from '../components/ProductGrid';
import PrescriptionUpload from '../components/PrescriptionUpload';
import OrderTracker from '../components/OrderTracker';
import LoyaltyOffers from '../components/LoyaltyOffers';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';

const LandingPage: React.FC = () => {
  return (
    <motion.div
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <Hero />

        {/* Search & Categories */}
        <SearchCategories />

        {/* Featured Products */}
        <ProductGrid />

        {/* Prescription Upload */}
        <PrescriptionUpload />

        {/* Order Tracking Demo */}
        <OrderTracker />

        {/* Loyalty & Offers */}
        <LoyaltyOffers />
      </main>

      {/* Footer */}
      <Footer />

      {/* WhatsApp Float */}
      <WhatsAppFloat />
    </motion.div>
  );
};

export default LandingPage;
