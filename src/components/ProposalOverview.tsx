import React from 'react';
import { NavigationTab } from '../types/hospitality.ts';
import { HERO_IMAGE, CLUB_IMAGE, LOUNGE_IMAGE, HOTEL_IMAGE } from '../data/mockData.ts';
import { ArrowRight, CheckCircle2, AlertCircle, Sparkles, Building2, Utensils, Wine, ShieldCheck, TrendingUp, Clock, CreditCard, QrCode, Ticket } from 'lucide-react';

interface ProposalOverviewProps {
  setActiveTab: (tab: NavigationTab) => void;
}

export const ProposalOverview: React.FC<ProposalOverviewProps> = ({ setActiveTab }) => {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Proposal Presentation */}
      <section className="relative overflow-hidden rounded-2xl border border-[#EAE5DC] bg-white shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[520px]">
          {/* Left Column: Proposal Brief & Authority */}
          <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-xs font-serif text-[#C67D0A] tracking-wider uppercase font-semibold">
                <span>The Cre8forte Network Limited</span>
                <span className="text-[#333333]/30">/</span>
                <span>Project Management & SaaS Development Team</span>
              </div>

              <div className="space-y-3">
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#143D2B] leading-tight text-balance">
                  The Unified Hospitality Ecosystem
                </h1>
                <p className="text-base sm:text-lg text-[#555555] font-serif leading-relaxed">
                  Optimising revenue, eliminating operational bottlenecks, and elevating guest experience for the modern lounge, club, and hotel.
                </p>
              </div>

              <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#EAE5DC] text-xs leading-relaxed text-[#333333] space-y-2">
                <div className="font-semibold text-[#143D2B] text-sm flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#C67D0A]" />
                  Executive Summary
                </div>
                <p>
                  As the hospitality industry evolves, brands that thrive merge physical luxury with digital convenience. Managing a multi-faceted business—hotel, nightclub, and lounge—relies heavily on manual interventions, fragmented systems, and third-party platforms that erode margins.
                </p>
                <p>
                  This proprietary Web Application unifies VIP table bookings, in-venue table QR ordering, event-to-stay automated hotel cross-selling, and unified loyalty into a single nervous system.
                </p>
              </div>
            </div>

            <div className="pt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setActiveTab('club')}
                className="px-6 py-3 bg-[#143D2B] hover:bg-[#1E553C] text-[#FAF8F5] font-serif text-sm font-semibold rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Launch Interactive Experience</span>
                <ArrowRight className="w-4 h-4 text-[#E09622]" />
              </button>

              <button
                onClick={() => setActiveTab('investment')}
                className="px-6 py-3 bg-white hover:bg-[#FAF8F5] text-[#143D2B] border border-[#143D2B]/30 hover:border-[#143D2B] font-serif text-sm font-semibold rounded-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Review Investment Models</span>
                <span className="text-xs text-[#C67D0A] font-mono-nums">₦50k/mo or Buyout</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 relative bg-[#143D2B] min-h-[320px] lg:min-h-full">
            <img
              src={HERO_IMAGE}
              alt="Luxury modern unified hospitality venue terrace with rooftop lounge and nightclub ambiance"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex flex-col justify-end p-6 text-white">
              <div className="text-xs uppercase tracking-widest text-[#E09622] font-serif">Unified Tri-Pillar Architecture</div>
              <div className="font-display text-xl font-bold">Lounge · Nightclub · Boutique Hotel</div>
              <p className="text-xs text-white/80 mt-1">Single guest account, unified wallet, and instant automated upsell triggers.</p>
            </div>
          </div>
        </div>

        {/* 4-KPI Proof Strip below hero */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-[#EAE5DC] bg-[#FAF8F5] divide-y md:divide-y-0 md:divide-x divide-[#EAE5DC] text-center">
          <div className="p-4 sm:p-5">
            <div className="text-xs text-[#777777] font-serif uppercase tracking-wider">VIP Loss Reduction</div>
            <div className="font-display text-2xl font-bold text-[#143D2B] font-mono-nums mt-0.5">100%</div>
            <div className="text-[11px] text-[#555555] mt-0.5">Zero missed ₦1M+ VIP table calls</div>
          </div>
          <div className="p-4 sm:p-5">
            <div className="text-xs text-[#777777] font-serif uppercase tracking-wider">Lounge Order Wait Time</div>
            <div className="font-display text-2xl font-bold text-[#C67D0A] font-mono-nums mt-0.5">&lt; 3 mins</div>
            <div className="text-[11px] text-[#555555] mt-0.5">Instant QR to Bar & KDS routing</div>
          </div>
          <div className="p-4 sm:p-5">
            <div className="text-xs text-[#777777] font-serif uppercase tracking-wider">Hotel Cross-Sell Lift</div>
            <div className="font-display text-2xl font-bold text-[#143D2B] font-mono-nums mt-0.5">+32%</div>
            <div className="text-[11px] text-[#555555] mt-0.5">Automated Event-to-Stay discount</div>
          </div>
          <div className="p-4 sm:p-5">
            <div className="text-xs text-[#777777] font-serif uppercase tracking-wider">Ticketing Commission</div>
            <div className="font-display text-2xl font-bold text-[#C67D0A] font-mono-nums mt-0.5">0.0%</div>
            <div className="text-[11px] text-[#555555] mt-0.5">Zero cuts to Eventbrite / OTAs</div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Operational Bottlenecks vs The Digital Solution */}
      <section className="space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-serif text-[#C67D0A] uppercase tracking-widest font-semibold">
            Section 2 · Operational Bottlenecks vs Digital Solution
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#143D2B]">
            Where Your Business Is Losing Revenue & How We Eliminate It
          </h2>
          <p className="text-sm text-[#555555] font-serif">
            To understand the ROI of this system, we analyze the exact friction points where money is left on the table every Friday and Saturday night.
          </p>
        </div>

        {/* 3 Detailed Interactive Scenario Cards */}
        <div className="space-y-8">
          {/* Scenario 1: The VIP Table Chaos (The Club) */}
          <div className="bg-white rounded-2xl border border-[#EAE5DC] overflow-hidden shadow-xs hover:border-[#143D2B]/40 transition-colors">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-4 relative min-h-[240px] lg:min-h-full">
                <img
                  src={CLUB_IMAGE}
                  alt="High-end VIP nightclub lounge booth with champagne ice bucket and patrons"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover absolute inset-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-5 text-white">
                  <span className="text-[11px] font-mono-nums bg-[#C67D0A] text-white px-2 py-0.5 rounded w-fit mb-1 font-semibold">
                    SCENARIO 01
                  </span>
                  <div className="font-display text-xl font-bold">The VIP Table Chaos</div>
                  <div className="text-xs text-white/80">Nightclub Pillar · Friction: 10:00 PM Peak</div>
                </div>
              </div>

              <div className="lg:col-span-8 p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Physical Problem */}
                  <div className="bg-[#FAF8F5] p-5 rounded-xl border border-red-200/60 space-y-3">
                    <div className="flex items-center gap-2 text-red-700 text-xs font-semibold uppercase tracking-wider">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>The Physical Problem</span>
                    </div>
                    <p className="text-xs text-[#333333] leading-relaxed">
                      It is 10:00 PM on a Friday. A high-net-worth client decides they want a VIP section. They try calling your manager, whose phone is ringing off the hook or who is too busy handling operations on the floor. Frustrated by the lack of response, the client takes their entourage—and their <strong className="text-red-700 font-mono-nums">₦1,000,000 budget</strong>—to a competitor&apos;s club. Or they arrive unannounced, causing friction at the door and bottle delays.
                    </p>
                  </div>

                  {/* Digital Solution */}
                  <div className="bg-[#FAF8F5] p-5 rounded-xl border border-[#143D2B]/30 space-y-3">
                    <div className="flex items-center gap-2 text-[#143D2B] text-xs font-semibold uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4 text-[#143D2B] shrink-0" />
                      <span>The Digital Solution</span>
                    </div>
                    <p className="text-xs text-[#333333] leading-relaxed">
                      The client opens your branded Web App, views an interactive venue floor map, and selects <strong>VIP Booth 4</strong>. They pre-order 3 bottles of premium spirits and pay a 50% reservation deposit instantly via Paystack/Flutterwave. Your manager receives an instant notification, bottles are prepped on ice before arrival, and security scans their QR code at the door. Zero calls, zero friction.
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-[#EAE5DC]">
                  <div className="text-xs text-[#555555] font-serif">
                    Live prototype features: <strong>Interactive Table Map, Bottle Pre-Order with Ice, 50% Paystack Simulator, Instant Door QR Pass</strong>
                  </div>
                  <button
                    onClick={() => setActiveTab('club')}
                    className="px-4 py-2 bg-[#143D2B] hover:bg-[#1E553C] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Test Club Table Booking</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E09622]" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Scenario 2: The Bottleneck at the Bar (The Lounge) */}
          <div className="bg-white rounded-2xl border border-[#EAE5DC] overflow-hidden shadow-xs hover:border-[#143D2B]/40 transition-colors">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-4 relative min-h-[240px] lg:min-h-full">
                <img
                  src={LOUNGE_IMAGE}
                  alt="Artisanal cocktails and tapas platter on marble table in luxury lounge"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover absolute inset-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-5 text-white">
                  <span className="text-[11px] font-mono-nums bg-[#C67D0A] text-white px-2 py-0.5 rounded w-fit mb-1 font-semibold">
                    SCENARIO 02
                  </span>
                  <div className="font-display text-xl font-bold">The Bottleneck at the Bar</div>
                  <div className="text-xs text-white/80">Lounge Pillar · Friction: 100% Venue Capacity</div>
                </div>
              </div>

              <div className="lg:col-span-8 p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Physical Problem */}
                  <div className="bg-[#FAF8F5] p-5 rounded-xl border border-red-200/60 space-y-3">
                    <div className="flex items-center gap-2 text-red-700 text-xs font-semibold uppercase tracking-wider">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>The Physical Problem</span>
                    </div>
                    <p className="text-xs text-[#333333] leading-relaxed">
                      Your lounge is at 100% capacity. A table of 6 finishes their first round and is ready for more, plus food. Waiters are overwhelmed walking back and forth to the kitchen. After waiting 15 minutes to flag someone down, the mood dies. Instead of ordering a second round and a ₦48,000 platter, they just ask for the bill. You lost a huge upsell because staff can only be in one place.
                    </p>
                  </div>

                  {/* Digital Solution */}
                  <div className="bg-[#FAF8F5] p-5 rounded-xl border border-[#143D2B]/30 space-y-3">
                    <div className="flex items-center gap-2 text-[#143D2B] text-xs font-semibold uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4 text-[#143D2B] shrink-0" />
                      <span>The Digital Solution</span>
                    </div>
                    <p className="text-xs text-[#333333] leading-relaxed">
                      Every table features a sleek, branded QR code. Guests scan it with their phone camera, opening the interactive digital menu. They select their next round of craft cocktails and a food platter, inputting their table number (e.g. <strong>Table 12</strong>). They hit &apos;Order&apos;. The ticket prints instantly at the bar and the kitchen display system (KDS). Waiters simply deliver. Table turnover skyrockets.
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-[#EAE5DC]">
                  <div className="text-xs text-[#555555] font-serif">
                    Live prototype features: <strong>Table QR Code Ordering, Bar/Kitchen Routing, Out-of-Stock Filter, Table Turnover Boost</strong>
                  </div>
                  <button
                    onClick={() => setActiveTab('lounge')}
                    className="px-4 py-2 bg-[#143D2B] hover:bg-[#1E553C] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Try Table QR Ordering</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E09622]" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Scenario 3: The Missed Cross-Sell (The Hotel) */}
          <div className="bg-white rounded-2xl border border-[#EAE5DC] overflow-hidden shadow-xs hover:border-[#143D2B]/40 transition-colors">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-4 relative min-h-[240px] lg:min-h-full">
                <img
                  src={HOTEL_IMAGE}
                  alt="Luxury boutique hotel room suite with warm ambient night lighting"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover absolute inset-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-5 text-white">
                  <span className="text-[11px] font-mono-nums bg-[#C67D0A] text-white px-2 py-0.5 rounded w-fit mb-1 font-semibold">
                    SCENARIO 03
                  </span>
                  <div className="font-display text-xl font-bold">The Missed Cross-Sell</div>
                  <div className="text-xs text-white/80">Hotel Pillar · Automated Event-to-Stay</div>
                </div>
              </div>

              <div className="lg:col-span-8 p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Physical Problem */}
                  <div className="bg-[#FAF8F5] p-5 rounded-xl border border-red-200/60 space-y-3">
                    <div className="flex items-center gap-2 text-red-700 text-xs font-semibold uppercase tracking-wider">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>The Physical Problem</span>
                    </div>
                    <p className="text-xs text-[#333333] leading-relaxed">
                      A customer spends heavily at your club until 3:00 AM. They are exhausted, perhaps slightly intoxicated, and have a long drive home across town. They would gladly pay for a hotel room right now, but walking to the front desk, enquiring about availability, and filling out physical paper forms is too daunting. They drive home, leaving the hotel room unsold.
                    </p>
                  </div>

                  {/* Digital Solution */}
                  <div className="bg-[#FAF8F5] p-5 rounded-xl border border-[#143D2B]/30 space-y-3">
                    <div className="flex items-center gap-2 text-[#143D2B] text-xs font-semibold uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4 text-[#143D2B] shrink-0" />
                      <span>The Digital Solution (Event-to-Stay)</span>
                    </div>
                    <p className="text-xs text-[#333333] leading-relaxed">
                      Our web app utilizes <strong>Smart Upselling</strong>. When that customer checks out on the app to buy their club ticket or VIP table earlier in the week, an intelligent prompt appears: <em>&ldquo;Don&apos;t drive home tired. Add a standard lodge room to this booking for an exclusive 15% VIP discount.&rdquo;</em> With one click, they add the room and receive digital keyless check-in.
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-[#EAE5DC]">
                  <div className="text-xs text-[#555555] font-serif">
                    Live prototype features: <strong>Smart Upselling Modal, 1-Click Lodge Room Addition, 15% VIP Discount Rule, Keyless Entry QR</strong>
                  </div>
                  <button
                    onClick={() => setActiveTab('hotel')}
                    className="px-4 py-2 bg-[#143D2B] hover:bg-[#1E553C] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>View Hotel & Smart Upsell</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E09622]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Core System Features (The Unified Experience) */}
      <section className="space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-serif text-[#C67D0A] uppercase tracking-widest font-semibold">
            Section 3 · Core System Features
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#143D2B]">
            The Unified Hospitality Experience
          </h2>
          <p className="text-sm text-[#555555] font-serif">
            A cohesive technological ecosystem where data flows uninterrupted across your dining, nightlife, and hospitality divisions.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl border border-[#EAE5DC] space-y-3 hover:border-[#143D2B]/50 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#143D2B]/10 text-[#143D2B] flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-[#143D2B]" />
            </div>
            <h3 className="font-display text-lg font-bold text-[#143D2B]">Unified Wallet & Loyalty</h3>
            <p className="text-xs text-[#555555] leading-relaxed">
              A single account for every guest. Points earned by buying drinks at the lounge can be redeemed for a late 2:00 PM checkout at the hotel. It makes financial sense for guests to spend exclusively at your venues.
            </p>
            <div className="pt-2 text-xs font-serif font-semibold text-[#C67D0A] flex items-center gap-1 cursor-pointer" onClick={() => setActiveTab('profile')}>
              <span>View Guest Ledger & Points</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#EAE5DC] space-y-3 hover:border-[#143D2B]/50 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#C67D0A]/10 text-[#C67D0A] flex items-center justify-center">
              <Ticket className="w-5 h-5 text-[#C67D0A]" />
            </div>
            <h3 className="font-display text-lg font-bold text-[#143D2B]">Zero-Commission Ticketing</h3>
            <p className="text-xs text-[#555555] leading-relaxed">
              Stop paying Eventbrite, Tix.africa, or OTAs 10-20% of your ticket revenue. You own the ticketing engine. Secure tamper-proof QR codes are generated instantly for seamless door scanning.
            </p>
            <div className="pt-2 text-xs font-serif font-semibold text-[#C67D0A] flex items-center gap-1 cursor-pointer" onClick={() => setActiveTab('tickets')}>
              <span>Test Zero-Cut Ticketing</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#EAE5DC] space-y-3 hover:border-[#143D2B]/50 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#143D2B]/10 text-[#143D2B] flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#143D2B]" />
            </div>
            <h3 className="font-display text-lg font-bold text-[#143D2B]">Dynamic CRM & Analytics</h3>
            <p className="text-xs text-[#555555] leading-relaxed">
              Know exactly who your best customers are. The system reveals that &lsquo;John Doe&rsquo; spends ₦500,000/month across the hotel and club. Target him with personalized SMS/email VIP campaigns directly from the admin panel.
            </p>
            <div className="pt-2 text-xs font-serif font-semibold text-[#C67D0A] flex items-center gap-1 cursor-pointer" onClick={() => setActiveTab('admin_crm')}>
              <span>Explore High-Spender CRM</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#EAE5DC] space-y-3 hover:border-[#143D2B]/50 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#C67D0A]/10 text-[#C67D0A] flex items-center justify-center">
              <Utensils className="w-5 h-5 text-[#C67D0A]" />
            </div>
            <h3 className="font-display text-lg font-bold text-[#143D2B]">Digital Menu Management</h3>
            <p className="text-xs text-[#555555] leading-relaxed">
              Eliminate physical reprinting costs. If a specific vintage champagne or steak cut runs out, toggle it &lsquo;off&rsquo; in the admin panel and it vanishes instantly from patron devices. Adjust prices live for special event nights.
            </p>
            <div className="pt-2 text-xs font-serif font-semibold text-[#C67D0A] flex items-center gap-1 cursor-pointer" onClick={() => setActiveTab('admin_crm')}>
              <span>Test Instant Stock Toggles</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </div>
      </section>

      {/* Call to action for Section 4: Investment & Partnership Models */}
      <section className="bg-[#143D2B] rounded-2xl p-8 sm:p-12 text-[#FAF8F5] relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="text-xs uppercase tracking-widest text-[#E09622] font-serif font-semibold">
            Section 4 · Investment & Partnership Models
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold">
            Choose Between Flexible SaaS or Full Enterprise Ownership
          </h2>
          <p className="text-sm text-[#FAF8F5]/80 font-serif leading-relaxed">
            We provide two financial deployment models tailored to cash-flow preferences: Option 1 (Managed SaaS at ₦15,000/mo) or Option 2 (Enterprise Buyout with 0% platform cuts). Use our interactive ROI calculator to model your venue&apos;s savings.
          </p>
          <div className="pt-4 flex flex-wrap gap-4">
            <button
              onClick={() => setActiveTab('investment')}
              className="px-6 py-3 bg-[#E09622] hover:bg-[#C67D0A] text-[#143D2B] font-serif text-sm font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-2"
            >
              <span>Explore Pricing & ROI Simulator</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('admin_crm')}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-serif text-sm font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#E09622]" />
              <span>Open Staff Operations CRM</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
