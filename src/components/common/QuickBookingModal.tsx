import React, { useState } from 'react';
import { X, Calendar, Clock, Users, Wine, CheckCircle2, Sparkles } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { PREORDER_BOTTLES, formatNaira } from '../../data/mockData';
import type { BookingVertical } from '../../types/hospitality';

export default function QuickBookingModal() {
  const { isBookingModalOpen, closeBookingModal, addBooking } = useBooking();

  const [vertical, setVertical] = useState<BookingVertical>('Lounge');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [date, setDate] = useState('Tonight, 8:00 PM');
  const [partySize, setPartySize] = useState(4);
  const [selectedBottles, setSelectedBottles] = useState<{ id: string; name: string; price: number }[]>([]);
  const [confirmedBooking, setConfirmedBooking] = useState<{ id: string; qrCode: string } | null>(null);

  if (!isBookingModalOpen) return null;

  const handleBottleToggle = (bottle: { id: string; name: string; price: number }) => {
    if (selectedBottles.some((b) => b.id === bottle.id)) {
      setSelectedBottles(selectedBottles.filter((b) => b.id !== bottle.id));
    } else {
      setSelectedBottles([...selectedBottles, bottle]);
    }
  };

  const bottleTotal = selectedBottles.reduce((acc, b) => acc + b.price, 0);
  const deposit = vertical === 'Club' ? 300000 : vertical === 'Hotel' ? 72250 : 50000;
  const totalDue = deposit + bottleTotal;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestPhone) return;

    const newBooking = addBooking({
      vertical,
      guestName,
      guestPhone,
      reference: `${vertical} Reservation — Party of ${partySize}`,
      details: `${partySize} Guests · ${date} · ${selectedBottles.length} Pre-ordered bottles`,
      date,
      amount: totalDue,
      status: 'Confirmed',
    });

    setConfirmedBooking({ id: newBooking.id, qrCode: newBooking.qrCode });
  };

  const handleClose = () => {
    setConfirmedBooking(null);
    closeBookingModal();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-[#FAFAF7] rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#E8E6E1]">
        {/* Header */}
        <div className="bg-[#1B3A2D] text-white p-6 relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <p className="text-xs uppercase tracking-widest text-[#DABA6E] font-semibold mb-1">
            VIP Reservation
          </p>
          <h3 className="font-display text-2xl font-bold">
            Reserve Your Experience
          </h3>
          <p className="text-xs text-white/80 mt-1">
            Table, suite, gaming pod, or event reservation with advance bottle service.
          </p>
        </div>

        {confirmedBooking ? (
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h4 className="font-display text-2xl font-bold text-[#1A1A1A]">
                Reservation Confirmed!
              </h4>
              <p className="text-xs text-[#7A7A7A] mt-1">
                Your reservation #{confirmedBooking.id} is locked in. We have sent confirmation details to {guestPhone}.
              </p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-[#E8E6E1] text-center space-y-2">
              <span className="text-[10px] text-[#7A7A7A] uppercase tracking-wider block">
                Digital Pass QR Reference
              </span>
              <span className="font-bold text-sm text-[#1B3A2D] tracking-widest">
                {confirmedBooking.qrCode}
              </span>
              <p className="text-[11px] text-[#7A7A7A]">
                Present this code or your name at the concierge desk upon arrival.
              </p>
            </div>

            <button
              onClick={handleClose}
              className="w-full py-3 rounded-full bg-[#1B3A2D] text-white font-bold text-xs tracking-wider uppercase hover:bg-[#2A5A44] transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Space selector */}
            <div>
              <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                Select Space
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(['Lounge', 'Club', 'Hotel', 'Gaming'] as BookingVertical[]).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setVertical(v)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      vertical === v
                        ? 'bg-[#1B3A2D] text-white shadow-xs'
                        : 'bg-white border border-[#E8E6E1] text-[#4A4A4A] hover:border-[#1B3A2D]'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Guest info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#4A4A4A] mb-1">
                  Guest Name *
                </label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
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

            {/* Date & Party size */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#4A4A4A] mb-1">
                  Preferred Date &amp; Time
                </label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="Tonight, 8:00 PM"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#D5D2CC] bg-white focus:outline-hidden focus:border-[#1B3A2D]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#4A4A4A] mb-1">
                  Number of Guests
                </label>
                <div className="flex items-center gap-2">
                  {[2, 4, 6, 8, 10].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setPartySize(num)}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        partySize === num
                          ? 'bg-[#C8973E] text-white'
                          : 'bg-white border border-[#E8E6E1] text-[#4A4A4A]'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Optional Pre-order bottles */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[11px] font-semibold text-[#4A4A4A]">
                  Pre-order Bottles on Ice (Optional)
                </label>
                <span className="text-[10px] text-[#C8973E] font-bold">
                  {selectedBottles.length} selected
                </span>
              </div>
              <div className="max-h-32 overflow-y-auto space-y-1.5 border border-[#E8E6E1] rounded-xl p-2 bg-white">
                {PREORDER_BOTTLES.slice(0, 4).map((bot) => {
                  const isChecked = selectedBottles.some((b) => b.id === bot.id);
                  return (
                    <button
                      key={bot.id}
                      type="button"
                      onClick={() => handleBottleToggle(bot)}
                      className={`w-full px-3 py-1.5 rounded-lg text-xs flex justify-between items-center transition-colors cursor-pointer ${
                        isChecked ? 'bg-[#1B3A2D]/10 font-bold text-[#1B3A2D]' : 'hover:bg-[#F5F3EE] text-[#4A4A4A]'
                      }`}
                    >
                      <span>{bot.name}</span>
                      <span>{formatNaira(bot.price)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Deposit & Total */}
            <div className="p-4 bg-white rounded-xl border border-[#E8E6E1] space-y-1 text-xs">
              <div className="flex justify-between text-[#7A7A7A]">
                <span>Reservation Deposit</span>
                <span>{formatNaira(deposit)}</span>
              </div>
              {bottleTotal > 0 && (
                <div className="flex justify-between text-[#7A7A7A]">
                  <span>Pre-ordered Bottles</span>
                  <span>{formatNaira(bottleTotal)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-sm text-[#1A1A1A] pt-1 border-t border-[#E8E6E1]">
                <span>Total Commitment</span>
                <span className="text-[#1B3A2D]">{formatNaira(totalDue)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={!guestName || !guestPhone}
              className="w-full py-3.5 rounded-full bg-[#1B3A2D] hover:bg-[#2A5A44] disabled:bg-[#D5D2CC] text-white font-bold text-xs tracking-wider uppercase transition-colors cursor-pointer shadow-md"
            >
              Confirm Reservation &amp; Generate Pass
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

