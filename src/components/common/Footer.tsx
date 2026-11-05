import React from 'react';
import { Lock, MapPin, Phone, Mail, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

export default function Footer() {
  const { navigate } = useNavigation();

  return (
    <footer className="bg-[#0F2519] text-[#FAFAF7] pt-16 pb-24 md:pb-16 border-t border-[#1B3A2D]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-display text-2xl font-bold tracking-tight text-white block">
              NOCTURNE
            </span>
            <p className="text-xs tracking-[0.2em] uppercase text-[#C8973E] font-medium">
              Lounge &amp; Hospitality Collective
            </p>
            <p className="text-xs text-white/70 max-w-sm leading-relaxed">
              An all-encompassing lifestyle destination uniting world-class dining, handcrafted cocktails, electric nightlife, boutique accommodations, and premier VIP gaming.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#DABA6E]">
              <MapPin className="w-4 h-4 text-[#C8973E] shrink-0" />
              <span>Plot 14B Admiralty Way, Lekki Phase 1, Lagos, Nigeria</span>
            </div>
          </div>

          {/* Spaces & Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#C8973E] font-semibold">
              The Collective
            </h4>
            <ul className="space-y-2 text-xs text-white/80">
              <li>
                <button
                  onClick={() => navigate('/lounge')}
                  className="hover:text-[#C8973E] transition-colors cursor-pointer"
                >
                  The Lounge &amp; Terrace (Primary)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/club')}
                  className="hover:text-[#C8973E] transition-colors cursor-pointer"
                >
                  The Nightclub &amp; VIP Booths
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/hotel')}
                  className="hover:text-[#C8973E] transition-colors cursor-pointer"
                >
                  Boutique Hotel Suites
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/gaming')}
                  className="hover:text-[#C8973E] transition-colors cursor-pointer"
                >
                  VIP Gaming Space &amp; Billiards
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/events')}
                  className="hover:text-[#C8973E] transition-colors cursor-pointer"
                >
                  Lifestyle Events Calendar
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/menu')}
                  className="hover:text-[#C8973E] transition-colors cursor-pointer"
                >
                  Guest Table Menu &amp; Ordering
                </button>
              </li>
            </ul>
          </div>

          {/* Operating Hours */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#C8973E] font-semibold">
              Operating Hours
            </h4>
            <div className="space-y-2 text-xs text-white/80">
              <div>
                <span className="text-[#DABA6E] font-medium block">The Lounge</span>
                <span>Daily · 12:00 PM — 2:00 AM</span>
              </div>
              <div>
                <span className="text-[#DABA6E] font-medium block">The Nightclub</span>
                <span>Thu — Sun · 10:00 PM — 5:00 AM</span>
              </div>
              <div>
                <span className="text-[#DABA6E] font-medium block">VIP Gaming Suite</span>
                <span>Daily · 2:00 PM — 1:00 AM</span>
              </div>
              <div>
                <span className="text-[#DABA6E] font-medium block">Boutique Hotel</span>
                <span>24/7 Front Concierge &amp; Room Service</span>
              </div>
            </div>
          </div>

          {/* Guest Policies & Dress Code */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#C8973E] font-semibold">
              Guest Policies
            </h4>
            <p className="text-xs text-white/70 leading-relaxed">
              <strong className="text-white">Dress Code:</strong> Smart casual for dining and terrace lounge; sophisticated chic for club nightlife. No athletic sportswear or slippers.
            </p>
            <p className="text-xs text-white/70 leading-relaxed">
              <strong className="text-white">Reservations:</strong> Tables are held for 20 minutes past reservation time. VIP booths require a confirmed bottle deposit.
            </p>
          </div>
        </div>

        {/* Bottom Bar with Admin Portal Link */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© {new Date().getFullYear()} Nocturne Hospitality Group. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('/login')}
              className="hover:text-[#C8973E] transition-colors cursor-pointer"
            >
              Member Portal
            </button>
            <span className="opacity-30">·</span>
            {/* User requirement: Add the admin login on the footer */}
            <button
              onClick={() => navigate('/admin/login')}
              className="inline-flex items-center gap-1.5 text-white/60 hover:text-[#C8973E] transition-colors cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Staff &amp; Operations Command</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

