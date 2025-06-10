import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./navbar";
import Card from "./card";
import profileData from "./profiles.json";


export default function App() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 550);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 550);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextCard = () => {
    if (current < profileData.length - 1) setCurrent((prev) => prev + 1);
  };

  const prevCard = () => {
    if (current > 0) setCurrent((prev) => prev - 1);
  };

  const handleKeyDown = (e) => {
    if (!isMobile) {
      if (e.key === "ArrowRight") nextCard();
      else if (e.key === "ArrowLeft") prevCard();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [current, isMobile]);

  return (
    <div className="w-screen h-screen overflow-hidden bg-gradient-to-br from-pink-200 via-purple-200 to-yellow-100">
      <Navbar />
      <div className="flex justify-center items-center h-[calc(100vh-64px)] relative">
        {/* Left blurred card */}
        {!isMobile && current > 0 && (
          <div className="absolute left-[15%] w-[300px] h-[480px] blur-sm scale-90 z-0">
            <Card profile={profileData[current - 1]} blurred />
          </div>
        )}

        {/* Navigation Buttons - only for desktop */}
        {!isMobile && current > 0 && (
          <button
            onClick={prevCard}
            className="absolute left-5 top-1/2 transform -translate-y-1/2 z-10 bg-black text-white p-3 rounded-full shadow-lg"
          >
            ←
          </button>
        )}

        {/* Active Card */}
        <div className="relative w-[90%] max-w-[420px] h-[90%] z-10">
          <AnimatePresence mode="wait">
            <Card
              key={profileData[current].id}
              profile={profileData[current]}
              onSwipeLeft={prevCard}
              onSwipeRight={nextCard}
            />
          </AnimatePresence>
        </div>

        {/* Navigation Buttons - only for desktop */}
        {!isMobile && current < profileData.length - 1 && (
          <button
            onClick={nextCard}
            className="absolute right-5 top-1/2 transform -translate-y-1/2 z-10 bg-black text-white p-3 rounded-full shadow-lg"
          >
            →
          </button>
        )}

        {/* Right blurred card */}
        {!isMobile && current < profileData.length - 1 && (
          <div className="absolute right-[15%] w-[300px] h-[480px] blur-sm scale-90 z-0">
            <Card profile={profileData[current + 1]} blurred />
          </div>
        )}
      </div>
    </div>
  );
}
