#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Build version information for server package
 * Creates version endpoint and updates package metadata
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function getBuildInfo() {
  const packageJson = require('../package.json'); // eslint-disable-line @typescript-eslint/no-require-imports

  try {
    const commitHash = execSync('git rev-parse --short HEAD', {
      encoding: 'utf8',
    }).trim();
    const buildDate = process.env.BUILD_DATE || new Date().toISOString();
    const buildEnv = process.env.NODE_ENV || 'development';

    return {
      version: process.env.SERVER_VERSION || packageJson.version,
      buildNumber: process.env.BUILD_NUMBER || '1',
      buildDate,
      commitHash: process.env.COMMIT_HASH || commitHash,
      buildEnv,
      name: packageJson.name,
      description: packageJson.description || 'Express API Server',
    };
  } catch (error) {
    console.warn('Warning: Could not get git info:', error.message);
    return {
      version: process.env.SERVER_VERSION || packageJson.version,
      buildNumber: process.env.BUILD_NUMBER || '1',
      buildDate: process.env.BUILD_DATE || new Date().toISOString(),
      commitHash: process.env.COMMIT_HASH || 'unknown',
      buildEnv: process.env.NODE_ENV || 'development',
      name: packageJson.name,
      description: packageJson.description || 'Express API Server',
    };
  }
}

function updateVersionConfig(buildInfo) {
  const versionConfigPath = path.join(__dirname, '..', 'src/common/config/version.ts');

  const content = `/**
 * Version configuration for the Express.js server
 * These values are injected during build time from environment variables
 */

/**
 * Server version following semantic versioning (SemVer)
 * Format: MAJOR.MINOR.PATCH
 */
export const SERVER_VERSION = '${buildInfo.version}';

/**
 * Build number for tracking specific builds
 * Typically incremented with each CI/CD build
 */
export const BUILD_NUMBER = '${buildInfo.buildNumber}';

/**
 * Build date in ISO format
 * Set during the build process
 */
export const BUILD_DATE = '${buildInfo.buildDate}';

/**
 * Git commit hash (short)
 * Useful for debugging and tracking specific builds
 */
export const COMMIT_HASH = '${buildInfo.commitHash}';

/**
 * Build environment
 * development, staging, production
 */
export const BUILD_ENV = '${buildInfo.buildEnv}';

/**
 * Complete version information object
 */
export const VERSION_INFO = {
  version: SERVER_VERSION,
  buildNumber: BUILD_NUMBER,
  buildDate: BUILD_DATE,
  commitHash: COMMIT_HASH,
  environment: BUILD_ENV,
  timestamp: Date.now(),
} as const;

/**
 * Human-readable version string
 * Format: "v1.1.1 (Build 42)"
 */
export const VERSION_STRING = \`v\${SERVER_VERSION} (Build \${BUILD_NUMBER})\`;

/**
 * Detailed version string with date
 * Format: "v1.1.1 (Build 42) - Sep 4, 2025"
 */
export const DETAILED_VERSION_STRING = \`\${VERSION_STRING} - \${new Date(BUILD_DATE).toLocaleDateString()}\`;
`;

  fs.writeFileSync(versionConfigPath, content);
  console.log('✅ Updated version configuration');
}

function main() {
  console.log('🔨 Building server version information...');

  const buildInfo = getBuildInfo();
  console.log('📦 Build Info:', buildInfo);

  updateVersionConfig(buildInfo);

  console.log('✅ Server version build completed');
}

if (require.main === module) {
  main();
}

module.exports = { getBuildInfo, updateVersionConfig };
