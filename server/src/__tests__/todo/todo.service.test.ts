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
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getTodos', () => {
    it('should return todos for a user', async () => {
      // Arrange
      const mockTodos = [mockTodo];
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
      expect(todoRepository.createTodo).toHaveBeenCalledWith(task, mockUserId);
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
        mockUserId
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
