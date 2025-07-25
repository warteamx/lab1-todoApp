import { Request, Response, NextFunction } from 'express';
import { profileService } from '../../domain/profile/services/profile.service';
import { UpdateProfileDto } from '../../domain/profile/dto/updateProfile.dto';

export async function updateProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const dto: UpdateProfileDto = req.body;
    // TODO: Validate DTO
    if (!req.userClaims || !req.userClaims.sub) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const updated = await profileService.updateProfile(req.userClaims.sub, dto);
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function uploadAvatar(req: Request, res: Response, next: NextFunction) {
  try {
    // TODO: Handle file upload, validate file
    if (!req.userClaims || !req.userClaims.sub) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const url = await profileService.uploadProfileAvatar(req.userClaims.sub, req.file);
    res.json({ avatar_url: url });
  } catch (err) {
    next(err);
  }
}
