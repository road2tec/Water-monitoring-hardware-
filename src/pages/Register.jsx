import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Droplet, Mail, Lock, User, Eye, EyeOff, Loader2, ArrowLeft, ShieldCheck } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            return setError('Verification failed: Passwords do not match');
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                }),
            });

            const data = await response.json();

            if (response.ok) {
                navigate('/login');
            } else {
                setError(data.message || 'Registration failed. System error.');
            }
        } catch (err) {
            setError('Connection error. Is the backend server running?');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex overflow-hidden">
             {/* Left Side: Visual */}
             <div className="hidden lg:block lg:w-1/2 bg-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/40 via-transparent to-emerald-600/40 z-10"></div>
                
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-20 text-center z-20">
                    <div className="mb-10 inline-block p-6 bg-white/10 backdrop-blur-3xl rounded-[2.5rem] border border-white/20 animate-pulse">
                        <ShieldCheck size={80} className="text-emerald-400" />
                    </div>
                    <h2 className="text-5xl font-black text-white mb-6 leading-tight">Join the <br /> Clean Water Initiative</h2>
                    <p className="text-emerald-100/60 text-xl font-medium leading-relaxed max-w-lg mx-auto">
                        Empowering cities with AI-driven surveillance. Your gateway to smarter resource management.
                    </p>
                </div>
                
                {/* Decorative blobs */}
                <div className="absolute -top-40 -right-40 w-[30rem] h-[30rem] bg-emerald-600 rounded-full blur-[120px] opacity-30"></div>
                <div className="absolute -bottom-40 -left-40 w-[30rem] h-[30rem] bg-blue-600 rounded-full blur-[120px] opacity-30"></div>
            </div>

            {/* Right Side: Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 relative overflow-y-auto">
                <Link to="/" className="absolute top-10 right-10 flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold transition-colors group">
                    Back to Home <ArrowLeft size={20} className="rotate-180 group-hover:translate-x-1 transition-transform" />
                </Link>

                <div className="max-w-md w-full animate-in fade-in slide-in-from-right-6 duration-700 my-10">
                    <div className="mb-10">
                        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-200 mb-8">
                            <Droplet size={32} />
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Create Account</h1>
                        <p className="text-slate-500 font-medium">Join AquaGuard AI and start monitoring today.</p>
                    </div>

                    {error && (
                        <div className="mb-8 p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl text-sm font-bold flex items-center gap-3">
                            <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
                            {error}
                        </div>
                    )}

                    <form className="space-y-4" onSubmit={handleRegister}>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">Full Name</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all font-medium"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all font-medium"
                                    placeholder="name@example.com"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all font-medium text-sm"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">Confirm</label>
                                <div className="relative group">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        required
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="w-full px-4 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all font-medium text-sm"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                             <input type="checkbox" required className="w-5 h-5 rounded-lg text-blue-600 focus:ring-blue-500 border-slate-300 transition-all cursor-pointer" />
                             <span className="text-sm text-slate-500 font-medium">I agree to the <button type="button" className="text-blue-600 font-bold hover:underline">Terms of Service</button></span>
                        </div>

                        <button
                            disabled={loading}
                            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-lg hover:bg-slate-800 shadow-xl shadow-slate-200 transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70 mt-4"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" size={24} /> Creating Account...
                                </>
                            ) : (
                                'Register Now'
                            )}
                        </button>
                    </form>

                    <div className="mt-10 text-center text-slate-500 font-medium">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-600 font-black hover:text-blue-700 transition-colors ml-1">Sign in</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
