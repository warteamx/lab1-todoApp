// Themed Input component with validation and states

import React, { useState } from 'react';
import { 
  TextInput as RNTextInput, 
  TextInputProps as RNTextInputProps, 
  TextStyle as RNTextStyle,
  StyleSheet,
  Platform,
} from 'react-native';
import { useTheme } from '@/providers/themeProvider';
import { ThemedView as View } from './View';
import { Text } from './Text';
import { Theme } from '@/themes/themes';

type InputVariant = 'default' | 'filled' | 'outline';
type InputSize = 'small' | 'medium' | 'large';

interface ThemedInputProps extends Omit<RNTextInputProps, 'style'> {
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
  
  // Size configurations
  const sizeConfig = {
    small: {
      height: 36,
      paddingHorizontal: theme.spacing.sm,
      fontSize: 14,
    },
    medium: {
      height: 44,
      paddingHorizontal: theme.spacing.md,
      fontSize: 16,
    },
    large: {
      height: 52,
      paddingHorizontal: theme.spacing.lg,
      fontSize: 18,
    },
  };
  
  const currentSize = sizeConfig[size];
  
  // Color configurations based on variant and state
  const getInputColors = () => {
    if (disabled) {
      return {
        backgroundColor: theme.colors.neutral100,
        borderColor: theme.colors.borderSecondary,
        textColor: theme.colors.textDisabled,
        placeholderColor: theme.colors.textDisabled,
      };
    }
    
    if (hasError) {
      return {
        backgroundColor: variant === 'filled' ? theme.colors.neutral50 : 'transparent',
        borderColor: theme.colors.error,
        textColor: theme.colors.textPrimary,
        placeholderColor: theme.colors.textTertiary,
      };
    }
    
    if (focused) {
      return {
        backgroundColor: variant === 'filled' ? theme.colors.neutral50 : 'transparent',
        borderColor: theme.colors.borderActive,
        textColor: theme.colors.textPrimary,
        placeholderColor: theme.colors.textTertiary,
      };
    }
    
    // Default state
    return {
      backgroundColor: variant === 'filled' ? theme.colors.neutral50 : 'transparent',
      borderColor: variant === 'default' ? 'transparent' : theme.colors.border,
      textColor: theme.colors.textPrimary,
      placeholderColor: theme.colors.textTertiary,
    };
  };
  
  const colors = getInputColors();
  
  // Override with custom colors if provided
  const finalBackgroundColor = backgroundColor 
    ? theme.colors[backgroundColor as keyof typeof theme.colors] 
    : colors.backgroundColor;
  const finalBorderColor = borderColor 
    ? theme.colors[borderColor as keyof typeof theme.colors] 
    : colors.borderColor;
  const finalTextColor = textColor 
    ? theme.colors[textColor as keyof typeof theme.colors] 
    : colors.textColor;

  const styles = StyleSheet.create({
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

  const handleFocus = (e: any) => {
    setFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
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
        {leftIcon && (
          <View style={styles.leftIcon}>
            {leftIcon}
          </View>
        )}
        
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
        {rightIcon && (
          <View style={styles.rightIcon}>
            {rightIcon}
          </View>
        )}
      </View>
      
      {/* Helper/Error Text */}
      {(helperText || errorText) && (
        <View style={styles.helperContainer}>
          <Text 
            variant="caption" 
            color={hasError ? 'error' : 'textTertiary'}
          >
            {errorText || helperText}
          </Text>
        </View>
      )}
    </View>
  );
};

// Convenient preset input components
export const OutlineInput: React.FC<Omit<ThemedInputProps, 'variant'>> = (props) => (
  <TextInput variant="outline" {...props} />
);

export const FilledInput: React.FC<Omit<ThemedInputProps, 'variant'>> = (props) => (
  <TextInput variant="filled" {...props} />
);

export const UnderlineInput: React.FC<Omit<ThemedInputProps, 'variant'>> = (props) => (
  <TextInput variant="default" {...props} />
);

// Specialized input components
export const PasswordInput: React.FC<ThemedInputProps> = (props) => {
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

export const SearchInput: React.FC<ThemedInputProps> = (props) => (
  <TextInput
    placeholder="Search..."
    leftIcon={<Text>🔍</Text>}
    {...props}
  />
);
