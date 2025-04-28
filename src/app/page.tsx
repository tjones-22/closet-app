"use client";

import Link from "next/link";
import Navbar from "./Components/Navbar";
import ClosetItems from "./Components/ClosetItems";
import Outfits from "./Components/Outfits";
import Loader from "./Components/Loader"; // 👈 Import Loader
import { useState } from "react";

export default function Home() {
  const [buttonSelector, setButtonSelector] = useState(-1);
  const [loading, setLoading] = useState(false);

  const handleClick = (selector: number) => {
    setLoading(true);
    setButtonSelector(selector);
    setTimeout(() => {
      setLoading(false);
    }, 1000); // simulate loading time
  };

  return (
    <>
      <Navbar />

      <div className="flex flex-col items-center justify-center mt-10 px-6">
        <div className="flex flex-wrap gap-6 justify-center mb-8">
          <button
            onClick={() => handleClick(1)}
            className="bg-blue-950 text-yellow-200 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-900 hover:scale-105 transition-all duration-300 shadow-md border-2 border-transparent hover:border-yellow-300"
          >
            Closet Items
          </button>

          <button
            onClick={() => handleClick(2)}
            className="bg-blue-950 text-yellow-200 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-900 hover:scale-105 transition-all duration-300 shadow-md border-2 border-transparent hover:border-yellow-300"
          >
            Outfits
          </button>

          <Link href="/add">
            <button className="bg-blue-950 text-yellow-200 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-900 hover:scale-105 transition-all duration-300 shadow-md border-2 border-transparent hover:border-yellow-300">
              Add Item
            </button>
          </Link>

          <Link href="/add/outfit">
            <button className="bg-blue-950 text-yellow-200 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-900 hover:scale-105 transition-all duration-300 shadow-md border-2 border-transparent hover:border-yellow-300">
              Make Outfit
            </button>
          </Link>
        </div>

        <div className="w-full max-w-7xl">
          {loading ? (
            <Loader />
          ) : (
            <>
              {buttonSelector === 1 && <ClosetItems />}
              {buttonSelector === 2 && <Outfits />}
            </>
          )}
        </div>
      </div>
    </>
  );
}