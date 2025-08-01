import {
  ViewProps as RNViewProps,
} from 'react-native';
import { ShadowLevel } from '@/themes/shadows';
import { Theme } from '@/themes/themes';
import { SpacingKey, BorderRadiusKey } from '@/themes/spacing';

export interface ThemedViewProps extends Omit<RNViewProps, 'style'> {
  // Background color
  backgroundColor?: keyof Theme['colors'];

  // Spacing props
  padding?: SpacingKey | number;
  paddingHorizontal?: SpacingKey | number;
  paddingVertical?: SpacingKey | number;
  paddingTop?: SpacingKey | number;
  paddingBottom?: SpacingKey | number;
  paddingLeft?: SpacingKey | number;
  paddingRight?: SpacingKey | number;

  margin?: SpacingKey | number;
  marginHorizontal?: SpacingKey | number;
  marginVertical?: SpacingKey | number;
  marginTop?: SpacingKey | number;
  marginBottom?: SpacingKey | number;
  marginLeft?: SpacingKey | number;
  marginRight?: SpacingKey | number;

  // Border radius
  borderRadius?: BorderRadiusKey | number;
  borderTopLeftRadius?: BorderRadiusKey | number;
  borderTopRightRadius?: BorderRadiusKey | number;
  borderBottomLeftRadius?: BorderRadiusKey | number;
  borderBottomRightRadius?: BorderRadiusKey | number;

  // Shadow
  shadow?: ShadowLevel;

  // Border
  borderWidth?: number;
  borderColor?: keyof Theme['colors'];
  borderTopWidth?: number;
  borderBottomWidth?: number;
  borderLeftWidth?: number;
  borderRightWidth?: number;

  // Layout
  flex?: number;
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  justifyContent?:
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  alignSelf?:
  | 'auto'
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'stretch'
  | 'baseline';

  // Width and height
  width?: number | string;
  height?: number | string;
  minWidth?: number | string;
  minHeight?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;

  // Position
  position?: 'absolute' | 'relative';
  top?: number | string;
  bottom?: number | string;
  left?: number | string;
  right?: number | string;
  zIndex?: number;

  // Custom style
  style?: RNViewProps['style'];
}
