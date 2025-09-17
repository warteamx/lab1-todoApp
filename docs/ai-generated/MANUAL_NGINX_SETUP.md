# Manual Nginx HTTPS Setup Commands

If you prefer to run the commands manually instead of using the script, here are the step-by-step commands:

## Prerequisites
- Make sure your domain `api.lab1.warteamx.com` points to `56.228.14.41`
- Make sure your Node.js server is running on port 3000

## Step 1: SSH into your EC2 instance
```bash
ssh -i your-key.pem ubuntu@56.228.14.41
```

## Step 2: Update system and install packages
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install nginx -y
sudo apt install certbot python3-certbot-nginx -y
```

## Step 3: Start Nginx
```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```

## Step 4: Create Nginx configuration
```bash
sudo nano /etc/nginx/sites-available/lab1-api
```

Paste this configuration:
```nginx
server {
    listen 80;
    server_name api.lab1.warteamx.com;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Proxy settings
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Health check endpoint
    location /api/health {
        proxy_pass http://localhost:3000/api/health;
        access_log off;
    }

    # Let's Encrypt challenge location
    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }
}
```

## Step 5: Enable the site
```bash
sudo ln -sf /etc/nginx/sites-available/lab1-api /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

## Step 6: Test HTTP proxy
```bash
curl http://localhost/api/health
```

## Step 7: Obtain SSL certificate
```bash
sudo certbot --nginx -d api.lab1.warteamx.com
```

Follow the prompts:
1. Enter email: admin@warteamx.com (or your email)
2. Agree to terms: Y
3. Share email with EFF: Y or N (your choice)
4. Redirect HTTP to HTTPS: 2 (Yes, redirect)

## Step 8: Test HTTPS
```bash
curl https://api.lab1.warteamx.com/api/health
```

## Step 9: Set up automatic renewal
```bash
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
sudo certbot renew --dry-run
```

## Verification
Your API should now be available at:
- https://api.lab1.warteamx.com/api/health
- https://api.lab1.warteamx.com/api-docs/

## Troubleshooting Commands
```bash
# Check Nginx status
sudo systemctl status nginx

# Check SSL certificates
sudo certbot certificates

# Test Nginx configuration
sudo nginx -t

# View Nginx logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log

# Restart services
sudo systemctl restart nginx
```
