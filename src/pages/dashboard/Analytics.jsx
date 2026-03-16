import React from 'react';
import { BarChart3, TrendingUp, PieChart, Activity, Cpu } from 'lucide-react';

const Analytics = () => {
    return (
        <div className="space-y-8 animate-in zoom-in-95 duration-700">
            <div>
                <h1 className="text-3xl font-bold text-slate-800">AI Analytics</h1>
                <p className="text-slate-500 mt-1">Deep analysis of water quality trends using machine learning models.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <TrendingUp className="text-indigo-500" /> Contamination Probability
                        </h3>
                    </div>
                    <div className="h-64 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 font-medium">
                        [Chart Visualization: Probability over Time]
                    </div>
                </div>

                <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <PieChart className="text-emerald-500" /> Pollutant Distribution
                        </h3>
                    </div>
                    <div className="h-64 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 font-medium">
                        [Chart Visualization: TDS vs pH vs Turbidity]
                    </div>
                </div>
            </div>

            <div className="bg-indigo-900 rounded-[2rem] p-10 text-white relative overflow-hidden">
                <div className="relative z-10 max-w-2xl">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-indigo-500/30 rounded-2xl backdrop-blur-md">
                            <Cpu size={32} className="text-indigo-200" />
                        </div>
                        <h2 className="text-3xl font-black">AI Insights</h2>
                    </div>
                    <p className="text-indigo-100 text-lg leading-relaxed mb-8">
                        Our AI models have detected a 15% increase in industrial residue across all zones over the last 30 days. We recommend increasing sensor frequency in Zone 4.
                    </p>
                    <button className="px-8 py-4 bg-white text-indigo-900 rounded-2xl font-bold hover:bg-indigo-50 transition-all flex items-center gap-2">
                        View Detailed Forecast <Activity size={20} />
                    </button>
                </div>
                <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-indigo-500/10 to-transparent"></div>
            </div>
        </div>
    );
};

export default Analytics;
