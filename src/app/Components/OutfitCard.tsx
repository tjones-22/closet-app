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
      className="bg-white p-4 rounded-md shadow-md hover:shadow-lg cursor-pointer transition"
    >
      <img
        src={item.image || "/placeholder.png"}
        alt={item.type}
        className="w-full h-40 object-cover rounded-md mb-2"
      />
      <h4 className="text-md font-bold text-blue-950">{item.type}</h4>
      <p className="text-sm text-gray-500">{item.style}</p>
    </div>
  );
};

export default OutfitCard;