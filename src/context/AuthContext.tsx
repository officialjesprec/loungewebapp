import React, { createContext, useContext, useState, useCallback } from 'react';
import type { AuthUser, UserRole } from '../types/hospitality';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string, role: UserRole) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

// Demo accounts
const DEMO_ACCOUNTS: Record<string, AuthUser & { password: string }> = {
  'alex.morgan@nocturnelounge.com': {
    id: 'gst-101',
    name: 'Alex Morgan',
    email: 'alex.morgan@nocturnelounge.com',
    role: 'member',
    password: 'nocturne2026',
  },
  'operations@nocturnelounge.com': {
    id: 'admin-001',
    name: 'Operations Manager',
    email: 'operations@nocturnelounge.com',
    role: 'admin',
    password: 'admin2026',
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = useCallback((email: string, _password: string, _role: UserRole): boolean => {
    const account = DEMO_ACCOUNTS[email];
    if (account) {
      const { password: _pw, ...authUser } = account;
      setUser(authUser);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin',
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

