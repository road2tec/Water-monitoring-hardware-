import React, { useState, useEffect } from 'react';
import {
    Droplets,
    Activity,
    AlertTriangle,
    Zap,
    Thermometer,
    AlertCircle,
    Telescope,
    ArrowUpRight,
    Search
} from 'lucide-react';

const Overview = () => {
    const [readings, setReadings] = useState({
        ph: 7.8,
        tds: 480,
        turbidity: 6,
        temperature: 29
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReadings = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/sensor-data');
                if (response.ok) {
                    const data = await response.json();
                    setReadings(data);
                }
            } catch (error) {
                console.error('Error fetching sensor data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReadings();
        const interval = setInterval(fetchReadings, 5000); 
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Top Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Dashboard Overview</h1>
                    <p className="text-slate-500 mt-1">Welcome back! Here's what's happening with your water systems.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search zones..." 
                            className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all w-64"
                        />
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-2">
                        Download Report <ArrowUpRight size={18} />
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Card 1: Sensor Readings */}
                <div className="bg-white rounded-[2rem] shadow-sm p-8 border border-slate-100 transition-all hover:shadow-xl hover:-translate-y-1 duration-300">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <Activity className="text-blue-500" /> Live Readings
                        </h2>
                        <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider animate-pulse">
                            {loading ? 'Connecting...' : 'Live'}
                        </span>
                    </div>

                    <div className="space-y-4">
                        <ReadingItem icon={<Droplets />} color="indigo" label="pH Level" value={readings.ph} unit="" />
                        <ReadingItem icon={<Zap />} color="emerald" label="TDS" value={readings.tds} unit="ppm" />
                        <ReadingItem icon={<AlertCircle />} color="amber" label="Turbidity" value={readings.turbidity} unit="NTU" />
                        <ReadingItem icon={<Thermometer />} color="rose" label="Temp" value={readings.temperature} unit="°C" />
                    </div>
                </div>

                {/* Card 2: Current Status */}
                <div className="bg-white rounded-[2rem] shadow-sm p-8 border border-slate-100 border-l-8 border-l-red-500 transition-all hover:shadow-xl hover:-translate-y-1 duration-300 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold text-slate-800">Current Status</h2>
                            <div className="h-3 w-3 bg-red-500 rounded-full animate-ping"></div>
                        </div>

                        <div className="flex flex-col items-center justify-center py-6 text-center">
                            <div className="mb-6 p-6 bg-red-50 rounded-full text-red-500">
                                <AlertTriangle size={64} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-2xl font-black text-red-600 mb-2">
                                ⚠️ Contaminated
                            </h3>
                            <p className="text-slate-500">Immediate action required in Zone 4</p>
                        </div>
                    </div>

                    <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-md mt-4">
                        Deploy Team
                    </button>
                </div>

                {/* Card 3: AI Prediction */}
                <div className="bg-white rounded-[2rem] shadow-sm p-8 border border-slate-100 border-l-8 border-l-orange-500 transition-all hover:shadow-xl hover:-translate-y-1 duration-300 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold text-slate-800">AI Prediction</h2>
                            <Telescope className="text-orange-500" />
                        </div>

                        <div className="flex flex-col items-center justify-center py-6 text-center">
                            <div className="mb-4">
                                <div className="p-6 bg-orange-50 rounded-full text-orange-500 relative">
                                    <Zap size={64} strokeWidth={1.5} />
                                    <div className="absolute top-0 right-0 p-2 bg-white rounded-full shadow-md text-orange-600">
                                        <Zap size={20} fill="currentColor" />
                                    </div>
                                </div>
                            </div>
                            <h3 className="text-xl font-black text-orange-600 mb-3 px-4">
                                High Risk Detected
                            </h3>
                            <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-700 px-4 py-2 rounded-xl text-sm font-bold border border-orange-100">
                                Confidence: 89%
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mt-4">
                        <p className="text-slate-600 text-xs leading-relaxed italic">
                            "Upstream discharge detected. Contaminants expected in 2.5 hours."
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Analytics Section */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8 overflow-hidden relative">
                <div className="flex items-center justify-between mb-8 relative z-10">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">Trend Analytics</h2>
                        <p className="text-slate-500">Last 24 hours monitoring activity</p>
                    </div>
                    <div className="flex gap-2">
                        {['Daily', 'Weekly', 'Monthly'].map(period => (
                            <button key={period} className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all ${period === 'Daily' ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}>
                                {period}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="h-64 flex items-end justify-between gap-2 relative z-10">
                    {[40, 55, 45, 60, 80, 70, 90, 85, 65, 50, 45, 60, 75, 95, 80, 60, 40, 55, 65, 70, 85, 90, 100, 80].map((h, i) => (
                        <div key={i} className="flex-1 group relative">
                            <div
                                className={`w-full rounded-t-xl transition-all duration-500 group-hover:opacity-80 shadow-lg ${h > 80 ? 'bg-gradient-to-t from-red-600 to-red-400' : h > 60 ? 'bg-gradient-to-t from-orange-600 to-orange-400' : 'bg-gradient-to-t from-blue-600 to-blue-400'}`}
                                style={{ height: `${h}%` }}
                            ></div>
                        </div>
                    ))}
                </div>
                
                {/* Decoration */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-rose-50 rounded-full blur-3xl opacity-50"></div>
            </div>
        </div>
    );
};

const ReadingItem = ({ icon, color, label, value, unit }) => {
    const colorClasses = {
        indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
        emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        amber: 'bg-amber-50 text-amber-600 border-amber-100',
        rose: 'bg-rose-50 text-rose-600 border-rose-100'
    };

    return (
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-[1.25rem] border border-slate-100 group hover:bg-white hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl border ${colorClasses[color]}`}>
                    {React.cloneElement(icon, { size: 20 })}
                </div>
                <span className="font-bold text-slate-700">{label}</span>
            </div>
            <div className="text-right">
                <span className="text-2xl font-black text-slate-900">{value}</span>
                <span className="text-xs font-bold text-slate-400 ml-1 uppercase">{unit}</span>
            </div>
        </div>
    );
};

export default Overview;
