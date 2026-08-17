const express = require('express');
const router = express.Router();
const Wish = require('../models/Wish');
const { nanoid } = require('nanoid');

// Create a new wish page
router.post('/create', async (req, res) => {
    try {
        const { adminPass, receiverName, senderName, letterText, birthdayDate, images } = req.body;

        // Basic Admin Authentication
        if (adminPass !== process.env.ADMIN_PASS) {
            return res.status(401).json({ success: false, message: 'Invalid Admin Password' });
        }

        const wishId = nanoid(8); // Generates an 8-character unique ID

        const newWish = new Wish({
            wishId,
            receiverName,
            senderName,
            letterText,
            birthdayDate,
            images
        });

        await newWish.save();

        res.status(201).json({ 
            success: true, 
            message: 'Wish page created successfully!',
            link: `/w/${wishId}`
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

module.exports = router;

