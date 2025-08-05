// Express custom types
// This file extends the Express Request type to include userClaims, which can be used in the
// auth middleware to store user information after authentication.
// The userClaims object contains various claims about the user, such as their email, role,
// and session information, which can be useful for authorization and user management.
// Make sure to import this file in your main server file (e.g., app.ts)
// to ensure that the Request type is extended globally.
// This allows you to access req.userClaims in your middleware and route handlers without TypeScript errors

import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      userClaims?: UserClaims;
      user?: {
        id: string;
        // ...other user properties
      };
      file?: Express.Multer.File;
      files?: Express.Multer.File[];
      session?: any;
    }
  }
}

// Supabase Auth JWT decoded user claims type
type UserClaims = {
  iss: string;
  sub: string; // User ID
  aud: string;
  exp: number;
  iat: number;
  email: string;
  phone: string;
  app_metadata: { provider: string; providers: string[] };
  user_metadata: {
    email: string;
    email_verified: boolean;
    phone_verified: boolean;
    sub: string;
  };
  role: string;
  aal: string;
  amr: [[object]];
  session_id: string;
  is_anonymous: boolean;
};

export { Request, UserClaims };
