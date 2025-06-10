// Flowchart.jsx
import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { Link } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { BsPersonFill } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import Navbar from "./navbar.jsx";

// Initialize Mermaid config
mermaid.initialize({ startOnLoad: false });

const FlowchartPage = () => {
  const chartContainerRef = useRef(null);
  const [mermaidCode, setMermaidCode] = useState(`
    graph TD
      Start --> Learn[Learn the Basics]
      Learn --> Practice[Practice with Projects]
      Practice --> Mastery[Advance to Mastery]
      Mastery --> Job[Apply for Jobs]
  `);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! How can I help you?" },
  ]);
  const [userInput, setUserInput] = useState("");

  // Generate flowchart
  const generateFlowchart = (topic) => {
    const flow = `
      graph TD
        A[Start Learning ${topic}] --> B[Understand Basics]
        B --> C[Build Projects]
        C --> D[Practice Daily]
        D --> E[Job Ready]
    `;
    setMermaidCode(flow);
  };

  // Proper rendering method using mermaidAPI.render
  useEffect(() => {
    const renderMermaid = async () => {
      if (!chartContainerRef.current) return;

      try {
        const { svg } = await mermaid.render("graphDiv", mermaidCode);
        chartContainerRef.current.innerHTML = svg;
      } catch (err) {
        chartContainerRef.current.innerHTML =
          "<p style='color:red;'>Error rendering flowchart</p>";
        console.error("Mermaid error:", err);
      }
    };

    renderMermaid();
  }, [mermaidCode]);

  const handleSend = () => {
    if (!userInput.trim()) return;

    const updated = [
      ...messages,
      { from: "user", text: userInput },
      { from: "bot", text: "oh balle balle" },
    ];
    setMessages(updated);
    generateFlowchart(userInput);
    setUserInput("");
  };

  return (
    <div className="min-h-screen min-w-screen font-sans relative bg-white">
      {/* Navbar */}
      <Navbar />
      {/* Flowchart Heading */}
      <div className="px-10 pt-4">
        <h2 className="text-3xl font-bold mb-6">Flowchart</h2>

        {/* Mermaid Chart */}
        <div
          ref={chartContainerRef}
          className="bg-white border rounded shadow p-6 min-h-[400px]"
        />
      </div>

      {/* Chatbox - large size */}
      <div className="fixed bottom-4 right-4 w-[28rem] bg-pink-100 rounded-xl shadow-xl p-4">
        <h3 className="font-bold mb-2">Chat with SPACiOUS AI</h3>
        <div className="max-h-80 overflow-y-auto mb-3 space-y-2 pr-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-md ${
                msg.from === "user"
                  ? "bg-pink-300 text-black text-right"
                  : "bg-white text-black text-left"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            className="flex-1 p-3 rounded-l bg-white border border-r-0 text-black"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
          />
          <button
            onClick={handleSend}
            className="bg-black text-white px-5 py-3 rounded-r"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlowchartPage;
