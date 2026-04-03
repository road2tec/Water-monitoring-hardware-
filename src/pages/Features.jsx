import React from 'react';
import { 
    Activity, 
    Cpu, 
    TrendingUp, 
    Bell, 
    ShieldCheck, 
    Droplets, 
    Camera, 
    Wifi, 
    BarChart3, 
    Clock, 
    Zap, 
    ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Features = () => {
    const mainFeatures = [
        {
            icon: <Activity size={28} />,
            title: 'Neural Vision Architecture',
            description: 'Identify biological markers, debris, and turbidity levels using deep neural scanning with millisecond latency via our distributed AI cloud.',
            color: 'blue'
        },
        {
            icon: <Cpu size={28} />,
            title: 'AI-Powered Detection',
            description: 'Deep learning models trained on millions of water samples instantly detect contaminants, biological hazards, and chemical anomalies.',
            color: 'indigo'
        },
        {
            icon: <TrendingUp size={28} />,
            title: 'Predictive Analytics',
            description: 'Our AI forecasts contamination events hours in advance using historical patterns, visual data streams, and upstream pattern analysis.',
            color: 'emerald'
        },
        {
            icon: <Bell size={28} />,
            title: 'Smart Alert System',
            description: 'Multi-channel notifications via SMS, email, and push alerts instantly warn authorities and citizens during critical water safety events.',
            color: 'rose'
        },
        {
            icon: <Camera size={28} />,
            title: 'Visual Image Analysis',
            description: 'Upload photos of water sources and our Vision AI identifies biological markers, turbidity levels, and potential contaminants instantly.',
            color: 'amber'
        },
        {
            icon: <ShieldCheck size={28} />,
            title: 'Automated Safety Reports',
            description: 'Generate comprehensive water quality reports automatically with compliance checks against WHO and national safety standards.',
            color: 'violet'
        },
    ];

    const techSpecs = [
        { icon: <Wifi size={20} />, label: 'Neural Protocol', value: 'Edge + Cloud AI' },
        { icon: <Clock size={20} />, label: 'Scan Frequency', value: 'Every 5 seconds' },
        { icon: <BarChart3 size={20} />, label: 'Inferences/Day', value: '2.4 Million' },
        { icon: <Zap size={20} />, label: 'Response Time', value: '< 200ms' },
    ];

    const getColorClasses = (color) => {
        const map = {
            blue: 'bg-blue-50 text-blue-600 border-blue-100',
            indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
            emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
            rose: 'bg-rose-50 text-rose-600 border-rose-100',
            amber: 'bg-amber-50 text-amber-600 border-amber-100',
            violet: 'bg-violet-50 text-violet-600 border-violet-100',
        };
        return map[color];
    };

    return (
        <div className="bg-slate-50 pt-32 pb-20 selection:bg-blue-100 selection:text-blue-900">
            {/* Header */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 text-center mb-24">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-bold text-sm mb-6">
                    <Zap size={16} /> Platform Capabilities
                </div>
                <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight mb-6">
                    Powerful Features for <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Smarter Water Safety</span>
                </h1>
                <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
                    AquaGuard AI combines cutting-edge neural vision engines with advanced machine learning to deliver comprehensive water quality intelligence.
                </p>
            </section>

            {/* Features Grid */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {mainFeatures.map((feature, index) => (
                        <div 
                            key={index} 
                            className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
                        >
                            <div className={`p-5 rounded-2xl inline-block mb-8 border transition-transform group-hover:scale-110 group-hover:rotate-3 ${getColorClasses(feature.color)}`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                            <p className="text-slate-500 leading-relaxed font-medium">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Tech Specs */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-32">
                <div className="bg-slate-900 rounded-[3rem] p-12 lg:p-16 relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-4xl font-black text-white mb-4">Technical Specifications</h2>
                        <p className="text-slate-400 font-medium mb-12 max-w-xl">Enterprise-grade infrastructure built for reliability and scale.</p>
                        
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                            {techSpecs.map((spec, i) => (
                                <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center hover:bg-white/10 transition-all">
                                    <div className="text-blue-400 mb-4 flex justify-center">{spec.icon}</div>
                                    <div className="text-3xl font-black text-white mb-2">{spec.value}</div>
                                    <div className="text-slate-400 font-bold text-sm uppercase tracking-widest">{spec.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-600 rounded-full blur-[120px] opacity-20"></div>
                    <div className="absolute -left-20 -top-20 w-80 h-80 bg-indigo-600 rounded-full blur-[120px] opacity-20"></div>
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-4xl mx-auto px-6 text-center">
                <h2 className="text-4xl font-black text-slate-900 mb-6">Ready to Experience These Features?</h2>
                <p className="text-lg text-slate-500 mb-10 font-medium">Start your free trial and deploy AI-powered water monitoring in minutes.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link to="/register" className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 shadow-xl shadow-slate-200 transition-all active:scale-95 flex items-center justify-center gap-3">
                        Get Started Free <ArrowRight size={20} />
                    </Link>
                    <Link to="/dashboard" className="px-10 py-5 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all active:scale-95">
                        View Live Demo
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Features;
