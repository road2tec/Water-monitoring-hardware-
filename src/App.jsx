import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Overview from './pages/dashboard/Overview';
import Analytics from './pages/dashboard/Analytics';
import Reports from './pages/dashboard/Reports';
import Settings from './pages/dashboard/Settings';
import ImageAnalysis from './pages/dashboard/ImageAnalysis';
import Features from './pages/Features';
import About from './pages/About';

const Layout = ({ children }) => {
    const location = useLocation();
    const isDashboard = location.pathname.startsWith('/dashboard');
    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
    const hideNavFooter = isDashboard || isAuthPage;

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            {!hideNavFooter && <Navbar />}
            <main className="flex-grow">
                {children}
            </main>
            {!hideNavFooter && <Footer />}
        </div>
    );
};

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/features" element={<Features />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    
                    {/* Dashboard Routes with Sidebar Layout */}
                    <Route path="/dashboard" element={<Dashboard />}>
                        <Route index element={<Overview />} />
                        <Route path="image-analysis" element={<ImageAnalysis />} />
                        <Route path="analytics" element={<Analytics />} />
                        <Route path="reports" element={<Reports />} />
                        <Route path="settings" element={<Settings />} />
                    </Route>
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;

