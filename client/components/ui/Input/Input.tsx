// Themed Input component with validation and states

import React, { useState } from 'react';
import {
  TextInput as RNTextInput,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import { useTheme } from '@/providers/themeProvider';
import { View } from '../View';
import { Text } from '../Text';
import { ThemedInputProps } from './Input.interface';
import { createInputStyles } from './Input.styles';
import { getInputColors } from './Input.helpers';

export const TextInput: React.FC<ThemedInputProps> = ({
  variant = 'outline',
  size = 'medium',
  label,
  helperText,
  errorText,
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = true,
  backgroundColor,
  borderColor,
  textColor,
  containerStyle,
  inputStyle,
  onFocus,
  onBlur,
  ...props
}) => {
  const { theme } = useTheme();
  const [focused, setFocused] = useState(false);

  const hasError = !!errorText;

  const styles = createInputStyles({
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
  });

  const colors = getInputColors(theme, variant, disabled, hasError, focused);

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setFocused(false);
    onBlur?.(e);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Label */}
      {label && (
        <Text
          variant="labelMedium"
          color={hasError ? 'error' : 'textSecondary'}
          style={styles.label}
        >
          {label}
        </Text>
      )}

      {/* Input Container */}
      <View style={styles.inputContainer}>
        {/* Left Icon */}
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

        {/* Text Input */}
        <RNTextInput
          style={[styles.input, inputStyle]}
          placeholderTextColor={colors.placeholderColor}
          editable={!disabled && !loading}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />

        {/* Right Icon */}
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>

      {/* Helper/Error Text */}
      {(helperText || errorText) && (
        <View style={styles.helperContainer}>
          <Text variant="caption" color={hasError ? 'error' : 'textTertiary'}>
            {errorText || helperText}
          </Text>
        </View>
      )}
    </View>
  );
};

// Convenient preset input components
export const OutlineInput: React.FC<
  Omit<ThemedInputProps, 'variant'>
> = props => <TextInput variant="outline" {...props} />;

export const FilledInput: React.FC<
  Omit<ThemedInputProps, 'variant'>
> = props => <TextInput variant="filled" {...props} />;

export const UnderlineInput: React.FC<
  Omit<ThemedInputProps, 'variant'>
> = props => <TextInput variant="default" {...props} />;

// Specialized input components
export const PasswordInput: React.FC<ThemedInputProps> = props => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextInput
      secureTextEntry={!showPassword}
      rightIcon={
        <Text
          variant="labelMedium"
          color="interactive"
          onPress={() => setShowPassword(!showPassword)}
        >
          {showPassword ? 'Hide' : 'Show'}
        </Text>
      }
      {...props}
    />
  );
};

export const SearchInput: React.FC<ThemedInputProps> = props => (
  <TextInput placeholder="Search..." leftIcon={<Text>🔍</Text>} {...props} />
);
