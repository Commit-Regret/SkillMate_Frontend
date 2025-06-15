// // import React, { useState } from "react";
// // import Navbar from "./navbar.jsx";
// // import user1 from "./yo.jpg";

// // import user2 from "./yo.jpg"; // Replace with actual image

// // export default function ChatPortal() {
// //   const [messages, setMessages] = useState([
// //     { from: "user", text: "kaisi ho gurll", avatar: user1 },
// //     { from: "other", text: "Badhiya aap btao", avatar: user2 },
// //   ]);
// //   const [newMessage, setNewMessage] = useState("");

// //   const sendMessage = () => {
// //     if (newMessage.trim()) {
// //       setMessages([...messages, { from: "user", text: newMessage, avatar: user1 }]);
// //       setNewMessage("");
// //     }
// //   };

// //   const handleKeyPress = (e) => {
// //     if (e.key === "Enter") sendMessage();
// //   };

// //   const addToTeam = () => {
// //     alert("Added to team!");
// //   };

// //   return (
// //     <div className="min-h-screen min-w-screen flex flex-col bg-pink-100">
// //       <Navbar />
// //       <div className="flex justify-end pr-6 mt-4">
// //         <button
// //           onClick={addToTeam}
// //           className="text-white font-semibold text-lg hover:underline"
// //         >
// //           +Add to team
// //         </button>
// //       </div>

// //       <div className="flex-1 overflow-y-auto px-6 py-4">
// //         {messages.map((msg, index) => (
// //           <div
// //             key={index}
// //             className={`flex items-end mb-4 ${
// //               msg.from === "user" ? "justify-start" : "justify-end"
// //             }`}
// //           >
// //             {msg.from === "user" && (
// //               <img src={msg.avatar} alt="avatar" className="w-10 h-10 rounded-full mr-2" />
// //             )}
// //             <div className="bg-gray-400 text-black font-semibold px-4 py-2 rounded-2xl max-w-xs">
// //               {msg.text}
// //             </div>
// //             {msg.from === "other" && (
// //               <img src={msg.avatar} alt="avatar" className="w-10 h-10 rounded-full ml-2" />
// //             )}
// //           </div>
// //         ))}
// //       </div>

// //       <div className="sticky bottom-0 px-6 py-4 bg-white border-t border-gray-300 flex items-center text-black">
// //         <input
// //           type="text"
// //           value={newMessage}
// //           onChange={(e) => setNewMessage(e.target.value)}
// //           onKeyPress={handleKeyPress}
// //           placeholder="Type a message..."
// //           className="flex-1 px-4 py-2 border border-gray-300 rounded-full mr-4 focus:outline-none"
// //         />
// //         <button
// //           onClick={sendMessage}
// //           className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 "
// //         >
// //           Send
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// import React, { useEffect, useState } from "react";
// import Navbar from "./navbar";
// import user1 from "./yo.jpg";
// import user2 from "./yo.jpg"; // You can change dynamically later

// import { socket } from "./socket"; // socket already initialized with io()

// export default function ChatPortal() {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const roomId = "demo-room";

//   const sessionId = localStorage.getItem("session_id"); // 👈 use real sessionId
//   if (!sessionId) {
//     console.error("No sessionId found in localStorage");
//   }

//   useEffect(() => {
//     socket.connect();

//     socket.emit("join_room", { room: roomId });

//     socket.on("receive_message", (data) => {
//       const isFromCurrentUser = data.sender === sessionId;

//       setMessages((prev) => [
//         ...prev,
//         {
//           from: isFromCurrentUser ? "user" : "other",
//           text: data.message,
//           avatar: isFromCurrentUser ? user1 : user2,
//         },
//       ]);
//     });

//     return () => {
//       socket.emit("leave_room", { room: roomId });
//       socket.off("receive_message");
//     };
//   }, [sessionId]);

//   const sendMessage = () => {
//     if (!newMessage.trim()) return;

//     socket.emit("send_message", {
//       room: roomId,
//       message: newMessage,
//       sender: sessionId, // ✅ send sessionId to identify sender
//     });

//     setMessages((prev) => [
//       ...prev,
//       { from: "user", text: newMessage, avatar: user1 },
//     ]);
//     setNewMessage("");
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") sendMessage();
//   };

//   const addToTeam = () => {
//     alert("Added to team!");
//   };

//   return (
//     <div className="min-h-screen min-w-screen flex flex-col bg-pink-100">
//       <Navbar />
//       <div className="flex justify-end pr-6 mt-4">
//         <button
//           onClick={addToTeam}
//           className="text-white font-semibold text-lg hover:underline"
//         >
//           +Add to team
//         </button>
//       </div>

//       <div className="flex-1 overflow-y-auto px-6 py-4">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`flex items-end mb-4 ${
//               msg.from === "user" ? "justify-start" : "justify-end"
//             }`}
//           >
//             {msg.from === "user" && (
//               <img
//                 src={msg.avatar}
//                 alt="avatar"
//                 className="w-10 h-10 rounded-full mr-2"
//               />
//             )}
//             <div className="bg-gray-400 text-black font-semibold px-4 py-2 rounded-2xl max-w-xs">
//               {msg.text}
//             </div>
//             {msg.from === "other" && (
//               <img
//                 src={msg.avatar}
//                 alt="avatar"
//                 className="w-10 h-10 rounded-full ml-2"
//               />
//             )}
//           </div>
//         ))}
//       </div>

//       <div className="sticky bottom-0 px-6 py-4 bg-white border-t border-gray-300 flex items-center text-black">
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           onKeyPress={handleKeyPress}
//           placeholder="Type a message..."
//           className="flex-1 px-4 py-2 border border-gray-300 rounded-full mr-4 focus:outline-none"
//         />
//         <button
//           onClick={sendMessage}
//           className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 "
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

// 🧠 ASSUMPTIONS:
// - You fetch a list of previous chats from backend (like WhatsApp recent chats).
// - When user clicks a chat, you get the `name`, use it to fetch `other_user_id`, and then establish the socket room.

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./navbar";
import { socket } from "./socket";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const data = useParams(); // from /chat/:name
  const sessionId = localStorage.getItem("user_id"); // ✅ fixed from useId
  const [conversationId, setConversationId] = useState(null);

  // console.log(chatname);
  useEffect(() => {
    socket.connect();
    socket.emit("join_chat", {
      user_id: sessionId,
      other_user_id: data.chatName,
    });
    console.log(data.chatName);

    socket.on("joined_chat", (data) => {
      const convoId = data.conversation_id;
      setConversationId(convoId);
      socket.emit("fetch_messages", { conversation_id: convoId });
    });

    socket.on("chat_history", (msgs) => {
      const formatted = msgs.map((msg) => ({
        from: msg.sender_id === sessionId ? "user" : "other",
        text: msg.content,
      }));
      setMessages(formatted);
    });

    socket.on("receive_message", (data) => {
      const isFromCurrentUser = data.sender_id === sessionId;
      setMessages((prev) => [
        ...prev,
        {
          from: isFromCurrentUser ? "user" : "other",
          text: data.content,
        },
      ]);
    });

    return () => {
      socket.off("receive_message");
      socket.off("joined_chat");
      socket.off("chat_history");
    };
  }, [name, sessionId]);

  const sendMessage = () => {
    if (!newMessage.trim() || !conversationId) return;

    socket.emit("send_message", {
      conversation_id: conversationId,
      sender_id: sessionId,
      content: newMessage,
    });

    setMessages((prev) => [...prev, { from: "user", text: newMessage }]);
    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };
//DONE WITH THIS SHITTTTTT
  return (
    <div className="min-h-screen min-w-screen flex flex-col bg-pink-100">
      <Navbar />
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-end mb-4 ${
              msg.from === "user" ? "justify-start" : "justify-end"
            }`}
          >
            <div className="bg-gray-400 text-black font-semibold px-4 py-2 rounded-2xl max-w-xs">
              {msg.text}
            </div>
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
          className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800"
        >
          Send
        </button>
      </div>
    </div>
  );
}
