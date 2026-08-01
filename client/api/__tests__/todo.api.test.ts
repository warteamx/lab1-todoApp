import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  Todo,
} from '../todo.api';

jest.mock('../../providers/authProvider', () => ({
  useAuth: () => ({ session: null }),
}));

describe('todo.api', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterAll(() => {
    global.fetch = originalFetch;
  });

  it('builds query params and authorization header when fetching todos', async() => {
    const todos: Todo[] = [
      {
        id: 1,
        task: 'Task',
        is_complete: false,
        importance: 'high',
        status: 'pending',
        display_order: 1,
      },
    ];
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(todos),
    });

    const result = await fetchTodos('******', {
      view: 'month',
      status: 'pending',
      importance: 'high',
      page: 2,
      limit: 5,
    });

    expect(result).toEqual(todos);
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:3000/api/todo?view=month&status=pending&importance=high&page=2&limit=5',
      { headers: { Authorization: '******' } }
    );
  });

  it('uses base url without query when no filters are provided', async() => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue([]),
    });

    await fetchTodos();

    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:3000/api/todo',
      { headers: {} }
    );
  });

  it('throws when fetch todos response is not ok', async() => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: false });

    await expect(fetchTodos()).rejects.toThrow('Failed to fetch todos');
  });

  it('sends metadata fields when creating todo', async() => {
    const createdTodo: Todo = {
      id: 2,
      task: 'New',
      is_complete: false,
      importance: 'medium',
      status: 'in_progress',
      display_order: 3,
    };
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(createdTodo),
    });

    const payload = {
      task: 'New',
      importance: 'medium' as const,
      status: 'in_progress' as const,
      display_order: 3,
    };
    const result = await createTodo(payload, '******');

    expect(result).toEqual(createdTodo);
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:3000/api/todo',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: '******',
        },
        body: JSON.stringify(payload),
      }
    );
  });

  it('surfaces backend error details when creating todo fails', async() => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue({
        error: { message: 'todo_metadata upsert failed' },
      }),
    });

    await expect(createTodo({ task: 'New task' }, '******')).rejects.toThrow(
      'todo_metadata upsert failed'
    );
  });

  it('sends metadata fields when updating todo', async() => {
    const updatedTodo: Todo = {
      id: 1,
      task: 'Updated',
      is_complete: true,
      importance: 'low',
      status: 'completed',
      display_order: 7,
    };
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(updatedTodo),
    });

    const payload = {
      id: 1,
      task: 'Updated',
      is_complete: true,
      importance: 'low' as const,
      status: 'completed' as const,
      display_order: 7,
    };
    const result = await updateTodo(payload, '******');

    expect(result).toEqual(updatedTodo);
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:3000/api/todo',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: '******',
        },
        body: JSON.stringify(payload),
      }
    );
  });

  it('throws when deleting todo fails', async() => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: false });

    await expect(deleteTodo('10')).rejects.toThrow('Failed to delete todo');
  });
});
