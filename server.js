require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const adminRoutes = require('./routes/adminRoutes');
const wishRoutes = require('./routes/wishRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());

// IMPORTANT: Badi images aur multiple files ke data ko handle karne ke liye 50mb limit
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve Static Files (HTML, CSS, JS frontend files)
app.use(express.static(path.join(__dirname, 'public')));

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected Successfully!'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Routes Configuration
app.use('/api/admin', adminRoutes);
app.use('/api/wish', wishRoutes);

// Frontend Routes (Pages)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.get('/w/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'wish.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

