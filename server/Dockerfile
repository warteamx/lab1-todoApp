# Use official Node.js runtime as the base image
# Using LTS version for stability and security
FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S serveruser -u 1001

# Development dependencies stage
FROM base AS deps
# Copy package files
COPY package*.json ./
# Clean install production dependencies only
RUN npm ci --omit=dev && npm cache clean --force

# Development stage
FROM base AS dev
# Copy package files
COPY package*.json ./
# Install all dependencies (including dev dependencies)
RUN npm ci
# Copy source code
COPY . .
# Change ownership to non-root user
RUN chown -R serveruser:nodejs /app
USER serveruser
# Expose port
EXPOSE 3000
# Start development server
CMD ["npm", "run", "dev"]

# Build stage
FROM base AS build
# Copy package files
COPY package*.json ./
# Install all dependencies
RUN npm ci
# Copy source code
COPY . .
# Build the application
RUN npm run build

# Production stage
FROM base AS production
# Set NODE_ENV to production
ENV NODE_ENV=production
# Copy production dependencies
COPY --from=deps /app/node_modules ./node_modules
# Copy built application
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
# Copy startup script
COPY startup.sh ./
RUN chmod +x startup.sh
# Create logs directory
RUN mkdir -p /app/logs && chown -R serveruser:nodejs /app/logs
# Change ownership to non-root user
RUN chown -R serveruser:nodejs /app
USER serveruser
# Expose port
EXPOSE 3000
# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/ping', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"
# Start the application with dumb-init for proper signal handling
ENTRYPOINT ["dumb-init", "--"]
CMD ["./startup.sh"]
