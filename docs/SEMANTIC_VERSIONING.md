# Semantic Versioning & Changelog

This document describes the simplified semantic versioning and changelog system for Lab1 TodoApp.

## Overview

We use a **single, unified approach** for version management:

- **One Changelog**: Root `CHANGELOG.md` only (no separate client/server changelogs)
- **Synchronized Versions**: All packages (root, client, server) share the same version
- **Automated Process**: Semantic-release handles version bumping and changelog generation
- **Gitmoji + Conventional Commits**: Using gitmoji with conventional commit patterns

## Commit Format

We use **Gitmoji** combined with **conventional commits**:

```
<gitmoji> <type>(scope): description

Examples:
✨ feat(client): add user profile management
🐛 fix(server): resolve authentication token validation
📝 docs: update API documentation
🧪 test(client): add unit tests for todo components
♻️ refactor: simplify authentication flow
```

## Gitmoji to Version Mapping

| Gitmoji         | Type     | Version Impact | Description              |
| --------------- | -------- | -------------- | ------------------------ |
| 💥 :boom:       | BREAKING | **Major**      | Breaking changes         |
| ✨ :sparkles:   | feat     | **Minor**      | New features             |
| 🐛 :bug:        | fix      | **Patch**      | Bug fixes                |
| 🚑️ :ambulance: | fix      | **Patch**      | Critical hotfix          |
| 🔒️ :lock:      | security | **Patch**      | Security fixes           |
| ⚡️ :zap:       | perf     | **Patch**      | Performance improvements |
| ♻️ :recycle:    | refactor | **Patch**      | Code refactoring         |
| 📝 :memo:       | docs     | **Patch**      | Documentation            |
| 🧪 :test_tube:  | test     | **Patch**      | Tests                    |
| 🔧 :wrench:     | chore    | **Patch**      | Maintenance              |

## Automated Workflow

### 1. Development

- Developers commit using gitmoji + conventional format
- Multiple commits accumulate in feature branches

### 2. Main Branch Push

When code is merged to `main`:

1. **CI/CD Pipeline runs**:
   - Tests both client and server
   - Builds applications
   - Runs semantic-release

2. **Semantic-release**:
   - Analyzes commit messages since last release
   - Determines version bump (major/minor/patch)
   - Updates all package.json files
   - Generates/updates CHANGELOG.md
   - Creates git tag
   - Creates GitHub release

3. **Deployment**:
   - Deploys if new version was released
   - Updates production servers

## Files Managed

### Automatically Updated

- `package.json` (root)
- `client/package.json`
- `server/package.json`
- `CHANGELOG.md` (root only)
- `client/constants/version.ts`
- Git tags (e.g., `v1.0.4`)

### Configuration Files

- `.releaserc.json` - Semantic-release configuration
- `.github/workflows/ci-cd.yml` - CI/CD pipeline
- `scripts/update-version.js` - Version synchronization script

## Manual Version Bumping (Emergency)

If needed, you can manually bump versions:

```bash
# Update all package versions
npm run version:update 1.2.3

# Build version info
npm run build:version

# Commit and tag manually
git add .
git commit -m "🔖 chore(release): 1.2.3"
git tag -a v1.2.3 -m "Release version 1.2.3"
git push origin --tags
```

## Changelog Structure

The changelog follows [Keep a Changelog](https://keepachangelog.com/) format:

```markdown
# Changelog

## [v1.0.4](https://github.com/warteamx/lab1-todoApp/compare/v1.0.3...v1.0.4) (2025-09-05)

### 🐛 Bug Fixes

- [`f3736d1`](https://github.com/warteamx/lab1-todoApp/commit/f3736d1) fix(docker): regenerate package-lock.json in Docker build stages

### ✨ Features

- [`a1b2c3d`](https://github.com/warteamx/lab1-todoApp/commit/a1b2c3d) feat(client): add dark mode support
```

## Branch Strategy

- **main**: Production releases (triggers semantic-release)
- **develop**: Pre-release alpha versions
- **next**: Pre-release beta versions
- **feature/\***: Development branches (no releases)

## Troubleshooting

### No Release Generated

If semantic-release doesn't create a release:

- Check commit messages follow gitmoji + conventional format
- Ensure commits contain version-triggering types (feat, fix, etc.)
- Verify `.releaserc.json` configuration

### Version Conflicts

If package versions get out of sync:

```bash
npm run version:update $(node -p "require('./package.json').version")
```

### Manual Release

To force a release:

```bash
npm run release:dry  # Preview what would happen
npm run release      # Actually release
```

## Scripts Reference

| Script                             | Purpose                              |
| ---------------------------------- | ------------------------------------ |
| `npm run release`                  | Run semantic-release                 |
| `npm run release:dry`              | Preview release (dry run)            |
| `npm run version:update <version>` | Update all package versions          |
| `npm run build:version`            | Build version info for both packages |

## Benefits of This Approach

✅ **Simplified**: Single changelog, synchronized versions  
✅ **Automated**: No manual version management needed  
✅ **Consistent**: Same process for all packages  
✅ **Traceable**: Full git history and proper tags  
✅ **CI/CD Ready**: Integrates with automated deployment  
✅ **Conventional**: Follows industry standards

This system ensures reliable, predictable versioning while reducing maintenance overhead.
