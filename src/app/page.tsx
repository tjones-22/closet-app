"use client";
import Link from "next/link";
import Navbar from "./Components/Navbar";
import ClosetItems from "./Components/ClosetItems";
import { useState } from "react";
import Outfits from "./Components/Outfits";

export default function Home() {
  const [buttonSelector, setButtonSelector] = useState(-1);

  return (
    <>
      <Navbar />

      <div className="flex flex-row items-center justify-center gap-8 mt-10">
        <button
          onClick={() => {
            setButtonSelector(0);
          }}
          className="bg-blue-950 text-yellow-200 px-6 py-2 rounded-full text-lg font-semibold hover:bg-blue-900 transition"
        >
          All Items
        </button>

        <button
          onClick={() => {
            setButtonSelector(1);
          }}
          className="bg-blue-950 text-yellow-200 px-6 py-2 rounded-full text-lg font-semibold hover:bg-blue-900 transition"
        >
          Closet Items
        </button>

        <button
          onClick={() => {
            setButtonSelector(2);
          }}
          className="bg-blue-950 text-yellow-200 px-6 py-2 rounded-full text-lg font-semibold hover:bg-blue-900 transition"
        >
          Outfits
        </button>

        <Link href="/add">
        <button className="bg-blue-950 text-yellow-200 px-6 py-2 rounded-full text-lg font-semibold hover:bg-blue-900 transition">
          Add item
        </button>
        </Link>

        <Link href="/add/outfit">
        <button className="bg-blue-950 text-yellow-200 px-6 py-2 rounded-full text-lg font-semibold hover:bg-blue-900 transition">
          Make Outfit
        </button>
        </Link>
      </div>


      <div>
        {buttonSelector === 1 && <ClosetItems />}
        {buttonSelector === 2 && <Outfits />}
      </div>
    </>
  );
}
