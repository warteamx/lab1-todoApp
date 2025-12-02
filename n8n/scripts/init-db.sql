-- ==============================================
-- n8n PostgreSQL Database Initialization
-- ==============================================

-- Create database if it doesn't exist (handled by Docker)
-- The database is already created by the POSTGRES_DB environment variable

-- Create extensions that n8n might use
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Set timezone
SET timezone = 'UTC';

-- Create indexes for better performance (n8n will create its own tables)
-- These will be applied after n8n creates its tables on first startup

-- Grant necessary permissions to the n8n user
-- (User is already created by Docker with full permissions)

-- Log successful initialization
INSERT INTO pg_stat_statements_info (dealloc) VALUES (0) ON CONFLICT DO NOTHING;
