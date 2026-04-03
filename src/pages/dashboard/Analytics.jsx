import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, PieChart, Activity, Cpu, Zap, Target } from 'lucide-react';

const Analytics = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/dashboard/history');
                if (response.ok) {
                    const data = await response.json();
                    if (data.success) {
                        setHistory(data.history || []);
                    }
                }
            } catch (error) {
                console.error('Error fetching analytics history:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    return (
        <div className="space-y-8 animate-in zoom-in-95 duration-700 pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">AI Temporal Intelligence</h1>
                    <p className="text-slate-500 mt-2 text-lg font-medium">Comparative analytics and neural engine performance metrics.</p>
                </div>
                <div className="bg-indigo-50 border border-indigo-100 px-6 py-3 rounded-2xl flex items-center gap-3">
                    <Activity className="text-indigo-600 animate-pulse" size={24} />
                    <span className="text-indigo-900 font-black text-sm uppercase tracking-widest">Real-time Stream Active</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Chart 1: Detection Frequency History */}
                <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm group hover:shadow-xl transition-all duration-500">
                    <div className="flex items-center justify-between mb-12">
                        <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                            <TrendingUp className="text-indigo-600" /> Accumulation Probability
                        </h3>
                        <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Last 10 Optical Scans</span>
                    </div>
                    
                    <div className="h-64 flex items-end justify-between gap-3 px-4 relative">
                        {loading ? (
                            <div className="absolute inset-0 flex items-center justify-center text-slate-300 font-black uppercase tracking-widest animate-pulse">Syncing Intelligence...</div>
                        ) : history.length > 0 ? (
                            history.map((item, idx) => {
                                const h = Math.min(100, 20 + (item.totalObjects * 25));
                                return (
                                    <div key={idx} className="flex-1 group/bar relative">
                                        <div 
                                            className={`w-full rounded-t-2xl transition-all duration-700 bg-gradient-to-t ${h > 60 ? 'from-indigo-600 to-indigo-400' : 'from-slate-300 to-slate-200'}`}
                                            style={{ height: `${h}%` }}
                                        >
                                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-black px-3 py-1.5 rounded-lg opacity-0 group-hover/bar:opacity-100 transition-opacity shadow-lg">
                                                {item.totalObjects} Obj
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 gap-4">
                                <Zap size={48} strokeWidth={1} />
                                <span className="font-black text-xs uppercase tracking-widest italic">Insufficient Scan History</span>
                            </div>
                        )}
                    </div>
                    <div className="mt-8 border-t border-slate-50 pt-8 flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">
                        <span>Older Scans</span>
                        <span>Recent Real-time Scan</span>
                    </div>
                </div>

                {/* Chart 2: Model Performance */}
                <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm group hover:shadow-xl transition-all duration-500">
                    <div className="flex items-center justify-between mb-12">
                        <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                            <Target className="text-emerald-500" /> Neural Confidence Range
                        </h3>
                    </div>
                    
                    <div className="space-y-8">
                        {loading ? (
                             <div className="h-64 flex items-center justify-center text-slate-300 font-black uppercase tracking-widest animate-pulse">Accessing Neural Core...</div>
                        ) : history.length > 0 ? (
                            history.slice(0, 4).map((item, idx) => (
                                <div key={idx} className="space-y-3">
                                    <div className="flex justify-between items-end">
                                        <span className="text-xs font-black text-slate-600 uppercase tracking-widest">Scan ID: {item._id.slice(-6)}</span>
                                        <span className="text-lg font-black text-emerald-600">{(item.maxConfidence * 100).toFixed(1)}%</span>
                                    </div>
                                    <div className="h-4 bg-slate-50 rounded-full overflow-hidden border border-slate-100 shadow-inner p-1">
                                        <div 
                                            className="h-full bg-emerald-500 rounded-full shadow-lg shadow-emerald-200 transition-all duration-1000"
                                            style={{ width: `${item.maxConfidence * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="h-64 flex flex-col items-center justify-center text-slate-300 gap-4">
                                <Activity size={48} strokeWidth={1} />
                                <span className="font-black text-xs uppercase tracking-widest italic">Awaiting AI Deployment</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-slate-900 rounded-[4rem] p-16 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-20 opacity-5 group-hover:rotate-12 transition-transform duration-1000">
                    <Binary size={300} />
                </div>
                <div className="relative z-10 max-w-2xl">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-4 bg-white/10 rounded-3xl backdrop-blur-xl border border-white/20">
                            <Cpu size={40} className="text-indigo-400" />
                        </div>
                        <h2 className="text-4xl font-black tracking-tight">AI Insights</h2>
                    </div>
                    <p className="text-slate-300 text-xl leading-relaxed mb-12 font-medium">
                        Our sustained neural scans have detected a 15% increase in non-degradable debris across localized sectors over the last 30 intervals. We recommend <span className="text-indigo-400 font-black italic underline decoration-wavy">intensifying deep optical scans</span> in Sector 4 immediately.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="px-10 py-5 bg-indigo-600 text-white rounded-3xl font-black text-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-indigo-900/50 transform active:scale-95">
                            Run Digital Forecast <Activity size={24} />
                        </button>
                        <button className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-3xl font-black text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-3 backdrop-blur-md">
                            Export Log <Zap size={24} />
                        </button>
                    </div>
                </div>
                <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-indigo-600/20 rounded-full blur-[120px]"></div>
            </div>
        </div>
    );
};

const Binary = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M10 9h4" />
        <path d="M10 12h4" />
        <path d="M10 15h4" />
        <path d="M2 8h20" />
        <path d="M2 16h20" />
        <path d="M8 2v20" />
        <path d="M16 2v20" />
    </svg>
);

export default Analytics;
