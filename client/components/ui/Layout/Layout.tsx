// Layout components for responsive design and consistent spacing

import React from 'react';
import {
  ScrollView,
  StyleProp,
  Platform,
  Dimensions,
} from 'react-native';
import { useTheme } from '@/providers/themeProvider';
import { View } from '../View';
import { Text } from '../Text/Text';
import { SpacingKey } from '@/themes/spacing';
import {
  ContainerProps,
  ScreenSize,
  ScreenProps,
  SectionProps,
  StackProps,
  InlineProps,
  GridProps,
  SpacerProps,
  CenterProps,
} from './Layout.interface'

// Get screen dimensions
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Responsive breakpoints
const isTablet = screenWidth >= 768;
const isDesktop = screenWidth >= 1024;
const isMobile = screenWidth < 768;



// Hook to get current screen size
export const useScreenSize = (): ScreenSize => {
  if (isDesktop) return 'desktop';
  if (isTablet) return 'tablet';
  return 'mobile';
};


export const Container: React.FC<ContainerProps> = ({
  children,
  size,
  maxWidth,
  padding,
  backgroundColor = 'background',
  safeArea = true,
  style,
}) => {
  const { theme } = useTheme();
  const screenSize = size || useScreenSize();

  // Get responsive padding
  const containerPadding =
    padding || theme.layoutSpacing.containerPadding[screenSize];

  // Get max width for content
  const getMaxWidth = () => {
    if (maxWidth) return maxWidth;

    switch (screenSize) {
      case 'desktop':
        return 1200;
      case 'tablet':
        return 768;
      default:
        return '100%';
    }
  };

  return (
    <View flex={1} backgroundColor={backgroundColor as any} style={style}>
      <View
        flex={1}
        alignSelf="center"
        width="100%"
        maxWidth={getMaxWidth() as any}
        padding={containerPadding as any}
        style={{
          ...(safeArea &&
            Platform.OS !== 'web' && {
            paddingTop: Platform.OS === 'ios' ? 44 : 24,
          }),
        }}
      >
        {children}
      </View>
    </View>
  );
};

// Screen wrapper component with scroll
export const Screen: React.FC<ScreenProps> = ({
  children,
  padding,
  backgroundColor = 'background',
  safeArea = true,
  scrollable = true,
  style,
  ...scrollProps
}) => {
  const { theme } = useTheme();
  const screenSize = useScreenSize();

  const containerPadding =
    padding || theme.layoutSpacing.containerPadding[screenSize];

  const containerStyle = React.useMemo(
    () => ({
      flex: 1,
      backgroundColor:
        theme.colors[backgroundColor as keyof typeof theme.colors] ||
        backgroundColor,
      ...(safeArea &&
        Platform.OS !== 'web' && {
        paddingTop: Platform.OS === 'ios' ? 44 : 24,
      }),
    }),
    [theme, backgroundColor, safeArea]
  );

  if (scrollable) {
    return (
      <ScrollView
        style={[containerStyle, style]}
        contentContainerStyle={{
          padding: theme.spacing[containerPadding as SpacingKey],
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        {...scrollProps}
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <View style={[containerStyle, style]}>
      <View padding={containerPadding as any} flex={1}>
        {children}
      </View>
    </View>
  );
};

// Section component for content grouping
export const Section: React.FC<SectionProps> = ({
  children,
  title,
  subtitle,
  spacing = '2xl',
  style,
}) => {
  const { theme } = useTheme();

  return (
    <View marginBottom={spacing} style={style}>
      {/* Section Header */}
      {(title || subtitle) && (
        <View marginBottom="lg">
          {title && (
            <Text variant="headlineMedium" color="textPrimary">
              {title}
            </Text>
          )}
          {subtitle && (
            <Text
              variant="bodyLarge"
              color="textSecondary"
              style={{ marginTop: theme.spacing.xs }}
            >
              {subtitle}
            </Text>
          )}
        </View>
      )}

      {/* Section Content */}
      {children}
    </View>
  );
};

// Stack component for vertical spacing
export const Stack: React.FC<StackProps> = ({
  children,
  spacing = 'md',
  align = 'stretch',
  style,
}) => {
  const { theme } = useTheme();

  const childrenArray = React.Children.toArray(children);
  const spacingValue = theme.spacing[spacing];

  return (
    <View style={style}>
      {childrenArray.map((child, index) => (
        <View
          key={index}
          alignSelf={align}
          style={{
            marginBottom: index < childrenArray.length - 1 ? spacingValue : 0,
          }}
        >
          {child}
        </View>
      ))}
    </View>
  );
};

// Inline component for horizontal spacing
export const Inline: React.FC<InlineProps> = ({
  children,
  spacing = 'md',
  align = 'center',
  justify = 'flex-start',
  wrap = false,
  style,
}) => {
  const { theme } = useTheme();

  const childrenArray = React.Children.toArray(children);
  const spacingValue = theme.spacing[spacing];

  return (
    <View
      flexDirection="row"
      alignItems={align}
      justifyContent={justify}
      style={[
        {
          ...(wrap && { flexWrap: 'wrap' }),
        },
        style,
      ]}
    >
      {childrenArray.map((child, index) => (
        <View
          key={index}
          style={{
            marginRight: index < childrenArray.length - 1 ? spacingValue : 0,
          }}
        >
          {child}
        </View>
      ))}
    </View>
  );
};

// Grid component for responsive layouts
export const Grid: React.FC<GridProps> = ({
  children,
  columns = 2,
  spacing = 'md',
  style,
}) => {
  const { theme } = useTheme();
  const screenSize = useScreenSize();

  // Responsive columns
  const getColumns = () => {
    if (screenSize === 'mobile') return Math.min(columns, 2);
    if (screenSize === 'tablet') return Math.min(columns, 3);
    return columns;
  };

  const numColumns = getColumns();
  const spacingValue = theme.spacing[spacing];
  const childrenArray = React.Children.toArray(children);

  // Split children into rows
  const rows: React.ReactNode[][] = [];
  for (let i = 0; i < childrenArray.length; i += numColumns) {
    rows.push(childrenArray.slice(i, i + numColumns));
  }

  return (
    <View style={style}>
      {rows.map((row, rowIndex) => (
        <View
          key={rowIndex}
          flexDirection="row"
          style={{
            marginBottom: rowIndex < rows.length - 1 ? spacingValue : 0,
          }}
        >
          {row.map((child, colIndex) => (
            <View
              key={colIndex}
              flex={1}
              style={{
                marginRight: colIndex < row.length - 1 ? spacingValue : 0,
              }}
            >
              {child}
            </View>
          ))}

          {/* Fill empty spaces in incomplete rows */}
          {row.length < numColumns &&
            Array(numColumns - row.length)
              .fill(null)
              .map((_, index) => <View key={`empty-${index}`} flex={1} />)}
        </View>
      ))}
    </View>
  );
};

// Spacer component for flexible spacing
export const Spacer: React.FC<SpacerProps> = ({ size, flex }) => {
  const { theme } = useTheme();

  if (flex) {
    return <View flex={flex} />;
  }

  const spacingValue =
    typeof size === 'number' ? size : theme.spacing[size || 'md'];

  return <View style={{ height: spacingValue }} />;
};

// Center component for centering content
export const Center: React.FC<CenterProps> = ({
  children,
  minHeight,
  style,
}) => {
  return (
    <View
      flex={1}
      justifyContent="center"
      alignItems="center"
      style={[{ minHeight }, style]}
    >
      {children}
    </View>
  );
};
