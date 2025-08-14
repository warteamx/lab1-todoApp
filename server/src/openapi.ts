import path from 'path';
import fs from 'fs';
import yaml from 'yaml';

const todoOpenapiPath = path.join(__dirname, './api/todo/todo.openapi.yml');
const healthOpenapiPath = path.join(__dirname, './api/health/health.openapi.yml');
const profileOpenapiPath = path.join(__dirname, './api/profile/profile.openapi.yml');

const todoOpenapiDoc = yaml.parse(fs.readFileSync(todoOpenapiPath, 'utf8'));
const healthOpenapiDoc = yaml.parse(fs.readFileSync(healthOpenapiPath, 'utf8'));
const profileOpenapiDoc = yaml.parse(fs.readFileSync(profileOpenapiPath, 'utf8'));

// Merge the OpenAPI specifications
const mergedOpenapiDoc = {
  openapi: '3.1.0',
  info: {
    title: 'Expo Lab API',
    version: '1.1.0',
    description: 'Complete API for the Expo Lab application including todos, profiles, and health checks',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local server'
    }
  ],
  tags: [
    ...(todoOpenapiDoc.tags || []),
    ...(healthOpenapiDoc.tags || []),
    ...(profileOpenapiDoc.tags || []),
  ],
  security: [
    { Authorization: [] }
  ],
  paths: {
    ...todoOpenapiDoc.paths,
    ...healthOpenapiDoc.paths,
    ...profileOpenapiDoc.paths,
  },
  components: {
    schemas: {
      ...healthOpenapiDoc.components?.schemas,
      ...todoOpenapiDoc.components?.schemas,
      ...profileOpenapiDoc.components?.schemas,
    },
    securitySchemes: {
      Authorization: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'JWT token for authentication'
      },
      ...healthOpenapiDoc.components?.securitySchemes,
      ...todoOpenapiDoc.components?.securitySchemes,
      ...profileOpenapiDoc.components?.securitySchemes,
    },
  },
};

export default mergedOpenapiDoc;
