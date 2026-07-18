## Plan: Supabase Keep-Alive Cron on EC2

Implement a minimal DB keep-alive workflow that reuses the existing Postgres singleton and logger, adds an npm entrypoint for the compiled script, and schedules host cron to run inside the live Docker container every 3 days at a fixed UTC time. This satisfies issue #41 with low operational risk and no credential hardcoding.

**Steps**
1. Phase 1: Add keep-alive runtime script (blocks later steps)
2. Create a new TypeScript keep-alive script under server/src/scripts that imports the existing SQL client from the infrastructure database layer, executes a minimal SELECT 1 query, logs timestamped success/failure through the shared logger, and exits with non-zero code on failure.
3. Ensure the script closes DB resources on completion so one-shot cron runs do not leave hanging connections. Keep behavior idempotent and side-effect free.
4. Phase 2: Wire build/run command (depends on 1)
5. Add a server package script (db:keepalive) that runs the compiled artifact from dist after build, consistent with current production runtime conventions.
6. Verify TypeScript compilation includes the new script in dist without changing existing build pipeline expectations.
7. Phase 3: Deployment and cron setup (depends on 2)
8. Deploy updated backend image/container to EC2 and restart the server service so new dist script is available in the running container.
9. Identify active production container/service name from Docker Compose context and install a host crontab entry that executes docker compose exec server npm run db:keepalive every 3 days at fixed UTC time.
10. Redirect cron stdout/stderr to the existing mounted logs path so output lands in operational logs used by deployment.
11. Phase 4: Validation and documentation (depends on 3)
12. Run one manual keep-alive execution in container and confirm successful SELECT 1 log event with timestamp.
13. Validate failure path by checking non-zero exit behavior in command result expectations (without forcing destructive DB changes).
14. Confirm cron registration and scheduler history (crontab listing + system cron log evidence) for traceability.
15. Update issue evidence/documentation with final cron line, manual run result, and log proof.
16. Version bump step from issue note: apply project’s existing versioning workflow after implementation and before final merge.

**Relevant files**
- /Users/wartin/Github/warteamx/lab1-todoApp/server/src/infrastructure/database/postgres.ts — reuse SQL connection singleton pattern.
- /Users/wartin/Github/warteamx/lab1-todoApp/server/src/infrastructure/config/index.ts — confirms SUPABASE_DB_URL source.
- /Users/wartin/Github/warteamx/lab1-todoApp/server/src/common/utils/logger.ts — reuse shared timestamped logging pipeline.
- /Users/wartin/Github/warteamx/lab1-todoApp/server/package.json — add db:keepalive npm script.
- /Users/wartin/Github/warteamx/lab1-todoApp/server/tsconfig.json — verify dist output alignment.
- /Users/wartin/Github/warteamx/lab1-todoApp/server/docker-compose.yml — confirm service name and mounted logs path for cron redirection.
- /Users/wartin/Github/warteamx/lab1-todoApp/server/Dockerfile — confirm runtime command context for compiled script execution.

**Verification**
1. Build check: run server build and verify compiled keep-alive artifact exists in dist under expected path.
2. Manual run check: execute keep-alive once inside running container via npm run db:keepalive and confirm success output in application logs.
3. Log check: verify timestamped success/failure entry appears in the existing combined logging stream.
4. Cron registration check: confirm crontab entry installed on EC2 host with expected schedule and command.
5. Scheduler evidence check: confirm cron daemon history/log entries show execution at scheduled time.
6. End-to-end check: after scheduled run window, confirm keep-alive execution log exists without impacting API health endpoint behavior.

**Decisions**
- Schedule: fixed cron time every 3 days in UTC (per user choice).
- Logging target: reuse existing app logger and combined log stream (per user choice).
- Query scope: minimal SELECT 1 only; no additional DB workload.
- Execution context: run inside existing Docker container from host cron to avoid host/runtime drift.

**Further Considerations**
1. Cron expression/time choice recommendation: use a low-traffic UTC slot (for example 03:17 UTC every 3rd day) to simplify audit and avoid peak windows.
2. Operational hardening option: add lightweight alerting hook for repeated keep-alive failures (not required for issue acceptance, but useful in production).
3. Documentation location recommendation: store final cron/verification evidence in deployment docs or issue comment for future on-call visibility.
