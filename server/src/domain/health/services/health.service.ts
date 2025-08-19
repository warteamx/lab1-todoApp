/**
 * Health domain service
 * Handles health check logic and provides system health information
 */
export interface HealthStatus {
  status: 'healthy';
  timestamp: string;
  uptime: number;
  version: string;
}

// Module-level state
const startTime = Date.now();
const version = process.env.npm_package_version || '1.0.0';

/**
 * Get current health status of the system
 * @returns HealthStatus object with current system information
 */
export function getHealthStatus(): HealthStatus {
  return {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: Math.floor((Date.now() - startTime) / 1000),
    version,
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
  return version;
}

// Legacy compatibility - object with function property
export const healthService = {
  getHealthStatus,
};
