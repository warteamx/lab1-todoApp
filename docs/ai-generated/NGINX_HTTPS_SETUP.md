# Nginx HTTPS Setup with Let's Encrypt

## Overview

This guide sets up HTTPS for the API server using Nginx as a reverse proxy with Let's Encrypt SSL certificates. This is a cost-effective alternative to AWS Application Load Balancer.

## Architecture

```
https://api.lab1.warteamx.com → Nginx (SSL termination) → Node.js Server :3000 (HTTP)
```

## Prerequisites

- EC2 instance running with the Node.js server on port 3000
- Domain name pointing to your EC2 public IP: `api.lab1.warteamx.com`
- SSH access to the EC2 instance
- Port 80 and 443 open in security groups

## Step 1: Update Security Groups

Ensure your EC2 security group allows:

- **HTTP (80)**: For Let's Encrypt validation and HTTP to HTTPS redirect
- **HTTPS (443)**: For SSL traffic
- **Port 3000**: Only from localhost (for Nginx → Node.js communication)

```bash
# AWS CLI commands to update security group
aws ec2 authorize-security-group-ingress \
  --group-id sg-xxxxxxxxx \
  --protocol tcp \
  --port 80 \
  --cidr 0.0.0.0/0

aws ec2 authorize-security-group-ingress \
  --group-id sg-xxxxxxxxx \
  --protocol tcp \
  --port 443 \
  --cidr 0.0.0.0/0
```

## Step 2: Install Nginx and Certbot

SSH into your EC2 instance and run:

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Nginx
sudo apt install nginx -y

# Install certbot and nginx plugin
sudo apt install certbot python3-certbot-nginx -y

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Check Nginx status
sudo systemctl status nginx
```

## Step 3: Configure Nginx for HTTP (Initial Setup)

Create initial Nginx configuration:

```bash
sudo nano /etc/nginx/sites-available/lab1-api
```

Add the following configuration:

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

Enable the site:

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/lab1-api /etc/nginx/sites-enabled/

# Remove default site
sudo unlink /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

## Step 4: Obtain SSL Certificate with Let's Encrypt

```bash
# Obtain certificate (this will automatically modify Nginx config for HTTPS)
sudo certbot --nginx -d api.lab1.warteamx.com

# Follow the prompts:
# 1. Enter email address for notifications
# 2. Agree to terms of service
# 3. Choose whether to share email with EFF
# 4. Select redirect option (recommended: redirect HTTP to HTTPS)
```

## Step 5: Verify HTTPS Configuration

After certbot completes, your Nginx configuration will be automatically updated. Check the final configuration:

```bash
sudo cat /etc/nginx/sites-available/lab1-api
```

It should now include SSL configuration similar to:

```nginx
server {
    server_name api.lab1.warteamx.com;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

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

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/api.lab1.warteamx.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/api.lab1.warteamx.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = api.lab1.warteamx.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    listen 80;
    server_name api.lab1.warteamx.com;
    return 404; # managed by Certbot
}
```

## Step 6: Configure Automatic Certificate Renewal

Let's Encrypt certificates expire every 90 days. Set up automatic renewal:

```bash
# Test renewal process
sudo certbot renew --dry-run

# Check if renewal timer is active
sudo systemctl status certbot.timer

# Enable automatic renewal (should be enabled by default)
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer

# View renewal schedule
sudo systemctl list-timers | grep certbot
```

## Manual Certificate Renewal

If automatic renewal fails, you can manually renew certificates:

```bash
# Manual renewal
sudo certbot renew

# Force renewal (even if not close to expiration)
sudo certbot renew --force-renewal

# Renewal for specific domain
sudo certbot renew --cert-name api.lab1.warteamx.com

# After manual renewal, reload Nginx
sudo systemctl reload nginx
```

## Step 7: Testing and Verification

Test your HTTPS setup:

```bash
# Test SSL certificate
curl -I https://api.lab1.warteamx.com/api/health

# Test HTTP redirect
curl -I http://api.lab1.warteamx.com/api/health

# Check SSL rating
# Visit: https://www.ssllabs.com/ssltest/analyze.html?d=api.lab1.warteamx.com
```

## Monitoring and Logs

### Nginx Logs

```bash
# Access logs
sudo tail -f /var/log/nginx/access.log

# Error logs
sudo tail -f /var/log/nginx/error.log

# Check Nginx status
sudo systemctl status nginx
```

### Let's Encrypt Logs

```bash
# Certbot logs
sudo cat /var/log/letsencrypt/letsencrypt.log

# Check certificate status
sudo certbot certificates
```

## Troubleshooting

### Common Issues

1. **Certificate validation fails**:
   ```bash
   # Ensure domain points to your EC2 IP
   nslookup api.lab1.warteamx.com
   
   # Check if port 80 is accessible
   curl http://api.lab1.warteamx.com/.well-known/acme-challenge/test
   ```

2. **Nginx configuration errors**:
   ```bash
   # Test configuration
   sudo nginx -t
   
   # Check syntax errors
   sudo nginx -T
   ```

3. **Certificate not found**:
   ```bash
   # List certificates
   sudo certbot certificates
   
   # Check certificate files
   sudo ls -la /etc/letsencrypt/live/api.lab1.warteamx.com/
   ```

### Recovery Commands

```bash
# Restart services
sudo systemctl restart nginx
sudo systemctl restart certbot.timer

# Reset Nginx configuration
sudo cp /etc/nginx/sites-available/lab1-api.backup /etc/nginx/sites-available/lab1-api
sudo nginx -t && sudo systemctl reload nginx

# Emergency: Remove SSL and revert to HTTP
sudo certbot delete --cert-name api.lab1.warteamx.com
```

## Security Best Practices

1. **Regular Updates**:
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Firewall Configuration**:
   ```bash
   sudo ufw enable
   sudo ufw allow 22/tcp
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   ```

3. **Monitor Certificate Expiration**:
   ```bash
   # Add to cron for weekly checks
   echo "0 0 * * 0 /usr/bin/certbot renew --quiet && /bin/systemctl reload nginx" | sudo crontab -
   ```

## Cost Comparison

| Solution              | Monthly Cost | Setup Complexity | Maintenance |
| --------------------- | ------------ | ---------------- | ----------- |
| ALB + ACM             | ~$16         | Low              | Low         |
| Nginx + Let's Encrypt | $0           | Medium           | Medium      |

## Benefits of Nginx + Let's Encrypt

- ✅ **Free SSL certificates**
- ✅ **Full control over configuration**
- ✅ **High performance reverse proxy**
- ✅ **Automatic certificate renewal**
- ✅ **Advanced caching capabilities**
- ✅ **Detailed logging and monitoring**
- ✅ **No vendor lock-in**

## Next Steps

1. Update your application's API base URL to use HTTPS
2. Update CORS configuration to include the HTTPS domain
3. Test all API endpoints with HTTPS
4. Update CI/CD pipeline to use HTTPS endpoints
5. Monitor certificate renewal and system performance

## Emergency Contacts and Resources

- **Let's Encrypt Status**: https://letsencrypt.status.io/
- **Nginx Documentation**: https://nginx.org/en/docs/
- **Certbot Documentation**: https://certbot.eff.org/docs/
- **SSL Test Tool**: https://www.ssllabs.com/ssltest/
