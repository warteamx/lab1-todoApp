# Lab1-TodoApp

[![Release](https://img.shields.io/github/v/release/warteamx/lab1-todoApp?style=flat-square&logo=github&labelColor=2f3136)](https://github.com/warteamx/lab1-todoApp/releases)
[![Build](https://img.shields.io/github/actions/workflow/status/warteamx/lab1-todoApp/ci-cd.yml?branch=main&style=flat-square&logo=github&labelColor=2f3136)](https://github.com/warteamx/lab1-todoApp/actions/workflows/ci-cd.yml)
[![License](https://img.shields.io/github/license/warteamx/lab1-todoApp?style=flat-square&logo=opensourceinitiative&logoColor=white&labelColor=2f3136)](./LICENSE)
[![Node.js](https://img.shields.io/badge/node.js-20-green?style=flat-square&logo=node.js&labelColor=2f3136)](https://nodejs.org)
[![Gitmoji](https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67?style=flat-square&labelColor=2f3136)](https://gitmoji.dev)
[![Semantic Release](https://img.shields.io/badge/semantic--release-enabled-brightgreen?style=flat-square&logo=semantic-release&labelColor=2f3136)](https://github.com/semantic-release/semantic-release)

### 🧩 Overview: Expo + Express

A full-stack application built with Expo and Express as a template to start a new project.

The app demonstrates modern development practices with **CD/CI**, **Domain-Driven Design (DDD)**, **Clean Architecture**, **Cloud-Native** and **Semantic Versioning (SemVer)**.

A **production-ready full-stack boilerplate** to kickstart your next project, built with:

- **Expo SDK 53** (React Native for mobile, web, and desktop)
- **Express 5.1** (Node.js backend with TypeScript)
- **Monorepo structure** using `npm` packages
- **CI/CD integration**, **Docker-ready**, and **env-based configuration**

---

## 🚀 Features

### Client Frontend (Expo)

[![Client Version](https://img.shields.io/github/package-json/v/warteamx/lab1-todoApp?filename=client%2Fpackage.json&style=flat-square&logo=expo&labelColor=2f3136)](./client/package.json)
[![Client Coverage](https://img.shields.io/codecov/c/github/warteamx/lab1-todoApp?flag=client&style=flat-square&logo=codecov&labelColor=2f3136)](https://codecov.io/gh/warteamx/lab1-todoApp)
[![Expo SDK](https://img.shields.io/github/package-json/dependency-version/warteamx/lab1-todoApp/expo?filename=client%2Fpackage.json&style=flat-square&logo=expo&labelColor=2f3136)](https://expo.dev)
[![React Native](https://img.shields.io/github/package-json/dependency-version/warteamx/lab1-todoApp/react-native?filename=client%2Fpackage.json&style=flat-square&logo=react&labelColor=2f3136)](https://reactnative.dev)
[![React](https://img.shields.io/github/package-json/dependency-version/warteamx/lab1-todoApp/react?filename=client%2Fpackage.json&style=flat-square&logo=react&labelColor=2f3136)](https://reactjs.org)

- Cross-platform support: **iOS**, **Android**, **Web**, **Desktop**
- TypeScript-first React Native with **hooks**, **navigation**, and **theming**
- API integration layer with environment-based configs

### Backend (Express)

[![Server Version](https://img.shields.io/github/package-json/v/warteamx/lab1-todoApp?filename=server%2Fpackage.json&style=flat-square&logo=node.js&labelColor=2f3136)](./server/package.json)
[![Server Coverage](https://img.shields.io/codecov/c/github/warteamx/lab1-todoApp?flag=server&style=flat-square&logo=codecov&labelColor=2f3136)](https://codecov.io/gh/warteamx/lab1-todoApp)
[![Express](https://img.shields.io/github/package-json/dependency-version/warteamx/lab1-todoApp/express?filename=server%2Fpackage.json&style=flat-square&logo=express&labelColor=2f3136)](https://expressjs.com)
[![PostgreSQL](https://img.shields.io/github/package-json/dependency-version/warteamx/lab1-todoApp/pg?filename=server%2Fpackage.json&style=flat-square&logo=postgresql&labelColor=2f3136)](https://postgresql.org)
[![Supabase](https://img.shields.io/github/package-json/dependency-version/warteamx/lab1-todoApp/@supabase/supabase-js?filename=server%2Fpackage.json&style=flat-square&logo=supabase&labelColor=2f3136)](https://supabase.com)
[![Docker](https://img.shields.io/badge/Docker-ready-2496ED?style=flat-square&logo=docker&labelColor=2f3136)](https://docker.com)

- RESTful API built with **Express 5.1** and **TypeScript**
- Scalable architecture (supports DDD/Clean Architecture)
- Swagger/OpenAPI support
- PostgreSQL
- Dockerized + `.env` support for configuration

This project implements **semantic versioning** for each package:

- **Root package** (`package.json`): Development tooling and scripts
- **Client package** (`client/package.json`): Expo React Native application
- **Server package** (`server/package.json`): Express.js API server

Each package follows [SemVer 2.0.0](https://semver.org/) specification with automated version management via CI/CD.

## Deployment

- **Client (Web App)**: http://lab1-todoapp.s3-website.eu-north-1.amazonaws.com
- **Client (Domain)**: https://lab1.warteamx.com
- **Server (API)**: http://56.228.14.41/api
- **Health Check**: http://56.228.14.41/api/health
- **API Documentation**: http://56.228.14.41/api-docs

## Quick Start

### Environment Setup

Before running the application, set up your environment variables:

```bash
# Create environment files from templates
./scripts/setup-environment.sh

# Configure your Supabase credentials and other settings
# Edit client/.env.local and server/.env with your actual values
```

📖 **See [Environment Setup Guide](./docs/ENVIRONMENT_SETUP.md) for detailed configuration instructions**

### Client (Mobile/Web App)

```bash
cd client
npm install
npm start
```

### Server (API)

```bash
cd server
npm install
npm run dev
```

## Semantic Versioning

Check the full [semver docs](./docs/development/SEMANTIC_VERSIONING.md)

This project implements automated semantic versioning with the following rules:

### Version Bump Triggers

- **MAJOR** (`X.0.0`): Breaking changes (API removals, incompatible changes)
- **MINOR** (`1.X.0`): New features (backward compatible)
- **PATCH** (`1.1.X`): Bug fixes and patches

### Commit Convention

```bash
✨ feat(client): add dark mode        → MINOR bump
🐛 fix(server): fix validation bug    → PATCH bump
💥 feat!: remove deprecated API       → MAJOR bump
📝 docs: update README               → PATCH bump
```

### Version Display

- **Client**: Version component in settings and about screens
- **Server**: Enhanced health check endpoint with build information

## Docs

### Environment & Setup

- 🔧 [Environment Setup Guide](./docs/development/ENVIRONMENT_SETUP.md) - Environment variables configuration and management

### Development

- 📦 [Semantic Versioning](./docs/development/SEMANTIC_VERSIONING.md) - Automated version management and release process
- 🔄 [Development Workflow](./docs/WORKFLOW.md) - Complete development workflow and best practices

### Client Documentation

- 📱 [Installation Guide](./docs/client/INSTALLATION.md) - Setup and development environment
- 🏗️ [Architecture Guide](./docs/client/ARCHITECTURE.md) - Clean Architecture, folder structure, and design patterns
- 🧪 [Testing Guide](./docs/client/TESTING.md) - Testing strategies, tools, and best practices
- 📖 [Client Overview](./docs/client/README-client.md) - Getting started with the Expo app

### Server Documentation

- 🚀 [Server Setup](./docs/server/SERVER_START.md) - Server installation and startup
- 🏗️ [Architecture Guide](./docs/server/ARCHITECTURE.md) - Domain-Driven Design, clean architecture, and design patterns
- 📁 [DDD Folder Structure](./docs/server/DDD_FOLDER_STRUCTURE.md) - Detailed folder organization and domain structure
- 🧪 [Testing Guide](./docs/server/TESTING.md) - Testing strategies, tools, and best practices
- 📖 [Server README](./docs/server/README.md) - Complete server documentation overview
- 🔒 [Security Guide](./docs/server/SECURITY.md) - Security best practices
- ⚠️ [Error Handling](./docs/server/ERROR_HANDLING.md) - Error handling patterns

### Deployment

- 🚀 [Deployment Guide](./docs/deployment/DEPLOYMENT.md) - Production deployment instructions and best practices

### AI Documentation

- 🤖 [AI Context Prompt](./docs/AI_CONTEXT.md) - AI assistant configuration and comprehensive project context
- 📋 [AI-Generated Documentation](./docs/ai-generated/) - AI-generated summaries, fixes, and development notes

---

**Last Updated**: (hotfix) September 16, 2025  
**License**: MIT
