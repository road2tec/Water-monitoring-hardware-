const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { exec } = require('child_process');
const fs = require('fs');

// Multer storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

const AnalysisResult = require('../models/AnalysisResult');

// POST /api/upload
router.post('/', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No image file uploaded' });
    }

    const imagePath = path.join(__dirname, '..', req.file.path);
    const outputDir = path.join(__dirname, '..', 'uploads');
    const pythonScript = path.join(__dirname, '..', 'ai', 'analyze.py');

    // Execute the Python underwater analysis script
    exec(`python "${pythonScript}" "${imagePath}" "${outputDir}"`, async (error, stdout, stderr) => {
        if (stderr) console.log("--- Python Debug Logs ---\n", stderr);

        if (error) {
            console.error(`AI Analysis error: ${error.message}`);
            return res.status(500).json({ error: "AI process crashed", details: error.message });
        }
        
        try {
            const jsonMatch = stdout.match(/\{.*\}/s);
            if (!jsonMatch) {
                console.error("No JSON in output:", stdout);
                return res.status(500).json({ error: "No recognizable data from AI" });
            }
            
            const results = JSON.parse(jsonMatch[0]);
            
            if (results.error) {
                return res.status(500).json({ error: results.error });
            }

            console.log(`Deep Analysis Success: ${results.detections.length} objects found`);
            
            // Save to Database for Dynamic Dashboard
            const newAnalysis = new AnalysisResult({
                imageName: req.file.filename,
                originalUrl: `http://localhost:5000/uploads/${req.file.filename}`,
                enhancedUrl: `http://localhost:5000/uploads/${results.enhancedUrl}`,
                depthUrl: `http://localhost:5000/uploads/${results.depthUrl}`,
                detections: results.detections,
                totalObjects: results.detections.length,
                maxConfidence: results.detections.length > 0 
                    ? Math.max(...results.detections.map(d => d.confidence))
                    : 0
            });
            await newAnalysis.save();
            
            res.json({
                success: true,
                imageName: req.file.filename,
                originalUrl: newAnalysis.originalUrl,
                enhancedUrl: newAnalysis.enhancedUrl,
                depthUrl: newAnalysis.depthUrl,
                detections: newAnalysis.detections
            });
        } catch (parseError) {
            console.error("JSON Parsing Error:", parseError.message);
            res.status(500).json({ error: "Failed to read AI results", details: parseError.message });
        }
    });
});

module.exports = router;
