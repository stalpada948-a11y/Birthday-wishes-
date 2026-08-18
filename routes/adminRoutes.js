const express = require('express');
const router = express.Router();
const Wish = require('../models/Wish');

// Admin Login Route
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // Aapka custom username aur password
    if (username === 'sumit@1123' && password === 'sumit@1123') {
        res.status(200).json({ success: true, message: 'Login Success' });
    } else {
        res.status(401).json({ success: false, message: 'Galat Username ya Password!' });
    }
});

// Get all users data for Admin Dashboard
router.get('/all-wishes', async (req, res) => {
    try {
        const allWishes = await Wish.find().sort({ createdAt: -1 }); // Naya data upar aayega
        res.status(200).json({ success: true, data: allWishes });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

module.exports = router;
