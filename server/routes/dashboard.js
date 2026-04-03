const express = require('express');
const router = express.Router();
const AnalysisResult = require('../models/AnalysisResult');

// GET /api/dashboard/stats
router.get('/stats', async (req, res) => {
    try {
        const totalAnalyzed = await AnalysisResult.countDocuments();
        const results = await AnalysisResult.find();
        
        let totalObjects = 0;
        let sumConfidence = 0;
        let detectionConfidenceCount = 0;
        
        results.forEach(res => {
            totalObjects += (res.detections ? res.detections.length : 0);
            if (res.detections && res.detections.length > 0) {
                const maxConf = Math.max(...res.detections.map(d => d.confidence || 0));
                sumConfidence += maxConf;
                detectionConfidenceCount++;
            }
        });

        const avgConfidence = detectionConfidenceCount > 0 
            ? (sumConfidence / detectionConfidenceCount) * 100 
            : 0;

        // Pollution Index (Dummy calculation based on object density)
        const pollutionIndex = totalAnalyzed > 0 
            ? Math.min(100, (totalObjects / totalAnalyzed) * 10).toFixed(1)
            : 0;

        res.json({
            success: true,
            stats: {
                totalAnalyzed,
                objectsDetected: totalObjects,
                avgConfidence: parseFloat(avgConfidence.toFixed(1)),
                pollutionIndex
            }
        });
    } catch (error) {
        console.error('Stats fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch dashboard intelligence' });
    }
});

// GET /api/dashboard/history
router.get('/history', async (req, res) => {
    try {
        const history = await AnalysisResult.find()
            .sort({ createdAt: -1 })
            .limit(10);
        res.json({ success: true, history });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch history' });
    }
});

// GET /api/dashboard/alerts
router.get('/alerts', async (req, res) => {
    try {
        const results = await AnalysisResult.find()
            .sort({ createdAt: -1 })
            .limit(10);
        
        const alerts = results.map((result, index) => {
            const hasHighDebris = result.totalObjects > 2;
            return {
                id: result._id,
                type: hasHighDebris ? 'critical' : 'warning',
                title: hasHighDebris ? 'High Debris in Sector 4' : 'Optical Flux Detected',
                time: new Date(result.createdAt).toLocaleTimeString(),
                desc: hasHighDebris 
                    ? `Abnormal density of ${result.totalObjects} objects detected. Neural nodes intensified.` 
                    : `Vision AI localized ${result.totalObjects} target(s). Precision confidence at ${(result.maxConfidence * 100).toFixed(0)}%.`
            };
        });

        res.json({ success: true, alerts });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch dynamic alerts' });
    }
});

// GET /api/dashboard/reports
router.get('/reports', async (req, res) => {
    try {
        const results = await AnalysisResult.find()
            .sort({ createdAt: -1 })
            .limit(8);
        
        const reports = results.map(res => ({
            name: `Neural Scan Report #${res._id.slice(-6).toUpperCase()}`,
            date: new Date(res.createdAt).toLocaleDateString(),
            size: `${(Math.random() * 5 + 1).toFixed(1)} MB`,
            type: 'PDF'
        }));

        res.json({ success: true, reports });
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate visual reports' });
    }
});

module.exports = router;
