import path from 'path';
import fs from 'fs';
import yaml from 'yaml';

// Use more robust path resolution for production builds
const getOpenapiPath = (relativePath: string) => {
  // Try the compiled path first (production)
  const compiledPath = path.join(__dirname, relativePath);
  if (fs.existsSync(compiledPath)) {
    return compiledPath;
  }

  // Fallback to source path (development)
  const sourcePath = path.join(__dirname, '../src', relativePath);
  if (fs.existsSync(sourcePath)) {
    return sourcePath;
  }

  throw new Error(`OpenAPI file not found: ${relativePath}`);
};

const todoOpenapiPath = getOpenapiPath('./api/todo/todo.openapi.yml');
const healthOpenapiPath = getOpenapiPath('./api/health/health.openapi.yml');
const profileOpenapiPath = getOpenapiPath('./api/profile/profile.openapi.yml');

let todoOpenapiDoc, healthOpenapiDoc, profileOpenapiDoc;

try {
  todoOpenapiDoc = yaml.parse(fs.readFileSync(todoOpenapiPath, 'utf8'));
  healthOpenapiDoc = yaml.parse(fs.readFileSync(healthOpenapiPath, 'utf8'));
  profileOpenapiDoc = yaml.parse(fs.readFileSync(profileOpenapiPath, 'utf8'));

  console.log('✅ OpenAPI files loaded successfully');
  console.log(`📁 Todo OpenAPI: ${todoOpenapiPath}`);
  console.log(`📁 Health OpenAPI: ${healthOpenapiPath}`);
  console.log(`📁 Profile OpenAPI: ${profileOpenapiPath}`);
} catch (error) {
  console.error('❌ Error loading OpenAPI files:', error);
  throw error;
}

// Merge the OpenAPI specifications
const mergedOpenapiDoc = {
  openapi: '3.1.0',
  info: {
    title: 'Expo Lab API',
    version: '1.1.0',
    description:
      'Complete API for the Expo Lab application including todos, profiles, and health checks',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local development server',
    },
    {
      url: 'http://56.228.14.41',
      description: 'Production server',
    },
    {
      url: 'https://lab1.warteamx.com',
      description: 'Production server (HTTPS)',
    },
  ],
  tags: [
    ...(todoOpenapiDoc.tags || []),
    ...(healthOpenapiDoc.tags || []),
    ...(profileOpenapiDoc.tags || []),
  ],
  security: [{ Authorization: [] }],
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
        description: 'JWT token for authentication',
      },
      ...healthOpenapiDoc.components?.securitySchemes,
      ...todoOpenapiDoc.components?.securitySchemes,
      ...profileOpenapiDoc.components?.securitySchemes,
    },
  },
};

export default mergedOpenapiDoc;
