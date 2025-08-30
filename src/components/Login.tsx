
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }: { onLogin: (token: string) => void }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/login", { email, password });
      const { token } = response.data;
      localStorage.setItem("token", token);
      onLogin(token);
      navigate("/"); // Redirect to the app
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password"); // Navigate to the forgot password page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 space-y-8 animate-fade-in">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-800">Welcome Back!</h1>
          <p className="text-gray-500 mt-2">Sign in to continue to your account.</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg text-center shadow-sm">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-indigo-500 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-600 transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Forgot Password Link */}
        <div className="text-center">
          <button
            onClick={handleForgotPassword}
            className="text-indigo-500 font-semibold hover:text-indigo-600 transition"
          >
            Forgot Password?
          </button>
        </div>

        {/* Footer Section */}
        <p className="text-center text-gray-600 text-sm">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-indigo-500 font-semibold hover:text-indigo-600 transition"
          >
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
