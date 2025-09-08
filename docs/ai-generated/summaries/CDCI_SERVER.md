# Server CI/CD to AWS EC2 (PM2)

This workflow (`.github/workflows/server-ec2.yml`) builds, packages, and deploys the server in `server/` to an EC2 instance via SSH, then performs a health check.

## Required GitHub Secrets

Configure these in Repo → Settings → Secrets and variables → Actions:

- `EC2_HOST` (e.g., 11.22.33.44)
- `EC2_USER` (e.g., ubuntu)
- `EC2_SSH_KEY` (private key content for the EC2 instance)
- `EC2_DEPLOY_PATH` (e.g., /var/www/expo-lab)
- `SERVER_PORT` (e.g., 3000)

## One-time EC2 Setup

1. Create t2.micro (or similar) EC2, open security group inbound for TCP 22 and your `SERVER_PORT`.
2. SSH to EC2 and install Node.js 20 and PM2:
   - Using NodeSource or nvm. Example (Ubuntu):
     curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
     sudo apt-get install -y nodejs
     sudo npm i -g pm2
3. Create app path and permissions:
   sudo mkdir -p /var/www/expo-lab
   sudo chown -R $USER:$USER /var/www/expo-lab
4. Optionally set a domain with Nginx reverse proxy to `localhost:SERVER_PORT`.
5. Create an `ecosystem.config.js` in `EC2_DEPLOY_PATH` if you want advanced PM2 control. If missing, workflow will start `dist/server.js` directly with PM2.

## What the workflow does

- Lint → Test → Build with Node 20
- Packages production bundle: `dist`, `package.json`, `package-lock.json`, optional `.env.example`
- Uploads as artifact for inspection
- Copies tarball to EC2, installs production deps (`npm ci --omit=dev`), (re)starts via PM2
- Health checks `http://EC2_HOST:SERVER_PORT/health`; fails if not 200

## Environment protection

- Job uses `environment: production`. Add reviewers under Settings → Environments → production for approvals.

## Troubleshooting

- If SSH fails, verify `EC2_USER` and that the private key matches the instance. You may need `chmod 600` locally; the action handles agent use.
- If PM2 not found, the script installs it globally.
- If health check fails, check server logs on EC2: `pm2 logs expo-lab-server --lines 100`.
