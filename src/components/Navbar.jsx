import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Waves, Menu, X, ArrowRight } from 'lucide-react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Features', path: '/features' },
        { name: 'About', path: '/about' },
    ];

    return (
        <nav className={`fixed top-0 inset-x-0 z-[100] transition-all duration-300 ${
            isScrolled 
            ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200 py-3' 
            : 'bg-transparent py-5'
        }`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform">
                            <Waves size={24} />
                        </div>
                        <span className="text-2xl font-black text-slate-900 tracking-tighter">AquaGuard AI</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-10">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.name}
                                to={link.path} 
                                className="text-slate-600 hover:text-blue-600 font-bold text-sm uppercase tracking-widest transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        <Link to="/login" className="text-slate-900 font-bold px-6 py-2 hover:text-blue-600 transition-colors">
                            Sign In
                        </Link>
                        <Link to="/register" className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95">
                            Get Started <ArrowRight size={18} />
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button 
                        className="md:hidden p-2 text-slate-900"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full inset-x-0 bg-white border-b border-slate-200 p-6 animate-in slide-in-from-top-4 duration-300">
                    <div className="flex flex-col gap-6">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.name}
                                to={link.path} 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-slate-900 font-bold text-lg"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <hr className="border-slate-100" />
                        <Link to="/login" className="text-slate-900 font-bold text-lg">Login</Link>
                        <Link to="/register" className="bg-blue-600 text-white px-6 py-4 rounded-2xl font-bold text-center">
                            Register Now
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
