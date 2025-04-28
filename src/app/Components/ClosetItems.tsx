"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Notification from "@/app/Components/Notification";

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
  const [notificationMessage, setNotificationMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);

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
        setNotificationMessage("Failed to fetch closet items.");
        setShowNotification(true);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const moveLeft = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const moveRight = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const deleteItem = async (itemId: string) => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      setNotificationMessage("You must be logged in to delete an item.");
      setShowNotification(true);
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `https://6ptjrzac72.execute-api.us-east-2.amazonaws.com/users/${userId}/closet/${itemId}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        setItems((prev) => prev.filter((item) => item.itemId !== itemId));
        setCurrentIndex(0);
        setNotificationMessage("Item deleted successfully!");
      } else {
        setNotificationMessage("Failed to delete item. Please try again.");
      }
    } catch (err) {
      console.error("Error deleting item", err);
      setNotificationMessage("An error occurred while deleting the item.");
    } finally {
      setShowNotification(true);
    }
  };

  const getPosition = (index: number) => {
    const position = (index - currentIndex + items.length) % items.length;
    if (position === 0) return { scale: 1.2, zIndex: 10, opacity: 1 };
    if (position === 1 || position === items.length - 1)
      return { scale: 0.9, zIndex: 5, opacity: 0.8 };
    return { scale: 0.7, zIndex: 1, opacity: 0 };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-50">
        <p className="text-2xl font-bold text-blue-800 animate-pulse">Loading closet items...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-50">
        <p className="text-xl font-semibold text-gray-500">No items in your closet yet.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex flex-col items-center px-6 py-8 bg-blue-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-blue-900 underline mb-8">
        Your Closet
      </h1>

      <div className="relative w-full max-w-5xl h-[550px] flex items-center justify-center overflow-hidden mt-6">
        {items.length > 1 && (
          <button
            onClick={moveLeft}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-blue-900 text-yellow-300 p-3 rounded-full hover:bg-blue-700 shadow-md transition"
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
                  className="absolute w-[320px] h-[480px] p-6 bg-white rounded-2xl shadow-2xl transition-all duration-500 flex flex-col justify-between hover:scale-105 cursor-pointer"
                  style={{ transform: `scale(${scale})`, zIndex, opacity }}
                >
                  <div>
                    <img
                      src={item.image || "/placeholder.png"}
                      alt={item.type}
                      className="w-full h-[220px] object-cover rounded-lg mb-4"
                    />
                    <h2 className="text-xl font-bold text-center text-blue-800">
                      {item.type.toUpperCase()}
                    </h2>
                    <p className="text-center text-gray-600 text-sm mt-2">
                      Color: {item.color}
                    </p>
                    <p className="text-center text-gray-600 text-sm">
                      Occasion: {item.occasion}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteItem(item.itemId)}
                    className="mt-4 bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-lg w-full transition"
                  >
                    Delete Item
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {items.length > 1 && (
          <button
            onClick={moveRight}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-900 text-yellow-300 p-3 rounded-full hover:bg-blue-700 shadow-md transition"
          >
            {">"}
          </button>
        )}

        <div className="absolute bottom-[-50px] flex gap-2 justify-center w-full">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-4 h-4 rounded-full transition border-2 ${
                index === currentIndex
                  ? "bg-yellow-300 border-blue-800"
                  : "bg-white border-gray-400"
              }`}
              aria-label={`Go to item ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {showNotification && (
        <Notification
          message={notificationMessage}
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
};

export default ClosetItems;