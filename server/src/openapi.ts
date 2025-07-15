import swaggerJSDoc from 'swagger-jsdoc';

export const specs = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo API',
      version: '1.0.0',
      description: 'API documentation for the Todo service',
    },
  },
  apis: ['./src/api/todo/*.ts'],
});
