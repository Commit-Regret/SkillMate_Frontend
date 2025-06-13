# SkillMate Backend Server

This is the backend server for the SkillMate chat application, built with Express.js and Socket.io.

## Features

- User authentication (signup/login)
- Real-time chat using Socket.io
- Private and public chat rooms
- Message persistence (using in-memory storage)
- Typing indicators
- User online/offline status

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:

```
PORT=4000
JWT_SECRET=your-secret-key
```

3. Start the server:

```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication

- POST `/api/signup`

  - Body: `{ username, email, password }`
  - Response: `{ success, user, token }`

- POST `/api/login`
  - Body: `{ email, password }`
  - Response: `{ success, user, token }`

## Socket.io Events

### Client to Server

- `joinPersonalRoom`: Join user's personal room
- `createRoom`: Create a new chat room
- `joinRoom`: Join a specific room
- `leaveRoom`: Leave a room
- `newMessage`: Send a new message
- `typing`: User is typing
- `stopTyping`: User stopped typing
- `getRooms`: Get list of available rooms
- `userStatusChange`: Update user's online status

### Server to Client

- `roomCreated`: New room created
- `foundRoom`: Room messages found
- `newMessage`: New message received
- `userTyping`: User is typing
- `userStoppedTyping`: User stopped typing
- `roomsList`: List of available rooms
- `userStatusChange`: User's status changed

## Frontend Integration

The frontend (React Native/Expo) should:

1. Connect to the Socket.io server:

```javascript
import { io } from "socket.io-client";
const socket = io("http://your-server-url:4000");
```

2. Handle authentication:

- Store JWT token in AsyncStorage
- Include token in Authorization header for authenticated requests

3. Implement Socket.io event listeners for real-time features:

- Message handling
- Room management
- Typing indicators
- User status updates

## Security Considerations

- Passwords are hashed using bcrypt
- JWT for authentication
- Rate limiting implemented
- Input validation and sanitization
- CORS enabled for development
