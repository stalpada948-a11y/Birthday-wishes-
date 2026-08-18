const express = require('express');
const router = express.Router();
const Wish = require('../models/Wish');
const { nanoid } = require('nanoid');

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
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

router.get('/data/:id', async (req, res) => {
    try {
        const wishData = await Wish.findOne({ wishId: req.params.id });
        if (!wishData) return res.status(404).json({ success: false, message: 'Wish not found' });
        res.status(200).json({ success: true, data: wishData });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

module.exports = router;
