import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Login from '@/components/Login'
import Register from '@/components/Register'
import ForgotPassword from '@/components/ForgotPassword'
import TodoList from '@/components/TodoList'
import TodoForm from '@/components/TodoForm'
import { useEffect, useState } from 'react'

export default function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
  const navigate = useNavigate()
  useEffect(() => {
    if (!token && location.pathname !== '/register' && location.pathname !== '/forgot-password') navigate('/login')
  }, [token, navigate])

  const logout = () => { localStorage.removeItem('token'); setToken(null); navigate('/login') }

  return (
    <div className="min-h-screen">
      <nav className="p-4 border-b flex gap-4 items-center">
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        {token && <button className="ml-auto px-3 py-1 bg-gray-800 text-white rounded" onClick={logout}>Logout</button>}
      </nav>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login onLogin={(t) => { setToken(t); navigate('/'); }} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={<div className="p-6 space-y-6">
          <TodoForm />
          <TodoList />
        </div>} />
      </Routes>
    </div>
  )
}
