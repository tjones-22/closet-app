"use client";

import { compressImage } from "../utils/compressImage";
import Link from "next/link";
import Head from "next/head";
import { useRef, useState } from "react";
import Notification from "@/app/Components/Notification";
import Loader from "@/app/Components/Loader"; // 👈 Import Loader

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const typeRef = useRef<HTMLInputElement>(null);
  const colorRef = useRef<HTMLInputElement>(null);
  const styleRef = useRef<HTMLInputElement>(null);
  const occasionRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    if (typeRef.current) typeRef.current.value = "";
    if (colorRef.current) colorRef.current.value = "";
    if (styleRef.current) styleRef.current.value = "";
    if (occasionRef.current) occasionRef.current.value = "";
    if (imageRef.current) imageRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      setNotificationMessage("You must be logged in to add a closet item.");
      setShowNotification(true);
      setLoading(false);
      return;
    }

    const type = typeRef.current?.value || "";
    const color = colorRef.current?.value || "";
    const style = styleRef.current?.value || "";
    const occasion = occasionRef.current?.value || "";
    const imageFile = imageRef.current?.files?.[0];

    if (!imageFile) {
      setNotificationMessage("Please select an image.");
      setShowNotification(true);
      setLoading(false);
      return;
    }

    const imageBase64 = await compressImage(imageFile);

    try {
      const res = await fetch(
        `https://6ptjrzac72.execute-api.us-east-2.amazonaws.com/users/${userId}/closet`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type,
            color,
            style,
            occasion,
            image: imageBase64,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setNotificationMessage("Closet item added successfully!");
        resetForm();
      } else {
        setNotificationMessage(data.error || "Something went wrong.");
      }
      setShowNotification(true);
    } catch (err) {
      console.error(err);
      setNotificationMessage("Failed to add closet item.");
      setShowNotification(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Add New Item - Closet App</title>
        <meta
          name="description"
          content="Easily add a new item to your closet."
        />
      </Head>

      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-6 relative">
          <Link
            href="/"
            className="absolute top-6 left-6 text-blue-700 hover:underline text-sm font-semibold"
          >
            ← Back to Home
          </Link>

          <div className="bg-white shadow-2xl rounded-xl p-10 w-full max-w-2xl border-2 border-blue-100">
            <h2 className="text-4xl font-extrabold text-center text-blue-950 underline mb-8">
              Add New Closet Item
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <label htmlFor="type" className="w-32 text-blue-900 font-semibold text-lg">
                  Type:
                </label>
                <input
                  ref={typeRef}
                  type="text"
                  id="type"
                  name="type"
                  required
                  className="flex-1 bg-gray-100 px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <label htmlFor="color" className="w-32 text-blue-900 font-semibold text-lg">
                  Color:
                </label>
                <input
                  ref={colorRef}
                  type="text"
                  id="color"
                  name="color"
                  required
                  className="flex-1 bg-gray-100 px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <label htmlFor="style" className="w-32 text-blue-900 font-semibold text-lg">
                  Style:
                </label>
                <input
                  ref={styleRef}
                  type="text"
                  id="style"
                  name="style"
                  required
                  className="flex-1 bg-gray-100 px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <label htmlFor="occasion" className="w-32 text-blue-900 font-semibold text-lg">
                  Occasion:
                </label>
                <input
                  ref={occasionRef}
                  type="text"
                  id="occasion"
                  name="occasion"
                  required
                  className="flex-1 bg-gray-100 px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <label htmlFor="image" className="w-32 text-blue-900 font-semibold text-lg">
                  Image:
                </label>
                <input
                  ref={imageRef}
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  required
                  className="flex-1 bg-gray-100 text-gray-700 file:bg-blue-600 file:text-white file:rounded-md file:px-4 file:py-2 hover:file:bg-blue-700 transition file:cursor-pointer"
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-700 text-yellow-200 font-bold px-8 py-3 rounded-full hover:bg-blue-800 transition disabled:opacity-50"
                >
                  {loading ? "Adding..." : "Add Item"}
                </button>
              </div>
            </form>
          </div>

          {showNotification && (
            <Notification
              message={notificationMessage}
              onClose={() => setShowNotification(false)}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Home;