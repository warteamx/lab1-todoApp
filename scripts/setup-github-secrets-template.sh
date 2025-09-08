#!/bin/bash

# GitHub Secrets Setup Template
# This script provides a template for setting up GitHub secrets for deployment
# Customize the values below for your specific deployment needs

set -e

echo "🔧 GitHub Secrets Setup Template"
echo "=================================="

# Check if GitHub CLI is installed and authenticated
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed. Please install it first:"
    echo "   brew install gh  # macOS"
    echo "   # or follow instructions at: https://cli.github.com/"
    echo "   Then run: gh auth login"
    exit 1
fi

if ! gh auth status &> /dev/null; then
    echo "❌ Not logged into GitHub CLI. Please run: gh auth login"
    exit 1
fi

echo "✅ GitHub CLI is ready"

# Check if we're in a git repository
if ! git remote get-url origin &> /dev/null; then
    echo "❌ This doesn't appear to be a git repository with a remote origin"
    exit 1
fi

REPO_URL=$(git remote get-url origin)
echo "✅ Repository: $REPO_URL"

echo ""
echo "🚨 IMPORTANT: This is a template script!"
echo "You need to customize the values below for your deployment:"
echo ""

# Function to set a GitHub secret with confirmation
set_secret_interactive() {
    local name=$1
    local description=$2
    local example=$3

    echo ""
    echo "Setting: $name"
    echo "Description: $description"
    echo "Example: $example"
    read -p "Enter value (or press Enter to skip): " value

    if [ -n "$value" ]; then
        echo "$value" | gh secret set "$name"
        echo "✅ $name set successfully"
    else
        echo "⏭️  Skipped $name"
    fi
}

echo ""
echo "📋 AWS Configuration Secrets"
echo "=============================="

set_secret_interactive "AWS_ACCESS_KEY_ID" "AWS access key for deployment" "AKIA..."
set_secret_interactive "AWS_SECRET_ACCESS_KEY" "AWS secret key for deployment" "..."
set_secret_interactive "AWS_REGION" "AWS region for deployment" "us-east-1"

echo ""
echo "🪣 S3 Configuration"
echo "==================="

set_secret_interactive "S3_BUCKET" "S3 bucket name for client deployment" "my-app-client"

echo ""
echo "🖥️  EC2 Configuration (if using EC2 deployment)"
echo "================================================"

set_secret_interactive "EC2_INSTANCE_ID" "EC2 instance ID" "i-1234567890abcdef0"
set_secret_interactive "EC2_HOST" "EC2 public IP or hostname" "12.34.56.78"
set_secret_interactive "EC2_USER" "EC2 SSH user" "ubuntu"
set_secret_interactive "EC2_PRIVATE_KEY" "EC2 SSH private key content" "-----BEGIN OPENSSH PRIVATE KEY-----..."

echo ""
echo "🗃️  Supabase Configuration"
echo "=========================="

set_secret_interactive "SUPABASE_URL" "Supabase project URL" "https://your-project.supabase.co"
set_secret_interactive "SUPABASE_KEY" "Supabase service role key" "eyJ..."
set_secret_interactive "SUPABASE_DB_URL" "Supabase database direct URL" "postgresql://postgres:..."

# For client-side Supabase access (if needed)
set_secret_interactive "EXPO_PUBLIC_SUPABASE_URL" "Supabase project URL (client)" "https://your-project.supabase.co"
set_secret_interactive "EXPO_PUBLIC_SUPABASE_ANON_KEY" "Supabase anon key (client)" "eyJ..."

echo ""
echo "🎉 GitHub Secrets Setup Complete!"
echo "=================================="
echo ""
echo "📋 Configured secrets will be available in GitHub Actions workflows"
echo ""
echo "🚀 Next steps:"
echo "• Review your GitHub Actions workflows in .github/workflows/"
echo "• Test your deployment by pushing to the main branch"
echo "• Monitor deployment status in the Actions tab"
echo ""
echo "📖 For more information:"
echo "• GitHub Secrets: https://docs.github.com/en/actions/security-guides/encrypted-secrets"
echo "• AWS deployment setup: docs/deployment.md"
