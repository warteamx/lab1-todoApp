// Placeholder for Supabase authentication middleware
import { Response, NextFunction } from 'express';
import { Request, UserClaims } from '@/common/types/express';
import { createClient } from '@supabase/supabase-js';
import { logger } from '../utils/logger';
const SUPABASE_URL =
  process.env.SUPABASE_URL || 'https://your-supabase-url.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || 'your-supabase-key';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { data, error } = await supabase.auth.getClaims(
    req.headers.authorization || ''
  );
  if (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  } else if (!data || !data.claims) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  req.userClaims = data.claims as unknown as UserClaims;
  next();
}
