import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateTableDeposit,
  calculateCrossSellDiscount,
  calculateLoyaltyPoints,
  calculateSaaSCost,
  calculateEnterpriseCost,
  formatNaira,
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
  // Monthly turnover 5,000,000 for 12 months = 60,000,000 turnover
  // 3.5% transaction fee = 2,100,000
  // 12 months @ 15,000 = 180,000
  // Setup = 50,000
  // Total = 2,330,000
  const saas = calculateSaaSCost(5000000, 12);
  assert.equal(saas.setup, 50000);
  assert.equal(saas.subscription, 180000);
  assert.equal(saas.transactionFees, 2100000);
  assert.equal(saas.totalCost, 2330000);
});

test('calculateEnterpriseCost computes buyout and 12-month SLA accurately', () => {
  // Buyout = 550,000
  // SLA = 25,000 * 12 = 300,000
  // Total = 850,000
  const ent = calculateEnterpriseCost(12);
  assert.equal(ent.buyout, 550000);
  assert.equal(ent.slaCost, 300000);
  assert.equal(ent.totalCost, 850000);
});

test('formatNaira adds currency symbol and comma separators', () => {
  assert.equal(formatNaira(1000000), '₦1,000,000');
  assert.equal(formatNaira(50000), '₦50,000');
});
