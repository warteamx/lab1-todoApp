#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Build version information for client package
 * Injects environment variables and updates version constants
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
    const buildDate = new Date().toISOString();
    const buildEnv = process.env.NODE_ENV || 'development';

    return {
      version: packageJson.version,
      buildNumber: process.env.BUILD_NUMBER || '1',
      buildDate,
      commitHash,
      buildEnv,
    };
  } catch (error) {
    console.warn('Warning: Could not get git info:', error.message);
    return {
      version: packageJson.version,
      buildNumber: process.env.BUILD_NUMBER || '1',
      buildDate: new Date().toISOString(),
      commitHash: 'unknown',
      buildEnv: process.env.NODE_ENV || 'development',
    };
  }
}

function updateVersionFile(buildInfo) {
  const versionFilePath = path.join(__dirname, '..', 'constants/version.ts');

  let content = `/**
 * Version constants for the Expo Lab client application
 * These values are injected during build time from environment variables
 */

/**
 * Application version following semantic versioning (SemVer)
 * Format: MAJOR.MINOR.PATCH
 */
export const APP_VERSION = process.env.EXPO_PUBLIC_APP_VERSION || '${buildInfo.version}';

/**
 * Build number for tracking specific builds
 * Typically incremented with each CI/CD build
 */
export const BUILD_NUMBER = process.env.EXPO_PUBLIC_BUILD_NUMBER || '${buildInfo.buildNumber}';

/**
 * Build date in ISO format
 * Set during the build process
 */
export const BUILD_DATE = process.env.EXPO_PUBLIC_BUILD_DATE || '${buildInfo.buildDate}';

/**
 * Git commit hash (short)
 * Useful for debugging and tracking specific builds
 */
export const COMMIT_HASH = process.env.EXPO_PUBLIC_COMMIT_HASH || '${buildInfo.commitHash}';

/**
 * Build environment
 * development, staging, production
 */
export const BUILD_ENV = process.env.EXPO_PUBLIC_BUILD_ENV || '${buildInfo.buildEnv}';

/**
 * Complete version information object
 */
export const VERSION_INFO = {
  version: APP_VERSION,
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
export const VERSION_STRING = \`v\${APP_VERSION} (Build \${BUILD_NUMBER})\`;

/**
 * Detailed version string with date
 * Format: "v1.1.1 (Build 42) - Sep 4, 2025"
 */
export const DETAILED_VERSION_STRING = \`\${VERSION_STRING} - \${new Date(BUILD_DATE).toLocaleDateString()}\`;
`;

  fs.writeFileSync(versionFilePath, content);
  console.log('✅ Updated client version constants');
}

function main() {
  console.log('🔨 Building client version information...');

  const buildInfo = getBuildInfo();
  console.log('📦 Build Info:', buildInfo);

  updateVersionFile(buildInfo);

  console.log('✅ Client version build completed');
}

if (require.main === module) {
  main();
}

module.exports = { getBuildInfo, updateVersionFile };
