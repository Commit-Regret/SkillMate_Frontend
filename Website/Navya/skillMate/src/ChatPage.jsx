import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";

export default function ChatSidebar() {
  const [searchTerm, setSearchTerm] = useState("");

  const [chats, setChats] = useState([]);

  useEffect(() => {
    const getChats = async () => {
      console.log(localStorage.getItem("user_id"));
      try {
        const response = await fetch("http://127.0.1.0:5000/chat/overview", {
          method: "POST",
          headers: {
            "X-Session-ID": localStorage.getItem("session_id"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: localStorage.getItem("user_id"),
          }),
        });
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          setChats(data);
        } else {
          alert("Something went wrong while fetching profile.");
        }
      } catch (err) {
        console.error(err);
        alert("Error connecting to the server.");
      }
    };
    getChats();
  }, []);

  // useEffect(() => {
  //   const getChats = async () => {
  //     const res = await fetch("http://127.0.1.0:5000/chat/overview", {
  //       method: "POST",
  //       body: {
  //         user_id: localStorage.getItem("user_id"),
  //       },
  //     });
  //     const data = await res.json();
  //     if (res.ok) {
  //       // setChats(da)
  //       console.log(data);
  //     }
  //   };
  //   getChats();
  // });
  const navigate = useNavigate();

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChatClick = (chat) => {
    navigate(`/chat/${encodeURIComponent(chat.name)}`);
  };

  return (
    <div className="font-sans">
      <Navbar />

      <div className=" min-w-screen min-h-screen h-screen flex items-center justify-center bg-gradient-to-r from-[#90A8C3] via-[#ADA7C9] to-[#F4CAE0] px-2 py-6 sm:px-8 sm:py-12">
        <div className=" w-full h-auto sm:max-w-[600px] sm:h-auto shadow-2xl rounded-none sm:rounded-2xl overflow-hidden bg-white">
          {/* Top Bar */}
          <div className="h-full bg-[#D7B9D5] p-6 text-center text-xl font-semibold text-[#2b2b2b]">
            <span>Rahul Bhargav</span>
          </div>

          {/* Search Bar */}
          <div className="p-4 border-b border-[#ADA7C9]">
            <input
              type="text"
              className="w-full rounded-full bg-[#F4CAE0] placeholder:text-[#ADA7C9] text-black px-4 py-2 text-base outline-none"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Chat List */}
          <div className="max-h-full sm:max-h-[600px] overflow-y-auto divide-y divide-[#ADA7C9]">
            {filteredChats.map((chat, i) => (
              <div
                key={i}
                className="flex items-center px-6 py-4 hover:bg-[#F4CAE0] transition-all cursor-pointer"
                onClick={() => handleChatClick(chat)}
              >
                <div className="mr-5 w-12 h-12 flex items-center justify-center rounded-full bg-[#90A8C3] text-white text-xl">
                  {chat.img}
                </div>
                <div>
                  <p className="font-semibold text-lg text-[#90A8C3]">
                    {chat.name}
                  </p>
                  <p className="text-sm text-[#ADA7C9]">{chat.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
