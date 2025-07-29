// import { V } from 'vitest/dist/chunks/reporters.d.BFLkQcL6';
import app from './app';
import { config } from './infrastructure/config';
import { logger } from './common/utils/logger';

const PORT = config.port || 3000;

app.listen(PORT, () => {
  logger.info(`🧐 Server running on port ${PORT}`);
  logger.info(`🧐 http://localhost:${PORT}/api-docs/`);
});
