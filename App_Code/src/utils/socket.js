import { io } from "socket.io-client";

const SOCKET_URL = "http://172.20.10.4:4000";

const socket = io(SOCKET_URL, {
  transports: ["websocket", "polling"],
  autoConnect: true, // Change to true to connect automatically
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  timeout: 10000,
});

socket.on("connect", () => {
  console.log("Socket connected successfully");
});

socket.on("connect_error", (error) => {
  console.error("Socket connection error:", error.message);
});

socket.on("disconnect", (reason) => {
  console.log("Socket disconnected:", reason);
});

socket.on("error", (error) => {
  console.error("Socket error:", error);
});

export default socket;
