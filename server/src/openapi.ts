import path from 'path';
import fs from 'fs';
import yaml from 'yaml';

const todoOpenapiPath = path.join(__dirname, './api/todo/todo.openapi.yml');
const healthOpenapiPath = path.join(__dirname, './api/health/health.openapi.yml');

const todoOpenapiDoc = yaml.parse(fs.readFileSync(todoOpenapiPath, 'utf8'));
const healthOpenapiDoc = yaml.parse(fs.readFileSync(healthOpenapiPath, 'utf8'));

// Merge the OpenAPI specifications
const mergedOpenapiDoc = {
  ...todoOpenapiDoc,
  info: {
    title: 'Expo Lab API',
    version: '1.1.0',
    description: 'Complete API for the Expo Lab application including todos and health checks',
  },
  tags: [
    ...(todoOpenapiDoc.tags || []),
    ...(healthOpenapiDoc.tags || []),
  ],
  paths: {
    ...todoOpenapiDoc.paths,
    ...healthOpenapiDoc.paths,
  },
  components: {
    schemas: {
      ...todoOpenapiDoc.components?.schemas,
      ...healthOpenapiDoc.components?.schemas,
    },
  },
};

export default mergedOpenapiDoc;
