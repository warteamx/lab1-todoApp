import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../app';

describe('Todo API', () => {
  it('should get all todos', async() => {
    const res = await request(app).get('/api/todo');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should create a todo', async() => {
    const res = await request(app)
      .post('/api/todo')
      .send({ title: 'Test Todo' });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test Todo');
  });
});
