import React, { useState } from 'react';
import { calculateSaaSCost, calculateEnterpriseCost, formatNaira } from '../utils/pricingRules.ts';
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Shield,
  Layers,
  Server,
  Calculator,
  Calendar,
  Send,
  Building,
  DollarSign,
  TrendingUp,
} from 'lucide-react';

export const InvestmentModelsView: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<'saas' | 'enterprise'>('enterprise');
  const [monthlyTurnover, setMonthlyTurnover] = useState<number>(6000000); // ₦6M/month typical venue
  const [timelineMonths, setTimelineMonths] = useState<number>(12); // 12 months

  // Form submission state
  const [venueName, setVenueName] = useState<string>('The Obsidian Lounge & Hotel');
  const [contactName, setContactName] = useState<string>('Babatunde Alabi');
  const [contactPhone, setContactPhone] = useState<string>('+234 803 777 2201');
  const [contactEmail, setContactEmail] = useState<string>('management@theobsidian.ng');
  const [inquirySubmitted, setInquirySubmitted] = useState<boolean>(false);

  const saasCalc = calculateSaaSCost(monthlyTurnover, timelineMonths);
  const enterpriseCalc = calculateEnterpriseCost(timelineMonths);

  const enterpriseDifference = saasCalc.totalCost - enterpriseCalc.totalCost;
  const isEnterpriseMoreCostEffective = enterpriseDifference > 0;

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Header presentation */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="text-xs font-serif text-[#C67D0A] uppercase tracking-widest font-semibold">
          Section 4 · Investment & Partnership Models
        </div>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#143D2B]">
          Tailored Deployment & Commercial Structures
        </h2>
        <p className="text-sm sm:text-base text-[#555555] font-serif leading-relaxed">
          We understand that different hospitality brands have distinct cash-flow preferences and operational capacities. The Cre8forte Network Limited offers two robust financial models for seamless deployment.
        </p>
      </div>

      {/* Side-by-Side Model Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* Option 1: SaaS Subscription Model */}
        <div
          onClick={() => setSelectedModel('saas')}
          className={`bg-white rounded-2xl border p-8 space-y-6 flex flex-col justify-between shadow-xs cursor-pointer transition-all ${
            selectedModel === 'saas'
              ? 'border-2 border-[#143D2B] ring-2 ring-[#143D2B]/10 shadow-md'
              : 'border-[#EAE5DC] hover:border-[#143D2B]/30'
          }`}
        >
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono-nums text-[#777777] uppercase tracking-widest font-semibold">
                  OPTION 01 · MANAGED CLOUD
                </span>
                <h3 className="font-display text-2xl font-bold text-[#143D2B]">The SaaS Subscription Model</h3>
                <div className="text-xs text-[#C67D0A] font-serif font-semibold">
                  Fully Managed by The Cre8forte Network Limited
                </div>
              </div>
              <span className="text-xs bg-[#FAF8F5] text-[#143D2B] border border-[#EAE5DC] font-semibold px-2.5 py-1 rounded">
                Zero Tech Overhead
              </span>
            </div>

            <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#EAE5DC] text-xs text-[#555555] font-serif leading-relaxed">
              <strong>Best for:</strong> Minimizing upfront capital expenditure and offloading all server management, cloud security, and database maintenance to our senior engineering team.
            </div>

            <div className="space-y-3 pt-2 text-xs font-serif text-[#333333]">
              <div className="font-bold text-[#143D2B] text-sm">Commercial Structure:</div>
              <ul className="space-y-2">
                <li className="flex items-center justify-between pb-1.5 border-b border-[#EAE5DC]">
                  <span>Setup & Deployment Fee:</span>
                  <span className="font-mono-nums font-bold text-[#143D2B]">₦50,000 (One-time)</span>
                </li>
                <li className="flex items-center justify-between pb-1.5 border-b border-[#EAE5DC]">
                  <span>Monthly Platform Subscription:</span>
                  <span className="font-mono-nums font-bold text-[#143D2B]">₦15,000 / month</span>
                </li>
                <li className="flex items-center justify-between pb-1.5 border-b border-[#EAE5DC]">
                  <span>Processing Transaction Fee:</span>
                  <span className="font-mono-nums font-bold text-[#C67D0A]">3.5% on processed transactions</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2 pt-2 text-xs font-serif text-[#555555]">
              <div className="font-bold text-[#143D2B]">Infrastructure & Architecture:</div>
              <p>
                Shared domain routing (e.g. <code>yourbrand.cre8forte.com</code> or connected domain). Payment integrations route through Cre8forte unified gateway with automated automated payouts directly to your corporate accounts.
              </p>
            </div>
          </div>

          <button
            onClick={() => setSelectedModel('saas')}
            className={`w-full py-3 text-xs font-serif font-bold rounded-xl transition-all cursor-pointer ${
              selectedModel === 'saas'
                ? 'bg-[#143D2B] text-white shadow-xs'
                : 'bg-[#FAF8F5] text-[#143D2B] border border-[#143D2B]/30 hover:bg-[#143D2B] hover:text-white'
            }`}
          >
            {selectedModel === 'saas' ? 'Selected for Proposal' : 'Select SaaS Option'}
          </button>
        </div>

        {/* Option 2: Enterprise Ownership Model */}
        <div
          onClick={() => setSelectedModel('enterprise')}
          className={`bg-white rounded-2xl border p-8 space-y-6 flex flex-col justify-between shadow-xs cursor-pointer transition-all ${
            selectedModel === 'enterprise'
              ? 'border-2 border-[#143D2B] ring-2 ring-[#143D2B]/10 shadow-md'
              : 'border-[#EAE5DC] hover:border-[#143D2B]/30'
          }`}
        >
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono-nums text-[#C67D0A] uppercase tracking-widest font-semibold">
                  OPTION 02 · FULL BUYOUT & ASSET
                </span>
                <h3 className="font-display text-2xl font-bold text-[#143D2B]">Enterprise Ownership Model</h3>
                <div className="text-xs text-[#C67D0A] font-serif font-semibold">
                  One-Time Buyout & Zero Revenue Cuts
                </div>
              </div>
              <span className="text-xs bg-[#143D2B] text-white font-semibold px-2.5 py-1 rounded">
                Recommended for Volume
              </span>
            </div>

            <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#EAE5DC] text-xs text-[#555555] font-serif leading-relaxed">
              <strong>Best for:</strong> Total operational independence, brand equity building, and long-term cost savings on high transaction volumes with 0% platform cuts.
            </div>

            <div className="space-y-3 pt-2 text-xs font-serif text-[#333333]">
              <div className="font-bold text-[#143D2B] text-sm">Commercial Structure:</div>
              <ul className="space-y-2">
                <li className="flex items-center justify-between pb-1.5 border-b border-[#EAE5DC]">
                  <span>Enterprise Build & Handover:</span>
                  <span className="font-mono-nums font-bold text-[#143D2B]">₦550,000 (One-time)</span>
                </li>
                <li className="flex items-center justify-between pb-1.5 border-b border-[#EAE5DC]">
                  <span>Milestone Terms:</span>
                  <span className="font-mono-nums text-xs text-[#555555]">40% upfront · 40% beta · 20% launch</span>
                </li>
                <li className="flex items-center justify-between pb-1.5 border-b border-[#EAE5DC]">
                  <span>Monthly Maintenance & SLA:</span>
                  <span className="font-mono-nums font-bold text-[#143D2B]">₦25,000 / month</span>
                </li>
                <li className="flex items-center justify-between pb-1.5 border-b border-[#EAE5DC]">
                  <span>Cre8forte Platform Cuts:</span>
                  <span className="font-mono-nums font-bold text-emerald-800">0.0% (Zero cuts taken)</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2 pt-2 text-xs font-serif text-[#555555]">
              <div className="font-bold text-[#143D2B]">Infrastructure & Architecture:</div>
              <p>
                Deployed on your own dedicated AWS or Google Cloud servers with custom domain (e.g. <code>www.yourbrand.com</code>). Direct Paystack / Flutterwave corporate bank account routing. Your brand owns source code and database.
              </p>
            </div>
          </div>

          <button
            onClick={() => setSelectedModel('enterprise')}
            className={`w-full py-3 text-xs font-serif font-bold rounded-xl transition-all cursor-pointer ${
              selectedModel === 'enterprise'
                ? 'bg-[#143D2B] text-white shadow-xs'
                : 'bg-[#FAF8F5] text-[#143D2B] border border-[#143D2B]/30 hover:bg-[#143D2B] hover:text-white'
            }`}
          >
            {selectedModel === 'enterprise' ? 'Selected for Proposal' : 'Select Enterprise Option'}
          </button>
        </div>
      </div>

      {/* Interactive ROI & Financial Simulator */}
      <section className="bg-white rounded-2xl border border-[#EAE5DC] p-6 sm:p-10 shadow-xs space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#EAE5DC] pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-serif text-[#C67D0A] uppercase tracking-wider font-semibold">
              <Calculator className="w-4 h-4 text-[#C67D0A]" />
              <span>Interactive ROI & Financial Calculator</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-[#143D2B]">
              Compare 12-Month Total Cost of Ownership
            </h3>
          </div>

          {/* Timeframe selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#555555] font-serif">Evaluation Horizon:</span>
            <div className="flex items-center gap-1 bg-[#FAF8F5] p-1 rounded-lg border border-[#EAE5DC]">
              <button
                onClick={() => setTimelineMonths(6)}
                className={`px-3 py-1 text-xs font-serif rounded cursor-pointer ${
                  timelineMonths === 6 ? 'bg-[#143D2B] text-white font-semibold' : 'text-[#555555]'
                }`}
              >
                6 Months
              </button>
              <button
                onClick={() => setTimelineMonths(12)}
                className={`px-3 py-1 text-xs font-serif rounded cursor-pointer ${
                  timelineMonths === 12 ? 'bg-[#143D2B] text-white font-semibold' : 'text-[#555555]'
                }`}
              >
                12 Months
              </button>
              <button
                onClick={() => setTimelineMonths(24)}
                className={`px-3 py-1 text-xs font-serif rounded cursor-pointer ${
                  timelineMonths === 24 ? 'bg-[#143D2B] text-white font-semibold' : 'text-[#555555]'
                }`}
              >
                24 Months
              </button>
            </div>
          </div>
        </div>

        {/* Sliders & Turnover input */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-serif">
                <span className="text-[#555555]">Estimated Venue Monthly Turnover:</span>
                <span className="font-mono-nums font-bold text-sm text-[#143D2B]">{formatNaira(monthlyTurnover)}</span>
              </div>
              <input
                type="range"
                min={1000000}
                max={20000000}
                step={500000}
                value={monthlyTurnover}
                onChange={(e) => setMonthlyTurnover(Number(e.target.value))}
                className="w-full accent-[#143D2B] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#777777] font-mono-nums">
                <span>₦1,000,000</span>
                <span>₦10,000,000</span>
                <span>₦20,000,000+</span>
              </div>
            </div>

            <p className="text-xs text-[#555555] font-serif leading-relaxed">
              Based on total transactions processed through VIP booth deposits, table QR orders, and room bookings over {timelineMonths} months.
            </p>
          </div>

          {/* Result Comparison Boxes */}
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* SaaS Cost Box */}
            <div className="p-5 rounded-xl border border-[#EAE5DC] bg-[#FAF8F5] space-y-3">
              <div className="text-xs font-bold text-[#143D2B] uppercase tracking-wider font-serif">
                Option 1: SaaS Cost
              </div>
              <div className="space-y-1 text-xs text-[#555555]">
                <div className="flex justify-between">
                  <span>Setup:</span>
                  <span className="font-mono-nums">{formatNaira(saasCalc.setup)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Subscription ({timelineMonths} mo):</span>
                  <span className="font-mono-nums">{formatNaira(saasCalc.subscription)}</span>
                </div>
                <div className="flex justify-between text-[#C67D0A] font-semibold">
                  <span>3.5% Platform Fees:</span>
                  <span className="font-mono-nums">{formatNaira(saasCalc.transactionFees)}</span>
                </div>
                <div className="border-t border-[#EAE5DC] pt-2 flex justify-between font-bold text-sm text-[#143D2B]">
                  <span>Total {timelineMonths}-Mo Cost:</span>
                  <span className="font-mono-nums">{formatNaira(saasCalc.totalCost)}</span>
                </div>
              </div>
            </div>

            {/* Enterprise Cost Box */}
            <div className="p-5 rounded-xl border-2 border-[#143D2B] bg-white space-y-3">
              <div className="text-xs font-bold text-[#143D2B] uppercase tracking-wider font-serif">
                Option 2: Enterprise Cost
              </div>
              <div className="space-y-1 text-xs text-[#555555]">
                <div className="flex justify-between">
                  <span>Milestone Buyout:</span>
                  <span className="font-mono-nums">{formatNaira(enterpriseCalc.buyout)}</span>
                </div>
                <div className="flex justify-between">
                  <span>SLA ({timelineMonths} mo):</span>
                  <span className="font-mono-nums">{formatNaira(enterpriseCalc.slaCost)}</span>
                </div>
                <div className="flex justify-between text-emerald-800 font-semibold">
                  <span>Platform Cuts:</span>
                  <span className="font-mono-nums">₦0 (0%)</span>
                </div>
                <div className="border-t border-[#EAE5DC] pt-2 flex justify-between font-bold text-sm text-[#143D2B]">
                  <span>Total {timelineMonths}-Mo Cost:</span>
                  <span className="font-mono-nums">{formatNaira(enterpriseCalc.totalCost)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Insight badge */}
        <div className="p-4 rounded-xl bg-[#143D2B]/5 border border-[#143D2B]/20 text-xs text-[#143D2B] font-serif flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C67D0A] shrink-0" />
            <span>
              {isEnterpriseMoreCostEffective ? (
                <>
                  At <strong className="font-mono-nums">{formatNaira(monthlyTurnover)}/month</strong>, the{' '}
                  <strong>Enterprise Model saves you {formatNaira(enterpriseDifference)}</strong> in platform cuts over{' '}
                  {timelineMonths} months!
                </>
              ) : (
                <>
                  At <strong className="font-mono-nums">{formatNaira(monthlyTurnover)}/month</strong>, the{' '}
                  <strong>SaaS Model offers lower upfront capital expenditure</strong> for your initial rollout.
                </>
              )}
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 5: Development Timeline & Phased Next Steps */}
      <section className="space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-serif text-[#C67D0A] uppercase tracking-widest font-semibold">
            Section 5 · Development Timeline & Next Steps
          </div>
          <h2 className="font-display text-3xl font-bold text-[#143D2B]">
            8 to 10 Weeks Phased Implementation
          </h2>
          <p className="text-sm text-[#555555] font-serif">
            A project bridging three distinct hospitality verticals requires precision engineering, robust stress testing, and staff onboarding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#EAE5DC] shadow-xs space-y-3">
            <span className="text-xs font-bold font-mono-nums text-[#C67D0A] bg-[#C67D0A]/10 px-2 py-0.5 rounded">
              WEEKS 01 - 02
            </span>
            <h4 className="font-display text-lg font-bold text-[#143D2B]">UI/UX Prototyping & Flow Approval</h4>
            <p className="text-xs text-[#555555] font-serif leading-relaxed">
              Detailed brand asset mapping, 3D venue layout digitization, guest journey flows, and stakeholder sign-off.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#EAE5DC] shadow-xs space-y-3">
            <span className="text-xs font-bold font-mono-nums text-[#143D2B] bg-[#143D2B]/10 px-2 py-0.5 rounded">
              WEEKS 03 - 06
            </span>
            <h4 className="font-display text-lg font-bold text-[#143D2B]">Core Engineering & Payments</h4>
            <p className="text-xs text-[#555555] font-serif leading-relaxed">
              VIP table booking engine, QR digital menu, split Bar/KDS dispatcher, hotel upsell engine, Paystack gateway.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#EAE5DC] shadow-xs space-y-3">
            <span className="text-xs font-bold font-mono-nums text-[#C67D0A] bg-[#C67D0A]/10 px-2 py-0.5 rounded">
              WEEKS 07 - 08
            </span>
            <h4 className="font-display text-lg font-bold text-[#143D2B]">Security Audits & Staff Training</h4>
            <p className="text-xs text-[#555555] font-serif leading-relaxed">
              Door security QR tablet training, floor staff table order workflow, penetration testing, and load stress testing.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#EAE5DC] shadow-xs space-y-3">
            <span className="text-xs font-bold font-mono-nums text-[#143D2B] bg-[#143D2B]/10 px-2 py-0.5 rounded">
              WEEKS 09 - 10
            </span>
            <h4 className="font-display text-lg font-bold text-[#143D2B]">Soft Launch & Live Deployment</h4>
            <p className="text-xs text-[#555555] font-serif leading-relaxed">
              Friday night pilot run at lounge, VIP table bookings live on production domain, on-site engineer support.
            </p>
          </div>
        </div>
      </section>

      {/* Engagement Inquiry Form */}
      <section className="bg-white rounded-2xl border border-[#EAE5DC] p-8 sm:p-12 shadow-xs space-y-8 max-w-3xl mx-auto">
        <div className="text-center space-y-2">
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#143D2B]">
            Initiate Ecosystem Deployment
          </h3>
          <p className="text-xs sm:text-sm text-[#555555] font-serif">
            Partner with The Cre8forte Network Limited to upgrade your hospitality brand&apos;s operational nervous system.
          </p>
        </div>

        {inquirySubmitted ? (
          <div className="p-6 rounded-2xl bg-[#143D2B] text-white text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-[#E09622] mx-auto" />
            <div className="font-display text-xl font-bold">Proposal Engagement Initiated!</div>
            <p className="text-xs text-white/80 font-serif leading-relaxed">
              Thank you, {contactName}. The Cre8forte SaaS Development team will contact {contactEmail} within 24 hours with the official Master Services Agreement for {venueName}.
            </p>
            <button
              onClick={() => setInquirySubmitted(false)}
              className="mt-2 text-xs text-[#E09622] hover:underline cursor-pointer"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleInquirySubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-serif text-[#777777] uppercase tracking-wider">Hospitality Brand / Venue</label>
                <input
                  type="text"
                  required
                  value={venueName}
                  onChange={(e) => setVenueName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#EAE5DC] bg-[#FAF8F5] focus:outline-none focus:border-[#143D2B]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-serif text-[#777777] uppercase tracking-wider">Contact Principal</label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#EAE5DC] bg-[#FAF8F5] focus:outline-none focus:border-[#143D2B]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-serif text-[#777777] uppercase tracking-wider">Corporate Email</label>
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#EAE5DC] bg-[#FAF8F5] focus:outline-none focus:border-[#143D2B]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-serif text-[#777777] uppercase tracking-wider">Phone / WhatsApp</label>
                <input
                  type="text"
                  required
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#EAE5DC] bg-[#FAF8F5] focus:outline-none focus:border-[#143D2B]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-serif text-[#777777] uppercase tracking-wider">Preferred Financial Model</label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value as any)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#EAE5DC] bg-[#FAF8F5] focus:outline-none focus:border-[#143D2B]"
              >
                <option value="enterprise">Option 2: Enterprise Ownership Model (₦550,000 Buyout · 0% Cuts)</option>
                <option value="saas">Option 1: SaaS Subscription Model (₦50,000 Setup · ₦15,000/mo · 3.5% Cut)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#143D2B] hover:bg-[#1E553C] text-white font-serif font-bold text-sm rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-[#E09622]" />
              <span>Submit Partnership Engagement Request</span>
            </button>
          </form>
        )}
      </section>

      {/* Proposal Conclusion Quote */}
      <div className="text-center max-w-2xl mx-auto space-y-2 border-t border-[#EAE5DC] pt-8">
        <blockquote className="font-display text-lg text-[#143D2B] italic">
          &ldquo;By adopting this digital ecosystem, you are not just buying software; you are upgrading the operational nervous system of your entire hospitality brand.&rdquo;
        </blockquote>
        <div className="text-xs text-[#777777] font-serif">
          The Cre8forte Network Limited · Project Management & SaaS Development Team
        </div>
      </div>
    </div>
  );
};
