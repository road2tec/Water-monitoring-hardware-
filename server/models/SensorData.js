const mongoose = require('mongoose');

const SensorDataSchema = new mongoose.Schema({
    ph: { type: Number, required: true },
    tds: { type: Number, required: true },
    turbidity: { type: Number, required: true },
    temperature: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('SensorData', SensorDataSchema);
