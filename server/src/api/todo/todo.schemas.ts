export const TodoSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    task: { type: 'string' },
    is_complete: { type: 'boolean' },
    user_id: { type: 'string' },
    importance: { type: 'string', enum: ['low', 'medium', 'high'] },
    status: { type: 'string', enum: ['pending', 'in_progress', 'completed'] },
    display_order: { type: 'number' },
  },
  required: [
    'id',
    'task',
    'is_complete',
    'user_id',
    'importance',
    'status',
    'display_order',
  ],
};

export const TodoListSchema = {
  type: 'array',
  items: TodoSchema,
};

export const CreateTodoDtoSchema = {
  type: 'object',
  properties: {
    task: { type: 'string' },
    user_id: { type: 'string' },
    is_complete: { type: 'boolean', default: false },
    importance: { type: 'string', enum: ['low', 'medium', 'high'] },
    status: { type: 'string', enum: ['pending', 'in_progress', 'completed'] },
    display_order: { type: 'number' },
  },
  required: ['task', 'user_id'],
};

export const UpdateTodoDtoSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    task: { type: 'string' },
    is_complete: { type: 'boolean' },
    user_id: { type: 'string' },
    importance: { type: 'string', enum: ['low', 'medium', 'high'] },
    status: { type: 'string', enum: ['pending', 'in_progress', 'completed'] },
    display_order: { type: 'number' },
  },
  required: ['id', 'task', 'is_complete', 'user_id'],
};

export const DeleteTodoDtoSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: { type: 'string' },
  },
};

export const TodoSchemas = {
  CreateTodoDtoSchema,
  UpdateTodoDtoSchema,
  DeleteTodoDtoSchema,
  TodoSchema,
  TodoListSchema,
};
