# Swagger UI Deployment Fix Summary

## Issues Identified

The Swagger UI documentation (`/api-docs/`) was not working properly on the deployed AWS EC2 instance due to several configuration issues:

### 1. Content Security Policy (CSP) Issues
**Problem**: Overly restrictive CSP headers were blocking Swagger UI JavaScript execution
- `frameSrc: ["'none'"]` - Prevented Swagger UI from loading its iframe components
- `script-src-attr 'none'` - Blocked inline script attributes needed by Swagger UI

**Fix**: Updated `src/app.ts` helmet configuration:
```typescript
frameSrc: ["'self'"], // Allow frames for Swagger UI
crossOriginOpenerPolicy: false, // Allow for Swagger UI compatibility
frameguard: { action: 'sameorigin' }, // Allow same origin frames for Swagger UI
```

### 2. Missing Production Server Configuration
**Problem**: OpenAPI specification only included localhost server, causing API calls to fail in production

**Fix**: Updated `src/openapi.ts` to include production server:
```typescript
servers: [
  {
    url: 'http://localhost:3000',
    description: 'Local server'
  },
  {
    url: 'http://56.228.14.41',
    description: 'Production server'
  }
],
```

### 3. CORS Configuration Issues
**Problem**: In production, `ALLOWED_ORIGINS` environment variable was empty, causing CORS failures

**Fix**: 
1. Updated `src/app.ts` to provide default allowed origins:
```typescript
const allowedOrigins =
  process.env.NODE_ENV === 'production'
    ? (process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : 
       ['http://56.228.14.41', 'https://lab1.warteamx.com'])
    : '*';
```

2. Updated GitHub Actions deployment to set `ALLOWED_ORIGINS`:
```bash
-e ALLOWED_ORIGINS="http://56.228.14.41,https://lab1.warteamx.com,http://lab1-todoapp.s3-website.eu-north-1.amazonaws.com"
```

### 4. Swagger UI Configuration Enhancement
**Problem**: Basic Swagger UI setup without optimal configuration

**Fix**: Enhanced Swagger UI setup with better defaults:
```typescript
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(openapiDoc, {
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    docExpansion: 'list',
    filter: true,
    showExtensions: true,
    showCommonExtensions: true,
    tryItOutEnabled: true
  }
}));
```

## Console Errors Addressed

### Cross-Origin-Opener-Policy
- **Error**: "Cross-Origin-Opener-Policy" blocking Swagger UI
- **Solution**: Disabled `crossOriginOpenerPolicy` in helmet configuration

### ERR_CONNECTION_REFUSED
- **Error**: API calls failing due to localhost URLs in production
- **Solution**: Added production server URL to OpenAPI specification

### "Cannot read properties of undefined (reading create) passkey"
- **Error**: Likely related to browser security restrictions
- **Solution**: Fixed CSP and CORS configurations to allow proper script execution

## Deployment Instructions

When you merge this branch to `main`, the GitHub Actions will automatically:

1. Build the Docker image with the updated configuration
2. Deploy to AWS EC2 with proper environment variables
3. Set correct CORS origins for production

## Verification Steps

After deployment, verify:

1. **API Documentation**: Visit `http://56.228.14.41/api-docs/`
2. **Health Check**: Visit `http://56.228.14.41/api/health`
3. **Interactive Testing**: Use "Try it out" buttons in Swagger UI
4. **Console Errors**: Check browser console for any remaining errors

## Files Modified

- `server/src/app.ts` - Fixed CSP, CORS, and Swagger UI configuration
- `server/src/openapi.ts` - Added production server URL
- `.github/workflows/deploy-server.yml` - Added ALLOWED_ORIGINS environment variable
- `server/docker-compose.yml` - Updated healthcheck endpoint

## Security Considerations

The changes maintain security while allowing Swagger UI to function:
- CSP still restricts most external sources
- CORS is configured for specific allowed origins
- Frame restrictions allow same-origin only
- All other security headers remain active

## Next Steps

1. Merge branch to `main` to trigger deployment
2. Monitor deployment logs for any issues
3. Test Swagger UI functionality in production
4. Verify all API endpoints work through the documentation interface
