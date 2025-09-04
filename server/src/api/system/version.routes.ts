import { Router } from 'express';
import { getVersion, getHealth } from './version.controller';

const router = Router();

/**
 * Version and health routes
 */
router.get('/version', getVersion);
router.get('/health', getHealth);

export default router;
