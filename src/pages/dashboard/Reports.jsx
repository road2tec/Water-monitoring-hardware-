import React, { useState, useEffect } from 'react';
import { FileText, Download, Calendar, ArrowRight, Database, Search } from 'lucide-react';

const Reports = () => {
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
                console.error('Error fetching history:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    return (
        <div className="space-y-8 animate-in slide-in-from-right-4 duration-700 pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Intelligence History</h1>
                    <p className="text-slate-500 mt-2 text-lg font-medium">Complete chronological log of neural scans and localized target data.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {loading ? (
                    <div className="h-64 flex items-center justify-center text-slate-400 font-black uppercase tracking-widest animate-pulse bg-white rounded-[3rem] border border-slate-100">Synchronizing Archives...</div>
                ) : history.length > 0 ? (
                    history.map((record) => (
                        <div key={record._id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 flex flex-col md:flex-row items-center justify-between hover:shadow-xl transition-all group gap-6">
                            <div className="flex items-center gap-6 w-full md:w-auto">
                                <div className="w-24 h-24 rounded-3xl overflow-hidden border-4 border-slate-50 shadow-inner flex-shrink-0">
                                    <img src={record.enhancedUrl} alt="Scan" className="w-full h-full object-cover" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-black text-slate-900 text-lg">Scan #{record._id.slice(-6).toUpperCase()}</h3>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                                            <Calendar size={14} /> {new Date(record.createdAt).toLocaleDateString()}
                                        </span>
                                        <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                                        <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">
                                            {record.totalObjects} Targets Found
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                                <div className="text-right hidden sm:block">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Max Acc.</p>
                                    <p className="text-xl font-black text-slate-800">{(record.maxConfidence * 100).toFixed(0)}%</p>
                                </div>
                                <div className="flex gap-2">
                                    <a 
                                        href={record.enhancedUrl} 
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="p-4 bg-slate-900 text-white rounded-2xl hover:bg-blue-600 transition-all shadow-lg active:scale-95"
                                    >
                                        <Download size={20} />
                                    </a>
                                    <button className="px-6 py-4 bg-slate-50 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all">
                                        View Data
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="bg-white rounded-[4rem] p-24 border border-dashed border-slate-200 text-center">
                        <Database className="mx-auto text-slate-200 mb-6" size={64} />
                        <h3 className="text-2xl font-black text-slate-900">Archives Empty</h3>
                        <p className="text-slate-400 font-medium mt-2">No neural intelligence has been recorded yet. Visit Image Analysis to start.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reports;
