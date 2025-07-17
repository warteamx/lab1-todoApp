import { RowList } from 'postgres';
import sql from '../database/postgres'
import { Todo } from '../../domain/todo/entities/todo.entity';



export async function getTodos(): Promise<Todo[]> {
  const res = await sql<RowList<Todo[]>>`
    SELECT
      *
    FROM
      todos
  `
  return res;
  
}

export async function createTodo(task: string): Promise<Todo> {
  const res = await sql<Todo[]>`
    INSERT INTO todo (task, id, is_complete)
      VALUES (${task})
    RETURNING
      id, task, is_complete
  `
  return res[0];
}
