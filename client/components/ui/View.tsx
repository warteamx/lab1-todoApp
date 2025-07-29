// Themed View component with layout utilities and responsive spacing

import React from 'react';
import {
  View as RNView,
  ViewProps as RNViewProps,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { useTheme } from '@/providers/themeProvider';
import { SpacingKey, BorderRadiusKey } from '@/themes/spacing';
import { ShadowLevel } from '@/themes/shadows';
import { Theme } from '@/themes/themes';

interface ThemedViewProps extends Omit<RNViewProps, 'style'> {
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

// Helper function to get spacing value
function getSpacingValue(theme: Theme, value: SpacingKey | number): number {
  if (typeof value === 'number') {
    return value;
  }
  return theme.spacing[value];
}

// Helper function to get border radius value
function getBorderRadiusValue(
  theme: Theme,
  value: BorderRadiusKey | number
): number {
  if (typeof value === 'number') {
    return value;
  }
  return theme.borderRadius[value];
}

export const View: React.FC<ThemedViewProps> = ({
  backgroundColor,

  // Spacing
  padding,
  paddingHorizontal,
  paddingVertical,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,

  margin,
  marginHorizontal,
  marginVertical,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,

  // Border radius
  borderRadius,
  borderTopLeftRadius,
  borderTopRightRadius,
  borderBottomLeftRadius,
  borderBottomRightRadius,

  // Shadow
  shadow,

  // Border
  borderWidth,
  borderColor,
  borderTopWidth,
  borderBottomWidth,
  borderLeftWidth,
  borderRightWidth,

  // Layout
  flex,
  flexDirection,
  justifyContent,
  alignItems,
  alignSelf,

  // Size
  width,
  height,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,

  // Position
  position,
  top,
  bottom,
  left,
  right,
  zIndex,

  style,
  children,
  ...props
}) => {
  const { theme } = useTheme();

  const themedStyle = StyleSheet.create({
    view: {
      // Background
      ...(backgroundColor && {
        backgroundColor:
          theme.colors[backgroundColor as keyof typeof theme.colors],
      }),

      // Spacing
      ...(padding !== undefined && {
        padding: getSpacingValue(theme, padding),
      }),
      ...(paddingHorizontal !== undefined && {
        paddingHorizontal: getSpacingValue(theme, paddingHorizontal),
      }),
      ...(paddingVertical !== undefined && {
        paddingVertical: getSpacingValue(theme, paddingVertical),
      }),
      ...(paddingTop !== undefined && {
        paddingTop: getSpacingValue(theme, paddingTop),
      }),
      ...(paddingBottom !== undefined && {
        paddingBottom: getSpacingValue(theme, paddingBottom),
      }),
      ...(paddingLeft !== undefined && {
        paddingLeft: getSpacingValue(theme, paddingLeft),
      }),
      ...(paddingRight !== undefined && {
        paddingRight: getSpacingValue(theme, paddingRight),
      }),

      ...(margin !== undefined && {
        margin: getSpacingValue(theme, margin),
      }),
      ...(marginHorizontal !== undefined && {
        marginHorizontal: getSpacingValue(theme, marginHorizontal),
      }),
      ...(marginVertical !== undefined && {
        marginVertical: getSpacingValue(theme, marginVertical),
      }),
      ...(marginTop !== undefined && {
        marginTop: getSpacingValue(theme, marginTop),
      }),
      ...(marginBottom !== undefined && {
        marginBottom: getSpacingValue(theme, marginBottom),
      }),
      ...(marginLeft !== undefined && {
        marginLeft: getSpacingValue(theme, marginLeft),
      }),
      ...(marginRight !== undefined && {
        marginRight: getSpacingValue(theme, marginRight),
      }),

      // Border radius
      ...(borderRadius !== undefined && {
        borderRadius: getBorderRadiusValue(theme, borderRadius),
      }),
      ...(borderTopLeftRadius !== undefined && {
        borderTopLeftRadius: getBorderRadiusValue(theme, borderTopLeftRadius),
      }),
      ...(borderTopRightRadius !== undefined && {
        borderTopRightRadius: getBorderRadiusValue(theme, borderTopRightRadius),
      }),
      ...(borderBottomLeftRadius !== undefined && {
        borderBottomLeftRadius: getBorderRadiusValue(
          theme,
          borderBottomLeftRadius
        ),
      }),
      ...(borderBottomRightRadius !== undefined && {
        borderBottomRightRadius: getBorderRadiusValue(
          theme,
          borderBottomRightRadius
        ),
      }),

      // Shadow
      ...(shadow && theme.shadows[shadow]),

      // Border
      ...(borderWidth !== undefined && { borderWidth }),
      ...(borderColor && {
        borderColor: theme.colors[borderColor as keyof typeof theme.colors],
      }),
      ...(borderTopWidth !== undefined && { borderTopWidth }),
      ...(borderBottomWidth !== undefined && { borderBottomWidth }),
      ...(borderLeftWidth !== undefined && { borderLeftWidth }),
      ...(borderRightWidth !== undefined && { borderRightWidth }),

      // Layout
      ...(flex !== undefined && { flex }),
      ...(flexDirection && { flexDirection }),
      ...(justifyContent && { justifyContent }),
      ...(alignItems && { alignItems }),
      ...(alignSelf && { alignSelf }),

      // Size
      ...(width !== undefined && { width }),
      ...(height !== undefined && { height }),
      ...(minWidth !== undefined && { minWidth }),
      ...(minHeight !== undefined && { minHeight }),
      ...(maxWidth !== undefined && { maxWidth }),
      ...(maxHeight !== undefined && { maxHeight }),

      // Position
      ...(position && { position }),
      ...(top !== undefined && { top }),
      ...(bottom !== undefined && { bottom }),
      ...(left !== undefined && { left }),
      ...(right !== undefined && { right }),
      ...(zIndex !== undefined && { zIndex }),
    } as ViewStyle,
  });

  return (
    <RNView style={[themedStyle.view, style]} {...props}>
      {children}
    </RNView>
  );
};

// Convenient preset components for common layouts
export const SafeView: React.FC<ThemedViewProps> = props => (
  <View flex={1} backgroundColor="background" {...props} />
);

export const CenterView: React.FC<ThemedViewProps> = props => (
  <View flex={1} justifyContent="center" alignItems="center" {...props} />
);

export const RowView: React.FC<ThemedViewProps> = props => (
  <View flexDirection="row" alignItems="center" {...props} />
);

export const ColumnView: React.FC<ThemedViewProps> = props => (
  <View flexDirection="column" {...props} />
);
