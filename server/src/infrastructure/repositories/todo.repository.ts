import { pool } from '../database/postgres';
import { Todo } from '../../domain/todo/entities/todo.entity';

export async function getTodos(): Promise<Todo[]> {
  const res = await pool.query('SELECT * FROM todos');
  return res.rows;
}

export async function createTodo(title: string): Promise<Todo> {
  const res = await pool.query('INSERT INTO todos (title) VALUES ($1) RETURNING *', [title]);
  return res.rows[0];
}
