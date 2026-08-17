const express = require('express');
const router = express.Router();
const Wish = require('../models/Wish');
const { v4: uuidv4 } = require('uuid');

// Admin Auth Middleware
const authAdmin = (req, res, next) => {
    const { adminsecret } = req.headers;
    if (adminsecret === process.env.ADMIN_SECRET) {
        next();
    } else {
        res.status(401).json({ error: "Unauthorized Access" });
    }
};

// Create New Wish Page Link
router.post('/create-wish', authAdmin, async (req, res) => {
    try {
        const { receiverName, senderName, letterText, images } = req.body;
        const uniqueId = uuidv4().slice(0, 8); // short unique link key

        const newWish = new Wish({
            uniqueId,
            receiverName,
            senderName,
            letterText,
            images
        });

        await newWish.save();
        res.json({ 
            success: true, 
            wishUrl: `${req.protocol}://${req.get('host')}/wish/${uniqueId}` 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

