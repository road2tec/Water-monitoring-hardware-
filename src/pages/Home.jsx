import React from 'react';
import { 
    Activity, 
    ShieldCheck, 
    TrendingUp, 
    Bell, 
    ArrowRight, 
    Droplets, 
    Cpu, 
    MousePointerClick,
    ExternalLink,
    Microscope,
    Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    const features = [
        {
            title: 'Real-time Monitoring',
            description: 'Continuous tracking of clarity, debris, and accumulation with millisecond latency.',
            icon: <Activity className="h-6 w-6" />,
            color: 'blue'
        },
        {
            title: 'AI-Based Detection',
            description: 'Advanced neural networks to identify contaminants and biological hazards.',
            icon: <Cpu className="h-6 w-6" />,
            color: 'indigo'
        },
        {
            title: 'Future Prediction',
            description: 'Predictive modeling to forecast potential contamination events hours in advance.',
            icon: <TrendingUp className="h-6 w-6" />,
            color: 'emerald'
        },
        {
            title: 'Alert System',
            description: 'Instant multi-channel notifications for authorities and citizens during risk events.',
            icon: <Bell className="h-6 w-6" />,
            color: 'rose'
        },
    ];

    const stats = [
        { label: 'Neural Nodes Deployed', value: '1,240+' },
        { label: 'Zones Monitored', value: '48' },
        { label: 'Data Points/Day', value: '2.4M' },
        { label: 'AI Accuracy', value: '99.2%' },
    ];

    return (
        <div className="bg-slate-50 selection:bg-blue-100 selection:text-blue-900">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden min-h-[90vh] flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="animate-in slide-in-from-left-8 duration-1000">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-bold text-sm mb-6">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
                                </span>
                                Software-Defined Water Intelligence
                            </div>
                            <h1 className="text-6xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-8">
                                AI-Powered <br />
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Water Safety</span>
                            </h1>
                            <p className="text-xl text-slate-500 mb-10 leading-relaxed max-w-xl">
                                AquaGuard AI uses advanced neural vision to secure urban water systems. Experience real-time monitoring and predictive safety at your fingertips.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to="/register" className="bg-slate-900 text-white px-10 py-5 rounded-[1.5rem] font-bold text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3 active:scale-95 group">
                                    Join Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link to="/dashboard" className="bg-white text-slate-700 border border-slate-200 px-10 py-5 rounded-[1.5rem] font-bold text-lg hover:bg-slate-50 transition-all shadow-sm flex items-center justify-center gap-3 active:scale-95">
                                    Live Demo <MousePointerClick size={20} />
                                </Link>
                            </div>
                        </div>

                        <div className="relative animate-in zoom-in-95 duration-1000 delay-200">
                            <div className="relative z-10 bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-[3rem] border border-blue-100/50 shadow-2xl overflow-hidden">
                                <img 
                                    src="/hero_water_monitoring.png" 
                                    alt="AI Water Monitoring System" 
                                    className="w-full h-auto rounded-[2.5rem] hover:scale-105 transition-transform duration-700 pointer-events-none"
                                />
                            </div>
                            {/* Decorative elements */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-400 rounded-full blur-3xl opacity-20 animate-pulse delay-700"></div>
                        </div>
                    </div>
                </div>

                {/* Abstract Background */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50 to-transparent -z-10 rotate-12 translate-x-1/4 scale-150"></div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-white border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, i) => (
                            <div key={i} className="text-center p-8 rounded-3xl hover:bg-slate-50 transition-colors group">
                                <div className="text-4xl font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{stat.value}</div>
                                <div className="text-slate-400 font-bold uppercase text-xs tracking-widest">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-32 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Revolutionary Analysis</h2>
                        <p className="text-lg text-slate-500 leading-relaxed font-medium">
                            Our proprietary AI infrastructure processes millions of data points to ensure water quality standards are met across the entire city grid.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                                <div className={`mb-8 p-5 rounded-2xl inline-block transition-transform group-hover:rotate-6
                                    ${feature.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                                      feature.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' :
                                      feature.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                                      'bg-rose-50 text-rose-600'}
                                `}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                                <p className="text-slate-500 leading-relaxed font-medium">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* AI Showcase Section */}
            <section className="py-32 bg-slate-900 text-white overflow-hidden rounded-[4rem] mx-4 lg:mx-8 relative">
                <div className="max-w-7xl mx-auto px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-blue-400 font-bold text-sm mb-8">
                                <Microscope size={16} /> Intelligent Diagnostics
                            </div>
                            <h2 className="text-5xl font-black mb-8 leading-tight">
                                Visual Analysis <br />
                                Powered by Vision AI
                            </h2>
                            <p className="text-xl text-slate-400 mb-10 leading-relaxed">
                                Simply upload a photo of your water source, and our AI will analyze biological markers and turbidity instantly with 99.2% accuracy.
                            </p>
                            <ul className="space-y-6 mb-12">
                                {[
                                    'Identify 40+ common contaminants',
                                    'Biological hazard indicators',
                                    'Instant pH approximation',
                                    'Cloud-sync verification'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-4 text-lg font-bold">
                                        <div className="p-1 bg-emerald-500 rounded-full"><ShieldCheck size={18} /></div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Link to="/dashboard/image-analysis" className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 rounded-2xl font-bold hover:bg-blue-500 transition-all group">
                                Try Image Analysis <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                        <div className="relative">
                            <div className="aspect-square bg-blue-600/20 rounded-[3rem] p-12 border border-blue-500/30 backdrop-blur-3xl overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/40 to-transparent"></div>
                                <div className="relative z-10 h-full flex flex-col justify-end">
                                    <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                                        <div className="h-2 w-20 bg-blue-400 rounded-full mb-4"></div>
                                        <div className="h-2 w-full bg-white/20 rounded-full mb-2"></div>
                                        <div className="h-2 w-2/3 bg-white/20 rounded-full"></div>
                                    </div>
                                </div>
                                <Droplets className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500/20" size={300} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 relative">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <Globe className="mx-auto text-blue-600 mb-8" size={64} />
                    <h2 className="text-5xl font-black text-slate-900 mb-8 tracking-tight">Ready to Secure Your City's Water?</h2>
                    <p className="text-xl text-slate-500 mb-12 font-medium">
                        Join hundreds of municipalities and thousands of citizens already using AquaGuard AI.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link to="/register" className="px-12 py-5 bg-blue-600 text-white rounded-[1.5rem] font-black text-xl hover:bg-blue-700 shadow-2xl shadow-blue-200 transition-all active:scale-95">
                            Start Free Account
                        </Link>
                        <Link to="/" className="px-12 py-5 bg-white border border-slate-200 text-slate-700 rounded-[1.5rem] font-black text-xl hover:bg-slate-50 transition-all active:scale-95 flex items-center justify-center gap-3">
                            Contact Support <ExternalLink size={20} />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
