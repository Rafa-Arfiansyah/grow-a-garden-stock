"use client";

import React, { useEffect, useState } from "react";

type EggItem = {
  name: string;
  value: number;
  image: string;
  emoji: string;
};

const EggStockPage = () => {
  const [eggStock, setEggStock] = useState<EggItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEggStock = async () => {
    try {
      const res = await fetch("https://growagardenapi.vercel.app/api/stock/GetStock");
      const data = await res.json();
      setEggStock(data?.eggStock || []);
    } catch (error) {
      console.error("Failed to fetch egg stock:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEggStock();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Egg Stock</h1>
      {loading ? (
        <p>Loading stock data...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eggStock.map((egg, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg hover:border-yellow-500 transition-colors bg-white"
            >
              <div className="p-6 text-center">
                <img
                  src={egg.image}
                  alt={egg.name}
                  className="w-24 h-24 object-contain mx-auto mb-4"
                />
                <h5 className="text-xl font-bold text-gray-900">
                  {egg.emoji} {egg.name}
                </h5>
                <p className="text-gray-600 mt-1">Stock: {egg.value}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EggStockPage;
