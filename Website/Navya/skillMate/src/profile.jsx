import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./navbar";
import { socket } from "./socket.js";

export default function MainSwipe() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 550);
  const [matchData, setMatchData] = useState(null);
  const [showMatchPopup, setShowMatchPopup] = useState(false);
  const [profiles, setProfiles] = useState([]);

  const [matchedProfile, setMatchedProfile] = useState();

  useEffect(() => {
    socket.connect();

    const onRecommendations = ({ users }) => {
      setProfiles(users);
      setCurrent(0);
    };
    const onMatch = (profile) => {
      // console.log(profile.profile.name);
      console.log(profile);
      // setMatchedProfile(profile);
      setTimeout(() => navigate(`/chat/${profile.with.name}`), 2000);
    };
    const onError = (data) => {
      console.error("Socket error:", data?.error);
      navigate("/home");
    };

    socket.emit("find_skillmate", {
      session_id: localStorage.getItem("session_id"),
    });

    socket.on("recommendations", onRecommendations);
    socket.on("error", onError);
    socket.on("match", onMatch);

    return () => {
      socket.off("recommendations", onRecommendations);
      socket.off("error", onError);
      socket.disconnect();
    };
  }, [navigate]);

  const handleSwipe = (direction) => {
    const currentProfile = profiles[current];
    console.log(currentProfile);
    if (!currentProfile) return;

    const liked = direction === "right";

    socket.emit("swipe", {
      session_id: localStorage.getItem("session_id"),
      target_user_id: currentProfile.user_id,
      liked,
    });

    setCurrent((prev) => prev + 1);
  };

  const nextCard = () => {
    if (current < profiles.length - 1) {
      setCurrent((prev) => prev + 1);
    }
  };

  const prevCard = () => {
    if (current > 0) {
      setCurrent((prev) => prev - 1);
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
  }, [isMobile, current, profiles]);

  const currentProfile = profiles[current];

  const Card = ({ profile, blurred }) => {
    const { user_id, profile: profileData } = profile;

    const { name, year, techstack, photo_url } = profileData || {};

    const handleDragEnd = (event, info) => {
      if (info.offset.x < -100) handleSwipe("left");
      else if (info.offset.x > 100) handleSwipe("right");
    };

    return (
      <motion.div
        className={`w-full h-full bg-white rounded-2xl shadow-xl relative flex flex-col overflow-hidden ${
          blurred ? "pointer-events-none opacity-60" : ""
        }`}
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
          src={photo_url}
          alt={name}
          className="w-full h-full object-cover rounded-2xl pointer-events-none"
        />
        {!blurred && (
          <>
            <div
              className="absolute bottom-4 right-4 bg-black bg-opacity-70 rounded-full p-2 cursor-pointer hover:bg-opacity-100 transition"
              onClick={() => navigate(`/profile/${user_id}`)}
            >
              <span className="text-lg text-white">➡</span>
            </div>
            <div className="absolute bottom-10 left-4 text-white text-left drop-shadow">
              <h2 className="text-xl font-bold">{name}</h2>
              <p className="text-base">{year}</p>
              <p className="text-sm">{techstack?.join(" • ")}</p>
            </div>
          </>
        )}
      </motion.div>
    );
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-gradient-to-br from-pink-200 via-purple-200 to-yellow-100">
      <Navbar />
      <div className="flex justify-center items-center h-[calc(100vh-64px)] relative">
        {!isMobile && current > 0 && (
          <div className="absolute left-[15%] w-[300px] h-[480px] blur-sm scale-90 z-0">
            <Card profile={profiles[current - 1]} blurred />
          </div>
        )}

        {!isMobile && current > 0 && (
          <button
            onClick={prevCard}
            className="absolute left-5 top-1/2 transform -translate-y-1/2 z-10 bg-black text-white p-3 rounded-full shadow-lg"
          >
            ←
          </button>
        )}

        {currentProfile && (
          <div className="relative w-[90%] max-w-[420px] h-[90%] z-10">
            <AnimatePresence mode="wait">
              <Card key={currentProfile.user_id} profile={currentProfile} />
            </AnimatePresence>
          </div>
        )}

        {!isMobile && current < profiles.length - 1 && (
          <button
            onClick={nextCard}
            className="absolute right-5 top-1/2 transform -translate-y-1/2 z-10 bg-black text-white p-3 rounded-full shadow-lg"
          >
            →
          </button>
        )}

        {!isMobile && current < profiles.length - 1 && (
          <div className="absolute right-[15%] w-[300px] h-[480px] blur-sm scale-90 z-0">
            <Card profile={profiles[current + 1]} blurred />
          </div>
        )}
      </div>

      {showMatchPopup && matchData && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 shadow-lg text-center w-[90%] max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-green-600">
              🎉 It's a Match!
            </h2>
            <p className="text-lg mb-4">
              You've matched with{" "}
              <strong>{matchData.profile?.name || "a user"}</strong>
            </p>
            <button
              onClick={() => navigate(`/chat/${matchData.user_id}`)}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800"
            >
              Go to Chat 💬
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
