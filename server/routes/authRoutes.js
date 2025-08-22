// routes/authRoutes.js

const authMiddleware = require('../middleware/authMiddleware');
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/authController');

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', registerUser);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', loginUser);
router.get('/me', authMiddleware, getMe);

module.exports = router;