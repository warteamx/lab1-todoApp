import { SpacingKey } from '@/themes/spacing';
import {
  ScrollViewProps,
} from 'react-native';

export type ScreenSize = 'mobile' | 'tablet' | 'desktop';

export interface ContainerProps {
  children: React.ReactNode;
  size?: ScreenSize;
  maxWidth?: number;
  padding?: SpacingKey;
  backgroundColor?: string;
  safeArea?: boolean;
  style?: any;
}

// Screen wrapper component with scroll
export interface ScreenProps extends ScrollViewProps {
  children: React.ReactNode;
  padding?: SpacingKey;
  backgroundColor?: string;
  safeArea?: boolean;
  scrollable?: boolean;
}


// Section component for content grouping
export interface SectionProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  spacing?: SpacingKey;
  style?: any;
}


// Stack component for vertical spacing
export interface StackProps {
  children: React.ReactNode;
  spacing?: SpacingKey;
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
  style?: any;
}

// Inline component for horizontal spacing
export interface InlineProps {
  children: React.ReactNode;
  spacing?: SpacingKey;
  align?: 'flex-start' | 'flex-end' | 'center' | 'baseline';
  justify?:
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around';
  wrap?: boolean;
  style?: any;
}

// Grid component for responsive layouts
export interface GridProps {
  children: React.ReactNode;
  columns?: number;
  spacing?: SpacingKey;
  style?: any;
}

// Spacer component for flexible spacing
export interface SpacerProps {
  size?: SpacingKey | number;
  flex?: number;
}

// Center component for centering content
export interface CenterProps {
  children: React.ReactNode;
  minHeight?: number | string;
  style?: any;
}
