import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type FilterModalProps = {
  onClose: () => void;
  onApplyFilters: (filters: {
    type: string;
    style: string;
    occasion: string;
    color?: string;
  }) => void;
  closetItems: any[];
};

const FilterModal: React.FC<FilterModalProps> = ({
  onClose,
  onApplyFilters,
  closetItems,
}) => {
  const [category, setCategory] = useState("");
  const [value, setValue] = useState("");
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    if (!category) {
      setOptions([]);
      setValue("");
      return;
    }

    const unique = [
      ...new Set(
        closetItems
          .map((item) => item[category])
          .filter((val) => val !== undefined && val !== "")
      ),
    ];
    setOptions(unique);
    setValue(""); // reset value
  }, [category, closetItems]);

  const handleApply = () => {
    const filters = {
      type: category === "type" ? value : "",
      style: category === "style" ? value : "",
      occasion: category === "occasion" ? value : "",
      color: category === "color" ? value : "",
    };
    onApplyFilters(filters);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative">
          <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">
            Filter Closet Items
          </h2>

          {/* Category Dropdown */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-md w-full px-4 py-2 mb-4 bg-gray-100 text-blue-950 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            <option value="type">Type</option>
            <option value="color">Color</option>
            <option value="style">Style</option>
            <option value="occasion">Occasion</option>
          </select>

          {/* Value Dropdown */}
          {category && (
            <select
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="border border-gray-300 rounded-md w-full px-4 py-2 mb-6 bg-gray-100 text-blue-950 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select {category}</option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}

          <div className="flex flex-col gap-4">
            <button
              className="bg-blue-700 hover:bg-blue-800 text-yellow-200 font-semibold py-2 rounded-md w-full transition"
              onClick={handleApply}
            >
              Apply Filters
            </button>

            <button
              onClick={onClose}
              className="text-red-600 hover:text-red-400 underline text-center font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default FilterModal;