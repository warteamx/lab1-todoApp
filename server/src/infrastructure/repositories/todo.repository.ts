import { RowList } from 'postgres';
import sql from '../database/postgres';
import { Todo } from '../../domain/todo/entities/todo.entity';
import { DatabaseException, NotFoundException } from '../../common/exceptions';
import logger from '../../common/utils/logger';

let metadataTableInitialized = false;

const normalizeStatus = (
  is_complete: boolean,
  status?: Todo['status']
): Todo['status'] => {
  if (is_complete) return 'completed';
  if (status === 'in_progress' || status === 'pending') return status;
  return 'pending';
};

async function ensureTodoMetadataTable(): Promise<void> {
  if (metadataTableInitialized) return;
  await sql`
    CREATE TABLE IF NOT EXISTS todo_metadata (
      todo_id BIGINT PRIMARY KEY REFERENCES todos(id) ON DELETE CASCADE,
      user_id TEXT NOT NULL,
      importance TEXT NOT NULL DEFAULT 'medium' CHECK (importance IN ('low', 'medium', 'high')),
      status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
      display_order INTEGER,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS idx_todo_metadata_user_id ON todo_metadata(user_id)
  `;
  metadataTableInitialized = true;
}

export async function getTodos(user_id: string): Promise<Todo[]> {
  try {
    await ensureTodoMetadataTable();
    const res = await sql<RowList<Todo[]>>`
      SELECT
        t.*,
        COALESCE(m.importance, 'medium') AS importance,
        CASE
          WHEN t.is_complete THEN 'completed'
          ELSE COALESCE(m.status, 'pending')
        END AS status,
        COALESCE(m.display_order, t.id) AS display_order
      FROM
        todos t
      LEFT JOIN todo_metadata m ON m.todo_id = t.id
        AND m.user_id = t.user_id
      WHERE
        t.user_id = ${user_id}
      ORDER BY
        COALESCE(m.display_order, t.id) ASC, t.id ASC
    `;
    return res;
  } catch (error) {
    throw new DatabaseException(`Failed to get todos: ${error}`);
  }
}

export async function createTodo(
  task: string,
  user_id: string,
  metadata?: Partial<Pick<Todo, 'importance' | 'status' | 'display_order'>>
): Promise<Todo> {
  try {
    await ensureTodoMetadataTable();
    const res = await sql<Todo[]>`
      INSERT INTO todos (task, user_id, is_complete)
        VALUES (${task}, ${user_id}, FALSE)
      RETURNING
        id,
        user_id,
        task,
        is_complete,
        inserted_at,
        created_at
    `;

    if (res.length === 0) {
      throw new DatabaseException('Failed to create todo');
    }

    const todo = res[0];
    const importance = metadata?.importance ?? 'medium';
    const status = normalizeStatus(todo.is_complete, metadata?.status);
    const displayOrder = metadata?.display_order ?? todo.id;

    await sql`
      INSERT INTO todo_metadata (todo_id, user_id, importance, status, display_order)
      VALUES (${todo.id}, ${user_id}, ${importance}, ${status}, ${displayOrder})
      ON CONFLICT (todo_id)
      DO UPDATE SET
        importance = EXCLUDED.importance,
        status = EXCLUDED.status,
        display_order = EXCLUDED.display_order,
        updated_at = NOW()
    `;

    return {
      ...todo,
      importance,
      status,
      display_order: displayOrder,
    };
  } catch (error) {
    throw new DatabaseException(`Failed to create todo: ${error}`);
  }
}

export async function updateTodo(
  id: number,
  task: string,
  is_complete: boolean,
  user_id: string,
  metadata?: Partial<Pick<Todo, 'importance' | 'status' | 'display_order'>>
): Promise<Todo> {
  try {
    await ensureTodoMetadataTable();
    const existingMetadata = await sql<
      Array<Pick<Todo, 'importance' | 'status' | 'display_order'>>
    >`
      SELECT importance, status, display_order
      FROM todo_metadata
      WHERE todo_id = ${id}
        AND user_id = ${user_id}
      LIMIT 1
    `;
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
        user_id,
        task,
        is_complete,
        inserted_at,
        created_at
    `;

    if (res.length === 0) {
      throw new NotFoundException('Todo not found or not owned by user');
    }

    const todo = res[0];
    const importance = metadata?.importance ?? existingMetadata[0]?.importance ?? 'medium';
    const status = normalizeStatus(
      is_complete,
      metadata?.status ?? existingMetadata[0]?.status
    );
    const displayOrder = metadata?.display_order ?? existingMetadata[0]?.display_order ?? id;

    await sql`
      INSERT INTO todo_metadata (todo_id, user_id, importance, status, display_order)
      VALUES (${id}, ${user_id}, ${importance}, ${status}, ${displayOrder})
      ON CONFLICT (todo_id)
      DO UPDATE SET
        importance = EXCLUDED.importance,
        status = EXCLUDED.status,
        display_order = EXCLUDED.display_order,
        updated_at = NOW()
    `;

    return {
      ...todo,
      importance,
      status,
      display_order: displayOrder,
    };
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw error;
    }
    throw new DatabaseException(`Failed to update todo: ${error}`);
  }
}

export async function deleteTodo(id: number, user_id: string): Promise<void> {
  try {
    logger.debug(`Delete todo with id: ${id}, user_id: ${user_id}`);
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
