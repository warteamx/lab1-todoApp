import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express, { Request, Response, NextFunction } from 'express';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../../api/todo/todo.controller';

// Mock the todoService
vi.mock('../../domain/todo/services/todo.service', () => ({
  todoService: {
    getTodos: vi.fn(),
    createTodo: vi.fn(),
    updateTodo: vi.fn(),
    deleteTodo: vi.fn(),
  },
}));

import { todoService } from '../../domain/todo/services/todo.service';

// Create a test app without auth middleware for testing
const createTestApp = () => {
  const app = express();
  app.use(express.json());

  // Mock auth middleware - adds userClaims to request
  app.use((req: any, res: Response, next: NextFunction) => {
    req.userClaims = { sub: 'test-user-123' };
    next();
  });

  // Add routes
  app.get('/api/todo', getTodos);
  app.post('/api/todo', createTodo);
  app.put('/api/todo', updateTodo);
  app.delete('/api/todo', deleteTodo);

  return app;
};

describe('Todo API Integration Tests', () => {
  const app = createTestApp();
  const mockUserId = 'test-user-123';
  const fixedDate = '2025-08-04T09:16:56.790Z';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/todo', () => {
    it('should get all todos for the user', async () => {
      // Arrange
      const mockTodos = [
        {
          id: 1,
          user_id: mockUserId,
          task: 'Test todo 1',
          is_complete: false,
          created_at: new Date(fixedDate),
        },
        {
          id: 2,
          user_id: mockUserId,
          task: 'Test todo 2',
          is_complete: true,
          created_at: new Date(fixedDate),
        },
      ];
      vi.mocked(todoService.getTodos).mockResolvedValue(mockTodos);

      // Act
      const response = await request(app).get('/api/todo');

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        {
          id: 1,
          user_id: mockUserId,
          task: 'Test todo 1',
          is_complete: false,
          created_at: fixedDate,
        },
        {
          id: 2,
          user_id: mockUserId,
          task: 'Test todo 2',
          is_complete: true,
          created_at: fixedDate,
        },
      ]);
      expect(todoService.getTodos).toHaveBeenCalledWith(mockUserId);
    });

    it('should return empty array when no todos exist', async () => {
      // Arrange
      vi.mocked(todoService.getTodos).mockResolvedValue([]);

      // Act
      const response = await request(app).get('/api/todo');

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  });

  describe('POST /api/todo', () => {
    it('should create a new todo', async () => {
      // Arrange
      const newTodo = {
        id: 1,
        user_id: mockUserId,
        task: 'New test todo',
        is_complete: false,
        created_at: new Date(fixedDate),
      };
      vi.mocked(todoService.createTodo).mockResolvedValue(newTodo);

      // Act
      const response = await request(app)
        .post('/api/todo')
        .send({ task: 'New test todo' });

      // Assert
      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        id: 1,
        user_id: mockUserId,
        task: 'New test todo',
        is_complete: false,
        created_at: fixedDate,
      });
      expect(todoService.createTodo).toHaveBeenCalledWith('New test todo', mockUserId);
    });

    it('should handle missing task field', async () => {
      // Act
      const response = await request(app)
        .post('/api/todo')
        .send({});

      // Assert
      expect(response.status).toBe(201); // Note: The controller doesn't validate required fields
    });
  });

  describe('PUT /api/todo', () => {
    it('should update an existing todo', async () => {
      // Arrange
      const updatedTodo = {
        id: 1,
        user_id: mockUserId,
        task: 'Updated todo',
        is_complete: true,
        created_at: new Date(fixedDate),
      };
      vi.mocked(todoService.updateTodo).mockResolvedValue(updatedTodo);

      // Act
      const response = await request(app)
        .put('/api/todo')
        .send({
          id: 1,
          task: 'Updated todo',
          is_complete: true,
        });

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: 1,
        user_id: mockUserId,
        task: 'Updated todo',
        is_complete: true,
        created_at: fixedDate,
      });
      expect(todoService.updateTodo).toHaveBeenCalledWith(1, 'Updated todo', true, mockUserId);
    });
  });

  describe('DELETE /api/todo', () => {
    it('should delete a todo', async () => {
      // Arrange
      vi.mocked(todoService.deleteTodo).mockResolvedValue(undefined);

      // Act
      const response = await request(app)
        .delete('/api/todo')
        .send({ id: 1 });

      // Assert
      expect(response.status).toBe(204);
      expect(todoService.deleteTodo).toHaveBeenCalledWith(1, mockUserId);
    });
  });
});
