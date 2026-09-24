import type { Sql } from 'postgres';
import { config } from '../infrastructure/config';
import logger from '../common/utils/logger';

async function runKeepAlive(): Promise<void> {
  let sql: Sql | null = null;

  try {
    if (!config.supabaseDB) {
      throw new Error('SUPABASE_DB_URL is not configured');
    }

    const dbModule = await import('../infrastructure/database/postgres');
    sql = dbModule.default as Sql;

    const keepAliveActions = ['SELECT 1', 'SELECT NOW()'];

    for (const action of keepAliveActions) {
      await sql.unsafe(action);
    }

    // Use warn level so production logger configuration always records the heartbeat.
    logger.warn('Supabase keep-alive succeeded', {
      queries: keepAliveActions,
      queryCount: keepAliveActions.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Supabase keep-alive failed', {
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
    });
    process.exitCode = 1;
  } finally {
    if (sql) {
      try {
        await sql.end({ timeout: 5 });
      } catch (closeError) {
        logger.error(
          'Supabase keep-alive failed to close database connection',
          {
            error:
              closeError instanceof Error
                ? closeError.message
                : String(closeError),
            timestamp: new Date().toISOString(),
          }
        );
        process.exitCode = 1;
      }
    }

    process.exit(process.exitCode ?? 0);
  }
}

runKeepAlive();
