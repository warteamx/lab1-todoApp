// Size configurations
import { Theme } from '@/themes/themes';
import { InputVariant } from './Input.interface';

export const sizeConfig = (theme: Theme) => ({
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
});

// Color configurations based on variant and state
export const getInputColors = (theme: Theme, variant: InputVariant, disabled: boolean, hasError: boolean, focused: boolean) => {
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
      backgroundColor:
        variant === 'filled' ? theme.colors.neutral50 : 'transparent',
      borderColor: theme.colors.error,
      textColor: theme.colors.textPrimary,
      placeholderColor: theme.colors.textTertiary,
    };
  }

  if (focused) {
    return {
      backgroundColor:
        variant === 'filled' ? theme.colors.neutral50 : 'transparent',
      borderColor: theme.colors.borderActive,
      textColor: theme.colors.textPrimary,
      placeholderColor: theme.colors.textTertiary,
    };
  }

  // Default state
  return {
    backgroundColor:
      variant === 'filled' ? theme.colors.neutral50 : 'transparent',
    borderColor: variant === 'default' ? 'transparent' : theme.colors.border,
    textColor: theme.colors.textPrimary,
    placeholderColor: theme.colors.textTertiary,
  };
};
