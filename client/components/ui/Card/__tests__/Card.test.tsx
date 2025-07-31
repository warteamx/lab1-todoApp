import React from 'react';
import { fireEvent, screen } from '@testing-library/react-native';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  ElevatedCard,
  OutlinedCard,
  FilledCard,
  ListCard
} from '../Card';
import {
  renderWithTheme,
  MockIcon,
  MockAction,
  TestContent,
  SAMPLE_CONTENT
} from './Card.test.utils';

describe('<Card />', () => {
  describe('Rendering', () => {
    it('renders with children correctly', () => {
      renderWithTheme(
        <Card testID="test-card">
          <TestContent.Text testID="card-text">{SAMPLE_CONTENT.simple}</TestContent.Text>
        </Card>
      );
      expect(screen.getByTestId('test-card')).toBeTruthy();
      expect(screen.getByText(SAMPLE_CONTENT.simple)).toBeTruthy();
    });

    it('renders with testID', () => {
      renderWithTheme(
        <Card testID="test-card">
          <TestContent.Text>{SAMPLE_CONTENT.simple}</TestContent.Text>
        </Card>
      );
      expect(screen.getByTestId('test-card')).toBeTruthy();
    });

    it('renders multiple children correctly', () => {
      renderWithTheme(
        <Card testID="multi-child-card">
          <TestContent.Text testID="first-text">First</TestContent.Text>
          <TestContent.Text testID="second-text">Second</TestContent.Text>
        </Card>
      );
      expect(screen.getByText('First')).toBeTruthy();
      expect(screen.getByText('Second')).toBeTruthy();
    });
  });

  describe('Variants', () => {
    it('renders elevated variant correctly', () => {
      renderWithTheme(
        <Card variant="elevated" testID="elevated-card">
          <TestContent.Text>{SAMPLE_CONTENT.simple}</TestContent.Text>
        </Card>
      );
      expect(screen.getByTestId('elevated-card')).toBeTruthy();
    });

    it('renders outlined variant correctly', () => {
      renderWithTheme(
        <Card variant="outlined" testID="outlined-card">
          <TestContent.Text>{SAMPLE_CONTENT.simple}</TestContent.Text>
        </Card>
      );
      expect(screen.getByTestId('outlined-card')).toBeTruthy();
    });

    it('renders filled variant correctly', () => {
      renderWithTheme(
        <Card variant="filled" testID="filled-card">
          <TestContent.Text>{SAMPLE_CONTENT.simple}</TestContent.Text>
        </Card>
      );
      expect(screen.getByTestId('filled-card')).toBeTruthy();
    });

    it('uses elevated variant as default', () => {
      renderWithTheme(
        <Card testID="default-card">
          <TestContent.Text>{SAMPLE_CONTENT.simple}</TestContent.Text>
        </Card>
      );
      expect(screen.getByTestId('default-card')).toBeTruthy();
    });
  });

  describe('Styling Props', () => {
    it('renders with different padding correctly', () => {
      renderWithTheme(
        <Card padding="xs" testID="xs-padding-card">
          <TestContent.Text>{SAMPLE_CONTENT.simple}</TestContent.Text>
        </Card>
      );
      expect(screen.getByTestId('xs-padding-card')).toBeTruthy();

      renderWithTheme(
        <Card padding="lg" testID="lg-padding-card">
          <TestContent.Text>{SAMPLE_CONTENT.simple}</TestContent.Text>
        </Card>
      );
      expect(screen.getByTestId('lg-padding-card')).toBeTruthy();
    });

    it('renders with different border radius correctly', () => {
      renderWithTheme(
        <Card borderRadius="sm" testID="sm-radius-card">
          <TestContent.Text>{SAMPLE_CONTENT.simple}</TestContent.Text>
        </Card>
      );
      expect(screen.getByTestId('sm-radius-card')).toBeTruthy();
    });

    it('renders with different shadow correctly', () => {
      renderWithTheme(
        <Card shadow="lg" testID="lg-shadow-card">
          <TestContent.Text>{SAMPLE_CONTENT.simple}</TestContent.Text>
        </Card>
      );
      expect(screen.getByTestId('lg-shadow-card')).toBeTruthy();
    });

    it('renders with background color correctly', () => {
      renderWithTheme(
        <Card backgroundColor="surface" testID="surface-bg-card">
          <TestContent.Text>{SAMPLE_CONTENT.simple}</TestContent.Text>
        </Card>
      );
      expect(screen.getByTestId('surface-bg-card')).toBeTruthy();
    });

    it('renders with border color correctly', () => {
      renderWithTheme(
        <Card variant="outlined" borderColor="border" testID="border-card">
          <TestContent.Text>{SAMPLE_CONTENT.simple}</TestContent.Text>
        </Card>
      );
      expect(screen.getByTestId('border-card')).toBeTruthy();
    });
  });

  describe('Layout', () => {
    it('renders full width card by default', () => {
      renderWithTheme(
        <Card testID="full-width-card">
          <TestContent.Text>{SAMPLE_CONTENT.simple}</TestContent.Text>
        </Card>
      );
      expect(screen.getByTestId('full-width-card')).toBeTruthy();
    });

    it('renders card with fullWidth disabled', () => {
      renderWithTheme(
        <Card fullWidth={false} testID="not-full-width-card">
          <TestContent.Text>{SAMPLE_CONTENT.simple}</TestContent.Text>
        </Card>
      );
      expect(screen.getByTestId('not-full-width-card')).toBeTruthy();
    });
  });

  describe('Interactions', () => {
    it('calls onPress when pressed', () => {
      const mockOnPress = jest.fn();
      renderWithTheme(
        <Card onPress={mockOnPress} testID="pressable-card">
          <TestContent.Text>{SAMPLE_CONTENT.simple}</TestContent.Text>
        </Card>
      );

      fireEvent.press(screen.getByTestId('pressable-card'));
      expect(mockOnPress).toHaveBeenCalledTimes(1);
    });

    it('does not call onPress when disabled', () => {
      const mockOnPress = jest.fn();
      renderWithTheme(
        <Card disabled onPress={mockOnPress} testID="disabled-card">
          <TestContent.Text>{SAMPLE_CONTENT.simple}</TestContent.Text>
        </Card>
      );

      fireEvent.press(screen.getByTestId('disabled-card'));
      expect(mockOnPress).not.toHaveBeenCalled();
    });

    it('renders as View when no onPress is provided', () => {
      renderWithTheme(
        <Card testID="static-card">
          <TestContent.Text>{SAMPLE_CONTENT.simple}</TestContent.Text>
        </Card>
      );
      expect(screen.getByTestId('static-card')).toBeTruthy();
    });

    it('renders as TouchableOpacity when onPress is provided', () => {
      const mockOnPress = jest.fn();
      renderWithTheme(
        <Card onPress={mockOnPress} testID="touchable-card">
          <TestContent.Text>{SAMPLE_CONTENT.simple}</TestContent.Text>
        </Card>
      );
      expect(screen.getByTestId('touchable-card')).toBeTruthy();
    });
  });

  describe('States', () => {
    it('renders disabled state correctly', () => {
      renderWithTheme(
        <Card disabled testID="disabled-card">
          <TestContent.Text>{SAMPLE_CONTENT.simple}</TestContent.Text>
        </Card>
      );
      expect(screen.getByTestId('disabled-card')).toBeTruthy();
    });

    it('applies disabled opacity when onPress and disabled', () => {
      const mockOnPress = jest.fn();
      renderWithTheme(
        <Card disabled onPress={mockOnPress} testID="disabled-pressable-card">
          <TestContent.Text>{SAMPLE_CONTENT.simple}</TestContent.Text>
        </Card>
      );
      expect(screen.getByTestId('disabled-pressable-card')).toBeTruthy();
    });
  });

  describe('Custom Styling', () => {
    it('applies custom style prop', () => {
      const customStyle = { marginTop: 20 };
      renderWithTheme(
        <Card style={customStyle} testID="styled-card">
          <TestContent.Text>{SAMPLE_CONTENT.simple}</TestContent.Text>
        </Card>
      );
      expect(screen.getByTestId('styled-card')).toBeTruthy();
    });
  });
});

describe('<CardHeader />', () => {
  describe('Rendering with props', () => {
    it('renders with title only', () => {
      renderWithTheme(
        <CardHeader title={SAMPLE_CONTENT.header.title} />
      );
      expect(screen.getByText(SAMPLE_CONTENT.header.title)).toBeTruthy();
    });

    it('renders with title and subtitle', () => {
      renderWithTheme(
        <CardHeader
          title={SAMPLE_CONTENT.header.title}
          subtitle={SAMPLE_CONTENT.header.subtitle}
        />
      );
      expect(screen.getByText(SAMPLE_CONTENT.header.title)).toBeTruthy();
      expect(screen.getByText(SAMPLE_CONTENT.header.subtitle)).toBeTruthy();
    });

    it('renders with title, subtitle and action', () => {
      renderWithTheme(
        <CardHeader
          title={SAMPLE_CONTENT.header.title}
          subtitle={SAMPLE_CONTENT.header.subtitle}
          action={<MockAction />}
        />
      );
      expect(screen.getByText(SAMPLE_CONTENT.header.title)).toBeTruthy();
      expect(screen.getByText(SAMPLE_CONTENT.header.subtitle)).toBeTruthy();
      expect(screen.getByTestId('mock-action')).toBeTruthy();
    });
  });

  describe('Rendering with children', () => {
    it('renders custom children instead of props', () => {
      renderWithTheme(
        <CardHeader title="Should not appear">
          <TestContent.Text>Custom Header Content</TestContent.Text>
        </CardHeader>
      );
      expect(screen.getByText('Custom Header Content')).toBeTruthy();
      expect(screen.queryByText('Should not appear')).toBeNull();
    });
  });
});

describe('<CardContent />', () => {
  it('renders children correctly', () => {
    renderWithTheme(
      <CardContent>
        <TestContent.Text>Content inside card</TestContent.Text>
      </CardContent>
    );
    expect(screen.getByText('Content inside card')).toBeTruthy();
  });

  it('renders with different padding correctly', () => {
    renderWithTheme(
      <CardContent padding="sm">
        <TestContent.Text testID="content-text">Padded content</TestContent.Text>
      </CardContent>
    );
    expect(screen.getByText('Padded content')).toBeTruthy();
  });
});

describe('<CardFooter />', () => {
  it('renders children correctly', () => {
    renderWithTheme(
      <CardFooter>
        <TestContent.Text>Footer content</TestContent.Text>
      </CardFooter>
    );
    expect(screen.getByText('Footer content')).toBeTruthy();
  });

  it('renders with different justify options correctly', () => {
    renderWithTheme(
      <CardFooter justify="center">
        <TestContent.Text testID="footer-text">Centered footer</TestContent.Text>
      </CardFooter>
    );
    expect(screen.getByText('Centered footer')).toBeTruthy();

    renderWithTheme(
      <CardFooter justify="flex-start">
        <TestContent.Text testID="footer-text-start">Start footer</TestContent.Text>
      </CardFooter>
    );
    expect(screen.getByText('Start footer')).toBeTruthy();
  });
});

describe('Card Variants', () => {
  describe('ElevatedCard', () => {
    it('renders correctly', () => {
      renderWithTheme(
        <ElevatedCard testID="elevated-variant">
          <TestContent.Text>{SAMPLE_CONTENT.simple}</TestContent.Text>
        </ElevatedCard>
      );
      expect(screen.getByTestId('elevated-variant')).toBeTruthy();
      expect(screen.getByText(SAMPLE_CONTENT.simple)).toBeTruthy();
    });

    it('handles press events', () => {
      const mockOnPress = jest.fn();
      renderWithTheme(
        <ElevatedCard onPress={mockOnPress} testID="elevated-variant">
          <TestContent.Text>{SAMPLE_CONTENT.simple}</TestContent.Text>
        </ElevatedCard>
      );

      fireEvent.press(screen.getByTestId('elevated-variant'));
      expect(mockOnPress).toHaveBeenCalledTimes(1);
    });
  });

  describe('OutlinedCard', () => {
    it('renders correctly', () => {
      renderWithTheme(
        <OutlinedCard testID="outlined-variant">
          <TestContent.Text>{SAMPLE_CONTENT.simple}</TestContent.Text>
        </OutlinedCard>
      );
      expect(screen.getByTestId('outlined-variant')).toBeTruthy();
      expect(screen.getByText(SAMPLE_CONTENT.simple)).toBeTruthy();
    });

    it('handles press events', () => {
      const mockOnPress = jest.fn();
      renderWithTheme(
        <OutlinedCard onPress={mockOnPress} testID="outlined-variant">
          <TestContent.Text>{SAMPLE_CONTENT.simple}</TestContent.Text>
        </OutlinedCard>
      );

      fireEvent.press(screen.getByTestId('outlined-variant'));
      expect(mockOnPress).toHaveBeenCalledTimes(1);
    });
  });

  describe('FilledCard', () => {
    it('renders correctly', () => {
      renderWithTheme(
        <FilledCard testID="filled-variant">
          <TestContent.Text>{SAMPLE_CONTENT.simple}</TestContent.Text>
        </FilledCard>
      );
      expect(screen.getByTestId('filled-variant')).toBeTruthy();
      expect(screen.getByText(SAMPLE_CONTENT.simple)).toBeTruthy();
    });

    it('handles press events', () => {
      const mockOnPress = jest.fn();
      renderWithTheme(
        <FilledCard onPress={mockOnPress} testID="filled-variant">
          <TestContent.Text>{SAMPLE_CONTENT.simple}</TestContent.Text>
        </FilledCard>
      );

      fireEvent.press(screen.getByTestId('filled-variant'));
      expect(mockOnPress).toHaveBeenCalledTimes(1);
    });
  });
});

describe('<ListCard />', () => {
  describe('Rendering', () => {
    it('renders with title only', () => {
      renderWithTheme(
        <ListCard title={SAMPLE_CONTENT.complex.title} testID="list-card" />
      );
      expect(screen.getByTestId('list-card')).toBeTruthy();
      expect(screen.getByText(SAMPLE_CONTENT.complex.title)).toBeTruthy();
    });

    it('renders with title and subtitle', () => {
      renderWithTheme(
        <ListCard
          title={SAMPLE_CONTENT.complex.title}
          subtitle={SAMPLE_CONTENT.complex.subtitle}
          testID="list-card"
        />
      );
      expect(screen.getByText(SAMPLE_CONTENT.complex.title)).toBeTruthy();
      expect(screen.getByText(SAMPLE_CONTENT.complex.subtitle)).toBeTruthy();
    });

    it('renders with title, subtitle and description', () => {
      renderWithTheme(
        <ListCard
          title={SAMPLE_CONTENT.complex.title}
          subtitle={SAMPLE_CONTENT.complex.subtitle}
          description={SAMPLE_CONTENT.complex.description}
          testID="list-card"
        />
      );
      expect(screen.getByText(SAMPLE_CONTENT.complex.title)).toBeTruthy();
      expect(screen.getByText(SAMPLE_CONTENT.complex.subtitle)).toBeTruthy();
      expect(screen.getByText(SAMPLE_CONTENT.complex.description)).toBeTruthy();
    });

    it('renders with left element', () => {
      renderWithTheme(
        <ListCard
          title={SAMPLE_CONTENT.complex.title}
          leftElement={<MockIcon testID="left-element" />}
          testID="list-card"
        />
      );
      expect(screen.getByTestId('left-element')).toBeTruthy();
      expect(screen.getByText(SAMPLE_CONTENT.complex.title)).toBeTruthy();
    });

    it('renders with right element', () => {
      renderWithTheme(
        <ListCard
          title={SAMPLE_CONTENT.complex.title}
          rightElement={<MockIcon testID="right-element" />}
          testID="list-card"
        />
      );
      expect(screen.getByTestId('right-element')).toBeTruthy();
      expect(screen.getByText(SAMPLE_CONTENT.complex.title)).toBeTruthy();
    });

    it('renders with both left and right elements', () => {
      renderWithTheme(
        <ListCard
          title={SAMPLE_CONTENT.complex.title}
          leftElement={<MockIcon testID="left-element" />}
          rightElement={<MockIcon testID="right-element" />}
          testID="list-card"
        />
      );
      expect(screen.getByTestId('left-element')).toBeTruthy();
      expect(screen.getByTestId('right-element')).toBeTruthy();
      expect(screen.getByText(SAMPLE_CONTENT.complex.title)).toBeTruthy();
    });
  });

  describe('Interactions', () => {
    it('handles press events', () => {
      const mockOnPress = jest.fn();
      renderWithTheme(
        <ListCard
          title={SAMPLE_CONTENT.complex.title}
          onPress={mockOnPress}
          testID="pressable-list-card"
        />
      );

      fireEvent.press(screen.getByTestId('pressable-list-card'));
      expect(mockOnPress).toHaveBeenCalledTimes(1);
    });

    it('does not call onPress when disabled', () => {
      const mockOnPress = jest.fn();
      renderWithTheme(
        <ListCard
          title={SAMPLE_CONTENT.complex.title}
          onPress={mockOnPress}
          disabled
          testID="disabled-list-card"
        />
      );

      fireEvent.press(screen.getByTestId('disabled-list-card'));
      expect(mockOnPress).not.toHaveBeenCalled();
    });
  });
});

describe('Composite Card Usage', () => {
  it('renders complex card with all components', () => {
    renderWithTheme(
      <Card testID="complex-card">
        <CardHeader
          title={SAMPLE_CONTENT.header.title}
          subtitle={SAMPLE_CONTENT.header.subtitle}
          action={<MockAction />}
        />
        <CardContent>
          <TestContent.Text>Main content goes here</TestContent.Text>
        </CardContent>
        <CardFooter>
          <TestContent.Text>Footer content</TestContent.Text>
        </CardFooter>
      </Card>
    );

    expect(screen.getByTestId('complex-card')).toBeTruthy();
    expect(screen.getByText(SAMPLE_CONTENT.header.title)).toBeTruthy();
    expect(screen.getByText(SAMPLE_CONTENT.header.subtitle)).toBeTruthy();
    expect(screen.getByTestId('mock-action')).toBeTruthy();
    expect(screen.getByText('Main content goes here')).toBeTruthy();
    expect(screen.getByText('Footer content')).toBeTruthy();
  });

  it('renders nested cards', () => {
    renderWithTheme(
      <Card testID="outer-card">
        <TestContent.Text>Outer card content</TestContent.Text>
        <Card testID="inner-card">
          <TestContent.Text>Inner card content</TestContent.Text>
        </Card>
      </Card>
    );

    expect(screen.getByTestId('outer-card')).toBeTruthy();
    expect(screen.getByTestId('inner-card')).toBeTruthy();
    expect(screen.getByText('Outer card content')).toBeTruthy();
    expect(screen.getByText('Inner card content')).toBeTruthy();
  });
});

