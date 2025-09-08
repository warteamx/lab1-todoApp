# 🔧 Scripts Directory

This directory contains automation scripts for version management, deployment, and build processes.

## Available Scripts

### Version Management

- **`update-version.js`** - Updates version across all packages in sync

### Build Scripts

- **`client/build-version.js`** - Client version injection and build info
- **`server/build-version.js`** - Server version injection and build info

### Deployment

- **`deploy.js`** - Version-aware deployment script

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

## Dependencies

All scripts require Node.js and depend on:

- Git (for commit history and version info)
- npm (for package.json manipulation)
- Workspace structure (monorepo with client/server packages)

## Configuration

Scripts are configured through:

- Package.json scripts section
- Environment variables
- Git repository state
- `.releaserc.json` for semantic-release integration

## Migration Notes

**Removed Scripts** (simplified approach):

- ~~`generate-changelog.js`~~ → Now handled by semantic-release
- ~~`manual-version.js`~~ → Use semantic-release for consistency

See `docs/SEMANTIC_VERSIONING.md` for complete documentation.
