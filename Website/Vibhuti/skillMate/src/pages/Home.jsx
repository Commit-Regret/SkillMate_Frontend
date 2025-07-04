import React from "react";
import { FaUsers, FaMagic, FaLightbulb } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { HiOutlineLogout } from "react-icons/hi";
import { BsPersonFill } from "react-icons/bs";
import { GiArtificialHive } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Add this line at the top

const sections = [
  {
    id: "mentor",
    bgColor: "#958DB9",
    title: "FIND YOUR MENTOR",
    subtitle: "Swipe to connect with skilled individuals of your preference",
    button: "START SWIPING",
  },
  {
    id: "team",
    bgColor: "#A198C7",
    title: "FIND YOUR PERFECT TEAM",
    subtitle: "Choose your required tech stack",
    input: true,
    button: "START SWIPING",
  },
  {
    id: "roadmap",
    bgColor: "#B3A9E1",
    title: "WANT TO LEARN SOMETHING NEW?",
    subtitle: "Get a personalized roadmap",
    button: "Generate Roadmap",
    isBlackButton: true,
    buttonIcon: <FaMagic />,
  },
  {
    id: "inspiration",
    bgColor: "#CFBAF0",
    title: "NEED SOME INSPIRATION?",
    subtitle: "Here are some ideas for your next hackathon project",
    button: "Suggest Projects",
    isBlackButton: true,
    buttonIcon: <FaLightbulb />,
  },
];

const SkillMateLanding = () => {
  const navigate = useNavigate(); // Inside the component

  return (
    <div className="font-sans">
      {/* <h1 className="bg-red-500">Hello</h1> */}
      {/* Navbar */}
      <div
      className=" w-full bg-gradient-to-r from-[#90A8C3] via-[#ADA7C9] via-[#D7B9D5] to-[#F4CAE0] p-6 font-sans"
    >
      {/* Top Nav */}
      <div className="flex justify-between items-center mb-4 px-6 py-3 rounded shadow-lg">
        <h1 className="font-bold text-lg">SKILL MATE</h1>
        <div className="flex gap-4 items-center">
           <Link to="/teams">
          <button className="bg-black text-white px-4 py-2 rounded-full text-sm flex items-center gap-2" >
            <FaUsers /> YOUR TEAM
             </button>
            </Link>
            {/* <Link to="/teams">YOUR TEAM</Link> */}
         
          <div className="bg-black rounded-full p-2">
            <BsPersonFill className="text-white" size={24} />
          </div>
          <div className="bg-black rounded-full p-2">
            <HiOutlineLogout
              className="text-white font-bold"
              size={24}
              title="Logout"
            />
          </div>
        </div>
      </div>
</div>
      {/* Sections */}
      {sections.map((section) => (
        <div
          key={section.id}
          className="w-full flex flex-col items-center justify-center h-screen text-center text-black  py-8"
          style={{ backgroundColor: section.bgColor }}
        >
          <h2 className="text-4xl font-bold mb-4">{section.title}</h2>
          <p className="text-lg mb-6">{section.subtitle}</p>

          {section.input && (
            <input
              type="text"
              placeholder="Enter tech stack"
              className="mb-4 px-4 py-2 rounded-md border border-gray-300 w-full max-w-md"
            />
          )}

          <button
           onClick={() => {
    if (section.id === "roadmap") {
      navigate("/flowchart");
    }
  }}
  
            className={`${
              section.isBlackButton
                ? "bg-black text-white"
                : "bg-white text-black"
            } px-6 py-3 rounded-full text-lg font-semibold flex items-center gap-2 shadow-md hover:opacity-90 transition duration-200`}
          >
            {section.buttonIcon && section.buttonIcon} {section.button}
          </button>
        </div>
      ))}

      {/* Floating AI Assistant Button */}
      { 
      <Link to="/chat">
        <button className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm">
        <GiArtificialHive size={20} /> Ask Spacious AI
        <IoIosArrowDown size={14} />
      </button>
      </Link> }
    </div>
  );
};

export default SkillMateLanding;
