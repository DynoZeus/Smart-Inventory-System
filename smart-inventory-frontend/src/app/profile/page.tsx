"use client";
import { useState } from "react";
import axios from "@/lib/axios";

export default function ProfilePage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profileMsg, setProfileMsg] = useState<string | null>(null);
  const [passwordMsg, setPasswordMsg] = useState<string | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  // Update username
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingProfile(true);
    setProfileMsg(null);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        "/users/me/profile",
        { username },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProfileMsg("Username updated successfully!");
    } catch (err: any) {
      setProfileMsg(err?.response?.data?.message || "Failed to update username");
    } finally {
      setLoadingProfile(false);
    }
  };

  // Update password
  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingPassword(true);
    setPasswordMsg(null);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        "/users/me/password",
        { password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPasswordMsg("Password updated successfully!");
      setPassword("");
    } catch (err: any) {
      setPasswordMsg(err?.response?.data?.message || "Failed to update password");
    } finally {
      setLoadingPassword(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white/70 backdrop-blur rounded-2xl shadow-xl px-10 py-12 max-w-md w-full flex flex-col items-center border border-white/30 gap-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">User Profile</h1>
        {/* Update Username */}
        <form onSubmit={handleProfileUpdate} className="w-full flex flex-col gap-4">
          <label className="text-sm font-medium text-gray-800">Update Username</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="New username"
            className="w-full rounded-xl border border-gray-300 bg-white/90 text-gray-900 shadow focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-base px-5 py-3 transition duration-150 ease-in-out"
            required
          />
          <button
            type="submit"
            disabled={loadingProfile}
            className="w-full py-3 px-6 rounded-full bg-gray-900/90 text-white text-lg font-semibold shadow hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 mt-2"
          >
            {loadingProfile ? "Updating..." : "Update Username"}
          </button>
          {profileMsg && (
            <div className="text-center text-sm mt-2 text-blue-700">{profileMsg}</div>
          )}
        </form>
        {/* Update Password */}
        <form onSubmit={handlePasswordUpdate} className="w-full flex flex-col gap-4">
          <label className="text-sm font-medium text-gray-800">Update Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="New password"
            className="w-full rounded-xl border border-gray-300 bg-white/90 text-gray-900 shadow focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-base px-5 py-3 transition duration-150 ease-in-out"
            required
          />
          <button
            type="submit"
            disabled={loadingPassword}
            className="w-full py-3 px-6 rounded-full bg-gray-900/90 text-white text-lg font-semibold shadow hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 mt-2"
          >
            {loadingPassword ? "Updating..." : "Update Password"}
          </button>
          {passwordMsg && (
            <div className="text-center text-sm mt-2 text-blue-700">{passwordMsg}</div>
          )}
        </form>
      </div>
    </div>
  );
} 