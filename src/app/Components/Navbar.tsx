"use client"

import Link from "next/link";
import { motion } from "framer-motion";
const Navbar = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="nav-background checkered-background  flex flex-row justify-around items-center w-full h-[20vh]  bg-yellow-300 text-blue-600 text-[60px] rounded-md border-b-2 border-blue-600"
      >
        <h1 className="ml-auto"> Your Closet</h1>

        <form className="flex flex-row items-center justify-evenly gap-4 text-xl w-1/3 h-[20vh] bg-blue-950 text-yellow-200 p-4 ml-auto rounded">
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            className="bg-white text-black rounded px-4 py-2 w-full max-w-[150px] "
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="bg-white text-black rounded px-4 py-2 w-full max-w-[150px]"
          />
          <Link href="/signup">
            <span className="text-yellow-100 hover:underline cursor-pointer text-4xl">
              Signup
            </span>
          </Link>
        </form>
      </motion.div>
    </>
  );
};

export default Navbar;
