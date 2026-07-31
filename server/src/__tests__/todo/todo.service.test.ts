import { describe, it, expect, vi, beforeEach } from 'vitest';
import { todoService } from '../../domain/todo/services/todo.service';
import { Todo } from '../../domain/todo/entities/todo.entity';

// Mock the repository layer
vi.mock('../../infrastructure/repositories/todo.repository', () => ({
  getTodos: vi.fn(),
  createTodo: vi.fn(),
  updateTodo: vi.fn(),
  deleteTodo: vi.fn(),
}));

import * as todoRepository from '../../infrastructure/repositories/todo.repository';

describe('TodoService', () => {
  const mockUserId = 'user-123';
  const fixedDate = new Date('2025-08-04T09:16:56.790Z');
  const mockTodo: Todo = {
    id: 1,
    user_id: mockUserId,
    task: 'Test todo',
    is_complete: false,
    created_at: fixedDate,
    importance: 'medium',
    status: 'pending',
    display_order: 1,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getTodos', () => {
    it('should return todos for a user', async () => {
      // Arrange
      const mockTodos = [{ ...mockTodo, inserted_at: new Date() }];
      vi.mocked(todoRepository.getTodos).mockResolvedValue(mockTodos);

      // Act
      const result = await todoService.getTodos(mockUserId);

      // Assert
      expect(result).toEqual(mockTodos);
      expect(todoRepository.getTodos).toHaveBeenCalledWith(mockUserId);
      expect(todoRepository.getTodos).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when no todos exist', async () => {
      // Arrange
      vi.mocked(todoRepository.getTodos).mockResolvedValue([]);

      // Act
      const result = await todoService.getTodos(mockUserId);

      // Assert
      expect(result).toEqual([]);
      expect(todoRepository.getTodos).toHaveBeenCalledWith(mockUserId);
    });

    it('should filter by week and status', async () => {
      const now = new Date();
      const currentWeekTodo = {
        ...mockTodo,
        id: 2,
        inserted_at: now,
        status: 'in_progress' as const,
      };
      const completedTodo = {
        ...mockTodo,
        id: 3,
        inserted_at: now,
        is_complete: true,
        status: 'completed' as const,
      };
      const oldTodo = {
        ...mockTodo,
        id: 4,
        inserted_at: new Date('2000-01-01T00:00:00.000Z'),
        status: 'in_progress' as const,
      };
      vi.mocked(todoRepository.getTodos).mockResolvedValue([
        currentWeekTodo,
        completedTodo,
        oldTodo,
      ]);

      const result = await todoService.getTodos(mockUserId, {
        view: 'week',
        status: 'in_progress',
      });

      expect(result).toEqual([currentWeekTodo]);
    });

    it('should sort day view by display_order ascending', async () => {
      const now = new Date();
      const second = {
        ...mockTodo,
        id: 10,
        inserted_at: now,
        display_order: 2,
      };
      const first = {
        ...mockTodo,
        id: 11,
        inserted_at: now,
        display_order: 1,
      };

      vi.mocked(todoRepository.getTodos).mockResolvedValue([second, first]);

      const result = await todoService.getTodos(mockUserId, { view: 'day' });

      expect(result).toEqual([first, second]);
    });

    it('should filter by month and sort by newest date first', async () => {
      const now = new Date();
      const newer = {
        ...mockTodo,
        id: 20,
        created_at: new Date(now.getFullYear(), now.getMonth(), 20),
      };
      const older = {
        ...mockTodo,
        id: 21,
        created_at: new Date(now.getFullYear(), now.getMonth(), 5),
      };
      const otherMonth = {
        ...mockTodo,
        id: 22,
        created_at: new Date(now.getFullYear(), now.getMonth() - 1, 25),
      };

      vi.mocked(todoRepository.getTodos).mockResolvedValue([older, otherMonth, newer]);

      const result = await todoService.getTodos(mockUserId, { view: 'month' });

      expect(result).toEqual([newer, older]);
    });
  });

  describe('createTodo', () => {
    it('should create a new todo', async () => {
      // Arrange
      const task = 'New todo task';
      vi.mocked(todoRepository.createTodo).mockResolvedValue(mockTodo);

      // Act
      const result = await todoService.createTodo(task, mockUserId);

      // Assert
      expect(result).toEqual(mockTodo);
      expect(todoRepository.createTodo).toHaveBeenCalledWith(task, mockUserId, undefined);
      expect(todoRepository.createTodo).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateTodo', () => {
    it('should update a todo', async () => {
      // Arrange
      const todoId = 1;
      const task = 'Updated task';
      const isComplete = true;
      const updatedTodo = { ...mockTodo, task, is_complete: isComplete };
      vi.mocked(todoRepository.updateTodo).mockResolvedValue(updatedTodo);

      // Act
      const result = await todoService.updateTodo(todoId, task, isComplete, mockUserId);

      // Assert
      expect(result).toEqual(updatedTodo);
      expect(todoRepository.updateTodo).toHaveBeenCalledWith(
        todoId,
        task,
        isComplete,
        mockUserId,
        undefined
      );
      expect(todoRepository.updateTodo).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteTodo', () => {
    it('should delete a todo', async () => {
      // Arrange
      const todoId = 1;
      vi.mocked(todoRepository.deleteTodo).mockResolvedValue(undefined);

      // Act
      await todoService.deleteTodo(todoId, mockUserId);

      // Assert
      expect(todoRepository.deleteTodo).toHaveBeenCalledWith(todoId, mockUserId);
      expect(todoRepository.deleteTodo).toHaveBeenCalledTimes(1);
    });
  });
});
