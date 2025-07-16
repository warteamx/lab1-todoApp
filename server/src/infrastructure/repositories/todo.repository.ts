// import { pool } from '../database/postgres';
import sql  from '../database/postgres'
import { Todo } from '../../domain/todo/entities/todo.entity';
import { RowList } from 'postgres';

// export async function getTodos(): Promise<Todo[]> {
//   const res = await pool.query('SELECT * FROM todos');
//   return res.rows;
// }

// export async function createTodo(title: string): Promise<Todo> {
//   const res = await pool.query('INSERT INTO todos (title) VALUES ($1) RETURNING *', [title]);
//   return res.rows[0];
// }

export async function getTodos(): Promise<Todo[]> {
  const res = await sql<RowList<Todo[]>>`
  select
  *
  from todo
`
  return res;
}

export async function createTodo(task: string): Promise<Todo> {
  const res = await sql<Todo[]>`
    insert into todo
          (task, id, is_complete)
        values
          (${ task })
        returning id, task, is_complete
  `
  return res[0];
}
