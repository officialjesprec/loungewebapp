/**
 * Pure calculation rules for the Cre8forte Unified Hospitality Ecosystem
 */

export function calculateTableDeposit(minSpend: number, depositRate: number = 0.5): number {
  if (minSpend <= 0) return 0;
  return Math.round(minSpend * depositRate);
}

export function calculateCrossSellDiscount(roomRate: number, discountPercentage: number = 0.15): {
  original: number;
  discounted: number;
  savings: number;
} {
  if (roomRate <= 0) return { original: 0, discounted: 0, savings: 0 };
  const savings = Math.round(roomRate * discountPercentage);
  const discounted = Math.max(0, roomRate - savings);
  return {
    original: roomRate,
    discounted,
    savings,
  };
}

export function calculateLoyaltyPoints(spendNaira: number, pointsPerThousand: number = 10): number {
  if (spendNaira <= 0) return 0;
  return Math.floor((spendNaira / 1000) * pointsPerThousand);
}

export function calculateSaaSCost(
  monthlyTurnover: number,
  months: number = 12,
  setupFee: number = 50000,
  monthlySub: number = 15000,
  feeRate: number = 0.035
): {
  setup: number;
  subscription: number;
  transactionFees: number;
  totalCost: number;
} {
  const subscription = monthlySub * months;
  const transactionFees = Math.round(monthlyTurnover * months * feeRate);
  const totalCost = setupFee + subscription + transactionFees;
  return {
    setup: setupFee,
    subscription,
    transactionFees,
    totalCost,
  };
}

export function calculateEnterpriseCost(
  months: number = 12,
  buyoutFee: number = 550000,
  monthlySla: number = 25000
): {
  buyout: number;
  slaCost: number;
  totalCost: number;
} {
  const slaCost = monthlySla * months;
  const totalCost = buyoutFee + slaCost;
  return {
    buyout: buyoutFee,
    slaCost,
    totalCost,
  };
}

export function formatNaira(amount: number): string {
  return '₦' + amount.toLocaleString('en-NG');
}
