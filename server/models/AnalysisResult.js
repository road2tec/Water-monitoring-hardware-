const mongoose = require('mongoose');

const AnalysisResultSchema = new mongoose.Schema({
    imageName: { type: String, required: true },
    originalUrl: { type: String, required: true },
    enhancedUrl: { type: String, required: true },
    depthUrl: { type: String, required: true },
    detections: [{
        label: String,
        confidence: Number,
        bbox: [Number]
    }],
    totalObjects: { type: Number, default: 0 },
    maxConfidence: { type: Number, default: 0 },
    timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('AnalysisResult', AnalysisResultSchema);
