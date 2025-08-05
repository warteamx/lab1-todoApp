export interface HeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  actions?: React.ReactNode[];
  themeToggle?: boolean;
}

export type variantType = 'modern' | 'dark' | 'warm' | 'cool';
