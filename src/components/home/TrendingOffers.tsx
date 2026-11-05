import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Wine, BedDouble, Gamepad2, ArrowRight } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

export default function TrendingOffers() {
  const { navigate } = useNavigation();

  const offers = [
    {
      title: 'Twilight Golden Hour',
      tagline: '30% Off Signature Cocktails',
      description: 'Join us on the Garden Terrace between 5:00 PM and 7:00 PM weekdays for handcrafted mixology at golden hour pricing.',
      icon: Wine,
      accent: 'from-[#C8973E] to-[#A07830]',
      badge: 'Mon — Fri · 5-7PM',
      ctaText: 'Browse Drinks',
      action: () => navigate('/menu'),
    },
    {
      title: 'Stay & Dine Experience',
      tagline: 'Boutique Suite + Lounge Credit',
      description: 'Book an Executive King or Penthouse Suite and receive 15% dining credit to enjoy in the lounge or 24/7 in-room dining.',
      icon: BedDouble,
      accent: 'from-[#1B3A2D] to-[#0F2519]',
      badge: 'Hotel Package',
      ctaText: 'View Suites',
      action: () => navigate('/hotel'),
    },
    {
      title: 'VIP Gaming & Bites Combo',
      tagline: '2 Hours PS5 Pro + Sliders',
      description: 'Reserve a 4K OLED gaming booth with a platter of wagyu sliders and craft drinks included for you and three friends.',
      icon: Gamepad2,
      accent: 'from-[#2A5A44] to-[#1B3A2D]',
      badge: 'Group Package',
      ctaText: 'Book Gaming Pod',
      action: () => navigate('/gaming'),
    },
  ];

  return (
    <section className="px-5 py-16 sm:px-8 md:py-24 bg-[#F5F3EE]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs tracking-[0.25em] uppercase text-[#C8973E] font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Privileges</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-[#1A1A1A]">
            Trending Offers &amp; Packages
          </h2>
          <p className="mt-2 text-[#7A7A7A] max-w-md mx-auto">
            Thoughtfully paired culinary, nightlife, and hospitality perks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer, i) => {
            const Icon = offer.icon;
            return (
              <motion.div
                key={offer.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-7 border border-[#E8E6E1] flex flex-col justify-between hover:shadow-lg transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#1B3A2D]/10 flex items-center justify-center text-[#1B3A2D]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-[#C8973E]/15 text-[#A07830]">
                      {offer.badge}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-[#1A1A1A] mb-1">
                    {offer.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#C8973E] mb-3">
                    {offer.tagline}
                  </p>
                  <p className="text-xs text-[#7A7A7A] leading-relaxed">
                    {offer.description}
                  </p>
                </div>

                <button
                  onClick={offer.action}
                  className="mt-6 pt-4 border-t border-[#E8E6E1] flex items-center justify-between text-xs font-bold text-[#1B3A2D] hover:text-[#C8973E] transition-colors cursor-pointer group"
                >
                  <span>{offer.ctaText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

