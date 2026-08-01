import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../providers/authProvider';
import { API_CONFIG } from '../constants/api';

export type Todo = {
  id: string | number;
  task: string;
  is_complete: boolean;
  inserted_at?: string;
  created_at?: string;
  importance: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed';
  display_order: number;
};

const API_URL = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TODO}`;

type TodoFilters = {
  view?: 'day' | 'week' | 'month';
  status?: Todo['status'];
  importance?: Todo['importance'];
  page?: number;
  limit?: number;
};

const getApiErrorMessage = async(
  response: Response,
  fallbackMessage: string
): Promise<string> => {
  try {
    const errorPayload = await response.json();
    const message =
      (errorPayload as { error?: { message?: unknown } })?.error?.message ??
      (errorPayload as { message?: unknown })?.message;
    if (typeof message === 'string' && message.trim().length > 0) {
      return message;
    }
  } catch {
    // Ignore JSON parsing issues and return fallback message.
  }

  return fallbackMessage;
};

export async function fetchTodos(
  token?: string,
  filters?: TodoFilters
): Promise<Todo[]> {
  const params = new URLSearchParams();
  if (filters?.view) params.set('view', filters.view);
  if (filters?.status) params.set('status', filters.status);
  if (filters?.importance) params.set('importance', filters.importance);
  if (filters?.page) params.set('page', String(filters.page));
  if (filters?.limit) params.set('limit', String(filters.limit));

  const res = await fetch(
    params.size ? `${API_URL}?${params.toString()}` : API_URL,
    {
      headers: token ? { Authorization: `${token}` } : {},
    }
  );
  if (!res.ok) {
    throw new Error(await getApiErrorMessage(res, 'Failed to fetch todos'));
  }
  return res.json();
}

export async function createTodo(
  data: {
    task: string;
    is_complete?: boolean;
    importance?: Todo['importance'];
    status?: Todo['status'];
    display_order?: number;
  },
  token?: string
): Promise<Todo> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `${token}` } : {}),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error(await getApiErrorMessage(res, 'Failed to create todo'));
  }
  return res.json();
}

export async function updateTodo(
  data: {
    id: string | number;
    task: string;
    is_complete: boolean;
    importance?: Todo['importance'];
    status?: Todo['status'];
    display_order?: number;
  },
  token?: string
): Promise<Todo> {
  const { id, task, is_complete, importance, status, display_order } = data;
  const res = await fetch(API_URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `${token}` } : {}),
    },
    body: JSON.stringify({
      id,
      task,
      is_complete,
      importance,
      status,
      display_order,
    }),
  });
  if (!res.ok) {
    throw new Error(await getApiErrorMessage(res, 'Failed to update todo'));
  }
  return res.json();
}

export async function deleteTodo(id: string, token?: string): Promise<void> {
  const res = await fetch(API_URL, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `${token}` } : {}),
    },
    body: JSON.stringify({ id }),
  });
  if (!res.ok) {
    throw new Error(await getApiErrorMessage(res, 'Failed to delete todo'));
  }
}

export function useTodos(filters?: TodoFilters) {
  const { session } = useAuth();
  const token = session?.access_token;
  return useQuery({
    queryKey: ['todos', filters],
    queryFn: () => fetchTodos(token, filters),
    enabled: !!token,
  });
}

export function useCreateTodo() {
  const { session } = useAuth();
  const token = session?.access_token;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      task: string;
      is_complete?: boolean;
      importance?: Todo['importance'];
      status?: Todo['status'];
      display_order?: number;
    }) => createTodo(data, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
}

export function useUpdateTodo() {
  const { session } = useAuth();
  const token = session?.access_token;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      id: string | number;
      task: string;
      is_complete: boolean;
      importance?: Todo['importance'];
      status?: Todo['status'];
      display_order?: number;
    }) => updateTodo(data, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
}

export function useDeleteTodo() {
  const { session } = useAuth();
  const token = session?.access_token;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTodo(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
}
