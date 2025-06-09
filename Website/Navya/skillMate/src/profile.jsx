import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './profile.css';
import photo from "./photo.jpg";
import photo1 from "./photo1.jpg";
import photo2 from "./photo2.jpg";

const profiles = [
  {
    name: 'Bhagirath Khusrau',
    role: 'Web Developer',
    year: '1st year',
    image: photo,
  },
  {
    name: 'Rahul Sharma',
    role: 'AI Engineer',
    year: '2nd year',
    image: photo1,
  },
  {
    name: 'Sneha Verma',
    role: 'Designer',
    year: '3rd year',
    image: photo2,
  },
];

const swipeConfidenceThreshold = 120;

export default function Profile() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const directionRef = useRef(0);

  const handleSwipe = (dir) => {
    if (dir === 'left') {
      setCurrent((prev) => (prev + 1) % profiles.length);
    } else if (dir === 'right') {
      setCurrent((prev) => (prev - 1 + profiles.length) % profiles.length);
    }
  };

  const handleArrow = (dir) => {
    handleSwipe(dir);
    directionRef.current = dir === 'left' ? -1 : 1;
  };

  return (
    <div className="profile-bg">
      {/* Navbar */}
      <header className="navbar">
  <div className="navbar-content">
    <span className="navbar-title">SKILL MATE</span>
    <nav className="navbar-links">
      <a href="/">HOME</a>
      <a href="#">PROFILE</a>
      <button className="login-btn">LOG IN</button>
    </nav>
  </div>
</header>


      {/* Card Stack */}
      <div className="card-stack">
        {/* Left blurred card */}
        <div className="card-blur left-blur">
          <img src={profiles[(current - 1 + profiles.length) % profiles.length].image} alt="" />
        </div>
        {/* Main Card */}
        <AnimatePresence initial={false}>
          <motion.div
            key={current}
            className="profile-card"
            initial={{ x: directionRef.current * 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -directionRef.current * 400, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(e, info) => {
              if (info.offset.x < -swipeConfidenceThreshold) {
                directionRef.current = -1;
                handleSwipe('left');
              } else if (info.offset.x > swipeConfidenceThreshold) {
                directionRef.current = 1;
                handleSwipe('right');
              }
            }}
          >
            <img src={profiles[current].image} alt={profiles[current].name} className="profile-img" />
            <div className="profile-info">
              <span>{profiles[current].name}</span><br />
              <span>{profiles[current].role}</span><br />
              <span>{profiles[current].year}</span>
            </div>
            <div className="profile-actions">
              <button className="action-btn" aria-label="Nope">✖</button>
              <button className="action-btn" aria-label="Star">★</button>
              <button className="action-btn" aria-label="Like">♡</button>
              <button
                className="action-btn"
                aria-label="More"
                onClick={() => navigate(`/profile/${current}`)}
              >↑</button>
            </div>

          </motion.div>
        </AnimatePresence>
        {/* Right blurred card */}
        <div className="card-blur right-blur">
          <img src={profiles[(current + 1) % profiles.length].image} alt="" />
        </div>
        {/* Left Arrow */}
        <button className="arrow-btn left-arrow" onClick={() => handleArrow('right')} aria-label="Previous">
          <span>&larr;</span>
        </button>
        {/* Right Arrow */}
        <button className="arrow-btn right-arrow" onClick={() => handleArrow('left')} aria-label="Next">
          <span>&rarr;</span>
        </button>
      </div>
    </div>
  );
}
