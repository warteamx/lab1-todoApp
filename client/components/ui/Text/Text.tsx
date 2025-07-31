// Themed Text component with typography variants

import React from 'react';
import {
  Text as RNText,
  StyleSheet,
} from 'react-native';
import { useTheme } from '@/providers/themeProvider';
import { TextVariant } from '@/themes/typography';
import { getTypographyStyle } from './Text.helpers'
import { ThemedTextProps } from './Text.interface';


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
