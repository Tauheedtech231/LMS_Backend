// context/AdminContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Filters {
  [key: string]: string | number | boolean | null;
}

interface AdminContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<string>('dashboard');
  const [filters, setFilters] = useState<Filters>({});

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <AdminContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        currentPage,
        setCurrentPage,
        filters,
        setFilters,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
