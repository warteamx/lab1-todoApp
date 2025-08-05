import { Request, Response, NextFunction } from 'express';
import { profileService } from '../../domain/profile/services/profile.service';
import { UpdateProfileDto } from '../../domain/profile/dto/updateProfile.dto';
import { UnauthorizedException, ForbiddenException, ValidationException } from '../../common/exceptions';
import { asyncHandler } from '../../common/utils/asyncHandler';

export const getProfile = asyncHandler(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  if (!req.userClaims || !req.userClaims.sub) {
    throw new UnauthorizedException();
  }

  // Users can only fetch their own profile for now
  if (userId !== req.userClaims.sub) {
    throw new ForbiddenException();
  }

  const profile = await profileService.getProfile(userId);
  res.json(profile);
});

export const updateProfile = asyncHandler(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const dto: UpdateProfileDto = req.body;
  // TODO: Validate DTO
  if (!req.userClaims || !req.userClaims.sub) {
    throw new UnauthorizedException();
  }
  const updated = await profileService.updateProfile(req.userClaims.sub, dto);
  res.json(updated);
});

export const uploadAvatar = asyncHandler(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // TODO: Handle file upload, validate file
  if (!req.userClaims || !req.userClaims.sub) {
    throw new UnauthorizedException();
  }
  if (!req.file) {
    throw new ValidationException('No file uploaded');
  }
  const url = await profileService.uploadProfileAvatar(
    req.userClaims.sub,
    req.file
  );
  res.json({ avatar_url: url });
});
