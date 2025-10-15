import express from 'express';
import { verifyToken, requireEmailVerification } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register user in database after Firebase signup
 * @access  Public
 */
router.post('/register', async (req, res) => {
  try {
    // This will be implemented in the controller
    res.json({
      success: true,
      message: 'User registration endpoint - to be implemented',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/**
 * @route   GET /api/auth/profile
 * @desc    Get current user profile
 * @access  Private
 */
router.get('/profile', verifyToken, async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Get user profile endpoint - to be implemented',
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/**
 * @route   PUT /api/auth/profile
 * @desc    Update user profile
 * @access  Private
 */
router.put('/profile', verifyToken, requireEmailVerification, async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Update user profile endpoint - to be implemented',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/**
 * @route   POST /api/auth/verify-token
 * @desc    Verify Firebase token (useful for frontend to check auth status)
 * @access  Public
 */
router.post('/verify-token', verifyToken, async (req, res) => {
  res.json({
    success: true,
    message: 'Token is valid',
    user: req.user,
  });
});

export default router;
