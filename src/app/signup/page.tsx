"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import Loader from "@/app/Components/Loader"; // 👈 Import the Loader!

const Home = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://6ptjrzac72.execute-api.us-east-2.amazonaws.com/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setNotification({ type: "success", message: "Sign up successful!" });
        setTimeout(() => router.push("/"), 1500); // redirect after showing message
      } else {
        setNotification({ type: "error", message: data.error || "Something went wrong." });
      }
    } catch (err) {
      console.error(err);
      setNotification({ type: "error", message: "Failed to submit form." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Sign up - Closet App</title>
        <meta name="description" content="Create an account and start creating your closet" />
      </Head>

      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-4">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border-t-4 border-yellow-400 relative">
            <h2 className="text-4xl font-extrabold text-blue-900 mb-6 text-center drop-shadow-md">
              Sign Up
            </h2>

            {notification && (
              <div
                className={`mb-4 p-4 rounded-md text-center font-semibold ${
                  notification.type === "success"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {notification.message}
              </div>
            )}

            <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
              />

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
              />

              <button
                type="submit"
                className="bg-yellow-400 text-blue-950 font-bold rounded-full py-2 mt-2 hover:bg-yellow-300 hover:scale-105 transform transition-all duration-300"
              >
                Create Account
              </button>
            </form>

            <div className="text-center mt-6 text-gray-600 text-sm">
              <p>
                Already have an account?{" "}
                <a href="/" className="text-blue-600 hover:underline font-semibold">
                  Log In
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;