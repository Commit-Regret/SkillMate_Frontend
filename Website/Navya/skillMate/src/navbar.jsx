import React, { useState } from "react";
import { FaUser, FaSignOutAlt, FaBars, FaTimes, FaHome,FaBell, FaChartLine, FaFacebookMessenger } from "react-icons/fa";
import {Link} from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="sticky top-0 bg-gradient-to-r from-[#b6c0dc] via-[#dcb6cc] to-[#f7d9e0] p-4 flex items-center justify-between shadow-md">
      {/* Brand Name */}
      <div className="text-black font-bold text-xl">SKILL MATE</div>

      {/* Desktop Icons */}
      <div className="hidden sm:flex items-center gap-3">
        <Link to='/team'><button className="bg-black text-white px-2 py-1 rounded-full text-sm" >
          YOUR TEAM
        </button></Link>
        <Link to='/home'><button className="bg-black text-white p-2 rounded-full">
          <FaHome size={12} />
        </button></Link>
        <Link to='/notify'><button className="bg-black text-white p-2 rounded-full relative">
        <FaBell size={12} />
          {/* Optional red dot */}
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </button></Link>
        <Link to='/chat'><button className="bg-black text-white p-2 rounded-full relative">
        <FaFacebookMessenger size={12} />
          
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </button></Link>
       <Link to='/form'><button className="bg-black text-white p-2 rounded-full">
          <FaUser size={12} />
        </button></Link>
        
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
              <Link to='/team'>
              <button className="w-full text-whit text-left-white px-4 py-2 hover:bg-gray-100 rounded">
                Your Team
              </button></Link>
            </li>
            <li>
              <Link to='/home'>
              <button className="w-full text-whit text-left-white px-4 py-2 hover:bg-gray-100 rounded">
                Home
              </button></Link>
            </li>
            <li>
              <Link to='/chat'>
              <button className="w-full text-whit text-left-white px-4 py-2 hover:bg-gray-100 rounded">
                chat
              </button></Link>
            </li>
            <li>
             <Link to='/form'><button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded flex items-center gap-2">
                <FaUser /> Profile
              </button></Link>
            </li>
           
          </ul>
        </div>
      )}
    </nav>
  );
}
