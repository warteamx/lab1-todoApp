import React from 'react';
import { fireEvent, screen, render } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TodoIndexTab from '../index';
import { ThemeProvider } from '@/providers/themeProvider';
import { useTodos, useUpdateTodo } from '@/api/todo.api';

jest.mock('@/api/todo.api', () => ({
  useTodos: jest.fn(),
  useUpdateTodo: jest.fn(),
}));

jest.mock('expo-router', () => ({
  Link: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const mockedUseTodos = useTodos as jest.MockedFunction<typeof useTodos>;
const mockedUseUpdateTodo = useUpdateTodo as jest.MockedFunction<
  typeof useUpdateTodo
>;

const renderWithProviders = (component: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>{component}</ThemeProvider>
    </QueryClientProvider>
  );
};

describe('TodoIndexTab filters toggle', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockedUseTodos.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    } as ReturnType<typeof useTodos>);

    mockedUseUpdateTodo.mockReturnValue({
      mutate: jest.fn(),
      mutateAsync: jest.fn(),
    } as ReturnType<typeof useUpdateTodo>);
  });

  it('hides filters by default and shows them when pressing Filter', () => {
    renderWithProviders(<TodoIndexTab />);

    expect(screen.getByText('▶ Filter')).toBeTruthy();
    expect(screen.queryByText('View')).toBeNull();
    expect(screen.queryByText('Importance')).toBeNull();
    expect(screen.queryByText('Status')).toBeNull();

    fireEvent.press(screen.getByText('▶ Filter'));

    expect(screen.getByText('▼ Filter')).toBeTruthy();
    expect(screen.getByText('View')).toBeTruthy();
    expect(screen.getByText('Importance')).toBeTruthy();
    expect(screen.getByText('Status')).toBeTruthy();
  });

  it('uses day view and pending status as default filters', () => {
    renderWithProviders(<TodoIndexTab />);

    expect(mockedUseTodos).toHaveBeenCalledWith({
      view: 'day',
      status: 'pending',
      importance: undefined,
      limit: 300,
    });
  });
});
