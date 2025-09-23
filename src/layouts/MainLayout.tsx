import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/common/Header';
import SubHeader from '../components/common/SubHeader';
import Footer from '../components/common/Footer';
import WhatsAppFloat from '../components/common/WhatsAppFloat';
import AuthModal from '../components/common/AuthModal';
import FloatingCartButton from '../components/common/FloatingCartButton';
import MedicalBackground from '../components/background/MedicalBackground';
import PromotionalToast from '../components/common/PromotionalToast';
import SideOfferBanner from '../components/common/SideOfferBanner';
import AppDownloadBanner from '../components/common/AppDownloadBanner';
import DeliveryModeModal from '../components/common/DeliveryModeModal';
import { useOrder } from '../contexts/OrderContext';
import FlyingImage from '../components/common/FlyingImage';
import NotificationContainer from '../components/common/NotificationContainer';

const MainLayout: React.FC = () => {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isLoggedIn] = useState(false); // Simulate login state
  const [showToast, setShowToast] = useState(false);
  const [showSideBanner, setShowSideBanner] = useState(false);
  const [isSideBannerClosed, setIsSideBannerClosed] = useState(false);
  const [showAppBanner, setShowAppBanner] = useState(false);
  const [isAppBannerClosed, setIsAppBannerClosed] = useState(false);

  const { deliveryMode, setDeliveryMode, deliveryModeChosen, setDeliveryModeChosen } = useOrder();
  const [showDeliveryModeModal, setShowDeliveryModeModal] = useState(false);

  const [initialAuthModalShown, setInitialAuthModalShown] = useState(false);
  const authIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    if (authIntervalRef.current) {
        clearInterval(authIntervalRef.current);
    }

    if (!isLoggedIn) {
        if (!initialAuthModalShown) {
            const initialTimer = setTimeout(() => {
                if (!isLoggedIn) {
                    setAuthModalOpen(true);
                    setInitialAuthModalShown(true);
                }
            }, 10000); // 10 seconds
            return () => clearTimeout(initialTimer);
        } else {
            authIntervalRef.current = setInterval(() => {
                if (!isLoggedIn) {
                    setAuthModalOpen(true);
                }
            }, 300000); // 5 minutes
        }
    }
    
    return () => {
        if (authIntervalRef.current) {
            clearInterval(authIntervalRef.current);
        }
    };
  }, [isLoggedIn, initialAuthModalShown]);

  useEffect(() => {
    const toastTimer = setTimeout(() => {
        setShowToast(true);
        const hideTimer = setTimeout(() => setShowToast(false), 7000);
        return () => clearTimeout(hideTimer);
    }, 15000);

    const sideBannerTimer = setTimeout(() => {
        if (!isSideBannerClosed) {
            setShowSideBanner(true);
        }
    }, 20000);
    
    const deliveryModeTimer = setTimeout(() => {
        if (!deliveryModeChosen) {
            setShowDeliveryModeModal(true);
        }
    }, 20000);

    const appBannerTimer = setTimeout(() => {
        if (!isAppBannerClosed) {
            setShowAppBanner(true);
        }
    }, 60000); // 1 minute

    return () => {
        clearTimeout(toastTimer);
        clearTimeout(sideBannerTimer);
        clearTimeout(appBannerTimer);
        clearTimeout(deliveryModeTimer);
    };
  }, [isSideBannerClosed, isAppBannerClosed, deliveryModeChosen]);

  const handleCloseSideBanner = () => {
    setShowSideBanner(false);
    setIsSideBannerClosed(true);
  };
  
  const handleCloseAppBanner = () => {
    setShowAppBanner(false);
    setIsAppBannerClosed(true);
  };

  const handleSelectDeliveryMode = (mode: 'delivery' | 'takeaway') => {
    setDeliveryMode(mode);
    setDeliveryModeChosen(true);
    setShowDeliveryModeModal(false);
  };

  const getBackgroundTheme = () => {
    if (location.pathname.startsWith('/about')) return 'about';
    if (location.pathname.startsWith('/checkout')) return 'checkout';
    if (location.pathname.startsWith('/products') || location.pathname.startsWith('/cart')) return 'shop';
    return 'default';
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative overflow-x-hidden">
      {!isHomePage && <MedicalBackground theme={getBackgroundTheme()} />}
      <div className="relative z-10 flex flex-col flex-grow">
        <div className="fixed top-0 left-0 right-0 z-40">
          <Header deliveryMode={deliveryMode} setDeliveryMode={handleSelectDeliveryMode} />
          <SubHeader />
        </div>
        <main className="flex-grow pt-[124px]">
          <Outlet />
        </main>
        <WhatsAppFloat />
        <FloatingCartButton />
        <Footer />
        <AuthModal isOpen={isAuthModalOpen} onClose={() => setAuthModalOpen(false)} />
        <PromotionalToast isVisible={showToast} />
        <SideOfferBanner isVisible={showSideBanner} onClose={handleCloseSideBanner} />
        <AppDownloadBanner isVisible={showAppBanner} onClose={handleCloseAppBanner} />
        <DeliveryModeModal 
            isOpen={showDeliveryModeModal} 
            onClose={() => setShowDeliveryModeModal(false)}
            onSelectMode={handleSelectDeliveryMode}
        />
        <FlyingImage />
        <NotificationContainer />
      </div>
    </div>
  );
};

export default MainLayout;
