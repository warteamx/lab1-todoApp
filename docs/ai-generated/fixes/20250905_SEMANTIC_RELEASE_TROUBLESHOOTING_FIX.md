# Semantic Release Troubleshooting Guide

## Issue: Conventional Commits vs Gitmoji

### Problem

Semantic release was not triggering version bumps because:

1. **Emoji Conflicts**: Commits with gitmoji format (e.g., `🐛 fix:`, `🔧 build:`) were not being recognized by the conventional commits parser
2. **Merge Commit Handling**: Merge commits like "Merge pull request #29..." don't trigger releases by default
3. **Parser Configuration**: The commit analyzer needed proper configuration to handle both formats

### Solution

#### 1. Updated `.releaserc.json` Configuration

- Removed gitmoji emoji from the release commit message template
- Fixed JSON syntax and parser options
- Ensured proper conventional commits preset configuration

#### 2. Commit Message Standards

For semantic release to work, commits should follow this format:

**✅ CORRECT (triggers release):**

```bash
fix: resolve npm install warnings and server test failures
feat: add dark mode support
docs: update README with troubleshooting guide
build: update husky configuration to v9 format
```

**❌ INCORRECT (does not trigger release):**

```bash
🐛 fix: resolve npm install warnings and server test failures
🔧 build: update husky configuration to v9 format
Merge pull request #29 from warteamx/28-fix-husky-deprecation
```

#### 3. Release Rules

- `feat`: triggers **MINOR** version bump (1.X.0)
- `fix`: triggers **PATCH** version bump (1.1.X)
- `docs`, `build`, `ci`, `test`, `refactor`: trigger **PATCH** version bump
- `chore`: does NOT trigger release
- Breaking changes: trigger **MAJOR** version bump (X.0.0)

### Testing the Fix

To test if semantic release is working:

1. **Dry Run**:

   ```bash
   npm run release:dry
   ```

2. **Check Commit Format**:
   - Use standard conventional commits without emojis
   - Ensure commit types match the configuration

3. **Manual Trigger**:
   - Make a commit with `fix:` or `feat:` prefix
   - Push to main branch
   - Check CI/CD workflow logs

### Best Practices

1. **Use Conventional Commits**: Stick to standard format without emojis for release commits
2. **Meaningful Changes**: Ensure commits represent actual functional changes
3. **Test Locally**: Use `npm run release:dry` to verify before pushing
4. **Monitor CI/CD**: Check GitHub Actions logs for semantic release output

### Debugging Steps

If semantic release still doesn't work:

1. Check the "🔖 Release" job logs in GitHub Actions
2. Look for commit analysis messages
3. Verify commit format matches conventional commits standard
4. Ensure the commit is not a merge commit
5. Check if the change is substantial enough to warrant a release

### Related Files

- `.releaserc.json` - Semantic release configuration
- `.github/workflows/ci-cd.yml` - CI/CD pipeline
- `package.json` - Release scripts and dependencies
