import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [secretQuestion, setSecretQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [step, setStep] = useState<number>(1); // Track the current step
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const navigate = useNavigate();

  // Step 1: Fetch Secret Question
  const handleFetchSecretQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/forgot-password", { email });
      setSecretQuestion(response.data.secretQuestion); // Set the fetched question
      setStep(2); // Proceed to the next step
      setError("");
    } catch (err) {
      setError("Email not found. Please try again.");
    }
  };

  // Step 2: Validate Secret Answer
  const handleValidateAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/validate-answer", { email, answer });
      if (response.data.valid) {
        setStep(3); // Proceed to password reset
        setError("");
      } else {
        setError("Incorrect answer. Please try again.");
      }
    } catch (err) {
      setError("Validation failed. Please try again.");
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/auth/reset-password", { email, newPassword });
      setSuccess("Password reset successfully. You can now log in.");
      setError("");
      navigate("/login");
    } catch (err) {
      setError("Password reset failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 space-y-8 animate-fade-in">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-800">Forgot Password</h1>
          <p className="text-gray-500 mt-2">Reset your password in three simple steps.</p>
        </div>

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

        {step === 1 && (
          <form onSubmit={handleFetchSecretQuestion} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-blue-500 text-white font-bold rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
            >
              Fetch Secret Question
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleValidateAnswer} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Secret Question: {secretQuestion}
              </label>
              <input
                type="text"
                id="answer"
                placeholder="Enter your answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-blue-500 text-white font-bold rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
            >
              Validate Answer
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-6">
            <div>
              <label htmlFor="newPassword" className="block text-gray-700 font-medium mb-1">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                placeholder="Enter a new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-blue-500 text-white font-bold rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
