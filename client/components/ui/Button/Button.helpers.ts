import { Theme } from '@/themes/themes';
import { ButtonVariant, ButtonSize } from './Button.interfaces';

/**
 * Generates styles for a button based on the provided theme, variant, size, and state.
 *
 * @param theme - The theme object containing color and spacing definitions.
 * @param variant - The variant of the button (e.g., primary, secondary).
 * @param size - The size of the button (e.g., small, medium, large).
 * @param disabled - Whether the button is disabled.
 * @param pressed - Whether the button is currently pressed.
 * @returns An object containing the styles for the button.
 */
export function getButtonStyles(
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

