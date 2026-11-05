import React, { useState } from 'react';
import { HotelRoom } from '../types/hospitality.ts';
import { HOTEL_IMAGE } from '../data/mockData.ts';
import { calculateCrossSellDiscount, formatNaira } from '../utils/pricingRules.ts';
import { BedDouble, Sparkles, CheckCircle2, Shield, QrCode, KeyRound, Clock, ArrowRight, Zap, Coffee, Wifi, Star, AlertCircle } from 'lucide-react';

interface HotelViewProps {
  rooms: HotelRoom[];
  onBookRoom: (roomId: string, checkInDate: string, checkOutDate: string, guestName: string, isVipRate: boolean) => void;
  onOpenClubTab: () => void;
}

export const HotelView: React.FC<HotelViewProps> = ({
  rooms,
  onBookRoom,
  onOpenClubTab,
}) => {
  const [selectedRoomId, setSelectedRoomId] = useState<string>('room-std-lodge');
  const [checkInDate, setCheckInDate] = useState<string>('2026-11-04');
  const [checkOutDate, setCheckOutDate] = useState<string>('2026-11-05');
  const [guestName, setGuestName] = useState<string>('John Doe');
  const [applyVipDiscount, setApplyVipDiscount] = useState<boolean>(true);
  const [activePromptModal, setActivePromptModal] = useState<boolean>(false);
  const [confirmedReservation, setConfirmedReservation] = useState<{
    roomName: string;
    roomNumber: string;
    qrPass: string;
    finalPrice: number;
    dates: string;
  } | null>(null);

  const selectedRoom = rooms.find((r) => r.id === selectedRoomId) || rooms[0];
  const pricing = calculateCrossSellDiscount(selectedRoom.nightRate, applyVipDiscount ? 0.15 : 0);

  const handleConfirmRoomBooking = () => {
    onBookRoom(selectedRoom.id, checkInDate, checkOutDate, guestName, applyVipDiscount);
    setConfirmedReservation({
      roomName: selectedRoom.name,
      roomNumber: `Room 30${Math.floor(1 + Math.random() * 8)}`,
      qrPass: `CRE8-HOTEL-KEY-${Math.floor(1000 + Math.random() * 9000)}`,
      finalPrice: pricing.discounted,
      dates: `${checkInDate} to ${checkOutDate}`,
    });
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Prominent Physical Problem vs Digital Solution Showcase */}
      <div className="bg-white border border-[#EAE5DC] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-serif text-[#C67D0A] uppercase tracking-wider font-semibold">
              <span>Operational Bottleneck vs Digital Solution · Hotel Vertical</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#143D2B]">
              Scenario 3: The Missed Cross-Sell (The Hotel)
            </h2>
            <p className="text-xs sm:text-sm text-[#555555] font-serif">
              Automated Event-to-Stay upselling: monetizing unsold rooms by eliminating front-desk friction for late-night guests.
            </p>
          </div>

          <button
            onClick={() => setActivePromptModal(true)}
            className="shrink-0 px-5 py-2.5 bg-[#C67D0A] hover:bg-[#9A6006] text-white text-xs font-serif font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Zap className="w-4 h-4 text-white" />
            <span>Simulate Checkout Upsell Modal</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Physical Problem */}
          <div className="bg-[#FAF8F5] p-5 rounded-xl border border-red-200/80 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-red-700 text-xs font-bold uppercase tracking-wider">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>The Physical Problem</span>
              </div>
              <p className="text-xs text-[#333333] font-serif leading-relaxed">
                A customer spends heavily at your club until 3:00 AM. They are exhausted, perhaps slightly intoxicated, and have a long drive home. They would gladly pay for a hotel room right now, but the idea of walking to the front desk, enquiring about availability, and filling out physical forms is too much effort. They drive home.
              </p>
            </div>
            <div className="pt-2 border-t border-red-200/50 text-[11px] text-red-700 font-semibold">
              Cost to Business: Unsold lodge room sitting vacant; guest safety risk.
            </div>
          </div>

          {/* Digital Solution */}
          <div className="bg-[#FAF8F5] p-5 rounded-xl border-2 border-[#143D2B]/30 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#143D2B] text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-[#143D2B] shrink-0" />
                <span>The Digital Solution (Automated Event-to-Stay)</span>
              </div>
              <p className="text-xs text-[#333333] font-serif leading-relaxed">
                Our web app utilizes <strong>Smart Upselling</strong>. When that same customer is checking out on the app to buy their club ticket or VIP table earlier in the week, a prompt appears: <em>&ldquo;Don&apos;t drive home tired. Add a standard lodge room to this booking for an exclusive 15% VIP discount.&rdquo;</em> With one click, they add the room to their cart and check out. You have just sold a hotel room that would have otherwise sat empty, leveraging the club&apos;s traffic.
              </p>
            </div>
            <div className="pt-2 border-t border-[#143D2B]/20 text-[11px] text-[#143D2B] font-semibold flex items-center justify-between">
              <span>Outcome: +34% Occupancy Conversion</span>
              <span className="font-mono-nums text-[#C67D0A]">1-Click Keyless Check-in</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Room Showcase & Booking Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Room Cards */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-1">
            <h3 className="font-display text-xl font-bold text-[#143D2B]">Boutique Sanctuary Suites</h3>
            <p className="text-xs text-[#555555] font-serif">
              Direct elevator clearance connecting the nightlife mezzanine to private guest suites.
            </p>
          </div>

          <div className="space-y-4">
            {rooms.map((room) => {
              const isSelected = room.id === selectedRoomId;
              const roomPricing = calculateCrossSellDiscount(room.nightRate, 0.15);

              return (
                <div
                  key={room.id}
                  onClick={() => setSelectedRoomId(room.id)}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-white border-2 border-[#143D2B] ring-2 ring-[#143D2B]/10 shadow-md'
                      : 'bg-white border-[#EAE5DC] hover:border-[#143D2B]/30 shadow-xs'
                  }`}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                    <div className="sm:col-span-8 space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-display text-lg font-bold text-[#143D2B]">{room.name}</h4>
                        {room.type === 'standard_lodge' && (
                          <span className="text-[10px] bg-[#C67D0A] text-white font-bold px-2 py-0.5 rounded uppercase">
                            Best for Post-Party
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-[#555555] font-serif leading-relaxed">
                        {room.description}
                      </p>

                      {/* Amenities */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {room.amenities.map((amenity, i) => (
                          <span
                            key={i}
                            className="text-[10px] text-[#143D2B] bg-[#143D2B]/5 px-2 py-0.5 rounded border border-[#143D2B]/10 font-serif"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="sm:col-span-4 flex flex-col justify-between items-start sm:items-end border-t sm:border-t-0 sm:border-l border-[#EAE5DC] pt-3 sm:pt-0 sm:pl-4">
                      <div className="text-left sm:text-right">
                        <div className="text-[10px] text-[#777777] font-serif">Standard Rate</div>
                        <div className="text-xs line-through text-[#777777] font-mono-nums">
                          {formatNaira(roomPricing.original)}
                        </div>
                        <div className="text-[10px] text-[#C67D0A] font-semibold mt-1">Club Patron 15% VIP</div>
                        <div className="font-display text-xl font-bold text-[#143D2B] font-mono-nums">
                          {formatNaira(roomPricing.discounted)}
                        </div>
                        <div className="text-[10px] text-[#777777]">per night / incl. taxes</div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRoomId(room.id);
                        }}
                        className={`mt-3 w-full py-2 text-xs font-serif font-semibold rounded-lg transition-colors ${
                          isSelected
                            ? 'bg-[#143D2B] text-white'
                            : 'bg-[#FAF8F5] text-[#143D2B] border border-[#143D2B]/30 hover:bg-[#143D2B] hover:text-white'
                        }`}
                      >
                        {isSelected ? 'Selected' : 'Select Room'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Direct Room Booking & Keyless Digital Access Engine */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-[#EAE5DC] p-6 shadow-xs space-y-6">
            <div className="space-y-1">
              <h3 className="font-display text-xl font-bold text-[#143D2B] flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-[#C67D0A]" />
                <span>Express Keyless Reservation</span>
              </h3>
              <p className="text-xs text-[#555555] font-serif">
                Zero front-desk queues. Check in straight from your smartphone elevator QR code.
              </p>
            </div>

            <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#EAE5DC] space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#555555]">Selected Sanctuary:</span>
                <strong className="text-[#143D2B]">{selectedRoom.name}</strong>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#EAE5DC]">
                <div>
                  <label className="text-[10px] font-serif text-[#777777] uppercase tracking-wider">Check-in</label>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded border border-[#EAE5DC] bg-white font-mono-nums"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-serif text-[#777777] uppercase tracking-wider">Check-out</label>
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded border border-[#EAE5DC] bg-white font-mono-nums"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-serif text-[#777777] uppercase tracking-wider">Guest Name</label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs rounded border border-[#EAE5DC] bg-white"
                />
              </div>

              {/* VIP Cross-Sell Switcher */}
              <div className="pt-2 border-t border-[#EAE5DC] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#143D2B]">Patron Cross-Sell Discount</div>
                  <div className="text-[11px] text-[#555555]">15% off for Club or Lounge guests</div>
                </div>
                <input
                  type="checkbox"
                  checked={applyVipDiscount}
                  onChange={(e) => setApplyVipDiscount(e.target.checked)}
                  className="w-4 h-4 accent-[#143D2B] rounded cursor-pointer"
                />
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#EAE5DC] space-y-2 text-xs font-serif">
              <div className="flex justify-between text-[#555555]">
                <span>Room Standard Rate:</span>
                <span className="font-mono-nums text-[#333333] font-semibold">{formatNaira(pricing.original)}</span>
              </div>
              {applyVipDiscount && (
                <div className="flex justify-between text-[#C67D0A] font-semibold">
                  <span>Smart Cross-Sell Savings (15%):</span>
                  <span className="font-mono-nums">-{formatNaira(pricing.savings)}</span>
                </div>
              )}
              <div className="border-t border-[#EAE5DC] pt-2 flex justify-between items-center text-sm font-bold text-[#143D2B]">
                <span>Total Due for Stay:</span>
                <span className="font-mono-nums text-lg text-[#143D2B]">{formatNaira(pricing.discounted)}</span>
              </div>
            </div>

            <button
              onClick={handleConfirmRoomBooking}
              className="w-full py-3.5 bg-[#143D2B] hover:bg-[#1E553C] text-white font-serif font-semibold text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <BedDouble className="w-4 h-4 text-[#E09622]" />
              <span>Confirm Stay & Generate Digital Room Key</span>
            </button>
          </div>
        </div>
      </div>

      {/* Simulated Automated Event-to-Stay Prompt Modal */}
      {activePromptModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full border border-[#EAE5DC] overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="space-y-2 text-center">
              <span className="text-[10px] font-bold tracking-widest bg-[#C67D0A] text-white px-2 py-0.5 rounded uppercase">
                Automated Event-to-Stay Prompt
              </span>
              <h3 className="font-display text-2xl font-bold text-[#143D2B]">
                Don&apos;t Drive Home Tired Tonight
              </h3>
              <p className="text-xs text-[#555555] font-serif leading-relaxed">
                You are booking VIP Nightclub access. Step straight into luxury sheets at 3:00 AM instead of braving midnight traffic.
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#EAE5DC] space-y-3">
              <div className="flex items-start gap-3">
                <img
                  src={HOTEL_IMAGE}
                  alt="Standard lodge room"
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[#143D2B]">The Standard Lodge Room</div>
                  <div className="text-[11px] text-[#555555]">Keyless elevator access · Soundproof</div>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-xs line-through text-[#777777] font-mono-nums">₦80,000</span>
                    <span className="text-sm font-bold text-[#143D2B] font-mono-nums">₦68,000</span>
                    <span className="text-[10px] bg-[#143D2B] text-white px-1.5 rounded font-mono-nums">Save 15%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setSelectedRoomId('room-std-lodge');
                  setApplyVipDiscount(true);
                  setActivePromptModal(false);
                }}
                className="w-full py-3 bg-[#143D2B] hover:bg-[#1E553C] text-white text-xs font-serif font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Add Lodge Room to My Stay (₦68,000)</span>
                <ArrowRight className="w-4 h-4 text-[#E09622]" />
              </button>

              <button
                onClick={() => setActivePromptModal(false)}
                className="w-full py-2.5 text-xs text-[#777777] hover:text-[#333333] font-serif cursor-pointer"
              >
                No thanks, I will drive home late
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmed Keyless Stay Pass Modal */}
      {confirmedReservation && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full border border-[#EAE5DC] overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#143D2B]/10 text-[#143D2B] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7 text-[#143D2B]" />
              </div>
              <h3 className="font-display text-2xl font-bold text-[#143D2B]">Digital Room Key Issued!</h3>
              <p className="text-xs text-[#555555] font-serif">
                Front desk notified · Keyless elevator access active
              </p>
            </div>

            <div className="bg-[#143D2B] text-[#FAF8F5] p-6 rounded-2xl space-y-4">
              <div className="flex justify-between items-center border-b border-white/20 pb-3">
                <div>
                  <div className="text-[10px] text-[#E09622] uppercase tracking-widest font-serif">
                    Cre8forte Keyless Pass
                  </div>
                  <div className="font-display text-lg font-bold">{confirmedReservation.roomName}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-white/60">Assigned</div>
                  <div className="text-xs font-bold text-[#E09622]">{confirmedReservation.roomNumber}</div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl max-w-[170px] mx-auto text-center space-y-2">
                <div className="aspect-square bg-slate-900 rounded-lg p-2 flex items-center justify-center">
                  <QrCode className="w-20 h-20 text-white" />
                </div>
                <div className="text-[10px] font-mono-nums text-slate-800 font-bold tracking-wider">
                  {confirmedReservation.qrPass}
                </div>
              </div>

              <div className="text-center text-xs text-white/80">
                Hold phone to elevator reader or room lock for instant NFC / QR entry.
              </div>
            </div>

            <button
              onClick={() => setConfirmedReservation(null)}
              className="w-full py-3 bg-[#143D2B] hover:bg-[#1E553C] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Done & Add to Guest Profile Wallet
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
