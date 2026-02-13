import { colors as darkColors } from '@/constants/colors-dark';
import { colors as lightColors } from '@/constants/colors-light';
import React, { createContext, ReactNode, useContext, useState } from 'react';

// Define a unified type that includes all possible color properties
type ThemeColors = {
  background: string;
  card: string;
  border: string;
  primary: string;
  secondary: string;
  accent: string;
  textPrimary: string;
  textSecondary: string;
  settings: string;
  success: string;
  danger: string;
  warning: string;
  info: string;
  cardHeader: string;
  cardBody: string;
};

interface ThemeContextType {
  colors: ThemeColors;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Set default to dark mode
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ colors, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};