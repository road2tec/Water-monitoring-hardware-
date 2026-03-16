import React, { useState } from 'react';
import { Upload, Camera, ImageIcon, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

const ImageAnalysis = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setPreviewUrl(URL.createObjectURL(file));
            setResult(null);
        }
    };

    const handleUpload = () => {
        if (!selectedImage) return;
        setAnalyzing(true);
        
        // Simulating AI analysis
        setTimeout(() => {
            setAnalyzing(false);
            setResult({
                status: 'Success',
                contamination: 'Moderate',
                prediction: 'Detected presence of micro-plastics and algae.',
                confidence: '94%'
            });
        }, 3000);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
            <div>
                <h1 className="text-3xl font-bold text-slate-800">Visual Water Analysis</h1>
                <p className="text-slate-500 mt-1">Upload a photo of water for instant AI-powered quality assessment.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Upload Section */}
                <div className="space-y-6">
                    <div 
                        className={`relative border-2 border-dashed rounded-[2.5rem] p-12 transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer
                            ${previewUrl ? 'border-blue-500 bg-blue-50/30' : 'border-slate-200 bg-white hover:border-blue-400 hover:bg-slate-50'}
                        `}
                        onClick={() => document.getElementById('imageUpload').click()}
                    >
                        <input 
                            type="file" 
                            id="imageUpload" 
                            className="hidden" 
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        
                        {previewUrl ? (
                            <img 
                                src={previewUrl} 
                                alt="Preview" 
                                className="w-full max-h-80 object-cover rounded-3xl shadow-xl border-4 border-white"
                            />
                        ) : (
                            <>
                                <div className="p-6 bg-blue-50 rounded-full text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                                    <Upload size={48} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">Click or Drag to Upload</h3>
                                <p className="text-slate-400 max-w-xs">Supported formats: JPG, PNG. Max size 5MB.</p>
                            </>
                        )}
                        
                        {previewUrl && (
                            <div className="absolute top-4 right-4 flex gap-2">
                                <button 
                                    onClick={(e) => { e.stopPropagation(); setPreviewUrl(null); setSelectedImage(null); }}
                                    className="p-2 bg-white/90 backdrop-blur rounded-xl text-rose-500 shadow-md hover:bg-rose-500 hover:text-white transition-all"
                                >
                                    Remove
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-4">
                        <button 
                            disabled={!selectedImage || analyzing}
                            onClick={handleUpload}
                            className={`flex-grow py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all
                                ${!selectedImage 
                                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                                    : 'bg-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95'}
                            `}
                        >
                            {analyzing ? (
                                <>
                                    <Loader2 className="animate-spin" /> Analyzing Image...
                                </>
                            ) : (
                                <>
                                    <Send size={20} /> Start AI Analysis
                                </>
                            )}
                        </button>
                        <button className="px-6 py-4 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                            <Camera size={24} />
                        </button>
                    </div>
                </div>

                {/* Results Section */}
                <div className="space-y-6">
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 p-10 h-full flex flex-col min-h-[400px]">
                        {!result && !analyzing ? (
                            <div className="flex-grow flex flex-col items-center justify-center text-center text-slate-400">
                                <div className="p-8 bg-slate-50 rounded-full mb-6">
                                    <ImageIcon size={64} strokeWidth={1} />
                                </div>
                                <p className="text-lg font-medium">Upload a photo to see the analysis results here.</p>
                            </div>
                        ) : analyzing ? (
                            <div className="flex-grow flex flex-col items-center justify-center">
                                <div className="relative w-32 h-32 mb-8">
                                    <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
                                    <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                                    <div className="absolute inset-0 flex items-center justify-center text-blue-600 font-bold">
                                        SCAN
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-800 mb-2">Processing Pixels...</h3>
                                <p className="text-slate-500">Checking for impurities and biological markers.</p>
                            </div>
                        ) : (
                            <div className="animate-in zoom-in-95 duration-500">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
                                        <CheckCircle2 size={32} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-800 leading-none mb-1">Analysis Complete</h3>
                                        <p className="text-slate-500 font-medium tracking-tight">Image Token ID: IMG-{Math.floor(Math.random() * 10000)}</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                            <p className="text-slate-500 text-sm font-bold uppercase mb-1">Contamination</p>
                                            <p className="text-2xl font-black text-amber-500">{result.contamination}</p>
                                        </div>
                                        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                            <p className="text-slate-500 text-sm font-bold uppercase mb-1">AI Confidence</p>
                                            <p className="text-2xl font-black text-blue-600">{result.confidence}</p>
                                        </div>
                                    </div>

                                    <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-3xl">
                                        <h4 className="font-bold text-emerald-800 mb-2 flex items-center gap-2">
                                            <AlertCircle size={18} /> AI Observations
                                        </h4>
                                        <p className="text-emerald-700 leading-relaxed font-medium">
                                            {result.prediction}
                                        </p>
                                    </div>

                                    <button className="w-full py-4 text-blue-600 font-bold hover:bg-blue-50 rounded-2xl transition-all">
                                        Download Detailed PDF Report
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageAnalysis;
