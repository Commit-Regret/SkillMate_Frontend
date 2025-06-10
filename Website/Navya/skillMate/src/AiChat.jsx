import React, { useState } from "react";
export 

const SkillMateHome = () => {
  const [isChatOpen, setIsChatOpen] = useState(true);

  return (
    <div className="relative min-h-screen min-w-screen bg-gradient-to-b from-[#958DB9] via-[#A198C7] via-[#B3A9E1] to-[#CFBAF0]">
      {/* Navbar */}
      <div
        className={`flex justify-between items-center px-6 py-4 bg-gradient-to-r from-[#90A8C3] via-[#ADA7C9] via-[#D7B9D5] to-[#F4CAE0] backdrop-blur-sm shadow-md z-40`}
      >
        <h1 className="font-bold text-lg text-black">SKILL MATE</h1>
        <div className="flex space-x-4">
          <button className="bg-black text-white px-3 py-1 rounded-full text-sm font-medium">
            Nav Btn 1
          </button>
          <button className="bg-black text-white px-3 py-1 rounded-full text-sm font-medium">
            Nav Btn 2
          </button>
        </div>
      </div>

      {/* Blurred Background Content */}
      <div className={`${isChatOpen ? "blur-sm" : ""} transition-all duration-300`}>
        <div className="max-w-3xl mx-auto text-center py-24 space-y-24">
          <Section title="FIND YOUR MENTOR" />
          <Section title="FIND YOUR PERFECT TEAM" />
          <Section title="WANT TO LEARN SOMETHING?" />
          <Section title="NEED SOME INSPIRATION?" />
        </div>
      </div>

      {/* Floating Chat Box */}
      {isChatOpen && (
        <div className="fixed bottom-6 right-6 bg-pink-100/90 backdrop-blur-lg rounded-2xl shadow-2xl p-6 w-[420px] h-[420px] flex flex-col justify-between z-50 border border-white/30">
          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-800">Chat with SPACIOUS AI</h2>
            <div className="space-y-4">
              <div className="bg-gray-200 h-20 rounded-lg"></div>
              <div className="bg-gray-300 h-10 w-3/4 ml-auto rounded-lg flex items-center justify-end pr-3">
                <div
                  className="h-8 w-8 rounded-full bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: 'url("https://via.placeholder.com/40")' }}
                />
              </div>
            </div>
          </div>
          <input
            className="mt-4 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300"
            placeholder="Type a message"
          />
        </div>
      )}
    </div>
  );
};

const Section = ({ title }) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold text-black">{title}</h2>
    <button className="bg-black text-white px-6 py-2 rounded-full font-semibold">
      START SWIPING
    </button>
  </div>
);

export default SkillMateHome;
