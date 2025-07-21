
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../providers/authProvider';

export type Todo = {
  id: string;
  task: string;
  completed: boolean;
};

async function fetchTodos(token?: string): Promise<Todo[]> {
  const res = await fetch('http://localhost:3000/api/todo', {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error('Failed to fetch todos');
  return res.json();
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
