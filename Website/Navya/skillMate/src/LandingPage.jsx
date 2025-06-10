import React, { useState } from "react";
import { FaUser, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import LoginBox from './Login.jsx'; 
import SignInBox from './SignIn.jsx'; 

function LandingPage() {
  const [modalType, setModalType] = useState(null); // null, "login", "signup"

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-r from-[#90A8C3] via-[#ADA7C9] via-[#D7B9D5] to-[#F4CAE0] p-6 font-sans">
      {/* NavBar */}
      <nav className="sticky top-0 bg-gradient-to-r from-[#b6c0dc] via-[#dcb6cc] to-[#f7d9e0] p-4 flex items-center justify-between shadow-md">
        <div className="text-black font-bold text-xl">SKILL MATE</div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setModalType("signup")}
            className="bg-black text-white px-4 py-1 rounded-full text-sm"
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* Login Modal */}
      {modalType === "login" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-40">
          <LoginBox
            onClose={() => setModalType(null)}
            onSignUp={() => setModalType("signup")}
          />
        </div>
      )}

      {/* Sign Up Modal */}
      {modalType === "signup" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-40">
          <SignInBox
            onClose={() => setModalType(null)}
            onAlreadyHaveAccount={() => setModalType("login")}
          />
        </div>
      )}

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
        <button
          type="button"
          className="mt-6 bg-black text-white font-bold px-6 py-2 rounded-full shadow-lg"
          onClick={() => setModalType("login")}
        >
          GET STARTED
        </button>
      </div>
    </div>
  );
}

export default LandingPage;

