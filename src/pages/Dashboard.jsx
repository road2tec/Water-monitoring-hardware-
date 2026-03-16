import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { 
    Search, 
    Bell, 
    User,
    Menu,
    X
} from 'lucide-react';

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">
            {/* Sidebar */}
            <div className={`transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-0'} lg:w-64`}>
                <Sidebar />
            </div>

            {/* Main Content Area */}
            <div className="flex-grow flex flex-col h-full overflow-hidden">
                {/* Top Bar */}
                <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors lg:hidden"
                        >
                            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                        <div className="hidden md:flex items-center gap-2 text-slate-400 text-sm font-medium">
                            <span>Dashboard</span>
                            <span>/</span>
                            <span className="text-slate-900 capitalize">
                                {window.location.pathname.split('/').pop() || 'Overview'}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden lg:flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 w-72 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
                            <Search size={18} className="text-slate-400" />
                            <input 
                                type="text" 
                                placeholder="Quick search..." 
                                className="bg-transparent border-none outline-none ml-3 text-sm w-full"
                            />
                        </div>
                        
                        <div className="flex items-center gap-4 border-l border-slate-200 pl-6">
                            <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-xl transition-colors">
                                <Bell size={20} />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                            </button>
                            
                            <div className="flex items-center gap-3 cursor-pointer group">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Punam Prajapati</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">User</p>
                                </div>
                                <div className="w-10 h-10 bg-blue-100 rounded-xl border-2 border-white shadow-sm flex items-center justify-center text-blue-600 font-black">
                                    PP
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Outlet */}
                <main className="flex-grow overflow-y-auto p-8 scroll-smooth">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
