"use client";
import React, { useEffect, useState } from "react";

const HoneyStock = () => {
  const [honeyStock, setHoneyStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState("-");

  useEffect(() => {
    fetch("https://growagardenapi.vercel.app/api/stock/GetStock")
      .then((res) => res.json())
      .then((data) => {
        setHoneyStock(data.honeyStock || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch stock:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const minutes = now.getMinutes();
      const nextRestockMinute = minutes < 30 ? 30 : 60;
      const nextRestock = new Date(now);
      nextRestock.setMinutes(nextRestockMinute, 0, 0);

      const diff = Math.max(0, nextRestock.getTime() - now.getTime());
      const seconds = Math.floor(diff / 1000);
      const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
      const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
      const s = String(seconds % 60).padStart(2, "0");

      setCountdown(`${h}:${m}:${s}`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Event Stock</h2>

      <div className="text-sm text-gray-700 mb-4">
        <strong>Next Restock In:</strong> {countdown}
      </div>

      {loading ? (
        <p className="text-gray-500">Memuat data...</p>
      ) : honeyStock.length === 0 ? (
        <p className="text-gray-500">Stok kosong.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {honeyStock.map((item: any, index: number) => (
            <div key={index} className="border border-gray-200 p-4 rounded-lg flex items-start gap-4">
              <img
                src={item.image || "https://via.placeholder.com/80?text=No+Image"}
                alt={item.name}
                className="w-16 h-16 object-contain rounded"
              />
              <div>
                <h3 className="text-lg font-semibold text-dark mb-1">{item.name}</h3>
                <p className="text-sm text-gray-600">Value: {item.value}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HoneyStock;
