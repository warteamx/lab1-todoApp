# 🔧 Scripts Directory

This directory contains automation scripts for version management, deployment, and build processes.

## Available Scripts

### Version Management
- **`update-version.js`** - Updates version across all packages
- **`manual-version.js`** - Manual version bumping with git tagging
- **`generate-changelog.js`** - Generates changelogs from git commits

### Build Scripts
- **`client/build-version.js`** - Client version injection and build
- **`server/build-version.js`** - Server version injection and build

### Deployment
- **`deploy.js`** - Version-aware deployment script

## Usage Examples

```bash
# Manual version bump
npm run version:manual -- patch --dry-run
npm run version:manual -- minor

# Generate changelogs
npm run changelog:generate

# Build version info
npm run build:version

# Deploy with version awareness
npm run deploy:staging
npm run deploy:production --version=1.2.0
```

## Dependencies

All scripts require Node.js and depend on:
- Git (for commit history and tagging)
- npm (for package.json manipulation)
- Workspace structure (monorepo with client/server packages)

## Configuration

Scripts are configured through:
- Package.json scripts section
- Environment variables
- Git repository state
- `.releaserc.json` for semantic-release integration
