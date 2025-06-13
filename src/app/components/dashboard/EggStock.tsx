"use client";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

const EggStock = () => {
  const [eggStock, setEggStock] = useState([]);
  const [countdown, setCountdown] = useState("-");

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const res = await fetch("https://growagardenapi.vercel.app/api/stock/GetStock");
        const data = await res.json();
        setEggStock(data.eggStock || []);
      } catch (error) {
        console.error("Failed to fetch egg stock:", error);
      }
    };

    fetchStock();
  }, []);

  // Hitung waktu menuju restock terdekat (tiap 30 menit)
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const minutes = now.getMinutes();
      const nextRestockMinute = minutes < 30 ? 30 : 60;
      const nextRestock = new Date(now);
      nextRestock.setMinutes(nextRestockMinute, 0, 0); // next restock: xx:30 atau xx+1:00

      const diff = Math.max(0, nextRestock.getTime() - now.getTime());

      const seconds = Math.floor(diff / 1000);
      const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
      const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
      const s = String(seconds % 60).padStart(2, "0");

      setCountdown(`${h}:${m}:${s}`);
    };

    updateCountdown(); // initial call
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md p-8">
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-lightsecondary text-secondary p-3 rounded-md">
          <Icon icon="mdi:egg-outline" height={24} />
        </div>
        <p className="text-lg text-dark font-semibold">Egg Stock</p>
      </div>

      {/* Countdown */}
      <div className="mb-6 text-sm text-gray-700">
        <p><strong>Next Restock In:</strong> {countdown}</p>
      </div>

      {/* Egg Items */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {eggStock.map((egg, index) => (
          <div key={index} className="flex flex-col gap-1 border p-3 rounded-md shadow-sm">
            <p className="text-sm font-medium text-dark">{egg.emoji} {egg.name}</p>
            <p className="text-xs text-gray-500">Qty: {egg.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EggStock;

