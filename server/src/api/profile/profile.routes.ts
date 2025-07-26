import { Router } from 'express';
import { getProfile, updateProfile, uploadAvatar } from './profile.controller';

const router = Router();

// Get profile by user ID
router.get('/:userId', getProfile);

// Update profile (username, full name)
router.put('/profile', updateProfile);

// Upload avatar
router.post('/avatar', uploadAvatar);

export default router;
