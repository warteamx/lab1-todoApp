# AWS Setup Guide for CI/CD Deployment

## Prerequisites

- AWS CLI v2 installed and configured
- GitHub repository with admin access
- Domain name (optional, for custom domain)

## AWS CLI v2 Installation

### macOS Installation

```bash
# Download and install AWS CLI v2
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
sudo installer -pkg AWSCLIV2.pkg -target /
rm AWSCLIV2.pkg

# Verify installation
aws --version
```

### Alternative: Using Homebrew

```bash
brew install awscli
```

### Configure AWS CLI

```bash
aws configure
# Enter your AWS Access Key ID, Secret Access Key, default region, and output format
```

## 1. AWS Amplify Setup (Client Deployment)

### Create S3 Bucket

```bash
aws s3 mb s3://your-app-name-client --region us-east-1
```

### Create CloudFront Distribution

```bash
aws cloudfront create-distribution --distribution-config '{
  "CallerReference": "your-app-name-'$(date +%s)'",
  "DefaultRootObject": "index.html",
  "Origins": {
    "Quantity": 1,
    "Items": [{
      "Id": "S3-your-app-name-client",
      "DomainName": "your-app-name-client.s3.amazonaws.com",
      "S3OriginConfig": {
        "OriginAccessIdentity": ""
      }
    }]
  },
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-your-app-name-client",
    "ViewerProtocolPolicy": "redirect-to-https",
    "TrustedSigners": {
      "Enabled": false,
      "Quantity": 0
    },
    "ForwardedValues": {
      "QueryString": false,
      "Cookies": {"Forward": "none"}
    }
  },
  "Comment": "Client app distribution",
  "Enabled": true
}'
```

## 2. AWS ECR Setup (Server Docker Registry)

### Create ECR Repository

```bash
aws ecr create-repository --repository-name your-app-name-server --region us-east-1
```

### Get repository URI

```bash
aws ecr describe-repositories --repository-names your-app-name-server --query 'repositories[0].repositoryUri' --output text
```

## 3. AWS App Runner Setup (Server Deployment)

### Create App Runner Service

```bash
aws apprunner create-service --service-name your-app-name-server \
  --source-configuration '{
    "ImageRepository": {
      "ImageIdentifier": "YOUR_ECR_URI:latest",
      "ImageConfiguration": {
        "Port": "3000",
        "RuntimeEnvironmentVariables": {
          "NODE_ENV": "production"
        }
      },
      "ImageRepositoryType": "ECR"
    },
    "AutoDeploymentsEnabled": true
  }' \
  --instance-configuration '{
    "Cpu": "0.25 vCPU",
    "Memory": "0.5 GB"
  }'
```

## 4. IAM Setup

### Create IAM User for GitHub Actions

```bash
aws iam create-user --user-name github-actions-user
```

### Create IAM Policy

```bash
aws iam create-policy --policy-name GitHubActionsPolicy --policy-document '{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::your-app-name-client",
        "arn:aws:s3:::your-app-name-client/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateInvalidation"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "ecr:BatchCheckLayerAvailability",
        "ecr:GetDownloadUrlForLayer",
        "ecr:BatchGetImage",
        "ecr:GetAuthorizationToken",
        "ecr:PutImage",
        "ecr:InitiateLayerUpload",
        "ecr:UploadLayerPart",
        "ecr:CompleteLayerUpload"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "apprunner:StartDeployment"
      ],
      "Resource": "*"
    }
  ]
}'
```

### Attach Policy to User

```bash
aws iam attach-user-policy --user-name github-actions-user --policy-arn arn:aws:iam::YOUR_ACCOUNT_ID:policy/GitHubActionsPolicy
```

### Create Access Keys

```bash
aws iam create-access-key --user-name github-actions-user
```

## 5. GitHub Secrets Configuration

Add these secrets to your GitHub repository (Settings > Secrets and variables > Actions):

### Required Secrets

- `AWS_ACCESS_KEY_ID`: From IAM user access key
- `AWS_SECRET_ACCESS_KEY`: From IAM user secret key
- `AWS_REGION`: Your AWS region (e.g., us-east-1)
- `AMPLIFY_S3_BUCKET`: Your S3 bucket name
- `CLOUDFRONT_DISTRIBUTION_ID`: From CloudFront distribution
- `ECR_REPOSITORY`: Your ECR repository name
- `APP_RUNNER_SERVICE_ARN`: From App Runner service
- `EXPO_PUBLIC_API_URL`: Your server API URL

### Get Service ARNs

```bash
# Get App Runner service ARN
aws apprunner list-services --query 'ServiceSummaryList[?ServiceName==`your-app-name-server`].ServiceArn' --output text

# Get CloudFront distribution ID
aws cloudfront list-distributions --query 'DistributionList.Items[?Comment==`Client app distribution`].Id' --output text
```

## 6. Environment Variables

### Client (.env.local)

```
EXPO_PUBLIC_API_URL=https://your-app-runner-url.region.awsapprunner.com
```

### Server (.env)

```
NODE_ENV=production
PORT=3000
DATABASE_URL=your-database-url
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-key
```

## 7. Deployment Triggers

The workflows will automatically trigger on:

- Push to `main` branch with changes in `client/` or `server/` directories
- Manual trigger via GitHub Actions UI

## 8. Monitoring

### View App Runner Logs

```bash
aws logs describe-log-groups --log-group-name-prefix "/aws/apprunner/your-app-name-server"
```

### View CloudFront Metrics

```bash
aws cloudwatch get-metric-statistics --namespace AWS/CloudFront --metric-name Requests --dimensions Name=DistributionId,Value=YOUR_DISTRIBUTION_ID --start-time 2024-01-01T00:00:00Z --end-time 2024-01-02T00:00:00Z --period 3600 --statistics Sum
```

## Cost Optimization Tips

1. **App Runner**: Use minimum CPU/Memory for development
2. **CloudFront**: Enable compression and caching
3. **S3**: Enable lifecycle policies for old builds
4. **ECR**: Set up lifecycle policies to remove old images

## Troubleshooting

### Common Issues

1. **ECR Push Failed**: Check IAM permissions for ECR
2. **App Runner Deploy Failed**: Verify Docker image runs on port 3000
3. **CloudFront Not Updating**: Check invalidation status
4. **Build Failed**: Verify environment variables are set

### Debug Commands

```bash
# Check App Runner service status
aws apprunner describe-service --service-arn YOUR_SERVICE_ARN

# Check ECR repository
aws ecr describe-repositories --repository-names your-app-name-server

# Check S3 bucket contents
aws s3 ls s3://your-app-name-client --recursive
```
