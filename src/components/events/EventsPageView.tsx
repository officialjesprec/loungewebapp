import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, Ticket, Sparkles, CheckCircle2 } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { IMAGES, EVENTS, formatNaira } from '../../data/mockData';
import type { EventVibe, EventItem } from '../../types/hospitality';

export default function EventsPageView() {
  const { addBooking } = useBooking();

  const [activeVibe, setActiveVibe] = useState<string>('all');
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [selectedTierId, setSelectedTierId] = useState<string>('');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [confirmed, setConfirmed] = useState<string | null>(null);

  const vibes: { id: string; label: string }[] = [
    { id: 'all', label: 'All Experiences' },
    { id: 'nightlife', label: 'Club & DJs' },
    { id: 'tasting', label: 'Wine & Jazz' },
    { id: 'gaming', label: 'Tournaments' },
    { id: 'lifestyle', label: 'Masterclasses & Brunch' },
  ];

  const filteredEvents = activeVibe === 'all'
    ? EVENTS
    : EVENTS.filter((e) => e.vibe === activeVibe);

  const handleOpenReserve = (event: EventItem) => {
    setSelectedEvent(event);
    setSelectedTierId(event.tiers[0]?.id || '');
    setConfirmed(null);
  };

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent || !guestName || !guestPhone) return;

    const tier = selectedEvent.tiers.find((t) => t.id === selectedTierId) || selectedEvent.tiers[0];
    const booking = addBooking({
      vertical: 'Events',
      guestName,
      guestPhone,
      reference: `${selectedEvent.title} — ${tier.name}`,
      details: `${selectedEvent.date} · ${tier.perks}`,
      date: selectedEvent.date,
      amount: tier.price,
      status: 'Confirmed',
    });

    setConfirmed(booking.qrCode);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] pb-24">
      {/* Hero */}
      <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden">
        <img
          src={IMAGES.heroEvents}
          alt="Lifestyle Events"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-[#1B3A2D]/85" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-3.5 py-1 rounded-full bg-[#C8973E] text-white text-[11px] font-bold tracking-widest uppercase mb-4"
          >
            Social Calendar
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl font-bold leading-tight"
          >
            Curated Lifestyle Events
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-white/85 max-w-xl mx-auto leading-relaxed"
          >
            Intimate acoustic dinners, guest DJ showcases, masterclasses, and Sunday rooftop brunches designed for curious minds.
          </motion.p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="px-5 py-8 sm:px-8 max-w-7xl mx-auto sticky top-18 z-30 bg-[#FAFAF7]/95 backdrop-blur-md">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {vibes.map((v) => (
            <button
              key={v.id}
              onClick={() => setActiveVibe(v.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeVibe === v.id
                  ? 'bg-[#1B3A2D] text-white shadow-xs'
                  : 'bg-white border border-[#E8E6E1] text-[#4A4A4A] hover:border-[#1B3A2D]'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      </section>

      {/* Events Grid */}
      <section className="px-5 py-6 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#E8E6E1] hover:border-[#C8973E] transition-all flex flex-col justify-between shadow-xs hover:shadow-lg"
            >
              <div>
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
                    {evt.vibe}
                  </div>
                  {evt.isLive && (
                    <div className="absolute top-4 right-4 bg-emerald-600 px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      <span>This Weekend</span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <span className="text-xs font-semibold text-[#C8973E] block mb-1">
                    {evt.hostOrDj}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-[#1A1A1A] mb-2">
                    {evt.title}
                  </h3>
                  <p className="text-xs text-[#7A7A7A] leading-relaxed mb-4">
                    {evt.subtitle}
                  </p>

                  <div className="space-y-1.5 pt-3 border-t border-[#E8E6E1] text-xs text-[#4A4A4A]">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#C8973E]" />
                      <span>{evt.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#C8973E]" />
                      <span>{evt.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#C8973E]" />
                      <span className="capitalize">{evt.venue} Space</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-[#E8E6E1] mt-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-[#7A7A7A] block">From</span>
                  <span className="text-base font-bold text-[#1B3A2D]">
                    {formatNaira(evt.tiers[0]?.price || 15000)}
                  </span>
                </div>

                <button
                  onClick={() => handleOpenReserve(evt)}
                  className="px-5 py-2.5 rounded-full bg-[#1B3A2D] text-white hover:bg-[#2A5A44] text-xs font-bold tracking-wide transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Ticket className="w-3.5 h-3.5" />
                  <span>Reserve Spot</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reservation Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAFAF7] rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#E8E6E1]">
            <div className="bg-[#1B3A2D] text-white p-6 relative">
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white"
              >
                ✕
              </button>
              <span className="text-[10px] text-[#DABA6E] uppercase font-bold tracking-widest block mb-1">
                Event Pass &amp; Table
              </span>
              <h3 className="font-display text-xl font-bold">{selectedEvent.title}</h3>
              <p className="text-xs text-white/80 mt-1">{selectedEvent.date} · {selectedEvent.time}</p>
            </div>

            {confirmed ? (
              <div className="p-8 text-center space-y-4">
                <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
                <h4 className="font-display text-2xl font-bold">Pass Confirmed!</h4>
                <p className="text-xs text-[#7A7A7A]">
                  Present your digital ticket code at the entrance:
                </p>
                <div className="p-3 bg-[#F5F3EE] rounded-xl font-bold text-sm tracking-widest text-[#1B3A2D]">
                  {confirmed}
                </div>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="w-full py-2.5 rounded-full bg-[#1B3A2D] text-white font-bold text-xs"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleConfirmReservation} className="p-6 space-y-5">
                <div>
                  <label className="block text-xs font-bold text-[#1A1A1A] mb-2">
                    Select Access Tier
                  </label>
                  <div className="space-y-2">
                    {selectedEvent.tiers.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setSelectedTierId(t.id)}
                        className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          selectedTierId === t.id
                            ? 'border-[#1B3A2D] bg-[#1B3A2D]/5 font-bold'
                            : 'border-[#E8E6E1] hover:border-[#1B3A2D]'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-bold">{t.name}</span>
                          <span className="text-xs font-bold text-[#1B3A2D]">
                            {formatNaira(t.price)}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#7A7A7A]">{t.perks}</p>
                        <span className="text-[10px] text-[#C8973E] font-semibold mt-1 block">
                          {t.remaining} passes remaining
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#4A4A4A] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="Alex Morgan"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#D5D2CC] bg-white focus:outline-hidden focus:border-[#1B3A2D]"
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
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#D5D2CC] bg-white focus:outline-hidden focus:border-[#1B3A2D]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!guestName || !guestPhone}
                  className="w-full py-3.5 rounded-full bg-[#1B3A2D] hover:bg-[#2A5A44] disabled:bg-[#D5D2CC] text-white font-bold text-xs tracking-wider uppercase transition-colors cursor-pointer shadow-md"
                >
                  Confirm Event Reservation
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

