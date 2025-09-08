# 🚀 Server Deployment Guide

## Overview

This guide explains how to start and deploy the Express.js server using Docker. The server is built with TypeScript, includes Swagger documentation, integrates with Supabase, and has comprehensive testing with Vitest.

## 🏗️ Docker Architecture

### Multi-Stage Build Approach

Our Dockerfile uses a **multi-stage build** strategy for optimal performance and security:

1. **Base Stage**: Sets up Node.js 18 Alpine with security hardening
2. **Dependencies Stage**: Installs production dependencies only
3. **Development Stage**: Includes dev dependencies for local development
4. **Build Stage**: Compiles TypeScript to JavaScript
5. **Production Stage**: Minimal image with only runtime requirements

### Key Security Features

- **Non-root user**: Runs as `nextjs` user (UID 1001) for security
- **Alpine Linux**: Minimal attack surface with security updates
- **dumb-init**: Proper signal handling and zombie process reaping
- **Health checks**: Automated container health monitoring
- **Minimal layers**: Optimized for smaller image size

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose installed
- `.env` file configured (copy from `.env.example`)

### Environment Setup

1. **Copy environment template:**

   ```bash
   cp .env.example .env
   ```

2. **Configure your Supabase credentials:**
   ```bash
   # Edit .env with your actual Supabase values
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_KEY=your-supabase-key
   SUPABASE_DB_URL=your-database-connection-string
   SUPABASE_BUCKET=Avatar
   ```

### Development Mode

```bash
# Start development server with hot reload
docker-compose --profile dev up server-dev

# Or using Docker directly
docker build -t expo-server:dev --target dev .
docker run -p 3000:3000 --env-file .env -v $(pwd):/app expo-server:dev
```

### Production Mode

```bash
# Start production server
docker-compose up server

# Or using Docker directly
docker build -t expo-server:prod --target production .
docker run -p 3000:3000 --env-file .env expo-server:prod
```

## 🔧 Available Commands

### Docker Compose Commands

```bash
# Production deployment
docker-compose up -d server

# Development with hot reload
docker-compose --profile dev up server-dev

# View logs
docker-compose logs -f server

# Stop services
docker-compose down

# Rebuild and start
docker-compose up --build server
```

### Direct Docker Commands

```bash
# Build production image
docker build -t expo-server:latest --target production .

# Build development image
docker build -t expo-server:dev --target dev .

# Run with custom port
docker run -p 8080:3000 --env-file .env expo-server:latest

# Run in background
docker run -d --name expo-server -p 3000:3000 --env-file .env expo-server:latest

# View container logs
docker logs -f expo-server

# Execute commands in running container
docker exec -it expo-server sh
```

## 📊 Health Monitoring

### Health Check Endpoint

The server includes automated health checks:

- **Endpoint**: `http://localhost:3000/api-docs`
- **Interval**: Every 30 seconds
- **Timeout**: 10 seconds
- **Retries**: 3 attempts
- **Start Period**: 40 seconds

### Monitoring Commands

```bash
# Check container health
docker inspect --format='{{.State.Health.Status}}' expo-server

# View health check logs
docker inspect --format='{{range .State.Health.Log}}{{.Output}}{{end}}' expo-server

# Container statistics
docker stats expo-server
```

## 🧪 Testing in Docker

### Running Tests

```bash
# Run tests in container
docker run --rm --env-file .env.test expo-server:dev npm test

# Run with coverage
docker run --rm --env-file .env.test expo-server:dev npm run test:coverage

# Interactive test mode
docker run -it --rm --env-file .env.test expo-server:dev npm run test:watch
```

### Test Environment

Tests run with:

- **Vitest**: Fast TypeScript-native test runner
- **Supertest**: HTTP endpoint testing
- **Coverage**: Code coverage reporting with v8
- **Mocked dependencies**: Supabase and external services mocked

## 🌐 API Documentation

Once the server is running, access:

- **Swagger UI**: `http://localhost:3000/api-docs`
- **OpenAPI Spec**: Available through the Swagger interface
- **Health Check**: `http://localhost:3000/health` (used for health monitoring)

## 📝 Logging

### Log Management

Logs are managed through Winston and mounted to host:

```bash
# View real-time logs (if running locally)
npm run logs:view

# View error logs only
npm run logs:errors

# Docker logs
docker-compose logs -f server
```

### Log Files

- **Combined logs**: `./logs/combined.log`
- **Error logs**: `./logs/error.log`
- **Container logs**: Available via `docker logs`

## 🔒 Security Features

### Implemented Security Measures

- **Helmet.js**: Security headers (CSP, HSTS, X-Frame-Options)
- **CORS**: Configurable cross-origin resource sharing
- **Input validation**: JSON parsing with Express middleware
- **Authentication**: Supabase JWT token validation
- **Error handling**: Secure error responses without sensitive data exposure
- **Non-root execution**: Container runs as non-privileged user

### Security Configuration

Security is configured in `src/app.ts` with:

- Content Security Policy
- HTTP Strict Transport Security
- X-Content-Type-Options
- X-Frame-Options protection
- Hidden X-Powered-By header

## 🚀 Production Deployment

### Environment Variables

Required for production:

```bash
NODE_ENV=production
PORT=3000
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-production-key
SUPABASE_DB_URL=your-production-db-url
SUPABASE_BUCKET=Avatar
```

### Production Checklist

- [ ] Environment variables configured
- [ ] SSL/TLS certificates configured (if not using a proxy)
- [ ] Database connection tested
- [ ] Supabase permissions verified
- [ ] Health checks working
- [ ] Log monitoring setup
- [ ] Backup strategy implemented

### Scaling Considerations

```bash
# Multiple replicas with Docker Compose
docker-compose up --scale server=3

# With different ports
docker run -p 3001:3000 --env-file .env expo-server:latest
docker run -p 3002:3000 --env-file .env expo-server:latest
```

## 🐛 Troubleshooting

### Common Issues

1. **Port conflicts**: Change host port in docker-compose.yml
2. **Environment variables**: Verify `.env` file exists and has correct values
3. **Database connection**: Check Supabase credentials and network access
4. **Permission errors**: Ensure proper file permissions for log directory

### Debug Commands

```bash
# Container shell access
docker exec -it expo-server sh

# Check environment variables
docker exec expo-server env

# Test database connection
docker exec expo-server node -e "console.log(process.env.SUPABASE_DB_URL)"

# View container configuration
docker inspect expo-server
```

## 📁 Project Structure

```
server/
├── Dockerfile              # Multi-stage Docker build
├── docker-compose.yml      # Development and production services
├── .dockerignore           # Files excluded from Docker context
├── src/
│   ├── app.ts              # Express app configuration
│   ├── server.ts           # Server startup
│   ├── api/                # API routes (todo, profile)
│   ├── common/             # Shared utilities and middleware
│   ├── infrastructure/     # Database, storage, config
│   └── __tests__/          # Test suites
├── logs/                   # Application logs (mounted volume)
└── dist/                   # Compiled JavaScript (production)
```

## 🎯 Why This Docker Setup?

### Simplicity Over Complexity

1. **Single Dockerfile**: Multi-stage approach keeps everything in one file
2. **Alpine Linux**: Minimal, secure base image
3. **Docker Compose**: Simple orchestration for development and production
4. **Health Checks**: Built-in monitoring without external dependencies
5. **Volume Mounts**: Persistent logs and development hot-reload

### Production Ready

- **Security hardened**: Non-root user, minimal attack surface
- **Optimized builds**: Separate dev/prod stages, minimal production image
- **Proper signal handling**: dumb-init for graceful shutdowns
- **Health monitoring**: Automated health checks
- **Logging**: Structured logging with Winston

### Developer Friendly

- **Hot reload**: Development mode with volume mounts
- **Easy testing**: Test commands work in Docker
- **Clear documentation**: Step-by-step instructions
- **Debugging support**: Easy container access and inspection

---

**Last Updated**: August 2025  
**Docker Version**: 20.10+  
**Node.js Version**: 18 LTS  
**Architecture**: Multi-stage, production-ready
