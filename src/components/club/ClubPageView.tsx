import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Flame, Music, Shield, Wine, Sparkles, CheckCircle2 } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useBooking } from '../../context/BookingContext';
import { IMAGES, VIP_TABLES, PREORDER_BOTTLES, EVENTS, formatNaira } from '../../data/mockData';

export default function ClubPageView() {
  const { navigate } = useNavigation();
  const { addBooking } = useBooking();

  const [selectedBoothId, setSelectedBoothId] = useState('club-dj-1');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [confirmed, setConfirmed] = useState<string | null>(null);

  const clubBooths = VIP_TABLES.filter((t) => t.venue === 'club');
  const djEvents = EVENTS.filter((e) => e.vibe === 'nightlife');

  const handleBoothReserve = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestPhone) return;

    const booth = clubBooths.find((b) => b.id === selectedBoothId);
    const booking = addBooking({
      vertical: 'Club',
      guestName,
      guestPhone,
      reference: booth?.name || 'VIP Club Booth',
      details: `VIP Booth · ₦500,000 Deposit · Min Spend ${formatNaira(booth?.minSpend || 850000)}`,
      date: 'Tonight, 11:00 PM',
      amount: 500000,
      status: 'Confirmed',
    });

    setConfirmed(booking.qrCode);
  };

  return (
    <div className="min-h-screen bg-[#0F2519] text-white pb-24">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <img
          src={IMAGES.heroClub}
          alt="Nightclub Vibe"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-[#0F2519]" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-3.5 py-1 rounded-full bg-[#C8973E] text-white text-[11px] font-bold tracking-widest uppercase mb-4"
          >
            Nightlife &amp; VIP Bottle Service
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight"
          >
            The Nocturne Club
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-white/80 max-w-xl mx-auto leading-relaxed"
          >
            Lagos’ most electric nightlife experience. Premier acoustic engineering, kinetic lighting, resident DJ lineups, and unrivaled VIP table service.
          </motion.p>
        </div>
      </section>

      {/* Dress Code & Club Standards */}
      <section className="px-5 py-10 sm:px-8 max-w-7xl mx-auto">
        <div className="bg-[#1B3A2D] p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#C8973E]/20 text-[#DABA6E] flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold">House Standards &amp; Dress Code</h3>
              <p className="text-xs text-white/70 mt-0.5">
                Chic evening attire strictly enforced. No tracksuits, caps, or slippers. VIP booths have priority valet.
              </p>
            </div>
          </div>
          <div className="text-xs text-[#DABA6E] font-semibold tracking-wider uppercase shrink-0">
            Doors Open 10:00 PM — Late
          </div>
        </div>
      </section>

      {/* VIP Booths Showcase */}
      <section className="px-5 py-12 sm:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <span className="text-xs tracking-widest uppercase text-[#C8973E] font-bold block mb-1">
            Bottle Service
          </span>
          <h2 className="font-display text-3xl font-bold">VIP Mezzanine &amp; Stage Booths</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {clubBooths.map((booth) => (
            <div
              key={booth.id}
              className="bg-[#1B3A2D]/60 rounded-2xl p-6 border border-white/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-display text-xl font-bold">{booth.name}</h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#C8973E] text-white">
                    Cap: {booth.capacity}
                  </span>
                </div>
                <p className="text-xs text-white/70 mb-4">
                  Prime tier view, dedicated host, security flank, and pre-chilled crystal bucket.
                </p>
                <div className="p-3 bg-black/40 rounded-xl space-y-1 text-xs">
                  <div className="flex justify-between text-white/60">
                    <span>Minimum Spend:</span>
                    <span className="text-white font-bold">{formatNaira(booth.minSpend)}</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Initial Deposit:</span>
                    <span className="text-[#DABA6E] font-bold">₦500,000</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedBoothId(booth.id)}
                className={`mt-6 w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  selectedBoothId === booth.id
                    ? 'bg-[#C8973E] text-white'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                {selectedBoothId === booth.id ? 'Selected' : 'Select Booth'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Reserve Form */}
      <section className="px-5 py-12 sm:px-8 max-w-3xl mx-auto">
        <div className="bg-[#1B3A2D] p-8 rounded-3xl border border-white/15">
          <h3 className="font-display text-2xl font-bold mb-2">Lock In Your VIP Booth</h3>
          <p className="text-xs text-white/70 mb-6">
            Enter your party details below. We hold your booth until midnight with verified bottle service.
          </p>

          {confirmed ? (
            <div className="text-center py-6 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#C8973E] mx-auto" />
              <h4 className="font-display text-xl font-bold">Booth Locked In!</h4>
              <p className="text-xs text-white/80">Digital Reference: {confirmed}</p>
              <button
                onClick={() => setConfirmed(null)}
                className="mt-4 px-6 py-2 rounded-full bg-white text-[#1B3A2D] text-xs font-bold"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleBoothReserve} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-white/80 mb-1">
                    Guest Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Chief Femi Adeleke"
                    className="w-full px-3 py-2.5 text-xs rounded-xl bg-black/40 border border-white/20 text-white focus:outline-hidden focus:border-[#C8973E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/80 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    placeholder="+234 800 000 0000"
                    className="w-full px-3 py-2.5 text-xs rounded-xl bg-black/40 border border-white/20 text-white focus:outline-hidden focus:border-[#C8973E]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!guestName || !guestPhone}
                className="w-full py-3.5 rounded-full bg-[#C8973E] hover:bg-[#b5862f] disabled:bg-white/20 text-white font-bold text-xs tracking-wider uppercase transition-colors cursor-pointer shadow-lg"
              >
                Confirm VIP Booth (Deposit ₦500,000)
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Bottle Service Collection */}
      <section className="px-5 py-12 sm:px-8 max-w-7xl mx-auto">
        <div className="mb-6">
          <span className="text-xs tracking-widest uppercase text-[#C8973E] font-bold block mb-1">
            Top Shelf
          </span>
          <h2 className="font-display text-2xl font-bold">Reserve Spirits &amp; Champagne</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {PREORDER_BOTTLES.map((bot) => (
            <div key={bot.id} className="bg-black/30 p-3.5 rounded-xl border border-white/10 text-center">
              <span className="text-[10px] text-[#C8973E] uppercase font-bold block mb-1">
                {bot.category}
              </span>
              <h5 className="text-xs font-bold truncate text-white">{bot.name}</h5>
              <p className="text-xs font-semibold text-[#DABA6E] mt-1">{formatNaira(bot.price)}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

