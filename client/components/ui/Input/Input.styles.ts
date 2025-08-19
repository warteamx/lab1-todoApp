import { StyleSheet, Platform , TextStyle as RNTextStyle } from 'react-native';
import { Theme } from '@/themes/themes';
import { InputVariant, InputSize } from './Input.interface';
import { sizeConfig, getInputColors } from './Input.helpers';

export interface InputStylesProps {
  theme: Theme;
  variant: InputVariant;
  size: InputSize;
  disabled: boolean;
  hasError: boolean;
  focused: boolean;
  fullWidth: boolean;
  backgroundColor?: keyof Theme['colors'];
  borderColor?: keyof Theme['colors'];
  textColor?: keyof Theme['colors'];
}

export const createInputStyles = ({
  theme,
  variant,
  size,
  disabled,
  hasError,
  focused,
  fullWidth,
  backgroundColor,
  borderColor,
  textColor,
}: InputStylesProps) => {
  const currentSize = sizeConfig(theme)[size];
  const colors = getInputColors(theme, variant, disabled, hasError, focused);

  // Override with custom colors if provided
  const finalBackgroundColor = backgroundColor
    ? theme.colors[backgroundColor]
    : colors.backgroundColor;
  const finalBorderColor = borderColor
    ? theme.colors[borderColor]
    : colors.borderColor;
  const finalTextColor = textColor
    ? theme.colors[textColor]
    : colors.textColor;

  return StyleSheet.create({
    container: {
      ...(fullWidth && { width: '100%' }),
    },
    label: {
      marginBottom: theme.spacing.sm,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: theme.borderRadius.md,
      borderWidth: variant === 'default' ? 0 : 1,
      borderColor: finalBorderColor,
      backgroundColor: finalBackgroundColor,
      minHeight: currentSize.height,
      paddingHorizontal: currentSize.paddingHorizontal,
      ...(variant === 'default' && {
        borderBottomWidth: 1,
        borderRadius: 0,
      }),
    },
    input: {
      flex: 1,
      fontSize: currentSize.fontSize,
      color: finalTextColor,
      paddingVertical: 0, // Remove default padding
      minHeight: currentSize.height - 2, // Account for border
      ...(Platform.OS === 'web' && {
        outlineStyle: 'none',
      }),
    } as RNTextStyle,
    leftIcon: {
      marginRight: theme.spacing.sm,
    },
    rightIcon: {
      marginLeft: theme.spacing.sm,
    },
    helperContainer: {
      marginTop: theme.spacing.xs,
    },
  });
};
