export const typography = {
  sizes: {
    tiny: 11,
    xs: 13,
    sm: 15,
    md: 17,
    lg: 20,
    xl: 23,
    xxl: 31,
  },
  fonts: {
    extraLight: 'PublicSans-ExtraLight',
    light: 'PublicSans-Light',
    regular: 'PublicSans-Regular',
    medium: 'PublicSans-Medium',
    semiBold: 'PublicSans-SemiBold',
    bold: 'PublicSans-Bold',
    extraBold: 'PublicSans-ExtraBold',
  },
  weights: {
    light: '300' as const,
    regular: '400' as const,
    medium: '500' as const,
    semiBold: '600' as const,
    bold: '700' as const,
    extraBold: '800' as const,
    black: '900' as const,
  },
  letterSpacing: {
    tight: -0.4,
    normal: 0,
    wide: 0.5,
  },
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 14,
  full: 9999,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 40,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
};

export const opacity = {
  disabled: 0.5,
  overlay: 0.4,
  translucent: 0.85,
  semiTransparent: 0.95,
  border: 0.1,
  separator: 0.2,
};

export const sizes = {
  icon: {
    xs: 16,
    sm: 20,
    md: 22,
    lg: 25,
    xl: 34,
  },
  avatar: {
    sm: 40,
    md: 80,
    lg: 120,
  },
  banner: {
    height: 160,
  },
  button: {
    height: 34,
    borderRadius: 17,
  },
};

export const colors = {
  light: {
    text: {
      primary: '#0F1419',
      secondary: '#536471',
      tertiary: '#5B7083',
      link: '#1D9BF0',
      inverse: '#FFFFFF',
    },
    background: {
      primary: '#FFFFFF',
      secondary: '#F7F9F9',
      tertiary: '#EFF3F4',
    },
    border: '#EFF3F4',
    error: '#F4212E',
    success: '#00BA7C',
    warning: '#FFD400',
    overlay: 'rgba(91, 112, 131, 0.4)',
  },
  dark: {
    text: {
      primary: '#E7E9EA',
      secondary: '#71767B',
      tertiary: '#8B98A5',
      link: '#1D9BF0',
      inverse: '#0F1419',
    },
    background: {
      primary: '#000000',
      secondary: '#16181C',
      tertiary: '#2F3336',
    },
    border: '#2F3336',
    error: '#F4212E',
    success: '#00BA7C',
    warning: '#FFD400',
    overlay: 'rgba(91, 112, 131, 0.4)',
  },
};

export type Theme = {
  typography: typeof typography;
  colors: typeof colors.light;
  spacing: typeof spacing;
  borderRadius: typeof borderRadius;
  shadows: typeof shadows;
  opacity: typeof opacity;
  sizes: typeof sizes;
};
