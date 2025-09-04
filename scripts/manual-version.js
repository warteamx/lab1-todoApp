#!/usr/bin/env node
/**
 * Manual version bumping script
 * Usage: node scripts/manual-version.js [patch|minor|major] [--dry-run]
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function getCurrentVersion() {
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
  return packageJson.version;
}

function parseVersion(version) {
  const [major, minor, patch] = version.split('.').map(Number);
  return { major, minor, patch };
}

function bumpVersion(currentVersion, bumpType) {
  const { major, minor, patch } = parseVersion(currentVersion);

  switch (bumpType) {
    case 'major':
      return `${major + 1}.0.0`;
    case 'minor':
      return `${major}.${minor + 1}.0`;
    case 'patch':
      return `${major}.${minor}.${patch + 1}`;
    default:
      throw new Error(`Invalid bump type: ${bumpType}. Use patch, minor, or major.`);
  }
}

function generateChangelog(newVersion, isDryRun = false) {
  console.log(`📝 Generating changelog for version ${newVersion}...`);

  try {
    const command = `node scripts/generate-changelog.js`;
    if (!isDryRun) {
      execSync(command, { stdio: 'inherit' });
    } else {
      console.log(`🏃 Dry run: Would run '${command}'`);
    }
  } catch (error) {
    console.warn('⚠️ Warning: Could not generate changelog:', error.message);
  }
}

function updateVersions(newVersion, isDryRun = false) {
  console.log(`🔄 Updating versions to ${newVersion}...`);

  try {
    const command = `node scripts/update-version.js ${newVersion}`;
    if (!isDryRun) {
      execSync(command, { stdio: 'inherit' });
    } else {
      console.log(`🏃 Dry run: Would run '${command}'`);
    }
  } catch (error) {
    console.error('❌ Error updating versions:', error.message);
    process.exit(1);
  }
}

function buildVersionInfo(isDryRun = false) {
  console.log('🔨 Building version information...');

  try {
    const command = 'npm run build:version';
    if (!isDryRun) {
      execSync(command, { stdio: 'inherit' });
    } else {
      console.log(`🏃 Dry run: Would run '${command}'`);
    }
  } catch (error) {
    console.warn('⚠️ Warning: Could not build version info:', error.message);
  }
}

function createGitTag(version, isDryRun = false) {
  console.log(`🏷️ Creating git tag v${version}...`);

  try {
    const commands = [
      'git add .',
      `git commit -m "🔖 chore(release): ${version}"`,
      `git tag -a v${version} -m "Release version ${version}"`
    ];

    commands.forEach(command => {
      if (!isDryRun) {
        execSync(command, { stdio: 'inherit' });
      } else {
        console.log(`🏃 Dry run: Would run '${command}'`);
      }
    });

    if (!isDryRun) {
      console.log('✅ Git tag created successfully');
      console.log('💡 Remember to push the tag: git push origin --tags');
    }
  } catch (error) {
    console.error('❌ Error creating git tag:', error.message);
    process.exit(1);
  }
}

function showHelp() {
  console.log(`
📦 Manual Version Management

Usage: node scripts/manual-version.js [type] [options]

Types:
  patch    Bump patch version (1.0.0 → 1.0.1)
  minor    Bump minor version (1.0.0 → 1.1.0)
  major    Bump major version (1.0.0 → 2.0.0)

Options:
  --dry-run    Show what would be done without making changes
  --help       Show this help message

Examples:
  node scripts/manual-version.js patch
  node scripts/manual-version.js minor --dry-run
  node scripts/manual-version.js major

Current version: ${getCurrentVersion()}
`);
}

function main() {
  const args = process.argv.slice(2);
  const bumpType = args[0];
  const isDryRun = args.includes('--dry-run');
  const showHelpFlag = args.includes('--help') || args.includes('-h');

  if (showHelpFlag || !bumpType) {
    showHelp();
    return;
  }

  if (!['patch', 'minor', 'major'].includes(bumpType)) {
    console.error(`❌ Invalid bump type: ${bumpType}`);
    showHelp();
    process.exit(1);
  }

  const currentVersion = getCurrentVersion();
  const newVersion = bumpVersion(currentVersion, bumpType);

  console.log(`🚀 Manual Version Bump ${isDryRun ? '(DRY RUN)' : ''}`);
  console.log(`📊 Current version: ${currentVersion}`);
  console.log(`📈 New version: ${newVersion}`);
  console.log(`📝 Bump type: ${bumpType}`);
  console.log('');

  if (isDryRun) {
    console.log('🏃 DRY RUN MODE - No changes will be made');
    console.log('');
  }

  // Step 1: Update package versions
  updateVersions(newVersion, isDryRun);

  // Step 2: Generate changelog
  generateChangelog(newVersion, isDryRun);

  // Step 3: Build version info
  buildVersionInfo(isDryRun);

  // Step 4: Create git tag
  createGitTag(newVersion, isDryRun);

  console.log('');
  console.log(`🎉 Version bump completed: ${currentVersion} → ${newVersion}`);

  if (!isDryRun) {
    console.log('');
    console.log('Next steps:');
    console.log('1. Review the changes');
    console.log('2. Push changes: git push origin --tags');
    console.log('3. Create a GitHub release');
  }
}

if (require.main === module) {
  main();
}
