"use client"

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
      {/* Dark overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Modal content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-[90%] overflow-auto max-h-[90vh] relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-600 transition"
            aria-label="Close Modal"
          >
            &times;
          </button>

          <h2 className="text-2xl font-bold text-blue-900 mb-2 text-center">
            {outfit.name}
          </h2>
          <p className="text-center text-gray-600 mb-6">{outfit.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {outfit.items.map((item) => (
              <div
                key={item.itemId}
                className="border rounded-md p-4 bg-gray-50 shadow-sm"
              >
                <img
                  src={item.image || "/placeholder.png"}
                  alt={item.type}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
                <h3 className="font-semibold text-blue-900">{item.type}</h3>
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