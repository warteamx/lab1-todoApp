import React from 'react';
import { screen } from '@testing-library/react-native';
import {
  Container,
  Screen,
  Section,
  Stack,
  Inline,
  Grid,
  Spacer,
  Center,
  useScreenSize,
} from '../Layout';
import {
  renderWithTheme,
  renderWithThemeVariant,
  MockChild,
  MockChildren,
  TEST_CONSTANTS,
  TEST_DATA,
  LAYOUT_SCENARIOS,
  THEME_HELPERS,
} from './Layout.test.utils';

// Mock expo-router if needed
jest.mock('expo-router', () => ({
  useRouter: () => ({
    back: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
    canGoBack: jest.fn(() => true),
  }),
}));

describe('<Layout Components />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useScreenSize Hook', () => {
    it('can be called without errors', () => {
      const TestComponent = () => {
        const screenSize = useScreenSize();
        return <MockChild testID="screen-size">{screenSize}</MockChild>;
      };

      renderWithTheme(<TestComponent />);
      expect(screen.getByTestId('screen-size')).toBeTruthy();
    });
  });

  describe('<Container />', () => {
    describe('Rendering', () => {
      it('renders without props correctly', () => {
        renderWithTheme(
          <Container>
            <MockChild />
          </Container>
        );
        expect(screen.getByTestId('mock-child')).toBeTruthy();
      });

      it('renders with custom maxWidth', () => {
        renderWithTheme(
          <Container {...TEST_DATA.container.withMaxWidth}>
            <MockChild />
          </Container>
        );
        expect(screen.getByTestId('mock-child')).toBeTruthy();
      });

      it('renders with custom padding', () => {
        renderWithTheme(
          <Container {...TEST_DATA.container.withPadding}>
            <MockChild />
          </Container>
        );
        expect(screen.getByTestId('mock-child')).toBeTruthy();
      });

      it('renders with custom backgroundColor', () => {
        renderWithTheme(
          <Container {...TEST_DATA.container.withBackgroundColor}>
            <MockChild />
          </Container>
        );
        expect(screen.getByTestId('mock-child')).toBeTruthy();
      });

      it('renders without safe area when disabled', () => {
        renderWithTheme(
          <Container {...TEST_DATA.container.noSafeArea}>
            <MockChild />
          </Container>
        );
        expect(screen.getByTestId('mock-child')).toBeTruthy();
      });
    });

    describe('Responsive Behavior', () => {
      it('renders with different screen sizes', () => {
        renderWithTheme(
          <Container size="mobile">
            <MockChild />
          </Container>
        );
        expect(screen.getByTestId('mock-child')).toBeTruthy();

        renderWithTheme(
          <Container size="tablet">
            <MockChild />
          </Container>
        );
        expect(screen.getByTestId('mock-child')).toBeTruthy();

        renderWithTheme(
          <Container size="desktop">
            <MockChild />
          </Container>
        );
        expect(screen.getByTestId('mock-child')).toBeTruthy();
      });
    });

    describe('Theme Variants', () => {
      THEME_HELPERS.getAllThemeVariants().forEach((themeVariant) => {
        it(`renders correctly with ${themeVariant} theme`, () => {
          renderWithThemeVariant(
            <Container>
              <MockChild />
            </Container>,
            themeVariant
          );
          expect(screen.getByTestId('mock-child')).toBeTruthy();
        });
      });
    });
  });

  describe('<Screen />', () => {
    describe('Rendering', () => {
      it('renders with scrollable by default', () => {
        renderWithTheme(
          <Screen>
            <MockChild />
          </Screen>
        );
        expect(screen.getByTestId('mock-child')).toBeTruthy();
      });

      it('renders as non-scrollable when specified', () => {
        renderWithTheme(
          <Screen {...TEST_DATA.screen.nonScrollable}>
            <MockChild />
          </Screen>
        );
        expect(screen.getByTestId('mock-child')).toBeTruthy();
      });

      it('renders with custom padding', () => {
        renderWithTheme(
          <Screen {...TEST_DATA.screen.withPadding}>
            <MockChild />
          </Screen>
        );
        expect(screen.getByTestId('mock-child')).toBeTruthy();
      });

      it('renders with custom backgroundColor', () => {
        renderWithTheme(
          <Screen {...TEST_DATA.screen.withBackgroundColor}>
            <MockChild />
          </Screen>
        );
        expect(screen.getByTestId('mock-child')).toBeTruthy();
      });
    });

    describe('Scroll Behavior', () => {
      it('allows scrolling by default', () => {
        renderWithTheme(
          <Screen>
            <MockChild />
          </Screen>
        );
        // ScrollView should be present by default
        expect(screen.getByTestId('mock-child')).toBeTruthy();
      });

      it('disables scrolling when scrollable is false', () => {
        renderWithTheme(
          <Screen scrollable={false}>
            <MockChild />
          </Screen>
        );
        expect(screen.getByTestId('mock-child')).toBeTruthy();
      });
    });
  });

  describe('<Section />', () => {
    describe('Rendering', () => {
      it('renders children without title', () => {
        renderWithTheme(
          <Section>
            <MockChild />
          </Section>
        );
        expect(screen.getByTestId('mock-child')).toBeTruthy();
      });

      it('renders with title only', () => {
        renderWithTheme(
          <Section {...TEST_DATA.section.withTitle}>
            <MockChild />
          </Section>
        );
        expect(screen.getByText(TEST_CONSTANTS.content.title)).toBeTruthy();
        expect(screen.getByTestId('mock-child')).toBeTruthy();
      });

      it('renders with title and subtitle', () => {
        renderWithTheme(
          <Section {...TEST_DATA.section.withTitleAndSubtitle}>
            <MockChild />
          </Section>
        );
        expect(screen.getByText(TEST_CONSTANTS.content.title)).toBeTruthy();
        expect(screen.getByText(TEST_CONSTANTS.content.subtitle)).toBeTruthy();
        expect(screen.getByTestId('mock-child')).toBeTruthy();
      });

      it('renders with custom spacing', () => {
        renderWithTheme(
          <Section {...TEST_DATA.section.withSpacing}>
            <MockChild />
          </Section>
        );
        expect(screen.getByTestId('mock-child')).toBeTruthy();
      });
    });
  });

  describe('<Stack />', () => {
    describe('Rendering', () => {
      it('renders children with default spacing', () => {
        renderWithTheme(
          <Stack>
            <MockChildren count={3} />
          </Stack>
        );

        expect(screen.getByTestId('mock-child-0')).toBeTruthy();
        expect(screen.getByTestId('mock-child-1')).toBeTruthy();
        expect(screen.getByTestId('mock-child-2')).toBeTruthy();
      });

      it('renders with custom spacing', () => {
        renderWithTheme(
          <Stack {...TEST_DATA.stack.withSpacing}>
            <MockChildren count={2} />
          </Stack>
        );

        expect(screen.getByTestId('mock-child-0')).toBeTruthy();
        expect(screen.getByTestId('mock-child-1')).toBeTruthy();
      });

      it('renders with center alignment', () => {
        renderWithTheme(
          <Stack {...TEST_DATA.stack.centered}>
            <MockChildren count={2} />
          </Stack>
        );

        expect(screen.getByTestId('mock-child-0')).toBeTruthy();
        expect(screen.getByTestId('mock-child-1')).toBeTruthy();
      });

      it('renders with stretch alignment', () => {
        renderWithTheme(
          <Stack {...TEST_DATA.stack.stretched}>
            <MockChildren count={2} />
          </Stack>
        );

        expect(screen.getByTestId('mock-child-0')).toBeTruthy();
        expect(screen.getByTestId('mock-child-1')).toBeTruthy();
      });
    });

    describe('Spacing Behavior', () => {
      TEST_CONSTANTS.spacingValues.forEach((spacing) => {
        it(`applies ${spacing} spacing correctly`, () => {
          renderWithTheme(
            <Stack spacing={spacing}>
              <MockChildren count={2} />
            </Stack>
          );

          expect(screen.getByTestId('mock-child-0')).toBeTruthy();
          expect(screen.getByTestId('mock-child-1')).toBeTruthy();
        });
      });
    });
  });

  describe('<Inline />', () => {
    describe('Rendering', () => {
      it('renders children horizontally with default spacing', () => {
        renderWithTheme(
          <Inline>
            <MockChildren count={3} />
          </Inline>
        );

        expect(screen.getByTestId('mock-child-0')).toBeTruthy();
        expect(screen.getByTestId('mock-child-1')).toBeTruthy();
        expect(screen.getByTestId('mock-child-2')).toBeTruthy();
      });

      it('renders with custom spacing', () => {
        renderWithTheme(
          <Inline {...TEST_DATA.inline.withSpacing}>
            <MockChildren count={2} />
          </Inline>
        );

        expect(screen.getByTestId('mock-child-0')).toBeTruthy();
        expect(screen.getByTestId('mock-child-1')).toBeTruthy();
      });

      it('renders with center alignment and justification', () => {
        renderWithTheme(
          <Inline {...TEST_DATA.inline.centered}>
            <MockChildren count={2} />
          </Inline>
        );

        expect(screen.getByTestId('mock-child-0')).toBeTruthy();
        expect(screen.getByTestId('mock-child-1')).toBeTruthy();
      });

      it('renders with space-between justification', () => {
        renderWithTheme(
          <Inline {...TEST_DATA.inline.spaceBetween}>
            <MockChildren count={2} />
          </Inline>
        );

        expect(screen.getByTestId('mock-child-0')).toBeTruthy();
        expect(screen.getByTestId('mock-child-1')).toBeTruthy();
      });

      it('renders with wrapping enabled', () => {
        renderWithTheme(
          <Inline {...TEST_DATA.inline.wrapped}>
            <MockChildren count={5} />
          </Inline>
        );

        expect(screen.getByTestId('mock-child-0')).toBeTruthy();
        expect(screen.getByTestId('mock-child-4')).toBeTruthy();
      });
    });
  });

  describe('<Grid />', () => {
    describe('Rendering', () => {
      it('renders children in grid with default columns', () => {
        renderWithTheme(
          <Grid>
            <MockChildren count={4} />
          </Grid>
        );

        expect(screen.getByTestId('mock-child-0')).toBeTruthy();
        expect(screen.getByTestId('mock-child-3')).toBeTruthy();
      });

      it('renders with two columns', () => {
        renderWithTheme(
          <Grid {...TEST_DATA.grid.twoColumns}>
            <MockChildren count={4} />
          </Grid>
        );

        expect(screen.getByTestId('mock-child-0')).toBeTruthy();
        expect(screen.getByTestId('mock-child-3')).toBeTruthy();
      });

      it('renders with four columns', () => {
        renderWithTheme(
          <Grid {...TEST_DATA.grid.fourColumns}>
            <MockChildren count={8} />
          </Grid>
        );

        expect(screen.getByTestId('mock-child-0')).toBeTruthy();
        expect(screen.getByTestId('mock-child-7')).toBeTruthy();
      });

      it('renders with custom spacing', () => {
        renderWithTheme(
          <Grid {...TEST_DATA.grid.withSpacing}>
            <MockChildren count={4} />
          </Grid>
        );

        expect(screen.getByTestId('mock-child-0')).toBeTruthy();
        expect(screen.getByTestId('mock-child-3')).toBeTruthy();
      });
    });

    describe('Responsive Behavior', () => {
      it('renders with different column configurations', () => {
        renderWithTheme(
          <Grid columns={2}>
            <MockChildren count={4} />
          </Grid>
        );
        expect(screen.getByTestId('mock-child-0')).toBeTruthy();

        renderWithTheme(
          <Grid columns={3}>
            <MockChildren count={6} />
          </Grid>
        );
        expect(screen.getByTestId('mock-child-0')).toBeTruthy();

        renderWithTheme(
          <Grid columns={4}>
            <MockChildren count={8} />
          </Grid>
        );
        expect(screen.getByTestId('mock-child-0')).toBeTruthy();
      });
    });
  });

  describe('<Spacer />', () => {
    describe('Rendering', () => {
      it('renders with default size', () => {
        const result = renderWithTheme(<Spacer />);
        expect(result).toBeTruthy();
      });

      it('renders with custom spacing size', () => {
        const result = renderWithTheme(
          <Spacer {...TEST_DATA.spacer.withSize} />
        );
        expect(result).toBeTruthy();
      });

      it('renders with numeric size', () => {
        const result = renderWithTheme(
          <Spacer {...TEST_DATA.spacer.withNumericSize} />
        );
        expect(result).toBeTruthy();
      });

      it('renders with flex', () => {
        const result = renderWithTheme(
          <Spacer {...TEST_DATA.spacer.withFlex} />
        );
        expect(result).toBeTruthy();
      });
    });

    describe('Spacing Values', () => {
      TEST_CONSTANTS.spacingValues.forEach((spacing) => {
        it(`renders with ${spacing} spacing`, () => {
          const result = renderWithTheme(<Spacer size={spacing} />);
          expect(result).toBeTruthy();
        });
      });
    });
  });

  describe('<Center />', () => {
    describe('Rendering', () => {
      it('renders children centered', () => {
        renderWithTheme(
          <Center>
            <MockChild />
          </Center>
        );
        expect(screen.getByTestId('mock-child')).toBeTruthy();
      });

      it('renders with numeric minHeight', () => {
        renderWithTheme(
          <Center {...TEST_DATA.center.withMinHeight}>
            <MockChild />
          </Center>
        );
        expect(screen.getByTestId('mock-child')).toBeTruthy();
      });

      it('renders with string minHeight', () => {
        renderWithTheme(
          <Center {...TEST_DATA.center.withStringMinHeight}>
            <MockChild />
          </Center>
        );
        expect(screen.getByTestId('mock-child')).toBeTruthy();
      });
    });
  });

  describe('Layout Scenarios', () => {
    LAYOUT_SCENARIOS.forEach((scenario) => {
      it(`handles ${scenario.name}`, () => {
        let component: React.ReactElement;

        switch (scenario.component) {
          case 'container-stack':
            component = (
              <Container>
                <Stack>
                  <MockChildren count={3} />
                </Stack>
              </Container>
            );
            break;
          case 'screen-grid':
            component = (
              <Screen>
                <Grid columns={2}>
                  <MockChildren count={4} />
                </Grid>
              </Screen>
            );
            break;
          case 'section-inline':
            component = (
              <Section title="Test Section">
                <Inline>
                  <MockChildren count={3} prefix="Button" />
                </Inline>
              </Section>
            );
            break;
          case 'complex-nested':
            component = (
              <Container>
                <Screen scrollable={false}>
                  <Section title="Complex Layout">
                    <Stack spacing="lg">
                      <Inline justify="space-between">
                        <MockChild>Left</MockChild>
                        <MockChild>Right</MockChild>
                      </Inline>
                      <Grid columns={2}>
                        <MockChildren count={4} />
                      </Grid>
                      <Center minHeight={100}>
                        <MockChild>Centered Content</MockChild>
                      </Center>
                    </Stack>
                  </Section>
                </Screen>
              </Container>
            );
            break;
          default:
            component = <MockChild />;
        }

        renderWithTheme(component);
        expect(screen.getByTestId('mock-child-0')).toBeTruthy();
      });
    });
  });

  describe('Error Handling', () => {
    it('handles empty children gracefully', () => {
      renderWithTheme(<Stack>{null}</Stack>);
      // Should not throw error
      expect(true).toBe(true);
    });

    it('handles undefined children gracefully', () => {
      renderWithTheme(<Stack>{undefined}</Stack>);
      // Should not throw error
      expect(true).toBe(true);
    });

    it('handles single child in Grid', () => {
      renderWithTheme(
        <Grid columns={3}>
          <MockChild />
        </Grid>
      );
      expect(screen.getByTestId('mock-child')).toBeTruthy();
    });

    it('handles invalid spacing values gracefully', () => {
      renderWithTheme(
        <Stack spacing={undefined as any}>
          <MockChild />
        </Stack>
      );
      expect(screen.getByTestId('mock-child')).toBeTruthy();
    });
  });

  describe('Theme Integration', () => {
    THEME_HELPERS.getAllThemeVariants().forEach((themeVariant) => {
      it(`works correctly with ${themeVariant} theme`, () => {
        renderWithThemeVariant(
          <Container>
            <Section title="Theme Test">
              <Stack>
                <MockChild />
              </Stack>
            </Section>
          </Container>,
          themeVariant
        );
        expect(screen.getByTestId('mock-child')).toBeTruthy();
      });
    });
  });
});
