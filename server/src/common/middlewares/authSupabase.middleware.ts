// Placeholder for Supabase authentication middleware
import { Request, Response, NextFunction } from 'express';
import { createClient } from '@supabase/supabase-js';
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://your-supabase-url.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || 'your-supabase-key';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log(`👀 authMiddleware ${req.method} ${req.url}`);
  console.log(`👀 authMiddleware auth ${req.headers.authorization}`);
  const {data, error} = await supabase.auth.getClaims(req.headers.authorization || '');
  if (error) {
    console.error(`👀 authMiddleware error ${error.message}`);
    return res.status(401).json({ error: 'Unauthorized' });
  }
    console.log(`👀 authMiddleware user`, data);
  next();
}