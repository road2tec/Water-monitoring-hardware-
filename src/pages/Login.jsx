import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Droplet, Mail, Lock, Eye, EyeOff, Loader2, ArrowLeft } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate('/dashboard');
            } else {
                setError(data.message || 'Verification failed. Please check credentials.');
            }
        } catch (err) {
            setError('System offline. Please ensure the backend server is active.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex overflow-hidden">
            {/* Left Side: Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 relative">
                <Link to="/" className="absolute top-10 left-10 flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold transition-colors group">
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
                </Link>

                <div className="max-w-md w-full animate-in fade-in slide-in-from-left-6 duration-700">
                    <div className="mb-12">
                        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-200 mb-8">
                            <Droplet size={32} />
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Welcome Back</h1>
                        <p className="text-slate-500 font-medium">Please enter your details to access the monitoring system.</p>
                    </div>

                    {error && (
                        <div className="mb-8 p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl text-sm font-bold flex items-center gap-3">
                            <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
                            {error}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all font-medium"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Password</label>
                                <button type="button" className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">Forgot?</button>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-12 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all font-medium"
                                    placeholder="••••••••"
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <button
                            disabled={loading}
                            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-lg hover:bg-slate-800 shadow-xl shadow-slate-200 transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70 disabled:active:scale-100"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" size={24} /> Authenticating...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    <div className="mt-10 text-center text-slate-500 font-medium">
                        Don’t have an account?{' '}
                        <Link to="/register" className="text-blue-600 font-black hover:text-blue-700 transition-colors ml-1">Start free trial</Link>
                    </div>
                </div>
            </div>

            {/* Right Side: Visual */}
            <div className="hidden lg:block lg:w-1/2 bg-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 via-transparent to-indigo-600/40 z-10"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-20 text-center z-20">
                    <div className="mb-10 inline-block p-6 bg-white/10 backdrop-blur-3xl rounded-[2.5rem] border border-white/20">
                        <Droplet size={80} className="text-blue-400" />
                    </div>
                    <h2 className="text-5xl font-black text-white mb-6 leading-tight">Securing Tomorrow's <br /> Water Supply</h2>
                    <p className="text-blue-100/60 text-xl font-medium leading-relaxed max-w-lg mx-auto">
                        Global standards. Real-time insights. Intelligent protection for the most vital resource.
                    </p>
                </div>
                
                {/* Decorative circles */}
                <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-600 rounded-full blur-[120px] opacity-40"></div>
                <div className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-600 rounded-full blur-[120px] opacity-40"></div>
            </div>
        </div>
    );
};

export default Login;
