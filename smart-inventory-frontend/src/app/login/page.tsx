"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post("/auth/login", { username, password });
      localStorage.setItem("token", res.data.token);
      router.push("/");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white/70 backdrop-blur rounded-2xl shadow-xl px-10 py-12 max-w-md w-full flex flex-col items-center border border-white/30 gap-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Login</h1>
        <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
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
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 rounded-full bg-gray-900/90 text-white text-lg font-semibold shadow hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 mt-2"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && (
            <div className="text-center text-sm mt-2 text-red-700">{error}</div>
          )}
        </form>
      </div>
    </div>
  );
} 