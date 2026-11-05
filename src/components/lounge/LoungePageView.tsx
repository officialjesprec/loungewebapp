import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Wine, Utensils, Sparkles, Calendar, Clock, Users, Plus, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useCart } from '../../context/CartContext';
import { useBooking } from '../../context/BookingContext';
import { IMAGES, MENU_ITEMS, VIP_TABLES, PREORDER_BOTTLES, formatNaira } from '../../data/mockData';
import type { MenuItem } from '../../types/hospitality';

export default function LoungePageView() {
  const { navigate } = useNavigation();
  const { addItem, openCart } = useCart();
  const { addBooking } = useBooking();

  const [selectedTableId, setSelectedTableId] = useState<string>('lounge-terrace-1');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [date, setDate] = useState('Tonight, 7:30 PM');
  const [partySize, setPartySize] = useState(4);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  // Filter lounge tables
  const loungeTables = VIP_TABLES.filter((t) => t.venue === 'lounge');

  // Filter food and cocktails
  const loungeFood = MENU_ITEMS.filter((i) => i.station === 'kitchen').slice(0, 4);
  const loungeCocktails = MENU_ITEMS.filter((i) => i.station === 'bar').slice(0, 4);

  const handleQuickAdd = (item: MenuItem) => {
    addItem(item, 1);
    openCart();
  };

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestPhone) return;

    const table = loungeTables.find((t) => t.id === selectedTableId);
    const booking = addBooking({
      vertical: 'Lounge',
      guestName,
      guestPhone,
      reference: table?.name || 'Lounge Table',
      details: `${partySize} Guests · ${date} · Minimum Spend ${formatNaira(table?.minSpend || 80000)}`,
      date,
      amount: table?.minSpend ? Math.round(table.minSpend * 0.5) : 50000,
      status: 'Confirmed',
    });

    setBookingSuccess(booking.qrCode);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] pb-24">
      {/* Hero */}
      <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden">
        <img
          src={IMAGES.heroLounge}
          alt="The Lounge Interior"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-[#1B3A2D]/90" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-3.5 py-1 rounded-full bg-[#C8973E]/90 text-[11px] font-bold tracking-widest uppercase mb-4"
          >
            The Primary Destination
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight"
          >
            The Lounge &amp; Garden Terrace
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-white/85 max-w-2xl mx-auto leading-relaxed"
          >
            An intimate sanctuary for modern gourmands, cocktail connoisseurs, and sunset revelers. Thoughtfully composed dishes and artisanal mixology under open skies.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row gap-3.5 justify-center"
          >
            <a
              href="#reserve-table"
              className="px-8 py-3.5 rounded-full bg-[#C8973E] text-white font-bold text-xs tracking-wider uppercase hover:bg-[#b5862f] transition-colors"
            >
              Reserve a Lounge Table
            </a>
            <button
              onClick={() => navigate('/menu')}
              className="px-8 py-3.5 rounded-full border border-white/40 text-white font-bold text-xs tracking-wider uppercase hover:bg-white/10 transition-colors cursor-pointer"
            >
              Explore Full Dining &amp; Bar Menu
            </button>
          </motion.div>
        </div>
      </section>

      {/* Pillars / Atmosphere */}
      <section className="px-5 py-16 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Artisan Mixology',
              desc: 'From tableside smoked negronis to rare aged agave flights, our bar team balances precision with sensory flair.',
              icon: Wine,
            },
            {
              title: 'Chef-Led Dining',
              desc: 'A harmonized menu blending prime A5 wagyu carpaccio, slow-charred local suya, and delicate Atlantic seafood.',
              icon: Utensils,
            },
            {
              title: 'Acoustic Evenings',
              desc: 'Curated vinyl sets, candlelight jazz trios, and mellow soul sessions creating an evocative backdrop daily.',
              icon: Sparkles,
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white p-7 rounded-2xl border border-[#E8E6E1] shadow-xs hover:border-[#C8973E] transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-[#1B3A2D]/10 text-[#1B3A2D] flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-[#1A1A1A] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-[#7A7A7A] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Kitchen Plates */}
      <section className="px-5 py-12 sm:px-8 bg-[#F5F3EE]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
            <div>
              <span className="text-xs tracking-widest uppercase text-[#C8973E] font-bold block mb-1">
                From The Kitchen
              </span>
              <h2 className="font-display text-3xl font-bold text-[#1A1A1A]">
                Small Plates &amp; Chef Specialties
              </h2>
            </div>
            <button
              onClick={() => navigate('/menu')}
              className="mt-2 sm:mt-0 text-xs font-bold text-[#1B3A2D] hover:text-[#C8973E] flex items-center gap-1 cursor-pointer"
            >
              <span>View All Kitchen Items</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loungeFood.map((plate) => (
              <div
                key={plate.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#E8E6E1] flex flex-col justify-between"
              >
                <div>
                  <img
                    src={plate.image}
                    alt={plate.name}
                    className="w-full h-44 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-display text-base font-bold text-[#1A1A1A]">
                        {plate.name}
                      </h4>
                      <span className="text-xs font-bold text-[#1B3A2D]">
                        {formatNaira(plate.price)}
                      </span>
                    </div>
                    <p className="text-xs text-[#7A7A7A] line-clamp-2">
                      {plate.description}
                    </p>
                  </div>
                </div>
                <div className="p-4 pt-0">
                  <button
                    onClick={() => handleQuickAdd(plate)}
                    className="w-full py-2 rounded-xl bg-[#1B3A2D] text-white hover:bg-[#2A5A44] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Order to Table</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Cocktails */}
      <section className="px-5 py-16 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <span className="text-xs tracking-widest uppercase text-[#C8973E] font-bold block mb-1">
              Craft Mixology
            </span>
            <h2 className="font-display text-3xl font-bold text-[#1A1A1A]">
              Signature Lounge Cocktails
            </h2>
          </div>
          <button
            onClick={() => navigate('/menu')}
            className="mt-2 sm:mt-0 text-xs font-bold text-[#1B3A2D] hover:text-[#C8973E] flex items-center gap-1 cursor-pointer"
          >
            <span>View Cocktail List</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loungeCocktails.map((drink) => (
            <div
              key={drink.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#E8E6E1] flex flex-col justify-between"
            >
              <div>
                <img
                  src={drink.image}
                  alt={drink.name}
                  className="w-full h-44 object-cover"
                />
                <div className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-display text-base font-bold text-[#1A1A1A]">
                      {drink.name}
                    </h4>
                    <span className="text-xs font-bold text-[#1B3A2D]">
                      {formatNaira(drink.price)}
                    </span>
                  </div>
                  <p className="text-xs text-[#7A7A7A] line-clamp-2">
                    {drink.description}
                  </p>
                </div>
              </div>
              <div className="p-4 pt-0">
                <button
                  onClick={() => handleQuickAdd(drink)}
                  className="w-full py-2 rounded-xl bg-[#C8973E] text-white hover:bg-[#b5862f] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Order Cocktail</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Table & Booth Reservation */}
      <section id="reserve-table" className="px-5 py-16 sm:px-8 bg-[#1B3A2D] text-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs tracking-widest uppercase text-[#DABA6E] font-bold block mb-1">
              Table Bookings
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold">
              Reserve Your Lounge Experience
            </h2>
            <p className="text-xs text-white/80 max-w-md mx-auto mt-2">
              Select your preferred terrace or indoor booth and secure your table with advance bottle or dining prep.
            </p>
          </div>

          {bookingSuccess ? (
            <div className="bg-white text-[#1A1A1A] p-8 rounded-3xl text-center space-y-4 shadow-xl">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-display text-2xl font-bold">Table Confirmed!</h3>
              <p className="text-xs text-[#7A7A7A]">
                Your table is reserved. Present this digital pass reference on arrival:
              </p>
              <div className="p-3 bg-[#F5F3EE] rounded-xl font-bold text-sm tracking-wider text-[#1B3A2D]">
                {bookingSuccess}
              </div>
              <button
                onClick={() => setBookingSuccess(null)}
                className="px-6 py-2.5 rounded-full bg-[#1B3A2D] text-white text-xs font-bold"
              >
                Make Another Reservation
              </button>
            </div>
          ) : (
            <form onSubmit={handleReserve} className="bg-white text-[#1A1A1A] p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
              {/* Table Selection */}
              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] mb-2">
                  Select Seating Area
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {loungeTables.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSelectedTableId(t.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedTableId === t.id
                          ? 'border-[#1B3A2D] bg-[#1B3A2D]/5 font-bold'
                          : 'border-[#E8E6E1] hover:border-[#1B3A2D]'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-[#1A1A1A]">{t.name}</span>
                        <span className="text-[10px] text-[#C8973E] font-bold">
                          Cap: {t.capacity}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#7A7A7A]">
                        Min Spend: {formatNaira(t.minSpend)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Guest Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-[#4A4A4A] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#D5D2CC] bg-[#FAFAF7] focus:outline-hidden focus:border-[#1B3A2D]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#4A4A4A] mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    placeholder="+234 800 000 0000"
                    className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#D5D2CC] bg-[#FAFAF7] focus:outline-hidden focus:border-[#1B3A2D]"
                  />
                </div>
              </div>

              {/* Time & Party */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-[#4A4A4A] mb-1">
                    Reservation Time
                  </label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#D5D2CC] bg-[#FAFAF7] focus:outline-hidden focus:border-[#1B3A2D]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#4A4A4A] mb-1">
                    Party Size
                  </label>
                  <div className="flex gap-2">
                    {[2, 4, 6, 8].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setPartySize(n)}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg cursor-pointer ${
                          partySize === n
                            ? 'bg-[#1B3A2D] text-white'
                            : 'bg-[#F5F3EE] text-[#4A4A4A]'
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={!guestName || !guestPhone}
                className="w-full py-3.5 rounded-full bg-[#1B3A2D] hover:bg-[#2A5A44] disabled:bg-[#D5D2CC] text-white font-bold text-xs tracking-wider uppercase transition-colors cursor-pointer shadow-md"
              >
                Confirm Lounge Table Reservation
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

