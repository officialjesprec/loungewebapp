import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { DailyRevenueRecord } from '../types/hospitality.ts';
import { DAILY_REVENUE_TRENDS, MONTHLY_WEEKLY_TRENDS } from '../data/mockData.ts';
import {
  formatNaira,
  formatNairaCompact,
  calculateSegmentTotals,
  calculatePeakDay,
} from '../utils/pricingRules.ts';
import {
  TrendingUp,
  BarChart2,
  Layers,
  Sparkles,
  Calendar,
  Filter,
  Wine,
  Utensils,
  BedDouble,
} from 'lucide-react';

interface RevenueTrendsChartProps {
  customData?: DailyRevenueRecord[];
}

export const RevenueTrendsChart: React.FC<RevenueTrendsChartProps> = ({ customData }) => {
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly'>('daily');
  const [chartType, setChartType] = useState<'area' | 'bar' | 'line'>('area');
  const [visibleSegments, setVisibleSegments] = useState<{
    club: boolean;
    lounge: boolean;
    hotel: boolean;
  }>({
    club: true,
    lounge: true,
    hotel: true,
  });

  const activeData: DailyRevenueRecord[] =
    customData || (timeframe === 'daily' ? DAILY_REVENUE_TRENDS : MONTHLY_WEEKLY_TRENDS);

  const totals = calculateSegmentTotals(activeData);
  const peakDay = calculatePeakDay(activeData);

  const toggleSegment = (key: 'club' | 'lounge' | 'hotel') => {
    setVisibleSegments((prev) => {
      // Don't allow unchecking all 3
      const count = (prev.club ? 1 : 0) + (prev.lounge ? 1 : 0) + (prev.hotel ? 1 : 0);
      if (count === 1 && prev[key]) return prev;
      return { ...prev, [key]: !prev[key] };
    });
  };

  // Custom Recharts Tooltip with Luxury Styling
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const record = payload[0]?.payload as DailyRevenueRecord;
      const totalDay = record.club + record.lounge + record.hotel;

      return (
        <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#143D2B]/30 shadow-xl font-serif min-w-[240px] text-xs space-y-2">
          <div className="flex items-center justify-between border-b border-[#EAE5DC] pb-1.5">
            <span className="font-bold text-[#143D2B] text-sm">
              {record.date} ({record.day})
            </span>
            <span className="font-mono-nums font-bold text-[#143D2B] text-sm">
              {formatNaira(totalDay)}
            </span>
          </div>

          {record.notes && (
            <div className="text-[10px] text-[#C67D0A] font-medium italic">
              ✦ {record.notes}
            </div>
          )}

          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[#143D2B] font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-[#143D2B] inline-block" />
                Nightclub VIP & Bottles:
              </span>
              <span className="font-mono-nums font-bold text-[#143D2B]">
                {formatNaira(record.club)}{' '}
                <span className="text-[10px] text-[#777777] font-normal">
                  ({Math.round((record.club / totalDay) * 100)}%)
                </span>
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[#C67D0A] font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C67D0A] inline-block" />
                Lounge QR Dining:
              </span>
              <span className="font-mono-nums font-bold text-[#C67D0A]">
                {formatNaira(record.lounge)}{' '}
                <span className="text-[10px] text-[#777777] font-normal">
                  ({Math.round((record.lounge / totalDay) * 100)}%)
                </span>
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-700 inline-block" />
                Hotel Event-to-Stay:
              </span>
              <span className="font-mono-nums font-bold text-emerald-800">
                {formatNaira(record.hotel)}{' '}
                <span className="text-[10px] text-[#777777] font-normal">
                  ({Math.round((record.hotel / totalDay) * 100)}%)
                </span>
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl border border-[#EAE5DC] p-6 sm:p-7 shadow-xs space-y-6">
      {/* Header with Title and Control Toggles */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAE5DC] pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-serif text-[#C67D0A] uppercase tracking-wider font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Revenue Trends Visualization (Recharts)</span>
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-[#143D2B]">
            Daily Spend Totals by Ecosystem Vertical
          </h3>
          <p className="text-xs text-[#555555] font-serif mt-0.5">
            Real-time multi-segment telemetry comparing Club VIP tables, Lounge QR orders, and Hotel cross-sells.
          </p>
        </div>

        {/* View Switches */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Timeframe switch */}
          <div className="flex items-center p-0.5 bg-[#FAF8F5] rounded-xl border border-[#EAE5DC] text-xs font-serif">
            <button
              onClick={() => setTimeframe('daily')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                timeframe === 'daily'
                  ? 'bg-[#143D2B] text-white font-semibold'
                  : 'text-[#555555] hover:text-[#143D2B]'
              }`}
            >
              7-Day Peak Cycle
            </button>
            <button
              onClick={() => setTimeframe('weekly')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                timeframe === 'weekly'
                  ? 'bg-[#143D2B] text-white font-semibold'
                  : 'text-[#555555] hover:text-[#143D2B]'
              }`}
            >
              Month Progression
            </button>
          </div>

          {/* Chart Type switch */}
          <div className="flex items-center p-0.5 bg-[#FAF8F5] rounded-xl border border-[#EAE5DC] text-xs font-serif">
            <button
              onClick={() => setChartType('area')}
              title="Stacked Area View"
              className={`p-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                chartType === 'area'
                  ? 'bg-[#143D2B] text-white font-semibold'
                  : 'text-[#555555] hover:text-[#143D2B]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Stacked</span>
            </button>
            <button
              onClick={() => setChartType('bar')}
              title="Grouped Bars View"
              className={`p-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                chartType === 'bar'
                  ? 'bg-[#143D2B] text-white font-semibold'
                  : 'text-[#555555] hover:text-[#143D2B]'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Bars</span>
            </button>
            <button
              onClick={() => setChartType('line')}
              title="Trajectory Lines View"
              className={`p-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                chartType === 'line'
                  ? 'bg-[#143D2B] text-white font-semibold'
                  : 'text-[#555555] hover:text-[#143D2B]'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Lines</span>
            </button>
          </div>
        </div>
      </div>

      {/* Segment Isolation Chips */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-serif bg-[#FAF8F5] p-3 rounded-xl border border-[#EAE5DC]">
        <div className="flex items-center gap-1.5 text-[#555555]">
          <Filter className="w-3.5 h-3.5 text-[#C67D0A]" />
          <span>Toggle Active Segments:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => toggleSegment('club')}
            className={`px-3 py-1 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
              visibleSegments.club
                ? 'bg-[#143D2B] text-white border-[#143D2B] font-semibold'
                : 'bg-white text-[#777777] border-[#EAE5DC] opacity-60'
            }`}
          >
            <Wine className="w-3 h-3" />
            <span>Nightclub VIP ({formatNairaCompact(totals.clubTotal)})</span>
          </button>

          <button
            onClick={() => toggleSegment('lounge')}
            className={`px-3 py-1 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
              visibleSegments.lounge
                ? 'bg-[#C67D0A] text-white border-[#C67D0A] font-semibold'
                : 'bg-white text-[#777777] border-[#EAE5DC] opacity-60'
            }`}
          >
            <Utensils className="w-3 h-3" />
            <span>Lounge Dining ({formatNairaCompact(totals.loungeTotal)})</span>
          </button>

          <button
            onClick={() => toggleSegment('hotel')}
            className={`px-3 py-1 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
              visibleSegments.hotel
                ? 'bg-emerald-800 text-white border-emerald-800 font-semibold'
                : 'bg-white text-[#777777] border-[#EAE5DC] opacity-60'
            }`}
          >
            <BedDouble className="w-3 h-3" />
            <span>Hotel Stay ({formatNairaCompact(totals.hotelTotal)})</span>
          </button>
        </div>
      </div>

      {/* Recharts Chart Viewport */}
      <div className="w-full h-[320px] pt-2">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'area' ? (
            <AreaChart data={activeData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="gradClub" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#143D2B" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#143D2B" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="gradLounge" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C67D0A" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#C67D0A" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="gradHotel" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#059669" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#EAE5DC" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fontFamily: 'Lora, serif', fill: '#555555' }}
                axisLine={{ stroke: '#EAE5DC' }}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(val) => formatNairaCompact(val)}
                tick={{ fontSize: 11, fontFamily: 'Lora, serif', fill: '#555555' }}
                axisLine={false}
                tickLine={false}
                width={65}
              />
              <Tooltip content={<CustomTooltip />} />
              {visibleSegments.hotel && (
                <Area
                  type="monotone"
                  dataKey="hotel"
                  name="Hotel Lodge"
                  stackId="1"
                  stroke="#059669"
                  strokeWidth={2}
                  fill="url(#gradHotel)"
                />
              )}
              {visibleSegments.lounge && (
                <Area
                  type="monotone"
                  dataKey="lounge"
                  name="Lounge Dining"
                  stackId="1"
                  stroke="#C67D0A"
                  strokeWidth={2}
                  fill="url(#gradLounge)"
                />
              )}
              {visibleSegments.club && (
                <Area
                  type="monotone"
                  dataKey="club"
                  name="Nightclub VIP"
                  stackId="1"
                  stroke="#143D2B"
                  strokeWidth={2.5}
                  fill="url(#gradClub)"
                />
              )}
            </AreaChart>
          ) : chartType === 'bar' ? (
            <BarChart data={activeData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EAE5DC" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fontFamily: 'Lora, serif', fill: '#555555' }}
                axisLine={{ stroke: '#EAE5DC' }}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(val) => formatNairaCompact(val)}
                tick={{ fontSize: 11, fontFamily: 'Lora, serif', fill: '#555555' }}
                axisLine={false}
                tickLine={false}
                width={65}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: '11px', fontFamily: 'Lora, serif', paddingTop: '10px' }}
              />
              {visibleSegments.club && (
                <Bar dataKey="club" name="Nightclub VIP" fill="#143D2B" radius={[4, 4, 0, 0]} />
              )}
              {visibleSegments.lounge && (
                <Bar dataKey="lounge" name="Lounge QR" fill="#C67D0A" radius={[4, 4, 0, 0]} />
              )}
              {visibleSegments.hotel && (
                <Bar dataKey="hotel" name="Hotel Stay" fill="#059669" radius={[4, 4, 0, 0]} />
              )}
            </BarChart>
          ) : (
            <LineChart data={activeData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EAE5DC" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fontFamily: 'Lora, serif', fill: '#555555' }}
                axisLine={{ stroke: '#EAE5DC' }}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(val) => formatNairaCompact(val)}
                tick={{ fontSize: 11, fontFamily: 'Lora, serif', fill: '#555555' }}
                axisLine={false}
                tickLine={false}
                width={65}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: '11px', fontFamily: 'Lora, serif', paddingTop: '10px' }}
              />
              {visibleSegments.club && (
                <Line
                  type="monotone"
                  dataKey="club"
                  name="Nightclub VIP"
                  stroke="#143D2B"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#143D2B' }}
                />
              )}
              {visibleSegments.lounge && (
                <Line
                  type="monotone"
                  dataKey="lounge"
                  name="Lounge QR"
                  stroke="#C67D0A"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#C67D0A' }}
                />
              )}
              {visibleSegments.hotel && (
                <Line
                  type="monotone"
                  dataKey="hotel"
                  name="Hotel Stay"
                  stroke="#059669"
                  strokeWidth={2}
                  dot={{ r: 4, fill: '#059669' }}
                />
              )}
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* KPI Cards Strip below the Chart */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 border-t border-[#EAE5DC]">
        <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#EAE5DC] space-y-1">
          <span className="text-[10px] text-[#777777] font-serif uppercase tracking-wider">
            Period Total Spend
          </span>
          <div className="font-display text-xl font-bold text-[#143D2B] font-mono-nums">
            {formatNaira(totals.grandTotal)}
          </div>
          <div className="text-[10px] text-[#555555]">
            Across Club, Lounge & Hotel pillars
          </div>
        </div>

        <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#EAE5DC] space-y-1">
          <span className="text-[10px] text-[#777777] font-serif uppercase tracking-wider">
            Peak Day Velocity
          </span>
          <div className="font-display text-xl font-bold text-[#C67D0A] font-mono-nums">
            {peakDay ? `${peakDay.day} · ${formatNairaCompact(peakDay.total)}` : 'N/A'}
          </div>
          <div className="text-[10px] text-[#555555]">
            {peakDay?.notes || 'Highest volume night'}
          </div>
        </div>

        <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#EAE5DC] space-y-1">
          <span className="text-[10px] text-[#777777] font-serif uppercase tracking-wider">
            Weekend Surge Index
          </span>
          <div className="font-display text-xl font-bold text-[#143D2B] font-mono-nums">
            3.8x Midweek
          </div>
          <div className="text-[10px] text-emerald-700 font-semibold">
            Fri/Sat generate 64% of weekly turnover
          </div>
        </div>

        <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#EAE5DC] space-y-1">
          <span className="text-[10px] text-[#777777] font-serif uppercase tracking-wider">
            Tri-Pillar Synergy Lift
          </span>
          <div className="font-display text-xl font-bold text-emerald-800 font-mono-nums">
            +32.4%
          </div>
          <div className="text-[10px] text-[#555555]">
            Club patrons adding rooms & cocktails
          </div>
        </div>
      </div>
    </div>
  );
};
