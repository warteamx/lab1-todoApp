# Client CI/CD to GitHub Pages

This repository deploys the Expo web app (in `client/`) to GitHub Pages using the workflow `.github/workflows/web-pages.yml`.

## Prerequisites

- Repository Settings → Pages → Build and deployment: GitHub Actions
- No extra tokens are required. Workflow already sets:
  - `permissions`: `pages: write` and `id-token: write`

## What the workflow does

- Node 20
- Lint → Test → Export static site via `expo export --platform web` into `client/web/dist`
- Uploads artifact and deploys using `actions/deploy-pages`
- Triggers on push to `main` when files under `client/**` change and on manual dispatch

## Local parity

- Ensure `client/package.json` has:
  - `build:web`: `expo export --platform web --output-dir web/dist`

## Troubleshooting

- If Pages shows 404, confirm the artifact path `client/web/dist` and that the export generated an `index.html`.
- For repo with custom domain, configure it in Repo Settings → Pages → Custom domain.
