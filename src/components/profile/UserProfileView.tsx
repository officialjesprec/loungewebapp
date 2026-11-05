import React from 'react';
import { motion } from 'motion/react';
import { User, Award, QrCode, Clock, Wine, BedDouble, Calendar, Sparkles, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '../../context/NavigationContext';
import { GUEST_PROFILES, formatNaira } from '../../data/mockData';

export default function UserProfileView() {
  const { user, logout } = useAuth();
  const { navigate } = useNavigation();

  // Use Alex Morgan's profile data
  const profile = GUEST_PROFILES[0];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] pb-24">
      {/* Top Banner */}
      <section className="bg-[#1B3A2D] text-white py-12 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-20 h-20 rounded-full bg-[#C8973E] text-white font-display text-2xl font-bold flex items-center justify-center border-4 border-[#2A5A44] shadow-lg">
              {profile.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <h1 className="font-display text-2xl sm:text-3xl font-bold">
                  {profile.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-[#C8973E] text-[10px] font-bold uppercase tracking-wider text-white">
                  {profile.tier} Member
                </span>
              </div>
              <p className="text-xs text-white/70 mt-1">{profile.email} · {profile.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/10 rounded-2xl text-center sm:text-right border border-white/15">
              <span className="text-[10px] text-[#DABA6E] uppercase font-bold block">
                Loyalty Balance
              </span>
              <span className="font-display text-2xl font-bold text-white">
                {profile.loyaltyPoints.toLocaleString()} <span className="text-xs font-sans font-normal text-white/80">pts</span>
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 space-y-10">
        {/* Active Passes & Digital QR Wallet */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-display text-xl font-bold text-[#1A1A1A] flex items-center gap-2">
              <QrCode className="w-5 h-5 text-[#C8973E]" />
              <span>Active Passes &amp; Stays</span>
            </h2>
            <span className="text-xs text-[#7A7A7A]">
              {profile.activePasses.length} Active Reservations
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.activePasses.map((pass) => (
              <div
                key={pass.id}
                className="bg-white rounded-2xl p-6 border border-[#E8E6E1] shadow-xs hover:border-[#C8973E] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#1B3A2D]/10 text-[#1B3A2D]">
                      {pass.type}
                    </span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {pass.status}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#1A1A1A]">
                    {pass.reference}
                  </h3>
                  <p className="text-xs text-[#7A7A7A] mt-1">{pass.details}</p>
                </div>

                <div className="pt-4 border-t border-[#E8E6E1] mt-4 flex items-center justify-between text-xs">
                  <span className="text-[#4A4A4A] font-semibold">{pass.validDate}</span>
                  <div className="flex items-center gap-1.5 text-[#1B3A2D] font-bold">
                    <QrCode className="w-4 h-4 text-[#C8973E]" />
                    <span>View Pass Code</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Spend Breakdown & Perks */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Spend Summary */}
          <div className="bg-white rounded-2xl p-6 border border-[#E8E6E1] md:col-span-1 space-y-4">
            <h3 className="font-display text-lg font-bold text-[#1A1A1A]">
              Spending Breakdown
            </h3>
            <p className="text-xs text-[#7A7A7A]">
              Total Lifetime Spend: <strong className="text-[#1B3A2D]">{formatNaira(profile.totalSpend)}</strong>
            </p>

            <div className="space-y-3 pt-2">
              {[
                { label: 'The Lounge', amount: profile.spendBreakdown.lounge, pct: '45%' },
                { label: 'Nightclub & VIP', amount: profile.spendBreakdown.club, pct: '30%' },
                { label: 'Boutique Hotel', amount: profile.spendBreakdown.hotel, pct: '15%' },
                { label: 'Gaming Space', amount: profile.spendBreakdown.gaming, pct: '10%' },
              ].map((sp) => (
                <div key={sp.label} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#4A4A4A]">{sp.label}</span>
                    <span className="font-bold text-[#1A1A1A]">{formatNaira(sp.amount)}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[#F5F3EE] overflow-hidden">
                    <div
                      className="h-full bg-[#1B3A2D] rounded-full"
                      style={{ width: sp.pct }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Redeemable Loyalty Perks */}
          <div className="bg-white rounded-2xl p-6 border border-[#E8E6E1] md:col-span-2 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-display text-lg font-bold text-[#1A1A1A] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#C8973E]" />
                <span>Available Member Rewards</span>
              </h3>
              <span className="text-xs text-[#C8973E] font-bold">
                {profile.loyaltyPoints} Available Points
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { name: 'Complimentary Cocktail', cost: 1500, desc: 'Any signature creation' },
                { name: 'Chef Tasting Dessert', cost: 2500, desc: 'Tiramisu or cheesecake' },
                { name: '1-Hour PS5 Pro VIP Pod', cost: 4000, desc: 'Session for 4 guests' },
              ].map((perk) => {
                const canAfford = profile.loyaltyPoints >= perk.cost;
                return (
                  <div
                    key={perk.name}
                    className="p-4 rounded-xl border border-[#E8E6E1] bg-[#FAFAF7] flex flex-col justify-between"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-[#1A1A1A] mb-1">{perk.name}</h4>
                      <p className="text-[11px] text-[#7A7A7A] mb-2">{perk.desc}</p>
                    </div>
                    <button
                      disabled={!canAfford}
                      className={`w-full py-1.5 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                        canAfford
                          ? 'bg-[#C8973E] hover:bg-[#b5862f] text-white'
                          : 'bg-[#E8E6E1] text-[#7A7A7A] cursor-not-allowed'
                      }`}
                    >
                      Redeem ({perk.cost} pts)
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Favorite Drinks Tags */}
            <div className="pt-4 border-t border-[#E8E6E1]">
              <span className="text-xs font-bold text-[#1A1A1A] block mb-2">
                Saved Preferences &amp; Preferred Orders:
              </span>
              <div className="flex flex-wrap gap-2">
                {profile.favoriteDrinks.map((dr) => (
                  <span
                    key={dr}
                    className="text-xs px-3 py-1 rounded-full bg-[#1B3A2D]/10 text-[#1B3A2D] font-medium"
                  >
                    {dr}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Order History */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E6E1] shadow-xs space-y-4">
          <h3 className="font-display text-xl font-bold text-[#1A1A1A] flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#C8973E]" />
            <span>Recent Orders &amp; Activity</span>
          </h3>

          <div className="divide-y divide-[#E8E6E1]">
            {profile.transactionHistory.map((tx) => (
              <div key={tx.id} className="py-3.5 flex items-center justify-between text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#1A1A1A]">{tx.type}</span>
                    <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-md bg-[#F5F3EE] text-[#7A7A7A]">
                      {tx.vertical}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#7A7A7A] block mt-0.5">
                    {tx.date} · Ref: {tx.receiptRef}
                  </span>
                </div>

                <div className="text-right">
                  <span className="font-bold text-sm text-[#1B3A2D] block">
                    {tx.amount === 0 ? 'Reward Claim' : formatNaira(tx.amount)}
                  </span>
                  <span className="text-[10px] text-emerald-700 font-semibold">
                    {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

