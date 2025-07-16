import { V } from 'vitest/dist/chunks/reporters.d.BFLkQcL6';
import app from './app';
import { config } from './infrastructure/config';
import 'dotenv/config'

const PORT = config.port || 3000;
const DB = config.db 
const ENV = JSON.stringify(process.env)

app.listen(PORT, () => {
  console.log(`🧐 Server running on port ${PORT} ENV=${ENV}`);
  console.log(`🧐 ENV=${ENV}`);
});
