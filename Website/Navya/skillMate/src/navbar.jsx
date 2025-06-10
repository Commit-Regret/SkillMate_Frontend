import React, { useState } from "react";
import { FaUser, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="sticky top-0 bg-gradient-to-r from-[#b6c0dc] via-[#dcb6cc] to-[#f7d9e0] p-4 flex items-center justify-between shadow-md">
      {/* Brand Name */}
      <div className="text-black font-bold text-xl">SKILL MATE</div>

      {/* Desktop Icons */}
      <div className="hidden sm:flex items-center gap-4">
        <button className="bg-black text-white px-4 py-1 rounded-full text-sm" onClick={() => navigate("/team")}>
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
            <li><link to >
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded">
                YOUR TEAM
              </button></link>
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
  );
}
