/**
 * Version constants for the Expo Lab client application
 * These values are injected during build time from environment variables
 */

/**
 * Application version following semantic versioning (SemVer)
 * Format: MAJOR.MINOR.PATCH
 */
export const APP_VERSION = process.env.EXPO_PUBLIC_APP_VERSION || '1.0.4';

/**
 * Build number for tracking specific builds
 * Typically incremented with each CI/CD build
 */
export const BUILD_NUMBER = process.env.EXPO_PUBLIC_BUILD_NUMBER || '1';

/**
 * Build date in ISO format
 * Set during the build process
 */
export const BUILD_DATE = process.env.EXPO_PUBLIC_BUILD_DATE || '2025-09-05T10:09:51.952Z';

/**
 * Git commit hash (short)
 * Useful for debugging and tracking specific builds
 */
export const COMMIT_HASH = process.env.EXPO_PUBLIC_COMMIT_HASH || 'f3736d1';

/**
 * Build environment
 * development, staging, production
 */
export const BUILD_ENV = process.env.EXPO_PUBLIC_BUILD_ENV || 'development';

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
export const VERSION_STRING = `v${APP_VERSION} (Build ${BUILD_NUMBER})`;

/**
 * Detailed version string with date
 * Format: "v1.1.1 (Build 42) - Sep 4, 2025"
 */
export const DETAILED_VERSION_STRING = `${VERSION_STRING} - ${new Date(BUILD_DATE).toLocaleDateString()}`;
