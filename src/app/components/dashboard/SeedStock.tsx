"use client";
import React, { useEffect, useState } from "react";
import { Table, Spinner } from "flowbite-react";
import SimpleBar from "simplebar-react";

interface StockItem {
  name: string;
  value: number;
  image: string;
  emoji: string;
}

const SeedStock: React.FC = () => {
  const [seedsStock, setSeedsStock] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(getNextRestockSeconds());

  function getNextRestockSeconds(): number {
    const now = new Date();
    const utcMinutes = now.getUTCMinutes();
    const utcSeconds = now.getUTCSeconds();
    const passed = utcMinutes * 60 + utcSeconds;
    const nextRestock = (Math.floor(passed / 300) + 1) * 300; // setiap 5 menit
    return nextRestock - passed;
  }

  const fetchStock = async () => {
    setUpdating(true);
    try {
      const res = await fetch("https://growagardenapi.vercel.app/api/stock/GetStock");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setSeedsStock(data.seedsStock || []);
      setError(null);
    } catch (err: any) {
      console.error("Failed to fetch seeds stock:", err);
      setError(err.message);
    } finally {
      setLoading(false);
      setUpdating(false);
      setCountdown(getNextRestockSeconds());
    }
  };

  useEffect(() => {
    fetchStock();

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          fetchStock(); // fetch ulang setiap 5 menit sinkron
          return getNextRestockSeconds();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (seconds: number) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600">Error: {error}</div>;
  }

  return (
    <div className="rounded-xl shadow-md bg-white pt-6 px-6 w-full">
      <div className="flex justify-between items-center mb-4">
        <h5 className="text-xl font-semibold">Seed Stock</h5>
        <div className="text-sm text-gray-600">
          {updating ? (
            <span className="text-blue-500 animate-pulse">Updating...</span>
          ) : (
            <>
              Refresh in:{" "}
              <span className="font-semibold">{formatCountdown(countdown)}</span>
            </>
          )}
        </div>
      </div>
      <SimpleBar className="max-h-[450px]">
        <div className="overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell className="p-4">Seed</Table.HeadCell>
              <Table.HeadCell>Quantity</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y divide-gray-200">
              {seedsStock.map((item, idx) => (
                <Table.Row key={idx}>
                  <Table.Cell className="whitespace-nowrap ps-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <span className="text-sm font-medium">
                        {item.emoji} {item.name}
                      </span>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-sm font-medium">{item.value} pcs</span>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </SimpleBar>
    </div>
  );
};

export default SeedStock;
