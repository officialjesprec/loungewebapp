import React, { createContext, useContext, useState, useCallback } from 'react';
import type { BookingRecord, BookingVertical } from '../types/hospitality';
import { BOOKING_RECORDS } from '../data/mockData';

interface BookingContextType {
  bookings: BookingRecord[];
  isBookingModalOpen: boolean;
  openBookingModal: () => void;
  closeBookingModal: () => void;
  addBooking: (booking: Omit<BookingRecord, 'id' | 'qrCode'>) => BookingRecord;
  cancelBooking: (id: string) => void;
  getBookingsByVertical: (vertical: BookingVertical) => BookingRecord[];
}

const BookingContext = createContext<BookingContextType | null>(null);

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within BookingProvider');
  return ctx;
}

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<BookingRecord[]>(BOOKING_RECORDS);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const addBooking = useCallback((booking: Omit<BookingRecord, 'id' | 'qrCode'>): BookingRecord => {
    const newBooking: BookingRecord = {
      ...booking,
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      qrCode: `NOC-${booking.vertical.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
    };
    setBookings(prev => [newBooking, ...prev]);
    return newBooking;
  }, []);

  const cancelBooking = useCallback((id: string) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'Cancelled' as const } : b));
  }, []);

  const getBookingsByVertical = useCallback((vertical: BookingVertical) => {
    return bookings.filter(b => b.vertical === vertical);
  }, [bookings]);

  return (
    <BookingContext.Provider value={{
      bookings,
      isBookingModalOpen,
      openBookingModal: () => setIsBookingModalOpen(true),
      closeBookingModal: () => setIsBookingModalOpen(false),
      addBooking,
      cancelBooking,
      getBookingsByVertical,
    }}>
      {children}
    </BookingContext.Provider>
  );
};

