import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from '@/pages/Home';
import Register from '@/components/Register';
import Login from '@/components/Login';
import ForgotPassword from '@/components/ForgotPassword';

export default function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!token && !['/login', '/register', '/forgot-password'].includes(location.pathname)) {
      navigate('/login');
    }
  }, [token, navigate]);

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-800">
      <header className="sticky top-0 z-20 backdrop-blur bg-white/70 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link to="/" className="inline-flex items-center gap-2 font-semibold">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M4 12l4 4 12-12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            TodoFlow
          </Link>
          <nav className="ml-6 flex items-center gap-4 text-sm">
            <Link to="/">Dashboard</Link>
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <Link to="/register" className="text-sm hover:underline">Register</Link>
            <Link to="/login" className="text-sm hover:underline">Login</Link>
            {token && (
              <button onClick={logout} className="text-sm px-3 py-1 rounded-md bg-slate-900 text-white hover:bg-slate-700 transition">
                Logout
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={
              <Login
                onLogin={(t: string) => {
                  localStorage.setItem('token', t);
                  setToken(t);
                  navigate('/');
                }}
              />
            }
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </main>

      <footer className="border-t py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} TodoFlow — Stay organized.
      </footer>
    </div>
  );
}
