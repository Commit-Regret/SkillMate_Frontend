import React, { useState } from "react";
import { GiArtificialHive } from "react-icons/gi";
import { IoIosArrowDown } from "react-icons/io";

export default function SpaciousChatBox({ isOpen, toggleOpen }) {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you?", from: "bot" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;

    setMessages((prev) => [...prev, { text: input, from: "user" }]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "Thanks for your message!", from: "bot" },
      ]);
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <>
      {/* ✅ Floating Button */}
      {!isOpen && (
        <button
          onClick={toggleOpen}
          className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm z-50"
        >
          <GiArtificialHive size={20} /> Ask Spacious AI
          <IoIosArrowDown size={14} />
        </button>
      )}

      {/* ✅ Chat Box */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 bg-pink-100/90 backdrop-blur-lg rounded-2xl shadow-2xl w-[420px] h-[500px] flex flex-col z-50 border border-white text-black/30">
          {/* Header */}
          <div className="p-4 border-b border-white/30 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">Chat with SPACIOUS AI</h2>
            <button
              onClick={toggleOpen}
              className="text-black-800 text-white text-xl bg-white px-3 py-1 rounded"
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
    </>
  );
}
