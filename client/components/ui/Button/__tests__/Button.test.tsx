
import React from 'react';
import { fireEvent, screen } from '@testing-library/react-native';
import { View } from 'react-native';
import { Button, PrimaryButton, SecondaryButton, OutlineButton, GhostButton, DangerButton, IconButton } from '../Button';
import {
  renderWithTheme,
  MockIcon,
  TEST_DATA,
  ACCESSIBILITY_HELPERS
} from './Button.skip.utils';

describe('<Button />', () => {
  describe('Rendering', () => {
    it('renders with children text correctly', () => {
      renderWithTheme(<Button>Welcome!</Button>);
      expect(screen.getByText('Welcome!')).toBeTruthy();
    });

    it('renders with title prop correctly', () => {
      renderWithTheme(<Button title="Click me" />);
      expect(screen.getByText('Click me')).toBeTruthy();
    });

    it('prioritizes children over title prop', () => {
      renderWithTheme(<Button title="Title">Children</Button>);
      expect(screen.getByText('Children')).toBeTruthy();
      expect(screen.queryByText('Title')).toBeNull();
    });

    it('renders with testID', () => {
      renderWithTheme(<Button testID="test-button">Test</Button>);
      expect(screen.getByTestId('test-button')).toBeTruthy();
    });
  });

  describe('Variants', () => {
    it.each(TEST_DATA.variants)('renders %s variant correctly', (variant) => {
      renderWithTheme(<Button variant={variant} testID={`${variant}-button`}>Test</Button>);
      expect(screen.getByTestId(`${variant}-button`)).toBeTruthy();
    });
  });

  describe('Sizes', () => {
    it.each(TEST_DATA.sizes)('renders %s size correctly', (size) => {
      renderWithTheme(<Button size={size} testID={`${size}-button`}>Test</Button>);
      expect(screen.getByTestId(`${size}-button`)).toBeTruthy();
    });
  });

  describe('States', () => {
    it('renders loading state with activity indicator', () => {
      renderWithTheme(<Button loading testID="loading-button">Test</Button>);
      const button = screen.getByTestId('loading-button');
      expect(button).toBeTruthy();
      // The loading spinner should be rendered instead of text
      expect(screen.queryByText('Test')).toBeNull();
    });

    it('renders disabled state', () => {
      renderWithTheme(<Button disabled testID="disabled-button">Test</Button>);
      const button = screen.getByTestId('disabled-button');
      expect(button).toBeTruthy();
      expect(button.props.accessibilityState?.disabled).toBe(true);
    });

    it('is disabled when loading', () => {
      renderWithTheme(<Button loading testID="loading-button">Test</Button>);
      const button = screen.getByTestId('loading-button');
      expect(button.props.accessibilityState?.disabled).toBe(true);
    });
  });

  describe('Icons', () => {
    it('renders with left icon', () => {
      renderWithTheme(
        <Button leftIcon={<MockIcon />} testID="left-icon-button">
          Test
        </Button>
      );
      expect(screen.getByTestId('mock-icon')).toBeTruthy();
      expect(screen.getByText('Test')).toBeTruthy();
    });

    it('renders with right icon', () => {
      renderWithTheme(
        <Button rightIcon={<MockIcon />} testID="right-icon-button">
          Test
        </Button>
      );
      expect(screen.getByTestId('mock-icon')).toBeTruthy();
      expect(screen.getByText('Test')).toBeTruthy();
    });

    it('renders icon-only button without text', () => {
      renderWithTheme(
        <Button iconOnly leftIcon={<MockIcon />} testID="icon-only-button">
          Test
        </Button>
      );
      expect(screen.getByTestId('mock-icon')).toBeTruthy();
      expect(screen.queryByText('Test')).toBeNull();
    });

    it('renders with both left and right icons', () => {
      renderWithTheme(
        <Button
          leftIcon={<View testID="left-icon" />}
          rightIcon={<View testID="right-icon" />}
          testID="both-icons-button"
        >
          Test
        </Button>
      );
      expect(screen.getByTestId('left-icon')).toBeTruthy();
      expect(screen.getByTestId('right-icon')).toBeTruthy();
      expect(screen.getByText('Test')).toBeTruthy();
    });
  });

  describe('Layout', () => {
    it('renders full width button', () => {
      renderWithTheme(<Button fullWidth testID="full-width-button">Test</Button>);
      const button = screen.getByTestId('full-width-button');
      expect(button.props.style).toEqual(
        expect.objectContaining({ width: '100%' })
      );
    });
  });

  describe('Interactions', () => {
    it('calls onPress when pressed', () => {
      const mockOnPress = jest.fn();
      renderWithTheme(
        <Button onPress={mockOnPress} testID="pressable-button">
          Test
        </Button>
      );

      fireEvent.press(screen.getByTestId('pressable-button'));
      expect(mockOnPress).toHaveBeenCalledTimes(1);
    });

    describe('disabled scenarios', () => {
      it.each([
        ['disabled', { disabled: true }],
        ['loading', { loading: true }],
      ])('does not call onPress when %s', (scenario, props) => {
        const mockOnPress = jest.fn();
        renderWithTheme(
          <Button {...props} onPress={mockOnPress} testID={`${scenario}-button`}>
            Test
          </Button>
        );

        fireEvent.press(screen.getByTestId(`${scenario}-button`));
        expect(mockOnPress).not.toHaveBeenCalled();
      });
    });

    it('handles press in and press out events', () => {
      renderWithTheme(<Button testID="interactive-button">Test</Button>);
      const button = screen.getByTestId('interactive-button');

      fireEvent(button, 'pressIn');
      fireEvent(button, 'pressOut');
      // No errors should occur
      expect(button).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('has correct accessibility role', () => {
      renderWithTheme(<Button testID="accessible-button">Test</Button>);
      const button = screen.getByTestId('accessible-button');
      ACCESSIBILITY_HELPERS.expectToBeAccessible(button);
    });

    it('has correct accessibility label', () => {
      renderWithTheme(
        <Button accessibilityLabel="Custom label" testID="labeled-button">
          Test
        </Button>
      );
      const button = screen.getByTestId('labeled-button');
      ACCESSIBILITY_HELPERS.expectToHaveLabel(button, 'Custom label');
    });

    it('is properly disabled for accessibility', () => {
      renderWithTheme(<Button disabled testID="disabled-button">Test</Button>);
      const button = screen.getByTestId('disabled-button');
      ACCESSIBILITY_HELPERS.expectToBeDisabled(button);
    });
  });

  describe('Custom Styling', () => {
    it('applies custom style prop', () => {
      const customStyle = { marginTop: 20 };
      renderWithTheme(
        <Button style={customStyle} testID="styled-button">
          Test
        </Button>
      );
      const button = screen.getByTestId('styled-button');
      expect(button.props.style).toEqual(
        expect.objectContaining(customStyle)
      );
    });
  });
});

describe('Button Variants', () => {
  const buttonVariants = [
    { Component: PrimaryButton, name: 'PrimaryButton' },
    { Component: SecondaryButton, name: 'SecondaryButton' },
    { Component: OutlineButton, name: 'OutlineButton' },
    { Component: GhostButton, name: 'GhostButton' },
    { Component: DangerButton, name: 'DangerButton' },
  ];

  describe('rendering', () => {
    it.each(buttonVariants)('$name renders correctly', ({ Component }) => {
      renderWithTheme(<Component testID="variant-button">Test</Component>);
      expect(screen.getByTestId('variant-button')).toBeTruthy();
      expect(screen.getByText('Test')).toBeTruthy();
    });
  });

  describe('interactions', () => {
    it.each(buttonVariants)('$name handles press events', ({ Component }) => {
      const mockOnPress = jest.fn();
      renderWithTheme(
        <Component onPress={mockOnPress} testID="variant-button">
          Test
        </Component>
      );

      fireEvent.press(screen.getByTestId('variant-button'));
      expect(mockOnPress).toHaveBeenCalledTimes(1);
    });
  });

  describe('IconButton', () => {
    it('renders as icon-only by default', () => {
      renderWithTheme(
        <IconButton leftIcon={<MockIcon />} testID="icon-button">
          Hidden Text
        </IconButton>
      );
      expect(screen.getByTestId('mock-icon')).toBeTruthy();
      expect(screen.queryByText('Hidden Text')).toBeNull();
    });

    it('works with different variants', () => {
      renderWithTheme(
        <IconButton
          variant="danger"
          leftIcon={<MockIcon />}
          testID="danger-icon-button"
        >
          Hidden
        </IconButton>
      );
      expect(screen.getByTestId('danger-icon-button')).toBeTruthy();
      expect(screen.getByTestId('mock-icon')).toBeTruthy();
    });
  });
});

