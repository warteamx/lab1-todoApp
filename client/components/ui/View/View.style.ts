import { StyleSheet, ViewStyle } from 'react-native';
import { Theme } from '@/themes/themes';
import { SpacingKey, BorderRadiusKey } from '@/themes/spacing';
import { ThemedViewProps } from './View.interface';

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

export const createThemedStyle = (
  theme: Theme,
  props: ThemedViewProps
) => {
  const {
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
  } = props;

  return StyleSheet.create({
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
};
