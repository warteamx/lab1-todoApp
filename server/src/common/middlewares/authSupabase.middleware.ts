// Placeholder for Supabase authentication middleware
import { Response, NextFunction } from 'express';
import { Request, UserClaims } from '@/common/types/express';
import { createClient } from '@supabase/supabase-js';
const SUPABASE_URL =
  process.env.SUPABASE_URL || 'https://your-supabase-url.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || 'your-supabase-key';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // console.log(`👀 authMiddleware ${req.method} ${req.url}`);
  // console.log(`👀 authMiddleware auth`, req.headers);
  console.log('👀 authMiddleware req.body', req.body);
  const { data, error } = await supabase.auth.getClaims(
    req.headers.authorization || ''
  );
  if (error) {
    console.error(`👀 authMiddleware error ${error.message}`);
    return res.status(401).json({ error: 'Unauthorized' });
  } else if (!data || !data.claims) {
    console.error('👀 authMiddleware no claims found');
    return res.status(401).json({ error: 'Unauthorized' });
  }
  // console.log(`👀 authMiddleware user`, data);
  // Extract the actual claims object from Supabase response
  req.userClaims = data.claims as unknown as UserClaims;
  next();
}
