import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../providers/authProvider';

export type Todo = {
  id: string;
  task: string;
  is_complete: boolean;
  inserted_at: string;
};

const API_URL = 'http://localhost:3000/api/todo';

async function fetchTodos(token?: string): Promise<Todo[]> {
  const res = await fetch(API_URL, {
    headers: token ? { Authorization: `${token}` } : {},
  });
  if (!res.ok) throw new Error('Failed to fetch todos');
  return res.json();
}

async function createTodo(
  data: { task: string; is_complete?: boolean },
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
  if (!res.ok) throw new Error('Failed to create todo');
  return res.json();
}

async function updateTodo(
  data: { id: string; task: string; is_complete: boolean },
  token?: string
): Promise<Todo> {
  const res = await fetch(API_URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `${token}` } : {}),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update todo');
  return res.json();
}

async function deleteTodo(id: string, token?: string): Promise<void> {
  const res = await fetch(API_URL, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `${token}` } : {}),
    },
    body: JSON.stringify({ id }),
  });
  if (!res.ok) throw new Error('Failed to delete todo');
}

export function useTodos() {
  const { session } = useAuth();
  const token = session?.access_token;
  return useQuery({
    queryKey: ['todos'],
    queryFn: () => fetchTodos(token),
    enabled: !!token,
  });
}

export function useCreateTodo() {
  const { session } = useAuth();
  const token = session?.access_token;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { task: string; is_complete?: boolean }) =>
      createTodo(data, token),
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
    mutationFn: (data: { id: string; task: string; is_complete: boolean }) =>
      updateTodo(data, token),
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
