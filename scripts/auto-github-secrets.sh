#!/bin/bash

# Automated GitHub Secrets Setup Script
# This script sets up all required GitHub secrets for AWS deployment

set -e

echo "🔧 Setting up GitHub Secrets for AWS Deployment"
echo "=============================================="

# Check if we're in the right repository
if ! git remote get-url origin | grep -q "warteamx/lab1-todoApp"; then
    echo "❌ Please run this script from the lab1-todoApp repository"
    exit 1
fi

echo "✅ Repository check passed"

# Check if GitHub CLI is authenticated
if ! gh auth status &> /dev/null; then
    echo "❌ Not logged into GitHub CLI. Please run: gh auth login"
    exit 1
fi

echo "✅ GitHub CLI authenticated"

# Function to set a GitHub secret
set_secret() {
    local name=$1
    local value=$2
    echo "Setting secret: $name"
    echo "$value" | gh secret set "$name"
}

echo ""
echo "📍 Setting up AWS secrets..."

# AWS Configuration
AWS_ACCESS_KEY_ID=$(aws configure get aws_access_key_id)
AWS_SECRET_ACCESS_KEY=$(aws configure get aws_secret_access_key)

set_secret "AWS_ACCESS_KEY_ID" "$AWS_ACCESS_KEY_ID"
set_secret "AWS_SECRET_ACCESS_KEY" "$AWS_SECRET_ACCESS_KEY"
set_secret "AWS_REGION" "eu-north-1"

echo "✅ AWS credentials set"

# S3 Configuration
echo ""
echo "🪣 Setting up S3 secrets..."
set_secret "S3_BUCKET" "lab1-todoapp"
echo "✅ S3 bucket name set"

# EC2 Configuration
echo ""
echo "🖥️  Setting up EC2 secrets..."
set_secret "EC2_INSTANCE_ID" "i-046d4e1e286e3032d"
set_secret "EC2_HOST" "56.228.14.41"
set_secret "EC2_USER" "ubuntu"
echo "✅ EC2 details set"

# SSH Key Configuration
echo ""
echo "🔐 Setting up SSH key..."
SSH_KEY_PATH="$HOME/.ssh/lab1-todoapp-key.pem"

if [ -f "$SSH_KEY_PATH" ]; then
    echo "✅ Found SSH key at $SSH_KEY_PATH"
    set_secret "EC2_PRIVATE_KEY" "$(cat $SSH_KEY_PATH)"
    echo "✅ SSH private key set"
else
    echo "❌ SSH key not found at $SSH_KEY_PATH"
    echo "Please ensure the EC2 key pair is downloaded and saved to this location"
    exit 1
fi

echo ""
echo "🎉 All GitHub Secrets Set Successfully!"
echo "======================================"
echo ""
echo "✅ AWS_ACCESS_KEY_ID"
echo "✅ AWS_SECRET_ACCESS_KEY"
echo "✅ AWS_REGION"
echo "✅ S3_BUCKET"
echo "✅ EC2_INSTANCE_ID"
echo "✅ EC2_HOST"
echo "✅ EC2_USER"
echo "✅ EC2_PRIVATE_KEY"
echo ""
echo "⚠️  Still needed: Supabase secrets (add manually)"
echo "SUPABASE_DB_URL"
echo "SUPABASE_KEY"
echo "SUPABASE_URL"
echo ""
echo "🚀 Your CI/CD pipeline is ready!"
echo "Test it by pushing changes to main or 22-deploy-to-aws branch"
echo ""
echo "Deployment URLs:"
echo "• Client: http://lab1-todoapp.s3-website.eu-north-1.amazonaws.com"
echo "• Server: http://56.228.14.41/api"
