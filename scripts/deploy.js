#!/usr/bin/env node
/**
 * Deployment script with version awareness
 * Usage: node scripts/deploy.js [environment] [--version=x.y.z]
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function getCurrentVersion() {
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
  return packageJson.version;
}

function getBuildInfo() {
  try {
    const commitHash = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();
    const buildDate = new Date().toISOString();
    return { commitHash, buildDate };
  } catch {
    return { commitHash: 'unknown', buildDate: new Date().toISOString() };
  }
}

function validateEnvironment(env) {
  const validEnvs = ['development', 'staging', 'production'];
  if (!validEnvs.includes(env)) {
    throw new Error(`Invalid environment: ${env}. Valid options: ${validEnvs.join(', ')}`);
  }
}

function setEnvironmentVariables(env, version, buildInfo) {
  const envVars = {
    NODE_ENV: env,
    APP_VERSION: version,
    BUILD_NUMBER: process.env.BUILD_NUMBER || Date.now().toString(),
    BUILD_DATE: buildInfo.buildDate,
    COMMIT_HASH: buildInfo.commitHash,
    BUILD_ENV: env
  };

  // Set environment variables for the deployment
  Object.entries(envVars).forEach(([key, value]) => {
    process.env[key] = value;
  });

  return envVars;
}

function buildForDeployment(env, envVars) {
  console.log(`🏗️ Building for ${env} environment...`);

  try {
    // Build client
    console.log('📱 Building client...');
    const clientEnvVars = Object.entries(envVars)
      .map(([key, value]) => `EXPO_PUBLIC_${key}=${value}`)
      .join(' ');

    execSync(`cd client && ${clientEnvVars} npm run build:version`, { stdio: 'inherit' });

    if (env === 'production') {
      execSync(`cd client && ${clientEnvVars} npm run build:web`, { stdio: 'inherit' });
    }

    // Build server
    console.log('🖥️ Building server...');
    const serverEnvVars = Object.entries(envVars)
      .map(([key, value]) => `${key}=${value}`)
      .join(' ');

    execSync(`cd server && ${serverEnvVars} npm run build:version`, { stdio: 'inherit' });
    execSync(`cd server && ${serverEnvVars} npm run build`, { stdio: 'inherit' });

    console.log('✅ Build completed successfully');
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

function runPreDeploymentTests() {
  console.log('🧪 Running pre-deployment tests...');

  try {
    execSync('npm run test:client', { stdio: 'inherit' });
    execSync('npm run test:server', { stdio: 'inherit' });
    console.log('✅ All tests passed');
  } catch (error) {
    console.error('❌ Tests failed:', error.message);
    process.exit(1);
  }
}

function deployToEnvironment(env, version) {
  console.log(`🚀 Deploying version ${version} to ${env}...`);

  // This is where you would add your actual deployment logic
  // Examples:

  switch (env) {
    case 'development':
      console.log('📝 Development deployment:');
      console.log('  - Start local development servers');
      console.log('  - Update local environment variables');
      break;

    case 'staging':
      console.log('🎭 Staging deployment:');
      console.log('  - Deploy to staging servers');
      console.log('  - Run staging tests');
      console.log('  - Update staging environment');
      // execSync('your-staging-deploy-command', { stdio: 'inherit' });
      break;

    case 'production':
      console.log('🌟 Production deployment:');
      console.log('  - Deploy to production servers');
      console.log('  - Update DNS/CDN');
      console.log('  - Send deployment notifications');
      // execSync('your-production-deploy-command', { stdio: 'inherit' });
      break;
  }

  console.log(`✅ Deployment to ${env} completed`);
}

function sendDeploymentNotification(env, version, buildInfo) {
  console.log('📣 Sending deployment notification...');

  const message = {
    environment: env,
    version: version,
    commitHash: buildInfo.commitHash,
    buildDate: buildInfo.buildDate,
    deployedAt: new Date().toISOString()
  };

  console.log('📊 Deployment Summary:');
  console.log(JSON.stringify(message, null, 2));

  // Here you could send to Slack, Discord, email, etc.
  // Example:
  // await sendSlackNotification(message);
  // await sendEmailNotification(message);
}

function showHelp() {
  console.log(`
🚀 Deployment Script

Usage: node scripts/deploy.js [environment] [options]

Environments:
  development    Deploy to development environment
  staging        Deploy to staging environment
  production     Deploy to production environment

Options:
  --version=x.y.z    Deploy specific version (default: current)
  --skip-tests       Skip pre-deployment tests
  --skip-build       Skip build step
  --help             Show this help message

Examples:
  node scripts/deploy.js staging
  node scripts/deploy.js production --version=1.2.0
  node scripts/deploy.js development --skip-tests

Current version: ${getCurrentVersion()}
`);
}

function main() {
  const args = process.argv.slice(2);
  const environment = args[0];

  const versionArg = args.find(arg => arg.startsWith('--version='));
  const skipTests = args.includes('--skip-tests');
  const skipBuild = args.includes('--skip-build');
  const showHelpFlag = args.includes('--help') || args.includes('-h');

  if (showHelpFlag || !environment) {
    showHelp();
    return;
  }

  try {
    validateEnvironment(environment);

    const version = versionArg ? versionArg.split('=')[1] : getCurrentVersion();
    const buildInfo = getBuildInfo();

    console.log(`🚀 Deployment Script`);
    console.log(`📊 Environment: ${environment}`);
    console.log(`📈 Version: ${version}`);
    console.log(`📝 Commit: ${buildInfo.commitHash}`);
    console.log('');

    // Step 1: Set environment variables
    const envVars = setEnvironmentVariables(environment, version, buildInfo);

    // Step 2: Run tests (unless skipped)
    if (!skipTests) {
      runPreDeploymentTests();
    } else {
      console.log('⏭️ Skipping pre-deployment tests');
    }

    // Step 3: Build for deployment (unless skipped)
    if (!skipBuild) {
      buildForDeployment(environment, envVars);
    } else {
      console.log('⏭️ Skipping build step');
    }

    // Step 4: Deploy
    deployToEnvironment(environment, version);

    // Step 5: Send notification
    sendDeploymentNotification(environment, version, buildInfo);

    console.log('');
    console.log(`🎉 Deployment completed successfully!`);

  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
