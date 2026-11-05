import React, { createContext, useContext, useState, useCallback } from 'react';
import type { MenuItem, CartItem, GuestOrder, OrderStatus, PaymentMethod, VenueSpace } from '../types/hospitality';

interface CartContextType {
  items: CartItem[];
  guestName: string;
  tableIdentifier: string;
  venue: VenueSpace;
  activeOrder: GuestOrder | null;
  isCartOpen: boolean;
  isOrderStatusOpen: boolean;

  setGuestName: (name: string) => void;
  setTableIdentifier: (table: string) => void;
  setVenue: (venue: VenueSpace) => void;
  openCart: () => void;
  closeCart: () => void;
  openOrderStatus: () => void;
  closeOrderStatus: () => void;

  addItem: (item: MenuItem, quantity?: number, notes?: string) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;

  subtotal: number;
  tax: number;
  total: number;

  checkout: (paymentMethod: PaymentMethod, tip?: number) => void;
  advanceOrderStatus: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [guestName, setGuestName] = useState('');
  const [tableIdentifier, setTableIdentifier] = useState('');
  const [venue, setVenue] = useState<VenueSpace>('lounge');
  const [activeOrder, setActiveOrder] = useState<GuestOrder | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderStatusOpen, setIsOrderStatusOpen] = useState(false);

  const addItem = useCallback((item: MenuItem, quantity = 1, notes?: string) => {
    setItems(prev => {
      const existing = prev.find(ci => ci.menuItem.id === item.id);
      if (existing) {
        return prev.map(ci =>
          ci.menuItem.id === item.id
            ? { ...ci, quantity: ci.quantity + quantity, specialNotes: notes || ci.specialNotes }
            : ci
        );
      }
      return [...prev, { menuItem: item, quantity, specialNotes: notes }];
    });
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setItems(prev => prev.filter(ci => ci.menuItem.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(ci => ci.menuItem.id !== itemId));
    } else {
      setItems(prev => prev.map(ci =>
        ci.menuItem.id === itemId ? { ...ci, quantity } : ci
      ));
    }
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const subtotal = items.reduce((sum, ci) => sum + ci.menuItem.price * ci.quantity, 0);
  const tax = Math.round(subtotal * 0.075); // 7.5% VAT
  const total = subtotal + tax;

  const checkout = useCallback((paymentMethod: PaymentMethod, tip = 0) => {
    const order: GuestOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      items: [...items],
      guestName: guestName || 'Guest',
      tableIdentifier: tableIdentifier || 'Walk-in',
      venue,
      status: 'received',
      paymentMethod,
      subtotal,
      tax,
      tip,
      total: total + tip,
      createdAt: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
      qrCode: `NOC-${venue.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
    };
    setActiveOrder(order);
    setItems([]);
    setIsCartOpen(false);
    setIsOrderStatusOpen(true);

    // Simulate order progression
    setTimeout(() => {
      setActiveOrder(prev => prev ? { ...prev, status: 'preparing' } : null);
    }, 3000);
    setTimeout(() => {
      setActiveOrder(prev => prev ? { ...prev, status: 'ready' } : null);
    }, 8000);
    setTimeout(() => {
      setActiveOrder(prev => prev ? { ...prev, status: 'delivered' } : null);
    }, 14000);
  }, [items, guestName, tableIdentifier, venue, subtotal, tax, total]);

  const advanceOrderStatus = useCallback(() => {
    if (!activeOrder) return;
    const progression: OrderStatus[] = ['received', 'preparing', 'ready', 'delivered'];
    const currentIdx = progression.indexOf(activeOrder.status);
    if (currentIdx < progression.length - 1) {
      setActiveOrder({ ...activeOrder, status: progression[currentIdx + 1] });
    }
  }, [activeOrder]);

  return (
    <CartContext.Provider value={{
      items, guestName, tableIdentifier, venue, activeOrder,
      isCartOpen, isOrderStatusOpen,
      setGuestName, setTableIdentifier, setVenue,
      openCart: () => setIsCartOpen(true),
      closeCart: () => setIsCartOpen(false),
      openOrderStatus: () => setIsOrderStatusOpen(true),
      closeOrderStatus: () => setIsOrderStatusOpen(false),
      addItem, removeItem, updateQuantity, clearCart,
      subtotal, tax, total,
      checkout, advanceOrderStatus,
    }}>
      {children}
    </CartContext.Provider>
  );
};

