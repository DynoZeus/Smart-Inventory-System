"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("staff");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await axios.post("/auth/register", { username, password, role });
      setSuccess("Signup successful! Please login.");
      setTimeout(() => router.push("/login"), 1500);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white/70 backdrop-blur rounded-2xl shadow-xl px-10 py-12 max-w-md w-full flex flex-col items-center border border-white/30 gap-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Sign Up</h1>
        <form onSubmit={handleSignup} className="w-full flex flex-col gap-4">
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full rounded-xl border border-gray-300 bg-white/90 text-gray-900 shadow focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-base px-5 py-3 transition duration-150 ease-in-out"
            required
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-xl border border-gray-300 bg-white/90 text-gray-900 shadow focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-base px-5 py-3 transition duration-150 ease-in-out"
            required
          />
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white/90 text-gray-900 shadow focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-base px-5 py-3 transition duration-150 ease-in-out"
          >
            <option value="user">User</option>
            <option value="staff">Staff</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 rounded-full bg-gray-900/90 text-white text-lg font-semibold shadow hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 mt-2"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
          {error && (
            <div className="text-center text-sm mt-2 text-red-700">{error}</div>
          )}
          {success && (
            <div className="text-center text-sm mt-2 text-green-700">{success}</div>
          )}
        </form>
      </div>
    </div>
  );
} 