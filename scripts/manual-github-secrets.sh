#!/bin/bash

# Direct GitHub Secrets Setup Script
# This script sets up GitHub secrets using curl and GitHub API

set -e

echo "🔧 Setting up GitHub Secrets for AWS Deployment"
echo "=============================================="

# GitHub repository details
REPO_OWNER="warteamx"
REPO_NAME="lab1-todoApp"

# Check if GITHUB_TOKEN is set
if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ GITHUB_TOKEN environment variable is not set."
    echo "Please create a Personal Access Token at: https://github.com/settings/tokens"
    echo "With 'repo' permissions and set it as: export GITHUB_TOKEN=your_token"
    exit 1
fi

# Function to set a GitHub secret
set_github_secret() {
    local secret_name=$1
    local secret_value=$2

    echo "Setting secret: $secret_name"

    # Get repository public key
    local key_response=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
        "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/actions/secrets/public-key")

    local public_key=$(echo $key_response | jq -r '.key')
    local key_id=$(echo $key_response | jq -r '.key_id')

    # Encrypt the secret (this requires a more complex setup with libsodium)
    # For now, we'll output the manual commands
    echo "Manual setup required for: $secret_name"
    echo "Value: $secret_value"
    echo "---"
}

echo "📋 Manual GitHub Secrets Setup Required"
echo "======================================="
echo ""
echo "Please go to: https://github.com/$REPO_OWNER/$REPO_NAME/settings/secrets/actions"
echo "And add these secrets manually:"
echo ""

echo "🔑 AWS Configuration:"
echo "AWS_ACCESS_KEY_ID = [Your AWS Access Key ID]"
echo "AWS_SECRET_ACCESS_KEY = [Your AWS Secret Access Key]"
echo "AWS_REGION = eu-north-1"
echo ""

echo "🪣 S3 Configuration:"
echo "S3_BUCKET = lab1-todoapp"
echo ""

echo "🖥️  EC2 Configuration:"
echo "EC2_INSTANCE_ID = i-046d4e1e286e3032d"
echo "EC2_HOST = 56.228.14.41"
echo "EC2_USER = ubuntu"
echo ""

echo "🔐 SSH Key Configuration:"
echo "EC2_PRIVATE_KEY = (content of ~/.ssh/lab1-todoapp-key.pem)"
echo "Run this command to get the key content:"
echo "cat ~/.ssh/lab1-todoapp-key.pem"
echo ""

echo "🗃️  Supabase Configuration (from your .env.example):"
echo "SUPABASE_DB_URL = (your Supabase database URL)"
echo "SUPABASE_KEY = (your Supabase API key)"
echo "SUPABASE_URL = (your Supabase project URL)"
echo ""

echo "🎯 Quick Setup Commands:"
echo "Copy and paste these values in GitHub Secrets page"
echo ""

# Output SSH key content
if [ -f "$HOME/.ssh/lab1-todoapp-key.pem" ]; then
    echo "📋 SSH Private Key Content:"
    echo "=========================="
    cat ~/.ssh/lab1-todoapp-key.pem
    echo ""
    echo "=========================="
fi

echo ""
echo "🚀 After setting up the secrets, your deployment will be ready!"
echo "Test it by pushing changes to the main branch or 22-deploy-to-aws branch"
