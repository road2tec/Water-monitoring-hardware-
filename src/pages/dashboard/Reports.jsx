import React from 'react';
import { FileText, Download, Calendar, ArrowRight } from 'lucide-react';

const Reports = () => {
    const reports = [
        { name: 'Weekly Water Quality Summary', date: 'Oct 14, 2023', size: '2.4 MB', type: 'PDF' },
        { name: 'Monthly Industrial Impact Report', date: 'Oct 01, 2023', size: '5.1 MB', type: 'PDF' },
        { name: 'Sensor Calibration Logs', date: 'Sep 28, 2023', size: '1.2 MB', type: 'CSV' },
        { name: 'Zone 4 Incident Report', date: 'Sep 24, 2023', size: '840 KB', type: 'PDF' },
    ];

    return (
        <div className="space-y-8 animate-in slide-in-from-right-4 duration-700">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Generated Reports</h1>
                    <p className="text-slate-500 mt-1">Access and download historical data reports.</p>
                </div>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center gap-2">
                    Generate New Report <ArrowRight size={18} />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reports.map((report) => (
                    <div key={report.name} className="bg-white p-6 rounded-[2rem] border border-slate-100 flex items-center justify-between hover:shadow-lg transition-all group">
                        <div className="flex items-center gap-5">
                            <div className="p-4 bg-slate-50 rounded-2xl text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-all">
                                <FileText size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800 mb-1">{report.name}</h3>
                                <div className="flex items-center gap-4 text-xs text-slate-400 font-bold uppercase tracking-wider">
                                    <span className="flex items-center gap-1"><Calendar size={12} /> {report.date}</span>
                                    <span>{report.size}</span>
                                    <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">{report.type}</span>
                                </div>
                            </div>
                        </div>
                        <button className="p-3 text-slate-400 hover:text-blue-600 transition-colors">
                            <Download size={24} />
                        </button>
                    </div>
                ))}
            </div>

            <div className="bg-slate-900 rounded-[2rem] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                    <h2 className="text-2xl font-bold mb-2">Automated Reporting</h2>
                    <p className="text-slate-400">Receive weekly summaries directly in your email inbox.</p>
                </div>
                <div className="flex gap-4">
                    <input type="email" placeholder="Enter email address" className="bg-white/10 border border-white/20 px-6 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white" />
                    <button className="px-6 py-3 bg-blue-600 rounded-xl font-bold hover:bg-blue-700 transition-all">Subscribe</button>
                </div>
            </div>
        </div>
    );
};

export default Reports;
