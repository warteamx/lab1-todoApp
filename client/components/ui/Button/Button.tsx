// Themed Button component with multiple variants and states

import React from 'react';
import {
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  View as RNView,
} from 'react-native';
import { useTheme } from '@/providers/themeProvider';
import { Text } from '../Text';
import { ThemedButtonProps } from './Button.interfaces';
import { getButtonStyles } from './Button.helpers';

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
      <RNView style={themedStyle.content}>
        {leftIcon && (
          <RNView style={themedStyle.leftIcon}>{leftIcon}</RNView>
        )}

        {!iconOnly && (title || children) && (
          <Text style={themedStyle.text}>{children || title}</Text>
        )}

        {rightIcon && (
          <RNView style={themedStyle.rightIcon}>{rightIcon}</RNView>
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
