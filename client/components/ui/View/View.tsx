// Themed View component with layout utilities and responsive spacing

import React from 'react';
import {
  View as RNView,
} from 'react-native';
import { useTheme } from '@/providers/themeProvider';
import { ThemedViewProps } from './View.interface';
import { createThemedStyle } from './View.style';

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

  const themedStyle = createThemedStyle(theme, {
    backgroundColor,

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

    borderRadius,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    shadow,
    borderWidth,
    borderColor,
    borderTopWidth,
    borderBottomWidth,
    borderLeftWidth,
    borderRightWidth,

    flex,
    flexDirection,
    justifyContent,
    alignItems,
    alignSelf,
    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    position,
    top,
    bottom,
    left,
    right,
    zIndex,
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
