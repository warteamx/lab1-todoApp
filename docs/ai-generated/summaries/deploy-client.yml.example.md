name: Deploy Client to AWS Amplify

on:
push:
branches: [main]
paths: ['client/**']
workflow_dispatch:

jobs:
deploy:
runs-on: ubuntu-latest
steps: - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: client/package-lock.json

      - name: Install dependencies
        working-directory: ./client
        run: npm ci

      - name: Build web app
        working-directory: ./client
        run: npm run build:web
        env:
          EXPO_PUBLIC_API_URL: ${{ secrets.EXPO_PUBLIC_API_URL }}

      - name: Deploy to Amplify
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ secrets.AWS_REGION }}

      - name: Upload to S3
        working-directory: ./client
        run: |
          aws s3 sync web/dist/ s3://${{ secrets.AMPLIFY_S3_BUCKET }} --delete
          aws cloudfront create-invalidation --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} --paths "/*"
