import { RowList } from 'postgres';
import sql from '../database/postgres'
import { Todo } from '../../domain/todo/entities/todo.entity';



export async function getTodos(user_id: string): Promise<Todo[]> {
  const res = await sql<RowList<Todo[]>>`
    SELECT
      *
    FROM
      todos
    WHERE
      user_id = ${user_id}
  `
  return res;
  
}

export async function createTodo(task: string, user_id: string): Promise<Todo> {
  const res = await sql<Todo[]>`
    INSERT INTO todos (task, user_id, is_complete)
      VALUES (${task}, ${user_id}, false)
    RETURNING
      id, task, is_complete
  `
  return res[0];
}

export async function updateTodo(id: number, task: string, is_complete: boolean, user_id: string): Promise<Todo> {
  console.log(`Updating todo with id: ${id}, task: ${task}, is_complete: ${is_complete}, user_id: ${user_id}`);

  const res = await sql<Todo[]>`
    UPDATE todos
    SET task = ${task}, is_complete = ${is_complete}
    WHERE id = ${id} AND user_id = ${user_id}
    RETURNING id, task, is_complete
  `
  return res[0];
}

export async function deleteTodo(id: number, user_id: string): Promise<void> {
  await sql`
    DELETE FROM todos
    WHERE id = ${id} AND user_id = ${user_id}
  `;
}

