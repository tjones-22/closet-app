"use client";
import Link from "next/link";
import Navbar from "./Components/Navbar";
import { useState } from "react";

export default function Home() {
  const [buttonSelector, setButonSelector] = useState(-1);

  return (
    <>
      <Navbar />

      <div className="flex flex-row items-center justify-center gap-8 mt-10">
        <button
          onClick={() => {
            setButonSelector(0);
          }}
          className="bg-blue-950 text-yellow-200 px-6 py-2 rounded-full text-lg font-semibold hover:bg-blue-900 transition"
        >
          All Items
        </button>

        <button
          onClick={() => {
            setButonSelector(1);
          }}
          className="bg-blue-950 text-yellow-200 px-6 py-2 rounded-full text-lg font-semibold hover:bg-blue-900 transition"
        >
          Closet Items
        </button>

        <button
          onClick={() => {
            setButonSelector(2);
          }}
          className="bg-blue-950 text-yellow-200 px-6 py-2 rounded-full text-lg font-semibold hover:bg-blue-900 transition"
        >
          Outfits
        </button>

        <Link href="/add">
        <button className="bg-blue-950 text-yellow-200 px-6 py-2 rounded-full text-lg font-semibold hover:bg-blue-900 transition">
          All Items
        </button>
        </Link>
      </div>
    </>
  );
}
