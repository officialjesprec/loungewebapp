import React, { useState } from 'react';
import { MenuItem, KdsOrder } from '../types/hospitality.ts';
import { LOUNGE_IMAGE } from '../data/mockData.ts';
import { formatNaira } from '../utils/pricingRules.ts';
import { Utensils, Wine, Sparkles, QrCode, Clock, CheckCircle2, ShoppingBag, Plus, Minus, ArrowRight, AlertCircle, ChefHat } from 'lucide-react';

interface LoungeViewProps {
  menuItems: MenuItem[];
  onPlaceOrder: (order: {
    tableNumber: string;
    guestName: string;
    items: { id: string; name: string; qty: number; price: number; station: 'bar' | 'kitchen' }[];
    totalAmount: number;
    notes?: string;
  }) => void;
  activeOrders: KdsOrder[];
  onOpenAdminCrm: () => void;
}

export const LoungeView: React.FC<LoungeViewProps> = ({
  menuItems,
  onPlaceOrder,
  activeOrders,
  onOpenAdminCrm,
}) => {
  const [selectedTable, setSelectedTable] = useState<string>('Table 12');
  const [guestName, setGuestName] = useState<string>('John Doe');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [cart, setCart] = useState<Record<string, number>>({
    'menu-1': 1, // Smoked Suya & Asun Grand Platter (Scenario 2 prompt reference!)
    'menu-3': 2, // 2x Emerald Smoked Negroni
  });
  const [orderNotes, setOrderNotes] = useState<string>('Deliver negronis with extra rosemary; platter extra spicy.');
  const [recentPlacedOrder, setRecentPlacedOrder] = useState<KdsOrder | null>(null);

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'food_platters', label: 'Food Platters' },
    { id: 'signature_cocktails', label: 'Signature Cocktails' },
    { id: 'tapas', label: 'Tapas & Small Plates' },
    { id: 'champagne', label: 'Champagne & Wines' },
  ];

  const filteredItems = menuItems.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const updateCartQty = (id: string, delta: number) => {
    setCart((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: next };
    });
  };

  const cartItemsList = Object.entries(cart)
    .map(([id, qty]) => {
      const item = menuItems.find((m) => m.id === id);
      if (!item) return null;
      return {
        id: item.id,
        name: item.name,
        qty,
        price: item.price,
        station: item.station,
      };
    })
    .filter(Boolean) as { id: string; name: string; qty: number; price: number; station: 'bar' | 'kitchen' }[];

  const cartTotal = cartItemsList.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleSendOrderToKds = () => {
    if (cartItemsList.length === 0) return;

    const newOrder: KdsOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      tableNumber: selectedTable,
      guestName,
      items: cartItemsList,
      totalAmount: cartTotal,
      status: 'sent_to_kds',
      createdAt: 'Just now',
      notes: orderNotes,
    };

    onPlaceOrder({
      tableNumber: selectedTable,
      guestName,
      items: cartItemsList,
      totalAmount: cartTotal,
      notes: orderNotes,
    });

    setRecentPlacedOrder(newOrder);
    setCart({});
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Prominent Physical Problem vs Digital Solution Showcase */}
      <div className="bg-white border border-[#EAE5DC] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-serif text-[#C67D0A] uppercase tracking-wider font-semibold">
            <span>Operational Bottleneck vs Digital Solution · Lounge Vertical</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#143D2B]">
            Scenario 2: The Bottleneck at the Bar (The Lounge)
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] font-serif">
            How our table QR code menu and split Bar & Kitchen Display System eliminate stranded orders and boost table turnover.
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
                Your lounge is at 100% capacity. A table of 6 has finished their first round of drinks and is ready for more, plus food. They look around, but all waiters are currently attending to other tables or walking back and forth to the kitchen. After waiting 15 minutes to place an order, the mood dies down. Instead of ordering a second round and a platter, they flag down a waiter just to ask for the bill. You lost a significant upsell simply because your staff is human and can only be in one place at a time.
              </p>
            </div>
            <div className="pt-2 border-t border-red-200/50 text-[11px] text-red-700 font-semibold">
              Cost to Business: Lost ₦48,000 platter + ₦37,000 cocktails; premature bill request.
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
                Every table has a sleek, branded QR code. The guests scan it with their phone camera, opening your interactive digital menu. They select their next round of drinks and a food platter, inputting their table number (e.g., <strong>Table 12</strong>). They hit &apos;Order&apos;. The ticket prints instantly at the bar and the kitchen display system (KDS). The waiter&apos;s only job is to deliver the finished product. You increase table turnover, maximize order volume, and drastically reduce wait times.
              </p>
            </div>
            <div className="pt-2 border-t border-[#143D2B]/20 text-[11px] text-[#143D2B] font-semibold flex items-center justify-between">
              <span>Outcome: +45% Table Turnover</span>
              <span className="font-mono-nums text-[#C67D0A]">&lt; 3 Min Ticket Routing</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Menu (Left) + Table QR Cart (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Digital Menu Catalog */}
        <div className="lg:col-span-8 space-y-6">
          {/* Table Header Bar & Table Selector Simulation */}
          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#EAE5DC] shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#143D2B]/10 text-[#143D2B] flex items-center justify-center">
                <QrCode className="w-5 h-5 text-[#143D2B]" />
              </div>
              <div>
                <div className="text-xs font-serif text-[#777777] uppercase tracking-wider">Simulated Scanned Table</div>
                <div className="font-display text-xl font-bold text-[#143D2B]">{selectedTable}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-[#555555] font-serif">Change Table:</span>
              <select
                value={selectedTable}
                onChange={(e) => setSelectedTable(e.target.value)}
                className="px-3 py-1.5 text-xs font-serif rounded-lg border border-[#EAE5DC] bg-[#FAF8F5] text-[#143D2B] font-semibold focus:outline-none focus:border-[#143D2B] cursor-pointer"
              >
                <option value="Table 12">Table 12 (Lounge Center)</option>
                <option value="Table 4">Table 4 (Balcony High Top)</option>
                <option value="Table 8">Table 8 (Private Booth)</option>
                <option value="Table 1">Table 1 (Bar Front)</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs font-serif whitespace-nowrap rounded-lg transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#143D2B] text-white font-semibold shadow-xs'
                    : 'bg-white text-[#555555] border border-[#EAE5DC] hover:text-[#143D2B]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredItems.map((item) => {
              const inCartQty = cart[item.id] || 0;
              return (
                <div
                  key={item.id}
                  className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                    item.isAvailable
                      ? 'bg-white border-[#EAE5DC] hover:border-[#143D2B]/40 shadow-xs'
                      : 'bg-[#FAF8F5] border-[#EAE5DC] opacity-60'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-display text-base font-bold text-[#143D2B] leading-snug">
                        {item.name}
                      </h4>
                      <span className="font-mono-nums font-bold text-sm text-[#143D2B] shrink-0">
                        {formatNaira(item.price)}
                      </span>
                    </div>

                    <p className="text-xs text-[#555555] font-serif leading-relaxed line-clamp-2">
                      {item.description}
                    </p>

                    <div className="flex items-center gap-3 text-[11px] text-[#777777] font-serif pt-1">
                      <span className="flex items-center gap-1">
                        {item.station === 'bar' ? (
                          <Wine className="w-3 h-3 text-[#C67D0A]" />
                        ) : (
                          <ChefHat className="w-3 h-3 text-[#143D2B]" />
                        )}
                        <span className="capitalize">{item.station} Station</span>
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1 font-mono-nums">
                        <Clock className="w-3 h-3" />
                        <span>~{item.prepTimeMinutes} mins</span>
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#EAE5DC] flex items-center justify-between">
                    {item.isAvailable ? (
                      <span className="text-[11px] text-[#143D2B] font-semibold">Available</span>
                    ) : (
                      <span className="text-[11px] text-red-600 font-semibold">Temporarily Out of Stock</span>
                    )}

                    {item.isAvailable && (
                      <div className="flex items-center gap-2">
                        {inCartQty > 0 ? (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateCartQty(item.id, -1)}
                              className="w-7 h-7 rounded border border-[#EAE5DC] bg-[#FAF8F5] text-xs font-bold flex items-center justify-center hover:bg-white cursor-pointer"
                            >
                              -
                            </button>
                            <span className="w-6 text-center text-xs font-bold font-mono-nums">{inCartQty}</span>
                            <button
                              onClick={() => updateCartQty(item.id, 1)}
                              className="w-7 h-7 rounded border border-[#143D2B] bg-[#143D2B] text-white text-xs font-bold flex items-center justify-center hover:bg-[#1E553C] cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => updateCartQty(item.id, 1)}
                            className="px-3 py-1.5 bg-[#FAF8F5] hover:bg-[#143D2B] hover:text-white text-[#143D2B] border border-[#143D2B]/30 text-xs font-serif font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add to Order</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Live Table Cart & Order Dispatch */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-[#EAE5DC] p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-[#EAE5DC] pb-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#143D2B]" />
                <h3 className="font-display text-lg font-bold text-[#143D2B]">
                  {selectedTable} Ticket
                </h3>
              </div>
              <span className="text-xs font-mono-nums text-[#777777]">
                {cartItemsList.length} items
              </span>
            </div>

            {/* Cart Items List */}
            {cartItemsList.length === 0 ? (
              <div className="py-8 text-center space-y-2">
                <p className="text-xs text-[#777777] font-serif">Your table ticket is currently empty.</p>
                <p className="text-[11px] text-[#555555]">
                  Select craft cocktails or food platters from the left menu.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {cartItemsList.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs py-1 border-b border-[#EAE5DC]/60">
                    <div className="min-w-0 pr-2">
                      <div className="font-bold text-[#143D2B] truncate">{item.name}</div>
                      <div className="text-[10px] text-[#777777]">
                        <span className="capitalize">{item.station}</span> · <span className="font-mono-nums">{formatNaira(item.price)} each</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => updateCartQty(item.id, -1)}
                        className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center text-xs cursor-pointer"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold font-mono-nums">{item.qty}</span>
                      <button
                        onClick={() => updateCartQty(item.id, 1)}
                        className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center text-xs cursor-pointer"
                      >
                        +
                      </button>
                      <span className="font-mono-nums font-bold text-xs ml-1 w-16 text-right">
                        {formatNaira(item.price * item.qty)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Kitchen & Bar Notes Input */}
            <div className="space-y-1.5 pt-2">
              <label className="text-[11px] font-serif text-[#777777] uppercase tracking-wider">
                Special Prep Notes (e.g. ice, pepper level)
              </label>
              <textarea
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                rows={2}
                placeholder="e.g. Extra yaji spice, prompt cocktail delivery"
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#EAE5DC] bg-[#FAF8F5] focus:outline-none focus:border-[#143D2B]"
              />
            </div>

            {/* Totals */}
            <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#EAE5DC] space-y-2 text-xs font-serif">
              <div className="flex justify-between text-[#555555]">
                <span>Routing Breakdown:</span>
                <span className="font-semibold text-[#143D2B]">
                  {cartItemsList.filter((i) => i.station === 'bar').length} Bar ·{' '}
                  {cartItemsList.filter((i) => i.station === 'kitchen').length} Kitchen
                </span>
              </div>
              <div className="border-t border-[#EAE5DC] pt-2 flex justify-between items-center text-sm font-bold text-[#143D2B]">
                <span>Ticket Total:</span>
                <span className="font-mono-nums text-lg text-[#143D2B]">{formatNaira(cartTotal)}</span>
              </div>
            </div>

            {/* Submit Action */}
            <button
              onClick={handleSendOrderToKds}
              disabled={cartItemsList.length === 0}
              className="w-full py-3.5 bg-[#143D2B] hover:bg-[#1E553C] disabled:opacity-40 text-white font-serif font-semibold text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#E09622]" />
              <span>Send Order to Bar & KDS</span>
            </button>
          </div>

          {/* Active Orders Tracker on this table */}
          {recentPlacedOrder && (
            <div className="bg-[#FAF8F5] border border-[#143D2B]/30 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-[#143D2B]">
                  <CheckCircle2 className="w-4 h-4 text-[#143D2B]" />
                  <span>Ticket Dispatched Successfully!</span>
                </div>
                <span className="text-[10px] font-mono-nums bg-[#143D2B] text-white px-2 py-0.5 rounded">
                  {recentPlacedOrder.id}
                </span>
              </div>

              <p className="text-xs text-[#555555] font-serif leading-relaxed">
                Order sent to the Bar & Kitchen Display Systems. The waiter will bring the finished platter directly to {selectedTable}.
              </p>

              <div className="pt-2 border-t border-[#EAE5DC] flex justify-between items-center">
                <span className="text-[11px] text-[#777777] font-serif">Simulate Staff Queue:</span>
                <button
                  onClick={onOpenAdminCrm}
                  className="text-xs font-serif font-semibold text-[#C67D0A] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>View in Admin KDS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
