#!/bin/bash

# Quick deployment script to copy and run Nginx setup on EC2
# Run this from your local machine

EC2_HOST="56.228.14.41"
EC2_USER="ubuntu"
EC2_KEY_PATH="$HOME/.ssh/lab1-todoapp-key.pem"

echo "🚀 Deploying Nginx HTTPS setup to EC2..."

# Check if key file exists
if [ ! -f "$EC2_KEY_PATH" ]; then
    echo "❌ EC2 key file not found at: $EC2_KEY_PATH"
    echo "Please update EC2_KEY_PATH in this script with the correct path to your .pem file"
    exit 1
fi

# Copy setup script to EC2
echo "📤 Copying setup script to EC2..."
scp -i "$EC2_KEY_PATH" scripts/setup-nginx-https.sh "$EC2_USER@$EC2_HOST:~/"

# Make it executable and run it
echo "🚀 Running setup script on EC2..."
ssh -i "$EC2_KEY_PATH" "$EC2_USER@$EC2_HOST" << 'EOF'
chmod +x ~/setup-nginx-https.sh
./setup-nginx-https.sh
EOF

echo "✅ Deployment completed!"
echo "🔗 Your API should now be available at: https://api.lab1.warteamx.com/api/health"
