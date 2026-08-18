const mongoose = require('mongoose');

const wishSchema = new mongoose.Schema({
    wishId: { type: String, required: true, unique: true },
    receiverName: { type: String, required: true },
    senderName: { type: String, required: true },
    letterText: { type: String, required: true },
    birthdayDate: { type: String, required: true },
    images: { type: [String], default: [] }, 
    // Security Tracking Fields
    location: {
        lat: { type: String, default: 'Not Allowed' },
        lon: { type: String, default: 'Not Allowed' }
    },
    deviceInfo: { type: String, default: 'Unknown' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Wish', wishSchema);
