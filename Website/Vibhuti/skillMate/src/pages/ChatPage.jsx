import React from "react";

const chats = [
  { name: "Aarav Sharma", message: "Sent 5m ago", img: "🧑" },
  { name: "My Study Group 📚", message: "You renamed the group... 10m ago", img: "👨‍🏫" },
  { name: "Ishita Patel", message: "Sent 12m ago", img: "👩" },
  { name: "Saanvi Mehra", message: "Typing...", img: "👧" },
  { name: "Late Night Squad 🌙", message: "Seen by 3 members", img: "🌙" },
  { name: "Raj Verma", message: "Sent 15m ago", img: "👨" },
  { name: "Group Project 👨‍💻", message: "You added Saanvi", img: "👨‍💻" },
];

export default function ChatSidebar() {
  return (
    <div className="w-full min-h-screen h-screen flex items-center justify-center bg-gradient-to-r from-[#90A8C3] via-[#ADA7C9] to-[#F4CAE0] px-2 py-6 sm:px-8 sm:py-12">
      <div className="w-full h-full sm:max-w-[600px] sm:h-auto shadow-2xl rounded-none sm:rounded-2xl overflow-hidden bg-white">
        {/* Top Bar */}
        <div className="bg-[#D7B9D5] p-6 text-center text-xl font-semibold text-[#2b2b2b]">
          <span>Rahul Bhargav▾</span>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-[#ADA7C9]">
          <input 
            type="text"
            className="w-full rounded-full bg-[#F4CAE0] placeholder:text-[#ADA7C9] text-black px-4 py-2 text-base outline-none"
            placeholder="Search"
          />
        </div>

        {/* Chat List */}
        <div className="max-h-full sm:max-h-[600px] overflow-y-auto divide-y divide-[#ADA7C9]">
          {chats.map((chat, i) => (
            <div key={i} className="flex items-center px-6 py-4 hover:bg-[#F4CAE0] transition-all">
              <div className="mr-5 w-12 h-12 flex items-center justify-center rounded-full bg-[#90A8C3] text-white text-xl">
                {chat.img}
              </div>
              <div>
                <p className="font-semibold text-lg text-[#90A8C3]">{chat.name}</p>
                <p className="text-sm text-[#ADA7C9]">{chat.message}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
