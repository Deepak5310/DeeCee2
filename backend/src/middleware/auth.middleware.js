import { auth } from '../config/firebase.config.js';

/**
 * Middleware to verify Firebase authentication token
 * Protects routes that require authentication
 */
export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized - No token provided',
      });
    }

    const token = authHeader.split('Bearer ')[1];

    // Verify the token with Firebase Admin SDK
    const decodedToken = await auth.verifyIdToken(token);

    // Attach user info to request object
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      emailVerified: decodedToken.email_verified,
    };

    next();
  } catch (error) {
    console.error('Token verification error:', error.message);

    if (error.code === 'auth/id-token-expired') {
      return res.status(401).json({
        success: false,
        message: 'Token expired - Please login again',
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Unauthorized - Invalid token',
    });
  }
};

/**
 * Middleware to optionally verify token (for routes that work with or without auth)
 */
export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split('Bearer ')[1];
      const decodedToken = await auth.verifyIdToken(token);

      req.user = {
        uid: decodedToken.uid,
        email: decodedToken.email,
        emailVerified: decodedToken.email_verified,
      };
    }

    next();
  } catch (error) {
    // If token verification fails, just continue without user info
    next();
  }
};

/**
 * Middleware to check if email is verified
 */
export const requireEmailVerification = (req, res, next) => {
  if (!req.user || !req.user.emailVerified) {
    return res.status(403).json({
      success: false,
      message: 'Email verification required',
    });
  }
  next();
};
