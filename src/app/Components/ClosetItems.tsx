"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ClosetItem = {
  image: string;
  color: string;
  type: string;
  occasion: string;
  itemId: string;
};

const ClosetItems = () => {
  const [items, setItems] = useState<ClosetItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) return;

    const fetchItems = async () => {
      try {
        const res = await fetch(
          `https://6ptjrzac72.execute-api.us-east-2.amazonaws.com/users/${userId}/closet`
        );
        const data = await res.json();
        setItems(data.items || []);
      } catch (err) {
        console.error("Failed to fetch closet items", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const totalItems = items.length;

  const moveLeft = () => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  const moveRight = () => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  };

  const getPosition = (index: number) => {
    const position = (index - currentIndex + totalItems) % totalItems;
    if (position === 0) return { scale: 1.2, zIndex: 10, opacity: 1 };
    if (position === 1 || position === totalItems - 1)
      return { scale: 0.9, zIndex: 5, opacity: 0.8 };
    return { scale: 0.7, zIndex: 1, opacity: 0 };
  };

  if (loading) {
    return <p className="text-center mt-10">Loading closet items...</p>;
  }

  if (items.length === 0) {
    return <p className="text-center mt-10">No items in your closet yet.</p>;
  }

  return (
    <div className="relative w-full h-full flex flex-col items-center">
      <h1 className="text-3xl font-bold mt-6 mb-2 text-blue-900">Your Closet</h1>

      <div className="relative w-full max-w-[90%] h-[500px] flex items-center justify-center overflow-hidden mt-4">
        {totalItems > 1 && (
          <button
            onClick={moveLeft}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-300 p-3 rounded-full shadow-md hover:bg-gray-400 transition z-20"
          >
            {"<"}
          </button>
        )}

        <div className="relative flex items-center justify-center w-full h-full">
          <AnimatePresence>
            {items.map((item, index) => {
              const { scale, zIndex, opacity } = getPosition(index);
              return (
                <motion.div
                  key={item.itemId}
                  className="absolute w-[300px] h-[400px] p-6 bg-white rounded-lg shadow-md transition-all duration-500"
                  style={{ transform: `scale(${scale})`, zIndex, opacity }}
                >
                  <img
                    src={item.image || "/placeholder.png"}
                    alt={item.type}
                    className="w-full h-[200px] object-cover rounded-md mb-4"
                  />
                  <h2 className="text-lg font-bold text-center">
                    {item.type.toUpperCase()}
                  </h2>
                  <p className="text-center">Color: {item.color}</p>
                  <p className="text-center">Occasion: {item.occasion}</p>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {totalItems > 1 && (
          <button
            onClick={moveRight}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-300 p-3 rounded-full shadow-md hover:bg-gray-400 transition z-20"
          >
            {">"}
          </button>
        )}

        {/* 👇 Dot selector buttons below carousel */}
        <div className="absolute bottom-[-40px] flex gap-3 justify-center w-full z-10">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-4 h-4 rounded-full transition duration-300 border-2 ${
                index === currentIndex
                  ? "bg-blue-600 border-blue-800"
                  : "bg-white border-gray-400"
              }`}
              aria-label={`Go to item ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClosetItems;