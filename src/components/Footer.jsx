import React from 'react';
import { Link } from 'react-router-dom';
import { Droplet, Twitter, Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-slate-100 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="flex items-center gap-3 mb-6">
                            <div className="bg-blue-600 p-2 rounded-xl text-white">
                                <Droplet size={20} />
                            </div>
                            <span className="text-xl font-black text-slate-900 tracking-tighter">AquaGuard AI</span>
                        </Link>
                        <p className="text-slate-500 font-medium leading-relaxed mb-6">
                            Securing urban water systems with next-generation AI monitoring and predictive analytics.
                        </p>
                        <div className="flex gap-4">
                            <SocialLink icon={<Twitter size={18} />} />
                            <SocialLink icon={<Github size={18} />} />
                            <SocialLink icon={<Linkedin size={18} />} />
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 uppercase text-xs tracking-widest mb-6">Platform</h4>
                        <ul className="space-y-4 font-medium text-slate-500">
                            <li><Link to="/dashboard" className="hover:text-blue-600 transition-colors">Monitoring Dashboard</Link></li>
                            <li><Link to="/dashboard/image-analysis" className="hover:text-blue-600 transition-colors">Visual Analysis</Link></li>
                            <li><Link to="/dashboard/analytics" className="hover:text-blue-600 transition-colors">AI Forecasts</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 uppercase text-xs tracking-widest mb-6">Company</h4>
                        <ul className="space-y-4 font-medium text-slate-500">
                            <li><a href="#" className="hover:text-blue-600 transition-colors">About Mission</a></li>
                            <li><a href="#" className="hover:text-blue-600 transition-colors">Research Papers</a></li>
                            <li><a href="#" className="hover:text-blue-600 transition-colors">Contact Support</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 uppercase text-xs tracking-widest mb-6">Subscribe</h4>
                        <div className="relative">
                            <input 
                                type="email" 
                                placeholder="Your email" 
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                            />
                            <button className="absolute right-2 top-2 bottom-2 bg-slate-900 text-white px-3 rounded-lg hover:bg-slate-800 transition-colors">
                                <Mail size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-100 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-slate-400 font-medium text-sm">
                        &copy; {new Date().getFullYear()} AquaGuard AI. All rights reserved. Built for Smarter Cities.
                    </p>
                    <div className="flex gap-8 text-sm font-bold text-slate-400">
                        <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-slate-900 transition-colors">Terms of Use</a>
                        <a href="#" className="hover:text-slate-900 transition-colors">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const SocialLink = ({ icon }) => (
    <a href="#" className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-500 hover:bg-blue-600 hover:text-white transition-all">
        {icon}
    </a>
)

export default Footer;
