"use client";

import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <motion.div
        className="w-20 h-20 border-8 border-yellow-400 border-t-blue-950 rounded-full animate-spin"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
    </div>
  );
};

export default Loader;