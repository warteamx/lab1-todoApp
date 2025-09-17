#!/bin/bash

# Script to update EC2 security group for HTTPS setup
# This script adds rules for HTTP (80) and HTTPS (443) traffic

set -e

echo "🔧 Setting up security group rules for HTTPS..."

# Get EC2 instance information
echo "📋 Finding EC2 instance and security group..."

# Replace with your actual EC2 instance ID or use this command to find it
INSTANCE_ID=$(aws ec2 describe-instances \
  --filters "Name=instance-state-name,Values=running" \
  --query "Reservations[*].Instances[?PublicIpAddress=='56.228.14.41'].InstanceId" \
  --output text)

if [ -z "$INSTANCE_ID" ]; then
  echo "❌ Could not find EC2 instance with IP 56.228.14.41"
  echo "Please run: aws ec2 describe-instances --query 'Reservations[*].Instances[?State.Name==\`running\`].[InstanceId,PublicIpAddress,SecurityGroups]' --output table"
  exit 1
fi

echo "✅ Found instance: $INSTANCE_ID"

# Get security group ID
SECURITY_GROUP_ID=$(aws ec2 describe-instances \
  --instance-ids $INSTANCE_ID \
  --query "Reservations[0].Instances[0].SecurityGroups[0].GroupId" \
  --output text)

echo "✅ Found security group: $SECURITY_GROUP_ID"

# Check current rules
echo "📋 Current security group rules:"
aws ec2 describe-security-groups \
  --group-ids $SECURITY_GROUP_ID \
  --query "SecurityGroups[0].IpPermissions[*].[IpProtocol,FromPort,ToPort,IpRanges[0].CidrIp]" \
  --output table

# Add HTTP rule (port 80)
echo "🔓 Adding HTTP (port 80) rule..."
aws ec2 authorize-security-group-ingress \
  --group-id $SECURITY_GROUP_ID \
  --protocol tcp \
  --port 80 \
  --cidr 0.0.0.0/0 2>/dev/null && echo "✅ HTTP rule added" || echo "ℹ️ HTTP rule already exists"

# Add HTTPS rule (port 443)
echo "🔐 Adding HTTPS (port 443) rule..."
aws ec2 authorize-security-group-ingress \
  --group-id $SECURITY_GROUP_ID \
  --protocol tcp \
  --port 443 \
  --cidr 0.0.0.0/0 2>/dev/null && echo "✅ HTTPS rule added" || echo "ℹ️ HTTPS rule already exists"

# Verify rules
echo "📋 Updated security group rules:"
aws ec2 describe-security-groups \
  --group-ids $SECURITY_GROUP_ID \
  --query "SecurityGroups[0].IpPermissions[*].[IpProtocol,FromPort,ToPort,IpRanges[0].CidrIp]" \
  --output table

echo "🎉 Security group setup completed!"
echo "📝 Next steps:"
echo "   1. SSH into your EC2 instance: ssh -i your-key.pem ubuntu@56.228.14.41"
echo "   2. Follow the Nginx installation steps in NGINX_HTTPS_SETUP.md"
echo "   3. Make sure your domain api.lab1.warteamx.com points to 56.228.14.41"
