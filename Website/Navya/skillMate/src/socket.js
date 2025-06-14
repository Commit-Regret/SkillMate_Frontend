import { io } from "socket.io-client";

export const socket = io("http://127.0.1.0:5000", {
  autoConnect: true,
  transports: ["websocket"],
});
