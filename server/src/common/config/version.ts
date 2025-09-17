/**
 * Version configuration for the Express.js server
 * These values are injected during build time from environment variables
 */

/**
 * Server version following semantic versioning (SemVer)
 * Format: MAJOR.MINOR.PATCH
 */
export const SERVER_VERSION = '1.2.9';

/**
 * Build number for tracking specific builds
 * Typically incremented with each CI/CD build
 */
export const BUILD_NUMBER = '156';

/**
 * Build date in ISO format
 * Set during the build process
 */
export const BUILD_DATE = '2025-09-17T09:57:19.3NZ';

/**
 * Git commit hash (short)
 * Useful for debugging and tracking specific builds
 */
export const COMMIT_HASH = 'cf7a493';

/**
 * Build environment
 * development, staging, production
 */
export const BUILD_ENV = 'production';

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
export const VERSION_STRING = `v${SERVER_VERSION} (Build ${BUILD_NUMBER})`;

/**
 * Detailed version string with date
 * Format: "v1.1.1 (Build 42) - Sep 4, 2025"
 */
export const DETAILED_VERSION_STRING = `${VERSION_STRING} - ${new Date(BUILD_DATE).toLocaleDateString()}`;
