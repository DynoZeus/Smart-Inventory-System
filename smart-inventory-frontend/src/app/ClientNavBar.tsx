"use client";
import { useEffect, useState } from "react";

export default function ClientNavBar() {
  const [user, setUser] = useState<{ username: string } | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          setUser({ username: payload.username });
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <nav className="absolute top-0 right-0 p-6 z-30 flex gap-4 items-center">
      {user ? (
        <>
          <span className="font-semibold text-gray-800 bg-white/80 rounded-full px-4 py-2 shadow">{user.username}</span>
          <button
            onClick={handleLogout}
            className="px-7 py-3 rounded-full text-base font-semibold text-gray-900 bg-white/80 shadow hover:shadow-lg hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <a href="/login">
            <button className="px-7 py-3 rounded-full text-base font-semibold text-gray-900 bg-white/80 shadow hover:shadow-lg hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300">
              Login
            </button>
          </a>
          <a href="/signup">
            <button className="px-7 py-3 rounded-full text-base font-semibold text-gray-900 bg-white/80 shadow hover:shadow-lg hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300">
              Signup
            </button>
          </a>
        </>
      )}
    </nav>
  );
} 