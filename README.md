# Expo Lab

Hello World!

A full-stack application built with Expo and Express demonstrating modern development practices with **Domain-Driven Design (DDD)**, **Clean Architecture**, and **Semantic Versioning (SemVer)**.

## Current Version: v1.1.1

This project implements **independent semantic versioning** for each package:
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

## Project Structure

- **Client**: Expo SDK 53 React Native App (iOS, Android, Web)
- **Server**: Express 5 Node.js API Server

## Quick Start

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

## Development Commands

### From Root Directory
```bash
# Start both client and server
npm run client:dev    # Starts Expo development server
npm run server:dev    # Starts Express API server

# Testing
npm run test:client   # Run client tests
npm run test:server   # Run server tests

# Linting
npm run lint:client   # Lint client code  
npm run lint:server   # Lint server code
```

## Semantic Versioning

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

### Version Management
- 🏷️ [SemVer Implementation](./docs/SEMVER_IMPLEMENTATION.md) - Semantic versioning setup and automation

### AI Documentation
- 🤖 [Claude Prompt Engineering](./.claude.md) - AI assistant configuration

### Client Documentation
- 📱 [Installation Guide](./client/docs/INSTALLATION.md) - Setup and development environment
- 🏗️ [Architecture Guide](./client/docs/ARCHITECTURE.md) - Clean Architecture, folder structure, and design patterns
- 🧪 [Testing Guide](./client/docs/TESTING.md) - Testing strategies, tools, and best practices
- 📖 [Client README](./client/docs/README-client.md) - Getting started with the Expo app

### Server Documentation
- 🚀 [Server Setup](./server/docs/SERVER_START.md) - Server installation and startup
- 🏗️ [Architecture Guide](./server/docs/ARCHITECTURE.md) - Domain-Driven Design, clean architecture, and design patterns
- 📁 [DDD Folder Structure](./server/docs/DDD_FOLDER_STRUCTURE.md) - Detailed folder organization and domain structure
- 🧪 [Testing Guide](./server/docs/TESTING.md) - Testing strategies, tools, and best practices
- 📖 [Server README](./server/docs/README.md) - Complete server documentation overview
- 🔒 [Security Guide](./server/docs/SECURITY.md) - Security best practices
- ⚠️ [Error Handling](./server/docs/ERROR_HANDLING.md) - Error handling patterns

---

**Current Branch**: `24-improve-template-docs`  
**Last Updated**: September 4, 2025  
**License**: MIT

