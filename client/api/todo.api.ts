import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../providers/authProvider';
import { API_CONFIG } from '../constants/api';
import { createAuthHeaders, validateResponse } from '../lib/api-utils';

export type Todo = {
  id: number;
  task: string;
  is_complete: boolean;
  created_at?: string;
};

const API_URL = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TODO}`;

type TodoResponse = Partial<Todo> & {
  id?: number | string;
  inserted_at?: string;
};

function normalizeTodo(todo: TodoResponse): Todo {
  return {
    id: typeof todo.id === 'string' ? Number(todo.id) : (todo.id ?? 0),
    task: todo.task ?? '',
    is_complete: Boolean(todo.is_complete),
    created_at: todo.created_at ?? todo.inserted_at,
  };
}

async function fetchTodos(token?: string): Promise<Todo[]> {
  const response = await fetch(API_URL, {
    headers: createAuthHeaders(token),
  });
  await validateResponse(response);
  const todos = (await response.json()) as TodoResponse[];
  return todos.map(normalizeTodo);
}

async function createTodo(
  data: { task: string; is_complete?: boolean },
  token?: string
): Promise<Todo> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: createAuthHeaders(token),
    body: JSON.stringify(data),
  });
  await validateResponse(response);
  return normalizeTodo((await response.json()) as TodoResponse);
}

async function updateTodo(
  data: { id: number; task: string; is_complete: boolean },
  token?: string
): Promise<Todo> {
  const response = await fetch(API_URL, {
    method: 'PUT',
    headers: createAuthHeaders(token),
    body: JSON.stringify(data),
  });
  await validateResponse(response);
  return normalizeTodo((await response.json()) as TodoResponse);
}

async function deleteTodo(id: number, token?: string): Promise<void> {
  const response = await fetch(API_URL, {
    method: 'DELETE',
    headers: createAuthHeaders(token),
    body: JSON.stringify({ id }),
  });
  await validateResponse(response);
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
    mutationFn: (data: { id: number; task: string; is_complete: boolean }) =>
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
    mutationFn: (id: number) => deleteTodo(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
}
