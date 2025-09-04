# 📦 Semantic Versioning (SemVer) Implementation

This document outlines the comprehensive semantic versioning implementation for the monorepo, including both automated and manual versioning workflows.

## 🎯 Overview

Our SemVer implementation includes:
- **Automated releases** via semantic-release and GitHub Actions
- **Manual version management** for controlled releases
- **Version injection** during build processes
- **Changelog generation** from git commits using gitmoji
- **Git hooks** for commit validation and pre-commit checks
- **Deployment scripts** with version awareness

## 🏗️ Architecture

### Packages Structure
```
├── package.json (v1.1.1) - Root development tools
├── client/package.json (v1.1.1) - Expo mobile app
└── server/package.json (v1.1.1) - Express backend
```

### Version Synchronization
All packages maintain synchronized versions automatically.

## 🤖 Automated Versioning

### Semantic Release Configuration
- **File**: `.releaserc.json`
- **Triggers**: Pushes to `main`, `develop`, `next` branches
- **Commit Analysis**: Conventional commits with gitmoji support
- **Outputs**: Version bumps, changelogs, git tags, GitHub releases

### Commit Format
```
[gitmoji] [type](scope): description

Examples:
✨ feat(auth): add user authentication
🐛 fix(api): resolve connection timeout
📝 docs(readme): update installation guide
```

### Release Rules
| Commit Type      | Version Bump | Example                      |
| ---------------- | ------------ | ---------------------------- |
| `feat`           | minor        | ✨ feat: add new feature      |
| `fix`            | patch        | � fix: resolve bug           |
| `perf`           | patch        | ⚡️ perf: improve performance  |
| Breaking changes | major        | ✨ feat!: breaking API change |

## 🛠️ Manual Versioning

### Manual Version Script
```bash
# Show help
npm run version:manual -- --help

# Bump versions with dry run
npm run version:manual -- patch --dry-run
npm run version:manual -- minor --dry-run
npm run version:manual -- major --dry-run

# Perform actual version bump
npm run version:manual -- patch
```

### Manual Process
1. Updates all package.json files
2. Generates changelogs
3. Builds version information
4. Creates git tag
5. Provides push instructions

## 📝 Changelog Generation

### Automatic Generation
Changelogs are generated from git commits using gitmoji mapping:

```bash
# Generate for all packages
npm run changelog:generate

# Generate for specific package
node scripts/generate-changelog.js --package=client
```

### Gitmoji Mapping
| Gitmoji | Type     | Description               |
| ------- | -------- | ------------------------- |
| ✨       | feat     | New features              |
| 🐛       | fix      | Bug fixes                 |
| �       | docs     | Documentation             |
| 🎨       | style    | Code structure/formatting |
| ♻️       | refactor | Code refactoring          |
| ⚡️       | perf     | Performance improvements  |

## 🔧 Build Process

### Version Injection
Version information is injected during build:

```bash
# Build version info for all packages
npm run build:version

# Build for specific package
npm run build:version:client
npm run build:version:server
```

### Environment Variables
#### Client (Expo)
```env
EXPO_PUBLIC_APP_VERSION=1.1.1
EXPO_PUBLIC_BUILD_NUMBER=42
EXPO_PUBLIC_BUILD_DATE=2025-09-04T11:10:50.642Z
EXPO_PUBLIC_COMMIT_HASH=8c03a63
EXPO_PUBLIC_BUILD_ENV=production
```

#### Server (Express)
```env
APP_VERSION=1.1.1
BUILD_NUMBER=42
BUILD_DATE=2025-09-04T11:10:50.642Z
COMMIT_HASH=8c03a63
BUILD_ENV=production
```

### Version Endpoints
The server automatically provides version endpoints:

```
GET /api/version  - Full version information
GET /api/health   - Health check with version
```

## 🚀 Deployment Integration

### Deployment Script
```bash
# Show deployment options
npm run deploy -- --help

# Deploy to environments
npm run deploy:staging
npm run deploy:production

# Deploy specific version
npm run deploy -- production --version=1.2.0
```

### GitHub Actions Workflow
**File**: `.github/workflows/release.yml`

**Triggers**:
- Push to main/develop/next branches
- Manual workflow dispatch with dry-run option

**Jobs**:
1. **Test Suite** - Runs tests for client and server
2. **Semantic Release** - Automated version bumping and tagging
3. **Build Client** - Builds Expo app with version injection
4. **Build Server** - Builds Express app with version injection
5. **Deploy** - Deployment to target environment

## 🔒 Git Hooks

### Pre-commit Hook
- Formats staged files with Prettier
- Lints staged files with ESLint
- Runs pre-commit tests

### Commit Message Hook
Validates commit messages follow the gitmoji + conventional commits format:
```
✨ feat(auth): add user authentication
```

## 📋 Available Scripts

### Root Level
```bash
npm run release          # Automated semantic release
npm run release:dry      # Dry run semantic release
npm run version:manual   # Manual version management
npm run changelog:generate # Generate changelogs
npm run build:version    # Build version info (all packages)
npm run deploy          # Deploy with version awareness
npm run test:pre-commit # Pre-commit test suite
```

### Client Package
```bash
npm run build:version   # Build client version info
npm run build:web      # Build web version with version injection
```

### Server Package
```bash
npm run build:version  # Build server version info and endpoints
npm run build         # Build TypeScript to dist/
```

## 🔄 Workflow Examples

### Automated Release (Recommended)
1. Make commits with proper gitmoji + conventional format
2. Push to main branch
3. GitHub Actions automatically:
   - Analyzes commits
   - Bumps versions
   - Generates changelogs
   - Creates git tags
   - Builds and deploys

### Manual Release
1. Run version bump: `npm run version:manual -- minor`
2. Review generated changes
3. Push with tags: `git push origin --tags`
4. Create GitHub release manually

### Emergency Hotfix
1. Create hotfix branch from main
2. Make fix with proper commit: `�️ fix: critical security patch`
3. Merge to main
4. Automated release triggers patch version

## 🔧 Configuration Files

| File                            | Purpose                           |
| ------------------------------- | --------------------------------- |
| `.releaserc.json`               | Semantic release configuration    |
| `.github/workflows/release.yml` | GitHub Actions workflow           |
| `.husky/pre-commit`             | Pre-commit git hook               |
| `.husky/commit-msg`             | Commit message validation         |
| `scripts/update-version.js`     | Version update automation         |
| `scripts/generate-changelog.js` | Changelog generation              |
| `scripts/manual-version.js`     | Manual version management         |
| `scripts/deploy.js`             | Deployment with version awareness |

## 🎛️ Environment Setup

### Required Dependencies
```bash
# Root level
npm install -D semantic-release @semantic-release/git @semantic-release/changelog @semantic-release/exec @semantic-release/github conventional-changelog-gitmoji husky lint-staged

# Client and Server
npm install -D @semantic-release/exec cross-env
```

### GitHub Secrets
Ensure `GITHUB_TOKEN` is available in repository secrets for automated releases.

## 📊 Version Information Access

### Client (React Native/Expo)
```typescript
import { VERSION_INFO, VERSION_STRING } from '@/constants/version';

console.log(VERSION_INFO.version);      // "1.1.1"
console.log(VERSION_STRING);            // "v1.1.1 (Build 42)"
```

### Server (Express)
```typescript
import { VERSION_INFO } from './api/system/version.controller';

console.log(VERSION_INFO.version);      // "1.1.1"
// Or via HTTP: GET /api/version
```

## 🚨 Troubleshooting

### Common Issues

1. **Semantic release not triggering**
   - Check commit message format
   - Verify GitHub token permissions
   - Review branch protection rules

2. **Version mismatch between packages**
   - Run `npm run version:update <version>` to sync
   - Check for manual edits to package.json files

3. **Build failures with version injection**
   - Verify environment variables are set
   - Check build scripts have proper permissions
   - Review build output for missing dependencies

### Debug Commands
```bash
# Test semantic release without publishing
npm run release:dry

# Test manual version bump without changes  
npm run version:manual -- patch --dry-run

# Test deployment without actual deploy
npm run deploy -- staging --skip-tests --skip-build
```

## 📚 Additional Resources

- [Semantic Versioning Specification](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Gitmoji Guide](https://gitmoji.dev/)
- [Semantic Release Documentation](https://semantic-release.gitbook.io/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
