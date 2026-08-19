const express = require('express');
const router = express.Router();
const Wish = require('../models/Wish');
const { nanoid } = require('nanoid');

// Create Wish Route
router.post('/create', async (req, res) => {
    try {
        const { receiverName, senderName, letterText, birthdayDate, images, location, deviceInfo } = req.body;
        const wishId = nanoid(8); 

        const newWish = new Wish({
            wishId,
            receiverName,
            senderName,
            letterText,
            birthdayDate,
            images,
            location,
            deviceInfo
        });

        await newWish.save();

        res.status(201).json({ 
            success: true, 
            message: 'Wish page created successfully!',
            link: `/w/${wishId}`
        });
    } catch (error) {
        console.error("DETAILED SERVER ERROR:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Fetch Wish Data Route (For Receiver Page)
router.get('/data/:wishId', async (req, res) => {
    try {
        const { wishId } = req.params;
        const wish = await Wish.findOne({ wishId });

        if (!wish) {
            return res.status(404).json({ success: false, message: 'Wish not found' });
        }

        res.status(200).json({ success: true, data: wish });
    } catch (error) {
        console.error("FETCH ERROR:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
