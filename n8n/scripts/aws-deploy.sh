#!/bin/bash

# ==============================================
# AWS EC2 Deployment Script for n8n
# ==============================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
AWS_REGION="${AWS_REGION:-us-east-1}"
EC2_KEY_NAME="${EC2_KEY_NAME:-n8n-key}"
SECURITY_GROUP_NAME="n8n-security-group"
INSTANCE_TYPE="${INSTANCE_TYPE:-t3.medium}"
AMI_ID="${AMI_ID:-ami-0c02fb55956c7d316}"  # Amazon Linux 2023
DOMAIN="${DOMAIN:-}"
EMAIL="${EMAIL:-}"

# Functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

check_aws_cli() {
    if ! command -v aws &> /dev/null; then
        log_error "AWS CLI is not installed. Please install it first."
        log_info "Installation guide: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html"
        exit 1
    fi
    
    if ! aws sts get-caller-identity &> /dev/null; then
        log_error "AWS CLI is not configured. Run 'aws configure' first."
        exit 1
    fi
    
    log_success "AWS CLI check passed"
}

create_security_group() {
    log_info "Creating security group..."
    
    # Check if security group already exists
    if aws ec2 describe-security-groups --group-names "$SECURITY_GROUP_NAME" --region "$AWS_REGION" &> /dev/null; then
        log_info "Security group '$SECURITY_GROUP_NAME' already exists"
        return 0
    fi
    
    # Create security group
    SECURITY_GROUP_ID=$(aws ec2 create-security-group \
        --group-name "$SECURITY_GROUP_NAME" \
        --description "Security group for n8n automation platform" \
        --region "$AWS_REGION" \
        --output text --query 'GroupId')
    
    # Add inbound rules
    aws ec2 authorize-security-group-ingress \
        --group-id "$SECURITY_GROUP_ID" \
        --protocol tcp \
        --port 22 \
        --cidr 0.0.0.0/0 \
        --region "$AWS_REGION"
    
    aws ec2 authorize-security-group-ingress \
        --group-id "$SECURITY_GROUP_ID" \
        --protocol tcp \
        --port 80 \
        --cidr 0.0.0.0/0 \
        --region "$AWS_REGION"
    
    aws ec2 authorize-security-group-ingress \
        --group-id "$SECURITY_GROUP_ID" \
        --protocol tcp \
        --port 443 \
        --cidr 0.0.0.0/0 \
        --region "$AWS_REGION"
    
    aws ec2 authorize-security-group-ingress \
        --group-id "$SECURITY_GROUP_ID" \
        --protocol tcp \
        --port 5678 \
        --cidr 0.0.0.0/0 \
        --region "$AWS_REGION"
    
    log_success "Security group created: $SECURITY_GROUP_ID"
}

create_key_pair() {
    log_info "Creating EC2 key pair..."
    
    # Check if key pair already exists
    if aws ec2 describe-key-pairs --key-names "$EC2_KEY_NAME" --region "$AWS_REGION" &> /dev/null; then
        log_info "Key pair '$EC2_KEY_NAME' already exists"
        return 0
    fi
    
    # Create key pair and save private key
    aws ec2 create-key-pair \
        --key-name "$EC2_KEY_NAME" \
        --region "$AWS_REGION" \
        --query 'KeyMaterial' \
        --output text > "${EC2_KEY_NAME}.pem"
    
    chmod 400 "${EC2_KEY_NAME}.pem"
    
    log_success "Key pair created and saved as ${EC2_KEY_NAME}.pem"
    log_warning "Keep this key file secure! You'll need it to SSH into your instance."
}

create_instance() {
    log_info "Creating EC2 instance..."
    
    # Create user data script
    cat > user-data.sh << 'EOF'
#!/bin/bash
yum update -y

# Install Docker
yum install -y docker
systemctl start docker
systemctl enable docker
usermod -a -G docker ec2-user

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose

# Install Git
yum install -y git

# Create n8n directory
mkdir -p /home/ec2-user/n8n
chown ec2-user:ec2-user /home/ec2-user/n8n

# Install certbot for Let's Encrypt
yum install -y python3 python3-pip
pip3 install certbot certbot-nginx

echo "EC2 instance setup complete" > /home/ec2-user/setup-complete.log
EOF

    # Launch EC2 instance
    INSTANCE_ID=$(aws ec2 run-instances \
        --image-id "$AMI_ID" \
        --count 1 \
        --instance-type "$INSTANCE_TYPE" \
        --key-name "$EC2_KEY_NAME" \
        --security-groups "$SECURITY_GROUP_NAME" \
        --user-data file://user-data.sh \
        --region "$AWS_REGION" \
        --tag-specifications "ResourceType=instance,Tags=[{Key=Name,Value=n8n-automation},{Key=Project,Value=lab1-todoApp}]" \
        --output text --query 'Instances[0].InstanceId')
    
    log_success "EC2 instance created: $INSTANCE_ID"
    
    # Wait for instance to be running
    log_info "Waiting for instance to be running..."
    aws ec2 wait instance-running --instance-ids "$INSTANCE_ID" --region "$AWS_REGION"
    
    # Get public IP
    PUBLIC_IP=$(aws ec2 describe-instances \
        --instance-ids "$INSTANCE_ID" \
        --region "$AWS_REGION" \
        --query 'Reservations[0].Instances[0].PublicIpAddress' \
        --output text)
    
    log_success "Instance is running at: $PUBLIC_IP"
    
    # Save instance info
    echo "INSTANCE_ID=$INSTANCE_ID" > instance-info.env
    echo "PUBLIC_IP=$PUBLIC_IP" >> instance-info.env
    echo "SECURITY_GROUP_NAME=$SECURITY_GROUP_NAME" >> instance-info.env
    echo "EC2_KEY_NAME=$EC2_KEY_NAME" >> instance-info.env
    
    # Clean up
    rm user-data.sh
}

deploy_to_instance() {
    if [ ! -f "instance-info.env" ]; then
        log_error "instance-info.env not found. Run create-instance first."
        exit 1
    fi
    
    source instance-info.env
    
    log_info "Deploying n8n to EC2 instance..."
    
    # Wait for SSH to be available
    log_info "Waiting for SSH access..."
    sleep 60
    
    # Test SSH connection
    until ssh -i "${EC2_KEY_NAME}.pem" -o ConnectTimeout=10 -o StrictHostKeyChecking=no ec2-user@"$PUBLIC_IP" echo "SSH connection successful"; do
        log_info "Waiting for SSH to be available..."
        sleep 10
    done
    
    # Copy n8n files to instance
    log_info "Copying n8n configuration to instance..."
    
    # Create archive of n8n directory (excluding backups and logs)
    tar -czf n8n-config.tar.gz \
        --exclude='backups' \
        --exclude='*.log' \
        --exclude='.git' \
        -C .. n8n/
    
    # Copy to instance
    scp -i "${EC2_KEY_NAME}.pem" -o StrictHostKeyChecking=no n8n-config.tar.gz ec2-user@"$PUBLIC_IP":/home/ec2-user/
    
    # Extract and deploy on instance
    ssh -i "${EC2_KEY_NAME}.pem" -o StrictHostKeyChecking=no ec2-user@"$PUBLIC_IP" << 'REMOTE_COMMANDS'
cd /home/ec2-user
tar -xzf n8n-config.tar.gz
cd n8n

# Update environment for production
if [ ! -f .env ]; then
    cp .env.example .env
    
    # Generate secure passwords
    DB_PASSWORD=$(openssl rand -hex 32)
    ADMIN_PASSWORD=$(openssl rand -hex 16)
    
    # Update environment file
    sed -i "s/your_secure_password_here/$DB_PASSWORD/" .env
    sed -i "s/your_admin_password_here/$ADMIN_PASSWORD/" .env
    sed -i "s/localhost/$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)/" .env
    
    echo "Admin Password: $ADMIN_PASSWORD" > /home/ec2-user/n8n-credentials.txt
    chmod 600 /home/ec2-user/n8n-credentials.txt
fi

# Deploy n8n
chmod +x scripts/deploy.sh
./scripts/deploy.sh setup
./scripts/deploy.sh dev

echo "n8n deployment complete" > /home/ec2-user/deployment-complete.log
REMOTE_COMMANDS

    # Clean up
    rm n8n-config.tar.gz
    
    log_success "n8n deployed successfully!"
    log_info "Access n8n at: http://$PUBLIC_IP:5678"
    log_info "SSH to instance: ssh -i ${EC2_KEY_NAME}.pem ec2-user@$PUBLIC_IP"
    
    # Show credentials
    log_info "Retrieving admin credentials..."
    ssh -i "${EC2_KEY_NAME}.pem" -o StrictHostKeyChecking=no ec2-user@"$PUBLIC_IP" cat /home/ec2-user/n8n-credentials.txt
}

setup_ssl() {
    if [ -z "$DOMAIN" ] || [ -z "$EMAIL" ]; then
        log_error "DOMAIN and EMAIL environment variables are required for SSL setup"
        log_info "Example: DOMAIN=n8n.yourdomain.com EMAIL=you@email.com $0 setup-ssl"
        exit 1
    fi
    
    if [ ! -f "instance-info.env" ]; then
        log_error "instance-info.env not found. Run create-instance first."
        exit 1
    fi
    
    source instance-info.env
    
    log_info "Setting up SSL certificate for $DOMAIN..."
    
    # Setup SSL on instance
    ssh -i "${EC2_KEY_NAME}.pem" -o StrictHostKeyChecking=no ec2-user@"$PUBLIC_IP" << REMOTE_SSL
# Install certbot
sudo yum install -y python3 python3-pip
pip3 install --user certbot

# Stop nginx if running
cd n8n
docker-compose stop nginx || true

# Get certificate
sudo ~/.local/bin/certbot certonly --standalone \
    --email $EMAIL \
    --agree-tos \
    --no-eff-email \
    -d $DOMAIN

# Copy certificates to n8n directory
sudo cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem ssl/
sudo cp /etc/letsencrypt/live/$DOMAIN/privkey.pem ssl/
sudo chown ec2-user:ec2-user ssl/*.pem

# Update environment file
sed -i "s/N8N_HOST=.*/N8N_HOST=$DOMAIN/" .env
sed -i "s/N8N_PROTOCOL=.*/N8N_PROTOCOL=https/" .env
sed -i "s#WEBHOOK_URL=.*#WEBHOOK_URL=https://$DOMAIN#" .env

# Restart with SSL
./scripts/deploy.sh restart prod

echo "SSL setup complete" > /home/ec2-user/ssl-setup-complete.log
REMOTE_SSL

    log_success "SSL certificate installed!"
    log_info "Access n8n at: https://$DOMAIN"
}

cleanup() {
    if [ ! -f "instance-info.env" ]; then
        log_warning "instance-info.env not found. Nothing to cleanup."
        return 0
    fi
    
    source instance-info.env
    
    log_warning "This will terminate the EC2 instance and delete all data!"
    read -p "Are you sure? (y/N): " -n 1 -r
    echo
    
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        log_info "Cleanup cancelled."
        return 0
    fi
    
    log_info "Terminating EC2 instance..."
    aws ec2 terminate-instances --instance-ids "$INSTANCE_ID" --region "$AWS_REGION"
    
    log_info "Deleting security group..."
    aws ec2 delete-security-group --group-name "$SECURITY_GROUP_NAME" --region "$AWS_REGION" || true
    
    log_info "Deleting key pair..."
    aws ec2 delete-key-pair --key-name "$EC2_KEY_NAME" --region "$AWS_REGION" || true
    rm -f "${EC2_KEY_NAME}.pem"
    
    # Clean up local files
    rm -f instance-info.env
    
    log_success "Cleanup complete!"
}

show_help() {
    echo "AWS EC2 Deployment Script for n8n"
    echo
    echo "Usage: $0 [COMMAND]"
    echo
    echo "Commands:"
    echo "  create-instance    Create and configure EC2 instance"
    echo "  deploy             Deploy n8n to existing instance"
    echo "  setup-ssl          Setup SSL certificate (requires DOMAIN and EMAIL env vars)"
    echo "  cleanup            Terminate instance and cleanup resources"
    echo "  help               Show this help message"
    echo
    echo "Environment Variables:"
    echo "  AWS_REGION         AWS region (default: us-east-1)"
    echo "  INSTANCE_TYPE      EC2 instance type (default: t3.medium)"
    echo "  EC2_KEY_NAME       Key pair name (default: n8n-key)"
    echo "  DOMAIN             Domain name for SSL setup"
    echo "  EMAIL              Email for Let's Encrypt"
    echo
    echo "Examples:"
    echo "  $0 create-instance                    # Create EC2 instance"
    echo "  $0 deploy                            # Deploy n8n to instance"
    echo "  DOMAIN=n8n.example.com EMAIL=me@example.com $0 setup-ssl"
    echo "  $0 cleanup                           # Cleanup all resources"
}

# Main script logic
case "${1:-help}" in
    create-instance)
        check_aws_cli
        create_security_group
        create_key_pair
        create_instance
        ;;
    deploy)
        deploy_to_instance
        ;;
    setup-ssl)
        setup_ssl
        ;;
    cleanup)
        cleanup
        ;;
    help|*)
        show_help
        ;;
esac
