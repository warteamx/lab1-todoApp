#!/bin/bash

# Supabase GitHub Secrets Setup
# This script sets up Supabase secrets in GitHub from your server/.env file
# Make sure you have configured your server/.env file first

set -e

echo "🗃️  Setting up Supabase secrets from server/.env file..."

# Check if GitHub CLI is available
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed. Please install it first:"
    echo "   brew install gh  # macOS"
    echo "   Then run: gh auth login"
    exit 1
fi

if ! gh auth status &> /dev/null; then
    echo "❌ Not logged into GitHub CLI. Please run: gh auth login"
    exit 1
fi

# Check if .env file exists
ENV_FILE="server/.env"
if [ ! -f "$ENV_FILE" ]; then
    echo "❌ $ENV_FILE not found!"
    echo "💡 Please create server/.env from server/.env.example and configure your Supabase credentials"
    echo "   cp server/.env.example server/.env"
    echo "   # Then edit server/.env with your Supabase credentials"
    exit 1
fi

echo "✅ Found $ENV_FILE"

# Function to extract value from .env file
extract_env_value() {
    local key=$1
    local file=$2
    # Handle both quoted and unquoted values
    grep "^${key}=" "$file" | head -1 | cut -d'=' -f2- | sed 's/^["'\'']//' | sed 's/["'\'']$//'
}

# Extract values from .env file
SUPABASE_DB_URL=$(extract_env_value "SUPABASE_DB_URL" "$ENV_FILE")
SUPABASE_KEY=$(extract_env_value "SUPABASE_KEY" "$ENV_FILE")
SUPABASE_URL=$(extract_env_value "SUPABASE_URL" "$ENV_FILE")

echo "📋 Found Supabase configuration in $ENV_FILE"

# Validate that we have the required values
MISSING_VARS=()

if [ -z "$SUPABASE_DB_URL" ] || [ "$SUPABASE_DB_URL" = "your_supabase_database_direct_url" ]; then
    MISSING_VARS+=("SUPABASE_DB_URL")
fi

if [ -z "$SUPABASE_KEY" ] || [ "$SUPABASE_KEY" = "your_supabase_service_role_key" ]; then
    MISSING_VARS+=("SUPABASE_KEY")
fi

if [ -z "$SUPABASE_URL" ] || [ "$SUPABASE_URL" = "your_supabase_project_url" ]; then
    MISSING_VARS+=("SUPABASE_URL")
fi

if [ ${#MISSING_VARS[@]} -gt 0 ]; then
    echo "❌ Missing or incomplete Supabase configuration:"
    for var in "${MISSING_VARS[@]}"; do
        echo "   • $var"
    done
    echo ""
    echo "💡 Please update your server/.env file with actual Supabase credentials:"
    echo "   1. Go to https://supabase.com/dashboard"
    echo "   2. Select your project"
    echo "   3. Go to Settings > API"
    echo "   4. Copy your Project URL and service_role key"
    echo "   5. Go to Settings > Database"
    echo "   6. Copy your direct database URL"
    exit 1
fi

# Set GitHub secrets
echo ""
echo "🔐 Setting GitHub secrets..."

if [ -n "$SUPABASE_DB_URL" ]; then
    echo "Setting SUPABASE_DB_URL..."
    echo "$SUPABASE_DB_URL" | gh secret set "SUPABASE_DB_URL"
    echo "✅ SUPABASE_DB_URL set"
fi

if [ -n "$SUPABASE_KEY" ]; then
    echo "Setting SUPABASE_KEY..."
    echo "$SUPABASE_KEY" | gh secret set "SUPABASE_KEY"
    echo "✅ SUPABASE_KEY set"
fi

if [ -n "$SUPABASE_URL" ]; then
    echo "Setting SUPABASE_URL..."
    echo "$SUPABASE_URL" | gh secret set "SUPABASE_URL"
    echo "✅ SUPABASE_URL set"
fi

echo ""
echo "🎯 Supabase secrets configured successfully!"
echo ""
echo "✅ GitHub Secrets set:"
echo "• SUPABASE_DB_URL ✅"
echo "• SUPABASE_KEY ✅"
echo "• SUPABASE_URL ✅"
echo ""
echo "🚀 Your Supabase deployment pipeline is ready!"
echo ""
echo "� Next steps:"
echo "• Configure other deployment secrets (AWS, etc.) if needed"
echo "• Test your deployment by pushing changes to the main branch"
echo "• Monitor deployment in GitHub Actions"
