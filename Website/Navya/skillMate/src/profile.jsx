
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Card from "./card";
import { socket } from "./socket.js";
import profileData from "./profiles.json";
import { AnimatePresence } from "framer-motion";

export default function MainSwipe() {

  const navigate = useNavigate();
  const [profiles, setProfiles] = useState(profileData);
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 550);

  
  
  useEffect(() => {
    socket.connect();

    const onSessionError = () => navigate("/");
    const onError = () => navigate("/home");
    const onNext = (profile) => setProfiles((prev) => [...prev, profile]);

    socket.on("connect_error", onError);
    socket.on("invalid_session", onSessionError);
    socket.on("next_profile", onNext);

    return () => {
      socket.off("connect_error", onError);
      socket.off("invalid_session", onSessionError);
      socket.off("next_profile", onNext);
      socket.disconnect();
    };
  }, [navigate]);

const handleSwipe = (direction) => {
  socket.emit("swipe", {  direction });
  setCurrent((prev) => (prev + 1));
};
  
  const nextCard = () => {
    if (current < profiles.length - 1) {
      setCurrent((prev) => prev + 1);
    }
  };

  const prevCard = () => {
    if (current > 0) {
      setCurrent((prev) => prev + 1);
    }
  };



  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 550);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  useEffect(() => {
    const handleKey = (e) => {
      if (isMobile) return;
      if (e.key === "ArrowRight") handleSwipe("right");
      else if (e.key === "ArrowLeft") handleSwipe("left");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isMobile]);

  const currentProfile = profiles[current];
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
