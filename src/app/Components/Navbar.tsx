"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Notification from "./Notification"; // ✅ Make sure you import it

const Navbar = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [hasHydrated, setHasHydrated] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    setHasHydrated(true);
    const storedId = sessionStorage.getItem("userId");
    const storedUsername = sessionStorage.getItem("username");

    if (storedId && storedUsername) {
      setUserId(storedId);
      setUsername(storedUsername);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("https://6ptjrzac72.execute-api.us-east-2.amazonaws.com/user/login", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        sessionStorage.setItem("userId", data.userId);
        sessionStorage.setItem("username", username);
        setUserId(data.userId);
        setIsLoggedIn(true);
        setNotification({ type: "success", message: `Welcome, ${username}!` });
      } else {
        setNotification({ type: "error", message: data.error || "Login failed" });
      }
    } catch (err) {
      console.error(err);
      setNotification({ type: "error", message: "Login request failed" });
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("https://6ptjrzac72.execute-api.us-east-2.amazonaws.com/user/signout", {
        method: "PUT",
      });

      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("username");
      setUserId(null);
      setUsername("");
      setPassword("");
      setIsLoggedIn(false);
      setNotification({ type: "success", message: "You have been signed out." });
    } catch (err) {
      console.error("Sign out failed", err);
      setNotification({ type: "error", message: "Sign out request failed." });
    }
  };

  if (!hasHydrated) return null;

  return (
    <>
      {notification && (
        <Notification
          message={notification.message}
          
          onClose={() => setNotification(null)}
        />
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="nav-background checkered-background flex flex-row justify-around items-center w-full h-[20vh] bg-yellow-300 text-blue-600 text-[60px] rounded-md border-b-2 border-blue-600"
      >
        <h1 className="ml-auto">Your Closet</h1>

        <div className="flex flex-col items-end justify-center gap-2 text-xl w-1/3 h-[20vh] bg-blue-950 text-yellow-200 p-4 ml-auto rounded">
          {!isLoggedIn ? (
            <form className="flex flex-row gap-4 items-center" onSubmit={handleLogin}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-white text-black rounded px-4 py-2 w-full max-w-[150px]"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white text-black rounded px-4 py-2 w-full max-w-[150px]"
              />
              <button
                type="submit"
                className="text-yellow-100 text-2xl hover:underline"
              >
                Login
              </button>
              <Link href="/signup">
                <span className="text-yellow-100 hover:underline cursor-pointer text-2xl">
                  Signup
                </span>
              </Link>
            </form>
          ) : (
            <div className="flex flex-col items-end text-right gap-2">
              <span className="text-yellow-200 text-2xl">
                Welcome, <strong>{username}</strong>
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded text-white text-base"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;