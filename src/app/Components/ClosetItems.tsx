"use client";

import { useEffect, useState } from "react";

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
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading closet items...</p>;
  }

  if (items.length === 0) {
    return <p className="text-center mt-10">No items in your closet yet.</p>;
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-4 px-4 py-8 w-max">
        {items.map((item) => (
          <div
            key={item.itemId}
            className="min-w-[200px] bg-white rounded-lg shadow-lg border border-blue-200 flex flex-col items-center p-4"
          >
            <img
              src={item.image}
              alt={item.type}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <p className="text-blue-900 font-semibold">Color: {item.color}</p>
            <p className="text-blue-900 font-semibold">Type: {item.type}</p>
            <p className="text-blue-900 font-semibold">Occasion: {item.occasion}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClosetItems;