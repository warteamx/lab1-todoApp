import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import { getHealth } from '../../api/health/health.controller';

// Mock the health service functions
vi.mock('../../domain/health/services/health.service', () => ({
  getHealthStatus: vi.fn(),
  getStartTime: vi.fn(),
  getVersion: vi.fn(),
  healthService: {
    getHealthStatus: vi.fn(),
  },
}));

import { getHealthStatus } from '../../domain/health/services/health.service';

// Create a test app for health endpoint
const createTestApp = () => {
  const app = express();
  app.use(express.json());

  // Add health route
  app.get('/api/health', getHealth);

  return app;
};

describe('Health API Integration Tests', () => {
  const app = createTestApp();
  const fixedTimestamp = '2025-08-14T10:00:00.000Z';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/health', () => {
    it('should return health status with 200', async () => {
      // Arrange
      const mockHealthStatus = {
        status: 'healthy' as const,
        timestamp: fixedTimestamp,
        uptime: 3600, // 1 hour
        version: '1.1.0',
      };
      vi.mocked(getHealthStatus).mockReturnValue(mockHealthStatus);

      // Act
      const response = await request(app).get('/api/health');

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        status: 'healthy',
        timestamp: fixedTimestamp,
        uptime: 3600,
        version: '1.1.0',
      });
      expect(getHealthStatus).toHaveBeenCalledOnce();
    });

    it('should return health status with minimal uptime', async () => {
      // Arrange
      const mockHealthStatus = {
        status: 'healthy' as const,
        timestamp: fixedTimestamp,
        uptime: 0, // Just started
        version: '1.1.0',
      };
      vi.mocked(getHealthStatus).mockReturnValue(mockHealthStatus);

      // Act
      const response = await request(app).get('/api/health');

      // Assert
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('healthy');
      expect(response.body.uptime).toBe(0);
      expect(typeof response.body.timestamp).toBe('string');
      expect(typeof response.body.version).toBe('string');
    });

    it('should handle response correctly', async () => {
      // Arrange
      const mockHealthStatus = {
        status: 'healthy' as const,
        timestamp: fixedTimestamp,
        uptime: 1234,
        version: '1.0.0',
      };
      vi.mocked(getHealthStatus).mockReturnValue(mockHealthStatus);

      // Act
      const response = await request(app).get('/api/health');

      // Assert
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toMatch(/application\/json/);
      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('uptime');
      expect(response.body).toHaveProperty('version');
    });
  });
});
