import React from 'react';
import { NavigationTab } from '../types/hospitality.ts';
import { Compass, ShieldCheck, User, Sparkles, Building2, UtensilsCrossed, Wine, Ticket, Briefcase } from 'lucide-react';

interface HeaderProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  cartCount: number;
  activeOrdersCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  activeOrdersCount,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EAE5DC]">
      {/* Top utility notification */}
      <div className="bg-[#143D2B] text-[#FAF8F5] px-4 py-1.5 text-xs text-center font-serif tracking-wide flex items-center justify-center gap-3">
        <span className="opacity-80">The Cre8forte Network Limited</span>
        <span className="opacity-40">·</span>
        <span className="text-[#E09622] font-medium">Digital Transformation Proposal & Live Hospitality Ecosystem</span>
        <span className="opacity-40">·</span>
        <span className="opacity-90">Lounge · Club · Hotel</span>
      </div>

      {/* Main Top Bar Contract: 3 zones separated by gap-8 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Single text wordmark */}
        <button
          onClick={() => setActiveTab('proposal')}
          className="text-left group cursor-pointer shrink-0"
        >
          <div className="font-display text-2xl font-bold tracking-tight text-[#143D2B] whitespace-nowrap">
            Cre8forte Ecosystem
          </div>
          <div className="text-[11px] text-[#777777] font-serif uppercase tracking-widest -mt-1 group-hover:text-[#C67D0A] transition-colors">
            Unified Hospitality SaaS
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#555555]">
          <button
            onClick={() => setActiveTab('proposal')}
            className={`whitespace-nowrap transition-colors cursor-pointer py-1 border-b-2 ${
              activeTab === 'proposal'
                ? 'text-[#143D2B] border-[#143D2B] font-semibold'
                : 'border-transparent hover:text-[#143D2B]'
            }`}
          >
            Proposal & Problem Solvers
          </button>

          <button
            onClick={() => setActiveTab('club')}
            className={`whitespace-nowrap transition-colors cursor-pointer py-1 border-b-2 ${
              activeTab === 'club'
                ? 'text-[#143D2B] border-[#143D2B] font-semibold'
                : 'border-transparent hover:text-[#143D2B]'
            }`}
          >
            The Club (VIP Tables)
          </button>

          <button
            onClick={() => setActiveTab('lounge')}
            className={`whitespace-nowrap transition-colors cursor-pointer py-1 border-b-2 flex items-center gap-1.5 ${
              activeTab === 'lounge'
                ? 'text-[#143D2B] border-[#143D2B] font-semibold'
                : 'border-transparent hover:text-[#143D2B]'
            }`}
          >
            The Lounge (QR Menu)
            {cartCount > 0 && (
              <span className="text-[10px] font-mono-nums bg-[#C67D0A] text-white rounded-full px-1.5 py-0.2">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('hotel')}
            className={`whitespace-nowrap transition-colors cursor-pointer py-1 border-b-2 ${
              activeTab === 'hotel'
                ? 'text-[#143D2B] border-[#143D2B] font-semibold'
                : 'border-transparent hover:text-[#143D2B]'
            }`}
          >
            The Hotel (Cross-Sell)
          </button>

          <button
            onClick={() => setActiveTab('tickets')}
            className={`whitespace-nowrap transition-colors cursor-pointer py-1 border-b-2 ${
              activeTab === 'tickets'
                ? 'text-[#143D2B] border-[#143D2B] font-semibold'
                : 'border-transparent hover:text-[#143D2B]'
            }`}
          >
            Ticketing & Loyalty
          </button>

          <button
            onClick={() => setActiveTab('investment')}
            className={`whitespace-nowrap transition-colors cursor-pointer py-1 border-b-2 ${
              activeTab === 'investment'
                ? 'text-[#C67D0A] border-[#C67D0A] font-semibold'
                : 'border-transparent hover:text-[#C67D0A]'
            }`}
          >
            Investment Models
          </button>
        </nav>

        {/* Zone 3: Primary Action & Profile toggles */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3 py-1.5 text-xs font-serif rounded border transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'profile'
                ? 'bg-[#143D2B] text-[#FAF8F5] border-[#143D2B]'
                : 'bg-white text-[#333333] border-[#EAE5DC] hover:border-[#143D2B]'
            }`}
          >
            <User className="w-3.5 h-3.5 text-[#C67D0A]" />
            <span>Guest Profile</span>
          </button>

          <button
            onClick={() => setActiveTab('admin_crm')}
            className={`px-3.5 py-2 text-xs font-medium rounded transition-all cursor-pointer whitespace-nowrap shadow-sm flex items-center gap-1.5 ${
              activeTab === 'admin_crm'
                ? 'bg-[#C67D0A] text-white hover:bg-[#9A6006]'
                : 'bg-[#143D2B] text-[#FAF8F5] hover:bg-[#1E553C]'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-[#E09622]" />
            <span>Admin CRM</span>
            {activeOrdersCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-[#E09622]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav scrollbar */}
      <div className="lg:hidden flex items-center gap-2 overflow-x-auto px-4 py-2 border-t border-[#EAE5DC] bg-[#F4EFEA] text-xs">
        <button
          onClick={() => setActiveTab('proposal')}
          className={`px-3 py-1 rounded whitespace-nowrap ${activeTab === 'proposal' ? 'bg-[#143D2B] text-white' : 'text-[#555555]'}`}
        >
          Proposal
        </button>
        <button
          onClick={() => setActiveTab('club')}
          className={`px-3 py-1 rounded whitespace-nowrap ${activeTab === 'club' ? 'bg-[#143D2B] text-white' : 'text-[#555555]'}`}
        >
          The Club
        </button>
        <button
          onClick={() => setActiveTab('lounge')}
          className={`px-3 py-1 rounded whitespace-nowrap ${activeTab === 'lounge' ? 'bg-[#143D2B] text-white' : 'text-[#555555]'}`}
        >
          The Lounge
        </button>
        <button
          onClick={() => setActiveTab('hotel')}
          className={`px-3 py-1 rounded whitespace-nowrap ${activeTab === 'hotel' ? 'bg-[#143D2B] text-white' : 'text-[#555555]'}`}
        >
          The Hotel
        </button>
        <button
          onClick={() => setActiveTab('tickets')}
          className={`px-3 py-1 rounded whitespace-nowrap ${activeTab === 'tickets' ? 'bg-[#143D2B] text-white' : 'text-[#555555]'}`}
        >
          Tickets & Loyalty
        </button>
        <button
          onClick={() => setActiveTab('investment')}
          className={`px-3 py-1 rounded whitespace-nowrap ${activeTab === 'investment' ? 'bg-[#C67D0A] text-white' : 'text-[#555555]'}`}
        >
          Investment Models
        </button>
      </div>
    </header>
  );
};
