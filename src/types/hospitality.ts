export type NavigationTab =
  | 'proposal'
  | 'club'
  | 'lounge'
  | 'hotel'
  | 'tickets'
  | 'admin_crm'
  | 'profile'
  | 'investment';

export interface VIPTable {
  id: string;
  name: string;
  zone: 'vip_mezzanine' | 'dancefloor' | 'stage_front' | 'outdoor_terrace';
  capacity: number;
  minSpend: number;
  status: 'available' | 'reserved' | 'occupied';
  coordinates: { x: number; y: number };
  popular: boolean;
  reservation?: {
    guestName: string;
    phone: string;
    bottles: { name: string; qty: number; price: number }[];
    depositPaid: number;
    qrCode: string;
    arrivalTime: string;
  };
}

export interface BottleItem {
  id: string;
  name: string;
  brand: string;
  category: 'Champagne' | 'Cognac' | 'Whiskey' | 'Tequila' | 'Vodka';
  price: number;
  inStock: boolean;
  iceBucketPrepped: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'signature_cocktails' | 'food_platters' | 'tapas' | 'reserve_spirits' | 'champagne';
  price: number;
  description: string;
  isAvailable: boolean;
  station: 'bar' | 'kitchen';
  prepTimeMinutes: number;
}

export interface HotelRoom {
  id: string;
  name: string;
  type: 'standard_lodge' | 'executive_suite' | 'penthouse_terrace';
  nightRate: number;
  vipCrossSellRate: number;
  discountPercentage: number;
  capacity: number;
  amenities: string[];
  isAvailable: boolean;
  description: string;
  image: string;
}

export interface KdsOrder {
  id: string;
  tableNumber: string;
  guestName: string;
  items: {
    id: string;
    name: string;
    qty: number;
    price: number;
    station: 'bar' | 'kitchen';
  }[];
  totalAmount: number;
  status: 'sent_to_kds' | 'preparing' | 'ready_to_serve' | 'delivered';
  createdAt: string;
  notes?: string;
}

export interface EventTicket {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  djOrHost: string;
  tiers: {
    id: string;
    name: string;
    price: number;
    perks: string;
    remaining: number;
  }[];
  isLive: boolean;
}

export interface WalletTransaction {
  id: string;
  date: string;
  type: 'Top-Up' | 'VIP Club Deposit' | 'Lounge Order' | 'Hotel Stay' | 'Ticket Purchase' | 'Loyalty Reward';
  amountNaira: number;
  vertical: 'Club' | 'Lounge' | 'Hotel' | 'Wallet' | 'Events';
  status: 'Completed' | 'Pending';
  receiptRef: string;
}

export interface BookingRecord {
  id: string;
  vertical: 'Club' | 'Lounge' | 'Hotel' | 'Tickets';
  guestName: string;
  guestPhone: string;
  details: string;
  reference: string;
  date: string;
  amountNaira: number;
  status: 'Confirmed' | 'Checked In' | 'Completed' | 'Cancelled';
  qrCode: string;
}

export interface GuestProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  vipTier: 'Diamond VIP' | 'Gold Member' | 'Silver Patron';
  walletBalanceNaira: number;
  totalSpendNaira: number;
  spendBreakdown: {
    club: number;
    lounge: number;
    hotel: number;
  };
  loyaltyPoints: number;
  favoriteDrinks: string[];
  notes: string;
  lastVisit: string;
  activePasses: {
    id: string;
    type: 'VIP Table' | 'Hotel Stay' | 'Event Ticket';
    reference: string;
    validDate: string;
    details: string;
    status: 'Confirmed' | 'Checked In' | 'Completed';
  }[];
  transactionHistory: WalletTransaction[];
}
