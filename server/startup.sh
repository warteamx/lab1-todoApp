#!/bin/bash
set -e

echo "🚀 Starting Lab1-TodoApp Server..."
echo "=================================="

# Check Node.js version
echo "📊 Node.js version: $(node --version)"
echo "📊 NPM version: $(npm --version)"

# Show current directory and files
echo "📁 Current directory: $(pwd)"
echo "📁 Directory contents:"
ls -la

# Check if dist directory exists
if [ -d "dist" ]; then
    echo "✅ dist directory exists"
    echo "📁 dist directory contents:"
    ls -la dist/
    
    if [ -f "dist/server.js" ]; then
        echo "✅ dist/server.js exists"
    else
        echo "❌ dist/server.js not found!"
        exit 1
    fi
else
    echo "❌ dist directory not found!"
    exit 1
fi

# Check environment variables
echo "🔧 Environment variables:"
echo "NODE_ENV: ${NODE_ENV:-not set}"
echo "PORT: ${PORT:-not set}"
echo "SUPABASE_URL: ${SUPABASE_URL:+configured}"
echo "SUPABASE_KEY: ${SUPABASE_KEY:+configured}"
echo "SUPABASE_DB_URL: ${SUPABASE_DB_URL:+configured}"

# Check if package.json exists
if [ -f "package.json" ]; then
    echo "✅ package.json exists"
else
    echo "❌ package.json not found!"
    exit 1
fi

# Start the application
echo "🚀 Starting application..."
exec node dist/server.js
