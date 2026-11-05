import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Gamepad2, Tv, Users, Trophy, Plus, CheckCircle2, ArrowRight } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useCart } from '../../context/CartContext';
import { useBooking } from '../../context/BookingContext';
import { IMAGES, GAMING_PODS, MENU_ITEMS, formatNaira } from '../../data/mockData';

export default function GamingPageView() {
  const { navigate } = useNavigation();
  const { addItem, openCart } = useCart();
  const { addBooking } = useBooking();

  const [selectedPodId, setSelectedPodId] = useState('pod-ps5-1');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [hours, setHours] = useState(2);
  const [confirmed, setConfirmed] = useState<string | null>(null);

  const gamingBites = MENU_ITEMS.filter((i) => i.category === 'gaming_bites');
  const selectedPod = GAMING_PODS.find((p) => p.id === selectedPodId) || GAMING_PODS[0];
  const podTotal = selectedPod.hourlyRate * hours;

  const handleBookPod = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestPhone) return;

    const booking = addBooking({
      vertical: 'Gaming',
      guestName,
      guestPhone,
      reference: selectedPod.name,
      details: `${hours} Hour(s) · Up to ${selectedPod.capacity} Players · Waiter Service`,
      date: 'Today / Walk-in',
      amount: podTotal,
      status: 'Confirmed',
    });

    setConfirmed(booking.qrCode);
  };

  return (
    <div className="min-h-screen bg-[#111827] text-white pb-24">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <img
          src={IMAGES.heroGaming}
          alt="VIP Gaming Suite"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-[#111827]/70 to-[#111827]" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-3.5 py-1 rounded-full bg-[#C8973E] text-white text-[11px] font-bold tracking-widest uppercase mb-4"
          >
            VIP Entertainment
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl font-bold leading-tight"
          >
            VIP Gaming &amp; Billiards Lounge
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-white/80 max-w-xl mx-auto leading-relaxed"
          >
            Next-gen PS5 Pro private suites, high-refresh PC battle stations, championship billiards, and bespoke lounge service right to your gaming recliner.
          </motion.p>
        </div>
      </section>

      {/* Pods Grid */}
      <section className="px-5 py-14 sm:px-8 max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <span className="text-xs tracking-widest uppercase text-[#C8973E] font-bold block mb-1">
            Gaming Setups
          </span>
          <h2 className="font-display text-3xl font-bold">
            Private Pods &amp; Battle Stations
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GAMING_PODS.map((pod) => {
            const isSelected = selectedPodId === pod.id;
            return (
              <div
                key={pod.id}
                className={`bg-[#1F2937] rounded-2xl overflow-hidden border transition-all flex flex-col justify-between ${
                  isSelected ? 'border-[#C8973E] ring-2 ring-[#C8973E]/30' : 'border-white/10'
                }`}
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={pod.image}
                      alt={pod.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-black/80 px-2.5 py-1 rounded-full text-xs font-bold text-[#DABA6E]">
                      {formatNaira(pod.hourlyRate)}/hr
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-display text-lg font-bold">{pod.name}</h3>
                      <span className="text-[10px] text-white/60 font-bold uppercase">
                        Cap: {pod.capacity}
                      </span>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-white/10">
                      {pod.features.map((feat) => (
                        <div key={feat} className="text-xs text-white/70 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C8973E]" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => setSelectedPodId(pod.id)}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#C8973E] text-white'
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    {isSelected ? 'Selected' : 'Select Pod'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Gaming Bites */}
      <section className="px-5 py-12 sm:px-8 bg-[#1F2937]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="text-xs tracking-widest uppercase text-[#C8973E] font-bold block mb-1">
                Fuel Up
              </span>
              <h2 className="font-display text-2xl font-bold">Gaming Bites &amp; Platters</h2>
            </div>
            <button
              onClick={() => navigate('/menu')}
              className="text-xs text-[#DABA6E] hover:underline font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>Full Menu</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {gamingBites.map((bite) => (
              <div
                key={bite.id}
                className="bg-[#111827] rounded-2xl p-4 flex items-center gap-4 border border-white/10"
              >
                <img
                  src={bite.image}
                  alt={bite.name}
                  className="w-20 h-20 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-display text-base font-bold truncate">{bite.name}</h4>
                  <p className="text-xs text-white/60 line-clamp-1 mb-2">{bite.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-[#C8973E]">
                      {formatNaira(bite.price)}
                    </span>
                    <button
                      onClick={() => {
                        addItem(bite, 1);
                        openCart();
                      }}
                      className="px-3 py-1 rounded-lg bg-[#C8973E] text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Order to Pod</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pod Booking Form */}
      <section className="px-5 py-14 sm:px-8 max-w-3xl mx-auto">
        <div className="bg-[#1F2937] p-8 rounded-3xl border border-white/10">
          <h3 className="font-display text-2xl font-bold mb-1">
            Reserve {selectedPod.name}
          </h3>
          <p className="text-xs text-white/60 mb-6">
            Dedicated station prep and instant waiter connectivity.
          </p>

          {confirmed ? (
            <div className="text-center py-6 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#C8973E] mx-auto" />
              <h4 className="font-display text-xl font-bold">Pod Locked In!</h4>
              <p className="text-xs text-white/70">Reference: {confirmed}</p>
              <button
                onClick={() => setConfirmed(null)}
                className="mt-3 px-6 py-2 rounded-full bg-[#C8973E] text-white text-xs font-bold cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleBookPod} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-white/80 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Alex Morgan"
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

              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1">
                  Session Duration
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => setHours(h)}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg cursor-pointer ${
                        hours === h
                          ? 'bg-[#C8973E] text-white'
                          : 'bg-black/30 text-white/70 hover:bg-black/50'
                      }`}
                    >
                      {h} {h === 1 ? 'Hour' : 'Hours'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-black/40 rounded-xl flex justify-between items-center text-xs font-bold">
                <span>Total for {hours} hr(s)</span>
                <span className="text-base text-[#DABA6E]">{formatNaira(podTotal)}</span>
              </div>

              <button
                type="submit"
                disabled={!guestName || !guestPhone}
                className="w-full py-3.5 rounded-full bg-[#C8973E] hover:bg-[#b5862f] disabled:bg-white/10 text-white font-bold text-xs tracking-wider uppercase transition-colors cursor-pointer shadow-lg"
              >
                Confirm Gaming Session ({formatNaira(podTotal)})
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

