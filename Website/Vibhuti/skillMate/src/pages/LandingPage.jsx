import React from "react";
import { Link } from "react-router-dom";
// import "./LandingPage.css"; // Specific CSS for this page
function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-[#90A8C3] via-[#ADA7C9] to-[#F4CAE0] relative overflow-hidden">

      {/* Navbar (smaller height, white, uppercase black links) */}
      <div className="flex justify-between items-center px-8 py-3 shadow-md z-10 relative">
        <div className="text-lg font-bold">SKILL MATE</div>
        <div className="flex gap-6 items-center">
          <Link to="/home">HOME</Link>
          <a href="#" className="text-sm font-semibold text-black tracking-wide">PROFILE</a>
          <button className="bg-black text-white text-xs px-4 py-1 rounded-full">
            LOG IN
          </button>
        </div>
      </div>

      {/* Arc — matches Figma: 22.54° start, 83.36° sweep, blurred */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <div className="w-[115vmin] h-[115vmin] relative">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `
                conic-gradient(
                  from 22.54deg,
                  transparent 0deg,
                  #E9E9E9 83.36deg,
                  transparent 360deg
                )
              `,
              maskImage: "radial-gradient(circle, white 60%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(circle, white 60%, transparent 100%)",
              filter: "blur(88px)",
              opacity: 1,
              width: "100%",
              height: "100%",
              borderRadius: "9999px",
            }}
          ></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] text-center">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-black drop-shadow-lg">
          FIND YOUR MATCH
        </h1>
        <button className="mt-6 bg-black text-white font-bold px-6 py-2 rounded-full shadow-lg">
          GET STARTED
        </button>
      </div>
    </div>
  );
}



export default LandingPage;
