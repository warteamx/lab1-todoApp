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
    const commitHash = execSync('git rev-parse --short HEAD', {
      encoding: 'utf8',
    }).trim();
    const buildDate = new Date().toISOString();
    const buildEnv = process.env.NODE_ENV || 'development';

    return {
      version: packageJson.version,
      buildNumber: process.env.BUILD_NUMBER || '1',
      buildDate,
      commitHash,
      buildEnv,
      name: packageJson.name,
      description: packageJson.description || 'Express API Server',
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
      description: packageJson.description || 'Express API Server',
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

function main() {
  console.log('🔨 Building server version information...');

  const buildInfo = getBuildInfo();
  console.log('📦 Build Info:', buildInfo);

  createVersionEndpoint(buildInfo);

  console.log('✅ Server version build completed');
}

if (require.main === module) {
  main();
}

module.exports = { getBuildInfo, createVersionEndpoint };
