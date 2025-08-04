import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { getProfile, updateProfile } from '../../api/profile/profile.controller';
import { createTestApp, createMockProfile, createMockUpdateProfileDto } from '../utils/test-helpers';
import { profileService } from '../../domain/profile/services/profile.service';

// Mock the profile service
vi.mock('../../domain/profile/services/profile.service', () => ({
  profileService: {
    getProfile: vi.fn(),
    updateProfile: vi.fn(),
    uploadProfileAvatar: vi.fn(),
  },
}));

describe('Profile API Integration Tests', () => {
  const mockUserId = 'test-user-123';
  const mockProfile = createMockProfile({ id: mockUserId });

  // Create test app with profile routes
  const app = createTestApp((app) => {
    app.get('/api/profile/:userId', getProfile);
    app.put('/api/profile/profile', updateProfile);
  }, mockUserId);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/profile/:userId', () => {
    it('should return user profile successfully', async () => {
      // Arrange
      vi.mocked(profileService.getProfile).mockResolvedValue(mockProfile);

      // Act
      const response = await request(app).get(`/api/profile/${mockUserId}`);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockProfile);
      expect(profileService.getProfile).toHaveBeenCalledWith(mockUserId);
    });

    it('should handle profile not found', async () => {
      // Arrange
      vi.mocked(profileService.getProfile).mockRejectedValue(
        new Error('Profile not found')
      );

      // Act
      const response = await request(app).get(`/api/profile/${mockUserId}`);

      // Assert
      expect(response.status).toBe(500);
      expect(profileService.getProfile).toHaveBeenCalledWith(mockUserId);
    });

    it('should return 403 when trying to access other user profile', async () => {
      // Arrange
      const otherUserId = 'other-user-456';

      // Act
      const response = await request(app).get(`/api/profile/${otherUserId}`);

      // Assert
      expect(response.status).toBe(403);
      expect(response.body.error).toBe('Forbidden');
    });
  });

  describe('PUT /api/profile/profile', () => {
    it('should update profile successfully', async () => {
      // Arrange
      const updateData = createMockUpdateProfileDto({
        full_name: 'Updated Name',
        website: 'https://updated.com',
      });
      const updatedProfile = createMockProfile({
        ...mockProfile,
        ...updateData,
      });
      vi.mocked(profileService.updateProfile).mockResolvedValue(updatedProfile);

      // Act
      const response = await request(app)
        .put('/api/profile/profile')
        .send(updateData);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toEqual(updatedProfile);
      expect(profileService.updateProfile).toHaveBeenCalledWith(
        mockUserId,
        updateData
      );
    });

    it('should handle partial profile updates', async () => {
      // Arrange
      const partialUpdate = { full_name: 'Only Name Updated' };
      const updatedProfile = createMockProfile({
        ...mockProfile,
        full_name: 'Only Name Updated',
      });
      vi.mocked(profileService.updateProfile).mockResolvedValue(updatedProfile);

      // Act
      const response = await request(app)
        .put('/api/profile/profile')
        .send(partialUpdate);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toEqual(updatedProfile);
      expect(profileService.updateProfile).toHaveBeenCalledWith(
        mockUserId,
        partialUpdate
      );
    });

    it('should handle update errors', async () => {
      // Arrange
      const updateData = createMockUpdateProfileDto();
      vi.mocked(profileService.updateProfile).mockRejectedValue(
        new Error('Update failed')
      );

      // Act
      const response = await request(app)
        .put('/api/profile/profile')
        .send(updateData);

      // Assert
      expect(response.status).toBe(500);
      expect(profileService.updateProfile).toHaveBeenCalledWith(
        mockUserId,
        updateData
      );
    });
  });
});
