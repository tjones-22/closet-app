"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import FilterModal from "@/app/Components/FilterModal";
import OutfitCard from "@/app/Components/OutfitCard";
import Notification from "@/app/Components/Notification";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allClothes, setAllClothes] = useState<any[]>([]);
  const [filteredClothes, setFilteredClothes] = useState<any[]>([]);
  const [outfitItems, setOutfitItems] = useState<any[]>([]);
  const [outfitName, setOutfitName] = useState("");
  const [outfitDescription, setOutfitDescription] = useState("");
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
        setAllClothes(data.items || []);
        setFilteredClothes(data.items || []);
      } catch (err) {
        console.error("Failed to fetch closet items", err);
        setNotificationMessage("Failed to load closet items.");
        setShowNotification(true);
      }
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
    if (!userId) {
      setNotificationMessage("You must be logged in to save an outfit.");
      setShowNotification(true);
      return;
    }

    if (!outfitName || !outfitDescription || outfitItems.length === 0) {
      setNotificationMessage("Please fill in all fields and add at least one item.");
      setShowNotification(true);
      return;
    }

    try {
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
        setNotificationMessage("Outfit saved successfully!");
        setOutfitName("");
        setOutfitDescription("");
        setOutfitItems([]);
      } else {
        setNotificationMessage("Failed to save outfit. Please try again.");
      }
    } catch (err) {
      console.error("Error saving outfit:", err);
      setNotificationMessage("Something went wrong saving the outfit.");
    } finally {
      setShowNotification(true);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-blue-50 px-8 py-8 flex flex-col">
      {/* Back Link */}
      <Link
        href="/"
        className="absolute top-6 left-6 text-blue-700 hover:underline font-semibold text-sm"
      >
        ← Back to Home
      </Link>

      <div className="flex flex-col lg:flex-row gap-6 mt-16">
        {/* Left Side */}
        <div className="w-full lg:w-1/2">
          <div className="flex justify-end mb-4">
            <button
              onClick={toggleModal}
              className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-2 rounded-full shadow-lg"
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

        {/* Right Side */}
        <div className="w-full lg:w-1/2 bg-white rounded-lg p-6 shadow-2xl border border-blue-100">
          <h3 className="text-2xl font-bold text-blue-900 mb-6">Outfit Builder</h3>

          {/* Selected Items */}
          <div className="grid gap-4 mb-6">
            {outfitItems.map((item) => (
              <div
                key={item.itemId}
                className="flex items-center gap-4 bg-gray-100 p-3 rounded-md shadow-md"
              >
                <img
                  src={item.image}
                  alt={item.type}
                  className="w-12 h-12 rounded-md object-cover"
                />
                <div className="flex-1">
                  <p className="font-bold text-blue-800">{item.type}</p>
                  <p className="text-xs text-gray-500">{item.style}</p>
                </div>
                <button
                  onClick={() => removeFromOutfit(item.itemId)}
                  className="text-red-600 hover:text-red-700 font-bold text-xl"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* Form */}
          <input
            type="text"
            value={outfitName}
            onChange={(e) => setOutfitName(e.target.value)}
            placeholder="Outfit Name"
            className="w-full mb-3 px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            value={outfitDescription}
            onChange={(e) => setOutfitDescription(e.target.value)}
            placeholder="Description"
            className="w-full mb-3 px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          />

          <button
            onClick={saveOutfit}
            className="bg-green-600 hover:bg-green-700 text-white font-bold w-full py-3 rounded-full shadow-lg mt-2"
          >
            Save Outfit
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <FilterModal
          onClose={toggleModal}
          onApplyFilters={applyFilters}
          closetItems={allClothes}
        />
      )}

      {/* Notification */}
      {showNotification && (
        <Notification
          message={notificationMessage}
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
};

export default Home;