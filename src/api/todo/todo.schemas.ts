export const CreateTodoDtoSchema = {
  type: 'object',
  properties: {
    title: { type: 'string' },
  },
  required: ['title'],
};
