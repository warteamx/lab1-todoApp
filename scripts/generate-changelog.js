#!/usr/bin/env node
/**
 * Generate changelog from git commits using gitmoji parsing
 * Usage: node scripts/generate-changelog.js [--package=client|server] [--since=tag]
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Gitmoji to conventional commit type mapping
const gitmojiMap = {
  '✨': 'feat',      // new feature
  '🐛': 'fix',       // bug fix
  '🚑️': 'fix',      // critical hotfix
  '💄': 'style',     // UI/cosmetic changes
  '♻️': 'refactor',  // code refactoring
  '⚡️': 'perf',     // performance improvements
  '📝': 'docs',      // documentation
  '🎨': 'style',     // code structure/format
  '🔥': 'refactor',  // remove code/files
  '🚚': 'refactor',  // move/rename files
  '🔧': 'chore',     // configuration
  '🔖': 'chore',     // release/version
  '🚧': 'wip',       // work in progress
  '💚': 'ci',        // CI fixes
  '👷': 'ci',        // CI changes
  '📦️': 'build',    // build system
  '🔨': 'build',     // build scripts
  '🧪': 'test',      // tests
  '✅': 'test',      // add/update tests
  '🏗️': 'build',    // architectural changes
  '💡': 'docs',      // comments
  '🎉': 'feat',      // initial commit
  '🔒️': 'security', // security
  '🔐': 'security',  // secrets
};

function parseArgs() {
  const args = {
    package: null,
    since: null
  };

  process.argv.slice(2).forEach(arg => {
    if (arg.startsWith('--package=')) {
      args.package = arg.split('=')[1];
    } else if (arg.startsWith('--since=')) {
      args.since = arg.split('=')[1];
    }
  });

  return args;
}

function getLatestTag() {
  try {
    return execSync('git describe --tags --abbrev=0', { encoding: 'utf8' }).trim();
  } catch {
    return null;
  }
}

function getCommitsSince(since, packagePath = '') {
  const sinceArg = since ? `${since}..HEAD` : 'HEAD';
  const pathArg = packagePath ? ` -- ${packagePath}` : '';

  try {
    const output = execSync(`git log ${sinceArg} --pretty=format:"%H|%s|%an|%ad" --date=short${pathArg}`, { encoding: 'utf8' });
    return output.split('\n').filter(line => line.trim()).map(line => {
      const [hash, subject, author, date] = line.split('|');
      return { hash, subject, author, date };
    });
  } catch {
    return [];
  }
}

function parseCommit(commit) {
  const subject = commit.subject;

  // Extract gitmoji and parse type
  const gitmojiMatch = subject.match(/^([🎨✨🐛🚑️💄♻️⚡️📝🔥🚚🔧🔖🚧💚👷📦️🔨🧪✅🏗️💡🎉🔒️🔐])/);

  if (!gitmojiMatch) {
    return { ...commit, type: 'other', scope: null, description: subject };
  }

  const emoji = gitmojiMatch[1];
  const type = gitmojiMap[emoji] || 'other';

  // Remove emoji and parse conventional format
  let remaining = subject.replace(gitmojiMatch[0], '').trim();

  // Check for conventional format: type(scope): description
  const conventionalMatch = remaining.match(/^(\w+)(?:\(([^)]+)\))?\s*:\s*(.+)/);

  if (conventionalMatch) {
    return {
      ...commit,
      type: conventionalMatch[1],
      scope: conventionalMatch[2] || null,
      description: conventionalMatch[3]
    };
  }

  // Fallback to just description
  return {
    ...commit,
    type,
    scope: null,
    description: remaining
  };
}

function groupCommitsByType(commits) {
  const groups = {
    feat: [],
    fix: [],
    docs: [],
    style: [],
    refactor: [],
    perf: [],
    test: [],
    build: [],
    ci: [],
    chore: [],
    security: [],
    other: []
  };

  commits.forEach(commit => {
    const parsed = parseCommit(commit);
    if (groups[parsed.type]) {
      groups[parsed.type].push(parsed);
    } else {
      groups.other.push(parsed);
    }
  });

  return groups;
}

function generateMarkdown(version, date, groups) {
  let markdown = `## [${version}] - ${date}\n\n`;

  const sections = [
    { key: 'feat', title: '### ✨ Features' },
    { key: 'fix', title: '### 🐛 Bug Fixes' },
    { key: 'security', title: '### 🔒️ Security' },
    { key: 'perf', title: '### ⚡️ Performance' },
    { key: 'refactor', title: '### ♻️ Refactoring' },
    { key: 'docs', title: '### 📝 Documentation' },
    { key: 'style', title: '### 💄 Styling' },
    { key: 'test', title: '### 🧪 Testing' },
    { key: 'build', title: '### 📦️ Build System' },
    { key: 'ci', title: '### 👷 CI/CD' },
    { key: 'chore', title: '### 🔧 Maintenance' }
  ];

  sections.forEach(section => {
    const commits = groups[section.key];
    if (commits && commits.length > 0) {
      markdown += `${section.title}\n\n`;
      commits.forEach(commit => {
        const scope = commit.scope ? `**${commit.scope}**: ` : '';
        markdown += `- ${scope}${commit.description} ([${commit.hash.substring(0, 8)}](../../commit/${commit.hash}))\n`;
      });
      markdown += '\n';
    }
  });

  return markdown;
}

function updateChangelog(filePath, newContent) {
  const changelogHeader = `# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

`;

  let existingContent = '';
  if (fs.existsSync(filePath)) {
    existingContent = fs.readFileSync(filePath, 'utf8');
    // Remove the header if it exists
    existingContent = existingContent.replace(/^# Changelog[\s\S]*?(?=##|$)/m, '').trim();
  }

  const fullContent = changelogHeader + newContent + (existingContent ? '\n' + existingContent : '');
  fs.writeFileSync(filePath, fullContent);
}

function main() {
  const args = parseArgs();
  const latestTag = getLatestTag();
  const since = args.since || latestTag;

  console.log(`📝 Generating changelog since: ${since || 'beginning'}`);

  if (args.package) {
    // Generate changelog for specific package
    const packagePath = args.package;
    const commits = getCommitsSince(since, packagePath);
    const groups = groupCommitsByType(commits);

    const version = require(`../${packagePath}/package.json`).version;
    const date = new Date().toISOString().split('T')[0];
    const markdown = generateMarkdown(version, date, groups);

    const changelogPath = path.join(__dirname, '..', packagePath, 'CHANGELOG.md');
    updateChangelog(changelogPath, markdown);

    console.log(`✅ Generated changelog for ${packagePath}: ${changelogPath}`);
  } else {
    // Generate changelog for all packages
    const packages = ['client', 'server'];

    packages.forEach(pkg => {
      const commits = getCommitsSince(since, pkg);
      if (commits.length === 0) {
        console.log(`ℹ️ No commits found for ${pkg}`);
        return;
      }

      const groups = groupCommitsByType(commits);
      const version = require(`../${pkg}/package.json`).version;
      const date = new Date().toISOString().split('T')[0];
      const markdown = generateMarkdown(version, date, groups);

      const changelogPath = path.join(__dirname, '..', pkg, 'CHANGELOG.md');
      updateChangelog(changelogPath, markdown);

      console.log(`✅ Generated changelog for ${pkg}: ${changelogPath}`);
    });

    // Generate root changelog
    const allCommits = getCommitsSince(since);
    const allGroups = groupCommitsByType(allCommits);
    const rootVersion = require('../package.json').version;
    const date = new Date().toISOString().split('T')[0];
    const rootMarkdown = generateMarkdown(rootVersion, date, allGroups);

    const rootChangelogPath = path.join(__dirname, '..', 'CHANGELOG.md');
    updateChangelog(rootChangelogPath, rootMarkdown);

    console.log(`✅ Generated root changelog: ${rootChangelogPath}`);
  }
}

if (require.main === module) {
  main();
}
