import { MD3LightTheme } from 'react-native-paper';

// Theme configuration for LotGo app
export const colors = {
  // Brand colors
  brand: {
    primary: '#38A169', // Green
    secondary: '#68D391', // Light green
    tertiary: '#9AE6B4', // Very light green
  },
  
  // Semantic colors
  success: '#48BB78',
  warning: '#ED8936',
  error: '#E53E3E',
  info: '#3182CE',
  
  // Neutral colors
  white: '#FFFFFF',
  black: '#000000',
  
  // Gray scale
  gray: {
    50: '#F7FAFC',
    100: '#EDF2F7',
    200: '#E2E8F0',
    300: '#CBD5E0',
    400: '#A0ADB8',
    500: '#718096',
    600: '#4A5568',
    700: '#2D3748',
    800: '#1A202C',
    900: '#171923',
  },
  
  // Text colors
  text: {
    primary: '#1A202C',
    secondary: '#4A5568',
    tertiary: '#718096',
    disabled: '#A0ADB8',
  },
  
  // Background colors
  background: {
    primary: '#FFFFFF',
    secondary: '#F7FAFC',
    tertiary: '#EDF2F7',
    disabled: '#E2E8F0',
  },
  
  // Border colors
  border: '#E2E8F0',
  borderFocus: '#38A169',
  
  // Surface colors
  surface: {
    primary: '#FFFFFF',
    secondary: '#F7FAFC',
    elevated: '#FFFFFF',
  },
  
  // Special colors
  overlay: 'rgba(0, 0, 0, 0.5)',
  shadow: 'rgba(0, 0, 0, 0.1)',
};

export const typography = {
  // Headings
  h1: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: '600' as const,
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  h4: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  
  // Body text
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  bodyLarge: {
    fontSize: 18,
    fontWeight: '400' as const,
    lineHeight: 28,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  
  // Captions and labels
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500' as const,
    lineHeight: 20,
  },
  labelLarge: {
    fontSize: 16,
    fontWeight: '500' as const,
    lineHeight: 24,
  },
  
  // Button text
  button: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  buttonSmall: {
    fontSize: 14,
    fontWeight: '600' as const,
    lineHeight: 20,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  lg: {
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
};

// React Native Paper theme
export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.brand.primary,
    secondary: colors.brand.secondary,
    tertiary: colors.brand.tertiary,
    error: colors.error,
    surface: colors.background.primary,
    surfaceVariant: colors.background.secondary,
    background: colors.background.primary,
    onSurface: colors.text.primary,
    onBackground: colors.text.primary,
  },
};

export const fonts = {
  regular: 'System',
  medium: 'System',
  semiBold: 'System',
  bold: 'System',
};