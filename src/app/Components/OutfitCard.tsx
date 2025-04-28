import React from "react";

interface OutfitCardProps {
  item: {
    itemId: string;
    image: string;
    type: string;
    style: string;
  };
  onClick: () => void;
}

const OutfitCard: React.FC<OutfitCardProps> = ({ item, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl cursor-pointer transition-transform hover:scale-105 border border-blue-100"
    >
      <img
        src={item.image || "/placeholder.png"}
        alt={item.type}
        className="w-full h-44 object-cover rounded-lg mb-3"
      />
      <h4 className="text-lg font-extrabold text-blue-900 text-center truncate">
        {item.type}
      </h4>
      <p className="text-sm text-gray-500 text-center">{item.style}</p>
    </div>
  );
};

export default OutfitCard;