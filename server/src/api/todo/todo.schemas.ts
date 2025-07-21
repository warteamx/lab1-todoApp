export const TodoSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    task: { type: 'string' },
    is_complete: { type: 'boolean' },
    user_id: { type: 'string' },
  },
  required: ['id', 'task', 'is_complete', 'user_id'],
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

  },
  required: ['task', 'user_id', 'is_complete'],
};

export const UpdateTodoDtoSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    task: { type: 'string' },
    is_complete: { type: 'boolean' },
    user_id: { type: 'string' },
  },
  required: ['id', 'task', 'is_complete', 'user_id'],
};

export const TodoSchemas = {
  CreateTodoDtoSchema,
  UpdateTodoDtoSchema,
  TodoSchema,
  TodoListSchema,
};