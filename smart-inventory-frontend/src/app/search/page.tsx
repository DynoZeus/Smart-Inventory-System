'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Item {
  _id: string;
  name: string;
  quantity: number;
  category: string;
  addedAt: string;
}

export default function SearchPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        const response = await fetch('http://localhost:3000/api/items', {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!response.ok) throw new Error('Failed to fetch items');
        const data = await response.json();
        setItems(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch items');
      } finally {
        setIsLoading(false);
      }
    };
    fetchItems();
  }, []);

  const filteredItems = items.filter(item =>
    (item.name?.toLowerCase() || '').includes(search.toLowerCase()) ||
    (item.category?.toLowerCase() || '').includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <a href="/" className="fixed top-6 left-6 z-40">
        <button className="px-5 py-2 rounded-full bg-white/80 text-gray-900 font-medium shadow hover:shadow-lg hover:scale-105 transition-all duration-200 text-sm border border-gray-200">
          ← Back to Home
        </button>
      </a>
      <div className="bg-white/70 backdrop-blur rounded-2xl shadow-xl px-10 py-12 max-w-3xl w-full flex flex-col items-center border border-white/30">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">Search Items</h1>
        <p className="text-base text-gray-700 text-center mb-8">Find items in your inventory by name or category.</p>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name or category..."
          className="w-full md:w-2/3 px-5 py-3 rounded-xl border border-gray-300 bg-white/90 text-gray-900 shadow focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-base transition duration-150 ease-in-out mb-8"
        />
        <div className="w-full overflow-x-auto">
          {isLoading ? (
            <div className="text-center py-8 text-gray-700/80">Loading items...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-400">{error}</div>
          ) : filteredItems.length > 0 ? (
            <div className="bg-white/90 rounded-xl shadow p-4">
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
                  {filteredItems.map(item => {
                    const isLow = item.quantity <= 5;
                    return (
                      <tr
                        key={item._id}
                        className={`hover:bg-gray-100 transition duration-150 ease-in-out ${isLow ? 'bg-yellow-50' : ''}`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center gap-2">
                          {item.quantity}
                          {isLow && (
                            <span title="Low stock" className="ml-1 text-yellow-500 text-lg align-middle" aria-label="Low stock">⚠️</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(item.addedAt).toLocaleDateString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">No items found.</div>
          )}
        </div>
      </div>
    </div>
  );
} 