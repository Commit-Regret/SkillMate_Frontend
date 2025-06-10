import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import Navbar from "./navbar.jsx";
import SpaciousChatBox from "./chatbox.jsx";

export default function FlowchartPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const chartRef = useRef(null);

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  useEffect(() => {
    mermaid.initialize({ startOnLoad: false });
    const chartDefinition = `
      graph TD
        A[User asks roadmap] --> B[AI generates response]
        B --> C[Render flowchart using Mermaid]
        C --> D[Show chart on screen]
    `;
    mermaid.render("generatedChart", chartDefinition, (svgCode) => {
      if (chartRef.current) {
        chartRef.current.innerHTML = svgCode;
      }
    });
  }, []);

  return (
    <div className="min-h-screen min-w-screen flex flex-col bg-white">
      <Navbar />

      <div className="flex-1 p-4 overflow-auto">
        <h1 className="text-2xl font-bold mb-4 text-black">Flowchart</h1>
        <div ref={chartRef} className="bg-white rounded shadow-md p-4 text-black" />
      </div>

      <SpaciousChatBox isOpen={isChatOpen} toggleOpen={toggleChat} />
    </div>
  );
}
