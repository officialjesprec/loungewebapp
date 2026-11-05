import React from 'react';
import { Home, Wine, Utensils, Calendar, User } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import type { RoutePath } from '../../types/hospitality';

export default function MobileNav() {
  const { currentPath, navigate } = useNavigation();
  const { items } = useCart();
  const { isAuthenticated } = useAuth();

  const totalCartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const tabs: { label: string; path: RoutePath; icon: React.ElementType; badge?: number }[] = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Lounge', path: '/lounge', icon: Wine },
    { label: 'Order', path: '/menu', icon: Utensils, badge: totalCartCount },
    { label: 'Events', path: '/events', icon: Calendar },
    { label: 'Profile', path: isAuthenticated ? '/userprofile' : '/login', icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAFAF7]/95 backdrop-blur-md border-t border-[#E8E6E1] safe-bottom shadow-lg">
      <div className="grid grid-cols-5 h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentPath === tab.path;

          return (
            <button
              key={tab.label}
              onClick={() => navigate(tab.path)}
              className={`relative flex flex-col items-center justify-center py-1 transition-colors cursor-pointer ${
                isActive ? 'text-[#1B3A2D]' : 'text-[#7A7A7A] hover:text-[#1A1A1A]'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="absolute -top-1 -right-2 bg-[#C8973E] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-1 tracking-tight ${isActive ? 'font-bold text-[#1B3A2D]' : 'font-medium'}`}>
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute top-0 w-8 h-0.5 bg-[#1B3A2D] rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

