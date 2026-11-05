import React from 'react';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { CartProvider } from './context/CartContext';
import { BookingProvider } from './context/BookingContext';
import { AuthProvider } from './context/AuthContext';

// Common UI
import Header from './components/common/Header';
import MobileNav from './components/common/MobileNav';
import Footer from './components/common/Footer';
import CartDrawer from './components/common/CartDrawer';
import OrderStatusModal from './components/common/OrderStatusModal';
import QuickBookingModal from './components/common/QuickBookingModal';

// Views
import HomePageView from './components/home/HomePageView';
import LoungePageView from './components/lounge/LoungePageView';
import ClubPageView from './components/club/ClubPageView';
import HotelPageView from './components/hotel/HotelPageView';
import GamingPageView from './components/gaming/GamingPageView';
import EventsPageView from './components/events/EventsPageView';
import MenuPageView from './components/menu/MenuPageView';
import UserProfileView from './components/profile/UserProfileView';
import UserLoginView from './components/auth/UserLoginView';
import AdminLoginView from './components/auth/AdminLoginView';
import AdminCrmView from './components/admin/AdminCrmView';

function AppContent() {
  const { currentPath } = useNavigation();

  const renderActiveView = () => {
    switch (currentPath) {
      case '/':
        return <HomePageView />;
      case '/lounge':
        return <LoungePageView />;
      case '/club':
        return <ClubPageView />;
      case '/hotel':
        return <HotelPageView />;
      case '/gaming':
        return <GamingPageView />;
      case '/events':
        return <EventsPageView />;
      case '/menu':
        return <MenuPageView />;
      case '/userprofile':
        return <UserProfileView />;
      case '/login':
        return <UserLoginView />;
      case '/admin/login':
        return <AdminLoginView />;
      case '/admin':
        return <AdminCrmView />;
      default:
        return <HomePageView />;
    }
  };

  const isAdminRoute = currentPath === '/admin' || currentPath === '/admin/login';

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF7] text-[#1A1A1A]">
      {/* Header (hidden only on admin login) */}
      {currentPath !== '/admin/login' && <Header />}

      {/* Main View */}
      <main className="flex-1">
        {renderActiveView()}
      </main>

      {/* Footer (hidden on admin command center) */}
      {currentPath !== '/admin' && <Footer />}

      {/* Mobile Bottom Navigation (hidden on admin pages) */}
      {!isAdminRoute && <MobileNav />}

      {/* Overlays */}
      <CartDrawer />
      <OrderStatusModal />
      <QuickBookingModal />
    </div>
  );
}

export default function App() {
  return (
    <NavigationProvider>
      <AuthProvider>
        <BookingProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </BookingProvider>
      </AuthProvider>
    </NavigationProvider>
  );
}
