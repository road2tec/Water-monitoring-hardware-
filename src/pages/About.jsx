import React from 'react';
import { 
    Droplets, 
    Target, 
    Users, 
    Globe, 
    Award, 
    Heart, 
    ArrowRight, 
    CheckCircle2 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
    const values = [
        { icon: <Target size={24} />, title: 'Our Mission', desc: 'To make clean, safe drinking water accessible to every citizen through intelligent monitoring and early warning systems.' },
        { icon: <Globe size={24} />, title: 'Global Vision', desc: 'We aim to deploy AquaGuard AI across 500+ cities worldwide by 2030, protecting billions of lives from waterborne diseases.' },
        { icon: <Heart size={24} />, title: 'Community First', desc: 'Every feature we build is designed with the end-user in mind — from city engineers to everyday citizens checking their tap water.' },
    ];

    const milestones = [
        { year: '2022', title: 'Research Initiated', desc: 'AI water quality detection research began at the university level.' },
        { year: '2023', title: 'Prototype Deployed', desc: 'First IoT sensors deployed in pilot zone with real-time monitoring.' },
        { year: '2024', title: 'AI Model v2.0', desc: 'Deep learning model achieved 99.2% accuracy in contaminant detection.' },
        { year: '2025', title: 'City-Wide Rollout', desc: 'Full deployment across 48 zones with 1,240+ active sensor units.' },
    ];

    const team = [
        { name: 'Dr. Priya Sharma', role: 'AI Research Lead', initials: 'PS' },
        { name: 'Rahul Deshmukh', role: 'IoT Systems Architect', initials: 'RD' },
        { name: 'Sneha Patil', role: 'Data Scientist', initials: 'SP' },
        { name: 'Amit Kulkarni', role: 'Full-Stack Engineer', initials: 'AK' },
    ];

    return (
        <div className="bg-slate-50 pt-32 pb-20 selection:bg-blue-100 selection:text-blue-900">
            {/* Header */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 font-bold text-sm mb-6">
                            <Award size={16} /> About AquaGuard AI
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight mb-8 leading-tight">
                            Building a <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-blue-600">Water-Safe Future</span>
                        </h1>
                        <p className="text-xl text-slate-500 leading-relaxed font-medium mb-8">
                            AquaGuard AI was born from a simple yet powerful idea: every person deserves access to safe water, and technology can make that possible at scale.
                        </p>
                        <div className="flex flex-wrap gap-8">
                            <div>
                                <div className="text-4xl font-black text-slate-900">1,240+</div>
                                <div className="text-slate-400 font-bold text-sm uppercase tracking-widest">Sensors Active</div>
                            </div>
                            <div>
                                <div className="text-4xl font-black text-slate-900">48</div>
                                <div className="text-slate-400 font-bold text-sm uppercase tracking-widest">City Zones</div>
                            </div>
                            <div>
                                <div className="text-4xl font-black text-slate-900">99.2%</div>
                                <div className="text-slate-400 font-bold text-sm uppercase tracking-widest">AI Accuracy</div>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="aspect-square bg-gradient-to-br from-blue-100 to-emerald-50 rounded-[3rem] flex items-center justify-center border border-blue-100/50 overflow-hidden">
                            <Droplets size={200} className="text-blue-200" />
                        </div>
                        <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-xl border border-slate-100">
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="text-emerald-500" size={32} />
                                <div>
                                    <div className="font-black text-slate-900">WHO Compliant</div>
                                    <div className="text-sm text-slate-400 font-medium">Safety Standards Met</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Values */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-32">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black text-slate-900 mb-4">What Drives Us</h2>
                    <p className="text-slate-500 font-medium text-lg">Our core principles guide every decision we make.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {values.map((val, i) => (
                        <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group text-center">
                            <div className="p-5 bg-blue-50 text-blue-600 rounded-2xl inline-block mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                                {val.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">{val.title}</h3>
                            <p className="text-slate-500 leading-relaxed font-medium">{val.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Timeline */}
            <section className="max-w-4xl mx-auto px-6 lg:px-8 mb-32">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black text-slate-900 mb-4">Our Journey</h2>
                    <p className="text-slate-500 font-medium text-lg">From research lab to city-wide deployment.</p>
                </div>
                <div className="space-y-8">
                    {milestones.map((m, i) => (
                        <div key={i} className="flex gap-8 items-start group">
                            <div className="w-20 shrink-0 text-right">
                                <span className="text-2xl font-black text-blue-600">{m.year}</span>
                            </div>
                            <div className="relative flex flex-col items-center">
                                <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-blue-100 group-hover:scale-125 transition-transform"></div>
                                {i < milestones.length - 1 && <div className="w-0.5 h-full bg-blue-100 absolute top-4"></div>}
                            </div>
                            <div className="bg-white p-8 rounded-3xl border border-slate-100 flex-grow shadow-sm group-hover:shadow-lg transition-all -mt-2">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{m.title}</h3>
                                <p className="text-slate-500 font-medium">{m.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Team */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-32">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black text-slate-900 mb-4">Meet the Team</h2>
                    <p className="text-slate-500 font-medium text-lg">The engineers and scientists behind AquaGuard AI.</p>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {team.map((member, i) => (
                        <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl mx-auto mb-6 group-hover:rotate-6 transition-transform shadow-lg shadow-blue-200">
                                {member.initials}
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-1">{member.name}</h3>
                            <p className="text-slate-400 font-bold text-sm uppercase tracking-wider">{member.role}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-4xl mx-auto px-6 text-center">
                <div className="bg-slate-900 rounded-[3rem] p-16 relative overflow-hidden">
                    <div className="relative z-10">
                        <Users className="mx-auto text-blue-400 mb-6" size={48} />
                        <h2 className="text-4xl font-black text-white mb-6">Join Our Mission</h2>
                        <p className="text-slate-400 text-lg font-medium mb-10 max-w-lg mx-auto">
                            Be part of the solution. Whether you're a municipality, researcher, or citizen — we welcome you.
                        </p>
                        <Link to="/register" className="inline-flex items-center gap-3 px-10 py-5 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-500 transition-all active:scale-95 shadow-xl shadow-blue-600/20">
                            Get Started Now <ArrowRight size={20} />
                        </Link>
                    </div>
                    <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-600 rounded-full blur-[100px] opacity-30"></div>
                </div>
            </section>
        </div>
    );
};

export default About;
