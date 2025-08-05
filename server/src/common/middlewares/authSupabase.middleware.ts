// Placeholder for Supabase authentication middleware
import { Response, NextFunction } from 'express';
import { Request, UserClaims } from '@/common/types/express';
import { createClient } from '@supabase/supabase-js';
import { logger } from '../utils/logger';
import { UnauthorizedException } from '../exceptions';
import { asyncHandler } from '../utils/asyncHandler';
const SUPABASE_URL =
  process.env.SUPABASE_URL || 'https://your-supabase-url.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || 'your-supabase-key';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export const authMiddleware = asyncHandler(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { data, error } = await supabase.auth.getClaims(
    req.headers.authorization || ''
  );
  if (error) {
    throw new UnauthorizedException();
  } else if (!data || !data.claims) {
    throw new UnauthorizedException();
  }
  req.userClaims = data.claims as unknown as UserClaims;
  next();
});
