// App.js
import React from 'react';
import { LogOut, User } from 'lucide-react';
import './Home.css';
//try 

export default function Home() {
  return (
    <div className="container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">SKILL MATE</div>
        <div className="nav-buttons">
          <button className="team-button">YOUR TEAM</button>
          <div className="icon-button">
            <User className="icon" />
          </div>
          <div className="icon-button">
            <LogOut className="icon" />
          </div>
        </div>
      </nav>

      {/* Section 1 */}
      <section className="section section-mentor">
        <h2>FIND YOUR MENTOR</h2>
        <p>Swipe to connect with skilled individuals of your preference</p>
        <button className="section-button">START SWIPING</button>
      </section>

      {/* Section 2 */}
      <section className="section section-team">
        <h2>FIND YOUR PERFECT TEAM</h2>
        <p>Choose your required tech stack</p>
        <input type="text" className="tech-input" placeholder="Enter tech stack" />
        <br />
        <button className="section-button">START SWIPING</button>
      </section>

      {/* Section 3 */}
      <section className="section section-learn">
        <h2>WANT TO LEARN SOMETHING NEW?</h2>
        <p>Get a personalized roadmap</p>
        <button className="section-button dark-button">+ Generate Roadmap</button>
      </section>

      {/* Section 4 */}
      <section className="section section-inspiration">
        <h2>NEED SOME INSPIRATION?</h2>
        <p>Here are some ideas for your next hackathon project</p>
        <button className="section-button dark-button">◎ Suggest Projects</button>
      </section>

      {/* Floating Button */}
      <div className="floating-button">
        <button className="ask-ai">★ Ask Spacious AI</button>
      </div>
    </div>
  );
}