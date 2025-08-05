import { describe, it, expect, vi, beforeEach } from 'vitest';
import { profileService } from '../../domain/profile/services/profile.service';
import {
  createMockProfile,
  createMockUpdateProfileDto,
  createMockFile
} from '../utils/test-helpers';

// Mock the repository layer
vi.mock('../../infrastructure/repositories/profile.repository', () => ({
  getProfile: vi.fn(),
  updateProfile: vi.fn(),
  uploadProfileAvatar: vi.fn(),
}));

import * as profileRepository from '../../infrastructure/repositories/profile.repository';

describe('ProfileService', () => {
  const mockUserId = 'user-123';
  const mockProfile = createMockProfile({ id: mockUserId });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getProfile', () => {
    it('should return user profile', async () => {
      // Arrange
      vi.mocked(profileRepository.getProfile).mockResolvedValue(mockProfile);

      // Act
      const result = await profileService.getProfile(mockUserId);

      // Assert
      expect(result).toEqual(mockProfile);
      expect(profileRepository.getProfile).toHaveBeenCalledWith(mockUserId);
      expect(profileRepository.getProfile).toHaveBeenCalledTimes(1);
    });

    it('should handle empty profile data', async () => {
      // Arrange
      const emptyProfile = createMockProfile({
        id: undefined,
        username: undefined,
        full_name: undefined
      });
      vi.mocked(profileRepository.getProfile).mockResolvedValue(emptyProfile);

      // Act
      const result = await profileService.getProfile(mockUserId);

      // Assert
      expect(result).toEqual(emptyProfile);
      expect(profileRepository.getProfile).toHaveBeenCalledWith(mockUserId);
    });

    it('should propagate repository errors', async () => {
      // Arrange
      const errorMessage = 'Database connection failed';
      vi.mocked(profileRepository.getProfile).mockRejectedValue(
        new Error(errorMessage)
      );

      // Act & Assert
      await expect(profileService.getProfile(mockUserId)).rejects.toThrow(
        errorMessage
      );
      expect(profileRepository.getProfile).toHaveBeenCalledWith(mockUserId);
    });
  });

  describe('updateProfile', () => {
    it('should update user profile with all fields', async () => {
      // Arrange
      const updateData = createMockUpdateProfileDto({
        username: 'newusername',
        full_name: 'New User Name',
        website: 'https://newwebsite.com',
      });
      const updatedProfile = createMockProfile({
        ...mockProfile,
        ...updateData,
      });
      vi.mocked(profileRepository.updateProfile).mockResolvedValue(updatedProfile);

      // Act
      const result = await profileService.updateProfile(mockUserId, updateData);

      // Assert
      expect(result).toEqual(updatedProfile);
      expect(profileRepository.updateProfile).toHaveBeenCalledWith(
        mockUserId,
        updateData
      );
      expect(profileRepository.updateProfile).toHaveBeenCalledTimes(1);
    });

    it('should update profile with partial data', async () => {
      // Arrange
      const partialUpdate = createMockUpdateProfileDto({
        full_name: 'Updated Name Only',
        username: undefined,
        website: undefined,
      });
      const updatedProfile = createMockProfile({
        ...mockProfile,
        full_name: 'Updated Name Only',
      });
      vi.mocked(profileRepository.updateProfile).mockResolvedValue(updatedProfile);

      // Act
      const result = await profileService.updateProfile(mockUserId, partialUpdate);

      // Assert
      expect(result).toEqual(updatedProfile);
      expect(profileRepository.updateProfile).toHaveBeenCalledWith(
        mockUserId,
        partialUpdate
      );
    });

    it('should handle empty update data', async () => {
      // Arrange
      const emptyUpdate = createMockUpdateProfileDto({
        username: undefined,
        full_name: undefined,
        website: undefined,
        avatar_url: undefined,
      });
      vi.mocked(profileRepository.updateProfile).mockResolvedValue(mockProfile);

      // Act
      const result = await profileService.updateProfile(mockUserId, emptyUpdate);

      // Assert
      expect(result).toEqual(mockProfile);
      expect(profileRepository.updateProfile).toHaveBeenCalledWith(
        mockUserId,
        emptyUpdate
      );
    });

    it('should propagate repository errors', async () => {
      // Arrange
      const updateData = createMockUpdateProfileDto({ username: 'newuser' });
      const errorMessage = 'Username already exists';
      vi.mocked(profileRepository.updateProfile).mockRejectedValue(
        new Error(errorMessage)
      );

      // Act & Assert
      await expect(
        profileService.updateProfile(mockUserId, updateData)
      ).rejects.toThrow(errorMessage);
      expect(profileRepository.updateProfile).toHaveBeenCalledWith(
        mockUserId,
        updateData
      );
    });
  });

  describe('uploadProfileAvatar', () => {
    it('should upload avatar file and return URL', async () => {
      // Arrange
      const mockFile = createMockFile({
        originalname: 'profile.jpg',
        mimetype: 'image/jpeg',
      });
      const expectedUrl = 'https://storage.example.com/avatars/user-123.jpg';
      vi.mocked(profileRepository.uploadProfileAvatar).mockResolvedValue(expectedUrl);

      // Act
      const result = await profileService.uploadProfileAvatar(mockUserId, mockFile);

      // Assert
      expect(result).toBe(expectedUrl);
      expect(profileRepository.uploadProfileAvatar).toHaveBeenCalledWith(
        mockUserId,
        mockFile
      );
      expect(profileRepository.uploadProfileAvatar).toHaveBeenCalledTimes(1);
    });

    it('should handle different file types', async () => {
      // Arrange
      const pngFile = createMockFile({
        originalname: 'profile.png',
        mimetype: 'image/png',
        size: 2048,
      });
      const expectedUrl = 'https://storage.example.com/avatars/user-123.png';
      vi.mocked(profileRepository.uploadProfileAvatar).mockResolvedValue(expectedUrl);

      // Act
      const result = await profileService.uploadProfileAvatar(mockUserId, pngFile);

      // Assert
      expect(result).toBe(expectedUrl);
      expect(profileRepository.uploadProfileAvatar).toHaveBeenCalledWith(
        mockUserId,
        pngFile
      );
    });

    it('should propagate upload errors', async () => {
      // Arrange
      const mockFile = createMockFile();
      const errorMessage = 'File upload failed';
      vi.mocked(profileRepository.uploadProfileAvatar).mockRejectedValue(
        new Error(errorMessage)
      );

      // Act & Assert
      await expect(
        profileService.uploadProfileAvatar(mockUserId, mockFile)
      ).rejects.toThrow(errorMessage);
      expect(profileRepository.uploadProfileAvatar).toHaveBeenCalledWith(
        mockUserId,
        mockFile
      );
    });
  });
});
