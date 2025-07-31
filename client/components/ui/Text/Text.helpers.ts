import { Theme } from '@/themes/themes';
import { TextVariant } from '@/themes/typography';

// Helper function to get typography style from variant
export function getTypographyStyle(theme: Theme, variant: TextVariant) {
  switch (variant) {
    case 'displayLarge':
      return theme.typography.display.large;
    case 'displayMedium':
      return theme.typography.display.medium;
    case 'displaySmall':
      return theme.typography.display.small;
    case 'headlineLarge':
      return theme.typography.headline.large;
    case 'headlineMedium':
      return theme.typography.headline.medium;
    case 'headlineSmall':
      return theme.typography.headline.small;
    case 'titleLarge':
      return theme.typography.title.large;
    case 'titleMedium':
      return theme.typography.title.medium;
    case 'titleSmall':
      return theme.typography.title.small;
    case 'bodyLarge':
      return theme.typography.body.large;
    case 'bodyMedium':
      return theme.typography.body.medium;
    case 'bodySmall':
      return theme.typography.body.small;
    case 'labelLarge':
      return theme.typography.label.large;
    case 'labelMedium':
      return theme.typography.label.medium;
    case 'labelSmall':
      return theme.typography.label.small;
    case 'caption':
      return theme.typography.caption;
    case 'overline':
      return theme.typography.overline;
    default:
      return theme.typography.body.medium; // default
  }
}
