import { VERSION_INFO, SERVER_VERSION } from '../../../common/config/version';

/**
 * Health domain service
 * Handles health check logic and provides system health information
 */
export interface HealthStatus {
  status: 'healthy';
  timestamp: string;
  uptime: number;
  version: string;
  build: {
    number: string;
    date: string;
    commit: string;
  };
  environment: string;
  server: {
    nodeVersion: string;
    platform: string;
    arch: string;
  };
}

// Module-level state
const startTime = Date.now();

/**
 * Get current health status of the system
 * @returns HealthStatus object with current system information
 */
export function getHealthStatus(): HealthStatus {
  return {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: Math.floor((Date.now() - startTime) / 1000),
    version: VERSION_INFO.version,
    build: {
      number: VERSION_INFO.buildNumber,
      date: VERSION_INFO.buildDate,
      commit: VERSION_INFO.commitHash,
    },
    environment: VERSION_INFO.environment,
    server: {
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch,
    },
  };
}

/**
 * Get the server start time
 * @returns Start time in milliseconds
 */
export function getStartTime(): number {
  return startTime;
}

/**
 * Get the application version
 * @returns Application version string
 */
export function getVersion(): string {
  return SERVER_VERSION;
}

/**
 * Get build information
 * @returns Build information object
 */
export function getBuildInfo() {
  return VERSION_INFO;
}

// Legacy compatibility - object with function property
export const healthService = {
  getHealthStatus,
};
