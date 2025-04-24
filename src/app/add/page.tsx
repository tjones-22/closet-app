"use client";
import { compressImage } from "../utils/compressImage";
import Link from "next/link";
import { useRef, useState } from "react";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const typeRef = useRef<HTMLInputElement>(null);
  const colorRef = useRef<HTMLInputElement>(null);
  const styleRef = useRef<HTMLInputElement>(null);
  const occasionRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      alert("You must be logged in to add a closet item.");
      return;
    }

    const type = typeRef.current?.value || "";
    const color = colorRef.current?.value || "";
    const style = styleRef.current?.value || "";
    const occasion = occasionRef.current?.value || "";
    const imageFile = imageRef.current?.files?.[0];

    if (!imageFile) {
      alert("Please select an image.");
      return;
    }

    // Convert image to base64 string
    const imageBase64 = await compressImage(imageFile);
    
    try {
      const res = await fetch(
        `https://6ptjrzac72.execute-api.us-east-2.amazonaws.com/users/${userId}/closet`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
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
        alert("Closet item added successfully!");
      } else {
        alert(data.error || "Something went wrong.");
      }
    } catch (err) {
      alert("Failed to add closet item.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 relative px-4">
      <Link
        href="/"
        className="absolute top-4 left-4 text-blue-600 hover:underline text-sm font-medium"
      >
        ← Back to Home
      </Link>

      <div className="flex items-center justify-center pt-12">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
          <h2 className="text-3xl font-semibold text-center text-blue-950 underline mb-8">
            Add New Item to Closet
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label htmlFor="type" className="w-32 text-blue-950 font-medium">
                Type:
              </label>
              <input
                ref={typeRef}
                type="text"
                id="type"
                name="type"
                required
                className="flex-1 bg-gray-100 px-4 py-2 rounded-md border border-gray-300"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label htmlFor="color" className="w-32 text-blue-950 font-medium">
                Color:
              </label>
              <input
                ref={colorRef}
                type="text"
                id="color"
                name="color"
                required
                className="flex-1 bg-gray-100 px-4 py-2 rounded-md border border-gray-300"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label htmlFor="style" className="w-32 text-blue-950 font-medium">
                Style:
              </label>
              <input
                ref={styleRef}
                type="text"
                id="style"
                name="style"
                required
                className="flex-1 bg-gray-100 px-4 py-2 rounded-md border border-gray-300"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label
                htmlFor="occasion"
                className="w-32 text-blue-950 font-medium"
              >
                Occasion:
              </label>
              <input
                ref={occasionRef}
                type="text"
                id="occasion"
                name="occasion"
                required
                className="flex-1 bg-gray-100 px-4 py-2 rounded-md border border-gray-300"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label htmlFor="image" className="w-32 text-blue-950 font-medium">
                Image:
              </label>
              <input
                ref={imageRef}
                type="file"
                id="image"
                name="image"
                accept="image/*"
                required
                className="flex-1 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-60"
              >
                {loading ? "Adding..." : "Add Item"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;