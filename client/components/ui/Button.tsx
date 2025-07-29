// Themed Button component with multiple variants and states

import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  Platform,
  View as RNView,
} from 'react-native';
import { useTheme } from '@/providers/themeProvider';
import { Text } from './Text';
import { SpacingKey } from '@/themes/spacing';
import { ShadowLevel } from '@/themes/shadows';
import { Theme } from '@/themes/themes';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'small' | 'medium' | 'large';

interface ThemedButtonProps extends Omit<TouchableOpacityProps, 'style'> {
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

// Helper function to get button styles based on variant and state
function getButtonStyles(
  theme: Theme,
  variant: ButtonVariant,
  size: ButtonSize,
  disabled: boolean,
  pressed: boolean
) {
  const baseStyles = {
    small: {
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      minHeight: 32,
    },
    medium: {
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      minHeight: 44,
    },
    large: {
      paddingVertical: theme.spacing.lg,
      paddingHorizontal: theme.spacing.xl,
      minHeight: 56,
    },
  };

  const sizeStyle = baseStyles[size];

  let backgroundColor: string;
  let textColor: string;
  let borderColor: string | undefined;
  let borderWidth = 0;

  if (disabled) {
    backgroundColor = theme.colors.interactiveDisabled;
    textColor = theme.colors.textDisabled;
    borderColor = theme.colors.borderSecondary;
  } else {
    switch (variant) {
      case 'primary':
        backgroundColor = pressed
          ? theme.colors.interactivePressed
          : theme.colors.interactive;
        textColor = theme.colors.textOnPrimary;
        break;
      case 'secondary':
        backgroundColor = pressed
          ? theme.colors.secondary700
          : theme.colors.secondary500;
        textColor = theme.colors.textOnSecondary;
        break;
      case 'outline':
        backgroundColor = pressed ? theme.colors.neutral100 : 'transparent';
        textColor = theme.colors.interactive;
        borderColor = theme.colors.interactive;
        borderWidth = 1;
        break;
      case 'ghost':
        backgroundColor = pressed ? theme.colors.neutral100 : 'transparent';
        textColor = theme.colors.interactive;
        break;
      case 'danger':
        backgroundColor = pressed
          ? theme.colors.interactivePressed
          : theme.colors.error;
        textColor = theme.colors.textOnPrimary;
        break;
      default:
        backgroundColor = pressed
          ? theme.colors.interactivePressed
          : theme.colors.interactive;
        textColor = theme.colors.textOnPrimary;
    }
  }

  return {
    ...sizeStyle,
    backgroundColor,
    borderColor,
    borderWidth,
    textColor,
  };
}

export const Button: React.FC<ThemedButtonProps> = ({
  title,
  children,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  iconOnly = false,
  fullWidth = false,
  backgroundColor,
  textColor,
  borderColor,
  shadow = 'sm',
  borderRadius,
  style,
  onPress,
  ...props
}) => {
  const { theme } = useTheme();
  const [pressed, setPressed] = React.useState(false);

  const isDisabled = disabled || loading;
  const buttonStyles = getButtonStyles(
    theme,
    variant,
    size,
    isDisabled,
    pressed
  );

  // Override colors if custom ones are provided
  const finalBackgroundColor = backgroundColor
    ? theme.colors[backgroundColor as keyof typeof theme.colors]
    : buttonStyles.backgroundColor;
  const finalTextColor = textColor
    ? theme.colors[textColor as keyof typeof theme.colors]
    : buttonStyles.textColor;
  const finalBorderColor = borderColor
    ? theme.colors[borderColor as keyof typeof theme.colors]
    : buttonStyles.borderColor;

  const themedStyle = StyleSheet.create({
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: borderRadius ?? theme.borderRadius.md,
      paddingVertical: buttonStyles.paddingVertical,
      paddingHorizontal: buttonStyles.paddingHorizontal,
      minHeight: buttonStyles.minHeight,
      backgroundColor: finalBackgroundColor,
      borderColor: finalBorderColor,
      borderWidth: buttonStyles.borderWidth,
      ...(fullWidth && { width: '100%' }),
      ...(shadow && !isDisabled && theme.shadows[shadow]),
      opacity: isDisabled ? 0.6 : 1,
    } as ViewStyle,
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: finalTextColor,
      fontWeight: '600' as const,
      fontSize: size === 'small' ? 14 : size === 'large' ? 18 : 16,
    },
    leftIcon: {
      marginRight: title || children ? theme.spacing.sm : 0,
    },
    rightIcon: {
      marginLeft: title || children ? theme.spacing.sm : 0,
    },
  });

  const handlePressIn = () => {
    setPressed(true);
  };

  const handlePressOut = () => {
    setPressed(false);
  };

  const handlePress = (event: any) => {
    if (!isDisabled && onPress) {
      onPress(event);
    }
  };

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="small" color={finalTextColor} />;
    }

    return (
      <RNView style={themedStyle.content as any}>
        {leftIcon && (
          <RNView style={themedStyle.leftIcon as any}>{leftIcon}</RNView>
        )}

        {!iconOnly && (title || children) && (
          <Text style={themedStyle.text}>{children || title}</Text>
        )}

        {rightIcon && (
          <RNView style={themedStyle.rightIcon as any}>{rightIcon}</RNView>
        )}
      </RNView>
    );
  };

  return (
    <TouchableOpacity
      style={[themedStyle.button, style]}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={isDisabled}
      activeOpacity={0.8}
      {...props}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

// Convenient preset button components
export const PrimaryButton: React.FC<
  Omit<ThemedButtonProps, 'variant'>
> = props => <Button variant="primary" {...props} />;

export const SecondaryButton: React.FC<
  Omit<ThemedButtonProps, 'variant'>
> = props => <Button variant="secondary" {...props} />;

export const OutlineButton: React.FC<
  Omit<ThemedButtonProps, 'variant'>
> = props => <Button variant="outline" {...props} />;

export const GhostButton: React.FC<
  Omit<ThemedButtonProps, 'variant'>
> = props => <Button variant="ghost" {...props} />;

export const DangerButton: React.FC<
  Omit<ThemedButtonProps, 'variant'>
> = props => <Button variant="danger" {...props} />;

export const IconButton: React.FC<
  Omit<ThemedButtonProps, 'iconOnly'>
> = props => <Button iconOnly {...props} />;
