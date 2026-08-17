const express = require('express');
const router = express.Router();
const Wish = require('../models/Wish');

// Fetch wish data by ID
router.get('/data/:id', async (req, res) => {
    try {
        const wishData = await Wish.findOne({ wishId: req.params.id });
        
        if (!wishData) {
            return res.status(404).json({ success: false, message: 'Wish not found' });
        }

        res.status(200).json({ success: true, data: wishData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

module.exports = router;

