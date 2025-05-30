'use client';

import { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { useRouter } from 'next/navigation';
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

interface Item {
  _id: string;
  name: string;
  quantity: number;
  category: string;
  addedAt: string;
}

export default function VisualizePage() {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:3000/api/items');
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

  // Pie chart data (items by category)
  const categoryCounts = items.reduce((acc, item) => {
    const cat = item.category || 'Uncategorized';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const pieData = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        data: Object.values(categoryCounts),
        backgroundColor: [
          '#6366f1', '#a5b4fc', '#f59e42', '#f87171', '#34d399', '#fbbf24', '#60a5fa',
        ],
      },
    ],
  };

  // Bar chart data (most/least stocked items)
  const sorted = [...items].sort((a, b) => b.quantity - a.quantity);
  const top5 = sorted.slice(0, 5);
  const bottom5 = sorted.slice(-5).reverse();
  const barLabels = [...top5.map(i => i.name + ' (Top)'), ...bottom5.map(i => i.name + ' (Low)')];
  const barData = [...top5.map(i => i.quantity), ...bottom5.map(i => i.quantity)];
  const barChartData = {
    labels: barLabels,
    datasets: [
      {
        label: 'Quantity',
        data: barData,
        backgroundColor: [
          ...top5.map(() => '#34d399'), // green for top
          ...bottom5.map(() => '#f87171'), // red for low
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white/70 backdrop-blur rounded-2xl shadow-xl px-10 py-12 max-w-4xl w-full flex flex-col items-center border border-white/30">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">Visualize Stock</h1>
        <p className="text-base text-gray-700 text-center mb-8">See your inventory data in beautiful charts.</p>
        {isLoading ? (
          <div className="text-center py-8 text-gray-700/80">Loading charts...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-400">{error}</div>
        ) : items.length > 0 ? (
          <>
            <div className="w-full mb-12 bg-white/90 rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">Items by Category</h2>
              <div style={{ height: 250 }}>
                <Pie data={pieData} options={{ plugins: { legend: { position: 'bottom' as const } }, responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>
            <div className="w-full mb-4 bg-white/90 rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">Most & Least Stocked Items</h2>
              <div style={{ height: 300 }}>
                <Bar data={barChartData} options={{ plugins: { legend: { display: false } }, responsive: true, maintainAspectRatio: false, scales: { x: { title: { display: true, text: 'Item' } }, y: { title: { display: true, text: 'Quantity' }, beginAtZero: true } } }} />
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-gray-400">No data to display.</div>
        )}
        <button
          onClick={() => router.push('/')} 
          className="mt-8 px-6 py-2 rounded-full bg-gray-100 text-gray-900 font-medium shadow hover:shadow-lg hover:scale-105 transition-all duration-200 text-sm"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
} 