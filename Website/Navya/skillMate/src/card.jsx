import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Card({ profile, onSwipeLeft, onSwipeRight, blurred }) {
  const navigate = useNavigate();

  const handleDragEnd = (event, info) => {
    if (info.offset.x < -100) onSwipeLeft(); // Swipe Left
    else if (info.offset.x > 100) onSwipeRight(); // Swipe Right
  };

  return (
    <div
      className={`w-full h-full bg-white rounded-2xl shadow-xl relative flex flex-col overflow-hidden ${
        blurred ? "pointer-events-none opacity-60" : ""
      }`}
    >
      {/* Motion on Image Block ONLY */}
      <motion.div
        className="relative w-full h-full"
        drag={!blurred ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.5}
        onDragEnd={!blurred ? handleDragEnd : undefined}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={profile.image}
          alt={profile.name}
          className="w-full h-full object-cover rounded-2xl"
        />

        {/* Arrow Button */}
        {!blurred && (
          <div
            className="absolute bottom-4 right-4 bg-white bg-opacity-70 rounded-full p-2 cursor-pointer hover:bg-opacity-100 transition"
            onClick={() => navigate(`/profile/${profile.id}`)}
          >
            <span className="text-lg">➡</span>
          </div>
        )}

        {/* Info Box */}
        {!blurred && (
          <div className="absolute bottom-10 left-4 text-white text-left drop-shadow">
            <h2 className="text-xl font-bold">{profile.name}</h2>
            <p className="text-base">{profile.title}</p>
            <p className="text-sm">{profile.year}</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
