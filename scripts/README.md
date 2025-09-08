# 🔧 Scripts Directory

This directory contains automation scripts for version management, deployment, and environment setup.

## Available Scripts

### Environment Setup

- **`setup-environment.sh`** - Creates .env files from examples and provides setup guidance
- **`setup-github-secrets-template.sh`** - Interactive template for configuring GitHub secrets
- **`setup-supabase-secrets.sh`** - Configures Supabase secrets from server/.env file

### Version Management

- **`update-version.js`** - Updates version across all packages in sync

### Build Scripts

- **`client/build-version.js`** - Client version injection and build info
- **`server/build-version.js`** - Server version injection and build info

### Deployment

- **`deploy.js`** - Version-aware deployment script

## Quick Start

### 1. Environment Setup

```bash
# Set up development environment files
./scripts/setup-environment.sh

# Configure your .env files with actual credentials
# Edit client/.env.local and server/.env
```

### 2. GitHub Template Setup

For repositories created from this template:

```bash
# Set up GitHub secrets for deployment
./scripts/setup-github-secrets-template.sh

# Set up Supabase secrets specifically
./scripts/setup-supabase-secrets.sh
```

## Semantic Versioning Process

**Automated Process** (Recommended):

- Use semantic-release for automatic version management
- Triggered by commits to main branch following gitmoji + conventional format
- Automatically updates all packages, generates changelog, creates tags

**Manual Process** (Emergency only):

```bash
# Update versions manually
npm run version:update 1.2.3

# Build version info
npm run build:version
```

## Usage Examples

```bash
# Build version information
npm run build:version

# Manual version update (emergency)
npm run version:update 1.2.3

# Deploy with version awareness
npm run deploy:staging
npm run deploy:production
```

## GitHub Template Notes

When using this repository as a GitHub template:

1. **Remove hardcoded values**: The environment-specific scripts have been removed
2. **Use template scripts**: Use the provided template scripts for initial setup
3. **Customize for your needs**: Modify the template scripts according to your deployment requirements

## Dependencies

All scripts require Node.js and depend on:

- Git (for commit history and version info)
- npm (for package.json manipulation)
- Workspace structure (monorepo with client/server packages)
- GitHub CLI (for secrets management scripts)

## Configuration

Scripts are configured through:

- Package.json scripts section
- Environment variables
- Git repository state
- `.releaserc.json` for semantic-release integration

## Migration Notes

**Removed Scripts** (template-friendly approach):

- ~~`setup-github-secrets.sh`~~ → Use `setup-github-secrets-template.sh`
- ~~`auto-github-secrets.sh`~~ → Use `setup-github-secrets-template.sh`
- ~~`manual-github-secrets.sh`~~ → Use `setup-github-secrets-template.sh`

See `docs/SEMANTIC_VERSIONING.md` for complete documentation.
