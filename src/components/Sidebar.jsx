import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
    LayoutDashboard, 
    Droplets, 
    BarChart3, 
    FileText, 
    Bell, 
    Settings,
    LogOut
} from 'lucide-react';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login');
    };

    const menuItems = [
        { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
        { icon: Droplets, label: 'Live Sensors', path: '/dashboard/sensors' },
        { icon: FileText, label: 'Image Analysis', path: '/dashboard/image-analysis' },
        { icon: BarChart3, label: 'AI Analytics', path: '/dashboard/analytics' },
        { icon: FileText, label: 'Reports', path: '/dashboard/reports' },
        { icon: Bell, label: 'Alerts', path: '/dashboard/alerts' },
        { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
    ];

    return (
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen fixed left-0 top-0 z-40">
            <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-200">
                    <Droplets size={24} />
                </div>
                <h2 className="font-bold text-slate-800 text-xl tracking-tight">AquaGuard AI</h2>
            </div>

            <nav className="flex-grow p-4 space-y-2 mt-4">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === '/dashboard'}
                        className={({ isActive }) => `
                            flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200
                            ${isActive 
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                                : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'}
                        `}
                    >
                        <item.icon size={20} />
                        <span className="font-semibold">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-100">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 w-full text-slate-600 hover:bg-rose-50 hover:text-rose-600 rounded-2xl transition-all duration-200 font-semibold text-left"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
