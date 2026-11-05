import React from 'react';
import { CheckCircle2, Clock, Sparkles, ChefHat, Check, X, ArrowRight, UserPlus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNavigation } from '../../context/NavigationContext';
import { formatNaira } from '../../data/mockData';

export default function OrderStatusModal() {
  const { activeOrder, isOrderStatusOpen, closeOrderStatus, advanceOrderStatus } = useCart();
  const { navigate } = useNavigation();

  if (!isOrderStatusOpen || !activeOrder) return null;

  const steps = [
    { id: 'received', label: 'Order Received', icon: Clock, desc: 'Logged with station' },
    { id: 'preparing', label: 'In Preparation', icon: ChefHat, desc: 'Kitchen & Bar active' },
    { id: 'ready', label: 'Ready to Serve', icon: Sparkles, desc: 'Being plated/poured' },
    { id: 'delivered', label: 'Served at Table', icon: Check, desc: 'Enjoy your evening' },
  ];

  const currentIdx = steps.findIndex((s) => s.id === activeOrder.status);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-[#FAFAF7] rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#E8E6E1]">
        {/* Header */}
        <div className="bg-[#1B3A2D] text-white p-6 relative">
          <button
            onClick={closeOrderStatus}
            className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-[#DABA6E] font-semibold">
              Live Order Tracker
            </span>
          </div>
          <h3 className="font-display text-2xl font-bold">
            Order #{activeOrder.id}
          </h3>
          <p className="text-xs text-white/80 mt-1">
            Assigned to <strong className="text-white">{activeOrder.tableIdentifier}</strong> for {activeOrder.guestName}
          </p>
        </div>

        {/* Status Stepper */}
        <div className="p-6 border-b border-[#E8E6E1] bg-white">
          <div className="grid grid-cols-4 gap-2 relative">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isPast = idx < currentIdx;
              const isCurrent = idx === currentIdx;

              return (
                <div key={step.id} className="flex flex-col items-center text-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors ${
                      isCurrent
                        ? 'bg-[#C8973E] text-white ring-4 ring-[#C8973E]/20'
                        : isPast
                        ? 'bg-[#1B3A2D] text-white'
                        : 'bg-[#F5F3EE] text-[#7A7A7A]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-[10px] leading-tight ${
                      isCurrent ? 'font-bold text-[#1B3A2D]' : 'font-medium text-[#7A7A7A]'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Quick Demo Simulator trigger */}
          <div className="mt-4 pt-3 border-t border-[#E8E6E1] flex justify-between items-center text-xs">
            <span className="text-[#7A7A7A]">Simulated Kitchen Status:</span>
            <button
              onClick={advanceOrderStatus}
              className="text-[#C8973E] hover:underline font-bold text-xs cursor-pointer"
            >
              Advance Step ➔
            </button>
          </div>
        </div>

        {/* Order Details & Items */}
        <div className="p-6 space-y-4 max-h-60 overflow-y-auto">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#1A1A1A] block">Items in this order:</span>
            {activeOrder.items.map(({ menuItem, quantity }) => (
              <div key={menuItem.id} className="flex justify-between items-center text-xs py-1">
                <span className="text-[#4A4A4A]">
                  {quantity}x {menuItem.name}
                </span>
                <span className="font-semibold text-[#1A1A1A]">
                  {formatNaira(menuItem.price * quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-[#E8E6E1] flex justify-between items-center text-sm font-bold">
            <span>Total Paid ({activeOrder.paymentMethod.replace('_', ' ')})</span>
            <span className="text-[#1B3A2D]">{formatNaira(activeOrder.total)}</span>
          </div>

          {/* Digital Verification Code */}
          <div className="p-3 bg-[#F5F3EE] rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[10px] text-[#7A7A7A] uppercase block">
                Verification Reference
              </span>
              <span className="text-xs font-bold text-[#1B3A2D] tracking-wider">
                {activeOrder.qrCode}
              </span>
            </div>
            <div className="w-8 h-8 rounded-lg bg-white border border-[#E8E6E1] flex items-center justify-center font-bold text-xs text-[#1B3A2D]">
              QR
            </div>
          </div>
        </div>

        {/* Optional Account Creation / Loyalty Callout */}
        <div className="p-6 bg-[#F5F3EE] border-t border-[#E8E6E1] space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#C8973E]/20 text-[#A07830] flex items-center justify-center shrink-0">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-[#1A1A1A]">
                Collect 450 Loyalty Points with this Order?
              </h5>
              <p className="text-[11px] text-[#7A7A7A] leading-relaxed">
                Create a member profile or sign in to save your active tickets, order history, and earn complimentary champagne.
              </p>
            </div>
          </div>

          <div className="flex gap-2 pt-1">
            <button
              onClick={() => {
                closeOrderStatus();
                navigate('/login');
              }}
              className="flex-1 py-2 rounded-xl bg-[#1B3A2D] text-white text-xs font-bold text-center hover:bg-[#2A5A44] transition-colors cursor-pointer"
            >
              Sign In &amp; Claim Points
            </button>
            <button
              onClick={closeOrderStatus}
              className="flex-1 py-2 rounded-xl border border-[#D5D2CC] bg-white text-[#4A4A4A] text-xs font-bold text-center hover:bg-[#E8E6E1] transition-colors cursor-pointer"
            >
              Continue as Guest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

