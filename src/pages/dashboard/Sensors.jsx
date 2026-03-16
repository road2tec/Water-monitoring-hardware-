import React from 'react';
import { Droplets, RefreshCcw, Filter } from 'lucide-react';

const Sensors = () => {
    const sensorList = [
        { id: 'SN-001', zone: 'Zone 1 (Industrial)', status: 'Optimal', ph: 7.2, tds: 420, quality: 'Good' },
        { id: 'SN-002', zone: 'Zone 2 (Residential)', status: 'Optimal', ph: 7.4, tds: 380, quality: 'Excellent' },
        { id: 'SN-003', zone: 'Zone 3 (Commercial)', status: 'Warning', ph: 8.1, tds: 510, quality: 'Fair' },
        { id: 'SN-004', zone: 'Zone 4 (River Inlet)', status: 'Danger', ph: 6.2, tds: 890, quality: 'Poor' },
        { id: 'SN-005', zone: 'Zone 5 (Water Plant)', status: 'Optimal', ph: 7.0, tds: 300, quality: 'Excellent' },
    ];

    return (
        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Live Sensors</h1>
                    <p className="text-slate-500 mt-1">Real-time status of all deployed monitoring units.</p>
                </div>
                <div className="flex gap-3">
                    <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all">
                        <Filter size={20} />
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition-all">
                        <RefreshCcw size={18} /> Refresh Data
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 text-slate-500 uppercase text-xs font-bold tracking-widest border-b border-slate-100">
                            <th className="px-8 py-6">Sensor ID</th>
                            <th className="px-8 py-6">Location / Zone</th>
                            <th className="px-8 py-6">Status</th>
                            <th className="px-8 py-6">pH Level</th>
                            <th className="px-8 py-6">TDS (ppm)</th>
                            <th className="px-8 py-6 text-right">Quality</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {sensorList.map((sensor) => (
                            <tr key={sensor.id} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="px-8 py-6 font-bold text-slate-900">{sensor.id}</td>
                                <td className="px-8 py-6 text-slate-600 font-medium">{sensor.zone}</td>
                                <td className="px-8 py-6">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                                        sensor.status === 'Optimal' ? 'bg-emerald-50 text-emerald-600' :
                                        sensor.status === 'Warning' ? 'bg-amber-50 text-amber-600' :
                                        'bg-rose-50 text-rose-600'
                                    }`}>
                                        {sensor.status}
                                    </span>
                                </td>
                                <td className="px-8 py-6 font-mono text-slate-700">{sensor.ph}</td>
                                <td className="px-8 py-6 font-mono text-slate-700">{sensor.tds}</td>
                                <td className="px-8 py-6 text-right">
                                    <span className={`font-bold ${
                                        sensor.quality === 'Excellent' ? 'text-emerald-500' :
                                        sensor.quality === 'Good' ? 'text-blue-500' :
                                        sensor.quality === 'Fair' ? 'text-amber-500' :
                                        'text-rose-500'
                                    }`}>
                                        {sensor.quality}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] p-8 text-white shadow-xl shadow-blue-200 relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-xl font-bold mb-2">Sensor Health</h3>
                        <p className="text-blue-100 text-sm mb-6">98.4% of sensors are reporting active data.</p>
                        <div className="flex items-end gap-3">
                            <span className="text-5xl font-black">24/25</span>
                            <span className="text-blue-200 font-bold mb-2">Active Units</span>
                        </div>
                    </div>
                    <Droplets className="absolute -right-8 -bottom-8 opacity-10 rotate-12" size={200} />
                </div>
                
                <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-slate-800 mb-1">Maintenance Alert</h3>
                        <p className="text-slate-500 text-sm">Sensor SN-012 requires calibration.</p>
                    </div>
                    <button className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all">
                        Schedule
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sensors;
