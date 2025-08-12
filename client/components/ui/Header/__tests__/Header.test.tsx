import React from 'react';
import { fireEvent, screen } from '@testing-library/react-native';
import { Header } from '../Header';
import {
  renderWithTheme,
  renderWithThemeVariant,
  MockAction,
  mockRouter,
  TEST_DATA, // Backward compatibility
  TEST_CONSTANTS,
  HEADER_SCENARIOS,
  ACCESSIBILITY_HELPERS,
  THEME_HELPERS,
  TEST_PATTERNS,
  createTestThemeContext,
} from './Header.test.utils';

// Mock expo-router
jest.mock('expo-router', () => ({
  useRouter: () => mockRouter,
}));

describe('<Header />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders without props correctly', () => {
      renderWithTheme(<Header />);
      // Component should render without errors
      expect(true).toBe(true);
    });

    it('renders with title correctly', () => {
      renderWithTheme(<Header title={TEST_DATA.sampleProps.basicTitle} />);
      expect(screen.getByText(TEST_DATA.sampleProps.basicTitle)).toBeTruthy();
    });

    it('renders with title and subtitle correctly', () => {
      const { title, subtitle } = TEST_DATA.sampleProps.titleWithSubtitle;
      renderWithTheme(<Header title={title} subtitle={subtitle} />);

      expect(screen.getByText(title)).toBeTruthy();
      expect(screen.getByText(subtitle)).toBeTruthy();
    });

    it('renders without title and subtitle when not provided', () => {
      renderWithTheme(<Header />);

      expect(screen.queryByText('Test Title')).toBeNull();
      expect(screen.queryByText('Subtitle')).toBeNull();
    });
  });

  describe('Back Button', () => {
    it('renders back button when showBack is true', () => {
      renderWithTheme(<Header title="Test" showBack={true} />);
      expect(screen.getByText('← Back')).toBeTruthy();
    });

    it('does not render back button when showBack is false', () => {
      renderWithTheme(<Header title="Test" showBack={false} />);
      expect(screen.queryByText('← Back')).toBeNull();
    });

    it('does not render back button by default', () => {
      renderWithTheme(<Header title="Test" />);
      expect(screen.queryByText('← Back')).toBeNull();
    });

    it('calls router.back when back button is pressed', () => {
      renderWithTheme(<Header title="Test" showBack={true} />);

      const backButton = screen.getByText('← Back');
      fireEvent.press(backButton);

      expect(mockRouter.back).toHaveBeenCalledTimes(1);
    });
  });

  describe('Actions', () => {
    it('renders single action correctly', () => {
      const action = <MockAction testID="single-action">Edit</MockAction>;
      renderWithTheme(<Header title="Test" actions={[action]} />);

      expect(screen.getByTestId('single-action')).toBeTruthy();
      expect(screen.getByText('Edit')).toBeTruthy();
    });

    it('renders multiple actions correctly', () => {
      const actions = [
        <MockAction key="1" testID="action-1">Edit</MockAction>,
        <MockAction key="2" testID="action-2">Share</MockAction>,
      ];
      renderWithTheme(<Header title="Test" actions={actions} />);

      expect(screen.getByTestId('action-1')).toBeTruthy();
      expect(screen.getByTestId('action-2')).toBeTruthy();
      expect(screen.getByText('Edit')).toBeTruthy();
      expect(screen.getByText('Share')).toBeTruthy();
    });

    it('renders without actions when not provided', () => {
      renderWithTheme(<Header title="Test" />);
      expect(screen.queryByTestId('mock-action')).toBeNull();
    });

    it('renders empty actions array correctly', () => {
      renderWithTheme(<Header title="Test" actions={[]} />);
      expect(screen.queryByTestId('mock-action')).toBeNull();
    });
  });

  describe('Theme Toggle', () => {
    it('renders theme toggle buttons by default', () => {
      renderWithTheme(<Header title="Test" />);

      // Look for emoji icons that should be present
      expect(screen.getByText('🌙')).toBeTruthy();
      expect(screen.getByText('🎨')).toBeTruthy();
    });

    it('does not render theme toggle when themeToggle is false', () => {
      renderWithTheme(<Header title="Test" themeToggle={false} />);

      expect(screen.queryByText('☀️')).toBeNull();
      expect(screen.queryByText('🌙')).toBeNull();
      expect(screen.queryByText('🎨')).toBeNull();
    });

    it('theme toggle buttons are interactive', () => {
      renderWithTheme(<Header title="Test" />);

      const themeToggle = screen.getByText('🌙');
      const variantToggle = screen.getByText('🎨');

      // Verify buttons can be pressed (no errors)
      fireEvent.press(themeToggle);
      fireEvent.press(variantToggle);

      expect(themeToggle).toBeTruthy();
      expect(variantToggle).toBeTruthy();
    });
  });

  describe('Layout and Styling', () => {
    it('applies correct layout structure', () => {
      renderWithTheme(<Header title="Test" showBack={true} />);

      // Should have title and back button
      expect(screen.getByText('Test')).toBeTruthy();
      expect(screen.getByText('← Back')).toBeTruthy();
    });

    it('handles complex layout with all elements', () => {
      const actions = [<MockAction key="1" testID="complex-action">Action</MockAction>];

      renderWithTheme(
        <Header
          title="Complex Header"
          subtitle="With all features"
          showBack={true}
          actions={actions}
          themeToggle={true}
        />
      );

      expect(screen.getByText('Complex Header')).toBeTruthy();
      expect(screen.getByText('With all features')).toBeTruthy();
      expect(screen.getByText('← Back')).toBeTruthy();
      expect(screen.getByTestId('complex-action')).toBeTruthy();
      expect(screen.getByText('🌙')).toBeTruthy();
      expect(screen.getByText('🎨')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('provides accessible back button', () => {
      renderWithTheme(<Header title="Test" showBack={true} />);

      const backButton = screen.getByText('← Back');
      ACCESSIBILITY_HELPERS.expectToBeAccessible(backButton);
    });

    it('provides accessible theme toggle buttons', () => {
      renderWithTheme(<Header title="Test" />);

      const themeToggle = screen.getByText('🌙');
      const variantToggle = screen.getByText('🎨');

      ACCESSIBILITY_HELPERS.expectToBeAccessible(themeToggle);
      ACCESSIBILITY_HELPERS.expectToBeAccessible(variantToggle);
    });
  });

  describe('Header Scenarios', () => {
    it.each(Object.entries(HEADER_SCENARIOS))(
      'renders %s correctly',
      (scenarioName, scenario) => {
        renderWithTheme(<Header {...scenario.props} />);

        // Each scenario should render without errors
        if (scenario.props.title) {
          expect(screen.getByText(scenario.props.title)).toBeTruthy();
        }
      }
    );
  });

  describe('Error Handling', () => {
    it('handles missing title gracefully', () => {
      renderWithTheme(<Header />);
      // Component should render without errors
      expect(true).toBe(true);
    });

    it('handles invalid actions gracefully', () => {
      // Test with null action
      renderWithTheme(<Header title="Test" actions={[null as any]} />);
      expect(screen.getByText('Test')).toBeTruthy();
    });
  });
});
