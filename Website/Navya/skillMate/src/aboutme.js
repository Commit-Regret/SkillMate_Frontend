import React from "react";
import { useParams } from "react-router-dom";
import photo from "./photo.jpg";
import "./ProfileDetail.css";

const profiles = [
  {
    name: "Bhagirath Khusrau",
    about: "i am a very hardworking and nice boy. blah blah blah and blah",
    experience: "Hum pe toh hai hi no",
    tech: ["Python", "Python", "Python", "Python", "Python", "Python", "Python"],
    image: photo,
  },
    {
    name: "Aditi Sharma",
    about: "Creative and detail-oriented UI/UX Designer",
    experience: "Interned at DesignStudio Inc. for 6 months",
    tech: ["Figma", "Adobe XD", "CSS", "JavaScript"],
    image: photo,
  },
  {
    name: "Ravi Iyer",
    about: "Specialized in scalable backend APIs and databases",
    experience: "Backend Engineer at TechNova for 1 year",
    tech: ["Node.js", "Express", "MongoDB", "Docker"],
    image: photo,
  }

];

export default function ProfileDetail() {
  const { id } = useParams();
  const profile = profiles[parseInt(id)];

  return (
    <div className="detail-page">
      <header className="navbar">
        <h1>SKILL MATE</h1>
        <nav>
          <a href="/">HOME</a>
          <a href="#">PROFILE</a>
          <button>LOG IN</button>
        </nav>
      </header>

      <div className="profile-header">
        <img src={profile.image} alt={profile.name} className="profile-pic" />
        <h2>{profile.name}</h2>
      </div>

      <div className="profile-body">
        <section className="about-section">
          <h3>About Me</h3>
          <p>{profile.about}</p>
        </section>

        <section className="experience-section">
          <h3>Previous experience</h3>
          <p>{profile.experience}</p>
        </section>

        <section className="tech-stack">
          <h3>Tech Stack</h3>
          <div className="tech-tags">
            {profile.tech.map((skill, idx) => (
              <span className="tag" key={idx}>{skill}</span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
