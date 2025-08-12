GitHub Actions CI/CD pipelines:
	•	Web Client (Expo for web) → lint + test + build + deploy to GitHub Pages
	•	Express Server (TypeScript) → lint + test + build + deploy to AWS EC2 (via SSH + PM2)

⸻

🧠 AI Prompt: Create CI/CD with GitHub Actions (Expo Web to Pages, Express TS to EC2)

Act as a senior DevOps engineer. Generate two GitHub Actions workflows for a monorepo with:

/client      # Expo app (web target)
/server   # Express + TypeScript

Goals
	1.	Client (Expo Web → GitHub Pages)

	•	Steps: lint → test → build web → deploy to GitHub Pages.
	•	Use Node 20.
	•	Use npx expo export --platform web with output in web/dist.
	•	Cache node_modules intelligently.
	•	Upload artifact and deploy using official GitHub Pages actions (actions/upload-pages-artifact, actions/deploy-pages).
	•	Trigger on push to main (only when web/** changes) and on manual dispatch.
	•	Matrix not required.
	•	Keep logs concise.
	•	Fail fast.

	2.	Server (Express TS → AWS EC2)

	•	Steps: lint → test → build → deploy to EC2 → post-deploy health check.
	•	Use Node 20.
	•	Package only production files (dist, package.json, package-lock.json, .env.example, any needed assets).
	•	Upload artifact for debugging.
	•	Deployment: SSH into EC2
	•	Add a health check HTTP GET to http://<EC2_HOST>:<PORT>/health and fail the job if non-200.
	•	Trigger on push to main (only when server/** changes) and on manual dispatch.
	•	Use environment protection production and require reviewers if possible.

Conventions & Best Practices
	•	Separate jobs: lint, test, build, deploy (deploy depends on build).
	•	Minimal permissions following GitHub principle of least privilege; add pages: write, id-token: write for Pages deploy.

Required Secrets / Vars

Create these in repo or org settings:

For EC2:
	•	EC2_HOST (e.g., 11.22.33.44)
	•	EC2_USER (e.g., ubuntu or ec2-user)
	•	EC2_SSH_KEY (private key contents; use webfactory/ssh-agent or appleboy/ssh-action)
	•	EC2_DEPLOY_PATH (e.g., /var/www/myapp)
	•	SERVER_PORT (e.g., 3000)

Deliverables
	1.	.github/workflows/web-pages.yml — CI/CD for Expo web:
	2.	.github/workflows/server-ec2.yml — CI/CD for Express server:

Acceptance Criteria
	•	Workflows are valid YAML and self-contained.
	•	Use official GitHub actions where possible.
	•	Include comments explaining key steps.
	•	create a .md file CDCI_CLIENT.md to Show how to enable Pages inside the workflow (pages and id-token permissions, environment secrets, actions/deploy-pages).
  •	create a .md file CDCI_SERVER.md to Show how to enable	EC2, Include instructions on setting EC2 (one-time), environment variables, security, and node installation, and add a domain name.
	•	Robust error handling: fail if health check fails.
	•	Include if: github.ref == 'refs/heads/main' guard for deploy jobs.

⸻

Output format:
	•	Provide both YAML files in full, with comments.
	•	Provide package.json scripts for /web and /server.
	•	Provide .md docs checklist to configure repo server and client

⸻
