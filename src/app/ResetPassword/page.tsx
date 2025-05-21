"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    if (urlToken) {
      setToken(urlToken);
    }
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!password) {
      setError("Password is required");
      return;
    }

    try {
      const response = await axios.post("/api/User/ResetPassword", {
        token,
        password,
      });
      setSuccess(true);
      setError("");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Reset Your Password</h1>
      {success ? (
        <div className="bg-green-700 p-4 rounded">Password reset successful! You can now log in.</div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
          <input
            type="password"
            placeholder="Enter new password"
            className="p-2 border border-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <div className="text-red-500">{error}</div>}
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            Reset Password
          </button>
        </form>
      )}
    </div>
  );
}
