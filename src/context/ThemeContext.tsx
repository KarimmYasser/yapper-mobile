import { StatusBar } from 'expo-status-bar';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { borderRadius, colors, opacity, shadows, sizes, spacing, Theme, typography } from '../constants/theme';
interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
}
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface IThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<IThemeProviderProps> = (props) => {
  const { children } = props;
  const systemColorScheme = useColorScheme() || 'dark';
  const [isDark, setIsDark] = useState(systemColorScheme === 'dark');

  useEffect(() => {
    setIsDark(systemColorScheme === 'dark');
  }, [systemColorScheme]);

  const theme = {
    colors: isDark ? colors.dark : colors.light,
    typography,
    spacing,
    borderRadius,
    shadows,
    opacity,
    sizes,
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark }}>
      <StatusBar 
        style={isDark ? 'light' : 'dark'} 
        animated={true}
        translucent={false}
      />
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
