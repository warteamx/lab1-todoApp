// Enhanced color palette with multiple themes and semantic colors

export interface ColorPalette {
  // Primary colors
  primary50: string;
  primary100: string;
  primary200: string;
  primary300: string;
  primary400: string;
  primary500: string;
  primary600: string;
  primary700: string;
  primary800: string;
  primary900: string;

  // Secondary colors
  secondary50: string;
  secondary100: string;
  secondary200: string;
  secondary300: string;
  secondary400: string;
  secondary500: string;
  secondary600: string;
  secondary700: string;
  secondary800: string;
  secondary900: string;

  // Neutral colors
  neutral50: string;
  neutral100: string;
  neutral200: string;
  neutral300: string;
  neutral400: string;
  neutral500: string;
  neutral600: string;
  neutral700: string;
  neutral800: string;
  neutral900: string;

  // Semantic colors
  success: string;
  warning: string;
  error: string;
  info: string;

  // Surface colors
  background: string;
  surface: string;
  card: string;
  overlay: string;

  // Text colors
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textDisabled: string;
  textOnPrimary: string;
  textOnSecondary: string;

  // Border colors
  border: string;
  borderSecondary: string;
  borderActive: string;

  // Interactive colors
  interactive: string;
  interactiveHover: string;
  interactivePressed: string;
  interactiveDisabled: string;
}

// Modern Color Palette (Default Theme)
export const modernColors: ColorPalette = {
  // Primary (Blue) - Modern, professional
  primary50: '#EBF8FF',
  primary100: '#BEE3F8',
  primary200: '#90CDF4',
  primary300: '#63B3ED',
  primary400: '#4299E1',
  primary500: '#3182CE',
  primary600: '#2B77CB',
  primary700: '#2C5282',
  primary800: '#2A4365',
  primary900: '#1A365D',

  // Secondary (Emerald) - Fresh, calming
  secondary50: '#ECFDF5',
  secondary100: '#D1FAE5',
  secondary200: '#A7F3D0',
  secondary300: '#6EE7B7',
  secondary400: '#34D399',
  secondary500: '#10B981',
  secondary600: '#059669',
  secondary700: '#047857',
  secondary800: '#065F46',
  secondary900: '#064E3B',

  // Neutral (Slate) - Professional, clean
  neutral50: '#F8FAFC',
  neutral100: '#F1F5F9',
  neutral200: '#E2E8F0',
  neutral300: '#CBD5E1',
  neutral400: '#94A3B8',
  neutral500: '#64748B',
  neutral600: '#475569',
  neutral700: '#334155',
  neutral800: '#1E293B',
  neutral900: '#0F172A',

  // Semantic colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  // Surface colors
  background: '#FFFFFF',
  surface: '#F8FAFC',
  card: '#FFFFFF',
  overlay: 'rgba(0, 0, 0, 0.5)',

  // Text colors
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  textTertiary: '#64748B',
  textDisabled: '#94A3B8',
  textOnPrimary: '#FFFFFF',
  textOnSecondary: '#FFFFFF',

  // Border colors
  border: '#E2E8F0',
  borderSecondary: '#CBD5E1',
  borderActive: '#3182CE',

  // Interactive colors
  interactive: '#3182CE',
  interactiveHover: '#2C5282',
  interactivePressed: '#2A4365',
  interactiveDisabled: '#94A3B8',
};

// Dark Theme Colors
export const darkColors: ColorPalette = {
  // Primary (Blue) - Same hues, adjusted for dark backgrounds
  primary50: '#1A365D',
  primary100: '#2A4365',
  primary200: '#2C5282',
  primary300: '#2B77CB',
  primary400: '#3182CE',
  primary500: '#4299E1',
  primary600: '#63B3ED',
  primary700: '#90CDF4',
  primary800: '#BEE3F8',
  primary900: '#EBF8FF',

  // Secondary (Emerald)
  secondary50: '#064E3B',
  secondary100: '#065F46',
  secondary200: '#047857',
  secondary300: '#059669',
  secondary400: '#10B981',
  secondary500: '#34D399',
  secondary600: '#6EE7B7',
  secondary700: '#A7F3D0',
  secondary800: '#D1FAE5',
  secondary900: '#ECFDF5',

  // Neutral (Dark slate)
  neutral50: '#0F172A',
  neutral100: '#1E293B',
  neutral200: '#334155',
  neutral300: '#475569',
  neutral400: '#64748B',
  neutral500: '#94A3B8',
  neutral600: '#CBD5E1',
  neutral700: '#E2E8F0',
  neutral800: '#F1F5F9',
  neutral900: '#F8FAFC',

  // Semantic colors (darker variants)
  success: '#34D399',
  warning: '#FBBF24',
  error: '#F87171',
  info: '#60A5FA',

  // Surface colors
  background: '#0F172A',
  surface: '#1E293B',
  card: '#334155',
  overlay: 'rgba(0, 0, 0, 0.8)',

  // Text colors
  textPrimary: '#F8FAFC',
  textSecondary: '#CBD5E1',
  textTertiary: '#94A3B8',
  textDisabled: '#64748B',
  textOnPrimary: '#0F172A',
  textOnSecondary: '#0F172A',

  // Border colors
  border: '#334155',
  borderSecondary: '#475569',
  borderActive: '#4299E1',

  // Interactive colors
  interactive: '#4299E1',
  interactiveHover: '#63B3ED',
  interactivePressed: '#90CDF4',
  interactiveDisabled: '#64748B',
};

// Warm Theme Colors (Alternative brand color)
export const warmColors: ColorPalette = {
  // Primary (Orange) - Warm, energetic
  primary50: '#FFF7ED',
  primary100: '#FFEDD5',
  primary200: '#FED7AA',
  primary300: '#FDBA74',
  primary400: '#FB923C',
  primary500: '#F97316',
  primary600: '#EA580C',
  primary700: '#C2410C',
  primary800: '#9A3412',
  primary900: '#7C2D12',

  // Secondary (Rose) - Warm accent
  secondary50: '#FFF1F2',
  secondary100: '#FFE4E6',
  secondary200: '#FECDD3',
  secondary300: '#FDA4AF',
  secondary400: '#FB7185',
  secondary500: '#F43F5E',
  secondary600: '#E11D48',
  secondary700: '#BE123C',
  secondary800: '#9F1239',
  secondary900: '#881337',

  // Neutral (Warm gray)
  neutral50: '#FAFAF9',
  neutral100: '#F5F5F4',
  neutral200: '#E7E5E4',
  neutral300: '#D6D3D1',
  neutral400: '#A8A29E',
  neutral500: '#78716C',
  neutral600: '#57534E',
  neutral700: '#44403C',
  neutral800: '#292524',
  neutral900: '#1C1917',

  // Semantic colors
  success: '#22C55E',
  warning: '#EAB308',
  error: '#EF4444',
  info: '#3B82F6',

  // Surface colors
  background: '#FFFFFF',
  surface: '#FAFAF9',
  card: '#FFFFFF',
  overlay: 'rgba(0, 0, 0, 0.5)',

  // Text colors
  textPrimary: '#1C1917',
  textSecondary: '#44403C',
  textTertiary: '#78716C',
  textDisabled: '#A8A29E',
  textOnPrimary: '#FFFFFF',
  textOnSecondary: '#FFFFFF',

  // Border colors
  border: '#E7E5E4',
  borderSecondary: '#D6D3D1',
  borderActive: '#F97316',

  // Interactive colors
  interactive: '#F97316',
  interactiveHover: '#EA580C',
  interactivePressed: '#C2410C',
  interactiveDisabled: '#A8A29E',
};

// Cool Theme Colors (Alternative brand color)
export const coolColors: ColorPalette = {
  // Primary (Indigo) - Cool, sophisticated
  primary50: '#EEF2FF',
  primary100: '#E0E7FF',
  primary200: '#C7D2FE',
  primary300: '#A5B4FC',
  primary400: '#818CF8',
  primary500: '#6366F1',
  primary600: '#4F46E5',
  primary700: '#4338CA',
  primary800: '#3730A3',
  primary900: '#312E81',

  // Secondary (Teal) - Cool accent
  secondary50: '#F0FDFA',
  secondary100: '#CCFBF1',
  secondary200: '#99F6E4',
  secondary300: '#5EEAD4',
  secondary400: '#2DD4BF',
  secondary500: '#14B8A6',
  secondary600: '#0D9488',
  secondary700: '#0F766E',
  secondary800: '#115E59',
  secondary900: '#134E4A',

  // Neutral (Cool gray)
  neutral50: '#F9FAFB',
  neutral100: '#F3F4F6',
  neutral200: '#E5E7EB',
  neutral300: '#D1D5DB',
  neutral400: '#9CA3AF',
  neutral500: '#6B7280',
  neutral600: '#4B5563',
  neutral700: '#374151',
  neutral800: '#1F2937',
  neutral900: '#111827',

  // Semantic colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  // Surface colors
  background: '#FFFFFF',
  surface: '#F9FAFB',
  card: '#FFFFFF',
  overlay: 'rgba(0, 0, 0, 0.5)',

  // Text colors
  textPrimary: '#111827',
  textSecondary: '#4B5563',
  textTertiary: '#6B7280',
  textDisabled: '#9CA3AF',
  textOnPrimary: '#FFFFFF',
  textOnSecondary: '#FFFFFF',

  // Border colors
  border: '#E5E7EB',
  borderSecondary: '#D1D5DB',
  borderActive: '#6366F1',

  // Interactive colors
  interactive: '#6366F1',
  interactiveHover: '#4F46E5',
  interactivePressed: '#4338CA',
  interactiveDisabled: '#9CA3AF',
};

export type ThemeVariant = 'modern' | 'dark' | 'warm' | 'cool';

export const colorThemes = {
  modern: modernColors,
  dark: darkColors,
  warm: warmColors,
  cool: coolColors,
} as const;
