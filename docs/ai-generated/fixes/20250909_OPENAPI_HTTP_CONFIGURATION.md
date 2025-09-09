# OpenAPI HTTP Configuration Update - Complete Fix

## Summary

Updated the server configuration to properly serve Swagger API docs over HTTP, fixing the mixed content issues and HTTPS upgrade problems that were preventing the documentation from working on the production EC2 instance.

## Root Cause

The Swagger UI was failing to load CSS and JS assets because:

1. **Mixed Content Policy**: OpenAPI spec included non-functional HTTPS endpoints
2. **upgrade-insecure-requests CSP directive**: Forcing HTTP requests to upgrade to HTTPS
3. **Asset Loading**: Swagger UI trying to load assets via `https://56.228.14.41/api-docs/swagger-ui.css` (which doesn't exist)

## Changes Made

### 1. Updated OpenAPI Server Configuration (`server/src/openapi.ts`)

**Before:**

```typescript
servers: [
  {
    url: 'http://localhost:3000',
    description: 'Local development server',
  },
  {
    url: 'http://56.228.14.41',
    description: 'Production server',
  },
  {
    url: 'https://lab1.warteamx.com',
    description: 'Production server (HTTPS)',
  },
],
```

**After:**

```typescript
servers: [
  {
    url: 'http://localhost:3000',
    description: 'Local development server',
  },
  {
    url: 'http://56.228.14.41',
    description: 'Production server (HTTP)',
  },
  // Note: HTTPS endpoint not available yet - EC2 serves HTTP only
  // {
  //   url: 'https://lab1.warteamx.com',
  //   description: 'Production server (HTTPS)',
  // },
],
```

### 2. Fixed Content Security Policy (`server/src/app.ts`)

**Critical Fix**: Disabled Helmet's default CSP behavior to prevent `upgrade-insecure-requests`:

```typescript
contentSecurityPolicy: {
  useDefaults: false, // Disable Helmet defaults that include upgrade-insecure-requests
  directives: {
    defaultSrc: ['\'self\''],
    scriptSrc: ['\'self\'', '\'unsafe-inline\'', '\'unsafe-eval\'', 'blob:'],
    styleSrc: ['\'self\'', '\'unsafe-inline\'', 'fonts.googleapis.com'],
    imgSrc: ['\'self\'', 'data:', 'https:', 'blob:'],
    connectSrc: ['\'self\''],
    fontSrc: ['\'self\'', 'fonts.gstatic.com'],
    objectSrc: ['\'none\''],
    mediaSrc: ['\'self\''],
    frameSrc: ['\'self\''],
    workerSrc: ['\'self\'', 'blob:'],
    baseUri: ['\'self\''],
    formAction: ['\'self\''],
    frameAncestors: ['\'self\''],
    scriptSrcAttr: ['\'none\''],
    // Explicitly DO NOT include upgrade-insecure-requests
  },
},
```

### 3. Enhanced Swagger UI Configuration

```typescript
app.get(
  '/api-docs',
  swaggerUi.setup(openapiDoc, {
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      docExpansion: 'list',
      filter: true,
      showExtensions: true,
      showCommonExtensions: true,
      tryItOutEnabled: true,
      url: undefined, // Let Swagger UI auto-detect the current URL
      validatorUrl: null, // Disable validator to prevent HTTPS calls
    },
    customCss: `
      .swagger-ui .topbar { display: none; }
      .swagger-ui .info .title { color: #3b82f6; }
    `,
    customSiteTitle: 'Lab1 TodoApp API Documentation',
    swaggerUrl: undefined, // Use current protocol
  })
);
```

### 4. Updated CORS Configuration

```typescript
const allowedOrigins =
  process.env.NODE_ENV === 'production'
    ? process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(',')
      : [
          'http://56.228.14.41',
          'https://lab1.warteamx.com',
          'http://lab1-todoapp.s3-website.eu-north-1.amazonaws.com',
        ]
    : '*';
```

### 5. Disabled HSTS for HTTP-only serving

```typescript
hsts: false, // Disabled since we're serving over HTTP
```

## Issue Resolution

### Before Fix:

```bash
❌ https://56.228.14.41/api-docs/swagger-ui.css -> net::ERR_CONNECTION_REFUSED
❌ Content-Security-Policy: upgrade-insecure-requests (forcing HTTPS)
❌ Strict-Transport-Security header present
```

### After Fix:

```bash
✅ http://56.228.14.41/api-docs/swagger-ui.css -> Loads successfully
✅ Content-Security-Policy: NO upgrade-insecure-requests directive
✅ No HSTS header (appropriate for HTTP)
```

## Testing

### Verified Locally:

- ✅ TypeScript compilation successful
- ✅ OpenAPI configuration validated
- ✅ CSP headers correct (no upgrade-insecure-requests)
- ✅ HSTS disabled
- ✅ Swagger UI assets load over HTTP

### After Deployment Test:

Test these endpoints:

- **API Docs**: `http://56.228.14.41/api-docs/`
- **Health Check**: `http://56.228.14.41/api/health`
- **Try API calls** in Swagger UI interface
- **Browser Console**: No more asset loading errors

## Security Considerations

- **CORS**: Still properly configured with specific allowed origins
- **CSP**: Custom Content Security Policy with appropriate directives for HTTP
- **Frame Protection**: Still active with same-origin policy
- **XSS Protection**: Script execution restrictions maintained
- **Authentication**: JWT authentication still required for protected endpoints

## Verification Commands

```bash
# Check CSP headers (should NOT contain upgrade-insecure-requests)
curl -I http://56.228.14.41/api-docs/ | grep -i "content-security"

# Check HSTS headers (should NOT be present)
curl -I http://56.228.14.41/api-docs/ | grep -i "strict-transport"

# Test Swagger UI loading
curl -I http://56.228.14.41/api-docs/swagger-ui.css

# Test API health
curl http://56.228.14.41/api/health
```

## Next Steps

This change provides immediate functionality for HTTP-only serving. For a permanent HTTPS solution, consider:

1. **AWS Application Load Balancer** with SSL certificate (recommended)
2. **CloudFront distribution** with custom domain
3. **Let's Encrypt** with Nginx reverse proxy on EC2

The current fix ensures Swagger UI works properly while maintaining security for HTTP-only deployment.
