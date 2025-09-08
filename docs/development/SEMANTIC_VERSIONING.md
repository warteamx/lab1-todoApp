# 📦 Semantic Versioning

Automated version management using semantic versioning (SemVer) principles with gitmoji-based conventional commits.

## 🎯 Overview

Lab1-TodoApp uses **automated semantic versioning** to ensure consistent, predictable releases:

- **Single Unified Versioning**: All packages (root, client, server) share the same version
- **Automated Process**: Semantic-release handles version bumping and changelog generation
- **Gitmoji + Conventional Commits**: Clear commit messages drive version decisions
- **Single Source of Truth**: One root `CHANGELOG.md` file

## 📝 Commit Convention

### Format

```
<gitmoji> <type>(scope): <description>

[optional body]
[optional footer]
```

### Examples

```bash
✨ feat(client): add user authentication with biometric support
🐛 fix(server): resolve database connection timeout issues
💥 feat!: remove deprecated v1 API endpoints
📝 docs: update installation guide with new requirements
🧪 test(client): add unit tests for todo components
♻️ refactor: simplify authentication flow
🔒️ security(server): implement rate limiting
```

## 🏷️ Version Impact Mapping

| Gitmoji | Type     | Version   | Description      | Example                               |
| ------- | -------- | --------- | ---------------- | ------------------------------------- |
| 💥      | feat!    | **Major** | Breaking changes | API removals, incompatible changes    |
| ✨      | feat     | **Minor** | New features     | New endpoints, components             |
| 🐛      | fix      | **Patch** | Bug fixes        | Error corrections, small improvements |
| 🚑️     | hotfix   | **Patch** | Critical fixes   | Security patches, critical bugs       |
| 🔒️     | security | **Patch** | Security fixes   | Vulnerability patches                 |
| ⚡️     | perf     | **Patch** | Performance      | Optimization improvements             |
| ♻️      | refactor | **Patch** | Code refactoring | Internal improvements                 |
| 📝      | docs     | **Patch** | Documentation    | README updates, comments              |
| 🧪      | test     | **Patch** | Tests            | Test additions, improvements          |
| 🔧      | chore    | **Patch** | Maintenance      | Dependencies, build scripts           |

## 🤖 Automated Workflow

### 1. Development Phase

- Developers commit using gitmoji + conventional format
- Multiple commits can accumulate in feature branches
- No version changes occur during development

### 2. Release Trigger

When code is merged to `main` branch:

1. **CI/CD Pipeline Executes**
   - Runs comprehensive tests (client + server)
   - Builds applications for production
   - Executes semantic-release analysis

2. **Semantic-Release Process**
   - Analyzes all commits since last release
   - Determines appropriate version bump (major/minor/patch)
   - Updates all `package.json` files synchronously
   - Generates/updates root `CHANGELOG.md`
   - Creates git tag (e.g., `v1.2.3`)
   - Creates GitHub release with notes

3. **Deployment Phase**
   - Triggers deployment if new version was created
   - Updates production servers automatically
   - Notifies relevant stakeholders

## 📁 Managed Files

### Automatically Updated

- `package.json` (root)
- `client/package.json`
- `server/package.json`
- `CHANGELOG.md` (root only)
- `client/constants/version.ts`
- Git tags (e.g., `v1.2.3`)
- GitHub releases

### Configuration Files

- `.releaserc.json` - Semantic-release configuration
- `.github/workflows/release.yml` - CI/CD pipeline
- `scripts/update-version.js` - Version synchronization
- `package.json` - NPM scripts

## 📊 Changelog Structure

Follows [Keep a Changelog](https://keepachangelog.com/) format with commit links:

```markdown
# Changelog

## [v1.2.3](https://github.com/warteamx/lab1-todoApp/compare/v1.2.2...v1.2.3) (2025-09-08)

### ✨ Features

- [`a1b2c3d`](https://github.com/warteamx/lab1-todoApp/commit/a1b2c3d) feat(client): add dark mode support
- [`e4f5g6h`](https://github.com/warteamx/lab1-todoApp/commit/e4f5g6h) feat(server): implement caching layer

### 🐛 Bug Fixes

- [`i7j8k9l`](https://github.com/warteamx/lab1-todoApp/commit/i7j8k9l) fix(client): resolve navigation state issues
- [`m0n1o2p`](https://github.com/warteamx/lab1-todoApp/commit/m0n1o2p) fix(server): handle edge cases in validation

### 📝 Documentation

- [`q3r4s5t`](https://github.com/warteamx/lab1-todoApp/commit/q3r4s5t) docs: update API documentation
```

## 🔧 Manual Version Management

### Emergency Version Bump

For urgent situations requiring manual intervention:

```bash
# Update all package versions to specific version
npm run version:update 1.2.4

# Rebuild version information files
npm run build:version

# Commit and tag manually
git add .
git commit -m "🔖 chore(release): 1.2.4"
git tag -a v1.2.4 -m "Emergency release 1.2.4"
git push origin main --tags
```

### Preview Release

To see what would happen without actually releasing:

```bash
npm run release:dry
```

## 🌿 Branch Strategy

### Release Branches

- **`main`** - Production releases (triggers semantic-release)
- **`develop`** - Pre-release integration (optional)
- **`next`** - Beta releases (optional)

### Feature Branches

- **`feature/*`** - New features (no releases)
- **`fix/*`** - Bug fixes (no releases)
- **`hotfix/*`** - Critical fixes (can bypass for urgent releases)

## 🚨 Troubleshooting

### No Release Generated

If semantic-release doesn't create a release:

1. **Check Commit Messages**

   ```bash
   git log --oneline origin/main ^$(git describe --tags --abbrev=0)
   ```

   - Ensure commits follow gitmoji + conventional format
   - Verify at least one version-triggering type exists (feat, fix, etc.)

2. **Verify Configuration**

   ```bash
   cat .releaserc.json
   ```

3. **Check CI/CD Logs**
   - Review GitHub Actions output
   - Look for semantic-release analysis results

### Version Synchronization Issues

If package versions become misaligned:

```bash
# Get current root version
CURRENT_VERSION=$(node -p "require('./package.json').version")

# Sync all packages to root version
npm run version:update $CURRENT_VERSION

# Verify synchronization
npm run build:version
```

### Failed Deployments

If deployment fails after version bump:

1. **Check deployment logs**
2. **Verify environment variables**
3. **Manual deployment trigger**:
   ```bash
   npm run deploy:production
   ```

## 🛠️ Available Scripts

| Script                             | Purpose              | Usage                |
| ---------------------------------- | -------------------- | -------------------- |
| `npm run release`                  | Run semantic-release | Production use       |
| `npm run release:dry`              | Preview release      | Testing              |
| `npm run version:update <version>` | Manual version sync  | Emergency            |
| `npm run build:version`            | Update version files | After manual changes |

## 🎉 Benefits

### ✅ Developer Experience

- **No Manual Version Management** - Fully automated
- **Clear Commit Guidelines** - Gitmoji provides visual cues
- **Predictable Releases** - Consistent versioning logic

### ✅ Project Management

- **Traceable Changes** - Full git history with proper tags
- **Professional Releases** - GitHub releases with detailed notes
- **CI/CD Integration** - Seamless deployment pipeline

### ✅ Maintenance

- **Single Source of Truth** - One changelog, synchronized versions
- **Industry Standards** - Follows SemVer and conventional commits
- **Reduced Complexity** - Less configuration to manage

---

This semantic versioning system ensures reliable, predictable releases while minimizing manual overhead and human error.
