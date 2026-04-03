import React, { useState } from 'react';
import { Upload, Camera, ImageIcon, Send, Loader2, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

const ImageAnalysis = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [isLive, setIsLive] = useState(false);
    const [videoRef] = useState(React.createRef());
    const [stream, setStream] = useState(null);

    const startLive = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
            setStream(mediaStream);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
            setIsLive(true);
            setResult(null);
        } catch (err) {
            console.error('Camera Error:', err);
            setError('Could not access camera. Please check permissions.');
        }
    };

    const stopLive = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
        setIsLive(false);
    };

    const captureFrame = () => {
        if (!videoRef.current) return;
        
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(videoRef.current, 0, 0);
        
        canvas.toBlob((blob) => {
            const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
            setSelectedImage(file);
            setPreviewUrl(URL.createObjectURL(file));
            stopLive();
        }, 'image/jpeg');
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setPreviewUrl(URL.createObjectURL(file));
            setResult(null);
            setError(null);
            if (isLive) stopLive();
        }
    };

    const handleUpload = async () => {
        if (!selectedImage) return;
        
        setAnalyzing(true);
        setError(null);
        
        try {
            const formData = new FormData();
            formData.append('image', selectedImage);

            const response = await fetch('http://localhost:5000/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setResult({
                    status: 'Complete',
                    detections: data.detections || [],
                    originalUrl: data.originalUrl,
                    enhancedUrl: data.enhancedUrl,
                    depthUrl: data.depthUrl,
                    confidence: data.detections && data.detections.length > 0 
                        ? Math.max(...data.detections.map(d => d.confidence)) 
                        : null
                });
            } else {
                setError(data.error || 'AI analysis failed. Please try again.');
            }
        } catch (err) {
            console.error('Upload Error:', err);
            setError('Could not connect to the server. Ensure the backend is running.');
        } finally {
            setAnalyzing(false);
        }
    };

    const resetSelection = () => {
        setSelectedImage(null);
        setPreviewUrl(null);
        setResult(null);
        setError(null);
        stopLive();
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700 pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">AI Vision Engine</h1>
                    <p className="text-slate-500 mt-2 text-lg font-medium">Capture or upload for deep-water neural intelligence.</p>
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={() => { if(isLive) stopLive(); else startLive(); }}
                        className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest border transition-all flex items-center gap-2
                            ${isLive ? 'bg-rose-500 text-white border-rose-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 shadow-sm'}
                        `}
                    >
                        {isLive ? <><div className="w-2 h-2 bg-white rounded-full animate-ping"></div> Stop Feed</> : <><Camera size={16} /> Live Optical Link</>}
                    </button>
                    <span className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-2xl font-bold text-xs uppercase tracking-widest border border-indigo-100 flex items-center">MiDaS v3.0</span>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                {/* Upload & Control Section */}
                <div className="xl:col-span-5 space-y-6">
                    <div 
                        className={`relative border-2 border-dashed rounded-[3rem] transition-all duration-500 flex flex-col items-center justify-center text-center overflow-hidden min-h-[450px] shadow-sm
                            ${previewUrl || isLive ? 'border-indigo-500 bg-black' : 'border-slate-200 bg-white hover:border-indigo-400 hover:bg-slate-50 cursor-pointer'}
                        `}
                        onClick={() => !analyzing && !isLive && !previewUrl && document.getElementById('imageUpload').click()}
                    >
                        <input 
                            type="file" 
                            id="imageUpload" 
                            className="hidden" 
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        
                        {isLive ? (
                            <div className="relative w-full h-full flex items-center justify-center group">
                                <video 
                                    ref={videoRef} 
                                    autoPlay 
                                    playsInline 
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-12">
                                    <h3 className="text-white text-3xl font-black mb-2 flex items-center gap-3">
                                        <div className="w-3 h-3 bg-rose-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(244,63,94,0.8)]"></div> Real-time Neural Stream
                                    </h3>
                                    <p className="text-white/60 mb-8 font-medium">Position your sample within the frame for optimal extraction.</p>
                                    <button 
                                        onClick={captureFrame}
                                        className="w-full py-5 bg-white text-black rounded-2xl font-black text-xl hover:bg-indigo-50 transition-all active:scale-95 shadow-2xl flex items-center justify-center gap-3"
                                    >
                                        <Camera size={24} /> Capture Intelligence
                                    </button>
                                </div>
                            </div>
                        ) : previewUrl ? (
                            <div className="relative group w-full p-8 bg-black/5">
                                <img 
                                    src={previewUrl} 
                                    alt="Preview" 
                                    className="w-full max-h-[350px] object-contain rounded-3xl shadow-2xl border-4 border-white/10"
                                />
                                {!analyzing && (
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity flex items-center justify-center backdrop-blur-sm pointer-events-none">
                                        <div className="bg-white p-4 rounded-full text-slate-800 shadow-xl scale-90 group-hover:scale-100 transition-transform">
                                            <ImageIcon size={32} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <div className="p-10 bg-indigo-100/50 text-indigo-600 rounded-full mb-8 border border-indigo-200 shadow-inner">
                                    <Upload size={64} strokeWidth={1} />
                                </div>
                                <h3 className="text-3xl font-black text-slate-800 mb-3 tracking-tight">Source Input</h3>
                                <p className="text-slate-400 max-w-sm font-medium text-lg leading-relaxed px-6">Feed the neural engine an image or start a live optical link.</p>
                            </>
                        )}
                    </div>

                    <div className="flex gap-4">
                        <button 
                            disabled={!selectedImage || analyzing || isLive}
                            onClick={handleUpload}
                            className={`flex-grow py-6 rounded-[2rem] font-black text-xl flex items-center justify-center gap-4 transition-all duration-300
                                ${!selectedImage || isLive 
                                    ? 'bg-slate-100 text-slate-300 cursor-not-allowed' 
                                    : 'bg-slate-900 text-white shadow-2xl shadow-slate-300 hover:scale-[1.02] active:scale-95'}
                            `}
                        >
                            {analyzing ? (
                                <>
                                    <RefreshCw className="animate-spin" size={28} /> Analyzing...
                                </>
                            ) : (
                                <>
                                    <Send size={24} /> Run AI Pipeline
                                </>
                            )}
                        </button>
                        <button 
                            onClick={resetSelection}
                            className="px-8 py-6 bg-white border-2 border-slate-100 rounded-[2rem] text-slate-600 hover:bg-slate-50 transition-all shadow-sm active:scale-90"
                        >
                            <RefreshCw size={28} />
                        </button>
                    </div>
                </div>

                {/* Multi-Stage Results Section */}
                <div className="xl:col-span-7 space-y-6">
                    <div className="bg-white rounded-[4rem] border-2 border-slate-100/50 p-1 split-grid-container h-full min-h-[500px] shadow-sm relative overflow-hidden flex flex-col">
                        {!result && !analyzing && !error ? (
                            <div className="flex-grow flex flex-col items-center justify-center text-center p-12 animate-in fade-in duration-1000">
                                <div className="p-12 bg-slate-50 rounded-full mb-8 border border-slate-100">
                                    <ImageIcon size={84} strokeWidth={0.5} className="text-slate-300" />
                                </div>
                                <h4 className="text-3xl font-black text-slate-800 mb-3 tracking-tight">Intelligence Gateway</h4>
                                <p className="text-slate-500 font-medium text-lg max-w-sm mx-auto">Upload an image to trigger the enhancement, depth, and detection pipeline.</p>
                            </div>
                        ) : analyzing ? (
                            <div className="flex-grow flex flex-col items-center justify-center bg-slate-50/50">
                                <div className="relative w-48 h-48 mb-12">
                                    <div className="absolute inset-0 border-[10px] border-slate-100 rounded-full"></div>
                                    <div className="absolute inset-0 border-[10px] border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="text-sm font-black text-indigo-600 tracking-[0.2em] uppercase mb-1">Scanning</div>
                                            <div className="h-1 w-12 bg-indigo-600 rounded-full mx-auto"></div>
                                        </div>
                                    </div>
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-white border border-slate-100 rounded-full shadow-lg text-[10px] font-black uppercase tracking-widest text-slate-800">Neural Engine v3.2</div>
                                </div>
                                <div className="space-y-3 text-center">
                                    <h3 className="text-3xl font-black text-slate-900 tracking-tight">Processing Underwater Scene</h3>
                                    <div className="flex items-center justify-center gap-6">
                                        <span className="text-slate-500 font-bold flex items-center gap-2"><div className="w-2 h-2 bg-indigo-500 rounded-full"></div> CLAHE Enhancement</span>
                                        <span className="text-slate-500 font-bold flex items-center gap-2"><div className="w-2 h-2 bg-emerald-500 rounded-full"></div> MiDaS Depth Mapping</span>
                                        <span className="text-slate-500 font-bold flex items-center gap-2"><div className="w-2 h-2 bg-amber-500 rounded-full"></div> YOLO Detection</span>
                                    </div>
                                </div>
                            </div>
                        ) : error ? (
                            <div className="flex-grow flex flex-col items-center justify-center text-center p-12">
                                <div className="p-10 bg-rose-50 text-rose-500 rounded-full mb-8">
                                    <AlertCircle size={72} strokeWidth={1} />
                                </div>
                                <h3 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Pipeline Fault</h3>
                                <p className="text-slate-500 font-medium text-lg max-w-sm">{error}</p>
                                <button onClick={handleUpload} className="mt-10 px-10 py-4 bg-slate-900 text-white rounded-[1.5rem] font-black text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">Try Again</button>
                            </div>
                        ) : (
                            <div className="animate-in fade-in zoom-in-95 duration-700 flex flex-col h-full bg-slate-50/30">
                                {/* Dashboard View */}
                                <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between px-2">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Raw Capture</span>
                                        </div>
                                        <div className="rounded-[2rem] overflow-hidden border-2 border-white shadow-xl shadow-slate-200/50 aspect-video">
                                            <img src={result.originalUrl} alt="Original" className="w-full h-full object-cover" />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between px-2">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500">Enhanced Clarity</span>
                                        </div>
                                        <div className="rounded-[2rem] overflow-hidden border-2 border-indigo-100 shadow-xl shadow-indigo-200/20 aspect-video">
                                            <img src={result.enhancedUrl} alt="Enhanced" className="w-full h-full object-cover" />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between px-2">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">AI Depth Mapping</span>
                                        </div>
                                        <div className="rounded-[2rem] overflow-hidden border-2 border-emerald-100 shadow-xl shadow-emerald-200/20 aspect-video">
                                            <img src={result.depthUrl} alt="Depth" className="w-full h-full object-cover" />
                                        </div>
                                    </div>
                                </div>

                                <div className="px-8 pb-8 flex-grow flex flex-col">
                                    <div className="bg-white rounded-[3rem] p-8 shadow-sm border border-slate-100 flex-grow">
                                        <div className="flex items-center justify-between mb-8">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-slate-900 text-white rounded-2xl shadow-lg">
                                                    <CheckCircle2 size={28} />
                                                </div>
                                                <div>
                                                    <h4 className="text-xl font-extrabold text-slate-900 leading-none mb-1">Scan Results</h4>
                                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Environment Intel Extraction</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-4">
                                                <div className="px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-center min-w-[120px]">
                                                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Objects</p>
                                                    <p className="text-2xl font-black text-slate-800 leading-none">{result.detections.length}</p>
                                                </div>
                                                <div className="px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-center min-w-[120px]">
                                                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Max Acc.</p>
                                                    <p className="text-2xl font-black text-indigo-600 leading-none">{result.confidence ? (result.confidence * 100).toFixed(0) : '0'}%</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid gap-4 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                                            {result.detections.length > 0 ? (
                                                result.detections.map((det, idx) => (
                                                    <div key={idx} className="flex items-center justify-between p-5 bg-slate-50/50 rounded-2xl border border-slate-50 hover:bg-white hover:border-indigo-100 transition-all duration-300">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-xl flex items-center justify-center font-black">
                                                                {idx + 1}
                                                            </div>
                                                            <span className="font-black text-lg text-slate-800 capitalize">{det.label}</span>
                                                        </div>
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-32 h-2.5 bg-slate-100 rounded-full overflow-hidden hidden sm:block">
                                                                <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${det.confidence * 100}%` }}></div>
                                                            </div>
                                                            <span className="font-black text-indigo-600 min-w-[40px] text-right">{(det.confidence * 100).toFixed(0)}%</span>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="text-center py-12 text-slate-400 font-bold italic">No targets localized within frame.</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes scan {
                    0%, 100% { top: 0%; }
                    50% { top: 100%; }
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 5px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #e2e8f0;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
            `}</style>
        </div>
    );
};

export default ImageAnalysis;

