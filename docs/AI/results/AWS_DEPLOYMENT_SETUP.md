# AWS Deployment Setup Requirements

## Current Status
✅ AWS CLI configured with eu-north-1 region  
❌ AWS permissions limited - requires manual setup for EC2 and IAM operations  
✅ S3 access appears to be working  
✅ GitHub MCP access available  

## Required AWS Permissions

Your current AWS user `aws-iam-martin-vscode` lacks the following permissions needed for automated deployment:

### Required IAM Policies
You need to attach these policies to your IAM user (or create a new deployment user):

1. **EC2FullAccess** - For creating and managing EC2 instances
2. **AmazonS3FullAccess** - For S3 bucket operations  
3. **CloudFrontFullAccess** - For CDN distribution
4. **IAMReadOnlyAccess** - For basic IAM operations
5. **AWSKeyManagementServicePowerUser** - For managing security keys

### Manual Steps Required

#### 1. Create EC2 Key Pair
Since automated creation failed, please create manually:

```bash
# Go to AWS Console > EC2 > Key Pairs > Create Key Pair
# Name: lab1-todoapp-key
# Type: RSA
# Format: .pem
# Download and save to ~/.ssh/lab1-todoapp-key.pem
# Set permissions: chmod 400 ~/.ssh/lab1-todoapp-key.pem
```

#### 2. Create S3 Bucket
```bash
# This should work with current permissions:
aws s3 mb s3://lab1-todoapp --region eu-north-1
```

#### 3. Create Security Group for EC2
```bash
# Create security group (if you have permissions):
aws ec2 create-security-group \
    --group-name lab1-todoapp-sg \
    --description "Security group for lab1-todoapp deployment" \
    --region eu-north-1

# Allow HTTP traffic:
aws ec2 authorize-security-group-ingress \
    --group-name lab1-todoapp-sg \
    --protocol tcp \
    --port 80 \
    --cidr 0.0.0.0/0 \
    --region eu-north-1

# Allow HTTPS traffic:
aws ec2 authorize-security-group-ingress \
    --group-name lab1-todoapp-sg \
    --protocol tcp \
    --port 443 \
    --cidr 0.0.0.0/0 \
    --region eu-north-1

# Allow SSH access:
aws ec2 authorize-security-group-ingress \
    --group-name lab1-todoapp-sg \
    --protocol tcp \
    --port 22 \
    --cidr 0.0.0.0/0 \
    --region eu-north-1
```

#### 4. Launch EC2 Instance
```bash
# Find Ubuntu AMI ID for eu-north-1:
aws ec2 describe-images \
    --owners 099720109477 \
    --filters 'Name=name,Values=ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*' \
    --region eu-north-1 \
    --query 'sort_by(Images, &CreationDate)[-1].ImageId' \
    --output text

# Launch instance (replace AMI_ID with result from above):
aws ec2 run-instances \
    --image-id AMI_ID \
    --count 1 \
    --instance-type t3.micro \
    --key-name lab1-todoapp-key \
    --security-groups lab1-todoapp-sg \
    --region eu-north-1 \
    --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=lab1-todoapp-server}]'
```

## Alternative: Use AWS Console

If CLI commands fail due to permissions, use AWS Console:

1. **EC2 Console**: Create key pair, security group, and launch instance
2. **S3 Console**: Create bucket `lab1-todoapp` in eu-north-1
3. **IAM Console**: Attach required policies to your user

## GitHub Secrets Configuration

Once AWS resources are created, I can help you set up these GitHub secrets:

### Required Secrets:
- `AWS_ACCESS_KEY_ID` - Your AWS access key
- `AWS_SECRET_ACCESS_KEY` - Your AWS secret key  
- `AWS_REGION` - eu-north-1
- `EC2_INSTANCE_ID` - From EC2 instance creation
- `EC2_HOST` - Public IP of EC2 instance
- `EC2_USER` - ubuntu (for Ubuntu AMI)
- `EC2_PRIVATE_KEY` - Contents of ~/.ssh/lab1-todoapp-key.pem
- `S3_BUCKET` - lab1-todoapp
- `SUPABASE_DB_URL` - Your Supabase database URL
- `SUPABASE_KEY` - Your Supabase API key
- `SUPABASE_URL` - Your Supabase project URL

## Next Steps

1. Complete the manual AWS setup above
2. Let me know when resources are created
3. I'll proceed with creating GitHub Actions workflows
4. I'll help configure GitHub secrets
5. Test the deployment pipeline

## Estimated Costs (Free Tier)

- **EC2 t3.micro**: Free for 750 hours/month (first 12 months)
- **S3**: 5GB free storage
- **CloudFront**: 1TB data transfer free (first 12 months)
- **Data Transfer**: 100GB free per month

Would you like me to help with any specific part of this setup, or do you prefer to complete these steps manually first?
