"use client";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Badge } from "flowbite-react";

const WeatherInfo = () => {
  const [activeWeather, setActiveWeather] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://growagardenapi.vercel.app/api/GetWeather")
      .then((res) => res.json())
      .then((data) => {
        const active = (data.weather || []).filter((w: any) => w.active);
        setActiveWeather(active);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching weather:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md p-5">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-lightblue text-blue-600 p-3 rounded-md">
          <Icon icon="mdi:weather-partly-cloudy" height={24} />
        </div>
        <p className="text-lg font-semibold text-dark">Cuaca Aktif</p>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Sedang memuat...</p>
      ) : activeWeather.length === 0 ? (
        <div className="text-sm text-gray-600">
          Belum ada cuaca aktif saat ini.
          <br />
          <span className="text-blue-500">Coba periksa kembali nanti 🌤️</span>
        </div>
      ) : (
        <div className="space-y-3">
          {activeWeather.map((w: any) => (
            <div
              key={w.weather_id}
              className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
            >
              <span className="font-medium text-dark">{w.weather_name}</span>
              <Badge color="success">Aktif</Badge>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherInfo;
