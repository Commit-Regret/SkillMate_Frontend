
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./navbar.jsx";
import { useNavigate } from "react-router-dom";
// import "./LandingPage.css"; // Specific CSS for this page
function LandingPage() {
  return (
     <div
      className="min-h-screen min-w-screen bg-gradient-to-r from-[#90A8C3] via-[#ADA7C9] via-[#D7B9D5] to-[#F4CAE0] p-6 font-sans"
    >
      <Navbar/>

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
        <Link to="/form">
        <button
           type= "button" className="mt-6 bg-black text-white font-bold px-6 py-2 rounded-full shadow-lg"
          
        >
          GET STARTED
        </button></Link>
      </div>
    </div>
  );
}



export default LandingPage;