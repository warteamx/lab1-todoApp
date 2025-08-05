// Themed Card component for content grouping

import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/themeProvider';
import { View } from '../View/View';
import { Text } from '../Text/Text';
import { ThemedCardProps, CardHeaderProps, CardContentProps, CardFooterProps } from './Card.interface';
import { getCardColors } from './Card.helpers';

export const Card: React.FC<ThemedCardProps> = ({
  children,
  variant = 'elevated',
  padding = 'lg',
  borderRadius = 'lg',
  shadow = 'sm',
  backgroundColor,
  borderColor,
  onPress,
  disabled = false,
  fullWidth = true,
  style,
  testID,
}) => {

  const colors = getCardColors(variant, backgroundColor, borderColor);

  const cardProps = {
    backgroundColor: colors.backgroundColor,
    borderColor: colors.borderColor,
    borderWidth: colors.borderWidth,
    borderRadius,
    padding,
    shadow: variant === 'elevated' ? shadow : undefined,
    fullWidth,
    style,
  };

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}
        style={{ opacity: disabled ? 0.6 : 1 }}
        testID={testID}
      >
        <View {...cardProps}>{children}</View>
      </TouchableOpacity>
    );
  }

  return <View {...cardProps} testID={testID}>{children}</View>;
};



export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  subtitle,
  action,
  children,
}) => {
  const { theme } = useTheme();

  if (children) {
    return <View marginBottom="md">{children}</View>;
  }

  return (
    <View
      flexDirection="row"
      justifyContent="space-between"
      alignItems="flex-start"
      marginBottom="md"
    >
      <View flex={1}>
        {title && (
          <Text variant="titleLarge" color="textPrimary">
            {title}
          </Text>
        )}
        {subtitle && (
          <Text
            variant="bodyMedium"
            color="textSecondary"
            style={{ marginTop: theme.spacing.xs }}
          >
            {subtitle}
          </Text>
        )}
      </View>
      {action && <View marginLeft="md">{action}</View>}
    </View>
  );
};



export const CardContent: React.FC<CardContentProps> = ({
  children,
  padding,
}) => {
  return <View padding={padding}>{children}</View>;
};


export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  justify = 'flex-end',
}) => {
  return (
    <View
      flexDirection="row"
      justifyContent={justify}
      alignItems="center"
      marginTop="md"
    >
      {children}
    </View>
  );
};

// Convenient preset card components
export const ElevatedCard: React.FC<
  Omit<ThemedCardProps, 'variant'>
> = props => <Card variant="elevated" {...props} />;

export const OutlinedCard: React.FC<
  Omit<ThemedCardProps, 'variant'>
> = props => <Card variant="outlined" {...props} />;

export const FilledCard: React.FC<Omit<ThemedCardProps, 'variant'>> = props => (
  <Card variant="filled" {...props} />
);

// Specialized card components
interface ListCardProps extends Omit<ThemedCardProps, 'children'> {
  title: string;
  subtitle?: string;
  description?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const ListCard: React.FC<ListCardProps> = ({
  title,
  subtitle,
  description,
  leftElement,
  rightElement,
  ...props
}) => {
  return (
    <Card padding="md" {...props}>
      <View flexDirection="row" alignItems="center">
        {leftElement && <View marginRight="md">{leftElement}</View>}

        <View flex={1}>
          <Text variant="titleMedium" color="textPrimary">
            {title}
          </Text>
          {subtitle && (
            <Text variant="bodyMedium" color="textSecondary">
              {subtitle}
            </Text>
          )}
          {description && (
            <Text variant="bodySmall" color="textTertiary">
              {description}
            </Text>
          )}
        </View>

        {rightElement && <View marginLeft="md">{rightElement}</View>}
      </View>
    </Card>
  );
};
