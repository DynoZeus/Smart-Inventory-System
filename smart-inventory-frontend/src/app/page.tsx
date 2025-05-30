// src/app/page.tsx
'use client';

import Link from 'next/link';
// import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center">
      {/* Background image */}
      <img
        src="/bg.jpg"
        alt="Supply Chain Representation"
        className="fixed inset-0 w-full h-full object-cover object-center z-0 pointer-events-none select-none"
        draggable={false}
      />
      {/* Overlay for readability */}
      {/* <div className="absolute inset-0 z-10 bg-black bg-opacity-50" /> */}
      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center flex-1">
        <div className="bg-black/40 backdrop-blur-md rounded-2xl shadow-xl px-10 py-12 flex flex-col items-center gap-8 max-w-xl w-full border border-white/10">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white text-center drop-shadow-lg mb-2 tracking-tight">
            THE SMART INVENTORY
          </h1>
          <p className="text-lg md:text-2xl text-white/90 text-center drop-shadow mb-6 font-medium">
            Keep track of your item's stock easily.
          </p>
          <div className="flex flex-row gap-6 mt-8 w-full justify-center">
            <Link href="/add">
              <button className="px-7 py-3 rounded-full text-base font-semibold text-gray-900 bg-white/80 shadow hover:shadow-lg hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300">
                Add Item
              </button>
            </Link>
            <Link href="/search">
              <button className="px-7 py-3 rounded-full text-base font-semibold text-gray-900 bg-white/80 shadow hover:shadow-lg hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300">
                Search Items
              </button>
            </Link>
            <Link href="/visualize">
              <button className="px-7 py-3 rounded-full text-base font-semibold text-gray-900 bg-white/80 shadow hover:shadow-lg hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300">
                Visualize Stock
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
