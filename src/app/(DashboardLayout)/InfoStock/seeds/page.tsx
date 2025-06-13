"use client";

import React, { useEffect, useState } from "react";

interface SeedStock {
  name: string;
  value: number;
  image: string;
  emoji: string;
}

const SeedStockPage = () => {
  const [seedsStock, setSeedsStock] = useState<SeedStock[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSeedStock = async () => {
    try {
      const response = await fetch("https://growagardenapi.vercel.app/api/stock/GetStock");
      const data = await response.json();
      setSeedsStock(data.seedsStock);
    } catch (error) {
      console.error("Failed to fetch seed stock", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeedStock();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Seed Stock</h1>

      {loading ? (
        <p className="text-gray-500">Loading stock data...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {seedsStock.map((seed, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg hover:shadow-md transition bg-white"
            >
              <div className="p-6 flex flex-col items-center text-center">
                <img
                  src={seed.image}
                  alt={seed.name}
                  className="w-20 h-20 object-contain mb-4"
                />
                <h2 className="text-lg font-semibold text-gray-800">
                  {seed.emoji} {seed.name}
                </h2>
                <p className="text-gray-600 mt-2">
                  Available:{" "}
                  <span className="font-medium text-green-600">
                    {seed.value.toLocaleString()}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SeedStockPage;
