import React, { createContext, useContext, useState, useEffect } from 'react';
import { Leader } from '../types';
import { leaders } from '../data/adminData';

interface AdminAuthContextType {
  currentLeader: Leader | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

interface AdminAuthProviderProps {
  children: React.ReactNode;
}

export const AdminAuthProvider: React.FC<AdminAuthProviderProps> = ({ children }) => {
  const [currentLeader, setCurrentLeader] = useState<Leader | null>(null);

  // Load leader from localStorage on app start
  useEffect(() => {
    const savedLeaderId = localStorage.getItem('currentLeaderId');
    if (savedLeaderId) {
      const leader = leaders.find(l => l.id === savedLeaderId);
      if (leader) {
        setCurrentLeader(leader);
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate authentication
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const leader = leaders.find(l => l.email === email);
    if (leader && password === 'admin123') { // Simple demo authentication
      setCurrentLeader(leader);
      localStorage.setItem('currentLeaderId', leader.id);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentLeader(null);
    localStorage.removeItem('currentLeaderId');
  };

  const value = {
    currentLeader,
    login,
    logout,
    isAuthenticated: !!currentLeader
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};
