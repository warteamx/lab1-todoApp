// import { V } from 'vitest/dist/chunks/reporters.d.BFLkQcL6';
import app from './app';
import { config } from './infrastructure/config';

const PORT = config.port || 3000;

app.listen(PORT, () => {
  console.log(`🧐 Server running on port ${PORT}`);
  console.log(`🧐 http://localhost:${PORT}/api-docs/`);
});
