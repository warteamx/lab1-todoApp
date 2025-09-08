# 🚀 Deployment Guide

Comprehensive deployment guide for Lab1-TodoApp covering both client and server deployment to production environments.

## 🎯 Overview

The Lab1-TodoApp deployment architecture consists of:

- **Client (Frontend)**: Static web app deployed to AWS S3 + CloudFront
- **Server (Backend)**: Docker container deployed to AWS EC2
- **Database**: Managed PostgreSQL via Supabase
- **CI/CD**: Automated deployment through GitHub Actions

## 🏗️ Architecture

### Production Environment

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Client (Web)  │    │  Server (API)   │    │   Database      │
│   AWS S3 +      │────│   AWS EC2 +     │────│   Supabase      │
│   CloudFront    │    │   Docker        │    │   PostgreSQL    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Current Deployment URLs

- **Client**: https://lab1.warteamx.com
- **Client (S3)**: http://lab1-todoapp.s3-website.eu-north-1.amazonaws.com
- **Server API**: http://56.228.14.41/api
- **API Documentation**: http://56.228.14.41/api-docs
- **Health Check**: http://56.228.14.41/api/health

## 🔧 Prerequisites

### Required Accounts & Services

1. **AWS Account** - For S3, CloudFront, and EC2 hosting
2. **Supabase Account** - For PostgreSQL database
3. **GitHub Account** - For repository and CI/CD
4. **Domain Provider** - For custom domain (optional)

### Required Tools

```bash
# AWS CLI
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
sudo installer -pkg AWSCLIV2.pkg -target /

# Expo CLI
npm install -g @expo/cli

# Docker
# Download from https://docker.com/products/docker-desktop
```

## 🌐 Client Deployment (Frontend)

### 1. Environment Setup

**Local Development (.env.local)**

```bash
EXPO_PUBLIC_API_URL=http://localhost:3000
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Production (GitHub Secrets)**

```bash
EXPO_PUBLIC_API_URL=http://56.228.14.41/api
EXPO_PUBLIC_SUPABASE_URL=your_production_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_production_supabase_anon_key
```

### 2. Build for Web

```bash
cd client

# Install dependencies
npm install

# Build for web production
npm run build

# Test production build locally
npx serve web-build
```

### 3. AWS S3 Setup

**Create S3 Bucket**

```bash
aws s3 mb s3://your-app-name-client
aws s3 website s3://your-app-name-client --index-document index.html --error-document index.html
```

**Configure Bucket Policy**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-app-name-client/*"
    }
  ]
}
```

### 4. Deploy to S3

```bash
# Sync build to S3
aws s3 sync web-build/ s3://your-app-name-client --delete

# Enable static website hosting
aws s3 website s3://your-app-name-client --index-document index.html
```

### 5. CloudFront Setup (Optional)

For CDN, HTTPS, and custom domain:

```bash
# Create CloudFront distribution
aws cloudfront create-distribution --distribution-config file://cloudfront-config.json
```

## 🖥️ Server Deployment (Backend)

### 1. Environment Setup

**Production (.env)**

```bash
NODE_ENV=production
PORT=3000
SUPABASE_URL=your_production_supabase_url
SUPABASE_KEY=your_production_service_role_key
SUPABASE_DB_URL=your_production_database_url
ALLOWED_ORIGINS=https://lab1.warteamx.com,http://lab1-todoapp.s3-website.eu-north-1.amazonaws.com
```

### 2. Docker Build

```bash
cd server

# Build Docker image
docker build -t lab1-todoapp-server .

# Test locally
docker run -p 3000:3000 --env-file .env lab1-todoapp-server
```

### 3. AWS EC2 Setup

**Launch EC2 Instance**

```bash
# Create security group
aws ec2 create-security-group --group-name lab1-todoapp-sg --description "Security group for Lab1 TodoApp"

# Add inbound rules
aws ec2 authorize-security-group-ingress --group-name lab1-todoapp-sg --protocol tcp --port 22 --cidr 0.0.0.0/0
aws ec2 authorize-security-group-ingress --group-name lab1-todoapp-sg --protocol tcp --port 3000 --cidr 0.0.0.0/0
aws ec2 authorize-security-group-ingress --group-name lab1-todoapp-sg --protocol tcp --port 80 --cidr 0.0.0.0/0

# Launch instance
aws ec2 run-instances --image-id ami-0abcdef1234567890 --count 1 --instance-type t3.micro --key-name your-key-pair --security-groups lab1-todoapp-sg
```

### 4. Deploy to EC2

**Manual Deployment**

```bash
# Copy files to server
scp -i your-key.pem server/* ec2-user@your-ec2-ip:~/app/

# SSH into server
ssh -i your-key.pem ec2-user@your-ec2-ip

# Install Docker
sudo yum update -y
sudo yum install -y docker
sudo service docker start
sudo usermod -a -G docker ec2-user

# Build and run
cd ~/app
docker build -t lab1-todoapp-server .
docker run -d -p 3000:3000 --env-file .env --name lab1-app lab1-todoapp-server
```

## 🤖 Automated CI/CD Deployment

### GitHub Actions Configuration

**Required GitHub Secrets**

```bash
# AWS Configuration
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=eu-north-1

# S3 Configuration
S3_BUCKET=lab1-todoapp

# EC2 Configuration
EC2_HOST=56.228.14.41
EC2_USER=ec2-user
EC2_SSH_KEY=your_private_ssh_key

# Supabase Configuration
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_KEY=your_service_role_key
SUPABASE_DB_URL=your_database_url
```

### Workflow Process

1. **Code Push to Main**
   - Trigger GitHub Actions workflow
   - Run tests for client and server
   - Build applications

2. **Semantic Release**
   - Analyze commits for version bump
   - Update package.json files
   - Generate changelog
   - Create GitHub release

3. **Client Deployment**
   - Build Expo web app
   - Deploy to AWS S3
   - Invalidate CloudFront cache

4. **Server Deployment**
   - Build Docker image
   - Deploy to AWS EC2
   - Restart application service

## 🗄️ Database Setup (Supabase)

### 1. Create Supabase Project

```bash
# Install Supabase CLI
npm install -g supabase

# Login and create project
supabase login
supabase projects create your-project-name
```

### 2. Database Schema

```sql
-- Create tables
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE todos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  title VARCHAR NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can view own todos" ON todos FOR ALL USING (auth.uid() = user_id);
```

### 3. Configure Authentication

```bash
# Enable email/password auth in Supabase dashboard
# Configure OAuth providers (optional)
# Set up email templates
```

## 🔒 Security Configuration

### Environment Variables

**Never commit secrets to Git:**

```bash
# Client secrets (public)
EXPO_PUBLIC_API_URL=https://your-api-domain.com
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJ... # Anon key is safe to expose

# Server secrets (private)
SUPABASE_KEY=eyJ... # Service role key - NEVER expose
SUPABASE_DB_URL=postgresql://... # Database URL - NEVER expose
JWT_SECRET=your_jwt_secret # If using custom JWT
```

### CORS Configuration

**Server CORS Settings**

```typescript
// server/src/middleware/cors.ts
const allowedOrigins = [
  'https://lab1.warteamx.com',
  'http://lab1-todoapp.s3-website.eu-north-1.amazonaws.com',
  'http://localhost:8081', // Development
  'http://localhost:19006', // Development
];
```

### SSL/HTTPS Setup

**For Custom Domain:**

```bash
# Use AWS Certificate Manager
aws acm request-certificate --domain-name your-domain.com --validation-method DNS

# Configure CloudFront with SSL certificate
# Update DNS records to point to CloudFront
```

## 📊 Monitoring & Health Checks

### Health Check Endpoints

**Server Health Check**

```bash
# Basic health check
curl http://56.228.14.41/api/health

# Detailed health check
curl http://56.228.14.41/api/health/detailed
```

**Response Example**

```json
{
  "status": "healthy",
  "timestamp": "2025-09-08T10:00:00.000Z",
  "version": "1.2.3",
  "environment": "production",
  "uptime": 86400,
  "database": "connected",
  "memory": {
    "used": "45MB",
    "total": "512MB"
  }
}
```

### Logging

**Server Logging**

```typescript
// Structured logging with Winston
logger.info('User authenticated', {
  userId: user.id,
  email: user.email,
  timestamp: new Date().toISOString(),
});
```

**Log Aggregation (Optional)**

- AWS CloudWatch Logs
- ELK Stack (Elasticsearch, Logstash, Kibana)
- DataDog or New Relic

## 🔄 Rollback Procedures

### Client Rollback

```bash
# Revert to previous S3 deployment
aws s3 sync s3://backup-bucket/v1.2.2/ s3://lab1-todoapp/ --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

### Server Rollback

```bash
# SSH into EC2 instance
ssh -i your-key.pem ec2-user@56.228.14.41

# Stop current container
docker stop lab1-app

# Run previous version
docker run -d -p 3000:3000 --env-file .env --name lab1-app lab1-todoapp-server:v1.2.2
```

### Database Rollback

```bash
# Use Supabase dashboard to restore from backup
# Or run migration rollback scripts
supabase migration down
```

## 🚨 Troubleshooting

### Common Issues

**1. Build Failures**

```bash
# Clear cache and rebuild
npm run clean
npm install
npm run build
```

**2. Environment Variable Issues**

```bash
# Check environment loading
node -e "console.log(process.env.EXPO_PUBLIC_API_URL)"

# Verify GitHub Secrets
gh secret list
```

**3. CORS Errors**

```bash
# Check server CORS configuration
curl -H "Origin: https://lab1.warteamx.com" -H "Access-Control-Request-Method: GET" -X OPTIONS http://56.228.14.41/api/health
```

**4. Database Connection Issues**

```bash
# Test database connection
psql "your_supabase_db_url"

# Check Supabase status
curl https://status.supabase.com
```

### Debug Commands

```bash
# Check deployment status
aws s3 ls s3://lab1-todoapp/
aws ec2 describe-instances --instance-ids i-1234567890abcdef0

# View server logs
ssh -i your-key.pem ec2-user@56.228.14.41
docker logs lab1-app

# Test connectivity
curl -v http://56.228.14.41/api/health
```

## 📚 Additional Resources

- [AWS S3 Static Website Hosting](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
- [AWS EC2 Getting Started](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html)
- [Supabase Documentation](https://supabase.com/docs)
- [Expo Web Deployment](https://docs.expo.dev/distribution/publishing-websites/)
- [Docker Documentation](https://docs.docker.com/)

---

This deployment guide provides a complete production-ready setup for the Lab1-TodoApp template. For specific customizations or advanced configurations, refer to the respective service documentation.
