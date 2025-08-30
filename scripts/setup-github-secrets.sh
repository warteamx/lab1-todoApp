#!/bin/bash

# GitHub Secrets Setup Script for lab1-todoApp deployment
# This script helps set up all required GitHub secrets for AWS deployment

set -e

echo "🔧 GitHub Secrets Setup for AWS Deployment"
echo "==========================================="

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed. Please install it first:"
    echo "   brew install gh"
    echo "   Then run: gh auth login"
    exit 1
fi

# Check if logged into GitHub
if ! gh auth status &> /dev/null; then
    echo "❌ Not logged into GitHub CLI. Please run: gh auth login"
    exit 1
fi

echo "✅ GitHub CLI is ready"

# Check if we're in the right repository
if ! git remote get-url origin | grep -q "warteamx/lab1-todoApp"; then
    echo "❌ Please run this script from the lab1-todoApp repository"
    exit 1
fi

echo "✅ Repository check passed"

# AWS Configuration
echo ""
echo "📍 Setting up AWS secrets..."

# Get AWS credentials from current AWS CLI config
AWS_ACCESS_KEY_ID=$(aws configure get aws_access_key_id)
AWS_SECRET_ACCESS_KEY=$(aws configure get aws_secret_access_key)
AWS_REGION=$(aws configure get region)

if [ -z "$AWS_ACCESS_KEY_ID" ] || [ -z "$AWS_SECRET_ACCESS_KEY" ]; then
    echo "❌ AWS credentials not found in AWS CLI config"
    echo "   Please run: aws configure"
    exit 1
fi

gh secret set AWS_ACCESS_KEY_ID --body "$AWS_ACCESS_KEY_ID"
gh secret set AWS_SECRET_ACCESS_KEY --body "$AWS_SECRET_ACCESS_KEY"
gh secret set AWS_REGION --body "$AWS_REGION"

echo "✅ AWS credentials set"

# S3 Configuration
echo ""
echo "🪣 Setting up S3 secrets..."
gh secret set S3_BUCKET --body "lab1-todoapp"
echo "✅ S3 bucket name set"

# EC2 Configuration (requires manual input)
echo ""
echo "🖥️  EC2 Configuration"
echo "Please provide the following EC2 details:"

read -p "EC2 Instance ID (e.g., i-1234567890abcdef0): " EC2_INSTANCE_ID
read -p "EC2 Public IP/Host (e.g., 13.51.XX.XX): " EC2_HOST
read -p "EC2 User (default: ubuntu): " EC2_USER
EC2_USER=${EC2_USER:-ubuntu}

if [ -z "$EC2_INSTANCE_ID" ] || [ -z "$EC2_HOST" ]; then
    echo "❌ EC2 Instance ID and Host are required"
    exit 1
fi

gh secret set EC2_INSTANCE_ID --body "$EC2_INSTANCE_ID"
gh secret set EC2_HOST --body "$EC2_HOST"
gh secret set EC2_USER --body "$EC2_USER"

echo "✅ EC2 details set"

# SSH Key Configuration
echo ""
echo "🔐 SSH Key Configuration"
SSH_KEY_PATH="$HOME/.ssh/lab1-todoapp-key.pem"

if [ -f "$SSH_KEY_PATH" ]; then
    echo "✅ Found SSH key at $SSH_KEY_PATH"
    gh secret set EC2_PRIVATE_KEY --body "$(cat $SSH_KEY_PATH)"
    echo "✅ SSH private key set"
else
    echo "❌ SSH key not found at $SSH_KEY_PATH"
    echo "Please ensure the EC2 key pair is downloaded and saved to this location"
    echo "You can set it manually later with:"
    echo "  gh secret set EC2_PRIVATE_KEY --body \"\$(cat path/to/your/key.pem)\""
fi

# Supabase Configuration
echo ""
echo "🗃️  Supabase Configuration"
echo "Please provide your Supabase details:"

read -p "Supabase Database URL: " SUPABASE_DB_URL
read -p "Supabase API Key: " SUPABASE_KEY
read -p "Supabase Project URL: " SUPABASE_URL

if [ -n "$SUPABASE_DB_URL" ]; then
    gh secret set SUPABASE_DB_URL --body "$SUPABASE_DB_URL"
    echo "✅ Supabase DB URL set"
fi

if [ -n "$SUPABASE_KEY" ]; then
    gh secret set SUPABASE_KEY --body "$SUPABASE_KEY"
    echo "✅ Supabase API key set"
fi

if [ -n "$SUPABASE_URL" ]; then
    gh secret set SUPABASE_URL --body "$SUPABASE_URL"
    echo "✅ Supabase URL set"
fi

# CloudFront (optional)
echo ""
echo "🌐 CloudFront Configuration (Optional)"
read -p "CloudFront Distribution ID (optional, press Enter to skip): " CLOUDFRONT_DISTRIBUTION_ID

if [ -n "$CLOUDFRONT_DISTRIBUTION_ID" ]; then
    gh secret set CLOUDFRONT_DISTRIBUTION_ID --body "$CLOUDFRONT_DISTRIBUTION_ID"
    echo "✅ CloudFront distribution ID set"
fi

echo ""
echo "🎉 GitHub Secrets Setup Complete!"
echo "======================================"
echo ""
echo "Configured secrets:"
echo "✅ AWS_ACCESS_KEY_ID"
echo "✅ AWS_SECRET_ACCESS_KEY"
echo "✅ AWS_REGION ($AWS_REGION)"
echo "✅ S3_BUCKET (lab1-todoapp)"
echo "✅ EC2_INSTANCE_ID ($EC2_INSTANCE_ID)"
echo "✅ EC2_HOST ($EC2_HOST)"
echo "✅ EC2_USER ($EC2_USER)"

if [ -f "$SSH_KEY_PATH" ]; then
    echo "✅ EC2_PRIVATE_KEY"
else
    echo "❌ EC2_PRIVATE_KEY (needs manual setup)"
fi

if [ -n "$SUPABASE_DB_URL" ]; then
    echo "✅ SUPABASE_DB_URL"
fi

if [ -n "$SUPABASE_KEY" ]; then
    echo "✅ SUPABASE_KEY"
fi

if [ -n "$SUPABASE_URL" ]; then
    echo "✅ SUPABASE_URL"
fi

if [ -n "$CLOUDFRONT_DISTRIBUTION_ID" ]; then
    echo "✅ CLOUDFRONT_DISTRIBUTION_ID"
fi

echo ""
echo "🚀 You can now trigger deployments using GitHub Actions!"
echo "   Client: Push to main branch with changes in /client"
echo "   Server: Push to main branch with changes in /server"
echo "   Manual: Go to Actions tab and run workflows manually"
