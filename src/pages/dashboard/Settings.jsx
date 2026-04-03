import React from 'react';
import { Settings as SettingsIcon, Shield, Bell, User, Database, Globe } from 'lucide-react';

const Settings = () => {
    const settingsGroups = [
        { icon: User, label: 'Profile Settings', desc: 'Manage your personal information and preferences.' },
        { icon: Bell, label: 'Notifications', desc: 'Configure how you receive alerts and reports.' },
        { icon: Shield, label: 'Security', desc: 'Manage passwords and account authentication.' },
        { icon: Database, label: 'Data Sources', desc: 'Connect and manage external vision nodes.' },
        { icon: Globe, label: 'Neural Sectors', desc: 'Configure geographical sectors for monitoring.' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div>
                <h1 className="text-3xl font-bold text-slate-800">System Settings</h1>
                <p className="text-slate-500 mt-1">Configure your dashboard and monitoring preferences.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {settingsGroups.map((group) => (
                    <div key={group.label} className="bg-white p-6 rounded-[2rem] border border-slate-100 hover:shadow-lg transition-all cursor-pointer group flex items-start gap-5">
                        <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all text-slate-600">
                            <group.icon size={24} />
                        </div>
                        <div className="flex-grow">
                            <h3 className="font-bold text-slate-800 text-lg mb-1">{group.label}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">{group.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-rose-50 border border-rose-100 rounded-[2rem] p-8 mt-12">
                <h3 className="text-rose-800 font-bold text-xl mb-4">Advanced Danger Zone</h3>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <p className="text-rose-600 font-medium">Reset all neural node mapping data and clear history logs.</p>
                    <button className="px-6 py-3 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700 transition-all shadow-lg shadow-rose-200">
                        Factory Reset
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
