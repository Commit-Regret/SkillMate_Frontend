import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import photo from "./photo.jpg";
import "./aboutme.css";
import Navbar from "./navbar"; // ✅ Import the reusable navbar
import messageIcon from "./Message-circle.png";
import closeIcon from "./X-circle.png";

const profiles = [
  {
    name: "Rahul Bhargav",
    about: "i am a very hardworking and nice boy. blah blah blah and blah",
    experience: "Hum pe toh hai hi no",
    tech: Array(10).fill("Python"),
    image: photo,
  },
  {
    name: "Rahul Bhargav",
    about: "i am a very hardworking and nice boy. blah blah blah and blah",
    experience: "Hum pe toh hai hi no",
    tech: Array(10).fill("Python"),
    image: photo,
  },
  {
    name: "Rahul Bhargav",
    about: "i am a very hardworking and nice boy. blah blah blah and blah",
    experience: "Hum pe toh hai hi no",
    tech: Array(10).fill("Python"),
    image: photo,
  },
];

export default function ProfileDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const index = Number.isNaN(Number(id)) ? 0 : parseInt(id, 10);
  const profile = profiles[index];

  if (!profile) return <div style={{ padding: 40 }}>Profile not found.</div>;

  return (
    <div className="detail-root">
      {/* ✅ Navbar Component */}
      <Navbar />

      {/* Top right icons */}
      <div className="topbar-icons">
        <img
          src={messageIcon}
          alt="message"
          className="icon-btn"
          onClick={() => alert("Chatbox coming soon!")}
        />
        <img
          src={closeIcon}
          alt="close"
          className="icon-btn"
          onClick={() => navigate("/")}
        />
      </div>

      {/* Main content */}
      <main className="profile-container">
        <section className="profile-main">
          <img
            src={profile.image}
            alt={profile.name}
            className="profile-photo"
          />
          <span className="profile-name">{profile.name}</span>
        </section>

        <section className="profile-details">
          <div className="about-exp-row">
            <div className="about-section">
              <h2 className="about-heading">About Me</h2>
              <div className="about-card">{profile.about}</div>

              <h2 className="tech-heading">Tech Stack</h2>
              <div className="tech-tags">
                {profile.tech.map((t, i) => (
                  <span className="tech-tag" key={i}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="exp-section">
              <h3 className="exp-heading">Previous experience</h3>
              <div className="exp-card">{profile.experience}</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
