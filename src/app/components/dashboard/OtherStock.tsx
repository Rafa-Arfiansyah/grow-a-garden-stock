import React from "react";
import { ShoppingBag, Wand2, Leaf, Settings } from "lucide-react";

const OtherStock = () => {
  const categories = [
    {
      name: "Gear Shop",
      icon: <Settings className="w-6 h-6 text-yellow-600" />,
      link: "/InfoStock/gear",
      color: "bg-yellow-100",
    },
    {
      name: "Cosmetic Shop",
      icon: <Wand2 className="w-6 h-6 text-pink-500" />,
      link: "/InfoStock/cosmetics",
      color: "bg-pink-100",
    },
    {
      name: "Last Seen",
      icon: <Leaf className="w-6 h-6 text-green-600" />,
      link: "/InfoStock/lastseen",
      color: "bg-green-100",
    },
  ];

  return (
    <div className="rounded-xl shadow-md bg-white dark:bg-darkgray p-6 w-full">
      <h5 className="mb-6 text-xl font-bold text-gray-800 dark:text-white">Other Stock</h5>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat, index) => (
          <a
            key={index}
            href={cat.link}
            className={`rounded-lg p-4 flex flex-col items-start gap-2 transition-transform transform hover:scale-105 shadow-sm hover:shadow-md ${cat.color}`}
          >
            <div className="p-2 bg-white rounded-full shadow">{cat.icon}</div>
            <span className="text-sm font-medium text-gray-700">{cat.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default OtherStock;
