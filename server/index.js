const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB via Compass (localhost:27017)'))
    .catch(err => console.error('MongoDB connection error:', err));

const User = require('./models/User');
const SensorData = require('./models/SensorData');
const uploadRoute = require('./routes/upload');
const dashboardRoute = require('./routes/dashboard');

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- API Routes ---
app.use('/api/upload', uploadRoute);
app.use('/api/dashboard', dashboardRoute);

// Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'API is running' });
});

// User Registration
app.post('/api/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully', userId: newUser._id });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// User Login
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password }); // Simple plain text check for demo
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        res.json({ message: 'Logged in successfully', user: { name: user.name, email: user.email } });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Get Latest Sensor Reading
app.get('/api/sensor-data', async (req, res) => {
    try {
        const latestData = await SensorData.findOne().sort({ createdAt: -1 });
        if (!latestData) {
            // Return default dummy data if DB is empty
            return res.json({
                ph: 7.8,
                tds: 480,
                turbidity: 6,
                temperature: 29
            });
        }
        res.json(latestData);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Seed Initial Data (Helper)
app.post('/api/seed', async (req, res) => {
    try {
        const seedData = new SensorData({
            ph: 7.8,
            tds: 480,
            turbidity: 6,
            temperature: 29
        });
        await seedData.save();
        res.json({ message: 'Data seeded successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Seeding failed', error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
