import { ViewStyle } from 'react-native';

export interface NavigationHeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  showThemeToggle?: boolean;
  showAuth?: boolean;
  customActions?: React.ReactNode[];
  style?: ViewStyle;
}
