import {
  TextProps as RNTextProps,
} from 'react-native';
import { Theme } from '@/themes/themes';
import { TextVariant } from '@/themes/typography';

export interface ThemedTextProps extends Omit<RNTextProps, 'style'> {
  variant?: TextVariant;
  color?: keyof Theme['colors'];
  align?: 'left' | 'center' | 'right' | 'justify';
  style?: RNTextProps['style'];
}
