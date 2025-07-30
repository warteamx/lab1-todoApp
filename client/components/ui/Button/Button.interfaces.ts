import { TouchableOpacityProps } from 'react-native';
import { Theme } from '@/themes/themes';
import { ShadowLevel } from '@/themes/shadows';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'small' | 'medium' | 'large';


export interface ThemedButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  // Button content
  title?: string;
  children?: React.ReactNode;

  // Button styling
  variant?: ButtonVariant;
  size?: ButtonSize;

  // State
  loading?: boolean;
  disabled?: boolean;

  // Icon
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  iconOnly?: boolean;

  // Layout
  fullWidth?: boolean;

  // Custom styling
  backgroundColor?: keyof Theme['colors'];
  textColor?: keyof Theme['colors'];
  borderColor?: keyof Theme['colors'];
  shadow?: ShadowLevel;
  borderRadius?: number;

  // Custom style
  style?: TouchableOpacityProps['style'];
}
