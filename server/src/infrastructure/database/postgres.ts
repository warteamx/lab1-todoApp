// import { Pool } from 'pg';
// import { config } from '../config';

// export const pool = new Pool(config.db);
import 'dotenv/config'

import postgres from 'postgres'

const connectionString = process.env.SUPABASE_DATABASE_URL || 'postgresql://postgres:GlVHx6Ca0Ss0ae8A@db.wwcrjqqaapcasamfplfa.supabase.co:5432/postgres'
console.log('👀 conection string', connectionString)

const sql = postgres(connectionString, {
    onnotice: (notice) => {
        console.log(` 📥 notice postgress:`, notice)
    },
})

export default sql