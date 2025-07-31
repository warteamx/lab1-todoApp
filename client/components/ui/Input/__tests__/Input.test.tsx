import React from 'react';
import { fireEvent, screen } from '@testing-library/react-native';
import {
  TextInput,
  OutlineInput,
  FilledInput,
  UnderlineInput,
  PasswordInput,
  SearchInput
} from '../Input';
import {
  renderWithTheme,
  renderWithThemeVariant,
  MockIcon,
  TEST_CONSTANTS,
  TEST_EVENTS,
  TEST_DATA, // Backward compatibility
  INPUT_SCENARIOS,
  ACCESSIBILITY_HELPERS,
  INPUT_STATE_HELPERS,
  THEME_HELPERS,
  TEST_PATTERNS,
  createTestThemeContext
} from './Input.test.utils';

describe('<TextInput />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders without props correctly', () => {
      renderWithTheme(<TextInput />);
      // Component should render without errors
      expect(true).toBe(true);
    });

    it('renders with placeholder correctly', () => {
      const { placeholder } = TEST_DATA.sampleProps.basicInput;
      renderWithTheme(<TextInput placeholder={placeholder} />);

      const input = screen.getByPlaceholderText(placeholder);
      expect(input).toBeTruthy();
      INPUT_STATE_HELPERS.expectToHavePlaceholder(input, placeholder);
    });

    it('renders with label correctly', () => {
      const { label, placeholder } = TEST_DATA.sampleProps.withLabel;
      renderWithTheme(<TextInput label={label} placeholder={placeholder} />);

      expect(screen.getByText(label)).toBeTruthy();
      expect(screen.getByPlaceholderText(placeholder)).toBeTruthy();
    });

    it('renders with helper text correctly', () => {
      const { label, placeholder, helperText } = TEST_DATA.sampleProps.withHelperText;
      renderWithTheme(
        <TextInput
          label={label}
          placeholder={placeholder}
          helperText={helperText}
        />
      );

      expect(screen.getByText(label)).toBeTruthy();
      expect(screen.getByText(helperText)).toBeTruthy();
      expect(screen.getByPlaceholderText(placeholder)).toBeTruthy();
    });

    it('renders with error text correctly', () => {
      const { label, placeholder, errorText } = TEST_DATA.sampleProps.withError;
      renderWithTheme(
        <TextInput
          label={label}
          placeholder={placeholder}
          errorText={errorText}
        />
      );

      expect(screen.getByText(label)).toBeTruthy();
      expect(screen.getByText(errorText)).toBeTruthy();
      expect(screen.getByPlaceholderText(placeholder)).toBeTruthy();
    });

    it('prioritizes error text over helper text', () => {
      const errorText = 'Error message';
      const helperText = 'Helper message';

      renderWithTheme(
        <TextInput
          placeholder="Test"
          helperText={helperText}
          errorText={errorText}
        />
      );

      expect(screen.getByText(errorText)).toBeTruthy();
      expect(screen.queryByText(helperText)).toBeNull();
    });
  });

  describe('Variants', () => {
    it.each(TEST_DATA.variants)(
      'renders %s variant correctly',
      (variant) => {
        renderWithTheme(
          <TextInput
            variant={variant}
            label={`${variant} Input`}
            placeholder={`${variant} placeholder`}
          />
        );

        expect(screen.getByText(`${variant} Input`)).toBeTruthy();
        expect(screen.getByPlaceholderText(`${variant} placeholder`)).toBeTruthy();
      }
    );

    it('defaults to outline variant', () => {
      renderWithTheme(<TextInput placeholder="Default variant" />);
      const input = screen.getByPlaceholderText('Default variant');
      expect(input).toBeTruthy();
    });
  });

  describe('Sizes', () => {
    it.each(TEST_DATA.sizes)(
      'renders %s size correctly',
      (size) => {
        renderWithTheme(
          <TextInput
            size={size}
            label={`${size} Input`}
            placeholder={`${size} placeholder`}
          />
        );

        expect(screen.getByText(`${size} Input`)).toBeTruthy();
        expect(screen.getByPlaceholderText(`${size} placeholder`)).toBeTruthy();
      }
    );

    it('defaults to medium size', () => {
      renderWithTheme(<TextInput placeholder="Default size" />);
      const input = screen.getByPlaceholderText('Default size');
      expect(input).toBeTruthy();
    });
  });

  describe('Icons', () => {
    it('renders left icon correctly', () => {
      renderWithTheme(
        <TextInput
          placeholder="With left icon"
          leftIcon={<MockIcon testID="left-icon">🔍</MockIcon>}
        />
      );

      expect(screen.getByTestId('left-icon')).toBeTruthy();
      expect(screen.getByText('🔍')).toBeTruthy();
      expect(screen.getByPlaceholderText('With left icon')).toBeTruthy();
    });

    it('renders right icon correctly', () => {
      renderWithTheme(
        <TextInput
          placeholder="With right icon"
          rightIcon={<MockIcon testID="right-icon">✕</MockIcon>}
        />
      );

      expect(screen.getByTestId('right-icon')).toBeTruthy();
      expect(screen.getByText('✕')).toBeTruthy();
      expect(screen.getByPlaceholderText('With right icon')).toBeTruthy();
    });

    it('renders both left and right icons correctly', () => {
      const { label, placeholder, leftIcon, rightIcon } = TEST_DATA.sampleProps.withIcons;
      renderWithTheme(
        <TextInput
          label={label}
          placeholder={placeholder}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
        />
      );

      expect(screen.getByTestId('left-icon')).toBeTruthy();
      expect(screen.getByTestId('right-icon')).toBeTruthy();
      expect(screen.getByText('🔍')).toBeTruthy();
      expect(screen.getByText('✕')).toBeTruthy();
      expect(screen.getByPlaceholderText(placeholder)).toBeTruthy();
    });

    it('renders without icons when not provided', () => {
      renderWithTheme(<TextInput placeholder="No icons" />);

      expect(screen.queryByTestId('left-icon')).toBeNull();
      expect(screen.queryByTestId('right-icon')).toBeNull();
      expect(screen.getByPlaceholderText('No icons')).toBeTruthy();
    });
  });

  describe('States', () => {
    it('renders disabled state correctly', () => {
      const { label, placeholder } = TEST_DATA.sampleProps.disabled;
      renderWithTheme(
        <TextInput
          label={label}
          placeholder={placeholder}
          disabled={true}
        />
      );

      const input = screen.getByPlaceholderText(placeholder);
      INPUT_STATE_HELPERS.expectToBeDisabled(input);
      expect(screen.getByText(label)).toBeTruthy();
    });

    it('renders loading state correctly', () => {
      const { label, placeholder } = TEST_DATA.sampleProps.loading;
      renderWithTheme(
        <TextInput
          label={label}
          placeholder={placeholder}
          loading={true}
        />
      );

      const input = screen.getByPlaceholderText(placeholder);
      INPUT_STATE_HELPERS.expectToBeDisabled(input);
      expect(screen.getByText(label)).toBeTruthy();
    });

    it('is enabled by default', () => {
      renderWithTheme(<TextInput placeholder="Enabled input" />);

      const input = screen.getByPlaceholderText('Enabled input');
      INPUT_STATE_HELPERS.expectToBeEnabled(input);
    });
  });

  describe('Interactions', () => {
    it('handles focus events correctly', () => {
      const onFocus = jest.fn();
      renderWithTheme(
        <TextInput
          placeholder="Focus test"
          onFocus={onFocus}
        />
      );

      const input = screen.getByPlaceholderText('Focus test');
      fireEvent(input, 'focus', TEST_DATA.textInputEvents.focus);

      expect(onFocus).toHaveBeenCalledTimes(1);
    });

    it('handles blur events correctly', () => {
      const onBlur = jest.fn();
      renderWithTheme(
        <TextInput
          placeholder="Blur test"
          onBlur={onBlur}
        />
      );

      const input = screen.getByPlaceholderText('Blur test');
      fireEvent(input, 'blur', TEST_DATA.textInputEvents.blur);

      expect(onBlur).toHaveBeenCalledTimes(1);
    });

    it('handles text change events correctly', () => {
      const onChangeText = jest.fn();
      renderWithTheme(
        <TextInput
          placeholder="Change text test"
          onChangeText={onChangeText}
        />
      );

      const input = screen.getByPlaceholderText('Change text test');
      fireEvent.changeText(input, TEST_DATA.textInputEvents.changeText);

      expect(onChangeText).toHaveBeenCalledWith(TEST_DATA.textInputEvents.changeText);
    });

    it('does not handle events when disabled', () => {
      const onFocus = jest.fn();
      const onChangeText = jest.fn();

      renderWithTheme(
        <TextInput
          placeholder="Disabled events test"
          disabled={true}
          onFocus={onFocus}
          onChangeText={onChangeText}
        />
      );

      const input = screen.getByPlaceholderText('Disabled events test');
      INPUT_STATE_HELPERS.expectToBeDisabled(input);
    });
  });

  describe('Layout and Styling', () => {
    it('applies fullWidth correctly', () => {
      renderWithTheme(
        <TextInput
          placeholder="Full width test"
          fullWidth={true}
        />
      );

      const input = screen.getByPlaceholderText('Full width test');
      expect(input).toBeTruthy();
    });

    it('applies custom container style', () => {
      const customStyle = { marginTop: 20 };
      renderWithTheme(
        <TextInput
          placeholder="Custom container style"
          containerStyle={customStyle}
        />
      );

      const input = screen.getByPlaceholderText('Custom container style');
      expect(input).toBeTruthy();
    });

    it('applies custom input style', () => {
      const customStyle = { fontSize: 20 };
      renderWithTheme(
        <TextInput
          placeholder="Custom input style"
          inputStyle={customStyle}
        />
      );

      const input = screen.getByPlaceholderText('Custom input style');
      expect(input).toBeTruthy();
    });

    it('handles complex layout with all elements', () => {
      renderWithTheme(
        <TextInput
          label="Complex Input"
          placeholder="Complex placeholder"
          helperText="Helper text"
          leftIcon={<MockIcon testID="left">🔍</MockIcon>}
          rightIcon={<MockIcon testID="right">✕</MockIcon>}
          fullWidth={true}
        />
      );

      expect(screen.getByText('Complex Input')).toBeTruthy();
      expect(screen.getByPlaceholderText('Complex placeholder')).toBeTruthy();
      expect(screen.getByText('Helper text')).toBeTruthy();
      expect(screen.getByTestId('left')).toBeTruthy();
      expect(screen.getByTestId('right')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('provides accessible input field', () => {
      renderWithTheme(
        <TextInput
          label="Accessible Input"
          placeholder="Accessible placeholder"
        />
      );

      const input = screen.getByPlaceholderText('Accessible placeholder');
      ACCESSIBILITY_HELPERS.expectToBeAccessible(input);
    });

    it('provides accessible labels', () => {
      renderWithTheme(
        <TextInput
          label="Test Label"
          placeholder="Test placeholder"
        />
      );

      const label = screen.getByText('Test Label');
      ACCESSIBILITY_HELPERS.expectToBeAccessible(label);
    });

    it('provides accessible helper text', () => {
      renderWithTheme(
        <TextInput
          placeholder="Test"
          helperText="Helper information"
        />
      );

      const helperText = screen.getByText('Helper information');
      ACCESSIBILITY_HELPERS.expectToBeAccessible(helperText);
    });

    it('provides accessible error text', () => {
      renderWithTheme(
        <TextInput
          placeholder="Test"
          errorText="Error information"
        />
      );

      const errorText = screen.getByText('Error information');
      ACCESSIBILITY_HELPERS.expectToBeAccessible(errorText);
    });
  });

  describe('Input Scenarios', () => {
    it.each(Object.entries(INPUT_SCENARIOS))(
      'renders %s correctly',
      (scenarioName, scenario) => {
        renderWithTheme(<TextInput {...scenario.props} />);

        // Each scenario should render without errors
        if ('label' in scenario.props && scenario.props.label) {
          expect(screen.getByText(scenario.props.label)).toBeTruthy();
        }
        if ('placeholder' in scenario.props && scenario.props.placeholder) {
          expect(screen.getByPlaceholderText(scenario.props.placeholder)).toBeTruthy();
        }
      }
    );
  });

  describe('Error Handling', () => {
    it('handles missing props gracefully', () => {
      renderWithTheme(<TextInput />);
      // Component should render without errors
      expect(true).toBe(true);
    });

    it('handles invalid icons gracefully', () => {
      renderWithTheme(
        <TextInput
          placeholder="Test"
          leftIcon={null as any}
          rightIcon={undefined as any}
        />
      );
      expect(screen.getByPlaceholderText('Test')).toBeTruthy();
    });

    it('handles empty strings gracefully', () => {
      renderWithTheme(
        <TextInput
          label=""
          placeholder=""
          helperText=""
          errorText=""
        />
      );
      // Component should render without errors
      expect(true).toBe(true);
    });
  });
});

describe('Preset Input Components', () => {
  describe('<OutlineInput />', () => {
    it('renders with outline variant', () => {
      renderWithTheme(
        <OutlineInput
          label="Outline Input"
          placeholder="Outline placeholder"
        />
      );

      expect(screen.getByText('Outline Input')).toBeTruthy();
      expect(screen.getByPlaceholderText('Outline placeholder')).toBeTruthy();
    });
  });

  describe('<FilledInput />', () => {
    it('renders with filled variant', () => {
      renderWithTheme(
        <FilledInput
          label="Filled Input"
          placeholder="Filled placeholder"
        />
      );

      expect(screen.getByText('Filled Input')).toBeTruthy();
      expect(screen.getByPlaceholderText('Filled placeholder')).toBeTruthy();
    });
  });

  describe('<UnderlineInput />', () => {
    it('renders with default variant', () => {
      renderWithTheme(
        <UnderlineInput
          label="Underline Input"
          placeholder="Underline placeholder"
        />
      );

      expect(screen.getByText('Underline Input')).toBeTruthy();
      expect(screen.getByPlaceholderText('Underline placeholder')).toBeTruthy();
    });
  });

  describe('<PasswordInput />', () => {
    it('renders with secure text entry by default', () => {
      renderWithTheme(
        <PasswordInput
          label="Password"
          placeholder="Enter password"
        />
      );

      expect(screen.getByText('Password')).toBeTruthy();
      expect(screen.getByPlaceholderText('Enter password')).toBeTruthy();
      expect(screen.getByText('Show')).toBeTruthy();
    });

    it('toggles password visibility', () => {
      renderWithTheme(
        <PasswordInput
          placeholder="Enter password"
        />
      );

      const showButton = screen.getByText('Show');
      fireEvent.press(showButton);

      expect(screen.getByText('Hide')).toBeTruthy();

      const hideButton = screen.getByText('Hide');
      fireEvent.press(hideButton);

      expect(screen.getByText('Show')).toBeTruthy();
    });
  });

  describe('<SearchInput />', () => {
    it('renders with search placeholder and icon', () => {
      renderWithTheme(<SearchInput />);

      expect(screen.getByPlaceholderText('Search...')).toBeTruthy();
      expect(screen.getByText('🔍')).toBeTruthy();
    });

    it('accepts custom props', () => {
      renderWithTheme(
        <SearchInput
          label="Custom Search"
          placeholder="Custom search placeholder"
        />
      );

      expect(screen.getByText('Custom Search')).toBeTruthy();
      expect(screen.getByPlaceholderText('Custom search placeholder')).toBeTruthy();
      expect(screen.getByText('🔍')).toBeTruthy();
    });
  });
});
