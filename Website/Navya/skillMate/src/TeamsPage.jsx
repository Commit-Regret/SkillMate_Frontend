import React from "react";
import { FaHome, FaUser, FaPlus, FaSignOutAlt } from "react-icons/fa";
import Navbar from "./navbar.jsx";

const members = [
  { name: "Member1", role: "WebDev", year: "1st Year", img: "https://via.placeholder.com/100" },
  { name: "Member2", role: "WebDev", year: "1st Year", img: "https://via.placeholder.com/100" },
  { name: "Member3", role: "WebDev", year: "1st Year", img: "https://via.placeholder.com/100" },
  { name: "Member4", role: "WebDev", year: "1st Year", img: "https://via.placeholder.com/100" },
  { name: "Member5", role: "WebDev", year: "1st Year", img: "https://via.placeholder.com/100" },
];

export default function TeamsPage() {
  return (
    <div
      className="min-h-screen min-w-screen bg-gradient-to-r from-[#90A8C3] via-[#ADA7C9] via-[#D7B9D5] to-[#F4CAE0] p-6 font-sans"
    >
     <Navbar/>

      {/* Title */}
      <h2 className="text-4xl font-bold text-center">Commit&amp;Regret</h2>

      {/* Members */}
      <h3 className="text-2xl font-semibold text-center mt-4 mb-2">Members</h3>
      <div className="flex justify-center gap-6 mb-8">
        {members.map((member, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center"
          >
            <img
              src={member.img}
              alt={member.name}
              className="rounded-full w-20 h-20 object-cover"
            />
            <p className="text-sm font-medium mt-1">{member.name}</p>
            <p className="text-xs">{member.role}</p>
            <p className="text-xs">{member.year}</p>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-2 gap-6">
        {/* Project Ideas */}
        <div className="bg-gray-200 p-4 rounded-md shadow-md">
          <h4 className="text-lg font-semibold mb-4 text-center">Project Ideas</h4>
          <input
            className="w-full p-2 mb-4 rounded bg-white shadow"
            placeholder="Project Idea 1"
          />
          <input
            className="w-full p-2 mb-4 rounded bg-white shadow"
            placeholder="Project Idea 2"
          />
          <button className="bg-gray-700 text-white px-6 py-2 rounded mx-auto block">
            Input
          </button>
        </div>

        {/* Group Chat */}
        <div className="bg-white p-4 rounded-xl border border-black shadow-[0_10px_30px_rgba(0,0,0,0.3)] relative z-10">
          <h4 className="text-lg font-semibold mb-4 text-center">Group Chat</h4>
          <div className="absolute bottom-4 left-4 right-4 flex items-center bg-gray-100 rounded-full px-4 py-2 shadow">
            <FaPlus className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Type a message"
              className="flex-1 outline-none text-black placeholder:text-gray-700 bg-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
}