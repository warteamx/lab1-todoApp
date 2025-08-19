const postgres = require('postgres');
import { config } from '../config';

const connectionString = config.supabaseDB!;

const sql = postgres(connectionString, {
  onnotice: (notice: any) => {
    console.log(' 📥 notice postgres:', notice);
  },
});

export default sql;
