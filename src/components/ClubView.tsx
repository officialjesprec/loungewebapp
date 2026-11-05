import React, { useState } from 'react';
import { BottleItem, VIPTable } from '../types/hospitality.ts';
import { CLUB_IMAGE, PREORDER_BOTTLES } from '../data/mockData.ts';
import { calculateTableDeposit, calculateCrossSellDiscount, formatNaira } from '../utils/pricingRules.ts';
import { CheckCircle2, Sparkles, QrCode, Shield, Wine, User, Phone, BedDouble, AlertCircle, Clock, MapPin, X } from 'lucide-react';

interface ClubViewProps {
  tables: VIPTable[];
  onBookTable: (
    tableId: string,
    guestName: string,
    phone: string,
    selectedBottles: { name: string; qty: number; price: number }[],
    depositPaid: number,
    includeHotelRoom: boolean
  ) => void;
  onOpenHotelTab: () => void;
}

export const ClubView: React.FC<ClubViewProps> = ({
  tables,
  onBookTable,
  onOpenHotelTab,
}) => {
  const [selectedTableId, setSelectedTableId] = useState<string>('vip-booth-4');
  const [guestName, setGuestName] = useState<string>('John Doe');
  const [guestPhone, setGuestPhone] = useState<string>('+234 802 444 8812');
  const [arrivalTime, setArrivalTime] = useState<string>('22:30');
  const [bottleQuantities, setBottleQuantities] = useState<Record<string, number>>({
    'bot-1': 1, // Dom Pérignon
    'bot-3': 1, // Don Julio 1942
  });
  const [includeLodgeRoom, setIncludeLodgeRoom] = useState<boolean>(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState<boolean>(false);
  const [confirmedPass, setConfirmedPass] = useState<{
    tableName: string;
    guestName: string;
    depositPaid: number;
    qrCode: string;
    bottlesSummary: string[];
    hotelIncluded: boolean;
  } | null>(null);

  const activeTable = tables.find((t) => t.id === selectedTableId) || tables[0];

  const updateBottleQty = (id: string, delta: number) => {
    setBottleQuantities((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  // Calculate preordered bottles total
  const selectedBottlesList = PREORDER_BOTTLES.filter((b) => (bottleQuantities[b.id] || 0) > 0).map((b) => ({
    name: b.name,
    qty: bottleQuantities[b.id] || 0,
    price: b.price,
  }));

  const bottlesTotal = selectedBottlesList.reduce((sum, b) => sum + b.price * b.qty, 0);
  const effectiveMinSpend = Math.max(activeTable.minSpend, bottlesTotal);
  const tableDeposit = calculateTableDeposit(effectiveMinSpend, 0.5);

  const lodgeRoomPricing = calculateCrossSellDiscount(80000, 0.15);
  const finalPayableNow = tableDeposit + (includeLodgeRoom ? lodgeRoomPricing.discounted : 0);

  const handleSimulatePayment = (gateway: 'Paystack' | 'Flutterwave') => {
    const generatedQr = `CRE8-${activeTable.id.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    onBookTable(
      activeTable.id,
      guestName,
      guestPhone,
      selectedBottlesList,
      finalPayableNow,
      includeLodgeRoom
    );
    setConfirmedPass({
      tableName: activeTable.name,
      guestName,
      depositPaid: finalPayableNow,
      qrCode: generatedQr,
      bottlesSummary: selectedBottlesList.map((b) => `${b.qty}x ${b.name}`),
      hotelIncluded: includeLodgeRoom,
    });
    setIsCheckoutModalOpen(false);
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Prominent Physical Problem vs Digital Solution Showcase */}
      <div className="bg-white border border-[#EAE5DC] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-serif text-[#C67D0A] uppercase tracking-wider font-semibold">
            <span>Operational Bottleneck vs Digital Solution · Club Vertical</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#143D2B]">
            Scenario 1: The VIP Table Chaos (The Club)
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] font-serif">
            How our interactive table map, bottle pre-order engine, and 50% deposit eliminate lost Friday night revenue.
          </p>
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
                It is 10:00 PM on a Friday. A high-net-worth client decides they want a VIP section. They try calling your manager, whose phone is ringing off the hook or who is too busy handling operations on the floor to answer. Frustrated by the lack of response, the client takes their entourage—and their <strong className="text-red-700 font-mono-nums">₦1,000,000 budget</strong>—to a competitor&apos;s club. Alternatively, they show up unannounced, causing friction at the door, delays in getting bottles, and a disorganized guest experience.
              </p>
            </div>
            <div className="pt-2 border-t border-red-200/50 text-[11px] text-red-700 font-semibold">
              Cost to Business: Lost ₦1,000,000+ VIP spend & damaged VIP loyalty.
            </div>
          </div>

          {/* Digital Solution */}
          <div className="bg-[#FAF8F5] p-5 rounded-xl border-2 border-[#143D2B]/30 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#143D2B] text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-[#143D2B] shrink-0" />
                <span>The Digital Solution</span>
              </div>
              <p className="text-xs text-[#333333] font-serif leading-relaxed">
                The client opens your branded Web App, navigates to the &apos;Club&apos; section, and views an interactive 3D/2D map of the venue. They see that <strong>VIP Booth 4</strong> is available. They select it, pre-order 3 bottles of premium spirits, and pay a 50% reservation deposit instantly via Paystack/Flutterwave. Your manager receives an instant notification, the bottles are prepped on ice before the client arrives, and security scans their QR code at the door. Zero calls, zero friction, money secured.
              </p>
            </div>
            <div className="pt-2 border-t border-[#143D2B]/20 text-[11px] text-[#143D2B] font-semibold flex items-center justify-between">
              <span>Outcome: 100% VIP booking capture</span>
              <span className="font-mono-nums text-[#C67D0A]">50% Deposit Secured</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Map (Left) + Table Booking & Bottle Cart (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Venue Floor Map */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl border border-[#EAE5DC] p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-xl font-bold text-[#143D2B]">Main Room & Mezzanine Layout</h3>
                <p className="text-xs text-[#555555] font-serif">Click any table or booth to inspect capacity and min spend.</p>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-3 text-xs font-serif">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#143D2B]" />
                  <span>Available</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C67D0A]" />
                  <span>Reserved</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span>Occupied</span>
                </span>
              </div>
            </div>

            {/* Interactive Floor Map Visualization */}
            <div className="relative w-full aspect-[16/10] bg-[#11241A] rounded-xl overflow-hidden border border-[#234A36] p-4 flex flex-col justify-between select-none">
              {/* Architectural Ambient Lighting & Zones */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(224,150,34,0.15),transparent_60%)] pointer-events-none" />

              {/* DJ Stage & LED Wall */}
              <div className="relative z-10 w-full bg-[#1E3E2E] border border-[#2E5E46] py-2 px-4 rounded text-center text-xs text-[#E09622] font-serif uppercase tracking-widest font-semibold flex items-center justify-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#E09622]" />
                <span>DJ Booth & Main Holographic Stage</span>
              </div>

              {/* Central Dance Floor & Surrounding Tables */}
              <div className="relative z-10 grid grid-cols-3 gap-3 my-auto py-4">
                {tables.map((table) => {
                  const isSelected = table.id === selectedTableId;
                  const isAvailable = table.status === 'available';
                  const isReserved = table.status === 'reserved';

                  let statusBg = 'bg-[#143D2B]/80 text-[#FAF8F5] border-[#2A664A] hover:border-[#E09622]';
                  if (isReserved) {
                    statusBg = 'bg-[#C67D0A]/30 text-[#E09622] border-[#C67D0A] cursor-not-allowed';
                  } else if (table.status === 'occupied') {
                    statusBg = 'bg-black/40 text-slate-400 border-slate-700 cursor-not-allowed';
                  }

                  if (isSelected) {
                    statusBg = 'bg-[#143D2B] text-white border-2 border-[#E09622] ring-2 ring-[#E09622]/40 shadow-lg';
                  }

                  return (
                    <button
                      key={table.id}
                      onClick={() => {
                        if (isAvailable || isSelected) {
                          setSelectedTableId(table.id);
                        }
                      }}
                      disabled={!isAvailable && !isSelected}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative group flex flex-col justify-between ${statusBg}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold font-serif">{table.name.split(' (')[0]}</span>
                        {table.popular && (
                          <span className="text-[9px] bg-[#E09622] text-[#143D2B] font-bold px-1 rounded uppercase tracking-tighter">
                            VIP
                          </span>
                        )}
                      </div>

                      <div className="mt-2 text-[11px] font-mono-nums opacity-90">
                        {formatNaira(table.minSpend)}
                      </div>

                      <div className="text-[10px] opacity-70 font-serif flex items-center justify-between mt-1">
                        <span>{table.capacity} Guests</span>
                        <span className="capitalize">{table.status}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Lounge Terrace connector */}
              <div className="relative z-10 w-full bg-[#183023] border border-[#264C37] py-1.5 px-3 rounded text-[11px] text-[#A6C4B5] font-serif flex items-center justify-between">
                <span>Direct Access: Skyline Terrace & Hotel Elevator Mezzanine</span>
                <span className="text-[#E09622]">Covered Valet Entry</span>
              </div>
            </div>

            {/* Selected Table Snapshot */}
            <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#EAE5DC] flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-xs text-[#777777] font-serif">Currently Selected:</div>
                <div className="font-display text-lg font-bold text-[#143D2B]">{activeTable.name}</div>
                <div className="text-xs text-[#555555]">
                  Zone: <strong className="capitalize">{activeTable.zone.replace('_', ' ')}</strong> · Capacity:{' '}
                  <strong>{activeTable.capacity} Persons</strong>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs text-[#777777] font-serif">Minimum Spend Threshold</div>
                <div className="font-display text-xl font-bold text-[#143D2B] font-mono-nums">
                  {formatNaira(activeTable.minSpend)}
                </div>
                <div className="text-[11px] text-[#C67D0A] font-semibold">
                  50% Deposit: {formatNaira(calculateTableDeposit(activeTable.minSpend))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Pre-Order Premium Spirits & Paystack Checkout */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-[#EAE5DC] p-6 shadow-xs space-y-6">
            <div className="space-y-1">
              <h3 className="font-display text-xl font-bold text-[#143D2B] flex items-center gap-2">
                <Wine className="w-5 h-5 text-[#C67D0A]" />
                <span>Pre-Order Bottles on Ice</span>
              </h3>
              <p className="text-xs text-[#555555] font-serif">
                Bottles are prepped in chilled silver ice buckets with crystal stemware before guest arrival.
              </p>
            </div>

            {/* Bottle Selection List */}
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {PREORDER_BOTTLES.map((bottle) => {
                const qty = bottleQuantities[bottle.id] || 0;
                return (
                  <div
                    key={bottle.id}
                    className="p-3 rounded-xl border border-[#EAE5DC] bg-[#FAF8F5] flex items-center justify-between gap-3 hover:border-[#143D2B]/30 transition-colors"
                  >
                    <div className="space-y-0.5 min-w-0">
                      <div className="text-xs font-bold text-[#143D2B] truncate">{bottle.name}</div>
                      <div className="text-[11px] text-[#555555]">
                        {bottle.brand} · <span className="font-mono-nums font-semibold text-[#333333]">{formatNaira(bottle.price)}</span>
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => updateBottleQty(bottle.id, -1)}
                        disabled={qty === 0}
                        className="w-7 h-7 rounded border border-[#EAE5DC] bg-white text-[#333333] disabled:opacity-40 text-xs font-bold flex items-center justify-center cursor-pointer hover:bg-[#FAF8F5]"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-xs font-bold font-mono-nums">{qty}</span>
                      <button
                        onClick={() => updateBottleQty(bottle.id, 1)}
                        className="w-7 h-7 rounded border border-[#143D2B] bg-[#143D2B] text-white text-xs font-bold flex items-center justify-center cursor-pointer hover:bg-[#1E553C]"
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Smart Cross-Sell: Hotel Room Prompt (Automated Event-to-Stay) */}
            <div className="p-4 rounded-xl border-2 border-[#C67D0A]/30 bg-[#FDF9F2] space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#C67D0A] uppercase tracking-wider">
                  <BedDouble className="w-4 h-4 text-[#C67D0A]" />
                  <span>Smart Upsell: Don&apos;t Drive Home Tired</span>
                </div>
                <span className="text-[10px] font-bold bg-[#C67D0A] text-white px-1.5 py-0.5 rounded font-mono-nums">
                  15% VIP OFF
                </span>
              </div>

              <p className="text-xs text-[#555555] font-serif leading-relaxed">
                Add a Standard Lodge Room directly to this table reservation. Walk straight from VIP Booth 4 to clean sheets without touching front-desk paperwork.
              </p>

              <div className="flex items-center justify-between pt-1">
                <div>
                  <span className="text-xs line-through text-[#777777] font-mono-nums">
                    {formatNaira(lodgeRoomPricing.original)}
                  </span>
                  <span className="ml-2 text-sm font-bold text-[#143D2B] font-mono-nums">
                    {formatNaira(lodgeRoomPricing.discounted)}
                  </span>
                </div>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#143D2B]">
                  <input
                    type="checkbox"
                    checked={includeLodgeRoom}
                    onChange={(e) => setIncludeLodgeRoom(e.target.checked)}
                    className="w-4 h-4 accent-[#143D2B] rounded cursor-pointer"
                  />
                  <span>Add Room to Cart</span>
                </label>
              </div>
            </div>

            {/* Guest Details Input */}
            <div className="space-y-3 pt-2 border-t border-[#EAE5DC]">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-serif text-[#777777] uppercase tracking-wider">Guest Name</label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#EAE5DC] bg-[#FAF8F5] focus:outline-none focus:border-[#143D2B]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-serif text-[#777777] uppercase tracking-wider">Phone (SMS Alert)</label>
                  <input
                    type="text"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#EAE5DC] bg-[#FAF8F5] focus:outline-none focus:border-[#143D2B]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-serif text-[#777777] uppercase tracking-wider">Estimated Arrival</label>
                <input
                  type="time"
                  value={arrivalTime}
                  onChange={(e) => setArrivalTime(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#EAE5DC] bg-[#FAF8F5] focus:outline-none focus:border-[#143D2B]"
                />
              </div>
            </div>

            {/* Financial Summary */}
            <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#EAE5DC] space-y-2 text-xs font-serif">
              <div className="flex justify-between text-[#555555]">
                <span>Pre-ordered Bottles Subtotal:</span>
                <span className="font-mono-nums text-[#333333] font-semibold">{formatNaira(bottlesTotal)}</span>
              </div>
              <div className="flex justify-between text-[#555555]">
                <span>Table Min Spend Commitment:</span>
                <span className="font-mono-nums text-[#333333] font-semibold">{formatNaira(effectiveMinSpend)}</span>
              </div>
              {includeLodgeRoom && (
                <div className="flex justify-between text-[#C67D0A] font-semibold">
                  <span>Lodge Room (15% Event-to-Stay):</span>
                  <span className="font-mono-nums">{formatNaira(lodgeRoomPricing.discounted)}</span>
                </div>
              )}
              <div className="border-t border-[#EAE5DC] pt-2 flex justify-between items-center text-sm font-bold text-[#143D2B]">
                <span>50% Deposit Due Now:</span>
                <span className="font-mono-nums text-lg text-[#143D2B]">{formatNaira(finalPayableNow)}</span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => setIsCheckoutModalOpen(true)}
              className="w-full py-3.5 bg-[#143D2B] hover:bg-[#1E553C] text-white font-serif font-semibold text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Shield className="w-4 h-4 text-[#E09622]" />
              <span>Lock VIP Booth & Pay Deposit ({formatNaira(finalPayableNow)})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Paystack / Flutterwave Simulated Checkout Modal */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full border border-[#EAE5DC] overflow-hidden shadow-2xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-[#EAE5DC] pb-4">
              <div>
                <div className="text-[11px] font-serif text-[#C67D0A] uppercase tracking-wider font-semibold">
                  Cre8forte Gateway Integration
                </div>
                <h3 className="font-display text-xl font-bold text-[#143D2B]">Secure Deposit Gateway</h3>
              </div>
              <button
                onClick={() => setIsCheckoutModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#EAE5DC] space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#555555]">Venue Section:</span>
                <strong className="text-[#143D2B]">{activeTable.name}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#555555]">Guest Name:</span>
                <strong className="text-[#333333]">{guestName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#555555]">Pre-ordered Bottles:</span>
                <strong className="text-[#333333] font-mono-nums">{selectedBottlesList.length} Selected</strong>
              </div>
              {includeLodgeRoom && (
                <div className="flex justify-between text-[#C67D0A]">
                  <span>Hotel Lodge Room:</span>
                  <strong className="font-mono-nums">Included (15% Off)</strong>
                </div>
              )}
              <div className="border-t border-[#EAE5DC] pt-2 flex justify-between text-sm font-bold text-[#143D2B]">
                <span>Total Charge:</span>
                <span className="font-mono-nums">{formatNaira(finalPayableNow)}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-xs text-[#777777] font-serif uppercase tracking-wider">Select Gateway Simulation</div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleSimulatePayment('Paystack')}
                  className="p-3 border-2 border-[#143D2B] bg-[#143D2B]/5 hover:bg-[#143D2B]/10 rounded-xl text-left cursor-pointer transition-all"
                >
                  <div className="text-xs font-bold text-[#143D2B]">Pay with Paystack</div>
                  <div className="text-[10px] text-[#555555]">Direct Bank / Card / USSD</div>
                </button>

                <button
                  onClick={() => handleSimulatePayment('Flutterwave')}
                  className="p-3 border-2 border-[#C67D0A] bg-[#C67D0A]/5 hover:bg-[#C67D0A]/10 rounded-xl text-left cursor-pointer transition-all"
                >
                  <div className="text-xs font-bold text-[#C67D0A]">Pay with Flutterwave</div>
                  <div className="text-[10px] text-[#555555]">Naira & Diaspora Cards</div>
                </button>
              </div>
            </div>

            <div className="text-[11px] text-[#777777] text-center font-serif flex items-center justify-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#143D2B]" />
              <span>Simulated encrypted transaction · Instant QR pass issuance</span>
            </div>
          </div>
        </div>
      )}

      {/* Confirmed QR Pass Result Modal */}
      {confirmedPass && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-[#EAE5DC] overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#143D2B]/10 text-[#143D2B] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7 text-[#143D2B]" />
              </div>
              <h3 className="font-display text-2xl font-bold text-[#143D2B]">VIP Table Confirmed!</h3>
              <p className="text-xs text-[#555555] font-serif">
                Manager notified · Bottles placed on ice · QR generated for door scanning
              </p>
            </div>

            {/* Branded Digital Pass */}
            <div className="bg-[#143D2B] text-[#FAF8F5] p-6 rounded-2xl space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/20 pb-3">
                <div>
                  <div className="text-[10px] font-serif tracking-widest text-[#E09622] uppercase">
                    Cre8forte Unified Access
                  </div>
                  <div className="font-display text-lg font-bold">{confirmedPass.tableName}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-white/60">Status</div>
                  <div className="text-xs font-bold text-[#E09622]">50% Deposit Paid</div>
                </div>
              </div>

              {/* QR Mock code */}
              <div className="bg-white p-4 rounded-xl max-w-[180px] mx-auto text-center space-y-2">
                <div className="aspect-square bg-slate-900 rounded-lg p-2 flex items-center justify-center">
                  <QrCode className="w-24 h-24 text-white" />
                </div>
                <div className="text-[10px] font-mono-nums text-slate-800 font-bold tracking-wider">
                  {confirmedPass.qrCode}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-2 text-white/90">
                <div>
                  <span className="text-white/60 text-[10px]">Guest:</span>
                  <div className="font-semibold">{confirmedPass.guestName}</div>
                </div>
                <div>
                  <span className="text-white/60 text-[10px]">Deposit:</span>
                  <div className="font-semibold font-mono-nums">{formatNaira(confirmedPass.depositPaid)}</div>
                </div>
              </div>

              {confirmedPass.hotelIncluded && (
                <div className="p-2.5 rounded bg-white/10 text-xs flex items-center gap-2 text-[#E09622]">
                  <BedDouble className="w-4 h-4 shrink-0" />
                  <span>Standard Lodge Room added to your keyless wallet!</span>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setConfirmedPass(null)}
                className="w-full py-3 bg-[#143D2B] hover:bg-[#1E553C] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Close & View Table Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
