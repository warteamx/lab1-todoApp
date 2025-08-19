import { TouchableOpacityProps } from 'react-native';
import { SpacingKey, BorderRadiusKey } from '@/themes/spacing';
import { ShadowLevel } from '@/themes/shadows';
import { Theme } from '@/themes/themes';


export type CardVariant = 'elevated' | 'outlined' | 'filled';


export interface ThemedCardProps {
  // Content
  children: React.ReactNode;

  // Styling
  variant?: CardVariant;
  padding?: SpacingKey;
  borderRadius?: BorderRadiusKey;
  shadow?: ShadowLevel;

  // Colors
  backgroundColor?: keyof Theme['colors'];
  borderColor?: keyof Theme['colors'];

  // Interaction
  onPress?: TouchableOpacityProps['onPress'];
  disabled?: boolean;

  // Layout
  fullWidth?: boolean;

  // Custom style
  style?: any;

  // Testing
  testID?: string;
}


// Card Header component
export interface CardHeaderProps {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  children?: React.ReactNode;
}

// Card Content component
export interface CardContentProps {
  children: React.ReactNode;
  padding?: SpacingKey;
}

// Card Footer component
export interface CardFooterProps {
  children: React.ReactNode;
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between';
}
