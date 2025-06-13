const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  },
  pingTimeout: 60000,
  pingInterval: 25000,
  transports: ["websocket", "polling"],
});

// Middleware
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Mock database
const users = [];
const messages = [];
const rooms = new Map();

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Routes
app.post("/api/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Check if email already exists
    if (users.find((user) => user.email === email)) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = {
      id: Date.now().toString(),
      username,
      email,
      password: hashedPassword,
    };

    users.push(user);

    // Generate token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);

    res.status(201).json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Find user
    const user = users.find((u) => u.email === email);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);

    res.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Store private rooms
const privateRooms = new Map();

// Socket.io connection handling
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Handle private room creation/joining
  socket.on("joinPrivateRoom", ({ userId, otherUserId }) => {
    try {
      // Create a unique room ID by sorting user IDs to ensure consistency
      const roomId = [userId, otherUserId].sort().join("-");
      console.log("Joining private room:", roomId);

      // Store room info if it doesn't exist
      if (!privateRooms.has(roomId)) {
        privateRooms.set(roomId, {
          id: roomId,
          users: [userId, otherUserId],
          messages: [],
        });
      }

      // Join the room
      socket.join(roomId);
      console.log(`User ${userId} joined private room ${roomId}`);

      // Send room history
      const room = privateRooms.get(roomId);
      socket.emit("privateRoomHistory", room.messages);

      // Notify other user that someone joined
      socket.to(roomId).emit("userJoinedPrivateRoom", { userId });
    } catch (error) {
      console.error("Error joining private room:", error);
      socket.emit("error", { message: "Failed to join private room" });
    }
  });

  // Handle private messages
  socket.on("privateMessage", (messageData) => {
    try {
      const { roomId, message, user, timestamp } = messageData;
      console.log("Private message received:", messageData);

      const newMessage = {
        id: Date.now().toString(),
        roomId,
        message,
        user,
        time: `${timestamp.hour}:${timestamp.mins}`,
        timestamp,
      };

      // Store message in room history
      const room = privateRooms.get(roomId);
      if (room) {
        room.messages.push(newMessage);
      }

      // Emit to room
      io.to(roomId).emit("newPrivateMessage", newMessage);
    } catch (error) {
      console.error("Error handling private message:", error);
      socket.emit("error", { message: "Failed to send message" });
    }
  });

  // Handle typing indicators
  socket.on("typing", ({ roomId, userId }) => {
    socket.to(roomId).emit("userTyping", { userId });
  });

  socket.on("stopTyping", ({ roomId, userId }) => {
    socket.to(roomId).emit("userStoppedTyping", { userId });
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    // Clean up rooms if needed
  });

  // Handle login
  socket.on("login", async (credentials) => {
    console.log("Login attempt:", credentials.email);
    try {
      const { email, password } = credentials;

      // Validate input
      if (!email || !password) {
        socket.emit("loginResponse", {
          success: false,
          message: "All fields are required",
        });
        return;
      }

      // Find user
      const user = users.find((u) => u.email === email);
      if (!user) {
        socket.emit("loginResponse", {
          success: false,
          message: "Invalid credentials",
        });
        return;
      }

      // Check password
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        socket.emit("loginResponse", {
          success: false,
          message: "Invalid credentials",
        });
        return;
      }

      // Generate token
      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);

      console.log("Login successful for user:", user.email);
      socket.emit("loginResponse", {
        success: true,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
        token,
      });
    } catch (error) {
      console.error("Login error:", error);
      socket.emit("loginResponse", {
        success: false,
        message: "Internal server error",
      });
    }
  });

  // Handle signup
  socket.on("signup", async (userData) => {
    console.log("Signup attempt:", userData.email);
    try {
      const { username, email, password } = userData;

      // Validate input
      if (!username || !email || !password) {
        socket.emit("signupResponse", {
          success: false,
          message: "All fields are required",
        });
        return;
      }

      // Check if email already exists
      if (users.find((user) => user.email === email)) {
        socket.emit("signupResponse", {
          success: false,
          message: "Email already exists",
        });
        return;
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = {
        id: Date.now().toString(),
        username,
        email,
        password: hashedPassword,
      };

      users.push(user);

      // Generate token
      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);

      console.log("Signup successful for user:", user.email);
      socket.emit("signupResponse", {
        success: true,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
        token,
      });
    } catch (error) {
      console.error("Signup error:", error);
      socket.emit("signupResponse", {
        success: false,
        message: "Internal server error",
      });
    }
  });

  // Join personal room
  socket.on("joinPersonalRoom", (userId) => {
    const roomId = `private-${userId}`;
    socket.join(roomId);
    console.log(`User ${userId} joined room ${roomId}`);
  });

  // Handle room creation
  socket.on("createRoom", (roomName, callback) => {
    try {
      console.log("Creating room:", roomName);

      if (!roomName || typeof roomName !== "string") {
        callback({ success: false, message: "Invalid room name" });
        return;
      }

      const roomId = Date.now().toString();
      const newRoom = {
        id: roomId,
        name: roomName,
        users: [],
        messages: [],
      };

      // Store room in rooms map
      rooms.set(roomId, newRoom);
      console.log("Room created:", newRoom);

      // Join the room
      socket.join(roomId);

      // Add user to room's users list if user data is available
      if (socket.user) {
        newRoom.users.push(socket.user.id);
      }

      // Emit room created event
      socket.emit("roomCreated", newRoom);

      // Call callback with success
      callback({ success: true, room: newRoom });
    } catch (error) {
      console.error("Error creating room:", error);
      callback({ success: false, message: "Failed to create room" });
    }
  });

  // Handle room joining
  socket.on("joinRoom", (roomId) => {
    try {
      console.log("Joining room:", roomId);
      const room = rooms.get(roomId);

      if (!room) {
        console.log("Room not found:", roomId);
        return;
      }

      socket.join(roomId);
      console.log("Joined room:", roomId);

      // Add user to room's users list if not already present
      if (socket.user && !room.users.includes(socket.user.id)) {
        room.users.push(socket.user.id);
      }

      // Emit room messages
      socket.emit("foundRoom", room.messages);
    } catch (error) {
      console.error("Error joining room:", error);
    }
  });

  // Handle room leaving
  socket.on("leaveRoom", (roomId) => {
    try {
      console.log("Leaving room:", roomId);
      socket.leave(roomId);

      // Remove user from room's users list
      const room = rooms.get(roomId);
      if (room && socket.user) {
        room.users = room.users.filter((id) => id !== socket.user.id);
      }
    } catch (error) {
      console.error("Error leaving room:", error);
    }
  });

  // Handle new message
  socket.on("newMessage", (messageData) => {
    try {
      console.log("New message received:", messageData);
      const { room_id, message, user, timestamp } = messageData;

      const newMessage = {
        id: Date.now().toString(),
        room_id,
        message,
        user,
        time: `${timestamp.hour}:${timestamp.mins}`,
      };

      // Store message
      messages.push(newMessage);
      const room = rooms.get(room_id);
      if (room) {
        room.messages.push(newMessage);
      }

      // Emit to room
      io.to(room_id).emit("newMessage", newMessage);
    } catch (error) {
      console.error("Error handling new message:", error);
    }
  });

  // Get rooms
  socket.on("getRooms", () => {
    try {
      const roomsList = Array.from(rooms.values());
      console.log("Sending rooms list:", roomsList);
      socket.emit("roomsList", roomsList);
    } catch (error) {
      console.error("Error getting rooms:", error);
    }
  });

  // User status
  socket.on("userStatusChange", ({ userId, status }) => {
    io.emit("userStatusChange", { userId, status });
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
