"use client";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";

interface User {
  _id: string;
  username: string;
  role: string;
  createdAt: string;
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [items, setItems] = useState<any[]>([]);
  const [activity, setActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        const res = await axios.get("/users", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setUsers(res.data);
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Fetch items and activity for a user
  const handleViewUser = async (user: User) => {
    setSelectedUser(user);
    setLoading(true);
    setError(null);
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const [itemsRes, activityRes] = await Promise.all([
        axios.get(`/items?user=${user._id}`, { headers: token ? { Authorization: `Bearer ${token}` } : {} }),
        axios.get(`/activity?user=${user._id}`, { headers: token ? { Authorization: `Bearer ${token}` } : {} }),
      ]);
      setItems(itemsRes.data);
      setActivity(activityRes.data);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="bg-white/70 backdrop-blur rounded-2xl shadow-xl px-10 py-12 max-w-5xl w-full flex flex-col items-center border border-white/30 gap-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <div className="w-full overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 bg-white/90 rounded-lg overflow-hidden">
            <thead className="bg-gray-50/80">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map(user => (
                <tr key={user._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      className="px-4 py-2 rounded-full bg-gray-900/90 text-white text-sm font-semibold shadow hover:bg-gray-800 transition-all duration-200"
                      onClick={() => handleViewUser(user)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selectedUser && (
          <div className="w-full mt-10">
            <h2 className="text-xl font-bold mb-4">{selectedUser.username}'s Items</h2>
            {/* Items Table Skeleton */}
            <div className="bg-white/90 rounded-xl shadow p-4 mb-8">
              {items.length === 0 ? (
                <div className="text-gray-500">No items found.</div>
              ) : (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50/80">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Added Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {items.map(item => (
                      <tr key={item._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(item.addedAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <h2 className="text-xl font-bold mb-4">{selectedUser.username}'s Activity Log</h2>
            {/* Activity Log Skeleton */}
            <div className="bg-white/90 rounded-xl shadow p-4">
              {activity.length === 0 ? (
                <div className="text-gray-500">No activity found.</div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {activity.map((log, idx) => (
                    <li key={log._id || idx} className="py-2 text-gray-700 text-sm">
                      <span className="font-semibold">{log.action}</span> - {log.details || ''} <span className="text-gray-400">({new Date(log.createdAt).toLocaleString()})</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 