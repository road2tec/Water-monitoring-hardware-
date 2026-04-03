import React, { useState, useEffect } from 'react';
import {
    Activity,
    AlertTriangle,
    Zap,
    Eye,
    ShieldCheck,
    Target,
    ArrowUpRight,
    Search,
    TrendingUp,
    Binary
} from 'lucide-react';

const Overview = () => {
    // Stats state initialized with zero, will be populated from DB
    const [stats, setStats] = useState({
        totalAnalyzed: 0,
        pollutionIndex: 0,
        avgConfidence: 0,
        objectsDetected: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardStats = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/dashboard/stats');
                if (response.ok) {
                    const data = await response.json();
                    if (data.success) {
                        setStats(data.stats);
                    }
                }
            } catch (error) {
                console.error('Error fetching dynamic stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardStats();
        // Refresh stats every 20 seconds for live feel
        const interval = setInterval(fetchDashboardStats, 20000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Top Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Underwater Intelligence</h1>
                    <p className="text-slate-500 mt-1 font-medium">Neural engine status and environmental risk assessment.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Find site coordinates..." 
                            className="pl-10 pr-4 py-3 bg-white border-2 border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all w-64 font-bold"
                        />
                    </div>
                    <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-black shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all flex items-center gap-2">
                        Export Intelligence <ArrowUpRight size={18} />
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Card 1: AI Processing Metrics */}
                <div className="bg-white rounded-[3rem] shadow-sm p-10 border border-slate-100 transition-all hover:shadow-2xl hover:-translate-y-2 duration-500 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                        <Binary size={120} strokeWidth={1} />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-10">
                            <h2 className="text-xl font-black text-slate-800 flex items-center gap-3 italic">
                                <span className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg"><Activity size={20} /></span> Analysis Stats
                            </h2>
                            <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-emerald-100">
                                Adaptive v3.0
                            </span>
                        </div>
                        <div className="space-y-6">
                            <StatItem icon={<Eye />} color="indigo" label="Photos Processed" value={stats.totalAnalyzed} unit="" />
                            <StatItem icon={<Target />} color="emerald" label="Targets Localized" value={stats.objectsDetected} unit="" />
                            <StatItem icon={<ShieldCheck />} color="amber" label="Avg Confidence" value={stats.avgConfidence} unit="%" />
                        </div>
                    </div>
                </div>

                {/* Card 2: Environment Severity */}
                <div className="bg-white rounded-[3rem] shadow-sm p-10 border-2 border-indigo-50 transition-all hover:shadow-2xl hover:-translate-y-2 duration-500 flex flex-col justify-between group">
                    <div className="relative">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-black text-slate-800 tracking-tight">Threat Status</h2>
                            <div className="flex gap-1">
                                {[1,2,3].map(i => <div key={i} className={`h-1.5 w-1.5 rounded-full ${i === 1 ? 'bg-rose-500 animate-pulse' : 'bg-slate-200'}`}></div>)}
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center py-6 text-center">
                            <div className="mb-8 p-10 bg-indigo-50 border-4 border-white rounded-full text-indigo-600 shadow-xl group-hover:rotate-12 transition-transform">
                                <AlertTriangle size={72} strokeWidth={1} />
                            </div>
                            <h3 className="text-3xl font-black text-indigo-600 mb-2">
                                HIGH RISK
                            </h3>
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Industrial Waste Incursion Detected</p>
                        </div>
                    </div>

                    <button className="w-full bg-slate-900 text-white py-5 rounded-3xl font-black text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-300 transform active:scale-95">
                        Initiate Cleanup Protocol
                    </button>
                </div>

                {/* Card 3: AI Insights */}
                <div className="bg-gradient-to-br from-indigo-600 to-violet-800 rounded-[3rem] shadow-2xl p-10 text-white transition-all hover:-translate-y-2 hover:shadow-indigo-300 duration-500 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                    <div>
                        <div className="flex items-center justify-between mb-10">
                            <h2 className="text-xl font-black text-white/90">Neural Insight</h2>
                            <Zap className="text-indigo-200 fill-indigo-200" size={32} />
                        </div>

                        <div className="space-y-6">
                            <div>
                                <p className="text-indigo-200 text-xs font-black uppercase tracking-widest mb-2">Primary Contaminant</p>
                                <p className="text-4xl font-black">Microplastics</p>
                            </div>
                            <div className="h-0.5 w-full bg-white/20 rounded-full"></div>
                            <div>
                                <p className="text-indigo-200 text-xs font-black uppercase tracking-widest mb-2">Estimated Zone Impact</p>
                                <p className="text-4xl font-black">4.2 KM²</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/10 p-5 rounded-2xl border border-white/20 mt-8 backdrop-blur-sm">
                        <p className="text-indigo-50 text-sm leading-relaxed italic font-medium">
                            "AI predicts a 15% increase in debris accumulation due to current vessel trajectories."
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Trend Section */}
            <div className="bg-white rounded-[4rem] shadow-sm border border-slate-100 p-12 overflow-hidden relative group">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 relative z-10 gap-6">
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                            <TrendingUp className="text-indigo-600" /> Detection Frequency
                        </h2>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-1">Cross-referencing historical AI scans</p>
                    </div>
                    <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                        {['Real-time', 'Aggregated'].map(period => (
                            <button key={period} className={`px-8 py-3 text-xs font-black rounded-xl transition-all uppercase tracking-widest ${period === 'Real-time' ? 'bg-white text-indigo-600 shadow-md border border-indigo-50' : 'text-slate-400 hover:text-slate-600'}`}>
                                {period}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="h-72 flex items-end justify-between gap-3 relative z-10">
                    {[40, 55, 45, 60, 80, 70, 90, 85, 65, 50, 45, 60, 75, 95, 80, 60, 40, 55, 65, 70, 85, 90, 100, 80].map((h, i) => (
                        <div key={i} className="flex-1 group relative">
                            <div
                                className={`w-full rounded-full transition-all duration-700 group-hover:scale-110 shadow-lg ${h > 80 ? 'bg-indigo-600' : h > 50 ? 'bg-indigo-400' : 'bg-slate-200'}`}
                                style={{ height: `${h}%` }}
                            ></div>
                            {/* Value tooltip on hover */}
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                {h}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const StatItem = ({ icon, color, label, value, unit }) => {
    const colorClasses = {
        indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
        emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        amber: 'bg-amber-50 text-amber-600 border-amber-100'
    };

    return (
        <div className="flex items-center justify-between p-6 bg-slate-50/50 rounded-[2rem] border border-slate-100 transition-all hover:bg-white hover:shadow-lg hover:border-indigo-100 group">
            <div className="flex items-center gap-5">
                <div className={`p-4 rounded-2xl border-2 border-white shadow-sm transition-transform group-hover:scale-110 ${colorClasses[color]}`}>
                    {React.cloneElement(icon, { size: 24, strokeWidth: 2 })}
                </div>
                <span className="font-bold text-slate-600 text-lg">{label}</span>
            </div>
            <div className="text-right">
                <span className="text-3xl font-black text-slate-900">{value}</span>
                {unit && <span className="text-xs font-black text-slate-400 ml-1 uppercase">{unit}</span>}
            </div>
        </div>
    );
};

export default Overview;
