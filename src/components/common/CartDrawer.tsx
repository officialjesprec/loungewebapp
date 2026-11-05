import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, CreditCard, Smartphone, DollarSign, Sparkles, CheckCircle2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatNaira } from '../../data/mockData';
import type { PaymentMethod, VenueSpace } from '../../types/hospitality';

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    guestName,
    setGuestName,
    tableIdentifier,
    setTableIdentifier,
    venue,
    setVenue,
    removeItem,
    updateQuantity,
    subtotal,
    tax,
    total,
    checkout,
  } = useCart();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [selectedTipPercent, setSelectedTipPercent] = useState<number>(10);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCartOpen) return null;

  const tipAmount = Math.round(subtotal * (selectedTipPercent / 100));
  const grandTotal = total + tipAmount;

  // Preset quick tables for easy guest selection
  const tablePresets: { space: VenueSpace; label: string; values: string[] }[] = [
    { space: 'lounge', label: 'The Lounge', values: ['Table 4', 'Table 8', 'Table 12', 'Garden Terrace 1', 'Mezzanine A'] },
    { space: 'club', label: 'The Nightclub', values: ['VIP Booth 1 (DJ Stage)', 'VIP Booth 2', 'VIP Booth 3 (Balcony)', 'Dancefloor High Top'] },
    { space: 'hotel', label: 'Hotel Room', values: ['Room 108 (Garden)', 'Room 204 (Executive)', 'Suite 304', 'Penthouse'] },
    { space: 'gaming', label: 'Gaming Suite', values: ['PS5 Pro Pod 1', 'PS5 Pro Pod 2', 'PC Station Alpha', 'Billiards Lounge'] },
  ];

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      checkout(paymentMethod, tipAmount);
      setIsSubmitting(false);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAFAF7] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 bg-[#1B3A2D] text-white flex items-center justify-between">
            <div>
              <h3 className="font-display text-xl font-bold">Your Table Order</h3>
              <p className="text-[11px] text-[#DABA6E] tracking-wider uppercase">
                Instant Guest Checkout · No Account Needed
              </p>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#E8E6E1] flex items-center justify-center text-[#7A7A7A]">
                  <CreditCard className="w-8 h-8 opacity-40" />
                </div>
                <h4 className="font-display text-lg text-[#1A1A1A]">Your order is empty</h4>
                <p className="text-xs text-[#7A7A7A] max-w-xs mx-auto">
                  Browse our lounge dining, cocktails, or gaming bites and add items directly to your table.
                </p>
              </div>
            ) : (
              <>
                {/* Items List */}
                <div className="space-y-3">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-[#7A7A7A]">
                    Ordered Items ({items.length})
                  </h4>
                  <div className="divide-y divide-[#E8E6E1]">
                    {items.map(({ menuItem, quantity, specialNotes }) => (
                      <div key={menuItem.id} className="py-3 flex items-center gap-3">
                        <img
                          src={menuItem.image}
                          alt={menuItem.name}
                          className="w-14 h-14 rounded-xl object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="text-xs font-bold text-[#1A1A1A] truncate">
                            {menuItem.name}
                          </h5>
                          <p className="text-xs font-semibold text-[#1B3A2D]">
                            {formatNaira(menuItem.price * quantity)}
                          </p>
                          {specialNotes && (
                            <p className="text-[10px] text-[#7A7A7A] italic truncate">
                              Note: {specialNotes}
                            </p>
                          )}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-1.5 bg-white border border-[#E8E6E1] rounded-lg px-2 py-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => updateQuantity(menuItem.id, quantity - 1)}
                            className="text-[#7A7A7A] hover:text-[#1A1A1A] p-0.5 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-[#1A1A1A] w-5 text-center">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(menuItem.id, quantity + 1)}
                            className="text-[#7A7A7A] hover:text-[#1A1A1A] p-0.5 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(menuItem.id)}
                          className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Table & Name Assignment (Mandatory Guest Requirement) */}
                <div className="bg-white p-4 rounded-2xl border border-[#E8E6E1] space-y-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#C8973E]" />
                    <h4 className="text-xs uppercase tracking-wider font-bold text-[#1A1A1A]">
                      Table &amp; Guest Details
                    </h4>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#4A4A4A] mb-1">
                        Your Name / Party Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="e.g. Alex Morgan"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#D5D2CC] bg-[#FAFAF7] focus:outline-hidden focus:border-[#1B3A2D]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#4A4A4A] mb-1">
                        Venue Space
                      </label>
                      <div className="grid grid-cols-4 gap-1.5">
                        {(['lounge', 'club', 'hotel', 'gaming'] as VenueSpace[]).map((sp) => (
                          <button
                            key={sp}
                            type="button"
                            onClick={() => setVenue(sp)}
                            className={`py-1.5 px-2 rounded-lg text-[10px] font-bold capitalize transition-colors cursor-pointer text-center ${
                              venue === sp
                                ? 'bg-[#1B3A2D] text-white'
                                : 'bg-[#F5F3EE] text-[#4A4A4A] hover:bg-[#E8E6E1]'
                            }`}
                          >
                            {sp}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#4A4A4A] mb-1">
                        Select Table, Booth, or Room Number *
                      </label>
                      <input
                        type="text"
                        required
                        value={tableIdentifier}
                        onChange={(e) => setTableIdentifier(e.target.value)}
                        placeholder="e.g. Table 12, Booth 3, or Room 204"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#D5D2CC] bg-[#FAFAF7] focus:outline-hidden focus:border-[#1B3A2D]"
                      />

                      {/* Quick Pills */}
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {tablePresets
                          .find((p) => p.space === venue)
                          ?.values.map((val) => (
                            <button
                              key={val}
                              type="button"
                              onClick={() => setTableIdentifier(val)}
                              className={`text-[10px] px-2 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                                tableIdentifier === val
                                  ? 'bg-[#C8973E] text-white font-bold'
                                  : 'bg-[#F5F3EE] text-[#7A7A7A] hover:bg-[#E8E6E1]'
                              }`}
                            >
                              {val}
                            </button>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Direct Payment Method */}
                <div className="bg-white p-4 rounded-2xl border border-[#E8E6E1] space-y-3">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-[#1A1A1A]">
                    Payment Method
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'card', label: 'Debit / Credit Card', icon: CreditCard },
                      { id: 'apple_pay', label: 'Apple / Google Pay', icon: Smartphone },
                      { id: 'pay_at_table', label: 'Pay Server at Table', icon: DollarSign },
                    ].map((method) => {
                      const Icon = method.icon;
                      const isSelected = paymentMethod === method.id;
                      return (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setPaymentMethod(method.id as PaymentMethod)}
                          className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#1B3A2D] bg-[#1B3A2D]/5 font-bold text-[#1B3A2D]'
                              : 'border-[#E8E6E1] text-[#7A7A7A] hover:border-[#1B3A2D]'
                          }`}
                        >
                          <Icon className="w-4 h-4 text-[#C8973E]" />
                          <span className="text-[11px] leading-tight">{method.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Optional Hospitality Tip */}
                <div className="bg-white p-4 rounded-2xl border border-[#E8E6E1] space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-[#1A1A1A]">Staff Hospitality Tip</span>
                    <span className="text-xs text-[#C8973E] font-semibold">{formatNaira(tipAmount)}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[0, 5, 10, 15].map((pct) => (
                      <button
                        key={pct}
                        type="button"
                        onClick={() => setSelectedTipPercent(pct)}
                        className={`py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                          selectedTipPercent === pct
                            ? 'bg-[#C8973E] text-white'
                            : 'bg-[#F5F3EE] text-[#4A4A4A] hover:bg-[#E8E6E1]'
                        }`}
                      >
                        {pct === 0 ? 'None' : `${pct}%`}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer & Submit */}
          {items.length > 0 && (
            <div className="p-6 bg-white border-t border-[#E8E6E1] space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#7A7A7A]">
                  <span>Subtotal</span>
                  <span>{formatNaira(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#7A7A7A]">
                  <span>VAT &amp; Consumption Tax (7.5%)</span>
                  <span>{formatNaira(tax)}</span>
                </div>
                {tipAmount > 0 && (
                  <div className="flex justify-between text-[#7A7A7A]">
                    <span>Hospitality Tip</span>
                    <span>{formatNaira(tipAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-[#1A1A1A] pt-2 border-t border-[#E8E6E1]">
                  <span>Total Amount</span>
                  <span className="text-[#1B3A2D]">{formatNaira(grandTotal)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCheckout}
                disabled={isSubmitting || !tableIdentifier || !guestName}
                className="w-full py-3.5 rounded-full bg-[#1B3A2D] hover:bg-[#2A5A44] disabled:bg-[#D5D2CC] disabled:cursor-not-allowed text-white font-bold text-sm tracking-wide transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                {isSubmitting ? (
                  <span>Transmitting to Kitchen/Bar...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#C8973E]" />
                    <span>Confirm &amp; Place Table Order ({formatNaira(grandTotal)})</span>
                  </>
                )}
              </button>

              {(!tableIdentifier || !guestName) && (
                <p className="text-[11px] text-amber-700 text-center">
                  Please enter your name and table number above to proceed.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

