import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
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
import Dashboard from './components/admin/Dashboard';
import UserManagementPage from './pages/admin/UserManagementPage';
import ProductManagementPage from './pages/admin/ProductManagementPage';
import OrderManagementPage from './pages/admin/OrderManagementPage';
import PaymentManagementPage from './pages/admin/PaymentManagementPage';
import PromotionManagementPage from './pages/admin/PromotionManagementPage';
import CmsManagementPage from './pages/admin/CmsManagementPage';
import AnalyticsPage from './pages/admin/AnalyticsPage';
import SettingsPage from './pages/admin/SettingsPage';
import StoreManagementPage from './pages/admin/StoreManagementPage';
import DeliveryPartnerManagementPage from './pages/admin/DeliveryPartnerManagementPage';
import DeliveryPartnerDetailPage from './pages/admin/DeliveryPartnerDetailPage';
import CustomerManagementPage from './pages/admin/CustomerManagementPage';
import CustomerDetailPage from './pages/admin/CustomerDetailPage';
import SubAdminDetailPage from './pages/admin/SubAdminDetailPage';
import ClusterLogicPage from './pages/admin/ClusterLogicPage';
import ProductAdminDetailPage from './pages/admin/ProductDetailPage';
import StoreDetailPage from './pages/admin/StoreDetailPage';
import { LanguageProvider } from './contexts/LanguageContext';
import { CartProvider } from './contexts/CartContext';
import { OrderProvider } from './contexts/OrderContext';
import { NotificationProvider } from './contexts/NotificationContext';

function App() {
  return (
    <Router>
      <LanguageProvider>
        <NotificationProvider>
          <CartProvider>
            <OrderProvider>
              <ScrollToTop />
              <Routes>
                <Route path="/*" element={<MainLayout />}>
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
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="users" element={<UserManagementPage />} />
                    <Route path="users/:id" element={<SubAdminDetailPage />} />
                    <Route path="customers" element={<CustomerManagementPage />} />
                    <Route path="customers/:id" element={<CustomerDetailPage />} />
                    <Route path="products" element={<ProductManagementPage />} />
                    <Route path="products/:id" element={<ProductAdminDetailPage />} />
                    <Route path="orders" element={<OrderManagementPage />} />
                    <Route path="payments" element={<PaymentManagementPage />} />
                    <Route path="promotions" element={<PromotionManagementPage />} />
                    <Route path="cms" element={<CmsManagementPage />} />
                    <Route path="analytics" element={<AnalyticsPage />} />
                    <Route path="settings" element={<SettingsPage />} />
                    <Route path="stores" element={<StoreManagementPage />} />
                    <Route path="stores/:id" element={<StoreDetailPage />} />
                    <Route path="delivery-partners" element={<DeliveryPartnerManagementPage />} />
                    <Route path="delivery-partners/:id" element={<DeliveryPartnerDetailPage />} />
                    <Route path="cluster-logic" element={<ClusterLogicPage />} />
                </Route>
              </Routes>
            </OrderProvider>
          </CartProvider>
        </NotificationProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;
