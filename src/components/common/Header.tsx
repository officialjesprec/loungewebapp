import React, { useState } from 'react';
import { ShoppingBag, User, Utensils, Calendar, Menu as MenuIcon, X, Sparkles } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import type { RoutePath } from '../../types/hospitality';

export default function Header() {
  const { currentPath, navigate } = useNavigation();
  const { items, openCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalCartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks: { label: string; path: RoutePath; isPrimary?: boolean }[] = [
    { label: 'The Lounge', path: '/lounge', isPrimary: true },
    { label: 'Club', path: '/club' },
    { label: 'Hotel', path: '/hotel' },
    { label: 'Gaming', path: '/gaming' },
    { label: 'Events', path: '/events' },
    { label: 'Menu & Order', path: '/menu' },
  ];

  const handleNavClick = (path: RoutePath) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAFAF7]/95 backdrop-blur-md border-b border-[#E8E6E1]">
      {/* Top Banner Notice */}
      <div className="bg-[#1B3A2D] text-[#FAFAF7] px-4 py-1.5 text-[11px] font-medium tracking-wider flex items-center justify-between sm:justify-center gap-3">
        <span className="hidden sm:inline">NOCTURNE HOSPITALITY COLLECTIVE</span>
        <span className="hidden sm:inline opacity-40">·</span>
        <span className="text-[#DABA6E] flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          <span>Frictionless In-Venue Table Ordering Active</span>
        </span>
        <span className="hidden md:inline opacity-40">·</span>
        <span className="hidden md:inline text-white/80">Lounge · Club · Hotel · Gaming</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('/')}
          className="text-left group cursor-pointer shrink-0"
        >
          <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1B3A2D] block leading-none">
            NOCTURNE
          </span>
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#C8973E] font-medium block mt-0.5">
            Lounge &amp; Collective
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`relative text-xs tracking-wider uppercase font-semibold transition-colors py-1 cursor-pointer ${
                  isActive
                    ? 'text-[#1B3A2D] font-bold'
                    : 'text-[#4A4A4A] hover:text-[#1B3A2D]'
                } ${link.isPrimary ? 'text-[#1B3A2D] flex items-center gap-1' : ''}`}
              >
                {link.label}
                {link.isPrimary && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8973E]" />
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1B3A2D] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action Icons */}
        <div className="flex items-center gap-3">
          {/* Quick Table Order button */}
          <button
            onClick={() => handleNavClick('/menu')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#1B3A2D] text-white hover:bg-[#2A5A44] transition-colors text-xs font-semibold tracking-wide cursor-pointer"
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>Table Order</span>
          </button>

          {/* Cart Trigger */}
          <button
            onClick={openCart}
            className="relative p-2.5 rounded-full bg-white border border-[#E8E6E1] text-[#1B3A2D] hover:border-[#C8973E] transition-colors cursor-pointer shadow-xs"
            aria-label="Open Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#C8973E] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* User Account / Member Login */}
          <button
            onClick={() => handleNavClick(isAuthenticated ? '/userprofile' : '/login')}
            className="flex items-center gap-2 p-2 sm:px-3.5 sm:py-2 rounded-full border border-[#E8E6E1] bg-white hover:border-[#1B3A2D] text-[#1B3A2D] text-xs font-semibold tracking-wide transition-colors cursor-pointer shadow-xs"
          >
            <User className="w-4 h-4 text-[#C8973E]" />
            <span className="hidden md:inline">
              {isAuthenticated ? user?.name?.split(' ')[0] : 'Member Sign In'}
            </span>
          </button>

          {/* Mobile hamburger menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#1B3A2D] hover:text-[#C8973E] transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8E6E1] bg-[#FAFAF7] px-6 py-5 space-y-3 animate-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => handleNavClick(link.path)}
              className={`w-full text-left py-2.5 px-3 rounded-xl text-sm font-semibold tracking-wide flex items-center justify-between cursor-pointer ${
                currentPath === link.path
                  ? 'bg-[#1B3A2D] text-white'
                  : 'text-[#1A1A1A] hover:bg-[#F5F3EE]'
              }`}
            >
              <span>{link.label}</span>
              {link.isPrimary && (
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#DABA6E]">
                  Primary
                </span>
              )}
            </button>
          ))}
          <div className="pt-3 border-t border-[#E8E6E1] flex gap-2">
            <button
              onClick={() => handleNavClick('/menu')}
              className="flex-1 py-2.5 rounded-xl bg-[#1B3A2D] text-white text-xs font-bold tracking-wide text-center"
            >
              Order to Table
            </button>
            <button
              onClick={() => handleNavClick(isAuthenticated ? '/userprofile' : '/login')}
              className="flex-1 py-2.5 rounded-xl border border-[#1B3A2D] text-[#1B3A2D] text-xs font-bold tracking-wide text-center"
            >
              {isAuthenticated ? 'My Profile' : 'Member Sign In'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

