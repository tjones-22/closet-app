"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OutfitModal from "@/app/Components/OutfitModal";

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

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) return;

    const fetchOutfits = async () => {
      try {
        const res = await fetch(
          `https://6ptjrzac72.execute-api.us-east-2.amazonaws.com/users/${userId}/outfits`
        );
        const data = await res.json();
        setOutfits(data.outfits || []);
      } catch (err) {
        console.error("Failed to fetch outfits", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOutfits();
  }, []);

  const total = outfits.length;

  const moveLeft = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const moveRight = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const getPosition = (index: number) => {
    const position = (index - currentIndex + total) % total;
    if (position === 0) return { scale: 1.1, zIndex: 10, opacity: 1 };
    if (position === 1 || position === total - 1)
      return { scale: 0.9, zIndex: 5, opacity: 0.8 };
    return { scale: 0.7, zIndex: 1, opacity: 0 };
  };

  if (loading) return <p className="text-center mt-10">Loading outfits...</p>;
  if (outfits.length === 0)
    return <p className="text-center mt-10">You haven’t created any outfits yet.</p>;

  return (
    <div className="relative w-full h-full flex flex-col items-center">
      <h1 className="text-3xl font-bold mt-6 mb-2 text-blue-900">Your Outfits</h1>

      <div className="relative w-full max-w-[90%] h-[500px] flex items-center justify-center overflow-hidden mt-4">
        {total > 1 && (
          <button
            onClick={moveLeft}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-300 p-3 rounded-full shadow-md hover:bg-gray-400 transition z-20"
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
                  className="absolute w-[300px] h-[400px] p-6 bg-white rounded-lg shadow-md transition-all duration-500 cursor-pointer"
                  style={{ transform: `scale(${scale})`, zIndex, opacity }}
                  onClick={() => setSelectedOutfit(outfit)}
                >
                  <h2 className="text-xl font-semibold text-center text-blue-900">
                    {outfit.name}
                  </h2>
                  <p className="text-sm text-center text-gray-600 mb-2">
                    {outfit.description}
                  </p>
                  {outfit.items?.[0] && (
                    <img
                      src={outfit.items[0].image || "/placeholder.png"}
                      alt="Preview"
                      className="w-full h-[220px] object-cover rounded-md"
                    />
                  )}
                  <p className="text-xs text-gray-500 italic text-center mt-2">
                    {outfit.items.length} item{outfit.items.length !== 1 && "s"}
                  </p>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {total > 1 && (
          <button
            onClick={moveRight}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-300 p-3 rounded-full shadow-md hover:bg-gray-400 transition z-20"
          >
            {">"}
          </button>
        )}

        <div className="absolute bottom-[-40px] flex gap-3 justify-center w-full z-10">
          {outfits.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-4 h-4 rounded-full transition duration-300 border-2 ${
                index === currentIndex
                  ? "bg-blue-600 border-blue-800"
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
    </div>
  );
};

export default Outfits;
