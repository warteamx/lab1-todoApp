import { Router } from 'express';
import { updateProfile, uploadAvatar } from './profile.controller';

const router = Router();

// Update profile (username, full name)
router.put('/profile', updateProfile);

// Upload avatar
router.post('/avatar', uploadAvatar);

export default router;
