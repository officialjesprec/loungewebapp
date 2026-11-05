import React, { useState } from 'react';
import { EventTicket, GuestProfile } from '../types/hospitality.ts';
import { formatNaira } from '../utils/pricingRules.ts';
import { Ticket, Sparkles, CheckCircle2, ShieldCheck, QrCode, Coins, Gift, ArrowRight, ShieldAlert, Award } from 'lucide-react';

interface TicketsLoyaltyViewProps {
  events: EventTicket[];
  currentGuest: GuestProfile;
  onRedeemPerk: (perkTitle: string, pointsCost: number) => void;
  onPurchaseTicket: (eventTitle: string, tierName: string, price: number, qty: number) => void;
}

export const TicketsLoyaltyView: React.FC<TicketsLoyaltyViewProps> = ({
  events,
  currentGuest,
  onRedeemPerk,
  onPurchaseTicket,
}) => {
  const [selectedTierId, setSelectedTierId] = useState<string>('tier-vip');
  const [ticketQuantity, setTicketQuantity] = useState<number>(2);
  const [recentTicketPass, setRecentTicketPass] = useState<{
    eventTitle: string;
    tierName: string;
    qty: number;
    totalPrice: number;
    qrCode: string;
  } | null>(null);

  const [redeemSuccessMsg, setRedeemSuccessMsg] = useState<string | null>(null);

  const activeEvent = events[0];
  const selectedTier = activeEvent.tiers.find((t) => t.id === selectedTierId) || activeEvent.tiers[0];
  const totalCost = selectedTier.price * ticketQuantity;
  const otaCutSaved = Math.round(totalCost * 0.15); // 15% saved from Eventbrite/OTAs

  const loyaltyPerks = [
    {
      id: 'perk-late-checkout',
      title: '2:00 PM Guaranteed Hotel Late Checkout',
      category: 'Hotel Sanctuary',
      pointsCost: 1500,
      description: 'Sleep in comfortably after a long night at the club. Unlocks keyless late departure.',
    },
    {
      id: 'perk-cocktail-flight',
      title: 'Artisanal Cocktail Tasting Flight (Trio)',
      category: 'Lounge Mixology',
      pointsCost: 2000,
      description: 'Three bespoke miniature creations handcrafted tableside with botanicals & smoked rosemary.',
    },
    {
      id: 'perk-line-bypass',
      title: 'Fast-Track VIP Velvet Rope Bypass',
      category: 'Nightclub Access',
      pointsCost: 3500,
      description: 'Skip physical door queues directly with instant security QR tablet verification.',
    },
    {
      id: 'perk-champagne-bottle',
      title: 'Complimentary Veuve Clicquot Chilled Bottle',
      category: 'Grand Hospitality',
      pointsCost: 5000,
      description: 'Chilled in silver ice pail delivered to your lounge table or VIP club alcove.',
    },
  ];

  const handleBuyTickets = () => {
    onPurchaseTicket(activeEvent.title, selectedTier.name, selectedTier.price, ticketQuantity);
    setRecentTicketPass({
      eventTitle: activeEvent.title,
      tierName: selectedTier.name,
      qty: ticketQuantity,
      totalPrice: totalCost,
      qrCode: `CRE8-TIX-${Math.floor(1000 + Math.random() * 9000)}`,
    });
  };

  const handleRedeem = (perk: (typeof loyaltyPerks)[0]) => {
    if (currentGuest.loyaltyPoints < perk.pointsCost) return;
    onRedeemPerk(perk.title, perk.pointsCost);
    setRedeemSuccessMsg(`Successfully redeemed ${perk.title}! Added to your digital guest wallet.`);
    setTimeout(() => setRedeemSuccessMsg(null), 5000);
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Overview banner */}
      <div className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-serif text-[#C67D0A] uppercase tracking-wider font-semibold">
            <span>Core Ecosystem Features</span>
            <span className="text-[#555555]">·</span>
            <span>Zero-Commission Direct Ticketing & Unified Loyalty</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#143D2B]">
            Own Your Direct Ticketing & Cross-Venue Loyalty Economy
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] font-serif leading-relaxed">
            Eliminate 10%–20% commissions lost to Eventbrite, Tix.africa, and OTAs. Every ticket sold issues tamper-proof QR codes directly to guest wallets, while drink purchases at the lounge earn points redeemable for 2:00 PM hotel late checkout.
          </p>
        </div>

        <div className="shrink-0 bg-white p-4 rounded-xl border border-[#EAE5DC] text-center shadow-xs">
          <div className="text-[11px] font-serif uppercase tracking-widest text-[#777777]">Commission Paid</div>
          <div className="text-2xl font-display font-bold text-[#143D2B] font-mono-nums">0.0%</div>
          <div className="text-[10px] text-[#555555] mt-0.5">100% margin retained by venue</div>
        </div>
      </div>

      {/* Grid: Direct Event Ticketing (Left) + Unified Loyalty Rewards Ledger (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Event Ticketing */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-[#EAE5DC] p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-[#EAE5DC] pb-4">
              <div>
                <span className="text-[10px] font-serif font-bold text-[#C67D0A] uppercase tracking-wider">
                  Upcoming Featured Event
                </span>
                <h3 className="font-display text-xl font-bold text-[#143D2B]">{activeEvent.title}</h3>
                <p className="text-xs text-[#555555] font-serif">{activeEvent.subtitle}</p>
              </div>
              <span className="text-xs font-mono-nums text-[#143D2B] font-semibold bg-[#143D2B]/5 px-2.5 py-1 rounded border border-[#143D2B]/10">
                {activeEvent.date}
              </span>
            </div>

            {/* Ticket Tier Cards */}
            <div className="space-y-3">
              <div className="text-xs font-serif text-[#777777] uppercase tracking-wider">
                Select Ticket Admission Tier
              </div>

              {activeEvent.tiers.map((tier) => {
                const isSelected = tier.id === selectedTierId;
                return (
                  <div
                    key={tier.id}
                    onClick={() => setSelectedTierId(tier.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      isSelected
                        ? 'bg-[#143D2B]/5 border-2 border-[#143D2B] shadow-xs'
                        : 'bg-[#FAF8F5] border-[#EAE5DC] hover:border-[#143D2B]/30'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#143D2B]">{tier.name}</span>
                        <span className="text-[10px] text-[#555555] font-mono-nums">
                          ({tier.remaining} passes left)
                        </span>
                      </div>
                      <p className="text-[11px] text-[#555555] font-serif">{tier.perks}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="font-display text-base font-bold text-[#143D2B] font-mono-nums">
                        {formatNaira(tier.price)}
                      </div>
                      <div className="text-[10px] text-[#777777]">per ticket</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quantity Selector & Commission Comparison */}
            <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#EAE5DC] space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#555555] font-serif">Number of Passes:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setTicketQuantity(Math.max(1, ticketQuantity - 1))}
                    className="w-6 h-6 rounded bg-white border border-[#EAE5DC] flex items-center justify-center font-bold text-xs cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-mono-nums font-bold text-xs">{ticketQuantity}</span>
                  <button
                    onClick={() => setTicketQuantity(ticketQuantity + 1)}
                    className="w-6 h-6 rounded bg-white border border-[#EAE5DC] flex items-center justify-center font-bold text-xs cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Zero Commission Proof callout */}
              <div className="p-3 bg-white rounded-lg border border-[#EAE5DC] space-y-1 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-[#555555]">Eventbrite / OTA Platform Cut:</span>
                  <span className="line-through text-red-600 font-mono-nums font-semibold">
                    {formatNaira(otaCutSaved)} (15%)
                  </span>
                </div>
                <div className="flex justify-between items-center text-[#143D2B] font-bold">
                  <span>Cre8forte Direct Engine Fee:</span>
                  <span className="font-mono-nums">₦0 (Kept 100% In-House)</span>
                </div>
              </div>

              <div className="border-t border-[#EAE5DC] pt-2 flex justify-between items-center text-sm font-bold text-[#143D2B]">
                <span>Total Admission Amount:</span>
                <span className="font-mono-nums text-lg">{formatNaira(totalCost)}</span>
              </div>
            </div>

            <button
              onClick={handleBuyTickets}
              className="w-full py-3.5 bg-[#143D2B] hover:bg-[#1E553C] text-white font-serif font-semibold text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Ticket className="w-4 h-4 text-[#E09622]" />
              <span>Purchase {ticketQuantity} Pass(es) & Issue Instant QR Code</span>
            </button>
          </div>
        </div>

        {/* Right Column: Unified Wallet & Loyalty Rewards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-[#EAE5DC] p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-[#EAE5DC] pb-4">
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-[#C67D0A]" />
                <h3 className="font-display text-lg font-bold text-[#143D2B]">
                  Unified Loyalty Economy
                </h3>
              </div>
              <span className="text-xs bg-[#143D2B]/10 text-[#143D2B] font-bold px-2.5 py-0.5 rounded font-mono-nums">
                {currentGuest.vipTier}
              </span>
            </div>

            {/* Current Balance Card */}
            <div className="p-4 bg-[#143D2B] text-[#FAF8F5] rounded-xl space-y-2">
              <div className="text-[10px] uppercase font-serif tracking-widest text-[#E09622]">
                Active Rewards Balance
              </div>
              <div className="flex items-baseline justify-between">
                <div className="font-display text-3xl font-bold font-mono-nums">
                  {currentGuest.loyaltyPoints.toLocaleString()} <span className="text-sm font-serif">pts</span>
                </div>
                <div className="text-xs text-white/80 font-mono-nums">
                  ~ {formatNaira(currentGuest.loyaltyPoints * 100)} Value
                </div>
              </div>
              <p className="text-[11px] text-white/70 font-serif">
                Earned automatically when purchasing food, bottles, and rooms across our ecosystem.
              </p>
            </div>

            {redeemSuccessMsg && (
              <div className="p-3 rounded-lg bg-[#143D2B]/10 border border-[#143D2B]/20 text-xs text-[#143D2B] font-serif flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#143D2B] shrink-0" />
                <span>{redeemSuccessMsg}</span>
              </div>
            )}

            {/* Redeemable Perks Catalogue */}
            <div className="space-y-3">
              <div className="text-xs font-serif text-[#777777] uppercase tracking-wider">
                Cross-Venue Reward Catalogue
              </div>

              {loyaltyPerks.map((perk) => {
                const canAfford = currentGuest.loyaltyPoints >= perk.pointsCost;
                return (
                  <div
                    key={perk.id}
                    className="p-3.5 rounded-xl border border-[#EAE5DC] bg-[#FAF8F5] flex flex-col justify-between space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] text-[#C67D0A] font-serif uppercase tracking-wider font-semibold">
                          {perk.category}
                        </span>
                        <div className="text-xs font-bold text-[#143D2B]">{perk.title}</div>
                        <p className="text-[11px] text-[#555555] font-serif mt-0.5">{perk.description}</p>
                      </div>

                      <span className="font-mono-nums font-bold text-xs text-[#143D2B] shrink-0">
                        {perk.pointsCost.toLocaleString()} pts
                      </span>
                    </div>

                    <div className="pt-2 border-t border-[#EAE5DC] flex justify-end">
                      <button
                        onClick={() => handleRedeem(perk)}
                        disabled={!canAfford}
                        className="px-3 py-1.5 text-xs font-serif font-semibold rounded-lg transition-colors disabled:opacity-40 bg-[#143D2B] hover:bg-[#1E553C] text-white cursor-pointer"
                      >
                        {canAfford ? 'Redeem Perk' : 'Insufficient Points'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Ticket Pass Modal */}
      {recentTicketPass && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full border border-[#EAE5DC] overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#143D2B]/10 text-[#143D2B] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7 text-[#143D2B]" />
              </div>
              <h3 className="font-display text-2xl font-bold text-[#143D2B]">Ticket Issued!</h3>
              <p className="text-xs text-[#555555] font-serif">
                Zero commissions paid · QR generated for door scanning
              </p>
            </div>

            <div className="bg-[#143D2B] text-[#FAF8F5] p-6 rounded-2xl space-y-4">
              <div className="flex justify-between items-center border-b border-white/20 pb-3">
                <div>
                  <div className="text-[10px] text-[#E09622] uppercase tracking-widest font-serif">
                    Direct Venue Admission
                  </div>
                  <div className="font-display text-lg font-bold">{recentTicketPass.eventTitle}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-white/60">Tier</div>
                  <div className="text-xs font-bold text-[#E09622]">{recentTicketPass.tierName}</div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl max-w-[170px] mx-auto text-center space-y-2">
                <div className="aspect-square bg-slate-900 rounded-lg p-2 flex items-center justify-center">
                  <QrCode className="w-20 h-20 text-white" />
                </div>
                <div className="text-[10px] font-mono-nums text-slate-800 font-bold tracking-wider">
                  {recentTicketPass.qrCode}
                </div>
              </div>

              <div className="text-center text-xs text-white/90">
                Admit: <strong>{recentTicketPass.qty} Guest(s)</strong> · Total: <strong>{formatNaira(recentTicketPass.totalPrice)}</strong>
              </div>
            </div>

            <button
              onClick={() => setRecentTicketPass(null)}
              className="w-full py-3 bg-[#143D2B] hover:bg-[#1E553C] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Done & Add to Active Passes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
