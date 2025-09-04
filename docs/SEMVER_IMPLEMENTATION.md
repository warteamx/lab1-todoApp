# 🏷️ Semantic Versioning (SemVer) Implementation

**Date**: September 4, 2025  
**Branch**: `24-improve-template-docs`  
**Implemented for**: CD/CI automation with GitHub Actions  

## 🎯 Overview

This document outlines the implementation of semantic versioning across the Expo Lab monorepo, including automated version management, version injection into applications, and display of version information in both client and server components.

## 📦 Project Structure & Versioning

### Independent Package Versioning
The project follows a **monorepo with independent versioning** approach:

```
lab1-todoApp/
├── package.json           # v1.1.1 - Root dev tools
├── client/package.json    # v1.1.1 - Expo React Native app
└── server/package.json    # v1.1.1 - Express.js API server
```

Each package maintains its own semantic version based on its specific changes:
- **Root package**: Development tooling and scripts
- **Client package**: Mobile/web application features and fixes
- **Server package**: API endpoints, business logic, and infrastructure

## 🔄 Semantic Versioning Rules

Following [SemVer 2.0.0](https://semver.org/) specification:

### Version Bump Triggers
- **MAJOR** (`X.0.0`): Breaking changes that require user action
  - API endpoint removals or incompatible changes
  - Database schema breaking changes
  - Configuration format changes
  - Major UI/UX paradigm shifts

- **MINOR** (`1.X.0`): New features that are backward compatible
  - New API endpoints
  - New UI components or screens
  - New configuration options
  - Performance improvements

- **PATCH** (`1.1.X`): Bug fixes and minor improvements
  - Bug fixes that don't change functionality
  - Security patches
  - Documentation updates
  - Code refactoring without functional changes

### Commit Message Mapping
```yaml
# Conventional Commits with Gitmoji
✨ feat(client): add dark mode        → MINOR bump
🐛 fix(server): fix validation bug    → PATCH bump
💥 feat!: remove deprecated API       → MAJOR bump
📝 docs: update README               → PATCH bump
♻️ refactor: improve code structure   → PATCH bump
⚡ perf: optimize database queries    → MINOR bump
🔒 security: fix auth vulnerability   → PATCH bump
```

## 🚀 CD/CI Integration

### Automated Versioning Workflow
1. **Commit Analysis**: Parse commit messages since last tag
2. **Version Calculation**: Determine appropriate version bump per package
3. **Package Updates**: Update `package.json` files with new versions
4. **Changelog Generation**: Create formatted changelog entries
5. **Environment Injection**: Set version variables for runtime access
6. **Build & Deploy**: Build and deploy with version information

### GitHub Actions Configuration
The project uses semantic-release with custom configuration:

```yaml
# .github/workflows/release.yml (future implementation)
name: Semantic Release
on:
  push:
    branches: [main]
jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm install
      - name: Run semantic release
        run: npx semantic-release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## 🔧 Environment Variables Implementation

### Client Environment Variables
Version information is injected into the client application:

```typescript
// client/constants/version.ts
export const APP_VERSION = process.env.EXPO_PUBLIC_APP_VERSION || '1.1.1';
export const BUILD_NUMBER = process.env.EXPO_PUBLIC_BUILD_NUMBER || '1';
export const BUILD_DATE = process.env.EXPO_PUBLIC_BUILD_DATE || new Date().toISOString();
```

### Server Environment Variables
Version information is available in the server application:

```typescript
// server/src/common/config/version.ts
export const SERVER_VERSION = process.env.SERVER_VERSION || process.env.npm_package_version || '1.1.1';
export const BUILD_NUMBER = process.env.BUILD_NUMBER || '1';
export const BUILD_DATE = process.env.BUILD_DATE || new Date().toISOString();
```

### Environment Files
```bash
# .env.example additions
EXPO_PUBLIC_APP_VERSION=1.1.1
EXPO_PUBLIC_BUILD_NUMBER=1
EXPO_PUBLIC_BUILD_DATE=2025-09-04T00:00:00.000Z
SERVER_VERSION=1.1.1
BUILD_NUMBER=1
BUILD_DATE=2025-09-04T00:00:00.000Z
```

## 📱 Client Version Display

### Version Component
A dedicated component displays version information in the client:

```typescript
// client/components/ui/Version/Version.tsx
import { View, Text } from 'react-native';
import { APP_VERSION, BUILD_NUMBER, BUILD_DATE } from '../../../constants/version';

export const Version = () => (
  <View style={styles.container}>
    <Text style={styles.version}>v{APP_VERSION}</Text>
    <Text style={styles.build}>Build {BUILD_NUMBER}</Text>
    <Text style={styles.date}>{new Date(BUILD_DATE).toLocaleDateString()}</Text>
  </View>
);
```

### Integration Points
- **Settings Screen**: Display version in user settings
- **About Screen**: Detailed version information
- **Debug Menu**: Developer version details
- **Footer**: Optional version display in app footer

## 🖥️ Server Version Display

### Health Check Enhancement
The health check endpoint includes comprehensive version information:

```typescript
// server/src/domain/health/services/health.service.ts
export interface HealthStatus {
  status: 'healthy';
  timestamp: string;
  uptime: number;
  version: string;
  build: {
    number: string;
    date: string;
    commit?: string;
  };
  environment: string;
}
```

### API Response Example
```json
{
  "status": "healthy",
  "timestamp": "2025-09-04T12:00:00.000Z",
  "uptime": 3600,
  "version": "1.1.1",
  "build": {
    "number": "42",
    "date": "2025-09-04T00:00:00.000Z",
    "commit": "abc123f"
  },
  "environment": "production"
}
```

## 📋 Changelog Management

### Automated Changelog Generation
Each package maintains its own changelog with standardized format:

```markdown
# Changelog

## [1.2.0] - 2025-09-04
### ✨ Added
- New dark mode theme option
- Version display component
- User profile avatar upload

### 🐛 Fixed
- Navigation header alignment issue
- Form validation error handling

### ♻️ Changed
- Improved theme system architecture
- Updated dependency versions

### 🔒 Security
- Enhanced authentication token validation
```

### Gitmoji Integration
The changelog includes gitmoji for better visual categorization:
- ✨ Features
- 🐛 Bug fixes
- ♻️ Refactoring
- 📝 Documentation
- 🔒 Security
- ⚡ Performance
- 💥 Breaking changes

## 🎨 Implementation Status

### ✅ Completed Features
- [x] Version constants and environment variables
- [x] Client Version component implementation
- [x] Server health check version enhancement
- [x] Documentation structure
- [x] Package.json version alignment

### 🚧 Pending Implementation
- [ ] GitHub Actions semantic-release workflow
- [ ] Automated changelog generation
- [ ] Git tag automation
- [ ] Build number generation
- [ ] Commit hash injection

### 🔮 Future Enhancements
- [ ] Version comparison and update notifications
- [ ] Rollback version tracking
- [ ] Performance metrics correlation with versions
- [ ] A/B testing version tracking

## 🛠️ Development Guidelines

### For Developers
1. **Commit Messages**: Use conventional commits with gitmoji
2. **Breaking Changes**: Mark with `!` or `BREAKING CHANGE:` in commit body
3. **Feature Development**: Use `feat:` prefix for new features
4. **Bug Fixes**: Use `fix:` prefix for bug fixes
5. **Documentation**: Use `docs:` prefix for documentation changes

### For CI/CD Pipeline
1. **Version Calculation**: Analyze commits since last tag
2. **Environment Injection**: Set version variables during build
3. **Changelog Update**: Generate and commit changelog changes
4. **Tag Creation**: Create git tags for new versions
5. **Deployment**: Deploy with version-specific assets

## 📊 Monitoring & Analytics

### Version Tracking
- Track version adoption rates
- Monitor rollback frequency
- Analyze feature usage by version
- Performance metrics per version

### Health Monitoring
- Version-specific error rates
- Performance degradation detection
- Compatibility issue identification
- User experience metrics by version

## 🔍 Troubleshooting

### Common Issues
1. **Version Mismatch**: Client and server versions out of sync
2. **Environment Variables**: Missing or incorrect version injection
3. **Build Issues**: Version-related build failures
4. **Deployment**: Version-specific deployment problems

### Debug Commands
```bash
# Check current versions
npm run version:check

# Validate environment variables
npm run env:validate

# Generate version report
npm run version:report

# Reset version state
npm run version:reset
```

---

**Maintainers**: Development Team  
**Last Updated**: September 4, 2025  
**Related Documents**: 
- [Architecture Guide](./client/docs/ARCHITECTURE.md)
- [CI/CD Documentation](./docs/AI/prompts/semver.yaml)
- [Project Overview](./.claude.md)
