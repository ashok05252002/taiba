import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import ProfilePage from './pages/ProfilePage';
import AboutUsPage from './pages/info/AboutUsPage';
import ContactPage from './pages/info/ContactPage';
import FaqPage from './pages/info/FaqPage';
import PolicyPage from './pages/info/PolicyPage';
import RewardsPage from './pages/info/RewardsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SupportPage from './pages/SupportPage';
import ScrollToTop from './utils/ScrollToTop';
import GiftCardPage from './pages/GiftCardPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductListingPage />} />
          <Route path="products/:id" element={<ProductDetailPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="order/:id" element={<OrderTrackingPage />} />
          <Route path="order-confirmation" element={<OrderConfirmationPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="about" element={<AboutUsPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="rewards" element={<RewardsPage />} />
          <Route path="privacy-policy" element={<PolicyPage type="privacy" />} />
          <Route path="terms-of-service" element={<PolicyPage type="terms" />} />
          <Route path="refund-policy" element={<PolicyPage type="refund" />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="support" element={<SupportPage />} />
          <Route path="gift-cards" element={<GiftCardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
