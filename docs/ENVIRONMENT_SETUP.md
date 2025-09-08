# 🔧 Environment Variable Management

This document provides comprehensive guidance on managing environment variables for the Todo App project and when using it as a GitHub template.

## 📋 Environment Variables Overview

The project uses environment variables for configuration across different environments (development, staging, production) and deployment platforms.

### Architecture

```
├── client/
│   ├── .env.example        # Client environment template
│   └── .env.local          # Client local development (create from example)
├── server/
│   ├── .env.example        # Server environment template
│   └── .env                # Server local development (create from example)
└── .github/workflows/      # GitHub Actions (uses GitHub Secrets)
```

## 🎯 Required Environment Variables

### Client Environment Variables

All client environment variables must be prefixed with `EXPO_PUBLIC_` to be accessible in the Expo/React Native application.

#### **client/.env.local**

```bash
# API Configuration
EXPO_PUBLIC_API_URL=http://localhost:3000

# Supabase Configuration (for authentication and database)
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Build Information (automatically injected during CI/CD)
EXPO_PUBLIC_APP_VERSION=1.0.0
EXPO_PUBLIC_BUILD_NUMBER=1
EXPO_PUBLIC_BUILD_DATE=2025-01-01T00:00:00.000Z
EXPO_PUBLIC_COMMIT_HASH=unknown
EXPO_PUBLIC_BUILD_ENV=development
```

### Server Environment Variables

#### **server/.env**

```bash
# Server Configuration
NODE_ENV=development
PORT=3000

# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_service_role_key
SUPABASE_DB_URL=your_supabase_database_direct_url

# CORS Configuration (comma-separated origins for production)
ALLOWED_ORIGINS=http://localhost:8081,http://localhost:19006

# Build Information (automatically injected during CI/CD)
APP_VERSION=1.0.0
BUILD_NUMBER=1
BUILD_DATE=2025-01-01T00:00:00.000Z
COMMIT_HASH=unknown
BUILD_ENV=development
```

## 🚀 Environment Setup

### For Development

1. **Create environment files from examples:**

   ```bash
   ./scripts/setup-environment.sh
   ```

2. **Configure Supabase (if using):**
   - Go to [Supabase Dashboard](https://supabase.com/dashboard)
   - Create a new project or select existing
   - Go to Settings > API to get:
     - Project URL
     - Anon key (for client)
     - Service role key (for server)
   - Go to Settings > Database to get:
     - Direct database URL

3. **Update environment files:**

   ```bash
   # Edit client environment
   nano client/.env.local

   # Edit server environment
   nano server/.env
   ```

### For Production/GitHub Template

1. **Set up GitHub Secrets:**

   ```bash
   ./scripts/setup-github-secrets-template.sh
   ```

2. **Configure deployment-specific secrets:**
   - `AWS_ACCESS_KEY_ID` - AWS access key
   - `AWS_SECRET_ACCESS_KEY` - AWS secret key
   - `AWS_REGION` - Deployment region
   - `S3_BUCKET` - Client deployment bucket
   - `EC2_*` variables - Server deployment (if using EC2)
   - `SUPABASE_*` variables - Database configuration

## 📚 Environment Variable Reference

### Build-time Variables

These are automatically injected during CI/CD builds:

| Variable       | Description       | Source                      |
| -------------- | ----------------- | --------------------------- |
| `APP_VERSION`  | Semantic version  | package.json + git tags     |
| `BUILD_NUMBER` | CI build number   | GitHub Actions run number   |
| `BUILD_DATE`   | Build timestamp   | CI/CD pipeline              |
| `COMMIT_HASH`  | Git commit hash   | Git repository              |
| `BUILD_ENV`    | Build environment | NODE_ENV or manual override |

### Runtime Variables

#### Client (EXPO*PUBLIC*\*)

| Variable                        | Required | Description            | Example                   |
| ------------------------------- | -------- | ---------------------- | ------------------------- |
| `EXPO_PUBLIC_API_URL`           | Yes      | Backend API endpoint   | `http://localhost:3000`   |
| `EXPO_PUBLIC_SUPABASE_URL`      | Optional | Supabase project URL   | `https://xyz.supabase.co` |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY` | Optional | Supabase anonymous key | `eyJ...`                  |

#### Server

| Variable          | Required | Description               | Example                                   |
| ----------------- | -------- | ------------------------- | ----------------------------------------- |
| `NODE_ENV`        | Yes      | Runtime environment       | `development`, `production`               |
| `PORT`            | Yes      | Server port               | `3000`                                    |
| `SUPABASE_URL`    | Optional | Supabase project URL      | `https://xyz.supabase.co`                 |
| `SUPABASE_KEY`    | Optional | Supabase service role key | `eyJ...`                                  |
| `SUPABASE_DB_URL` | Optional | Direct database URL       | `postgresql://...`                        |
| `ALLOWED_ORIGINS` | Optional | CORS allowed origins      | `http://localhost:8081,https://myapp.com` |

## 🔒 Security Best Practices

### Secret Management

1. **Never commit secrets to Git:**

   ```bash
   # .env files are in .gitignore
   # Use .env.example for templates
   ```

2. **Use GitHub Secrets for CI/CD:**

   ```bash
   # Set secrets via GitHub CLI
   gh secret set SECRET_NAME --body "secret_value"
   ```

3. **Separate development and production secrets:**
   - Development: Local .env files
   - Production: GitHub Secrets + Cloud provider secrets

### Environment Separation

```bash
# Development
NODE_ENV=development
EXPO_PUBLIC_API_URL=http://localhost:3000

# Production
NODE_ENV=production
EXPO_PUBLIC_API_URL=https://api.myapp.com
```

## 🛠️ Troubleshooting

### Common Issues

1. **Environment variables not loading:**

   ```bash
   # Check file names (case-sensitive)
   ls -la client/.env*
   ls -la server/.env*

   # Verify EXPO_PUBLIC_ prefix for client variables
   grep EXPO_PUBLIC_ client/.env.local
   ```

2. **Build-time variables not updating:**

   ```bash
   # Rebuild version info
   npm run build:version
   ```

3. **CORS errors in production:**
   ```bash
   # Check ALLOWED_ORIGINS includes your frontend domain
   echo $ALLOWED_ORIGINS
   ```

### Validation Scripts

```bash
# Check environment setup
./scripts/setup-environment.sh

# Validate Supabase configuration
./scripts/setup-supabase-secrets.sh --validate
```

## 📖 Related Documentation

- [Client Installation Guide](../client/docs/INSTALLATION.md)
- [Server Documentation](../server/docs/README.md)
- [GitHub Actions Workflows](../.github/workflows/)
- [Deployment Guide](./DEPLOYMENT.md)

## 🔄 Migration from Legacy Setup

If migrating from an older version:

1. **Remove hardcoded scripts:**

   ```bash
   rm scripts/setup-github-secrets.sh
   rm scripts/auto-github-secrets.sh
   rm scripts/manual-github-secrets.sh
   ```

2. **Use new template scripts:**

   ```bash
   ./scripts/setup-environment.sh
   ./scripts/setup-github-secrets-template.sh
   ```

3. **Update environment files:**
   - Remove unused variables
   - Add missing required variables
   - Update variable names to match new conventions
