const express = require('express');
const router = express.Router();

const API_URL = process.env.VITE_API_URL || process.env.API_URL || 'http://localhost:5000';

// Render login page
router.get('/login', (req, res) => {
    res.render('login', { error: null, API_URL });
});

// Render signup page
router.get('/signup', (req, res) => {
    res.render('signup', { error: null, API_URL });
});

module.exports = router;

