import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { RoutePath } from '../types/hospitality';

interface NavigationContextType {
  currentPath: RoutePath;
  navigate: (path: RoutePath) => void;
  goBack: () => void;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

export function useNavigation() {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error('useNavigation must be used within NavigationProvider');
  return ctx;
}

function getInitialPath(): RoutePath {
  const path = window.location.pathname as RoutePath;
  const validPaths: RoutePath[] = ['/', '/lounge', '/club', '/hotel', '/gaming', '/events', '/menu', '/userprofile', '/login', '/admin', '/admin/login'];
  return validPaths.includes(path) ? path : '/';
}

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<RoutePath>(getInitialPath);

  const navigate = useCallback((path: RoutePath) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const goBack = useCallback(() => {
    window.history.back();
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(getInitialPath());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <NavigationContext.Provider value={{ currentPath, navigate, goBack }}>
      {children}
    </NavigationContext.Provider>
  );
};

