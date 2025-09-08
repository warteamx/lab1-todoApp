#!/bin/bash

# Environment Setup Script for GitHub Template
# This script helps configure environment variables for development and production

set -e

echo "🔧 Environment Configuration Setup"
echo "===================================="

# Function to create env file if it doesn't exist
create_env_file() {
    local env_path=$1
    local example_path="${env_path}.example"

    if [ ! -f "$env_path" ] && [ -f "$example_path" ]; then
        echo "Creating $env_path from $example_path..."
        cp "$example_path" "$env_path"
        echo "✅ Created $env_path"
    elif [ -f "$env_path" ]; then
        echo "✅ $env_path already exists"
    else
        echo "❌ Neither $env_path nor $example_path found"
    fi
}

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "client" ] || [ ! -d "server" ]; then
    echo "❌ Please run this script from the project root directory"
    exit 1
fi

echo "✅ Project structure check passed"

# Setup client environment
echo ""
echo "📱 Setting up client environment..."
create_env_file "client/.env.local"

# Setup server environment
echo ""
echo "🖥️  Setting up server environment..."
create_env_file "server/.env"

echo ""
echo "📋 Next Steps:"
echo "=============="
echo ""
echo "1. Configure Supabase (if using):"
echo "   • Go to https://supabase.com and create a project"
echo "   • Copy your project URL and API keys"
echo "   • Update client/.env.local and server/.env with your Supabase credentials"
echo ""
echo "2. For production deployment:"
echo "   • Configure GitHub Secrets for your AWS/deployment credentials"
echo "   • Update ALLOWED_ORIGINS in server/.env for your production domains"
echo ""
echo "3. Start development:"
echo "   • Client: cd client && npm run dev"
echo "   • Server: cd server && npm run dev"
echo ""
echo "🎉 Environment setup complete!"
echo ""
echo "📖 For detailed setup instructions, see:"
echo "   • client/docs/INSTALLATION.md"
echo "   • server/docs/README.md"
