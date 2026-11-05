import React, { useState } from 'react';
import { GuestProfile, WalletTransaction } from '../types/hospitality.ts';
import { formatNaira } from '../utils/pricingRules.ts';
import {
  User,
  Coins,
  QrCode,
  CreditCard,
  History,
  ShieldCheck,
  Award,
  BedDouble,
  Wine,
  Sparkles,
  ChevronRight,
  Maximize2,
  X,
  CheckCircle2,
  PlusCircle,
  Download,
  AlertCircle,
  FileText,
  Calendar,
} from 'lucide-react';

interface UserProfileViewProps {
  guest: GuestProfile;
  onNavigateTab: (tab: any) => void;
  onTopUpWallet: (amountNaira: number) => void;
  onCancelBooking: (passId: string) => void;
}

export const UserProfileView: React.FC<UserProfileViewProps> = ({
  guest,
  onNavigateTab,
  onTopUpWallet,
  onCancelBooking,
}) => {
  const [activeQrModal, setActiveQrModal] = useState<{
    type: string;
    reference: string;
    details: string;
    code: string;
  } | null>(null);

  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState<boolean>(false);
  const [topUpAmount, setTopUpAmount] = useState<number>(50000);
  const [selectedReceipt, setSelectedReceipt] = useState<WalletTransaction | null>(null);
  const [bookingFilter, setBookingFilter] = useState<'All' | 'VIP Table' | 'Hotel Stay' | 'Event Ticket'>('All');

  const filteredPasses = guest.activePasses.filter((pass) => {
    if (bookingFilter === 'All') return true;
    return pass.type === bookingFilter;
  });

  const handleTopUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onTopUpWallet(topUpAmount);
    setIsTopUpModalOpen(false);
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Top Profile Summary Card */}
      <div className="bg-white rounded-2xl border border-[#EAE5DC] p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#143D2B] text-white flex items-center justify-center font-display text-2xl font-bold shadow-sm">
              JD
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#143D2B]">{guest.name}</h2>
                <span className="text-xs font-bold bg-[#C67D0A] text-white px-2.5 py-0.5 rounded font-mono-nums">
                  {guest.vipTier}
                </span>
              </div>
              <p className="text-xs text-[#555555] font-serif">
                {guest.email} · {guest.phone}
              </p>
              <div className="text-[11px] text-[#777777] font-serif flex items-center gap-2 pt-0.5">
                <span>Unified Ecosystem Member since Jan 2026</span>
                <span>·</span>
                <span className="text-[#143D2B] font-semibold">Active Patron</span>
              </div>
            </div>
          </div>

          {/* Unified Wallet, Loyalty & Total Spend Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto">
            {/* Unified Wallet Card */}
            <div className="p-4 bg-[#FAF8F5] rounded-xl border-2 border-[#143D2B]/30 flex flex-col justify-between">
              <div>
                <div className="text-[10px] text-[#777777] font-serif uppercase tracking-wider flex items-center justify-between">
                  <span>Unified Wallet</span>
                  <CreditCard className="w-3.5 h-3.5 text-[#143D2B]" />
                </div>
                <div className="font-display text-2xl font-bold text-[#143D2B] font-mono-nums mt-0.5">
                  {formatNaira(guest.walletBalanceNaira)}
                </div>
              </div>
              <button
                onClick={() => setIsTopUpModalOpen(true)}
                className="mt-2 text-[11px] font-serif font-bold text-[#C67D0A] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <PlusCircle className="w-3 h-3" />
                <span>Top-Up Wallet</span>
              </button>
            </div>

            {/* Loyalty Points */}
            <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#EAE5DC] flex flex-col justify-between">
              <div>
                <div className="text-[10px] text-[#777777] font-serif uppercase tracking-wider flex items-center justify-between">
                  <span>Loyalty Points</span>
                  <Coins className="w-3.5 h-3.5 text-[#C67D0A]" />
                </div>
                <div className="font-display text-2xl font-bold text-[#143D2B] font-mono-nums mt-0.5">
                  {guest.loyaltyPoints.toLocaleString()}
                </div>
              </div>
              <span className="text-[10px] text-[#C67D0A] font-semibold mt-2">Redeem for Late Checkout</span>
            </div>

            {/* Lifetime Tracked Spend */}
            <div className="p-4 bg-[#143D2B] text-white rounded-xl flex flex-col justify-between">
              <div>
                <div className="text-[10px] text-white/70 font-serif uppercase tracking-wider">Tracked Spend</div>
                <div className="font-display text-2xl font-bold text-[#E09622] font-mono-nums mt-0.5">
                  {formatNaira(guest.totalSpendNaira)}
                </div>
              </div>
              <span className="text-[10px] text-white/80 mt-2">Hotel · Club · Lounge</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: MANAGE EXISTING BOOKINGS */}
      <section className="bg-white rounded-2xl border border-[#EAE5DC] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAE5DC] pb-4">
          <div>
            <h3 className="font-display text-2xl font-bold text-[#143D2B]">
              Existing Bookings & Digital Passes
            </h3>
            <p className="text-xs text-[#555555] font-serif">
              View, present QR security codes, or manage your club tables, hotel stays, and tickets.
            </p>
          </div>

          <div className="flex items-center gap-1 bg-[#FAF8F5] p-1 rounded-xl border border-[#EAE5DC]">
            {(['All', 'VIP Table', 'Hotel Stay', 'Event Ticket'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setBookingFilter(tab)}
                className={`px-3 py-1.5 text-xs font-serif rounded-lg transition-all cursor-pointer ${
                  bookingFilter === tab
                    ? 'bg-[#143D2B] text-white font-semibold'
                    : 'text-[#555555] hover:text-[#143D2B]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {filteredPasses.length === 0 ? (
          <div className="py-10 text-center space-y-3">
            <p className="text-xs text-[#777777] font-serif">No active bookings under this category.</p>
            <div className="flex justify-center gap-4 text-xs font-serif">
              <button onClick={() => onNavigateTab('club')} className="text-[#143D2B] font-bold underline">
                Book Club Table
              </button>
              <button onClick={() => onNavigateTab('hotel')} className="text-[#143D2B] font-bold underline">
                Book Hotel Room
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPasses.map((pass) => (
              <div
                key={pass.id}
                className="p-5 rounded-2xl border border-[#EAE5DC] bg-[#FAF8F5] flex flex-col justify-between space-y-4 hover:border-[#143D2B]/40 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C67D0A] font-serif">
                      {pass.type}
                    </span>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                        pass.status === 'Confirmed'
                          ? 'bg-amber-100 text-amber-800'
                          : pass.status === 'Checked In'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {pass.status}
                    </span>
                  </div>

                  <h4 className="font-display text-lg font-bold text-[#143D2B]">{pass.reference}</h4>
                  <p className="text-xs text-[#555555] font-serif leading-relaxed">{pass.details}</p>
                  <div className="text-[11px] text-[#777777] font-serif pt-1 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#143D2B]" />
                    <span>Valid: <strong>{pass.validDate}</strong></span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#EAE5DC] flex items-center justify-between gap-2">
                  <button
                    onClick={() =>
                      setActiveQrModal({
                        type: pass.type,
                        reference: pass.reference,
                        details: pass.details,
                        code: `CRE8-${pass.id.toUpperCase()}-PASS`,
                      })
                    }
                    className="px-3 py-1.5 bg-[#143D2B] text-white text-xs font-serif font-semibold rounded-lg flex items-center gap-1.5 hover:bg-[#1E553C] cursor-pointer"
                  >
                    <Maximize2 className="w-3 h-3 text-[#E09622]" />
                    <span>Present Pass</span>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`Are you sure you want to cancel ${pass.reference}?`)) {
                        onCancelBooking(pass.id);
                      }
                    }}
                    className="text-xs text-red-700 hover:underline font-serif cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* SECTION 2: TRANSACTION & PURCHASE HISTORY WITH RECEIPT DOWNLOAD */}
      <section className="bg-white rounded-2xl border border-[#EAE5DC] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-[#EAE5DC] pb-4">
          <div>
            <h3 className="font-display text-2xl font-bold text-[#143D2B]">Transaction History & Receipts</h3>
            <p className="text-xs text-[#555555] font-serif">
              Complete verifiable ledger across Club VIP deposits, in-venue lounge orders, and hotel bookings.
            </p>
          </div>
          <span className="text-xs font-mono-nums font-semibold bg-[#FAF8F5] text-[#143D2B] px-3 py-1 rounded border border-[#EAE5DC]">
            {guest.transactionHistory.length} Records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-serif">
            <thead className="bg-[#FAF8F5] border-b border-[#EAE5DC] text-[#777777] uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-3.5">Date & Time</th>
                <th className="p-3.5">Transaction Type</th>
                <th className="p-3.5">Venue Vertical</th>
                <th className="p-3.5">Amount (₦)</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE5DC]">
              {guest.transactionHistory.map((txn) => (
                <tr key={txn.id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                  <td className="p-3.5 font-mono-nums text-[#555555]">{txn.date}</td>
                  <td className="p-3.5 font-bold text-[#143D2B]">{txn.type}</td>
                  <td className="p-3.5">
                    <span className="text-[10px] font-bold bg-[#FAF8F5] text-[#143D2B] px-2 py-0.5 rounded border border-[#EAE5DC]">
                      {txn.vertical}
                    </span>
                  </td>
                  <td className="p-3.5 font-mono-nums font-bold text-sm text-[#143D2B]">
                    {formatNaira(txn.amountNaira)}
                  </td>
                  <td className="p-3.5">
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                      {txn.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => setSelectedReceipt(txn)}
                      className="px-2.5 py-1 text-xs text-[#143D2B] hover:bg-[#FAF8F5] border border-[#EAE5DC] rounded flex items-center gap-1 ml-auto cursor-pointer"
                    >
                      <FileText className="w-3 h-3 text-[#C67D0A]" />
                      <span>View Receipt</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* TOP-UP UNIFIED WALLET MODAL */}
      {isTopUpModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full border border-[#EAE5DC] shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#EAE5DC] pb-4">
              <div>
                <span className="text-[10px] text-[#C67D0A] uppercase tracking-wider font-bold">
                  Cre8forte Unified Wallet
                </span>
                <h3 className="font-display text-xl font-bold text-[#143D2B]">Top-Up Cash Credits</h3>
              </div>
              <button onClick={() => setIsTopUpModalOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleTopUpSubmit} className="space-y-4 text-xs font-serif">
              <div>
                <label className="text-[11px] text-[#777777] uppercase tracking-wider block mb-1">
                  Select Amount (₦ Naira)
                </label>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[20000, 50000, 100000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setTopUpAmount(amt)}
                      className={`py-2 text-xs font-mono-nums font-bold rounded-lg border cursor-pointer ${
                        topUpAmount === amt
                          ? 'bg-[#143D2B] text-white border-[#143D2B]'
                          : 'bg-[#FAF8F5] text-[#143D2B] border-[#EAE5DC]'
                      }`}
                    >
                      {formatNaira(amt)}
                    </button>
                  ))}
                </div>

                <input
                  type="number"
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-[#EAE5DC] bg-[#FAF8F5] font-mono-nums font-bold text-sm text-[#143D2B]"
                />
              </div>

              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EAE5DC] space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#555555]">Payment Gateway:</span>
                  <strong className="text-[#143D2B]">Paystack / Flutterwave</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#555555]">Loyalty Points Earned:</span>
                  <strong className="text-[#C67D0A] font-mono-nums">+{Math.floor(topUpAmount / 100)} pts</strong>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#143D2B] hover:bg-[#1E553C] text-white font-serif font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Top-Up {formatNaira(topUpAmount)} to Unified Wallet
              </button>
            </form>
          </div>
        </div>
      )}

      {/* RECEIPT VIEW MODAL */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full border border-[#EAE5DC] shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#EAE5DC] pb-4">
              <div>
                <span className="text-[10px] text-[#C67D0A] uppercase tracking-wider font-bold">
                  The Cre8forte Network Limited
                </span>
                <h3 className="font-display text-xl font-bold text-[#143D2B]">Electronic Folio Receipt</h3>
              </div>
              <button onClick={() => setSelectedReceipt(null)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#EAE5DC] space-y-2 text-xs font-serif">
              <div className="flex justify-between text-[#777777]">
                <span>Receipt Ref:</span>
                <span className="font-mono-nums font-bold text-[#333333]">{selectedReceipt.receiptRef}</span>
              </div>
              <div className="flex justify-between text-[#777777]">
                <span>Date & Time:</span>
                <span className="font-mono-nums text-[#333333]">{selectedReceipt.date}</span>
              </div>
              <div className="flex justify-between text-[#777777]">
                <span>Guest:</span>
                <span className="font-bold text-[#333333]">{guest.name}</span>
              </div>
              <div className="flex justify-between text-[#777777]">
                <span>Vertical:</span>
                <span className="font-bold text-[#143D2B]">{selectedReceipt.vertical}</span>
              </div>
              <div className="border-t border-[#EAE5DC] pt-2 flex justify-between font-bold text-sm text-[#143D2B]">
                <span>Amount Paid:</span>
                <span className="font-mono-nums text-lg">{formatNaira(selectedReceipt.amountNaira)}</span>
              </div>
            </div>

            <div className="text-[11px] text-[#777777] text-center font-serif">
              Authenticated electronic transaction issued by Unified Hospitality Ecosystem.
            </div>

            <button
              onClick={() => setSelectedReceipt(null)}
              className="w-full py-2.5 bg-[#143D2B] text-white text-xs font-serif font-bold rounded-xl cursor-pointer"
            >
              Close Receipt
            </button>
          </div>
        </div>
      )}

      {/* FULL SCREEN DIGITAL QR PASS MODAL */}
      {activeQrModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#143D2B] text-white rounded-2xl max-w-sm w-full border border-white/20 p-6 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setActiveQrModal(null)}
              className="absolute right-4 top-4 text-white/60 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <div className="text-[10px] uppercase font-serif tracking-widest text-[#E09622]">
                Cre8forte Tamper-Proof QR Pass
              </div>
              <h3 className="font-display text-xl font-bold">{activeQrModal.reference}</h3>
              <p className="text-xs text-white/80 font-serif">{activeQrModal.details}</p>
            </div>

            <div className="bg-white p-6 rounded-2xl max-w-[210px] mx-auto text-center space-y-3">
              <div className="aspect-square bg-slate-950 rounded-xl p-3 flex items-center justify-center">
                <QrCode className="w-32 h-32 text-white" />
              </div>
              <div className="text-xs font-mono-nums text-slate-800 font-bold tracking-wider">
                {activeQrModal.code}
              </div>
            </div>

            <div className="text-center text-xs text-white/70 font-serif">
              Present this screen to door security or the elevator scanner for instant authorization.
            </div>

            <button
              onClick={() => setActiveQrModal(null)}
              className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
