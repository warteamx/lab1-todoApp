import { Theme } from '@/themes/themes';
import {
  TextInputProps as RNTextInputProps,
} from 'react-native';

export type InputVariant = 'default' | 'filled' | 'outline';
export type InputSize = 'small' | 'medium' | 'large';

export interface ThemedInputProps extends Omit<RNTextInputProps, 'style'> {
  // Input styling
  variant?: InputVariant;
  size?: InputSize;

  // Label and helper text
  label?: string;
  helperText?: string;
  errorText?: string;

  // State
  disabled?: boolean;
  loading?: boolean;

  // Icons
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;

  // Layout
  fullWidth?: boolean;

  // Custom styling
  backgroundColor?: keyof Theme['colors'];
  borderColor?: keyof Theme['colors'];
  textColor?: keyof Theme['colors'];

  // Container style
  containerStyle?: any;
  inputStyle?: RNTextInputProps['style'];
}
