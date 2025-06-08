import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";
import photo from "./photo.jpg";

const profiles = [
  { name: "Bhagirath Khusrau", role: "Web Developer", year: "1st year", image: photo },
  { name: "Aditi Sharma", role: "UI/UX Designer", year: "2nd year", image: photo },
  { name: "Ravi Iyer", role: "Backend Engineer", year: "3rd year", image: photo },
];

export default function MainSwipe() {
  const [index, setIndex] = useState(0);
  const profile = profiles[index % profiles.length];
  const navigate = useNavigate();

  const swipe = (dir) => {
    setIndex((prev) => {
      if (dir === "left") return (prev - 1 + profiles.length) % profiles.length;
      return (prev + 1) % profiles.length;
    });
  };

  return (
    <div className="app">
      <header className="navbar">
        <h1>SKILL MATE</h1>
        <nav>
          <a href="#">HOME</a>
          <a href="#">PROFILE</a>
          <button>LOG IN</button>
        </nav>
      </header>

      <div className="card-container">
        <div className="side-card left-blur">
          <img src={profiles[(index + 1 + profiles.length) % profiles.length].image} alt="" />
        </div>

        <button className="swipe-btn left" onClick={() => swipe("right")}>&larr;</button>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="main-card"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onDragEnd={(e, info) => {
              if (info.offset.x > 100) swipe("right");
              else if (info.offset.x < -100) swipe("left");
            }}
          >
            <img src={profile.image} alt={profile.name} className="profile-image" />
            <div className="info-overlay">
              <h2>{profile.name}</h2>
              <p>{profile.role}</p>
              <p>{profile.year}</p>
              <button className="view-arrow" onClick={() => navigate(`/profile/${profile.id}`)}>→</button>

            </div>
          </motion.div>
        </AnimatePresence>

        <button className="swipe-btn right" onClick={() => swipe("right")}>&rarr;</button>

        <div className="side-card right-blur">
          <img src={profiles[(index + 1) % profiles.length].image} alt="" />
        </div>
      </div>
    </div>
  );
}
