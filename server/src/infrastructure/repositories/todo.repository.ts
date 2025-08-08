import { RowList } from 'postgres';
import sql from '../database/postgres';
import { Todo } from '../../domain/todo/entities/todo.entity';
import { DatabaseException, NotFoundException } from '../../common/exceptions';
// import { logger } from '../../common/utils/logger';

export async function getTodos(user_id: string): Promise<Todo[]> {
  try {
    const res = await sql<RowList<Todo[]>>`
      SELECT
        *
      FROM
        todos
      WHERE
        user_id = ${user_id}
    `;
    return res;
  } catch (error) {
    throw new DatabaseException(`Failed to get todos: ${error}`);
  }
}

export async function createTodo(task: string, user_id: string): Promise<Todo> {
  try {
    const res = await sql<Todo[]>`
      INSERT INTO todos (task, user_id, is_complete)
        VALUES (${task}, ${user_id}, FALSE)
      RETURNING
        id, task, is_complete
    `;

    if (res.length === 0) {
      throw new DatabaseException('Failed to create todo');
    }

    return res[0];
  } catch (error) {
    throw new DatabaseException(`Failed to create todo: ${error}`);
  }
}

export async function updateTodo(
  id: number,
  task: string,
  is_complete: boolean,
  user_id: string
): Promise<Todo> {
  try {
    const res = await sql<Todo[]>`
      UPDATE
        todos
      SET
        task = ${task},
        is_complete = ${is_complete}
      WHERE
        id = ${id}
        AND user_id = ${user_id}
      RETURNING
        id,
        task,
        is_complete
    `;

    if (res.length === 0) {
      throw new NotFoundException('Todo not found or not owned by user');
    }

    return res[0];
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw error;
    }
    throw new DatabaseException(`Failed to update todo: ${error}`);
  }
}

export async function deleteTodo(id: number, user_id: string): Promise<void> {
  try {
    // logger.debug(`Delete todo with id: ${id}, user_id: ${user_id}`);
    const res = await sql`
      DELETE FROM todos
      WHERE id = ${id}
        AND user_id = ${user_id}
      RETURNING
        id
    `;

    if (res.length === 0) {
      throw new NotFoundException('Todo not found or not owned by user');
    }
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw error;
    }
    throw new DatabaseException(`Failed to delete todo: ${error}`);
  }
}
