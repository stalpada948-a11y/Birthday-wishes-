const mongoose = require('mongoose');

const wishSchema = new mongoose.Schema({
    uniqueId: { type: String, required: true, unique: true },
    receiverName: { type: String, required: true },
    senderName: { type: String, required: true },
    letterText: { type: String, required: true },
    birthdayDate: { type: Date },
    images: [{ type: String }], // Array of Cloudinary Image URLs
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Wish', wishSchema);

