import React from "react";
import { Link } from "react-router-dom";
// import "./LandingPage.css"; // Specific CSS for this page
function LandingPage() {
  return (
    <div className="hero-section">
      <header className="navbar">
        <div className="logo">SKILL MATE</div>
        <nav className="nav-links">
          <Link to="/home">HOME</Link>

          <a href="#">PROFILE</a>
          <button className="login-button">LOG IN</button>
        </nav>
      </header>

      <div className="content">
        <h1 className="main-heading">FIND YOUR MATCH</h1>
        <button className="cta-button">GET STARTED</button>
      </div>

      <div className="arc"></div>
    </div>
  );
}

export default LandingPage;
