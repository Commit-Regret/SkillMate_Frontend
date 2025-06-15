import React from "react";

export default function Loader() {
  return (
    <div className="flex items-center space-x-1 px-2 py-1">
      <span
        className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"
        style={{ animationDelay: "0s" }}
      ></span>
      <span
        className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"
        style={{ animationDelay: "0.2s" }}
      ></span>
      <span
        className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"
        style={{ animationDelay: "0.4s" }}
      ></span>
    </div>
  );
}
