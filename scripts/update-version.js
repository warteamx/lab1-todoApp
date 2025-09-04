#!/usr/bin/env node
/**
 * Update version across all packages in the monorepo
 * Usage: node scripts/update-version.js <version>
 */

const fs = require('fs');
const path = require('path');

const newVersion = process.argv[2];

if (!newVersion) {
  console.error('❌ Error: Version argument is required');
  console.log('Usage: node scripts/update-version.js <version>');
  process.exit(1);
}

// Validate semantic version format
const semverRegex = /^\d+\.\d+\.\d+(-[\w.]+)?$/;
if (!semverRegex.test(newVersion)) {
  console.error(`❌ Error: Invalid version format: ${newVersion}`);
  console.log('Expected format: X.Y.Z or X.Y.Z-prerelease');
  process.exit(1);
}

const packages = [
  { name: 'Root', file: 'package.json' },
  { name: 'Client', file: 'client/package.json' },
  { name: 'Server', file: 'server/package.json' }
];

console.log(`🔄 Updating version to ${newVersion}...`);

packages.forEach(pkg => {
  const packagePath = path.join(__dirname, '..', pkg.file);

  try {
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    const oldVersion = packageJson.version;

    packageJson.version = newVersion;

    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n');
    console.log(`✅ ${pkg.name}: ${oldVersion} → ${newVersion}`);
  } catch (error) {
    console.error(`❌ Error updating ${pkg.name}:`, error.message);
    process.exit(1);
  }
});

// Update version constants file
const versionFilePath = path.join(__dirname, '..', 'client/constants/version.ts');
try {
  let versionContent = fs.readFileSync(versionFilePath, 'utf8');

  // Update APP_VERSION default value
  versionContent = versionContent.replace(
    /export const APP_VERSION = process\.env\.EXPO_PUBLIC_APP_VERSION \|\| '[^']+';/,
    `export const APP_VERSION = process.env.EXPO_PUBLIC_APP_VERSION || '${newVersion}';`
  );

  fs.writeFileSync(versionFilePath, versionContent);
  console.log(`✅ Version constants updated`);
} catch (error) {
  console.error(`❌ Error updating version constants:`, error.message);
}

console.log(`🎉 Version update completed: ${newVersion}`);
