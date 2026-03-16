import React from 'react';
import { Bell, AlertTriangle, CheckCircle2, Info, ArrowRight } from 'lucide-react';

const Alerts = () => {
    const alerts = [
        { id: 1, type: 'critical', title: 'High Contamination in Zone 4', time: '12 mins ago', desc: 'pH level dropped to 6.2 and TDS spiked to 890ppm. Automated valves closed.' },
        { id: 2, type: 'warning', title: 'Turbidity Flux in Zone 2', time: '1 hour ago', desc: 'Minor increase in particulate matter detected. Monitoring frequency increased.' },
        { id: 3, type: 'info', title: 'System Update Successful', time: '5 hours ago', desc: 'AI node version 2.4.1 deployed to all edge sensors.' },
        { id: 4, type: 'success', title: 'Maintenance Complete', time: '1 day ago', desc: 'Sensor Unit SN-005 successfully calibrated at Water Treatment Plant.' },
    ];

    const getIcon = (type) => {
        switch(type) {
            case 'critical': return <AlertTriangle className="text-rose-500" />;
            case 'warning': return <AlertTriangle className="text-amber-500" />;
            case 'success': return <CheckCircle2 className="text-emerald-500" />;
            default: return <Info className="text-blue-500" />;
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Alert Center</h1>
                    <p className="text-slate-500 mt-1">Manage system notifications and critical event logs.</p>
                </div>
                <button className="text-blue-600 font-bold hover:underline flex items-center gap-1">
                    Mark all as read <ArrowRight size={16} />
                </button>
            </div>

            <div className="space-y-4">
                {alerts.map((alert) => (
                    <div key={alert.id} className={`p-6 rounded-[2rem] border transition-all hover:shadow-md flex gap-5 ${
                        alert.type === 'critical' ? 'bg-rose-50/50 border-rose-100' : 
                        alert.type === 'warning' ? 'bg-amber-50/50 border-amber-100' :
                        'bg-white border-slate-100'
                    }`}>
                        <div className={`p-4 rounded-2xl h-fit ${
                            alert.type === 'critical' ? 'bg-rose-100' : 
                            alert.type === 'warning' ? 'bg-amber-100' :
                            alert.type === 'success' ? 'bg-emerald-100' : 'bg-blue-100'
                        }`}>
                            {getIcon(alert.type)}
                        </div>
                        <div className="flex-grow">
                            <div className="flex items-center justify-between mb-1">
                                <h3 className="font-bold text-slate-900 text-lg">{alert.title}</h3>
                                <span className="text-xs font-bold text-slate-400 uppercase">{alert.time}</span>
                            </div>
                            <p className="text-slate-600 leading-relaxed">{alert.desc}</p>
                            <div className="mt-4 flex gap-3">
                                <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50">View Details</button>
                                <button className="px-4 py-2 text-sm font-bold text-slate-400 hover:text-slate-600">Dismiss</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Alerts;
