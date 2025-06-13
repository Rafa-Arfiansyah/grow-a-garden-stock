"use client";

import React, { useEffect, useState } from "react";

type StockItem = {
  name: string;
  value: number;
  image: string;
};

const GearStockPage = () => {
  const [stock, setStock] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStock = async () => {
    try {
      const res = await fetch("https://growagardenapi.vercel.app/api/stock/GetStock");
      const data = await res.json();
      setStock(data?.gearStock || []);
    } catch (error) {
      console.error("Failed to fetch stock:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStock();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gear Stock</h1>
      {loading ? (
        <p>Loading stock data...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stock.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md text-center">
              <img src={item.image} alt={item.name} className="w-32 h-32 object-contain mx-auto mb-4" />
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-sm text-gray-600">Stock: {item.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GearStockPage;
