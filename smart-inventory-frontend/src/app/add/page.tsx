'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddItemPage() {
  const [form, setForm] = useState({ name: '', category: '', quantity: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const response = await fetch('http://localhost:3000/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error('Failed to add item');
      setSuccess(true);
      setForm({ name: '', category: '', quantity: 0 });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add item');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <a href="/" className="fixed top-6 left-6 z-40">
        <button className="px-5 py-2 rounded-full bg-white/80 text-gray-900 font-medium shadow hover:shadow-lg hover:scale-105 transition-all duration-200 text-sm border border-gray-200">
          ← Back to Home
        </button>
      </a>
      <div className="bg-white/70 backdrop-blur rounded-2xl shadow-xl px-10 py-12 max-w-lg w-full flex flex-col items-center border border-white/30">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">Add New Item</h1>
        <p className="text-base text-gray-700 text-center mb-8">Fill in the details below to add a new item to your inventory.</p>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-7">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-800 mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-gray-300 bg-white/90 text-gray-900 shadow focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-base px-5 py-3 transition duration-150 ease-in-out"
              placeholder="Enter item name"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-800 mb-2">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 bg-white/90 text-gray-900 shadow focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-base px-5 py-3 transition duration-150 ease-in-out"
              placeholder="Enter category"
            />
          </div>
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-800 mb-2">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              required
              min="0"
              className="w-full rounded-xl border border-gray-300 bg-white/90 text-gray-900 shadow focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-base px-5 py-3 transition duration-150 ease-in-out"
              placeholder="Enter quantity"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-6 rounded-full bg-gray-900/90 text-white text-lg font-semibold shadow hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 mt-2"
          >
            {isLoading ? 'Adding...' : 'Add Item'}
          </button>
        </form>
        {success && (
          <div className="mt-6 p-3 w-full bg-green-100/80 text-green-900 rounded text-center font-medium">Item added successfully!</div>
        )}
        {error && (
          <div className="mt-6 p-3 w-full bg-red-100/80 text-red-900 rounded text-center font-medium">{error}</div>
        )}
      </div>
    </div>
  );
} 