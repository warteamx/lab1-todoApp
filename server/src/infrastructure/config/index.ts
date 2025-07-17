export const config = {
  port: process.env.PORT ? Number(process.env.PORT) : 3000,
  supabaseDB: process.env.SUPABASE_DB_URL,
  // db: {
  //   user: process.env.DB_USER || 'postgres',
  //   host: process.env.DB_HOST || 'localhost',
  //   database: process.env.DB_NAME || 'postgress',
  //   password: process.env.DB_PASSWORD || 'password',
  //   port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  // },
};
