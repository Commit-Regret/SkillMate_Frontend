import React, { useState } from "react";
import { FaUser, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import photo1 from "./photo1.jpg";
import photo2 from "./photo.jpg";
import { Link } from "react-router-dom";
const MatchScreen = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-[#90A8C3] via-[#ADA7C9] via-[#D7B9D5] to-[#F4CAE0] font-sans">

      {/* Navbar */}
      <nav className="sticky top-0 bg-gradient-to-r from-[#b6c0dc] via-[#dcb6cc] to-[#f7d9e0] p-4 flex items-center justify-between shadow-md w-full z-50">
        {/* Brand Name */}
        <div className="text-black font-bold text-xl">SKILL MATE</div>

        {/* Desktop Icons */}
        <div className="hidden sm:flex items-center gap-4">
          <button className="bg-black text-white px-4 py-1 rounded-full text-sm">
            YOUR TEAM
          </button>
          <button className="bg-black text-white p-2 rounded-full">
            <FaUser size={16} />
          </button>
          <button className="bg-black text-white p-2 rounded-full">
            <FaSignOutAlt size={16} />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="sm:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="absolute top-16 right-4 bg-white border border-gray-300 rounded-lg shadow-md w-40 z-50 sm:hidden">
            <ul className="flex flex-col p-2 text-sm">
              <li>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded">
                  YOUR TEAM
                </button>
              </li>
              <li>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded flex items-center gap-2">
                  <FaUser /> Profile
                </button>
              </li>
              <li>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded flex items-center gap-2">
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow text-center mt-4">
        <h1 className="text-6xl font-extrabold mb-4 text-center text-black">YOU ARE A MATCH!!</h1>

        <div className="relative w-full max-w-3xl h-[22rem] flex justify-center items-center mb-10">
          {/* Left Avatar */}
          <div className="absolute left-1/2 transform -translate-x-[65%] z-10 w-80 h-80 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <img
              src={photo2}
              alt="Avatar 1"
              className="object-cover w-full h-full"
            />
          </div>

          {/* Right Avatar */}
          <div className="absolute left-1/2 transform -translate-x-[15%] z-20 w-80 h-80 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <img
              src={photo1}
              alt="Avatar 2"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <Link to="/messages">
        <button className="bg-black text-white text-xl px-6 py-3 rounded-full font-semibold">
          Chat to discuss further
        </button>
        </Link>
      </div>

      {/* Chat icon top right (optional) */}
      <div className="absolute top-5 right-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="black"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 10h.01M12 10h.01M16 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    </div>
  );
};

export default MatchScreen;
