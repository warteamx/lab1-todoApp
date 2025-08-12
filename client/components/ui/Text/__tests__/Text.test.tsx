import React from 'react';
import { screen } from '@testing-library/react-native';
import {
  Text,
  DisplayText,
  HeadlineText,
  TitleText,
  BodyText,
  LabelText,
  CaptionText,
  OverlineText,
} from '../Text';
import { renderWithTheme, TEST_DATA } from './Text.test.utils';
import { ThemeProvider } from '@/providers/themeProvider';

describe('<Text />', () => {
  describe('Rendering', () => {
    it('renders with children text correctly', () => {
      const testText = TEST_DATA.sampleTexts.short;
      renderWithTheme(<Text>{testText}</Text>);
      expect(screen.getByText(testText)).toBeTruthy();
    });

    it('renders with different text content types', () => {
      Object.entries(TEST_DATA.sampleTexts).forEach(([key, text]) => {
        renderWithTheme(<Text testID={`text-${key}`}>{text}</Text>);
        expect(screen.getByTestId(`text-${key}`)).toBeTruthy();
      });
    });

    it('renders without children (empty)', () => {
      renderWithTheme(<Text testID="empty-text" />);
      expect(screen.getByTestId('empty-text')).toBeTruthy();
    });

    it('renders with testID correctly', () => {
      const testId = 'custom-text-id';
      renderWithTheme(<Text testID={testId}>Test</Text>);
      expect(screen.getByTestId(testId)).toBeTruthy();
    });
  });

  describe('Typography Variants', () => {
    it.each(TEST_DATA.variants)('renders %s variant correctly', (variant) => {
      const testText = TEST_DATA.sampleTexts.medium;
      renderWithTheme(<Text variant={variant} testID={`text-${variant}`}>{testText}</Text>);

      const textElement = screen.getByTestId(`text-${variant}`);
      expect(textElement).toBeTruthy();
      expect(screen.getByText(testText)).toBeTruthy();
    });

    it('uses default variant when none specified', () => {
      renderWithTheme(<Text testID="default-variant">Test</Text>);
      const textElement = screen.getByTestId('default-variant');
      expect(textElement).toBeTruthy();
    });
  });

  describe('Colors', () => {
    it.each(TEST_DATA.colors)('renders with %s color correctly', (color) => {
      const testText = TEST_DATA.sampleTexts.medium;
      renderWithTheme(<Text color={color} testID={`text-${color}`}>{testText}</Text>);

      const textElement = screen.getByTestId(`text-${color}`);
      expect(textElement).toBeTruthy();
      expect(screen.getByText(testText)).toBeTruthy();
    });

    it('uses default color when none specified', () => {
      renderWithTheme(<Text testID="default-color">Test</Text>);
      const textElement = screen.getByTestId('default-color');
      expect(textElement).toBeTruthy();
    });
  });

  describe('Text Alignment', () => {
    it.each(TEST_DATA.alignments)('renders with %s alignment correctly', (align) => {
      const testText = TEST_DATA.sampleTexts.medium;
      renderWithTheme(<Text align={align} testID={`text-${align}`}>{testText}</Text>);

      const textElement = screen.getByTestId(`text-${align}`);
      expect(textElement).toBeTruthy();
      expect(screen.getByText(testText)).toBeTruthy();
    });

    it('uses default alignment when none specified', () => {
      renderWithTheme(<Text testID="default-align">Test</Text>);
      const textElement = screen.getByTestId('default-align');
      expect(textElement).toBeTruthy();
    });
  });

  describe('Custom Styles', () => {
    it('applies custom style correctly', () => {
      const customStyle = { textDecorationLine: 'underline' as const };
      renderWithTheme(
        <Text style={customStyle} testID="custom-style">
          Test
        </Text>
      );

      const textElement = screen.getByTestId('custom-style');
      expect(textElement).toBeTruthy();
    });

    it('merges custom style with theme styles', () => {
      const customStyle = {
        textDecorationLine: 'underline' as const,
        fontStyle: 'italic' as const,
      };
      renderWithTheme(
        <Text
          variant="headlineLarge"
          color="primary500"
          style={customStyle}
          testID="merged-style"
        >
          Test
        </Text>
      );

      const textElement = screen.getByTestId('merged-style');
      expect(textElement).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('passes through accessibility props correctly', () => {
      renderWithTheme(
        <Text
          accessibilityLabel="Custom label"
          accessibilityRole="header"
          testID="accessible-text"
        >
          Test
        </Text>
      );

      const textElement = screen.getByTestId('accessible-text');
      expect(textElement).toBeTruthy();
      expect(textElement.props.accessibilityLabel).toBe('Custom label');
      expect(textElement.props.accessibilityRole).toBe('header');
    });

    it('has proper accessibility by default', () => {
      renderWithTheme(<Text testID="default-accessibility">Test Content</Text>);
      const textElement = screen.getByTestId('default-accessibility');
      expect(textElement).toBeTruthy();
    });
  });

  describe('Props Handling', () => {
    it('passes through other React Native Text props', () => {
      renderWithTheme(
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          selectable={true}
          testID="rn-props"
        >
          {TEST_DATA.sampleTexts.long}
        </Text>
      );

      const textElement = screen.getByTestId('rn-props');
      expect(textElement).toBeTruthy();
      expect(textElement.props.numberOfLines).toBe(2);
      expect(textElement.props.ellipsizeMode).toBe('tail');
      expect(textElement.props.selectable).toBe(true);
    });
  });
});

describe('Preset Text Components', () => {
  describe('<DisplayText />', () => {
    it.each(TEST_DATA.sizes)('renders %s size correctly', (size) => {
      renderWithTheme(<DisplayText size={size} testID={`display-${size}`}>Test</DisplayText>);
      const textElement = screen.getByTestId(`display-${size}`);
      expect(textElement).toBeTruthy();
      expect(screen.getByText('Test')).toBeTruthy();
    });

    it('uses medium size as default', () => {
      renderWithTheme(<DisplayText testID="display-default">Test</DisplayText>);
      const textElement = screen.getByTestId('display-default');
      expect(textElement).toBeTruthy();
    });

    it('passes through other props correctly', () => {
      renderWithTheme(
        <DisplayText
          size="large"
          color="primary500"
          align="center"
          testID="display-props"
        >
          Test
        </DisplayText>
      );
      const textElement = screen.getByTestId('display-props');
      expect(textElement).toBeTruthy();
    });
  });

  describe('<HeadlineText />', () => {
    it.each(TEST_DATA.sizes)('renders %s size correctly', (size) => {
      renderWithTheme(<HeadlineText size={size} testID={`headline-${size}`}>Test</HeadlineText>);
      const textElement = screen.getByTestId(`headline-${size}`);
      expect(textElement).toBeTruthy();
      expect(screen.getByText('Test')).toBeTruthy();
    });

    it('uses medium size as default', () => {
      renderWithTheme(<HeadlineText testID="headline-default">Test</HeadlineText>);
      const textElement = screen.getByTestId('headline-default');
      expect(textElement).toBeTruthy();
    });
  });

  describe('<TitleText />', () => {
    it.each(TEST_DATA.sizes)('renders %s size correctly', (size) => {
      renderWithTheme(<TitleText size={size} testID={`title-${size}`}>Test</TitleText>);
      const textElement = screen.getByTestId(`title-${size}`);
      expect(textElement).toBeTruthy();
      expect(screen.getByText('Test')).toBeTruthy();
    });

    it('uses medium size as default', () => {
      renderWithTheme(<TitleText testID="title-default">Test</TitleText>);
      const textElement = screen.getByTestId('title-default');
      expect(textElement).toBeTruthy();
    });
  });

  describe('<BodyText />', () => {
    it.each(TEST_DATA.sizes)('renders %s size correctly', (size) => {
      renderWithTheme(<BodyText size={size} testID={`body-${size}`}>Test</BodyText>);
      const textElement = screen.getByTestId(`body-${size}`);
      expect(textElement).toBeTruthy();
      expect(screen.getByText('Test')).toBeTruthy();
    });

    it('uses medium size as default', () => {
      renderWithTheme(<BodyText testID="body-default">Test</BodyText>);
      const textElement = screen.getByTestId('body-default');
      expect(textElement).toBeTruthy();
    });
  });

  describe('<LabelText />', () => {
    it.each(TEST_DATA.sizes)('renders %s size correctly', (size) => {
      renderWithTheme(<LabelText size={size} testID={`label-${size}`}>Test</LabelText>);
      const textElement = screen.getByTestId(`label-${size}`);
      expect(textElement).toBeTruthy();
      expect(screen.getByText('Test')).toBeTruthy();
    });

    it('uses medium size as default', () => {
      renderWithTheme(<LabelText testID="label-default">Test</LabelText>);
      const textElement = screen.getByTestId('label-default');
      expect(textElement).toBeTruthy();
    });
  });

  describe('<CaptionText />', () => {
    it('renders correctly', () => {
      renderWithTheme(<CaptionText testID="caption">Test Caption</CaptionText>);
      const textElement = screen.getByTestId('caption');
      expect(textElement).toBeTruthy();
      expect(screen.getByText('Test Caption')).toBeTruthy();
    });

    it('passes through props correctly', () => {
      renderWithTheme(
        <CaptionText
          color="textSecondary"
          align="right"
          testID="caption-props"
        >
          Test
        </CaptionText>
      );
      const textElement = screen.getByTestId('caption-props');
      expect(textElement).toBeTruthy();
    });
  });

  describe('<OverlineText />', () => {
    it('renders correctly', () => {
      renderWithTheme(<OverlineText testID="overline">Test Overline</OverlineText>);
      const textElement = screen.getByTestId('overline');
      expect(textElement).toBeTruthy();
      expect(screen.getByText('Test Overline')).toBeTruthy();
    });

    it('passes through props correctly', () => {
      renderWithTheme(
        <OverlineText
          color="textSecondary"
          align="center"
          testID="overline-props"
        >
          Test
        </OverlineText>
      );
      const textElement = screen.getByTestId('overline-props');
      expect(textElement).toBeTruthy();
    });
  });
});

describe('Integration Tests', () => {
  describe('Real-world Usage Scenarios', () => {
    it('renders a complex layout with multiple text components', () => {
      renderWithTheme(
        <>
          <DisplayText size="large" color="primary500" testID="hero-title">
            Welcome to Our App
          </DisplayText>
          <HeadlineText size="medium" color="textPrimary" testID="section-title">
            Features
          </HeadlineText>
          <BodyText size="large" color="textSecondary" testID="description">
            {TEST_DATA.sampleTexts.long}
          </BodyText>
          <CaptionText color="textSecondary" testID="footnote">
            * Terms and conditions apply
          </CaptionText>
        </>
      );

      expect(screen.getByTestId('hero-title')).toBeTruthy();
      expect(screen.getByTestId('section-title')).toBeTruthy();
      expect(screen.getByTestId('description')).toBeTruthy();
      expect(screen.getByTestId('footnote')).toBeTruthy();

      expect(screen.getByText('Welcome to Our App')).toBeTruthy();
      expect(screen.getByText('Features')).toBeTruthy();
      expect(screen.getByText(TEST_DATA.sampleTexts.long)).toBeTruthy();
      expect(screen.getByText('* Terms and conditions apply')).toBeTruthy();
    });

    it('handles dynamic content updates', () => {
      const { rerender } = renderWithTheme(
        <Text testID="dynamic-text">Initial content</Text>
      );

      expect(screen.getByText('Initial content')).toBeTruthy();

      rerender(
        <ThemeProvider>
          <Text testID="dynamic-text">Updated content</Text>
        </ThemeProvider>
      );

      expect(screen.getByText('Updated content')).toBeTruthy();
      expect(screen.queryByText('Initial content')).toBeNull();
    });

    it('works with nested text structures', () => {
      renderWithTheme(
        <BodyText testID="parent-text">
          This is parent text with{' '}
          <Text variant="labelSmall" color="primary500">nested text</Text>
          {' '}inside.
        </BodyText>
      );

      const parentElement = screen.getByTestId('parent-text');
      expect(parentElement).toBeTruthy();
      // Note: Testing nested text content can be complex with react-native-testing-library
      // This test verifies the structure renders without errors
    });
  });

  describe('Error Boundaries and Edge Cases', () => {
    it('handles undefined children gracefully', () => {
      renderWithTheme(<Text testID="undefined-children">{undefined}</Text>);
      const textElement = screen.getByTestId('undefined-children');
      expect(textElement).toBeTruthy();
    });

    it('handles null children gracefully', () => {
      renderWithTheme(<Text testID="null-children">{null}</Text>);
      const textElement = screen.getByTestId('null-children');
      expect(textElement).toBeTruthy();
    });

    it('handles zero as children', () => {
      renderWithTheme(<Text testID="zero-children">{0}</Text>);
      const textElement = screen.getByTestId('zero-children');
      expect(textElement).toBeTruthy();
      expect(screen.getByText('0')).toBeTruthy();
    });

    it('handles boolean children gracefully', () => {
      renderWithTheme(<Text testID="boolean-children">{true}</Text>);
      const textElement = screen.getByTestId('boolean-children');
      expect(textElement).toBeTruthy();
    });
  });
});
