import React, { useState } from "react";
import Navbar from "./navbar.jsx";
import user1 from "./yo.jpg";

import user2 from "./yo.jpg"; // Replace with actual image

export default function ChatPortal() {
  const [messages, setMessages] = useState([
    { from: "user", text: "kaisi ho gurll", avatar: user1 },
    { from: "other", text: "Badhiya aap btao", avatar: user2 },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { from: "user", text: newMessage, avatar: user1 }]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const addToTeam = () => {
    alert("Added to team!");
  };

  return (
    <div className="min-h-screen min-w-screen flex flex-col bg-pink-100">
      <Navbar />
      <div className="flex justify-end pr-6 mt-4">
        <button
          onClick={addToTeam}
          className="text-white font-semibold text-lg hover:underline"
        >
          +Add to team
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-end mb-4 ${
              msg.from === "user" ? "justify-start" : "justify-end"
            }`}
          >
            {msg.from === "user" && (
              <img src={msg.avatar} alt="avatar" className="w-10 h-10 rounded-full mr-2" />
            )}
            <div className="bg-gray-400 text-black font-semibold px-4 py-2 rounded-2xl max-w-xs">
              {msg.text}
            </div>
            {msg.from === "other" && (
              <img src={msg.avatar} alt="avatar" className="w-10 h-10 rounded-full ml-2" />
            )}
          </div>
        ))}
      </div>

      <div className="sticky bottom-0 px-6 py-4 bg-white border-t border-gray-300 flex items-center text-black">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-full mr-4 focus:outline-none"
        />
        <button
          onClick={sendMessage}
          className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 "
        >
          Send
        </button>
      </div>
    </div>
  );
}

