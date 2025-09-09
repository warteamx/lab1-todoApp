# AWS Application Load Balancer HTTPS Setup

## Overview

This guide sets up HTTPS for the API server using AWS Application Load Balancer (ALB) with SSL certificate.

## Architecture

```
https://api.lab1.warteamx.com → ALB (SSL termination) → EC2:3000 (HTTP)
```

## Step 1: Create SSL Certificate

1. Go to **AWS Certificate Manager**
2. Click **Request a certificate**
3. Choose **Request a public certificate**
4. Domain name: `api.lab1.warteamx.com`
5. Validation method: **DNS validation**
6. Add CNAME record to your DNS provider

## Step 2: Create Application Load Balancer

1. Go to **EC2 → Load Balancers**
2. Click **Create Load Balancer**
3. Choose **Application Load Balancer**
4. Configure:
   - Name: `lab1-api-alb`
   - Scheme: **Internet-facing**
   - VPC: Default VPC
   - Subnets: Select 2+ availability zones

## Step 3: Configure Target Group

1. Create target group:
   - Name: `lab1-api-targets`
   - Target type: **Instances**
   - Protocol: **HTTP**
   - Port: **3000**
   - Health check path: `/api/health`

2. Register EC2 instance:
   - Select your EC2 instance
   - Port: **3000**

## Step 4: Configure Listeners

1. **HTTPS Listener (443)**:
   - Protocol: **HTTPS**
   - Port: **443**
   - SSL certificate: Select your certificate
   - Default action: Forward to target group

2. **HTTP Listener (80)** - Redirect to HTTPS:
   - Protocol: **HTTP**
   - Port: **80**
   - Default action: **Redirect to HTTPS**

## Step 5: Update DNS

Update your DNS to point:

```
api.lab1.warteamx.com → ALB DNS name
```

## Step 6: Update Application Configuration

### Update OpenAPI servers:

```typescript
servers: [
  {
    url: 'http://localhost:3000',
    description: 'Local development server',
  },
  {
    url: 'https://api.lab1.warteamx.com',
    description: 'Production API server',
  },
],
```

### Update CORS origins:

```typescript
const allowedOrigins = [
  'https://lab1.warteamx.com',
  'http://lab1-todoapp.s3-website.eu-north-1.amazonaws.com',
  'https://api.lab1.warteamx.com', // Add API domain for Swagger UI
];
```

### Update CI/CD deployment:

```yaml
- name: 🔄 Update Server on EC2
  run: |
    # ... existing deployment ...
    -e ALLOWED_ORIGINS="https://lab1.warteamx.com,https://api.lab1.warteamx.com"
```

## Step 7: Security Group Updates

Ensure EC2 security group allows:

- **Port 3000** from ALB security group
- **Port 80/443** from ALB (if ALB in same VPC)

## Verification

1. Check certificate: `https://api.lab1.warteamx.com/api/health`
2. Test Swagger UI: `https://api.lab1.warteamx.com/api-docs/`
3. Verify API calls work in Swagger UI

## Cost Estimate

- **Application Load Balancer**: ~$16/month
- **SSL Certificate**: Free (AWS Certificate Manager)
- **Data transfer**: Minimal additional cost

## Benefits

- ✅ Professional HTTPS setup
- ✅ Automatic SSL certificate management
- ✅ Scalable (can add more EC2 instances)
- ✅ AWS-managed infrastructure
- ✅ Proper security headers
- ✅ Swagger UI works without mixed content issues
