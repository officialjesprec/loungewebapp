import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChefHat, Wine, BedDouble, Users, CheckCircle2, DollarSign, Clock, ArrowRight, LogOut, Search, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '../../context/NavigationContext';
import { KDS_ORDERS, BOOKING_RECORDS, DAILY_REVENUE_TRENDS, formatNaira } from '../../data/mockData';
import type { OrderStatus, KdsOrder } from '../../types/hospitality';

export default function AdminCrmView() {
  const { logout } = useAuth();
  const { navigate } = useNavigation();

  const [orders, setOrders] = useState<KdsOrder[]>(KDS_ORDERS);
  const [stationFilter, setStationFilter] = useState<'all' | 'kitchen' | 'bar'>('all');
  const [activeTab, setActiveTab] = useState<'kds' | 'bookings' | 'revenue'>('kds');

  const handleAdvanceStatus = (orderId: string) => {
    const progression: OrderStatus[] = ['received', 'preparing', 'ready', 'delivered'];
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const currentIdx = progression.indexOf(ord.status);
          const nextIdx = Math.min(currentIdx + 1, progression.length - 1);
          return { ...ord, status: progression[nextIdx] };
        }
        return ord;
      })
    );
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'received':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-blue-100 text-blue-800">Received</span>;
      case 'preparing':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-amber-100 text-amber-800">Preparing</span>;
      case 'ready':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">Ready to Serve</span>;
      case 'delivered':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-gray-100 text-gray-700">Delivered</span>;
    }
  };

  const todayRevenue = DAILY_REVENUE_TRENDS[DAILY_REVENUE_TRENDS.length - 1];

  return (
    <div className="min-h-screen bg-[#F5F3EE] pb-24">
      {/* Top Header */}
      <header className="bg-[#1B3A2D] text-white px-5 sm:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C8973E] text-white flex items-center justify-center font-bold">
              OP
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-xl font-bold">Operations Command Center</h1>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-[11px] text-white/70">
                Live Kitchen Display System · Reservations · Shift Analytics
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white cursor-pointer"
            >
              Public Lounge View
            </button>
            <button
              onClick={() => {
                logout();
                navigate('/admin/login');
              }}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="bg-white border-b border-[#E8E6E1] px-5 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <span className="text-[10px] text-[#7A7A7A] uppercase font-bold block">Today’s Shift Revenue</span>
            <span className="text-lg font-bold text-[#1B3A2D]">{formatNaira(todayRevenue.total)}</span>
          </div>
          <div>
            <span className="text-[10px] text-[#7A7A7A] uppercase font-bold block">Active Table Orders</span>
            <span className="text-lg font-bold text-[#1A1A1A]">{orders.filter((o) => o.status !== 'delivered').length} Active</span>
          </div>
          <div>
            <span className="text-[10px] text-[#7A7A7A] uppercase font-bold block">Confirmed Bookings</span>
            <span className="text-lg font-bold text-[#1A1A1A]">{BOOKING_RECORDS.length} Guests</span>
          </div>
          <div>
            <span className="text-[10px] text-[#7A7A7A] uppercase font-bold block">Lounge vs Club Split</span>
            <span className="text-lg font-bold text-[#C8973E]">40% / 60%</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-8 space-y-6">
        <div className="flex gap-2 border-b border-[#E8E6E1] pb-3">
          {[
            { id: 'kds', label: 'Live Orders Display (KDS)' },
            { id: 'bookings', label: 'Table & Room Reservations' },
            { id: 'revenue', label: 'Shift Revenue Trends' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#1B3A2D] text-white shadow-xs'
                  : 'bg-white text-[#7A7A7A] hover:bg-[#E8E6E1]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: LIVE KDS */}
        {activeTab === 'kds' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="font-display text-xl font-bold text-[#1A1A1A]">
                Real-Time Station Orders
              </h2>
              <div className="flex gap-1.5 bg-white p-1 rounded-xl border border-[#E8E6E1]">
                {(['all', 'kitchen', 'bar'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setStationFilter(st)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition-colors cursor-pointer ${
                      stationFilter === st
                        ? 'bg-[#1B3A2D] text-white'
                        : 'text-[#7A7A7A] hover:bg-[#F5F3EE]'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-white rounded-2xl border border-[#E8E6E1] p-5 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="text-[10px] text-[#7A7A7A] font-bold tracking-wider uppercase block">
                          {ord.tableNumber}
                        </span>
                        <h3 className="font-display text-lg font-bold text-[#1A1A1A]">
                          {ord.guestName}
                        </h3>
                      </div>
                      {getStatusBadge(ord.status)}
                    </div>

                    <div className="space-y-2 py-3 border-y border-[#E8E6E1] my-3">
                      {ord.items.map((it) => (
                        <div key={it.id} className="flex justify-between text-xs">
                          <span className="font-semibold text-[#1A1A1A]">
                            {it.qty}x {it.name}
                          </span>
                          <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-sm bg-[#F5F3EE] text-[#7A7A7A]">
                            {it.station}
                          </span>
                        </div>
                      ))}
                    </div>

                    {ord.notes && (
                      <p className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded-lg italic mb-3">
                        Guest Note: {ord.notes}
                      </p>
                    )}

                    <div className="flex justify-between items-center text-xs text-[#7A7A7A]">
                      <span>Ordered at {ord.createdAt}</span>
                      <span className="font-bold text-[#1B3A2D]">{formatNaira(ord.totalAmount)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAdvanceStatus(ord.id)}
                    disabled={ord.status === 'delivered'}
                    className={`mt-4 w-full py-2.5 rounded-xl text-xs font-bold tracking-wide transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                      ord.status === 'delivered'
                        ? 'bg-[#E8E6E1] text-[#7A7A7A] cursor-not-allowed'
                        : 'bg-[#1B3A2D] hover:bg-[#2A5A44] text-white shadow-xs'
                    }`}
                  >
                    <span>
                      {ord.status === 'received' && 'Mark as In Preparation'}
                      {ord.status === 'preparing' && 'Mark as Ready to Serve'}
                      {ord.status === 'ready' && 'Mark as Delivered to Table'}
                      {ord.status === 'delivered' && 'Order Completed'}
                    </span>
                    {ord.status !== 'delivered' && <ArrowRight className="w-3.5 h-3.5" />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: BOOKINGS */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-3xl p-6 border border-[#E8E6E1] shadow-xs space-y-4">
            <h2 className="font-display text-xl font-bold text-[#1A1A1A]">
              Active Reservations Directory
            </h2>
            <div className="divide-y divide-[#E8E6E1]">
              {BOOKING_RECORDS.map((bk) => (
                <div key={bk.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-sm text-[#1A1A1A]">{bk.reference}</span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-[#F5F3EE] text-[#1B3A2D]">
                        {bk.vertical}
                      </span>
                      <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md text-[10px]">
                        {bk.status}
                      </span>
                    </div>
                    <p className="text-[#4A4A4A]">{bk.details}</p>
                    <span className="text-[#7A7A7A] text-[11px] block mt-0.5">
                      Guest: {bk.guestName} · {bk.guestPhone} · Ref: {bk.qrCode}
                    </span>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-bold text-sm text-[#1B3A2D] block">
                      {formatNaira(bk.amount)}
                    </span>
                    <span className="text-[11px] text-[#7A7A7A]">{bk.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: REVENUE */}
        {activeTab === 'revenue' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E6E1] shadow-xs space-y-6">
            <h2 className="font-display text-xl font-bold text-[#1A1A1A]">
              Recent Daily Performance
            </h2>

            <div className="space-y-4">
              {DAILY_REVENUE_TRENDS.map((day) => (
                <div key={day.date} className="p-4 rounded-2xl bg-[#FAFAF7] border border-[#E8E6E1] space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <div>
                      <span className="font-bold text-sm text-[#1A1A1A]">{day.date} ({day.day})</span>
                      {day.notes && <span className="text-[#7A7A7A] ml-2">· {day.notes}</span>}
                    </div>
                    <span className="font-bold text-base text-[#1B3A2D]">{formatNaira(day.total)}</span>
                  </div>

                  <div className="grid grid-cols-4 gap-2 pt-2 border-t border-[#E8E6E1] text-[11px] text-[#4A4A4A]">
                    <div>Lounge: <strong className="text-[#1A1A1A]">{formatNaira(day.lounge)}</strong></div>
                    <div>Club: <strong className="text-[#1A1A1A]">{formatNaira(day.club)}</strong></div>
                    <div>Hotel: <strong className="text-[#1A1A1A]">{formatNaira(day.hotel)}</strong></div>
                    <div>Gaming: <strong className="text-[#1A1A1A]">{formatNaira(day.gaming)}</strong></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

