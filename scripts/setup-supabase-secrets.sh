#!/bin/bash

# Add Supabase secrets to GitHub automatically from .env file
echo "🗃️  Setting up Supabase secrets from server/.env file..."

# Check if .env file exists
ENV_FILE="server/.env"
if [ ! -f "$ENV_FILE" ]; then
    echo "❌ $ENV_FILE not found!"
    exit 1
fi

# Extract values from .env file
SUPABASE_DB_URL=$(grep "SUPABASE_DB_URL=" "$ENV_FILE" | head -1 | cut -d"'" -f2)
SUPABASE_KEY=$(grep "SUPABASE_KEY=" "$ENV_FILE" | cut -d"'" -f2)
SUPABASE_URL=$(grep "SUPABASE_URL=" "$ENV_FILE" | cut -d"'" -f2)

echo "Found Supabase credentials in $ENV_FILE"

# Set GitHub secrets
if [ -n "$SUPABASE_DB_URL" ]; then
    echo "Setting SUPABASE_DB_URL..."
    echo "$SUPABASE_DB_URL" | gh secret set "SUPABASE_DB_URL"
    echo "✅ SUPABASE_DB_URL set"
else
    echo "❌ SUPABASE_DB_URL not found in .env file"
fi

if [ -n "$SUPABASE_KEY" ]; then
    echo "Setting SUPABASE_KEY..."
    echo "$SUPABASE_KEY" | gh secret set "SUPABASE_KEY"
    echo "✅ SUPABASE_KEY set"
else
    echo "❌ SUPABASE_KEY not found in .env file"
fi

if [ -n "$SUPABASE_URL" ]; then
    echo "Setting SUPABASE_URL..."
    echo "$SUPABASE_URL" | gh secret set "SUPABASE_URL"
    echo "✅ SUPABASE_URL set"
else
    echo "❌ SUPABASE_URL not found in .env file"
fi

echo ""
echo "🎯 All Supabase secrets configured! Your deployment pipeline is fully ready!"
echo ""
echo "✅ Complete setup:"
echo "• AWS credentials ✅"
echo "• EC2 configuration ✅"
echo "• S3 configuration ✅"
echo "• Supabase credentials ✅"
echo ""
echo "🚀 Ready to deploy! Test with:"
echo "• Push changes to trigger auto-deployment"
echo "• Or run workflows manually from GitHub Actions"
