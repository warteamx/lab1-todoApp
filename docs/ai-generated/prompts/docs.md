Create CD/CI Github Actions deployment for AWS

1. Create a plan to deploy the application to AWS, using s3 and ec2 free tiers. Choose stockholm region. eu-north-1.

2. Create a GitHub Actions workflow file (e.g., .github/workflows/deploy.yml) to define the CI/CD pipeline. For the moment skip the testing and linting steps, to focus on deployment and make faster iterations.

3. Use aws-cli/2.28.11

4. Use .env variables. Let me know if I had to add them manually on github or aws.

5. Use github MCP server

Client:
expo app web build
AWS S3 bucket

Server:
docker build
free tier micro instance
AWS EC2 instance
