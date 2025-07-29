// Themed Text component with typography variants

import React from 'react';
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet,
} from 'react-native';
import { useTheme } from '@/providers/themeProvider';
import { TextVariant } from '@/themes/typography';
import { Theme } from '@/themes/themes';

interface ThemedTextProps extends Omit<RNTextProps, 'style'> {
  variant?: TextVariant;
  color?: keyof Theme['colors'];
  align?: 'left' | 'center' | 'right' | 'justify';
  style?: RNTextProps['style'];
}

// Helper function to get typography style from variant
function getTypographyStyle(theme: Theme, variant: TextVariant) {
  switch (variant) {
    case 'displayLarge':
      return theme.typography.display.large;
    case 'displayMedium':
      return theme.typography.display.medium;
    case 'displaySmall':
      return theme.typography.display.small;
    case 'headlineLarge':
      return theme.typography.headline.large;
    case 'headlineMedium':
      return theme.typography.headline.medium;
    case 'headlineSmall':
      return theme.typography.headline.small;
    case 'titleLarge':
      return theme.typography.title.large;
    case 'titleMedium':
      return theme.typography.title.medium;
    case 'titleSmall':
      return theme.typography.title.small;
    case 'bodyLarge':
      return theme.typography.body.large;
    case 'bodyMedium':
      return theme.typography.body.medium;
    case 'bodySmall':
      return theme.typography.body.small;
    case 'labelLarge':
      return theme.typography.label.large;
    case 'labelMedium':
      return theme.typography.label.medium;
    case 'labelSmall':
      return theme.typography.label.small;
    case 'caption':
      return theme.typography.caption;
    case 'overline':
      return theme.typography.overline;
    default:
      return theme.typography.body.medium; // default
  }
}

export const Text: React.FC<ThemedTextProps> = ({
  variant = 'bodyMedium',
  color = 'textPrimary',
  align = 'left',
  style,
  children,
  ...props
}) => {
  const { theme } = useTheme();

  const typographyStyle = getTypographyStyle(theme, variant);
  const textColor = theme.colors[color as keyof typeof theme.colors];

  const themedStyle = StyleSheet.create({
    text: {
      fontSize: typographyStyle.fontSize,
      lineHeight: typographyStyle.lineHeight,
      fontWeight: typographyStyle.fontWeight,
      letterSpacing: typographyStyle.letterSpacing || 0,
      color: textColor,
      textAlign: align,
    },
  });

  return (
    <RNText style={[themedStyle.text, style]} {...props}>
      {children}
    </RNText>
  );
};

// Convenient preset components for common text types
export const DisplayText: React.FC<
  Omit<ThemedTextProps, 'variant'> & { size?: 'large' | 'medium' | 'small' }
> = ({ size = 'medium', ...props }) => (
  <Text
    variant={
      `display${size.charAt(0).toUpperCase() + size.slice(1)}` as TextVariant
    }
    {...props}
  />
);

export const HeadlineText: React.FC<
  Omit<ThemedTextProps, 'variant'> & { size?: 'large' | 'medium' | 'small' }
> = ({ size = 'medium', ...props }) => (
  <Text
    variant={
      `headline${size.charAt(0).toUpperCase() + size.slice(1)}` as TextVariant
    }
    {...props}
  />
);

export const TitleText: React.FC<
  Omit<ThemedTextProps, 'variant'> & { size?: 'large' | 'medium' | 'small' }
> = ({ size = 'medium', ...props }) => (
  <Text
    variant={
      `title${size.charAt(0).toUpperCase() + size.slice(1)}` as TextVariant
    }
    {...props}
  />
);

export const BodyText: React.FC<
  Omit<ThemedTextProps, 'variant'> & { size?: 'large' | 'medium' | 'small' }
> = ({ size = 'medium', ...props }) => (
  <Text
    variant={
      `body${size.charAt(0).toUpperCase() + size.slice(1)}` as TextVariant
    }
    {...props}
  />
);

export const LabelText: React.FC<
  Omit<ThemedTextProps, 'variant'> & { size?: 'large' | 'medium' | 'small' }
> = ({ size = 'medium', ...props }) => (
  <Text
    variant={
      `label${size.charAt(0).toUpperCase() + size.slice(1)}` as TextVariant
    }
    {...props}
  />
);

export const CaptionText: React.FC<
  Omit<ThemedTextProps, 'variant'>
> = props => <Text variant="caption" {...props} />;

export const OverlineText: React.FC<
  Omit<ThemedTextProps, 'variant'>
> = props => <Text variant="overline" {...props} />;
