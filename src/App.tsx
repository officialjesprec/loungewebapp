/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { NavigationTab, VIPTable, MenuItem, HotelRoom, KdsOrder, EventTicket, GuestProfile, BookingRecord } from './types/hospitality.ts';
import {
  INITIAL_VIP_TABLES,
  INITIAL_MENU_ITEMS,
  INITIAL_HOTEL_ROOMS,
  INITIAL_KDS_ORDERS,
  UPCOMING_EVENTS,
  INITIAL_GUESTS,
  INITIAL_BOOKING_RECORDS,
} from './data/mockData.ts';
import { calculateLoyaltyPoints } from './utils/pricingRules.ts';

import { Header } from './components/Header.tsx';
import { ProposalOverview } from './components/ProposalOverview.tsx';
import { ClubView } from './components/ClubView.tsx';
import { LoungeView } from './components/LoungeView.tsx';
import { HotelView } from './components/HotelView.tsx';
import { TicketsLoyaltyView } from './components/TicketsLoyaltyView.tsx';
import { AdminCrmView } from './components/AdminCrmView.tsx';
import { UserProfileView } from './components/UserProfileView.tsx';
import { InvestmentModelsView } from './components/InvestmentModelsView.tsx';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('proposal');

  // Shared Centralized State
  const [tables, setTables] = useState<VIPTable[]>(INITIAL_VIP_TABLES);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_MENU_ITEMS);
  const [rooms, setRooms] = useState<HotelRoom[]>(INITIAL_HOTEL_ROOMS);
  const [orders, setOrders] = useState<KdsOrder[]>(INITIAL_KDS_ORDERS);
  const [events, setEvents] = useState<EventTicket[]>(UPCOMING_EVENTS);
  const [guests, setGuests] = useState<GuestProfile[]>(INITIAL_GUESTS);
  const [bookings, setBookings] = useState<BookingRecord[]>(INITIAL_BOOKING_RECORDS);

  // Active current user (John Doe)
  const currentGuest = guests[0];

  // Handlers for state mutations across ecosystem
  const handleBookTable = (
    tableId: string,
    guestName: string,
    phone: string,
    selectedBottles: { name: string; qty: number; price: number }[],
    depositPaid: number,
    includeHotelRoom: boolean
  ) => {
    const generatedQr = `CRE8-${tableId.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    // Update table state
    setTables((prev) =>
      prev.map((t) => {
        if (t.id === tableId) {
          return {
            ...t,
            status: 'reserved' as const,
            reservation: {
              guestName,
              phone,
              bottles: selectedBottles,
              depositPaid,
              qrCode: generatedQr,
              arrivalTime: '22:30',
            },
          };
        }
        return t;
      })
    );

    // Update guest profile passes, spend, and loyalty points
    const earnedPoints = calculateLoyaltyPoints(depositPaid);
    setGuests((prev) =>
      prev.map((g) => {
        if (g.id === currentGuest.id) {
          const newPasses = [
            {
              id: `pass-${Date.now()}`,
              type: 'VIP Table' as const,
              reference: `VIP Booth (${tableId})`,
              validDate: 'Tonight, 10:30 PM',
              details: `${selectedBottles.length} bottles prepped on ice · 50% deposit paid`,
              status: 'Confirmed' as const,
            },
            ...(includeHotelRoom
              ? [
                  {
                    id: `pass-room-${Date.now()}`,
                    type: 'Hotel Stay' as const,
                    reference: 'Standard Lodge Room 304',
                    validDate: 'Tonight - Checkout 2PM',
                    details: 'Keyless Mobile Check-In · 15% Event-to-Stay Discount',
                    status: 'Confirmed' as const,
                  },
                ]
              : []),
            ...g.activePasses,
          ];

          return {
            ...g,
            totalSpendNaira: g.totalSpendNaira + depositPaid,
            spendBreakdown: {
              ...g.spendBreakdown,
              club: g.spendBreakdown.club + depositPaid,
            },
            loyaltyPoints: g.loyaltyPoints + earnedPoints,
            activePasses: newPasses,
          };
        }
        return g;
      })
    );
  };

  const handlePlaceOrder = (newOrderData: {
    tableNumber: string;
    guestName: string;
    items: { id: string; name: string; qty: number; price: number; station: 'bar' | 'kitchen' }[];
    totalAmount: number;
    notes?: string;
  }) => {
    const orderRecord: KdsOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      tableNumber: newOrderData.tableNumber,
      guestName: newOrderData.guestName,
      items: newOrderData.items,
      totalAmount: newOrderData.totalAmount,
      status: 'sent_to_kds',
      createdAt: 'Just now',
      notes: newOrderData.notes,
    };

    setOrders((prev) => [orderRecord, ...prev]);

    // Update guest spend in lounge
    const earnedPoints = calculateLoyaltyPoints(newOrderData.totalAmount);
    setGuests((prev) =>
      prev.map((g) => {
        if (g.id === currentGuest.id) {
          return {
            ...g,
            totalSpendNaira: g.totalSpendNaira + newOrderData.totalAmount,
            spendBreakdown: {
              ...g.spendBreakdown,
              lounge: g.spendBreakdown.lounge + newOrderData.totalAmount,
            },
            loyaltyPoints: g.loyaltyPoints + earnedPoints,
          };
        }
        return g;
      })
    );
  };

  const handleBookRoom = (
    roomId: string,
    checkInDate: string,
    checkOutDate: string,
    guestName: string,
    isVipRate: boolean
  ) => {
    const targetRoom = rooms.find((r) => r.id === roomId) || rooms[0];
    const pricePaid = isVipRate ? targetRoom.vipCrossSellRate : targetRoom.nightRate;
    const earnedPoints = calculateLoyaltyPoints(pricePaid);

    setGuests((prev) =>
      prev.map((g) => {
        if (g.id === currentGuest.id) {
          return {
            ...g,
            totalSpendNaira: g.totalSpendNaira + pricePaid,
            spendBreakdown: {
              ...g.spendBreakdown,
              hotel: g.spendBreakdown.hotel + pricePaid,
            },
            loyaltyPoints: g.loyaltyPoints + earnedPoints,
            activePasses: [
              {
                id: `room-${Date.now()}`,
                type: 'Hotel Stay' as const,
                reference: targetRoom.name,
                validDate: `${checkInDate} to ${checkOutDate}`,
                details: 'Digital Room Key Activated · Keyless Access',
                status: 'Confirmed' as const,
              },
              ...g.activePasses,
            ],
          };
        }
        return g;
      })
    );
  };

  const handleToggleMenuItemStock = (itemId: string) => {
    setMenuItems((prev) =>
      prev.map((m) => (m.id === itemId ? { ...m, isAvailable: !m.isAvailable } : m))
    );
  };

  const handleUpdateOrderStatus = (orderId: string, status: KdsOrder['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  const handleSendCampaign = (guestId: string, channel: 'SMS' | 'Email', message: string) => {
    setGuests((prev) =>
      prev.map((g) => {
        if (g.id === guestId) {
          return {
            ...g,
            notes: `${g.notes} | Dispatched ${channel} on ${new Date().toLocaleDateString()}: "${message.slice(0, 40)}..."`,
          };
        }
        return g;
      })
    );
  };

  const handleRedeemPerk = (perkTitle: string, pointsCost: number) => {
    setGuests((prev) =>
      prev.map((g) => {
        if (g.id === currentGuest.id) {
          return {
            ...g,
            loyaltyPoints: Math.max(0, g.loyaltyPoints - pointsCost),
            activePasses: [
              {
                id: `voucher-${Date.now()}`,
                type: 'Event Ticket' as const,
                reference: perkTitle,
                validDate: 'Valid for 30 Days',
                details: `Redeemed via ${pointsCost.toLocaleString()} Loyalty Points`,
                status: 'Confirmed' as const,
              },
              ...g.activePasses,
            ],
          };
        }
        return g;
      })
    );
  };

  const handlePurchaseTicket = (
    eventTitle: string,
    tierName: string,
    price: number,
    qty: number
  ) => {
    const total = price * qty;
    const earnedPoints = calculateLoyaltyPoints(total);

    setGuests((prev) =>
      prev.map((g) => {
        if (g.id === currentGuest.id) {
          return {
            ...g,
            totalSpendNaira: g.totalSpendNaira + total,
            loyaltyPoints: g.loyaltyPoints + earnedPoints,
            activePasses: [
              {
                id: `ticket-${Date.now()}`,
                type: 'Event Ticket' as const,
                reference: `${eventTitle} (${tierName})`,
                validDate: 'Friday, Nov 14',
                details: `${qty} Admission pass(es) issued with direct QR`,
                status: 'Confirmed' as const,
              },
              ...g.activePasses,
            ],
          };
        }
        return g;
      })
    );
  };

  const handleVerifyQrCode = (code: string) => {
    const upper = code.toUpperCase();
    if (upper.includes('VIP-BF1') || upper.includes('BF1')) {
      return {
        valid: true,
        guestName: 'Chief Femi Adeleke',
        details: 'VIP Booth 1 (DJ Stage Flank) · ₦500,000 Deposit Paid · 2x Don Julio 1942 + 1x Dom Pérignon on ice',
      };
    }
    if (upper.includes('VIP-BF4') || upper.includes('BF4')) {
      return {
        valid: true,
        guestName: 'John Doe',
        details: 'VIP Booth 4 (The Royal Alcove) · ₦500,000 Deposit Paid · Moët & Don Julio reserved',
      };
    }
    if (upper.includes('HOTEL') || upper.includes('304')) {
      return {
        valid: true,
        guestName: 'John Doe',
        details: 'Standard Lodge Room 304 · Digital Keyless Check-In Authorized',
      };
    }
    if (upper.includes('TIX') || upper.includes('TICKET')) {
      return {
        valid: true,
        guestName: 'Verified Ticket Patron',
        details: 'Lagos Skyline Nocturne · VIP Mezzanine Pass · Fast-track Door Entry',
      };
    }
    return {
      valid: false,
    };
  };

  const handleAddMenuItem = (newItem: Omit<MenuItem, 'id'>) => {
    const item: MenuItem = {
      ...newItem,
      id: `menu-custom-${Date.now()}`,
    };
    setMenuItems((prev) => [item, ...prev]);
  };

  const handleDeleteMenuItem = (id: string) => {
    setMenuItems((prev) => prev.filter((m) => m.id !== id));
  };

  const handleUpdateMenuItemPrice = (id: string, newPrice: number) => {
    setMenuItems((prev) =>
      prev.map((m) => (m.id === id ? { ...m, price: newPrice } : m))
    );
  };

  const handleCheckInBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'Checked In' as const } : b))
    );
  };

  const handleTopUpWallet = (amountNaira: number) => {
    setGuests((prev) =>
      prev.map((g) => {
        if (g.id === currentGuest.id) {
          const newTxn = {
            id: `TXN-WLT-${Date.now()}`,
            date: 'Just now',
            type: 'Top-Up' as const,
            amountNaira,
            vertical: 'Wallet' as const,
            status: 'Completed' as const,
            receiptRef: `REC-WLT-${Math.floor(1000 + Math.random() * 9000)}`,
          };
          return {
            ...g,
            walletBalanceNaira: g.walletBalanceNaira + amountNaira,
            loyaltyPoints: g.loyaltyPoints + Math.floor(amountNaira / 100),
            transactionHistory: [newTxn, ...g.transactionHistory],
          };
        }
        return g;
      })
    );
  };

  const handleCancelBooking = (passId: string) => {
    setGuests((prev) =>
      prev.map((g) => {
        if (g.id === currentGuest.id) {
          return {
            ...g,
            activePasses: g.activePasses.filter((p) => p.id !== passId),
          };
        }
        return g;
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#333333] flex flex-col font-serif">
      {/* Header adhering to Top Bar Contract */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={0}
        activeOrdersCount={orders.filter((o) => o.status !== 'delivered').length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {activeTab === 'proposal' && <ProposalOverview setActiveTab={setActiveTab} />}

        {activeTab === 'club' && (
          <ClubView
            tables={tables}
            onBookTable={handleBookTable}
            onOpenHotelTab={() => setActiveTab('hotel')}
          />
        )}

        {activeTab === 'lounge' && (
          <LoungeView
            menuItems={menuItems}
            onPlaceOrder={handlePlaceOrder}
            activeOrders={orders}
            onOpenAdminCrm={() => setActiveTab('admin_crm')}
          />
        )}

        {activeTab === 'hotel' && (
          <HotelView
            rooms={rooms}
            onBookRoom={handleBookRoom}
            onOpenClubTab={() => setActiveTab('club')}
          />
        )}

        {activeTab === 'tickets' && (
          <TicketsLoyaltyView
            events={events}
            currentGuest={currentGuest}
            onRedeemPerk={handleRedeemPerk}
            onPurchaseTicket={handlePurchaseTicket}
          />
        )}

        {activeTab === 'admin_crm' && (
          <AdminCrmView
            guests={guests}
            orders={orders}
            menuItems={menuItems}
            tables={tables}
            bookings={bookings}
            onToggleMenuItemStock={handleToggleMenuItemStock}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onSendCampaign={handleSendCampaign}
            onVerifyQrCode={handleVerifyQrCode}
            onAddMenuItem={handleAddMenuItem}
            onDeleteMenuItem={handleDeleteMenuItem}
            onUpdateMenuItemPrice={handleUpdateMenuItemPrice}
            onCheckInBooking={handleCheckInBooking}
          />
        )}

        {activeTab === 'profile' && (
          <UserProfileView
            guest={currentGuest}
            onNavigateTab={setActiveTab}
            onTopUpWallet={handleTopUpWallet}
            onCancelBooking={handleCancelBooking}
          />
        )}

        {activeTab === 'investment' && <InvestmentModelsView />}
      </main>

      {/* Quiet, refined Footer */}
      <footer className="border-t border-[#EAE5DC] bg-white py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#777777]">
          <div className="space-y-1 text-center md:text-left">
            <div className="font-display text-base font-bold text-[#143D2B]">
              The Unified Hospitality Ecosystem
            </div>
            <p>
              Prepared by Project Management & SaaS Development Team · The Cre8forte Network Limited
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-[#555555]">
            <button
              onClick={() => setActiveTab('proposal')}
              className="hover:text-[#143D2B] transition-colors cursor-pointer"
            >
              Proposal Brief
            </button>
            <button
              onClick={() => setActiveTab('club')}
              className="hover:text-[#143D2B] transition-colors cursor-pointer"
            >
              VIP Club Map
            </button>
            <button
              onClick={() => setActiveTab('lounge')}
              className="hover:text-[#143D2B] transition-colors cursor-pointer"
            >
              Lounge QR KDS
            </button>
            <button
              onClick={() => setActiveTab('hotel')}
              className="hover:text-[#143D2B] transition-colors cursor-pointer"
            >
              Hotel Upsell
            </button>
            <button
              onClick={() => setActiveTab('investment')}
              className="hover:text-[#C67D0A] font-semibold transition-colors cursor-pointer"
            >
              Investment Models
            </button>
          </div>

          <div className="text-right font-mono-nums">
            &copy; 2026 The Cre8forte Network Limited.
          </div>
        </div>
      </footer>
    </div>
  );
}
