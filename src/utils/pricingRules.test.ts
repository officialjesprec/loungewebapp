import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateTableDeposit,
  calculateCrossSellDiscount,
  calculateLoyaltyPoints,
  calculateSaaSCost,
  calculateEnterpriseCost,
  formatNaira,
  formatNairaCompact,
  calculateSegmentTotals,
  calculatePeakDay,
} from './pricingRules.ts';

test('calculateTableDeposit computes 50% deposit correctly', () => {
  assert.equal(calculateTableDeposit(1000000), 500000);
  assert.equal(calculateTableDeposit(450000), 225000);
  assert.equal(calculateTableDeposit(0), 0);
});

test('calculateCrossSellDiscount applies 15% discount correctly', () => {
  const result = calculateCrossSellDiscount(80000, 0.15);
  assert.equal(result.original, 80000);
  assert.equal(result.savings, 12000);
  assert.equal(result.discounted, 68000);
});

test('calculateLoyaltyPoints awards 10 points per 1,000 Naira spent', () => {
  assert.equal(calculateLoyaltyPoints(50000), 500);
  assert.equal(calculateLoyaltyPoints(1000000), 10000);
  assert.equal(calculateLoyaltyPoints(500), 5);
  assert.equal(calculateLoyaltyPoints(50), 0);
});

test('calculateSaaSCost computes subscription and 3.5% transaction fee accurately', () => {
  const saas = calculateSaaSCost(5000000, 12);
  assert.equal(saas.setup, 50000);
  assert.equal(saas.subscription, 180000);
  assert.equal(saas.transactionFees, 2100000);
  assert.equal(saas.totalCost, 2330000);
});

test('calculateEnterpriseCost computes buyout and 12-month SLA accurately', () => {
  const ent = calculateEnterpriseCost(12);
  assert.equal(ent.buyout, 550000);
  assert.equal(ent.slaCost, 300000);
  assert.equal(ent.totalCost, 850000);
});

test('formatNaira adds currency symbol and comma separators', () => {
  assert.equal(formatNaira(1000000), '₦1,000,000');
  assert.equal(formatNaira(50000), '₦50,000');
});

test('formatNairaCompact formats values in millions and thousands concisely', () => {
  assert.equal(formatNairaCompact(2000000), '₦2M');
  assert.equal(formatNairaCompact(1750000), '₦1.8M');
  assert.equal(formatNairaCompact(450000), '₦450k');
});

test('calculateSegmentTotals aggregates club, lounge, hotel correctly', () => {
  const sample = [
    { club: 100000, lounge: 50000, hotel: 30000, total: 180000 },
    { club: 200000, lounge: 70000, hotel: 40000, total: 310000 },
  ];
  const totals = calculateSegmentTotals(sample);
  assert.equal(totals.clubTotal, 300000);
  assert.equal(totals.loungeTotal, 120000);
  assert.equal(totals.hotelTotal, 70000);
  assert.equal(totals.grandTotal, 490000);
});

test('calculatePeakDay finds record with highest total spend', () => {
  const sample = [
    { date: 'Oct 31', day: 'Fri', total: 2910000 },
    { date: 'Nov 01', day: 'Sat', total: 3560000 },
    { date: 'Nov 02', day: 'Sun', total: 1760000 },
  ];
  const peak = calculatePeakDay(sample);
  assert.ok(peak);
  assert.equal(peak.day, 'Sat');
  assert.equal(peak.total, 3560000);
});
