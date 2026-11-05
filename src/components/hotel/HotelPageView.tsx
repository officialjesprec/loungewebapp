import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BedDouble, Sparkles, Check, Key, Coffee, Wifi, CheckCircle2, ArrowRight } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useBooking } from '../../context/BookingContext';
import { IMAGES, HOTEL_ROOMS, formatNaira } from '../../data/mockData';
import type { HotelRoom } from '../../types/hospitality';

export default function HotelPageView() {
  const { navigate } = useNavigation();
  const { addBooking } = useBooking();

  const [selectedRoom, setSelectedRoom] = useState<HotelRoom>(HOTEL_ROOMS[0]);
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [checkInDate, setCheckInDate] = useState('Tomorrow');
  const [nights, setNights] = useState(1);
  const [confirmed, setConfirmed] = useState<string | null>(null);

  const totalCost = selectedRoom.discountRate * nights;

  const handleBookRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestPhone) return;

    const booking = addBooking({
      vertical: 'Hotel',
      guestName,
      guestPhone,
      reference: selectedRoom.name,
      details: `${nights} Night(s) · Keyless Mobile Entry · 15% Stay & Lounge Credit`,
      date: checkInDate,
      amount: totalCost,
      status: 'Confirmed',
    });

    setConfirmed(booking.qrCode);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] pb-24">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <img
          src={IMAGES.heroHotel}
          alt="Boutique Hotel"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-[#1B3A2D]/85" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-3.5 py-1 rounded-full bg-[#C8973E] text-white text-[11px] font-bold tracking-widest uppercase mb-4"
          >
            Boutique Accommodations
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl font-bold leading-tight"
          >
            Luxury Suites &amp; Seamless Stays
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-white/85 max-w-xl mx-auto leading-relaxed"
          >
            Stay where you celebrate. Premium soundproof suites, keyless digital access, and 24/7 in-room dining direct from the Nocturne lounge kitchen.
          </motion.p>
        </div>
      </section>

      {/* Cross-Sell Stay & Dine Perk */}
      <section className="px-5 py-8 sm:px-8 max-w-7xl mx-auto -mt-10 relative z-20">
        <div className="bg-[#C8973E] text-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-white shrink-0" />
            <div>
              <h4 className="font-display text-lg font-bold">Event-to-Stay 15% VIP Discount</h4>
              <p className="text-xs text-white/90">
                All lounge and club patrons receive an exclusive 15% discount on same-night and advance suite bookings.
              </p>
            </div>
          </div>
          <span className="text-xs font-bold uppercase tracking-widest bg-white/20 px-4 py-2 rounded-xl shrink-0">
            Auto-Applied Online
          </span>
        </div>
      </section>

      {/* Suites Showcase */}
      <section className="px-5 py-12 sm:px-8 max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <span className="text-xs tracking-widest uppercase text-[#C8973E] font-bold block mb-1">
            Accommodations
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
            Curated Suites &amp; Lodges
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {HOTEL_ROOMS.map((room) => {
            const isSelected = selectedRoom.id === room.id;
            return (
              <div
                key={room.id}
                className={`bg-white rounded-3xl overflow-hidden border transition-all shadow-xs flex flex-col justify-between ${
                  isSelected ? 'border-[#1B3A2D] ring-2 ring-[#1B3A2D]/20 shadow-lg' : 'border-[#E8E6E1]'
                }`}
              >
                <div>
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white/95 px-3 py-1 rounded-full text-xs font-bold text-[#1B3A2D] shadow-xs">
                      {room.sqMeters} m² · Up to {room.capacity} Guests
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-display text-2xl font-bold text-[#1A1A1A]">
                        {room.name}
                      </h3>
                      <div className="text-right">
                        <span className="text-xs text-[#7A7A7A] line-through block">
                          {formatNaira(room.nightRate)}
                        </span>
                        <span className="text-base font-bold text-[#1B3A2D]">
                          {formatNaira(room.discountRate)}/night
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-[#7A7A7A] leading-relaxed mb-4">
                      {room.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2 border-t border-[#E8E6E1]">
                      {room.amenities.map((am) => (
                        <span
                          key={am}
                          className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-[#F5F3EE] text-[#4A4A4A] flex items-center gap-1"
                        >
                          <Check className="w-3 h-3 text-[#1B3A2D]" />
                          <span>{am}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => setSelectedRoom(room)}
                    className={`w-full py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#1B3A2D] text-white'
                        : 'bg-[#F5F3EE] hover:bg-[#E8E6E1] text-[#1A1A1A]'
                    }`}
                  >
                    {isSelected ? 'Selected for Booking' : 'Select This Suite'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="px-5 py-12 sm:px-8 max-w-3xl mx-auto">
        <div className="bg-white p-8 rounded-3xl border border-[#E8E6E1] shadow-lg">
          <div className="mb-6">
            <h3 className="font-display text-2xl font-bold text-[#1A1A1A]">
              Book {selectedRoom.name}
            </h3>
            <p className="text-xs text-[#7A7A7A] mt-1">
              Rate includes 15% VIP stay-and-dine discount and keyless mobile check-in.
            </p>
          </div>

          {confirmed ? (
            <div className="text-center py-6 space-y-4">
              <CheckCircle2 className="w-12 h-12 text-[#1B3A2D] mx-auto" />
              <h4 className="font-display text-xl font-bold">Suite Reserved!</h4>
              <p className="text-xs text-[#7A7A7A]">
                Digital Key Code: <strong className="text-[#1B3A2D]">{confirmed}</strong>
              </p>
              <button
                onClick={() => setConfirmed(null)}
                className="px-6 py-2 rounded-full bg-[#1B3A2D] text-white text-xs font-bold"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleBookRoom} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4A4A4A] mb-1">
                    Guest Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Alex Morgan"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#D5D2CC] bg-[#FAFAF7] focus:outline-hidden focus:border-[#1B3A2D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#4A4A4A] mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    placeholder="+234 800 000 0000"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#D5D2CC] bg-[#FAFAF7] focus:outline-hidden focus:border-[#1B3A2D]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4A4A4A] mb-1">
                    Check-in Date
                  </label>
                  <input
                    type="text"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#D5D2CC] bg-[#FAFAF7] focus:outline-hidden focus:border-[#1B3A2D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#4A4A4A] mb-1">
                    Length of Stay
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setNights(n)}
                        className={`flex-1 py-2 rounded-lg text-xs font-bold ${
                          nights === n
                            ? 'bg-[#1B3A2D] text-white'
                            : 'bg-[#F5F3EE] text-[#4A4A4A]'
                        }`}
                      >
                        {n} {n === 1 ? 'Night' : 'Nights'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#F5F3EE] rounded-xl flex justify-between items-center text-xs font-bold">
                <span>Total for {nights} Night(s)</span>
                <span className="text-base text-[#1B3A2D]">{formatNaira(totalCost)}</span>
              </div>

              <button
                type="submit"
                disabled={!guestName || !guestPhone}
                className="w-full py-3.5 rounded-full bg-[#1B3A2D] hover:bg-[#2A5A44] disabled:bg-[#D5D2CC] text-white font-bold text-xs tracking-wider uppercase transition-colors cursor-pointer shadow-md"
              >
                Confirm Suite Booking ({formatNaira(totalCost)})
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

