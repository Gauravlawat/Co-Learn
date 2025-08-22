const express = require('express');
const router = express.Router();
const { createSession, getSessions, getSessionById, joinSession } = require('../controllers/sessionController');
const authMiddleware = require('../middleware/authMiddleware');

// @route   POST api/sessions
// @desc    Create a session
// @access  Private
router.post('/', authMiddleware, createSession);
router.post('/:id/join', authMiddleware, joinSession);
// @route   GET api/sessions
// @desc    Get all sessions
// @access  Public
router.get('/', getSessions);

// @route   GET api/sessions/:id
// @desc    Get session by ID
// @access  Public
router.get('/:id', getSessionById);

module.exports = router;