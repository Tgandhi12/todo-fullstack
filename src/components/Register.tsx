import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [secretQuestion, setSecretQuestion] = useState<string>("");
  const [secretAnswer, setSecretAnswer] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Post user data to the backend
      await axios.post("/auth/register", {
        email,
        password,
        secretQuestion,
        secretAnswer,
      });

      setSuccess("Account created successfully. Redirecting to login...");
      setError("");
      
      // Redirect to the login page after 2 seconds
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      // Set error message based on the backend response or fallback message
      setError(err.response?.data?.message || "Failed to create account. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 space-y-8 animate-fade-in">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-800">Register</h1>
          <p className="text-gray-500 mt-2">Create an account to get started.</p>
        </div>

        {/* Success and Error Messages */}
        {success && (
          <div className="bg-green-100 text-green-600 p-3 rounded-lg text-center shadow-sm">
            {success}
          </div>
        )}
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg text-center shadow-sm">
            {error}
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
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
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Password Field */}
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
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Secret Question Field */}
          <div>
            <label htmlFor="secretQuestion" className="block text-gray-700 font-medium mb-1">
              Secret Question
            </label>
            <input
              type="text"
              id="secretQuestion"
              placeholder="Enter a question only you can answer"
              value={secretQuestion}
              onChange={(e) => setSecretQuestion(e.target.value)}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Secret Answer Field */}
          <div>
            <label htmlFor="secretAnswer" className="block text-gray-700 font-medium mb-1">
              Secret Answer
            </label>
            <input
              type="text"
              id="secretAnswer"
              placeholder="Answer your secret question"
              value={secretAnswer}
              onChange={(e) => setSecretAnswer(e.target.value)}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white font-bold rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
