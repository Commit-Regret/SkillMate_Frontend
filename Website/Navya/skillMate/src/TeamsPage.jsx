import React, { useState } from "react";
import { FaHome, FaUser, FaPlus, FaSignOutAlt } from "react-icons/fa";
import Navbar from "./navbar.jsx";
import { useNavigate } from "react-router-dom";



const members = [
  { name: "Member1", role: "WebDev", year: "1st Year", img: "https://via.placeholder.com/100" },
  { name: "Member2", role: "WebDev", year: "1st Year", img: "https://via.placeholder.com/100" },
  { name: "Member3", role: "WebDev", year: "1st Year", img: "https://via.placeholder.com/100" },
  { name: "Member4", role: "WebDev", year: "1st Year", img: "https://via.placeholder.com/100" },
  { name: "Member5", role: "WebDev", year: "1st Year", img: "https://via.placeholder.com/100" },
];



export default function TeamsPage() {
  const navigate = useNavigate();

  const handleClick = (member) => {
    navigate(`/team/${member.name}`, { state: member });
  };

  const [messages, setMessages] = useState([
    { text: "hi", from: "user2" },
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(true); // Default: chat open

  const handleSend = () => {
    if (input.trim() === "") return;

    setMessages((prev) => [...prev, { text: input, from: "user" }]);
    setInput("");

  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  // Add this inside the TeamsPage function, before return:
const [projectIdeas, setProjectIdeas] = useState([""]);

const handleAddIdea = () => {
  setProjectIdeas([...projectIdeas, ""]);
};

const handleIdeaChange = (index, value) => {
  const updatedIdeas = [...projectIdeas];
  updatedIdeas[index] = value;
  setProjectIdeas(updatedIdeas);
};


  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-r from-[#90A8C3] via-[#ADA7C9] via-[#D7B9D5] to-[#F4CAE0] p-6 font-sans">
      <Navbar />

      {/* Title */}
      <h2 className="text-4xl font-bold text-center">Commit&amp;Regret</h2>

      {/* Members */}
      <div className="flex justify-center gap-6 mb-8 flex-wrap">
  {members.map((member, idx) => (
    <div
      key={idx}
      onClick={() => handleClick(member)}
      className="flex flex-col items-center cursor-pointer hover:scale-105 transition"
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-black">
        
        {/* Project Ideas */}
<div className="bg-gray-200 p-4 rounded-md shadow-md ">
  <h4 className="text-lg font-semibold mb-4 text-center">Project Ideas</h4>

  {projectIdeas.map((idea, index) => (
    <input
      key={index}
      value={idea}
      onChange={(e) => handleIdeaChange(index, e.target.value)}
      className="w-full p-2 mb-4 rounded bg-white shadow text-black"
      placeholder={`Project Idea ${index + 1}`}
    />
  ))}

  <button
    onClick={handleAddIdea}
    className="bg-gray-700 text-white px-6 py-2 rounded mx-auto block"
  >
    Add Idea
  </button>
</div>


        {/* Chat Box */}
        {isOpen && (
          <div className="bg-pink-100/90 backdrop-blur-lg rounded-2xl shadow-2xl w-full md: h-[500px] flex flex-col z-50 border border-white text-black/30">
            {/* Header */}
            <div className="p-4 border-b border-white/30 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">Team Chat</h2>
              <button
                onClick={toggleOpen}
                className="text-white bg-white px-3 py-1 rounded"
                title="Close Chat"
              >
                X
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`rounded-lg px-4 py-2 max-w-[75%] ${
                    msg.from === "user"
                      ? "bg-pink-300 ml-auto text-black"
                      : "bg-white text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/30 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300 text-black"
                placeholder="Type a message"
              />
              <button
                onClick={handleSend}
                className="px-4 py-3 rounded-lg bg-pink-500 text-white hover:bg-pink-600 transition"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
