import React from "react";
import Navbar from "./navbar";

const notifications = [
  {
    user: "Aarav Sharma",
    action: "You Matched",
    time: "2h",
    img: "https://i.pravatar.cc/150?img=1",
    showButton: true,
  },
  {
    user: "Saanvi Mehra",
    action: "You Matched",
    time: "4h",
    img: "https://i.pravatar.cc/150?img=2",
  },
  {
    user: "Group Project 👨‍💻",
    action: "mentioned you in a comment",
    time: "6h",
    img: "https://i.pravatar.cc/150?img=3",
  },
  {
    user: "Late Night Squad 🌙",
    action: "added you to the group",
    time: "1d",
    img: "https://i.pravatar.cc/150?img=4",
  },
];

export default function Notifications() {
  return (
    <div className="font-sans">
              <Navbar />

    <div className="min-h-screen min-w-screen bg-gradient-to-br from-[#F4CAE0] to-[#90A8C3] px-4 py-6">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-[#D7B9D5] p-4 text-center font-semibold text-xl text-gray-800">
          Notifications
        </div>

        <div className="divide-y divide-[#ADA7C9]">
          {notifications.map((notif, index) => (
            <div key={index} className="flex items-center justify-between px-4 py-3 hover:bg-[#F4CAE0] transition-all">
              <div className="flex items-center space-x-4">
                <img
                  src={notif.img}
                  alt="profile"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="text-sm">
                  <p className="text-gray-800">
                    <span className="font-semibold">{notif.user}</span>{" "}
                    {notif.action}
                  </p>
                  <p className="text-[#ADA7C9] text-xs mt-1">{notif.time} ago</p>
                </div>
              </div>
              
              
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}
