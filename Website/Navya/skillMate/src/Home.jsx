import React, { useState } from "react";
import { FaUsers, FaMagic, FaLightbulb } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { HiOutlineLogout } from "react-icons/hi";
import { BsPersonFill } from "react-icons/bs";
import { GiArtificialHive } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import SpaciousChatBox from "./chatbox.jsx"; 

import Navbar from "./navbar.jsx";
const techTags = ["React", "Node.js", "Python", "C++", "Java", "Flutter", "MongoDB", "Firebase"];

const sections = [
  {
    id: "mentor",
    bgColor: "#958DB9",
    title: "FIND YOUR MENTOR",
    subtitle: "Swipe to connect with skilled individuals of your preference",
    button: "START SWIPING",
    route: "/swipe"
  },
  {
    id: "team",
    bgColor: "#A198C7",
    title: "FIND YOUR PERFECT TEAM",
    subtitle: "Choose your required tech stack",
    button: "START SWIPING",
    route: "/swipe",
    isTeamSection: true
  },
  {
    id: "roadmap",
    bgColor: "#B3A9E1",
    title: "WANT TO LEARN SOMETHING NEW?",
    subtitle: "Get a personalized roadmap",
    button: "Generate Roadmap",
    route: "/flowchart",
    buttonIcon: <FaMagic />
  },
  {
    id: "inspiration",
    bgColor: "#CFBAF0",
    title: "NEED SOME INSPIRATION?",
    subtitle: "Here are some ideas for your next hackathon project",
    button: "Suggest Projects",
    route: "/AIchat",
    buttonIcon: <FaLightbulb />
  },
];



  const SkillMateLanding = () => {
  const navigate = useNavigate();
 const [selectedTags, setSelectedTags] = useState(
  Array(techTags.length).fill(false)
);

  const [isChatOpen, setIsChatOpen] = useState(false); // for Spacious AI Chat

  const toggleTag = (index) => {
  setSelectedTags((prev) => {
    const newSelected = [...prev];
    newSelected[index] = !newSelected[index];
    return newSelected;
  });
};


  const toggleChat = () => setIsChatOpen(!isChatOpen);
  

  return (
    <div className="font-sans">
      <Navbar />

      {/* Sections */}
      {sections.map((section) => (
        <div
          key={section.id}
          className="min-w-screen flex flex-col items-center justify-center min-h-screen text-center text-black py-8"
          style={{ backgroundColor: section.bgColor }}
        >
          <h2 className="text-4xl font-bold mb-4">{section.title}</h2>
          <p className="text-m mb-6 text-black">{section.subtitle}</p>

          {section.isTeamSection && (
            <div className="flex flex-wrap justify-center gap-3 mb-6">
                
              {techTags.map((tag, index) => (
  <span
    key={index}
    onClick={() => toggleTag(index)}
    className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors duration-200 select-none ${
      selectedTags[index]
        ? "bg-gray-800 text-white border-black"
        : "bg-gray-200 text-black border-gray-400"
    }`}
  >
    {tag}
  </span>
))}


            </div>
          )}

          <button
  onClick={() =>
    section.id === "inspiration"
      ? toggleChat()
      : navigate(section.route)
  }
  className="px-6 py-3 rounded-full text-lg text-white font-semibold flex items-center gap-2 shadow-md hover:opacity-90 transition duration-200"
>
  {section.buttonIcon && section.buttonIcon} {section.button}
</button>

        </div>
      ))}

      {!isChatOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm z-50"
        >
          \
        </button>
      )}

      {/* ✅ SpaciousChatBox Component */}
      <SpaciousChatBox isOpen={isChatOpen} toggleOpen={toggleChat} />
    </div>
  );
};
export default SkillMateLanding;
