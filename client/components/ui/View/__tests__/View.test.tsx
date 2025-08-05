import React from 'react';
import { Text as RNText } from 'react-native';
import { screen } from '@testing-library/react-native';
import {
  View,
  SafeView,
  CenterView,
  RowView,
  ColumnView,
} from '../View';
import {
  renderWithTheme,
  TEST_DATA,
  VIEW_SCENARIOS,
} from './View.test.utils';

describe('<View />', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      renderWithTheme(
        <View testID="test-view">
          <RNText>Test Content</RNText>
        </View>
      );

      expect(screen.getByTestId('test-view')).toBeTruthy();
      expect(screen.getByText('Test Content')).toBeTruthy();
    });

    it('renders without children (empty view)', () => {
      renderWithTheme(<View testID="empty-view" />);
      expect(screen.getByTestId('empty-view')).toBeTruthy();
    });

    it('renders with testID correctly', () => {
      const testId = 'custom-view-id';
      renderWithTheme(<View testID={testId} />);
      expect(screen.getByTestId(testId)).toBeTruthy();
    });

    it('passes through React Native View props', () => {
      renderWithTheme(
        <View
          testID="props-view"
          accessible={true}
          accessibilityLabel="Test view"
        />
      );

      const view = screen.getByTestId('props-view');
      expect(view).toBeTruthy();
      expect(view.props.accessibilityLabel).toBe('Test view');
    });
  });

  describe('Background Colors', () => {
    it.each(TEST_DATA.backgroundColors)('renders with %s background color', (backgroundColor) => {
      renderWithTheme(
        <View
          testID={`bg-${backgroundColor}-view`}
          backgroundColor={backgroundColor}
        />
      );

      expect(screen.getByTestId(`bg-${backgroundColor}-view`)).toBeTruthy();
    });
  });

  describe('Spacing Properties', () => {
    describe('Padding', () => {
      it.each(TEST_DATA.spacingKeys)('applies padding with spacing key: %s', (spacingKey) => {
        renderWithTheme(
          <View
            testID={`padding-${spacingKey}-view`}
            padding={spacingKey}
          />
        );

        expect(screen.getByTestId(`padding-${spacingKey}-view`)).toBeTruthy();
      });

      it.each(TEST_DATA.spacingNumbers)('applies padding with number value: %d', (spacingValue) => {
        renderWithTheme(
          <View
            testID={`padding-${spacingValue}-view`}
            padding={spacingValue}
          />
        );

        expect(screen.getByTestId(`padding-${spacingValue}-view`)).toBeTruthy();
      });

      it('applies directional padding correctly', () => {
        renderWithTheme(
          <View
            testID="directional-padding-view"
            paddingTop="sm"
            paddingBottom="md"
            paddingLeft="lg"
            paddingRight="xl"
          />
        );

        expect(screen.getByTestId('directional-padding-view')).toBeTruthy();
      });

      it('applies horizontal and vertical padding', () => {
        renderWithTheme(
          <View
            testID="axis-padding-view"
            paddingHorizontal="md"
            paddingVertical="lg"
          />
        );

        expect(screen.getByTestId('axis-padding-view')).toBeTruthy();
      });
    });

    describe('Margin', () => {
      it.each(TEST_DATA.spacingKeys)('applies margin with spacing key: %s', (spacingKey) => {
        renderWithTheme(
          <View
            testID={`margin-${spacingKey}-view`}
            margin={spacingKey}
          />
        );

        expect(screen.getByTestId(`margin-${spacingKey}-view`)).toBeTruthy();
      });

      it.each(TEST_DATA.spacingNumbers)('applies margin with number value: %d', (spacingValue) => {
        renderWithTheme(
          <View
            testID={`margin-${spacingValue}-view`}
            margin={spacingValue}
          />
        );

        expect(screen.getByTestId(`margin-${spacingValue}-view`)).toBeTruthy();
      });

      it('applies directional margin correctly', () => {
        renderWithTheme(
          <View
            testID="directional-margin-view"
            marginTop="sm"
            marginBottom="md"
            marginLeft="lg"
            marginRight="xl"
          />
        );

        expect(screen.getByTestId('directional-margin-view')).toBeTruthy();
      });
    });
  });

  describe('Border Properties', () => {
    describe('Border Radius', () => {
      it.each(TEST_DATA.borderRadiusKeys)('applies border radius with key: %s', (borderRadiusKey) => {
        renderWithTheme(
          <View
            testID={`border-radius-${borderRadiusKey}-view`}
            borderRadius={borderRadiusKey}
          />
        );

        expect(screen.getByTestId(`border-radius-${borderRadiusKey}-view`)).toBeTruthy();
      });

      it.each(TEST_DATA.borderRadiusNumbers)('applies border radius with number: %d', (borderRadiusValue) => {
        renderWithTheme(
          <View
            testID={`border-radius-${borderRadiusValue}-view`}
            borderRadius={borderRadiusValue}
          />
        );

        expect(screen.getByTestId(`border-radius-${borderRadiusValue}-view`)).toBeTruthy();
      });

      it('applies corner-specific border radius', () => {
        renderWithTheme(
          <View
            testID="corner-radius-view"
            borderTopLeftRadius="sm"
            borderTopRightRadius="md"
            borderBottomLeftRadius="lg"
            borderBottomRightRadius="xl"
          />
        );

        expect(screen.getByTestId('corner-radius-view')).toBeTruthy();
      });
    });

    describe('Border Width and Color', () => {
      it('applies border width and color', () => {
        renderWithTheme(
          <View
            testID="border-view"
            borderWidth={2}
            borderColor="border"
          />
        );

        expect(screen.getByTestId('border-view')).toBeTruthy();
      });

      it.each(TEST_DATA.borderColors)('applies border color: %s', (borderColor) => {
        renderWithTheme(
          <View
            testID={`border-color-${borderColor}-view`}
            borderWidth={1}
            borderColor={borderColor}
          />
        );

        expect(screen.getByTestId(`border-color-${borderColor}-view`)).toBeTruthy();
      });

      it('applies directional border widths', () => {
        renderWithTheme(
          <View
            testID="directional-border-view"
            borderTopWidth={1}
            borderBottomWidth={2}
            borderLeftWidth={3}
            borderRightWidth={4}
          />
        );

        expect(screen.getByTestId('directional-border-view')).toBeTruthy();
      });
    });
  });

  describe('Shadow Properties', () => {
    it.each(TEST_DATA.shadowLevels)('applies shadow level: %s', (shadowLevel) => {
      renderWithTheme(
        <View
          testID={`shadow-${shadowLevel}-view`}
          shadow={shadowLevel}
        />
      );

      expect(screen.getByTestId(`shadow-${shadowLevel}-view`)).toBeTruthy();
    });
  });

  describe('Layout Properties', () => {
    describe('Flexbox', () => {
      it('applies flex property', () => {
        renderWithTheme(
          <View
            testID="flex-view"
            flex={1}
          />
        );

        expect(screen.getByTestId('flex-view')).toBeTruthy();
      });

      it.each(TEST_DATA.flexDirections)('applies flex direction: %s', (flexDirection) => {
        renderWithTheme(
          <View
            testID={`flex-direction-${flexDirection}-view`}
            flexDirection={flexDirection}
          />
        );

        expect(screen.getByTestId(`flex-direction-${flexDirection}-view`)).toBeTruthy();
      });

      it.each(TEST_DATA.justifyContentValues)('applies justify content: %s', (justifyContent) => {
        renderWithTheme(
          <View
            testID={`justify-${justifyContent}-view`}
            justifyContent={justifyContent}
          />
        );

        expect(screen.getByTestId(`justify-${justifyContent}-view`)).toBeTruthy();
      });

      it.each(TEST_DATA.alignItemsValues)('applies align items: %s', (alignItems) => {
        renderWithTheme(
          <View
            testID={`align-${alignItems}-view`}
            alignItems={alignItems}
          />
        );

        expect(screen.getByTestId(`align-${alignItems}-view`)).toBeTruthy();
      });

      it('applies align self property', () => {
        renderWithTheme(
          <View
            testID="align-self-view"
            alignSelf="center"
          />
        );

        expect(screen.getByTestId('align-self-view')).toBeTruthy();
      });
    });

    describe('Dimensions', () => {
      it.each(TEST_DATA.sizeValues.numbers)('applies width as number: %d', (width) => {
        renderWithTheme(
          <View
            testID={`width-${width}-view`}
            width={width}
          />
        );

        expect(screen.getByTestId(`width-${width}-view`)).toBeTruthy();
      });

      it.each(TEST_DATA.sizeValues.strings)('applies width as string: %s', (width) => {
        renderWithTheme(
          <View
            testID={`width-${width.replace('%', 'percent')}-view`}
            width={width}
          />
        );

        expect(screen.getByTestId(`width-${width.replace('%', 'percent')}-view`)).toBeTruthy();
      });

      it('applies height property', () => {
        renderWithTheme(
          <View
            testID="height-view"
            height={200}
          />
        );

        expect(screen.getByTestId('height-view')).toBeTruthy();
      });

      it('applies min and max dimensions', () => {
        renderWithTheme(
          <View
            testID="min-max-view"
            minWidth={100}
            maxWidth={300}
            minHeight={50}
            maxHeight={150}
          />
        );

        expect(screen.getByTestId('min-max-view')).toBeTruthy();
      });
    });

    describe('Position', () => {
      it.each(TEST_DATA.positionValues)('applies position: %s', (position) => {
        renderWithTheme(
          <View
            testID={`position-${position}-view`}
            position={position}
          />
        );

        expect(screen.getByTestId(`position-${position}-view`)).toBeTruthy();
      });

      it('applies position coordinates', () => {
        renderWithTheme(
          <View
            testID="coordinates-view"
            position="absolute"
            top={10}
            bottom={20}
            left={30}
            right={40}
            zIndex={5}
          />
        );

        expect(screen.getByTestId('coordinates-view')).toBeTruthy();
      });
    });
  });

  describe('Custom Style Override', () => {
    it('accepts custom style prop', () => {
      const customStyle = { opacity: 0.5 };

      renderWithTheme(
        <View
          testID="custom-style-view"
          style={customStyle}
        />
      );

      expect(screen.getByTestId('custom-style-view')).toBeTruthy();
    });

    it('combines themed styles with custom styles', () => {
      const customStyle = { opacity: 0.8 };

      renderWithTheme(
        <View
          testID="combined-style-view"
          backgroundColor="primary500"
          padding="md"
          style={customStyle}
        />
      );

      expect(screen.getByTestId('combined-style-view')).toBeTruthy();
    });
  });

  describe('Real-world Usage Scenarios', () => {
    describe('Basic Containers', () => {
      it.each(VIEW_SCENARIOS.basicContainers)('renders $name correctly', ({ props }) => {
        renderWithTheme(
          <View
            testID="scenario-view"
            {...props}
          >
            <RNText>Content</RNText>
          </View>
        );

        expect(screen.getByTestId('scenario-view')).toBeTruthy();
        expect(screen.getByText('Content')).toBeTruthy();
      });
    });

    describe('Card Components', () => {
      it.each(VIEW_SCENARIOS.cardComponents)('renders $name correctly', ({ props }) => {
        renderWithTheme(
          <View
            testID="card-view"
            {...props}
          >
            <RNText>Card Content</RNText>
          </View>
        );

        expect(screen.getByTestId('card-view')).toBeTruthy();
        expect(screen.getByText('Card Content')).toBeTruthy();
      });
    });

    describe('Layout Sections', () => {
      it.each(VIEW_SCENARIOS.layoutSections)('renders $name correctly', ({ props }) => {
        renderWithTheme(
          <View
            testID="section-view"
            {...props}
          >
            <RNText>Section Content</RNText>
          </View>
        );

        expect(screen.getByTestId('section-view')).toBeTruthy();
        expect(screen.getByText('Section Content')).toBeTruthy();
      });
    });
  });
});

describe('Preset View Components', () => {
  describe('<SafeView />', () => {
    it('renders with default safe view props', () => {
      renderWithTheme(
        <SafeView testID="safe-view">
          <RNText>Safe Content</RNText>
        </SafeView>
      );

      expect(screen.getByTestId('safe-view')).toBeTruthy();
      expect(screen.getByText('Safe Content')).toBeTruthy();
    });

    it('allows prop overrides', () => {
      renderWithTheme(
        <SafeView
          testID="custom-safe-view"
          backgroundColor="surface"
          padding="lg"
        >
          <RNText>Custom Safe Content</RNText>
        </SafeView>
      );

      expect(screen.getByTestId('custom-safe-view')).toBeTruthy();
      expect(screen.getByText('Custom Safe Content')).toBeTruthy();
    });
  });

  describe('<CenterView />', () => {
    it('renders with default center view props', () => {
      renderWithTheme(
        <CenterView testID="center-view">
          <RNText>Centered Content</RNText>
        </CenterView>
      );

      expect(screen.getByTestId('center-view')).toBeTruthy();
      expect(screen.getByText('Centered Content')).toBeTruthy();
    });

    it('allows prop overrides', () => {
      renderWithTheme(
        <CenterView
          testID="custom-center-view"
          backgroundColor="primary500"
        >
          <RNText>Custom Centered Content</RNText>
        </CenterView>
      );

      expect(screen.getByTestId('custom-center-view')).toBeTruthy();
      expect(screen.getByText('Custom Centered Content')).toBeTruthy();
    });
  });

  describe('<RowView />', () => {
    it('renders with default row view props', () => {
      renderWithTheme(
        <RowView testID="row-view">
          <RNText>Row Item 1</RNText>
          <RNText>Row Item 2</RNText>
        </RowView>
      );

      expect(screen.getByTestId('row-view')).toBeTruthy();
      expect(screen.getByText('Row Item 1')).toBeTruthy();
      expect(screen.getByText('Row Item 2')).toBeTruthy();
    });

    it('allows prop overrides', () => {
      renderWithTheme(
        <RowView
          testID="custom-row-view"
          justifyContent="space-between"
          padding="md"
        >
          <RNText>Spaced Item 1</RNText>
          <RNText>Spaced Item 2</RNText>
        </RowView>
      );

      expect(screen.getByTestId('custom-row-view')).toBeTruthy();
      expect(screen.getByText('Spaced Item 1')).toBeTruthy();
      expect(screen.getByText('Spaced Item 2')).toBeTruthy();
    });
  });

  describe('<ColumnView />', () => {
    it('renders with default column view props', () => {
      renderWithTheme(
        <ColumnView testID="column-view">
          <RNText>Column Item 1</RNText>
          <RNText>Column Item 2</RNText>
        </ColumnView>
      );

      expect(screen.getByTestId('column-view')).toBeTruthy();
      expect(screen.getByText('Column Item 1')).toBeTruthy();
      expect(screen.getByText('Column Item 2')).toBeTruthy();
    });

    it('allows prop overrides', () => {
      renderWithTheme(
        <ColumnView
          testID="custom-column-view"
          alignItems="center"
          padding="md"
        >
          <RNText>Centered Column Item 1</RNText>
          <RNText>Centered Column Item 2</RNText>
        </ColumnView>
      );

      expect(screen.getByTestId('custom-column-view')).toBeTruthy();
      expect(screen.getByText('Centered Column Item 1')).toBeTruthy();
      expect(screen.getByText('Centered Column Item 2')).toBeTruthy();
    });
  });
});
