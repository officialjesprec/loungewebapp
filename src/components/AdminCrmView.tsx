import React, { useState } from 'react';
import { BookingRecord, GuestProfile, KdsOrder, MenuItem, VIPTable } from '../types/hospitality.ts';
import { formatNaira } from '../utils/pricingRules.ts';
import {
  ShieldCheck,
  TrendingUp,
  Users,
  Utensils,
  Wine,
  ChefHat,
  Clock,
  CheckCircle2,
  AlertTriangle,
  QrCode,
  Send,
  MessageSquare,
  Search,
  Sparkles,
  SlidersHorizontal,
  ChevronRight,
  Plus,
  Trash2,
  Edit2,
  BarChart3,
  CalendarCheck,
  DollarSign,
  Ticket,
  BedDouble,
  X,
  CreditCard,
} from 'lucide-react';

interface AdminCrmViewProps {
  guests: GuestProfile[];
  orders: KdsOrder[];
  menuItems: MenuItem[];
  tables: VIPTable[];
  bookings: BookingRecord[];
  onToggleMenuItemStock: (itemId: string) => void;
  onUpdateOrderStatus: (orderId: string, status: KdsOrder['status']) => void;
  onSendCampaign: (guestId: string, channel: 'SMS' | 'Email', message: string) => void;
  onVerifyQrCode: (code: string) => { valid: boolean; guestName?: string; details?: string };
  onAddMenuItem: (newItem: Omit<MenuItem, 'id'>) => void;
  onDeleteMenuItem: (id: string) => void;
  onUpdateMenuItemPrice: (id: string, newPrice: number) => void;
  onCheckInBooking: (bookingId: string) => void;
}

export const AdminCrmView: React.FC<AdminCrmViewProps> = ({
  guests,
  orders,
  menuItems,
  tables,
  bookings,
  onToggleMenuItemStock,
  onUpdateOrderStatus,
  onSendCampaign,
  onVerifyQrCode,
  onAddMenuItem,
  onDeleteMenuItem,
  onUpdateMenuItemPrice,
  onCheckInBooking,
}) => {
  const [activeAdminSubTab, setActiveAdminSubTab] = useState<'analytics' | 'crm' | 'menu' | 'bookings' | 'kds' | 'door_scanner'>('analytics');
  const [searchGuestQuery, setSearchGuestQuery] = useState<string>('');
  const [selectedGuest, setSelectedGuest] = useState<GuestProfile>(guests[0]);
  const [campaignChannel, setCampaignChannel] = useState<'SMS' | 'Email'>('SMS');
  const [campaignMessage, setCampaignMessage] = useState<string>(
    'Exclusive VIP Invitation: Chief, VIP Booth 4 and your favored Macallan 18 are reserved this Friday night. Reply 1 to lock in 15% lodge discount.'
  );
  const [campaignSentFeedback, setCampaignSentFeedback] = useState<string | null>(null);

  // New Menu Item Modal State
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState<boolean>(false);
  const [newItemName, setNewItemName] = useState<string>('');
  const [newItemCategory, setNewItemCategory] = useState<MenuItem['category']>('signature_cocktails');
  const [newItemPrice, setNewItemPrice] = useState<number>(18000);
  const [newItemStation, setNewItemStation] = useState<'bar' | 'kitchen'>('bar');
  const [newItemDescription, setNewItemDescription] = useState<string>('');
  const [newItemPrepTime, setNewItemPrepTime] = useState<number>(5);

  // Booking vertical filter
  const [bookingFilter, setBookingFilter] = useState<'All' | 'Club' | 'Hotel' | 'Tickets' | 'Lounge'>('All');

  // Scanner Simulator state
  const [scannedCodeInput, setScannedCodeInput] = useState<string>('CRE8-VIP-BF1-9921');
  const [scanResult, setScanResult] = useState<{
    tested: boolean;
    valid: boolean;
    guestName?: string;
    details?: string;
  } | null>(null);

  const filteredGuests = guests.filter(
    (g) =>
      g.name.toLowerCase().includes(searchGuestQuery.toLowerCase()) ||
      g.email.toLowerCase().includes(searchGuestQuery.toLowerCase()) ||
      g.phone.includes(searchGuestQuery)
  );

  const filteredBookings = bookings.filter((b) => {
    if (bookingFilter === 'All') return true;
    return b.vertical === bookingFilter;
  });

  // Analytics calculations
  const totalMonthlySpendAll = guests.reduce((sum, g) => sum + g.totalSpendNaira, 0);
  const totalClubRevenue = guests.reduce((sum, g) => sum + g.spendBreakdown.club, 0);
  const totalLoungeRevenue = guests.reduce((sum, g) => sum + g.spendBreakdown.lounge, 0);
  const totalHotelRevenue = guests.reduce((sum, g) => sum + g.spendBreakdown.hotel, 0);

  const handleAddNewItemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName) return;
    onAddMenuItem({
      name: newItemName,
      category: newItemCategory,
      price: Number(newItemPrice),
      station: newItemStation,
      description: newItemDescription,
      isAvailable: true,
      prepTimeMinutes: Number(newItemPrepTime),
    });
    setNewItemName('');
    setNewItemDescription('');
    setIsAddItemModalOpen(false);
  };

  const handleSendCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    onSendCampaign(selectedGuest.id, campaignChannel, campaignMessage);
    setCampaignSentFeedback(`Personalized ${campaignChannel} dispatched instantly to ${selectedGuest.name} (${selectedGuest.phone})`);
    setTimeout(() => setCampaignSentFeedback(null), 5000);
  };

  const handleRunScan = () => {
    const result = onVerifyQrCode(scannedCodeInput.trim());
    setScanResult({
      tested: true,
      valid: result.valid,
      guestName: result.guestName,
      details: result.details,
    });
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Top Banner & Sub-Navigation */}
      <div className="bg-white border border-[#EAE5DC] rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-serif text-[#C67D0A] uppercase tracking-wider font-semibold">
            <span>Hospitality Nervous System</span>
            <span className="text-[#555555]">·</span>
            <span>Admin Management CRM</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#143D2B]">
            Unified Operations & Revenue Console
          </h2>
        </div>

        {/* Sub-tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[#FAF8F5] rounded-xl border border-[#EAE5DC] overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveAdminSubTab('analytics')}
            className={`px-3.5 py-2 text-xs font-serif rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeAdminSubTab === 'analytics'
                ? 'bg-[#143D2B] text-white font-semibold shadow-xs'
                : 'text-[#555555] hover:text-[#143D2B]'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Dynamic Dashboard</span>
          </button>

          <button
            onClick={() => setActiveAdminSubTab('crm')}
            className={`px-3.5 py-2 text-xs font-serif rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeAdminSubTab === 'crm'
                ? 'bg-[#143D2B] text-white font-semibold shadow-xs'
                : 'text-[#555555] hover:text-[#143D2B]'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>User Management</span>
          </button>

          <button
            onClick={() => setActiveAdminSubTab('bookings')}
            className={`px-3.5 py-2 text-xs font-serif rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeAdminSubTab === 'bookings'
                ? 'bg-[#143D2B] text-white font-semibold shadow-xs'
                : 'text-[#555555] hover:text-[#143D2B]'
            }`}
          >
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>Bookings & Ticketing</span>
            <span className="text-[10px] font-mono-nums bg-[#143D2B] text-white px-1.5 rounded-full">
              {bookings.length}
            </span>
          </button>

          <button
            onClick={() => setActiveAdminSubTab('menu')}
            className={`px-3.5 py-2 text-xs font-serif rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeAdminSubTab === 'menu'
                ? 'bg-[#143D2B] text-white font-semibold shadow-xs'
                : 'text-[#555555] hover:text-[#143D2B]'
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>Digital Menu Management</span>
          </button>

          <button
            onClick={() => setActiveAdminSubTab('kds')}
            className={`px-3.5 py-2 text-xs font-serif rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeAdminSubTab === 'kds'
                ? 'bg-[#143D2B] text-white font-semibold shadow-xs'
                : 'text-[#555555] hover:text-[#143D2B]'
            }`}
          >
            <ChefHat className="w-3.5 h-3.5" />
            <span>Live KDS Queue</span>
            <span className="text-[10px] font-mono-nums bg-[#C67D0A] text-white px-1.5 py-0.2 rounded-full">
              {orders.filter((o) => o.status !== 'delivered').length}
            </span>
          </button>

          <button
            onClick={() => setActiveAdminSubTab('door_scanner')}
            className={`px-3.5 py-2 text-xs font-serif rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeAdminSubTab === 'door_scanner'
                ? 'bg-[#143D2B] text-white font-semibold shadow-xs'
                : 'text-[#555555] hover:text-[#143D2B]'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Door Scanner</span>
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: DYNAMIC DASHBOARD & KEY ANALYTICS */}
      {activeAdminSubTab === 'analytics' && (
        <div className="space-y-8">
          {/* Top 4 KPI Metrics Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#EAE5DC] shadow-xs space-y-2">
              <span className="text-xs text-[#777777] font-serif uppercase tracking-wider">Total Ecosystem Revenue</span>
              <div className="font-display text-3xl font-bold text-[#143D2B] font-mono-nums">
                {formatNaira(totalMonthlySpendAll)}
              </div>
              <div className="text-[11px] text-[#555555] flex items-center gap-1">
                <span className="text-emerald-700 font-bold">+28%</span>
                <span>vs previous month (Zero 3P OTA leak)</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#EAE5DC] shadow-xs space-y-2">
              <span className="text-xs text-[#777777] font-serif uppercase tracking-wider">Active Table Bookings</span>
              <div className="font-display text-3xl font-bold text-[#143D2B] font-mono-nums">
                {tables.filter((t) => t.status === 'reserved' || t.status === 'occupied').length} / {tables.length}
              </div>
              <div className="text-[11px] text-[#555555]">
                {Math.round((tables.filter((t) => t.status !== 'available').length / tables.length) * 100)}% Club Capacity Reserved
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#EAE5DC] shadow-xs space-y-2">
              <span className="text-xs text-[#777777] font-serif uppercase tracking-wider">Event-to-Stay Conversion</span>
              <div className="font-display text-3xl font-bold text-[#C67D0A] font-mono-nums">34.2%</div>
              <div className="text-[11px] text-[#555555]">Party guests adding hotel lodge rooms</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#EAE5DC] shadow-xs space-y-2">
              <span className="text-xs text-[#777777] font-serif uppercase tracking-wider">Ticketing Fees Saved</span>
              <div className="font-display text-3xl font-bold text-[#143D2B] font-mono-nums">₦485,000</div>
              <div className="text-[11px] text-[#555555]">Direct ticketing vs 15% OTA commissions</div>
            </div>
          </div>

          {/* Revenue by Vertical & Customer Spending Habits */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Revenue Distribution Across Verticals */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-[#EAE5DC] p-6 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-[#EAE5DC] pb-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-[#143D2B]">Revenue Across Verticals</h3>
                  <p className="text-xs text-[#555555] font-serif">
                    Tracking real-time spend across Lounge, Nightclub, and Hotel pillars.
                  </p>
                </div>
                <span className="text-xs font-mono-nums font-semibold bg-[#FAF8F5] text-[#143D2B] px-3 py-1 rounded border border-[#EAE5DC]">
                  This Month
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-serif mb-1.5">
                    <span className="font-semibold text-[#143D2B]">Nightclub VIP Table Reservations & Bottles</span>
                    <span className="font-mono-nums font-bold text-[#143D2B]">{formatNaira(totalClubRevenue)}</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-[#143D2B] rounded-full transition-all duration-500"
                      style={{ width: `${(totalClubRevenue / totalMonthlySpendAll) * 100}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-[#777777] text-right mt-1 font-mono-nums">
                    {Math.round((totalClubRevenue / totalMonthlySpendAll) * 100)}% of total revenue
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-serif mb-1.5">
                    <span className="font-semibold text-[#C67D0A]">Lounge Dining & Craft Mixology (In-Venue QR)</span>
                    <span className="font-mono-nums font-bold text-[#C67D0A]">{formatNaira(totalLoungeRevenue)}</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-[#C67D0A] rounded-full transition-all duration-500"
                      style={{ width: `${(totalLoungeRevenue / totalMonthlySpendAll) * 100}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-[#777777] text-right mt-1 font-mono-nums">
                    {Math.round((totalLoungeRevenue / totalMonthlySpendAll) * 100)}% of total revenue
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-serif mb-1.5">
                    <span className="font-semibold text-emerald-800">Hotel Lodge & Sanctuary Suites (Smart Cross-Sell)</span>
                    <span className="font-mono-nums font-bold text-emerald-800">{formatNaira(totalHotelRevenue)}</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-emerald-700 rounded-full transition-all duration-500"
                      style={{ width: `${(totalHotelRevenue / totalMonthlySpendAll) * 100}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-[#777777] text-right mt-1 font-mono-nums">
                    {Math.round((totalHotelRevenue / totalMonthlySpendAll) * 100)}% of total revenue
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#EAE5DC] text-xs text-[#555555] font-serif leading-relaxed flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-[#C67D0A] shrink-0 mt-0.5" />
                <span>
                  <strong>Ecosystem Synergy:</strong> Guests who book a VIP Club table spend an average of ₦145,000 at the Lounge and generate a 34% conversion rate into lodge room reservations, eliminating third-party OTA commissions.
                </span>
              </div>
            </div>

            {/* Popular Items & Bottlenecks Eliminated */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-[#EAE5DC] p-6 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-[#EAE5DC] pb-4">
                <h3 className="font-display text-xl font-bold text-[#143D2B]">Top Performing Offerings</h3>
                <span className="text-xs text-[#777777] font-serif">Volume & Velocity</span>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl border border-[#EAE5DC] bg-[#FAF8F5] flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-[#143D2B]">Don Julio 1942 Añejo</div>
                    <div className="text-[10px] text-[#555555]">Nightclub VIP Table Pre-order · Iced</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-[#143D2B] font-mono-nums">₦580,000</div>
                    <div className="text-[10px] text-[#C67D0A] font-semibold">14 Bottles Pre-ordered</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-[#EAE5DC] bg-[#FAF8F5] flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-[#143D2B]">Smoked Suya & Asun Grand Platter</div>
                    <div className="text-[10px] text-[#555555]">Lounge In-Venue QR · Kitchen Station</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-[#143D2B] font-mono-nums">₦48,000</div>
                    <div className="text-[10px] text-[#C67D0A] font-semibold">42 Platters Dispatched</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-[#EAE5DC] bg-[#FAF8F5] flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-[#143D2B]">The Standard Lodge Room (Post-Party)</div>
                    <div className="text-[10px] text-[#555555]">Automated 15% Event-to-Stay Cross-Sell</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-[#143D2B] font-mono-nums">₦68,000</div>
                    <div className="text-[10px] text-[#C67D0A] font-semibold">18 Rooms Converted</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-[#EAE5DC] bg-[#FAF8F5] flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-[#143D2B]">The Cre8 Emerald Smoked Negroni</div>
                    <div className="text-[10px] text-[#555555]">Signature Mixology · Bar Station</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-[#143D2B] font-mono-nums">₦18,500</div>
                    <div className="text-[10px] text-[#C67D0A] font-semibold">68 Cocktails Served</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: USER MANAGEMENT & CRM */}
      {activeAdminSubTab === 'crm' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Guest Directory List */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-[#EAE5DC] p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-lg font-bold text-[#143D2B]">Customer Directory</h3>
                  <p className="text-xs text-[#555555] font-serif">View profiles, purchase history & tiers</p>
                </div>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-[#777777]" />
                  <input
                    type="text"
                    value={searchGuestQuery}
                    onChange={(e) => setSearchGuestQuery(e.target.value)}
                    placeholder="Search guest..."
                    className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-[#EAE5DC] bg-[#FAF8F5] focus:outline-none focus:border-[#143D2B]"
                  />
                </div>
              </div>

              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                {filteredGuests.map((guest) => {
                  const isSelected = guest.id === selectedGuest.id;
                  return (
                    <div
                      key={guest.id}
                      onClick={() => setSelectedGuest(guest)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#143D2B]/5 border-2 border-[#143D2B]'
                          : 'bg-[#FAF8F5] border-[#EAE5DC] hover:border-[#143D2B]/30'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#143D2B]">{guest.name}</span>
                          <span className="text-[9px] bg-[#143D2B] text-white px-1.5 py-0.2 rounded font-mono-nums">
                            {guest.vipTier}
                          </span>
                        </div>
                        <div className="text-[11px] text-[#555555]">{guest.phone}</div>
                        <div className="text-[10px] text-[#777777] font-serif">{guest.lastVisit}</div>
                      </div>

                      <div className="text-right">
                        <div className="text-xs font-bold text-[#143D2B] font-mono-nums">
                          {formatNaira(guest.totalSpendNaira)}
                        </div>
                        <div className="text-[10px] text-[#C67D0A] font-mono-nums">
                          {guest.loyaltyPoints.toLocaleString()} pts
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Guest Detailed Profile & Purchase History */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-[#EAE5DC] p-6 shadow-xs space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#EAE5DC] pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-2xl font-bold text-[#143D2B]">{selectedGuest.name}</h3>
                    <span className="text-xs bg-[#C67D0A] text-white font-bold px-2 py-0.5 rounded font-mono-nums">
                      {selectedGuest.vipTier}
                    </span>
                  </div>
                  <div className="text-xs text-[#555555] font-serif">
                    {selectedGuest.email} · {selectedGuest.phone}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[11px] text-[#777777] font-serif uppercase tracking-wider">Total Lifetime Spend</div>
                  <div className="font-display text-2xl font-bold text-[#143D2B] font-mono-nums">
                    {formatNaira(selectedGuest.totalSpendNaira)}
                  </div>
                </div>
              </div>

              {/* Purchase History Ledger */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-serif text-[#777777] uppercase tracking-wider">
                  <span>Customer Purchase History Across Verticals</span>
                  <span>{selectedGuest.transactionHistory.length} Orders Recorded</span>
                </div>

                <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                  {selectedGuest.transactionHistory.map((txn) => (
                    <div
                      key={txn.id}
                      className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EAE5DC] flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-bold text-[#143D2B]">{txn.type} ({txn.vertical})</div>
                        <div className="text-[11px] text-[#777777]">{txn.date} · Ref: {txn.receiptRef}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono-nums font-bold text-[#143D2B]">{formatNaira(txn.amountNaira)}</div>
                        <span className="text-[10px] text-emerald-800 font-semibold">{txn.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guest Notes & Personalized Campaign Trigger */}
              <form onSubmit={handleSendCampaign} className="space-y-3 pt-3 border-t border-[#EAE5DC]">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-serif text-[#777777] uppercase tracking-wider font-semibold">
                    Target {selectedGuest.name} with Personalized Campaign
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setCampaignChannel('SMS')}
                      className={`px-2.5 py-1 text-xs font-serif rounded ${
                        campaignChannel === 'SMS' ? 'bg-[#143D2B] text-white font-bold' : 'bg-slate-100 text-[#555555]'
                      }`}
                    >
                      Direct SMS
                    </button>
                    <button
                      type="button"
                      onClick={() => setCampaignChannel('Email')}
                      className={`px-2.5 py-1 text-xs font-serif rounded ${
                        campaignChannel === 'Email' ? 'bg-[#143D2B] text-white font-bold' : 'bg-slate-100 text-[#555555]'
                      }`}
                    >
                      VIP Email
                    </button>
                  </div>
                </div>

                <textarea
                  value={campaignMessage}
                  onChange={(e) => setCampaignMessage(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#EAE5DC] bg-[#FAF8F5] focus:outline-none focus:border-[#143D2B]"
                />

                <div className="flex items-center justify-between">
                  {campaignSentFeedback ? (
                    <span className="text-xs text-[#143D2B] font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#143D2B]" />
                      <span>{campaignSentFeedback}</span>
                    </span>
                  ) : (
                    <span className="text-[11px] text-[#777777] font-serif">
                      Sends directly to line {selectedGuest.phone}
                    </span>
                  )}

                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#143D2B] hover:bg-[#1E553C] text-white text-xs font-serif font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5 text-[#E09622]" />
                    <span>Send {campaignChannel}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: BOOKINGS & ZERO-COMMISSION TICKETING MANAGER */}
      {activeAdminSubTab === 'bookings' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-[#EAE5DC] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-xl font-bold text-[#143D2B]">
                Bookings & Ticketing Management System
              </h3>
              <p className="text-xs text-[#555555] font-serif">
                Manage table reservations, keyless hotel suites, and direct zero-commission event passes in one unified feed.
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1 bg-[#FAF8F5] p-1 rounded-xl border border-[#EAE5DC]">
              {(['All', 'Club', 'Hotel', 'Tickets', 'Lounge'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setBookingFilter(filter)}
                  className={`px-3 py-1.5 text-xs font-serif rounded-lg transition-all cursor-pointer ${
                    bookingFilter === filter
                      ? 'bg-[#143D2B] text-white font-semibold'
                      : 'text-[#555555] hover:text-[#143D2B]'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#EAE5DC] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-serif">
                <thead className="bg-[#FAF8F5] border-b border-[#EAE5DC] text-[#777777] uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="p-4">Reference / Guest</th>
                    <th className="p-4">Vertical</th>
                    <th className="p-4">Details & Pre-Orders</th>
                    <th className="p-4">Date / Time</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE5DC]">
                  {filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-[#143D2B]">{b.guestName}</div>
                        <div className="text-[11px] text-[#777777] font-mono-nums">{b.reference}</div>
                        <div className="text-[10px] text-[#555555]">{b.guestPhone}</div>
                      </td>
                      <td className="p-4">
                        <span className="text-[10px] font-bold bg-[#FAF8F5] text-[#143D2B] px-2 py-0.5 rounded border border-[#EAE5DC]">
                          {b.vertical}
                        </span>
                      </td>
                      <td className="p-4 max-w-xs text-[#555555] leading-relaxed">
                        {b.details}
                      </td>
                      <td className="p-4 font-mono-nums text-[#555555]">{b.date}</td>
                      <td className="p-4 font-mono-nums font-bold text-[#143D2B]">{formatNaira(b.amountNaira)}</td>
                      <td className="p-4">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            b.status === 'Checked In'
                              ? 'bg-emerald-100 text-emerald-800'
                              : b.status === 'Confirmed'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        {b.status === 'Confirmed' ? (
                          <button
                            onClick={() => onCheckInBooking(b.id)}
                            className="px-3 py-1.5 bg-[#143D2B] hover:bg-[#1E553C] text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors"
                          >
                            Admit / Check In
                          </button>
                        ) : (
                          <span className="text-[11px] text-emerald-800 font-semibold flex items-center justify-end gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Admitted</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: DIGITAL MENU MANAGEMENT (Add/Remove & Price Adjustments) */}
      {activeAdminSubTab === 'menu' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-[#EAE5DC] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-xl font-bold text-[#143D2B]">Digital Menu Management Engine</h3>
              <p className="text-xs text-[#555555] font-serif">
                Add new items, adjust pricing live for event surges, and instantly toggle out-of-stock items off patron QR menus.
              </p>
            </div>

            <button
              onClick={() => setIsAddItemModalOpen(true)}
              className="px-4 py-2.5 bg-[#143D2B] hover:bg-[#1E553C] text-white font-serif text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4 text-[#E09622]" />
              <span>Add New Menu Offering</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-[#EAE5DC] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-serif">
                <thead className="bg-[#FAF8F5] border-b border-[#EAE5DC] text-[#777777] uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="p-4">Item Name & Description</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Station</th>
                    <th className="p-4">Price Adjustment</th>
                    <th className="p-4">In-Stock Toggle</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE5DC]">
                  {menuItems.map((item) => (
                    <tr key={item.id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                      <td className="p-4 max-w-xs">
                        <div className="font-bold text-[#143D2B] text-sm">{item.name}</div>
                        <div className="text-[11px] text-[#777777] line-clamp-1">{item.description}</div>
                      </td>
                      <td className="p-4 capitalize text-[#555555]">{item.category.replace('_', ' ')}</td>
                      <td className="p-4 capitalize text-[#555555]">{item.station} station</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono-nums font-bold text-sm text-[#143D2B]">
                            {formatNaira(item.price)}
                          </span>
                          <button
                            onClick={() => {
                              const newPriceStr = prompt(`Enter new price for ${item.name}:`, String(item.price));
                              if (newPriceStr && !isNaN(Number(newPriceStr))) {
                                onUpdateMenuItemPrice(item.id, Number(newPriceStr));
                              }
                            }}
                            className="p-1 hover:bg-[#FAF8F5] rounded border border-[#EAE5DC] text-[#777777] hover:text-[#143D2B] cursor-pointer"
                            title="Edit price"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => onToggleMenuItemStock(item.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5 ${
                            item.isAvailable
                              ? 'bg-[#143D2B] text-white hover:bg-[#1E553C]'
                              : 'bg-red-100 text-red-800 hover:bg-red-200'
                          }`}
                        >
                          <span className={`w-2 h-2 rounded-full ${item.isAvailable ? 'bg-[#E09622]' : 'bg-red-600'}`} />
                          <span>{item.isAvailable ? 'In Stock (Active)' : 'Out of Stock (Hidden)'}</span>
                        </button>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => {
                            if (confirm(`Remove ${item.name} from digital menu?`)) {
                              onDeleteMenuItem(item.id);
                            }
                          }}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add Item Modal */}
          {isAddItemModalOpen && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl max-w-md w-full border border-[#EAE5DC] shadow-2xl p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-[#EAE5DC] pb-4">
                  <h3 className="font-display text-xl font-bold text-[#143D2B]">Add New Menu Item</h3>
                  <button
                    onClick={() => setIsAddItemModalOpen(false)}
                    className="text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleAddNewItemSubmit} className="space-y-4 text-xs font-serif">
                  <div>
                    <label className="text-[11px] text-[#777777] uppercase tracking-wider block mb-1">Item Name</label>
                    <input
                      type="text"
                      required
                      value={newItemName}
                      onChange={(e) => setNewItemName(e.target.value)}
                      placeholder="e.g. Vintage Rosé Champagne"
                      className="w-full px-3 py-2 rounded-lg border border-[#EAE5DC] bg-[#FAF8F5] focus:outline-none focus:border-[#143D2B]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-[#777777] uppercase tracking-wider block mb-1">Category</label>
                      <select
                        value={newItemCategory}
                        onChange={(e) => setNewItemCategory(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-lg border border-[#EAE5DC] bg-[#FAF8F5]"
                      >
                        <option value="signature_cocktails">Signature Cocktails</option>
                        <option value="food_platters">Food Platters</option>
                        <option value="tapas">Tapas & Small Plates</option>
                        <option value="champagne">Champagne & Wines</option>
                        <option value="reserve_spirits">Reserve Spirits</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] text-[#777777] uppercase tracking-wider block mb-1">Prep Station</label>
                      <select
                        value={newItemStation}
                        onChange={(e) => setNewItemStation(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-lg border border-[#EAE5DC] bg-[#FAF8F5]"
                      >
                        <option value="bar">Bar (Cocktails / Bottles)</option>
                        <option value="kitchen">Kitchen (Food / Platters)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-[#777777] uppercase tracking-wider block mb-1">Price (₦ Naira)</label>
                      <input
                        type="number"
                        required
                        value={newItemPrice}
                        onChange={(e) => setNewItemPrice(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-lg border border-[#EAE5DC] bg-[#FAF8F5] font-mono-nums"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-[#777777] uppercase tracking-wider block mb-1">Prep Time (mins)</label>
                      <input
                        type="number"
                        required
                        value={newItemPrepTime}
                        onChange={(e) => setNewItemPrepTime(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-lg border border-[#EAE5DC] bg-[#FAF8F5] font-mono-nums"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-[#777777] uppercase tracking-wider block mb-1">Description</label>
                    <textarea
                      required
                      value={newItemDescription}
                      onChange={(e) => setNewItemDescription(e.target.value)}
                      rows={2}
                      placeholder="Artisanal description for digital QR menu..."
                      className="w-full px-3 py-2 rounded-lg border border-[#EAE5DC] bg-[#FAF8F5]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#143D2B] hover:bg-[#1E553C] text-white font-serif font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    Save & Publish to Digital Menu
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 5: LIVE KDS QUEUE */}
      {activeAdminSubTab === 'kds' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-xl font-bold text-[#143D2B]">Kitchen & Bar Display System (KDS)</h3>
              <p className="text-xs text-[#555555] font-serif">
                Tickets route in real-time from scanned QR table orders. Staff toggle statuses to notify runners.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => {
              const isDelivered = order.status === 'delivered';
              const isReady = order.status === 'ready_to_serve';

              return (
                <div
                  key={order.id}
                  className={`bg-white rounded-2xl border p-5 shadow-xs space-y-4 flex flex-col justify-between ${
                    isDelivered ? 'border-[#EAE5DC] opacity-70' : isReady ? 'border-[#E09622] ring-1 ring-[#E09622]' : 'border-[#143D2B]'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-[#EAE5DC] pb-2">
                      <div>
                        <span className="text-[10px] font-mono-nums text-[#777777]">{order.id}</span>
                        <div className="font-display text-lg font-bold text-[#143D2B]">{order.tableNumber}</div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-[#777777] font-mono-nums">{order.createdAt}</span>
                        <div className="text-xs font-bold capitalize text-[#C67D0A]">{order.status.replace(/_/g, ' ')}</div>
                      </div>
                    </div>

                    <div className="text-xs text-[#555555]">
                      Guest: <strong className="text-[#333333]">{order.guestName}</strong>
                    </div>

                    {/* Ordered items with station badges */}
                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-start justify-between text-xs">
                          <div className="space-y-0.5">
                            <span className="font-bold text-[#143D2B]">{item.qty}x {item.name}</span>
                            <div className="text-[10px] text-[#777777] flex items-center gap-1">
                              {item.station === 'bar' ? (
                                <Wine className="w-3 h-3 text-[#C67D0A]" />
                              ) : (
                                <ChefHat className="w-3 h-3 text-[#143D2B]" />
                              )}
                              <span className="capitalize">{item.station} station</span>
                            </div>
                          </div>
                          <span className="font-mono-nums text-xs text-[#555555]">{formatNaira(item.price * item.qty)}</span>
                        </div>
                      ))}
                    </div>

                    {order.notes && (
                      <div className="p-2 bg-[#FAF8F5] rounded text-[11px] text-[#777777] italic border border-[#EAE5DC]">
                        Note: {order.notes}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-[#EAE5DC] flex items-center justify-between gap-2">
                    <span className="font-mono-nums font-bold text-xs text-[#143D2B]">
                      Total: {formatNaira(order.totalAmount)}
                    </span>

                    <div className="flex items-center gap-1">
                      {order.status === 'sent_to_kds' && (
                        <button
                          onClick={() => onUpdateOrderStatus(order.id, 'preparing')}
                          className="px-2.5 py-1 bg-[#143D2B] text-white text-[11px] font-semibold rounded cursor-pointer hover:bg-[#1E553C]"
                        >
                          Mark Preparing
                        </button>
                      )}
                      {order.status === 'preparing' && (
                        <button
                          onClick={() => onUpdateOrderStatus(order.id, 'ready_to_serve')}
                          className="px-2.5 py-1 bg-[#C67D0A] text-white text-[11px] font-semibold rounded cursor-pointer hover:bg-[#9A6006]"
                        >
                          Ready to Serve
                        </button>
                      )}
                      {order.status === 'ready_to_serve' && (
                        <button
                          onClick={() => onUpdateOrderStatus(order.id, 'delivered')}
                          className="px-2.5 py-1 bg-green-700 text-white text-[11px] font-semibold rounded cursor-pointer hover:bg-green-800"
                        >
                          Delivered
                        </button>
                      )}
                      {order.status === 'delivered' && (
                        <span className="text-[11px] text-green-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Completed</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-TAB 6: DOOR SECURITY SCANNER SIMULATOR */}
      {activeAdminSubTab === 'door_scanner' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-white rounded-2xl border border-[#EAE5DC] p-6 sm:p-8 shadow-xs space-y-6 text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#143D2B]/10 text-[#143D2B] mx-auto flex items-center justify-center">
              <QrCode className="w-8 h-8 text-[#143D2B]" />
            </div>

            <div className="space-y-1">
              <h3 className="font-display text-2xl font-bold text-[#143D2B]">Door Security QR Terminal</h3>
              <p className="text-xs text-[#555555] font-serif">
                Security staff hold mobile scanners or tablets to instantly authenticate VIP table deposits, hotel room passes, or club event tickets.
              </p>
            </div>

            {/* Input simulator */}
            <div className="space-y-3 text-left">
              <label className="text-xs font-serif text-[#777777] uppercase tracking-wider">
                Simulated QR Scanner Buffer Input
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={scannedCodeInput}
                  onChange={(e) => setScannedCodeInput(e.target.value)}
                  placeholder="e.g. CRE8-VIP-BF1-9921"
                  className="flex-1 px-3 py-2 text-xs font-mono-nums rounded-xl border border-[#EAE5DC] bg-[#FAF8F5] focus:outline-none focus:border-[#143D2B]"
                />
                <button
                  onClick={handleRunScan}
                  className="px-5 py-2 bg-[#143D2B] hover:bg-[#1E553C] text-white font-serif text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Scan QR
                </button>
              </div>

              {/* Quick sample chips */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-[#777777]">
                <span>Sample Codes:</span>
                <button
                  type="button"
                  onClick={() => setScannedCodeInput('CRE8-VIP-BF1-9921')}
                  className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 font-mono-nums cursor-pointer"
                >
                  VIP Booth 1
                </button>
                <button
                  type="button"
                  onClick={() => setScannedCodeInput('CRE8-HOTEL-KEY-304')}
                  className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 font-mono-nums cursor-pointer"
                >
                  Hotel Room 304
                </button>
                <button
                  type="button"
                  onClick={() => setScannedCodeInput('INVALID-EXPIRED-CODE')}
                  className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 font-mono-nums cursor-pointer"
                >
                  Invalid Code
                </button>
              </div>
            </div>

            {/* Scan Result Card */}
            {scanResult && scanResult.tested && (
              <div
                className={`p-5 rounded-2xl border text-left space-y-2 ${
                  scanResult.valid
                    ? 'bg-emerald-50/60 border-emerald-300 text-emerald-950'
                    : 'bg-red-50/60 border-red-300 text-red-950'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm">
                  {scanResult.valid ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                      <span>ACCESS GRANTED · VALID ENTRY PASS</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-5 h-5 text-red-700" />
                      <span>ACCESS DENIED · UNRECOGNIZED CODE</span>
                    </>
                  )}
                </div>

                {scanResult.guestName && (
                  <div className="text-xs">
                    Guest Verified: <strong>{scanResult.guestName}</strong>
                  </div>
                )}
                {scanResult.details && (
                  <div className="text-xs text-slate-700 font-serif">
                    Details: {scanResult.details}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
