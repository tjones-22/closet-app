"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OutfitModal from "@/app/Components/OutfitModal";
import Notification from "@/app/Components/Notification";

type Outfit = {
  outfitId: string;
  name: string;
  description: string;
  items: {
    image: string;
    itemId: string;
    type: string;
    color: string;
    style: string;
    occasion: string;
  }[];
};

const Outfits = () => {
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOutfit, setSelectedOutfit] = useState<Outfit | null>(null);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      setIsLoggedIn(false);
      setNotificationMessage("You must be logged in to view outfits.");
      setShowNotification(true);
      setLoading(false);
      return;
    }

    const fetchOutfits = async () => {
      try {
        const res = await fetch(
          `https://6ptjrzac72.execute-api.us-east-2.amazonaws.com/users/${userId}/outfits`
        );
        const data = await res.json();
        setOutfits(data.outfits || []);
      } catch (err) {
        console.error("Failed to fetch outfits", err);
        setNotificationMessage("Failed to fetch outfits.");
        setShowNotification(true);
      } finally {
        setLoading(false);
      }
    };

    fetchOutfits();
  }, []);

  const total = outfits.length;

  const moveLeft = () => {
    if (!isLoggedIn) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const moveRight = () => {
    if (!isLoggedIn) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const deleteOutfit = async (outfitId: string) => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      setNotificationMessage("You must be logged in to delete an outfit.");
      setShowNotification(true);
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this outfit?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `https://6ptjrzac72.execute-api.us-east-2.amazonaws.com/users/${userId}/outfits/${outfitId}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        setOutfits((prev) => prev.filter((o) => o.outfitId !== outfitId));
        setCurrentIndex(0);
        setNotificationMessage("Outfit deleted successfully!");
      } else {
        setNotificationMessage("Failed to delete outfit.");
      }
    } catch (err) {
      console.error("Error deleting outfit", err);
      setNotificationMessage("An error occurred while deleting the outfit.");
    } finally {
      setShowNotification(true);
    }
  };

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => setShowNotification(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  const getPosition = (index: number) => {
    const position = (index - currentIndex + total) % total;
    if (position === 0) return { scale: 1.1, zIndex: 10, opacity: 1 };
    if (position === 1 || position === total - 1)
      return { scale: 0.9, zIndex: 5, opacity: 0.8 };
    return { scale: 0.7, zIndex: 1, opacity: 0 };
  };

  if (loading) {
    return <p className="text-center mt-20 text-xl text-blue-900 font-semibold">Loading outfits...</p>;
  }

  if (!isLoggedIn) {
    return <p className="text-center mt-20 text-lg text-red-600 font-semibold">You must be logged in to view outfits.</p>;
  }

  if (outfits.length === 0) {
    return <p className="text-center mt-20 text-lg text-gray-600">You haven’t created any outfits yet.</p>;
  }

  return (
    <div className="relative w-full h-full flex flex-col items-center p-4 bg-blue-50 min-h-screen">
      <h1 className="text-4xl font-bold mt-8 mb-4 text-blue-900 underline">Your Outfits</h1>

      <div className="relative w-full max-w-[90%] h-[550px] flex items-center justify-center overflow-hidden mt-6">
        {total > 1 && (
          <button
            onClick={moveLeft}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-blue-800 text-yellow-300 p-4 rounded-full shadow-md hover:bg-blue-700 transition z-20"
          >
            {"<"}
          </button>
        )}

        <div className="relative flex items-center justify-center w-full h-full">
          <AnimatePresence>
            {outfits.map((outfit, index) => {
              const { scale, zIndex, opacity } = getPosition(index);
              return (
                <motion.div
                  key={outfit.outfitId}
                  className="absolute w-[320px] h-[470px] p-6 bg-white rounded-xl shadow-2xl transition-all duration-500 flex flex-col justify-between hover:scale-105 cursor-pointer"
                  style={{ transform: `scale(${scale})`, zIndex, opacity }}
                >
                  <div onClick={() => setSelectedOutfit(outfit)}>
                    <h2 className="text-2xl font-semibold text-center text-blue-800">
                      {outfit.name}
                    </h2>
                    <p className="text-sm text-center text-gray-500 mb-2">
                      {outfit.description}
                    </p>
                    {outfit.items?.[0] && (
                      <img
                        src={outfit.items[0].image || "/placeholder.png"}
                        alt="Preview"
                        className="w-full h-[230px] object-cover rounded-md mb-2"
                      />
                    )}
                    <p className="text-xs text-gray-400 italic text-center">
                      {outfit.items.length} item{outfit.items.length !== 1 && "s"}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteOutfit(outfit.outfitId);
                    }}
                    className="mt-4 bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-lg transition w-full"
                  >
                    Delete Outfit
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {total > 1 && (
          <button
            onClick={moveRight}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-800 text-yellow-300 p-4 rounded-full shadow-md hover:bg-blue-700 transition z-20"
          >
            {">"}
          </button>
        )}

        <div className="absolute bottom-[-50px] flex gap-3 justify-center w-full z-10">
          {outfits.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-4 h-4 rounded-full transition duration-300 border-2 ${
                index === currentIndex
                  ? "bg-yellow-300 border-blue-800"
                  : "bg-white border-gray-400"
              }`}
              aria-label={`Go to outfit ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {selectedOutfit && (
        <OutfitModal
          outfit={selectedOutfit}
          onClose={() => setSelectedOutfit(null)}
        />
      )}

      {showNotification && (
        <Notification
          message={notificationMessage}
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
};

export default Outfits;