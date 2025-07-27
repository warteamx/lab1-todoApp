import { Profile } from '../entities/profile.entity';

export interface IProfileService {
  getProfile(user_id: string): Promise<Profile>;
  updateProfile(user_id: string, profile: Partial<Profile>): Promise<Profile>;
  uploadProfileAvatar(user_id: string, file: Express.Multer.File): Promise<string>;
}
