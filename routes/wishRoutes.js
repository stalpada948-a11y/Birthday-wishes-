const express = require('express');
const router = express.Router();
const Wish = require('../models/Wish');

router.get('/wish/:id', async (req, res) => {
    try {
        const wishData = await Wish.findOne({ uniqueId: req.params.id });
        if (!wishData) return res.status(404).send('Wish page not found!');
        
        // Return JSON or render dynamic HTML
        res.json(wishData);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;

