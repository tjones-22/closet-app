"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import FilterModal from "@/app/Components/FilterModal";
import OutfitCard from "@/app/Components/OutfitCard";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allClothes, setAllClothes] = useState<any[]>([]);
  const [filteredClothes, setFilteredClothes] = useState<any[]>([]);
  const [outfitItems, setOutfitItems] = useState<any[]>([]);
  const [outfitName, setOutfitName] = useState("");
  const [outfitDescription, setOutfitDescription] = useState("");
  const [notification, setNotification] = useState<boolean>(false);

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) return;

    const fetchItems = async () => {
      const res = await fetch(
        `https://6ptjrzac72.execute-api.us-east-2.amazonaws.com/users/${userId}/closet`
      );
      const data = await res.json();
      setAllClothes(data.items || []);
      setFilteredClothes(data.items || []);
    };

    fetchItems();
  }, []);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const applyFilters = ({
    type,
    style,
    occasion,
  }: {
    type: string;
    style: string;
    occasion: string;
  }) => {
    const filtered = allClothes.filter((item) => {
      const matchType = !type || item.type?.toLowerCase().trim() === type.toLowerCase().trim();
      const matchStyle = !style || item.style?.toLowerCase().trim() === style.toLowerCase().trim();
      const matchOccasion = !occasion || item.occasion?.toLowerCase().trim() === occasion.toLowerCase().trim();
      return matchType && matchStyle && matchOccasion;
    });

    setFilteredClothes(filtered);
  };

  const addToOutfit = (item: any) => {
    if (!outfitItems.some((i) => i.itemId === item.itemId)) {
      setOutfitItems([...outfitItems, item]);
    }
  };

  const removeFromOutfit = (itemId: string) => {
    setOutfitItems(outfitItems.filter((item) => item.itemId !== itemId));
  };

  const saveOutfit = async () => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) return;

    const res = await fetch(
      `https://6ptjrzac72.execute-api.us-east-2.amazonaws.com/users/${userId}/outfits`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: outfitName,
          description: outfitDescription,
          items: outfitItems.map(({ itemId, image, type, color, style, occasion }) => ({
            itemId,
            image,
            type,
            color,
            style,
            occasion,
          })),
        }),
      }
    );

    if (res.ok) {
      setNotification(true);
      setOutfitName("");
      setOutfitDescription("");
      setOutfitItems([]);
    } else {
      alert("Failed to save outfit");
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-blue-50 px-6 py-6">
      {/* Back Link */}
      <Link
        href="/"
        className="absolute top-4 left-4 text-blue-600 hover:underline text-sm font-medium"
      >
        ← Back to Home
      </Link>

      <div className="flex flex-row w-full h-full gap-4 pt-8">
        {/* Left: Filterable Closet Items */}
        <div className="w-1/2">
          <div className="flex justify-between mb-4">
            <button
              onClick={toggleModal}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Filters
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredClothes.map((item) => (
              <OutfitCard
                key={item.itemId}
                item={item}
                onClick={() => addToOutfit(item)}
              />
            ))}
          </div>
        </div>

        {/* Right: Outfit Builder Panel */}
        <div className="w-1/2 bg-gray-100 p-4 rounded-md shadow-md">
          <h3 className="text-xl font-bold mb-4">Outfit Builder</h3>
          <div className="grid gap-2 mb-4">
            {outfitItems.map((item) => (
              <div
                key={item.itemId}
                className="flex items-center gap-4 bg-white p-2 rounded-md shadow-md"
              >
                <img
                  src={item.image}
                  alt={item.type}
                  className="w-12 h-12 object-cover rounded-md"
                />
                <div className="flex-1">
                  <p className="font-bold">{item.type}</p>
                  <p className="text-sm text-gray-500">{item.style}</p>
                </div>
                <button
                  onClick={() => removeFromOutfit(item.itemId)}
                  className="text-red-500 font-bold"
                >
                  x
                </button>
              </div>
            ))}
          </div>
          <input
            type="text"
            value={outfitName}
            onChange={(e) => setOutfitName(e.target.value)}
            placeholder="Outfit Name"
            className="w-full mb-2 px-3 py-2 border rounded-md"
          />
          <textarea
            value={outfitDescription}
            onChange={(e) => setOutfitDescription(e.target.value)}
            placeholder="Description"
            className="w-full mb-2 px-3 py-2 border rounded-md"
          ></textarea>
          <button
            onClick={saveOutfit}
            className="bg-green-500 text-white px-4 py-2 rounded-md w-full"
          >
            Save Outfit
          </button>
        </div>
      </div>

      {isModalOpen && (
        <FilterModal
          onClose={toggleModal}
          onApplyFilters={applyFilters}
          closetItems={allClothes}
        />
      )}

      {notification && (
        <div className="fixed top-20 right-5 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg z-50">
          <p>Outfit saved successfully!</p>
          <button
            onClick={() => setNotification(false)}
            className="text-white font-bold hover:underline mt-2"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;