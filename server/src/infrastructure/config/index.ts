export const config = {
  port: process.env.PORT ? Number(process.env.PORT) : 3000,
  supabaseDB: process.env.SUPABASE_DB_URL,
  supabaseKey: process.env.SUPABASE_KEY,
  supabaseURL:
    process.env.SUPABASE_URL || 'https://your-supabase-url.supabase.co',
};
