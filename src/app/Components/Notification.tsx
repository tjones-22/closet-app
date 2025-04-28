"use client";

import { useState } from "react";

type NotificationProps = {
  message: string;
  onClose: () => void;
};

const Notification = ({ message, onClose }: NotificationProps) => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
    onClose();
  };

  if (!visible) return null;

  return (
    <div className="fixed top-5 right-5 bg-[#0a1f44] text-[#FFD700] px-6 py-4 rounded-lg shadow-lg flex items-center gap-4 z-50">
      <span className="text-md font-semibold">{message}</span>
      <button
        onClick={handleClose}
        className="text-red-500 font-bold text-xl hover:text-red-700 transition"
      >
        ×
      </button>
    </div>
  );
};

export default Notification;