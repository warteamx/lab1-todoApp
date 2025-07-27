import { IProfileService } from '../interfaces/profile.interface';
import { UpdateProfileDto } from '../dto/updateProfile.dto';
import { updateProfile, uploadProfileAvatar, getProfile } from '../../../infrastructure/repositories/profile.repository';

export const profileService: IProfileService = {
  async getProfile(user_id: string) {
    return getProfile(user_id);
  },

  async updateProfile(user_id: string, profile: UpdateProfileDto) {
    return updateProfile(user_id, profile);
  },

  async uploadProfileAvatar(userId: string, file: Express.Multer.File) {
    return uploadProfileAvatar(userId, file);
  }
}


