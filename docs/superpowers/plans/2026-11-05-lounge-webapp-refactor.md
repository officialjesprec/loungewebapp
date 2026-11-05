# Nocturne Lounge & Hospitality Collective Web App Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the existing hospitality proposal prototype into a full-scale, mobile-first consumer and operations web application for an upscale Lounge (primary service), Nightclub, Boutique Hotel, VIP Gaming Space, and Lifestyle Events, with frictionless guest table ordering and direct payments.

**Architecture:** A modular React 19 + TypeScript single-page application with centralized reactive client routing (URL pushState/popstate and deep linking), dedicated contexts for guest cart/table ordering, bookings, and authentication, mobile-first responsive components, human luxury copywriting, and clean separation between consumer guest experiences, member profiles, and admin operations.

**Tech Stack:** React 19, TypeScript, Vite 8, Tailwind CSS v4, Lucide React, Framer Motion, Recharts.

---

## Global Constraints

- **Mobile First**: All layouts, navigation drawers, bottom navigation bars, and table ordering flows must be optimized for thumb interaction on mobile devices (< 640px) while expanding gracefully on desktop.
- **Human Tone & Typography**: Zero courier or robotic monospace text; zero generic AI marketing filler; professional, warm, evocative luxury hospitality copywriting.
- **Frictionless Guest Ordering**: Guests MUST be able to order food, drinks, and cocktails and pay without creating an account; orders can be tagged with customer name and table/booth/room location.
- **Pre-filled Authentication**: User login (`/login`) and Admin login (`/admin/login`) must be prefilled with demo credentials and allow 1-click access to `/userprofile` and `/admin` respectively.
- **Service Hierarchy**: Lounge is the PRIMARY showcase, with Club, Hotel, Gaming Space, and Lifestyle Events as distinct first-class service modules.

---

## File Structure Plan

```
loungewebapp/
├── index.html                                 # Clean metadata, luxury fonts (Playfair Display / Plus Jakarta Sans)
├── src/
│   ├── index.css                              # Tailwind v4 base styles, luxury color tokens, typography classes
│   ├── types/
│   │   └── hospitality.ts                     # TypeScript models for venues, menu items, orders, tables, rooms, events
│   ├── data/
│   │   └── mockData.ts                        # Curated hospitality mock data with rich imagery and menu
│   ├── context/
│   │   ├── NavigationContext.tsx              # URL path routing (/, /lounge, /club, /hotel, /gaming, /events, /menu, /userprofile, /login, /admin, /admin/login)
│   │   ├── CartContext.tsx                    # Guest cart, table assignment, instant checkout, order status tracker
│   │   ├── BookingContext.tsx                 # Reservation state for tables, hotel rooms, gaming pods, and events
│   │   └── AuthContext.tsx                    # User and Admin authentication state with prefilled demo credentials
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.tsx                     # Sticky top bar with logo, navigation links, quick order button, and cart badge
│   │   │   ├── MobileNav.tsx                  # Fixed bottom navigation bar for mobile devices
│   │   │   ├── Footer.tsx                     # Upscale footer with venue hours, dress code, location, and discreet admin login link
│   │   │   ├── CartDrawer.tsx                 # Slide-over cart drawer with table selector, tip picker, and guest checkout
│   │   │   ├── OrderStatusModal.tsx           # Live order status tracker (Received -> Preparing -> Ready -> Served) with QR receipt
│   │   │   └── QuickBookingModal.tsx          # Unified modal for VIP table reservations, bottle pre-orders, and room booking
│   │   ├── home/
│   │   │   ├── HomeHero.tsx                   # Cinematic hero showcasing the Lounge with quick booking widget
│   │   │   ├── VenueSpaces.tsx                # Interactive preview of Lounge, Club, Hotel, and Gaming spaces
│   │   │   ├── FeaturedMenu.tsx               # Curated signature dishes and cocktails with instant 1-click add to cart
│   │   │   ├── UpcomingEventsSection.tsx      # Lifestyle events calendar with VIP table and ticket booking
│   │   │   └── TrendingOffers.tsx             # Special promotions (Golden hour, stay-and-dine, gaming combos)
│   │   ├── lounge/
│   │   │   └── LoungePageView.tsx             # Primary lounge page: dining, craft mixology, terrace, table booking
│   │   ├── club/
│   │   │   └── ClubPageView.tsx               # Nightlife hub: DJ lineups, VIP booths, bottle service, dress code
│   │   ├── hotel/
│   │   │   └── HotelPageView.tsx              # Boutique hotel page: luxury suites, amenities, instant room booking
│   │   ├── gaming/
│   │   │   └── GamingPageView.tsx             # VIP gaming lounge: console pods, PC battle stations, billiards, tournament signup
│   │   ├── events/
│   │   │   └── EventsPageView.tsx             # Lifestyle events page with vibe filters, ticket and VIP table reservations
│   │   ├── menu/
│   │   │   └── MenuPageView.tsx               # Digital restaurant and bar menu with dietary filters, item details, and quick add
│   │   ├── profile/
│   │   │   └── UserProfileView.tsx            # Member portal: active passes, QR access codes, order history, loyalty rewards
│   │   ├── auth/
│   │   │   ├── UserLoginView.tsx              # Member sign-in with prefilled credentials and guest bypass
│   │   │   └── AdminLoginView.tsx             # Staff and manager sign-in with prefilled admin credentials
│   │   └── admin/
│   │       ├── AdminCrmView.tsx               # Operations command center: Live KDS, table management, room folios, guest CRM
│   │       └── RevenueTrendsChart.tsx         # Revenue and category performance analytics
│   ├── App.tsx                                # Root shell wrapping contexts and rendering active page route
│   └── main.tsx                               # Application entrypoint
```

---

## Tasks Decomposition

### Task 1: Typography, Global Styles & Core Type Definitions
**Files:**
- Modify: `loungewebapp/index.html`
- Modify: `loungewebapp/src/index.css`
- Modify: `loungewebapp/src/types/hospitality.ts`

- [ ] Update `index.html` with luxury hospitality page title ("Nocturne Lounge & Hospitality Collective"), metadata, and Google Fonts (`Plus Jakarta Sans` for clean modern UI and `Playfair Display` for editorial headings).
- [ ] Update `src/index.css` with warm luxury color tokens (obsidian, champagne gold, deep emerald, warm alabaster), smooth mobile scrollbar utilities, and removal of monospace styling.
- [ ] Expand `src/types/hospitality.ts` with comprehensive models for:
  - `RoutePath`: `'/' | '/lounge' | '/club' | '/hotel' | '/gaming' | '/events' | '/menu' | '/userprofile' | '/login' | '/admin' | '/admin/login'`
  - `VenueSpace`: `'lounge' | 'club' | 'hotel' | 'gaming'`
  - `MenuItem`: Category (`kitchen`, `bar`, `gaming_bites`), dietary tags, prep time, image
  - `GuestOrder`: Order ID, items, guest name, table identifier, payment method, live status (`received`, `preparing`, `ready`, `delivered`), timestamp
  - `TableBooking`: Space, table number, guest name, phone, arrival time, bottle pre-orders, deposit
  - `RoomBooking`: Room ID, suite name, check-in/out dates, guests, add-ons
  - `EventItem`: Title, date, time, venue, vibe, ticket price, VIP table minimum, image
  - `UserProfile`: Member ID, name, email, tier, points, passes, order history

---

### Task 2: Curated Hospitality Mock Data & Unsplash Assets
**Files:**
- Modify: `loungewebapp/src/data/mockData.ts`

- [ ] Assemble realistic, human, high-end hospitality mock data:
  - 16+ restaurant and bar items (wagyu carpaccio, truffle flatbread, smoked old fashioned, yuzu spritz, vintage champagne, gaming platter) with high-res Unsplash food & mixology images.
  - VIP tables and booths across Lounge (Garden Terrace, Mezzanine, Fireplace Booths), Club (DJ Side, Main Floor, Balcony), and Gaming (PS5 Pro Suites, PC Battle Stations).
  - 4 boutique hotel rooms (The Penthouse Suite, Midnight Skyline Suite, Executive King, Deluxe Garden Room).
  - Upcoming lifestyle events (Friday Night Resident DJ, Sunset Jazz & Wine Tasting, Sunday Championship Gaming Showdown, Mixology Masterclass).
  - Active sample guest profile with loyalty tier and digital passes.
  - Active sample KDS kitchen & bar orders for the admin dashboard.

---

### Task 3: State Management & Client Routing Infrastructure
**Files:**
- Create: `loungewebapp/src/context/NavigationContext.tsx`
- Create: `loungewebapp/src/context/CartContext.tsx`
- Create: `loungewebapp/src/context/BookingContext.tsx`
- Create: `loungewebapp/src/context/AuthContext.tsx`

- [ ] Implement `NavigationContext.tsx`:
  - Tracks current path (`/`, `/lounge`, `/club`, `/hotel`, `/gaming`, `/events`, `/menu`, `/userprofile`, `/login`, `/admin`, `/admin/login`).
  - Syncs with browser `window.history.pushState` and `window.addEventListener('popstate')`.
  - Supports query parameters and deep linking with automatic scroll to top.
- [ ] Implement `CartContext.tsx`:
  - Manages guest cart items, quantities, and customizations.
  - Stores customer name and table/booth/room identifier.
  - Provides instant guest checkout with mock payment processing.
  - Tracks live active order status with real-time simulated progress.
- [ ] Implement `BookingContext.tsx`:
  - Handles reservations for Lounge tables, Club VIP booths, Hotel suites, Gaming pods, and Event tickets.
  - Generates verifiable QR codes and updates active bookings.
- [ ] Implement `AuthContext.tsx`:
  - Provides pre-filled demo accounts for regular guest (`alex.morgan@nocturnelounge.com`) and admin (`operations@nocturnelounge.com`).
  - Manages login, logout, and guest mode.

---

### Task 4: Common Navigation & Guest Overlays (Mobile-First)
**Files:**
- Create: `loungewebapp/src/components/common/Header.tsx`
- Create: `loungewebapp/src/components/common/MobileNav.tsx`
- Create: `loungewebapp/src/components/common/Footer.tsx`
- Create: `loungewebapp/src/components/common/CartDrawer.tsx`
- Create: `loungewebapp/src/components/common/OrderStatusModal.tsx`
- Create: `loungewebapp/src/components/common/QuickBookingModal.tsx`

- [ ] Build `Header.tsx`:
  - Responsive top navigation with venue wordmark, desktop navigation links, "Order to Table" action button, Cart trigger with live item count, and Member Login / Profile button.
- [ ] Build `MobileNav.tsx`:
  - Sticky bottom tab bar for mobile screens (< 768px): Home, Lounge, Menu/Order, Events, Profile.
  - Thumb-friendly touch targets with active indicators.
- [ ] Build `Footer.tsx`:
  - Brand overview, opening hours (Lounge 12pm-2am, Club 10pm-5am, Hotel 24/7), dress code guidelines, location address.
  - Discreet "Staff & Operations Portal" link navigating to `/admin/login`.
- [ ] Build `CartDrawer.tsx`:
  - Slide-over mobile-friendly drawer displaying cart items, quantity modifiers, subtotal, taxes, and optional tip.
  - **Guest Table Selector**: Input for Guest Name + Table/Section picker (Lounge Table 1-20, Club Booth 1-10, Hotel Room 101-404, Gaming Pod 1-8, or Custom).
  - Instant guest payment method selector (Credit Card, Apple Pay, Pay at Table) with direct checkout button.
- [ ] Build `OrderStatusModal.tsx`:
  - Shows real-time order tracking with animated stepper: Received ➔ In Preparation ➔ Out for Delivery ➔ Served at Table.
  - Displays unique order QR code and receipt summary.
  - Offers optional button: "Save to Member Profile & Collect Points".
- [ ] Build `QuickBookingModal.tsx`:
  - Modal to reserve tables, hotel rooms, or gaming slots with bottle pre-orders.

---

### Task 5: Homepage Refactor & Service Discovery
**Files:**
- Create: `loungewebapp/src/components/home/HomeHero.tsx`
- Create: `loungewebapp/src/components/home/VenueSpaces.tsx`
- Create: `loungewebapp/src/components/home/FeaturedMenu.tsx`
- Create: `loungewebapp/src/components/home/UpcomingEventsSection.tsx`
- Create: `loungewebapp/src/components/home/TrendingOffers.tsx`
- Create: `loungewebapp/src/components/home/HomePageView.tsx`

- [ ] Build `HomeHero.tsx`:
  - High-impact hero focused on the **Lounge as the primary destination**.
  - Catchy luxury tagline and dual CTAs: "Explore Dining & Reserve Table" and "Browse Menu & Order Now".
  - Quick reservation bar for instant table inquiries.
- [ ] Build `VenueSpaces.tsx`:
  - Cards showcasing the 4 core spaces:
    1. *The Lounge* (Primary feature card: dining & craft mixology)
    2. *The Nightclub* (High-energy weekends & VIP bottle service)
    3. *The Boutique Hotel* (Luxury suites & 24/7 hospitality)
    4. *The VIP Gaming Space* (Next-gen consoles, esports, and billiards)
- [ ] Build `FeaturedMenu.tsx`:
  - Signature culinary creations and craft cocktails with instant "Add to Order" button.
- [ ] Build `UpcomingEventsSection.tsx`:
  - Carousel/grid of lifestyle events with "Reserve VIP Table" or "RSVP" actions.
- [ ] Build `TrendingOffers.tsx`:
  - Current promotions (Twilight Golden Hour, Weekend Stay & Dine, Gaming Pod Combos).
- [ ] Assemble `HomePageView.tsx` connecting all sections.

---

### Task 6: Individual Service Pages (Lounge, Club, Hotel, Gaming, Events)
**Files:**
- Create: `loungewebapp/src/components/lounge/LoungePageView.tsx`
- Create: `loungewebapp/src/components/club/ClubPageView.tsx`
- Create: `loungewebapp/src/components/hotel/HotelPageView.tsx`
- Create: `loungewebapp/src/components/gaming/GamingPageView.tsx`
- Create: `loungewebapp/src/components/events/EventsPageView.tsx`

- [ ] Build `LoungePageView.tsx`:
  - Primary service view highlighting dining, mixology, terrace seating, and live acoustic sessions.
  - Interactive table reservation form with date/time pickers and advance drink pre-orders.
  - Chef specials and curated wine list preview.
- [ ] Build `ClubPageView.tsx`:
  - Nightlife showcase: DJ lineup, sound & lighting setup, dress code, VIP booth map.
  - Bottle service menu and VIP booth reservation flow.
- [ ] Build `HotelPageView.tsx`:
  - Boutique suites gallery, room amenities, stay-and-play packages.
  - Room booking engine with check-in/out dates, guest counts, and instant confirmation.
- [ ] Build `GamingPageView.tsx`:
  - VIP Gaming Lounge features: PS5 Pro booths, high-end PC rigs, tournament arena, billiards.
  - Gaming snacks & cocktail menu with instant pod booking.
  - Weekly esports & casual tournament schedule with registration.
- [ ] Build `EventsPageView.tsx`:
  - Lifestyle events calendar with category filters (Music, Nightlife, Tastings, Gaming).
  - Detailed event cards with RSVP, ticket booking, and VIP table minimums.

---

### Task 7: Frictionless Digital Menu & In-Venue Ordering
**Files:**
- Create: `loungewebapp/src/components/menu/MenuPageView.tsx`

- [ ] Build `MenuPageView.tsx`:
  - **No login barrier**: Instant access for any guest.
  - Category filters: All, Starters & Small Plates, Chef's Mains, Signature Cocktails, Vintage Champagne & Spirits, Gaming Bites, Desserts.
  - Dietary pills: Vegetarian, Gluten-Free, Chef Recommendation.
  - Search bar to find specific dishes or drinks.
  - Item detail drawer/card with quantity counter, special preparation notes, and "Add to Table Order" button.
  - Floating sticky bottom cart banner on mobile indicating current item count, table location, and "Proceed to Checkout".

---

### Task 8: Authentication & Profiles (User & Admin Portals)
**Files:**
- Create: `loungewebapp/src/components/auth/UserLoginView.tsx`
- Create: `loungewebapp/src/components/auth/AdminLoginView.tsx`
- Create: `loungewebapp/src/components/profile/UserProfileView.tsx`
- Modify: `loungewebapp/src/components/admin/AdminCrmView.tsx`

- [ ] Build `UserLoginView.tsx` on `/login`:
  - Pre-filled with demo credentials (`alex.morgan@nocturnelounge.com` / `••••••••`).
  - 1-click "Sign In as Member" button navigating directly to `/userprofile`.
  - "Continue as Guest" link allowing users to proceed to `/` or `/menu` without signing in.
- [ ] Build `AdminLoginView.tsx` on `/admin/login`:
  - Discreet management portal pre-filled with admin credentials (`operations@nocturnelounge.com` / `••••••••`).
  - 1-click "Sign In to Operations Command" button navigating directly to `/admin`.
- [ ] Build `UserProfileView.tsx` on `/userprofile`:
  - Member overview: Name, VIP Tier (Gold Member), Loyalty Points balance.
  - Digital Passes & Active Bookings: VIP Table Pass, Hotel Keyless QR, Event Tickets.
  - Recent Order History with items, table number, timestamps, and reorder button.
  - Redeemable Loyalty Perks (Free cocktail, dessert platter, VIP gaming hour).
- [ ] Refactor `AdminCrmView.tsx` on `/admin`:
  - Modernized operations console without any courier/mono styling.
  - Real-time KDS (Kitchen Display System) to advance orders from `Received` ➔ `Preparing` ➔ `Ready` ➔ `Delivered`.
  - Live Table and VIP Booth status with guest names and bottle pre-orders.
  - Hotel Folio & Check-in management.
  - Shift revenue summary and category breakdown.

---

### Task 9: Root Integration, App Shell & Verification
**Files:**
- Modify: `loungewebapp/src/App.tsx`
- Remove / Retire outdated proposal components: `ProposalOverview.tsx`, `InvestmentModelsView.tsx`

- [ ] Wire up `App.tsx` with `NavigationProvider`, `CartProvider`, `BookingProvider`, and `AuthProvider`.
- [ ] Implement path-based view switcher rendering:
  - `/` ➔ `HomePageView`
  - `/lounge` ➔ `LoungePageView`
  - `/club` ➔ `ClubPageView`
  - `/hotel` ➔ `HotelPageView`
  - `/gaming` ➔ `GamingPageView`
  - `/events` ➔ `EventsPageView`
  - `/menu` ➔ `MenuPageView`
  - `/userprofile` ➔ `UserProfileView`
  - `/login` ➔ `UserLoginView`
  - `/admin/login` ➔ `AdminLoginView`
  - `/admin` ➔ `AdminCrmView`
- [ ] Verify responsive layouts, mobile drawers, guest table ordering without login, pre-filled logins, and admin access from footer.

---

## Review Focus & Edge Cases

1. **Guest Frictionless Checkout**: Ensure a guest can add items, select a table number (e.g. Table 14), enter their name, and complete checkout without ever being redirected to a login screen.
2. **Mobile Navigation Usability**: Verify that the bottom mobile navigation bar does not overlap the sticky cart checkout bar or modal buttons on small screens.
3. **Table Attachment Precision**: Ensure every order placed from `/menu` or the cart drawer captures both guest name and table/space identifier and reflects immediately in the Admin KDS.
4. **Direct URL Deep Linking**: Ensure entering `/admin`, `/userprofile`, `/lounge`, or `/menu` in the URL bar directly renders the intended view.
5. **No Broken AI / Courier Artifacts**: Verify all fonts render with `Plus Jakarta Sans` and `Playfair Display`, with zero `JetBrains Mono` or robotic AI pitch text.

