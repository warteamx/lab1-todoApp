#!/usr/bin/env bash
set -euo pipefail

# Install/update a host cron entry that runs DB keep-alive inside the running server container.
# Default schedule is every 3 days at 03:17 UTC.

SERVER_DIR="${1:-$HOME/app/server}"
CRON_SCHEDULE="${CRON_SCHEDULE:-17 3 */3 * *}"
MARKER_BEGIN="# BEGIN SUPABASE_KEEPALIVE_CRON"
MARKER_END="# END SUPABASE_KEEPALIVE_CRON"
LOG_FILE="$SERVER_DIR/logs/combined.log"
CRON_COMMAND="$CRON_SCHEDULE cd $SERVER_DIR && docker compose exec -T server npm run db:keepalive >> $LOG_FILE 2>&1"

if [[ ! -d "$SERVER_DIR" ]]; then
  echo "Error: server directory not found: $SERVER_DIR" >&2
  exit 1
fi

TMP_FILE="$(mktemp)"
trap 'rm -f "$TMP_FILE"' EXIT

if crontab -l >/dev/null 2>&1; then
  crontab -l | awk -v begin="$MARKER_BEGIN" -v end="$MARKER_END" '
    $0 == begin { skip=1; next }
    $0 == end { skip=0; next }
    skip != 1 { print }
  ' > "$TMP_FILE"
fi

{
  cat "$TMP_FILE"
  echo "$MARKER_BEGIN"
  echo "CRON_TZ=UTC"
  echo "$CRON_COMMAND"
  echo "$MARKER_END"
} | crontab -

echo "Installed Supabase keep-alive cron entry:"
crontab -l | awk -v begin="$MARKER_BEGIN" -v end="$MARKER_END" '
  $0 == begin { show=1 }
  show == 1 { print }
  $0 == end { show=0 }
'
