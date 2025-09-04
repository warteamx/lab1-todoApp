#!/usr/bin/env node
/**
 * Build version information for server package
 * Creates version endpoint and updates package metadata
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function getBuildInfo() {
  const packageJson = require('../package.json');

  try {
    const commitHash = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();
    const buildDate = new Date().toISOString();
    const buildEnv = process.env.NODE_ENV || 'development';

    return {
      version: packageJson.version,
      buildNumber: process.env.BUILD_NUMBER || '1',
      buildDate,
      commitHash,
      buildEnv,
      name: packageJson.name,
      description: packageJson.description || 'Express API Server'
    };
  } catch (error) {
    console.warn('Warning: Could not get git info:', error.message);
    return {
      version: packageJson.version,
      buildNumber: process.env.BUILD_NUMBER || '1',
      buildDate: new Date().toISOString(),
      commitHash: 'unknown',
      buildEnv: process.env.NODE_ENV || 'development',
      name: packageJson.name,
      description: packageJson.description || 'Express API Server'
    };
  }
}

function createVersionEndpoint(buildInfo) {
  const versionDir = path.join(__dirname, '..', 'src/api/system');
  const versionFilePath = path.join(versionDir, 'version.controller.ts');

  // Ensure directory exists
  if (!fs.existsSync(versionDir)) {
    fs.mkdirSync(versionDir, { recursive: true });
  }

  const content = `import { Request, Response } from 'express';

/**
 * Version information for the server
 * Updated during build process
 */
export const VERSION_INFO = {
  name: '${buildInfo.name}',
  description: '${buildInfo.description}',
  version: '${buildInfo.version}',
  buildNumber: '${buildInfo.buildNumber}',
  buildDate: '${buildInfo.buildDate}',
  commitHash: '${buildInfo.commitHash}',
  environment: '${buildInfo.buildEnv}',
  timestamp: Date.now(),
  uptime: process.uptime(),
  nodeVersion: process.version,
  platform: process.platform,
  arch: process.arch
} as const;

/**
 * GET /api/version
 * Returns version and build information
 */
export const getVersion = (req: Request, res: Response) => {
  res.json({
    ...VERSION_INFO,
    uptime: process.uptime(),
    timestamp: Date.now()
  });
};

/**
 * GET /api/health
 * Health check endpoint with version info
 */
export const getHealth = (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    version: VERSION_INFO.version,
    buildNumber: VERSION_INFO.buildNumber,
    uptime: process.uptime(),
    timestamp: Date.now(),
    environment: VERSION_INFO.environment
  });
};
`;

  fs.writeFileSync(versionFilePath, content);
  console.log('✅ Created version controller');

  // Create routes file
  const routesFilePath = path.join(versionDir, 'version.routes.ts');
  const routesContent = `import { Router } from 'express';
import { getVersion, getHealth } from './version.controller';

const router = Router();

/**
 * Version and health routes
 */
router.get('/version', getVersion);
router.get('/health', getHealth);

export default router;
`;

  fs.writeFileSync(routesFilePath, routesContent);
  console.log('✅ Created version routes');
}

function updateAppRoutes() {
  const appFilePath = path.join(__dirname, '..', 'src/app.ts');

  if (fs.existsSync(appFilePath)) {
    let appContent = fs.readFileSync(appFilePath, 'utf8');

    // Check if version routes are already imported
    if (!appContent.includes('version.routes')) {
      // Add import
      const importMatch = appContent.match(/(import.*from.*['"]\.)/);
      if (importMatch) {
        const insertIndex = appContent.indexOf(importMatch[0]) + importMatch[0].length;
        appContent = appContent.slice(0, insertIndex) +
          "\nimport versionRoutes from './api/system/version.routes';" +
          appContent.slice(insertIndex);
      }

      // Add route usage
      const routeMatch = appContent.match(/app\.use\(['"][^'"]*['"][^;]*;/g);
      if (routeMatch && routeMatch.length > 0) {
        const lastRoute = routeMatch[routeMatch.length - 1];
        const insertIndex = appContent.indexOf(lastRoute) + lastRoute.length;
        appContent = appContent.slice(0, insertIndex) +
          "\napp.use('/api', versionRoutes);" +
          appContent.slice(insertIndex);
      }

      fs.writeFileSync(appFilePath, appContent);
      console.log('✅ Updated app routes with version endpoints');
    }
  }
}

function generateEnvExample() {
  const envExamplePath = path.join(__dirname, '..', '.env.example');
  const buildInfo = getBuildInfo();

  const envContent = `# Server Environment Variables

# Version Information (injected during build)
APP_VERSION=${buildInfo.version}
BUILD_NUMBER=${buildInfo.buildNumber}
BUILD_DATE=${buildInfo.buildDate}
COMMIT_HASH=${buildInfo.commitHash}
BUILD_ENV=${buildInfo.buildEnv}

# Server Configuration
NODE_ENV=development
PORT=3000
HOST=localhost

# Database Configuration
DATABASE_URL=
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_KEY=

# Security
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:8081

# Logging
LOG_LEVEL=info
LOG_FILE=logs/combined.log
ERROR_LOG_FILE=logs/error.log
`;

  fs.writeFileSync(envExamplePath, envContent);
  console.log('✅ Generated .env.example');
}

function main() {
  console.log('🔨 Building server version information...');

  const buildInfo = getBuildInfo();
  console.log('📦 Build Info:', buildInfo);

  createVersionEndpoint(buildInfo);
  updateAppRoutes();
  generateEnvExample();

  console.log('✅ Server version build completed');
}

if (require.main === module) {
  main();
}

module.exports = { getBuildInfo, createVersionEndpoint };
