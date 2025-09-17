#!/bin/bash

# Nginx HTTPS Setup Script for lab1-todoApp
# Run this script on your EC2 instance (56.228.14.41)

set -e

DOMAIN="api.lab1.warteamx.com"
NODE_PORT="3000"

echo "🚀 Setting up Nginx with HTTPS for $DOMAIN"
echo "📋 This script will:"
echo "   1. Install Nginx and Certbot"
echo "   2. Configure Nginx as reverse proxy"
echo "   3. Obtain SSL certificate with Let's Encrypt"
echo "   4. Set up automatic certificate renewal"
echo ""

# Check if running as root or with sudo
if [[ $EUID -eq 0 ]]; then
   echo "⚠️  This script should not be run as root. Please run as ubuntu user with sudo access."
   exit 1
fi

# Check if domain resolves to this server
echo "🔍 Checking DNS resolution for $DOMAIN..."
DOMAIN_IP=$(dig +short $DOMAIN | tail -n1)
SERVER_IP=$(curl -s http://checkip.amazonaws.com/)

if [ "$DOMAIN_IP" != "$SERVER_IP" ]; then
    echo "⚠️  WARNING: $DOMAIN resolves to $DOMAIN_IP but this server has IP $SERVER_IP"
    echo "   Please update your DNS before continuing."
    echo "   Do you want to continue anyway? (y/N)"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Update system packages
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Nginx
echo "🌐 Installing Nginx..."
sudo apt install nginx -y

# Install certbot and nginx plugin
echo "🔐 Installing Certbot..."
sudo apt install certbot python3-certbot-nginx -y

# Start and enable Nginx
echo "🚀 Starting Nginx..."
sudo systemctl start nginx
sudo systemctl enable nginx

# Check if Node.js server is running on port 3000
echo "🔍 Checking if Node.js server is running on port $NODE_PORT..."
if ! netstat -tuln | grep -q ":$NODE_PORT "; then
    echo "⚠️  WARNING: No service detected on port $NODE_PORT"
    echo "   Please make sure your Node.js server is running on port $NODE_PORT"
    echo "   Do you want to continue with Nginx setup? (y/N)"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Create Nginx configuration
echo "⚙️  Creating Nginx configuration..."
sudo tee /etc/nginx/sites-available/lab1-api > /dev/null <<EOF
server {
    listen 80;
    server_name $DOMAIN;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Proxy settings
    location / {
        proxy_pass http://localhost:$NODE_PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Health check endpoint
    location /api/health {
        proxy_pass http://localhost:$NODE_PORT/api/health;
        access_log off;
    }

    # Let's Encrypt challenge location
    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }
}
EOF

# Enable the site
echo "🔗 Enabling Nginx site..."
sudo ln -sf /etc/nginx/sites-available/lab1-api /etc/nginx/sites-enabled/

# Remove default site
sudo rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
echo "🧪 Testing Nginx configuration..."
sudo nginx -t

# Reload Nginx
echo "🔄 Reloading Nginx..."
sudo systemctl reload nginx

# Test HTTP access
echo "🌐 Testing HTTP access..."
if curl -f -s http://localhost/api/health > /dev/null 2>&1; then
    echo "✅ HTTP proxy is working"
else
    echo "⚠️  HTTP proxy test failed, but continuing with SSL setup..."
fi

# Obtain SSL certificate
echo "🔐 Obtaining SSL certificate for $DOMAIN..."
echo "📝 Certbot will ask for:"
echo "   1. Email address for notifications"
echo "   2. Agreement to terms of service"
echo "   3. Whether to share email with EFF (optional)"
echo "   4. Whether to redirect HTTP to HTTPS (recommended: yes)"
echo ""

sudo certbot --nginx -d $DOMAIN --non-interactive --agree-tos --email admin@warteamx.com --redirect

# Test SSL certificate
echo "🧪 Testing SSL certificate..."
if curl -f -s https://$DOMAIN/api/health > /dev/null 2>&1; then
    echo "✅ HTTPS is working correctly"
else
    echo "⚠️  HTTPS test failed, please check the configuration"
fi

# Set up automatic renewal
echo "⏰ Setting up automatic certificate renewal..."
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer

# Test renewal
echo "🧪 Testing certificate renewal..."
sudo certbot renew --dry-run

# Show final status
echo ""
echo "🎉 Nginx HTTPS setup completed!"
echo "📋 Summary:"
echo "   ✅ Nginx installed and configured"
echo "   ✅ SSL certificate obtained for $DOMAIN"
echo "   ✅ Automatic renewal configured"
echo "   ✅ HTTP redirects to HTTPS"
echo ""
echo "🔗 Your API is now available at:"
echo "   🌐 https://$DOMAIN/api/health"
echo "   📚 https://$DOMAIN/api-docs/"
echo ""
echo "📋 Next steps:"
echo "   1. Update your application to use https://$DOMAIN"
echo "   2. Update CORS settings in your Node.js app"
echo "   3. Test all API endpoints"
echo "   4. Update CI/CD pipeline"
echo ""
echo "🔍 Useful commands:"
echo "   sudo systemctl status nginx"
echo "   sudo certbot certificates"
echo "   sudo nginx -t"
echo "   curl -I https://$DOMAIN/api/health"
EOF
