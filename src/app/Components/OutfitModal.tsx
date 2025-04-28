"use client";

import { motion } from "framer-motion";

type ClosetItem = {
  itemId: string;
  image: string;
  type: string;
  color: string;
  style: string;
  occasion: string;
};

type Outfit = {
  outfitId: string;
  name: string;
  description: string;
  items: ClosetItem[];
};

type OutfitModalProps = {
  outfit: Outfit;
  onClose: () => void;
};

const OutfitModal: React.FC<OutfitModalProps> = ({ outfit, onClose }) => {
  return (
    <>
      {/* Dark Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full overflow-auto max-h-[90vh] relative border-2 border-blue-900">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-red-600 hover:bg-red-500 text-white w-9 h-9 flex items-center justify-center rounded-full font-bold text-lg transition"
            aria-label="Close Modal"
          >
            &times;
          </button>

          {/* Outfit Name and Description */}
          <h2 className="text-3xl font-bold text-blue-900 text-center mb-2 underline">
            {outfit.name}
          </h2>
          <p className="text-center text-gray-600 text-lg mb-6 italic">{outfit.description}</p>

          {/* Closet Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {outfit.items.map((item) => (
              <div
                key={item.itemId}
                className="border border-blue-200 rounded-xl p-4 bg-blue-50 hover:bg-blue-100 shadow-md transition"
              >
                <img
                  src={item.image || "/placeholder.png"}
                  alt={item.type}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-bold text-blue-800">{item.type}</h3>
                <p className="text-sm text-gray-700">Color: {item.color}</p>
                <p className="text-sm text-gray-700">Style: {item.style}</p>
                <p className="text-sm text-gray-700">Occasion: {item.occasion}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default OutfitModal;