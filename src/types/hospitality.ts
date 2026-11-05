/* ─── Route Paths ─── */
export type RoutePath =
  | '/'
  | '/lounge'
  | '/club'
  | '/hotel'
  | '/gaming'
  | '/events'
  | '/menu'
  | '/userprofile'
  | '/login'
  | '/admin'
  | '/admin/login';

export type VenueSpace = 'lounge' | 'club' | 'hotel' | 'gaming';

/* ─── Menu & Ordering ─── */
export type MenuCategory =
  | 'starters'
  | 'mains'
  | 'signature_cocktails'
  | 'classic_cocktails'
  | 'champagne_spirits'
  | 'gaming_bites'
  | 'desserts';

export type DietaryTag = 'vegetarian' | 'gluten-free' | 'chef-pick' | 'spicy' | 'vegan';

export type OrderStation = 'bar' | 'kitchen';

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  price: number;
  description: string;
  image: string;
  isAvailable: boolean;
  station: OrderStation;
  prepTimeMinutes: number;
  dietaryTags: DietaryTag[];
}

export type OrderStatus = 'received' | 'preparing' | 'ready' | 'delivered';

export type PaymentMethod = 'card' | 'apple_pay' | 'google_pay' | 'pay_at_table';

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  specialNotes?: string;
}

export interface GuestOrder {
  id: string;
  items: CartItem[];
  guestName: string;
  tableIdentifier: string;
  venue: VenueSpace;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  subtotal: number;
  tax: number;
  tip: number;
  total: number;
  createdAt: string;
  qrCode: string;
}

/* ─── Tables & Reservations ─── */
export type TableZone =
  | 'garden_terrace'
  | 'mezzanine'
  | 'fireplace_booth'
  | 'main_floor'
  | 'dj_side'
  | 'balcony'
  | 'outdoor_terrace';

export interface VIPTable {
  id: string;
  name: string;
  zone: TableZone;
  venue: VenueSpace;
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

/* ─── Hotel Rooms ─── */
export type RoomType = 'deluxe' | 'executive' | 'penthouse' | 'skyline';

export interface HotelRoom {
  id: string;
  name: string;
  type: RoomType;
  nightRate: number;
  discountRate: number;
  discountPercentage: number;
  capacity: number;
  amenities: string[];
  isAvailable: boolean;
  description: string;
  image: string;
  sqMeters: number;
}

/* ─── Gaming ─── */
export type GamingPodType = 'ps5_pro' | 'pc_battlestation' | 'billiards' | 'retro_arcade';

export interface GamingPod {
  id: string;
  name: string;
  type: GamingPodType;
  hourlyRate: number;
  capacity: number;
  isAvailable: boolean;
  features: string[];
  image: string;
}

/* ─── Events ─── */
export type EventVibe = 'music' | 'nightlife' | 'tasting' | 'gaming' | 'lifestyle';

export interface EventTier {
  id: string;
  name: string;
  price: number;
  perks: string;
  remaining: number;
}

export interface EventItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  hostOrDj: string;
  venue: VenueSpace | 'all';
  vibe: EventVibe;
  image: string;
  tiers: EventTier[];
  isLive: boolean;
  vipTableMinimum?: number;
}

/* ─── Bottles (for VIP pre-orders) ─── */
export interface BottleItem {
  id: string;
  name: string;
  brand: string;
  category: 'Champagne' | 'Cognac' | 'Whiskey' | 'Tequila' | 'Vodka';
  price: number;
  inStock: boolean;
}

/* ─── KDS Orders (Admin) ─── */
export interface KdsOrder {
  id: string;
  tableNumber: string;
  guestName: string;
  venue: VenueSpace;
  items: {
    id: string;
    name: string;
    qty: number;
    price: number;
    station: OrderStation;
  }[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  notes?: string;
}

/* ─── Bookings ─── */
export type BookingVertical = 'Club' | 'Lounge' | 'Hotel' | 'Gaming' | 'Events';

export interface BookingRecord {
  id: string;
  vertical: BookingVertical;
  guestName: string;
  guestPhone: string;
  details: string;
  reference: string;
  date: string;
  amount: number;
  status: 'Confirmed' | 'Checked In' | 'Completed' | 'Cancelled';
  qrCode: string;
}

/* ─── Wallet & Transactions ─── */
export interface WalletTransaction {
  id: string;
  date: string;
  type: 'Top-Up' | 'VIP Deposit' | 'Lounge Order' | 'Hotel Stay' | 'Ticket Purchase' | 'Gaming Session' | 'Loyalty Reward';
  amount: number;
  vertical: BookingVertical | 'Wallet';
  status: 'Completed' | 'Pending';
  receiptRef: string;
}

/* ─── Guest Profile ─── */
export type LoyaltyTier = 'Diamond' | 'Gold' | 'Silver' | 'Bronze';

export interface GuestProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  tier: LoyaltyTier;
  loyaltyPoints: number;
  totalSpend: number;
  spendBreakdown: {
    club: number;
    lounge: number;
    hotel: number;
    gaming: number;
  };
  favoriteDrinks: string[];
  notes: string;
  lastVisit: string;
  activePasses: {
    id: string;
    type: 'VIP Table' | 'Hotel Stay' | 'Event Ticket' | 'Gaming Pod';
    reference: string;
    validDate: string;
    details: string;
    status: 'Confirmed' | 'Checked In' | 'Completed';
  }[];
  transactionHistory: WalletTransaction[];
}

/* ─── Revenue Analytics (Admin) ─── */
export interface DailyRevenueRecord {
  date: string;
  day: string;
  club: number;
  lounge: number;
  hotel: number;
  gaming: number;
  total: number;
  notes?: string;
}

/* ─── Auth ─── */
export type UserRole = 'guest' | 'member' | 'admin';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}
