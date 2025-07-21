
import React, { ReactNode } from 'react';
import AuthProvider from './authProvider';
import { QueryProvider } from './queryProvider';
import { ThemeProvider } from './themeProvider';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <QueryProvider>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </QueryProvider>
    </AuthProvider>
  );
}